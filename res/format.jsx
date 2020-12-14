#include "fade.jsx";
#include "clear.jsx";

function formatPhotosComp(x){
    //removes controller layers, expressions, opacity
    //should only need to be run once

    var photosComp=x.allLayers['Photos Comp'].comp;
    var layers=photosComp.layers;

    // changing the logo scale and dimension for intro /outro / details  04/12/2020
    var logo_Details=x.allLayers['Details']['logo'];
    var logo_Intro=x.allLayers['Intro']['logo'];
    var logo_Outro=x.allLayers['Outro']['logo'];

    setLogoScaleAndPosition(logo_Details);
    setLogoScaleAndPosition(logo_Intro);
    setLogoScaleAndPosition(logo_Outro);

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
            // layer.property('scale').setValue([100,100]);
        
        //remove opacity
            var Room_Photo_i_layer=x.allLayers['Photos Comp']['Room_Photo_'+i];
            var numOpacityKeys=Room_Photo_i_layer.property('opacity').numKeys;
            for (var k=1; k<=numOpacityKeys; k++){
                Room_Photo_i_layer.property('opacity').removeKey(1);
            }
            Room_Photo_i_layer.property('opacity').setValue(100);

        //move room name background TO BE MOVED INTO ANOTHER PAGE IF NEEDED
           var textBG = x.allLayers[roomPhotoLayerName]['Text BG'];
           textBG.property('position').setValue([-10.5, -77]);
    }


    // fixing yet more text variations, this time for the up scroll spaces between words
    var Rooms = x.allLayers['Data']['Rooms'];
    var HRooms = x.allLayers['Data']['HRooms'];
    var Size = x.allLayers['Data']['Size'];
    var HSize = x.allLayers['Data']['HSize'];
    var Floor = x.allLayers['Data']['Floor'];
    var HFloor = x.allLayers['Data']['HFloor'];
    var Price = x.allLayers['Data']['Price'];
    var HPrice = x.allLayers['Data']['HPrice'];

    // this is to fix the position between them (need to wrap in a function like the one below)
    Rooms.property('position').setValue([1700, 30]);
    HRooms.property('position').setValue([1875, 30]);
    Size.property('position').setValue([1330, 30]);
    HSize.property('position').setValue([1585, 30]);
    Floor.property('position').setValue([970, 30]);
    HFloor.property('position').setValue([1125, 30]);
    Price.property('position').setValue([655, 30]);
    HPrice.property('position').setValue([805, 30]);

    // fixing the anchor point of the writings on the top scroll for Photos Comp
    var dataText = x.allLayers['Data'].comp;
    var data = dataText.layers;

    for (i = 1; i < data.length; i++){
        data[i].property('anchorPoint').setValue([-1.6, -20]);
    }
}

  // sets the right fade in/out for the music going on Photos Comp  08/12/2020

function fitSoundOnPhotosComp(){
    // Select 1_Photos Comp start and end points
    var photoComp=x.allLayers['0_Main Comp']['1_Photos Comp'];
    var photoCompStart = photoComp.inPoint; //inPoint
    var photoCompEnd = photoComp.outPoint; //outPoint
    // alert(photoCompEnd);

    // select the layer for the background song
    var backgroundSong = x.allLayers['0_Main Comp']['Loop Sound'];

    clearKeys(backgroundSong, 'Audio Levels');

    // apply the fade in / fade out
    xFadeIn(backgroundSong, photoCompStart, 4, -60, -20);
    xFadeOut(backgroundSong, photoCompEnd, 4, -20, -60);
}