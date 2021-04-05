#include "fade.jsx";
#include "clear.jsx";
#include "style.jsx";

function formatLogoTR(x){
    var logo_Details =x.allLayers['Flat Logo']['logo'];
    setLogoScaleAndPositionTR(logo_Details);
}

function formatPhotosComp(x){
    //removes controller layers, expressions, opacity
    var photosComp=x.allLayers['Photos Comp'].comp;
    var layers=photosComp.layers;

    // changing the logo scale and dimension for details comp, 
    // intro and outro are videos now        30/12/2020
    var logo_Details=x.allLayers['Details']['LogoR&B'];
    var logo_PhotosComp= x.allLayers['08_Contact']['LogoR&B'];

    // setLogoScaleAndPosition(logo_Intro);
    // setLogoScaleAndPositionRB(logo_Details);
    setLogoScaleAndPositionRB(logo_PhotosComp);

    for (var i=1; i<=layers.length; i++){
        var roomPhotoLayerName=layers[i].name;
        //Now we have the composition in which there's the layer we need
        //The layer name is RoomP+i
        
        //unlock controller layers and remove
        var controller=x.allLayers[roomPhotoLayerName]['Photo Scale Controler'];
        if (controller!==undefined){
            if (controller.locked){controller.locked=false;}
            controller.remove();
        }
        
        //remove expressions and reset scale
        var layer=x.allLayers[roomPhotoLayerName]['RoomP'+i];
        layer.property('scale').expression='';
        
        //remove opacity
        var Room_Photo_i_layer=x.allLayers['Photos Comp']['Room_Photo_'+i];
        var numOpacityKeys=Room_Photo_i_layer.property('opacity').numKeys;
        for (var k=1; k<=numOpacityKeys; k++){
            Room_Photo_i_layer.property('opacity').removeKey(1);
        }
        Room_Photo_i_layer.property('opacity').setValue(100);

        // this function is in the style.jsx file
        centerText_BackGroundPadding(x,roomPhotoLayerName);
    }
    // this function is in the style.jsx file
    topScrollingText_SpaceBetween(x);
}


// sets the right fade in/out for the music going on Photos Comp  08/12/2020
function fitSoundOnPhotosComp(x){
    // Select 1_Photos Comp start and end points
    var introSong= x.allLayers['0_Intro']['Intro Sound'];
    var startIn= introSong.source.duration;
    // var photoComp= x.allLayers['0_Main Comp']['1_Photos Comp'];
    var videoComp= x.allLayers['0_Main Comp']['1_Videos Comp'];
    var detailComp=x.allLayers['0_Main Comp']['Details'];
    var outroComp=x.allLayers['0_Main Comp']['0_Outro'];

    // var photoCompStart = photoComp.inPoint; //inPoint

    if(detailComp){
        var detailCompEnd = detailComp.outPoint; //outPoint
    } else {
        // var videoCompEnd = videoComp.outPoint;
        var outroCompEnd = outroComp.outPoint;
        // alert(videoCompEnd);
    }

    // select the layer for the background song
    var backgroundSong = x.allLayers['0_Main Comp']['Sound Comp'];
    // alert(startIn);
    // clear the eventual keyframes on the layer
    clearKeys(backgroundSong, 'Audio Levels');

    // apply the fade in / fade out
    backgroundSong.startTime =startIn;
    // fadeIn(backgroundSong, startIn, 0.1, -60, 0);
    // xFadeOut(backgroundSong, detailCompEnd, 2, -10, -60);
    if(detailComp){
        fadeOut(backgroundSong, detailCompEnd, 1, 0, -40);  
    } else {
        slowFadeOut(backgroundSong, outroCompEnd, 5, -40, 5);
    }
}


// fixes the music on the intro and outro  11/01/2021
function fitSoundOnIntroOutro(x){
    var introComp = x.allLayers['0_Main Comp']['Intro'];
    var outroComp = x.allLayers['0_Main Comp']['Outro'];
    var videosComp = x.allLayers['0_Main Comp']['1_Videos Comp'];
    var detailsComp = x.allLayers['0_Main Comp']['Details'];
    
    var introCompStart = introComp.inPoint; //intro inPoint
    var outroCompStart = 0; //outro inPoint

    var introCompEnd = introComp.outPoint; //intro outPoint
    if (detailsComp){
        var outroCompEnd = outroComp.outPoint - detailsComp.outPoint; //outro outPoint
    }else {
        var outroCompEnd = outroComp.outPoint - videosComp.outPoint; //outro outPoint
    }

    // select the layer for the intro background song
    var backgroundIntro = x.allLayers['Intro']['Intro Sound'];
    // select the layer for the outro background song
    var backgroundOutro = x.allLayers['Outro']['Outro Sound'];
    // clear the eventual keyframes on the layer
    clearKeys(backgroundIntro, 'Audio Levels');
    clearKeys(backgroundOutro, 'Audio Levels');

    // apply the fade in / fade out to the intro comp 
    fadeIn(backgroundIntro, introCompStart, 0.2, -60, 0);
    // fadeOut(backgroundIntro, introCompEnd, 0.2, 0, -60);

    // apply the fade in / fade out to the outro comp 
    // fadeIn(backgroundOutro, outroCompStart, 0.2, -60, 0);
    // fadeOut(backgroundOutro, outroCompEnd, 0.2, 0, -60);
}

function fitSoundOnAll(x){
    var introComp = x.allLayers['0_Main Comp']['0_Intro'];
    var outroComp = x.allLayers['0_Main Comp']['0_Outro'];
    var introCompEnd = introComp.outPoint; //intro inPoint
    var outroCompStart = outroComp.inPoint; //outro outPoint

    // select the layer for the background song
    var backgroundSong = x.allLayers['0_Main Comp']['Sound Comp'];
    // clear the eventual keyframes on the layer
    clearKeys(backgroundSong, 'Audio Levels');

    // apply the fade in / fade out
    fadeIn(backgroundSong, introCompEnd, 0.5, -40, 0);
    fadeOut(backgroundSong, outroCompStart, 2, 0, -40);
}