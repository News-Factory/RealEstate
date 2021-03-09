#include "fade.jsx";
#include "clear.jsx";
#include "style.jsx";

function formatPhotosComp(x){
    //removes controller layers, expressions, opacity
    var photosComp=x.allLayers['Photos Comp'].comp;
    var layers=photosComp.layers;
    // alert(layers);

    for (var i=1; i<=layers.length; i++){       
         if (i<=15){
            var lay=layers2[i];
        } else {
            var lay=layers[i-layers2.length]; //CompLayer
            // alert(layer);
        }
        var roomPhotoLayerName=lay.name;
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
        if (i<=15){
            var Room_Photo_i_layer=x.allLayers['Photos Comp 2']['Room_Photo_'+i];
        } else {
            var Room_Photo_i_layer=x.allLayers['Photos Comp']['Room_Photo_'+i];      
        }
        var numOpacityKeys=Room_Photo_i_layer.property('opacity').numKeys;
        for (var k=1; k<=numOpacityKeys; k++){
            Room_Photo_i_layer.property('opacity').removeKey(1);
        }
        Room_Photo_i_layer.property('opacity').setValue(100);
        // this function is in the style.jsx file
        // centerText_BackGroundPadding(x,roomPhotoLayerName);
    }

    // this function is in the style.jsx file
    topScrollingText_SpaceBetween(x);
}


// sets the right fade in/out for the music going on Photos Comp  08/12/2020
function fitSoundOnPhotosComp(x){
    // Select 1_Photos Comp start and end points
    var introSong= x.allLayers['Drone Shot']['Intro Sound'];
    var brandIntroDuration= x.allLayers['0_Main Comp']['Intro'].outPoint;
    // alert(brandIntroDuration);
    var startIn= introSong.source.duration + brandIntroDuration;
    // var photoComp= x.allLayers['0_Main Comp']['1_Photos Comp'];
    var videoComp= x.allLayers['0_Main Comp']['1_Videos Comp'];
    var outroComp=x.allLayers['0_Main Comp']['Outro'];

    // var photoCompStart = photoComp.inPoint; //inPoint

    if(outroComp){
        var outroCompEnd = outroComp.outPoint; //outPoint
    } else {
        var videoCompEnd = videoComp.outPoint;
        // alert(videoCompEnd);
    }

    // select the layer for the background song
    var backgroundSong = x.allLayers['0_Main Comp']['Sound Comp'];
    // alert(startIn);
    // clear the eventual keyframes on the layer
    clearKeys(backgroundSong, 'Audio Levels');

    // apply the fade in / fade out
    backgroundSong.startTime = startIn -1.5;
    // xFadeOut(backgroundSong, detailCompEnd, 2, -10, -60);
    if(outroComp){
        slowFadeOut(backgroundSong, outroCompEnd, 5, -50, 5);  
    } else {
        slowFadeOut(backgroundSong, videoCompEnd, 5, -50, 5);
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
    fadeIn(backgroundIntro, introCompStart, 0.2, -100, 0);
    // fadeOut(backgroundIntro, introCompEnd, 1, 0, -100);

    // apply the fade in / fade out to the outro comp 
    fadeIn(backgroundOutro, outroCompStart, 0.2, -100, 0);
    fadeOut(backgroundOutro, outroCompEnd, 0.2, 0, -100);
}

function fitSoundOnAll(x){
    var introComp = x.allLayers['0_Main Comp']['Intro'];
    var outroComp = x.allLayers['0_Main Comp']['Outro'];
    var introCompStart = introComp.inPoint; //intro inPoint
    var outroCompEnd = outroComp.outPoint; //outro outPoint

    // select the layer for the background song
    var backgroundSong = x.allLayers['0_Main Comp']['Sound Comp'];
    // clear the eventual keyframes on the layer
    clearKeys(backgroundSong, 'Audio Levels');

    // apply the fade in / fade out
    fadeIn(backgroundSong, introCompStart, 0.5, -40, -10);
    slowFadeOut(backgroundSong, outroCompEnd, 5, -40, 6);
} 