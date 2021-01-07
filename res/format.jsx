#include "fade.jsx";
#include "clear.jsx";
#include "style.jsx";

function formatPhotosComp(x){
    //removes controller layers, expressions, opacity

    var photosComp=x.allLayers['Photos Comp'].comp;
    var layers=photosComp.layers;

    // changing the logo scale and dimension for details comp, 
    // intro and outro are videos now        30/12/2020
    var logo_Details=x.allLayers['Details']['logo'];

    // setLogoScaleAndPosition(logo_Intro);
    setLogoScaleAndPosition(logo_Details);

    function setLogoScaleAndPosition(layer){
        layer.property('scale').setValueAtTime(0.2,[60,60,100]);
        layer.property('position').setValueAtTime(0.2, [550, 550]);
    }

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
        centerText_BackGroundPadding(roomPhotoLayerName);
    }
    // this function is in the style.jsx file
    topScrollingText_SpaceBetween();
}


// sets the right fade in/out for the music going on Photos Comp  08/12/2020
function fitSoundOnPhotosComp(x){
    // Select 1_Photos Comp start and end points
    var photoComp=x.allLayers['0_Main Comp']['1_Photos Comp'];
    var photoCompStart = photoComp.inPoint; //inPoint
    var photoCompEnd = photoComp.outPoint; //outPoint
    // alert(photoCompEnd);

    // select the layer for the background song
    var backgroundSong = x.allLayers['0_Main Comp']['Loop Sound'];
    // clear the eventual keyframes on the layer
    clearKeys(backgroundSong, 'Audio Levels');

    // apply the fade in / fade out
    xFadeIn(backgroundSong, photoCompStart, 4, -60, -20);
    xFadeOut(backgroundSong, photoCompEnd, 4, -20, -60);
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
    xFadeIn(backgroundSong, introCompStart, 4, -60, -10);
    xFadeOut(backgroundSong, outroCompEnd, 4, -10, -60);
}