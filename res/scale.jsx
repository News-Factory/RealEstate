#include "get.jsx"   
//Gonna try and work with main functions and then their assisting functions

function setScaleDurationMarkersForPhotosComp(x){
    //Main function in scale.jsx
    var photosComp=x.allLayers['Photos Comp'].comp;
    var layers=photosComp.layers;
    // alert(layers.length);
    //params
    //durations:
    var vidDur=10;
    var picDur=5;
    var padding = 1;
    //scales:
    var scaleFactor=1.05;

    // setting a conditional statement based on how many photo layers there are 16/12/2020
    if (layers.length <= 5){
        picDur = 7;
        padding = 2;
    }

    var durTypes=setDurationDefByFileType(vidDur,picDur); //types=['video','text','pic','sound'];

    //var i=1;
    for (var i=1; i<layers.length; i++){
        var roomPx=layers[i].name; //CompLayer
        var innerComp=x.allLayers[roomPx].comp; //'Room_Photo_X'
        var innerLayer=x.allLayers[roomPx]['RoomP'+i]; //Layer RoomPX
        // alert(innerLayer.name);
        var sourceType=getFileType(innerLayer.source.name);
        var dur=durTypes[sourceType];
        setCompAndLayerDuration(innerComp,dur);

        var scaleA=getLayerScale(innerLayer)['x'];
        var scaleB=scaleA*scaleFactor;
        setScaleFromTo(innerLayer,0,dur,scaleA,scaleB);
        
        var newMarkerTime=layers[i].startTime+dur-1;
        moveMarker(layers[i],newMarkerTime);

        setFadeOut(layers[i],newMarkerTime,newMarkerTime+0.65);

        if (i > 1){
            var layerB = layers[i];
            var layerA = layers[i-1];
            syncOutPointToInPoint(layerA,layerB,padding);
        }
    }
    //Once we're done scaling and setting durations it's time to relocate the markers
    //This procedure will be done inside sync.jsx
}

function setDurationDefByFileType(videoDur,restDur){
    //special define function to select characteristics by type
    //gets two params of durations: video and the rest
    //see getFileType
    var types=['video','text','pic','sound'];
    var dur={};
    dur['video']=videoDur;
    for (var i=1; i<types.length; i++){
        dur[types[i]]=restDur;
    }
    return dur;
}

function setCompAndLayerDuration(comp,dur){
    //sets the comp and its layers to a given duration
    comp.duration=dur;
    for (var j=1; j<=comp.layers.length; j++){
        comp.layers[j].locked = false;
        comp.layers[j].outPoint=dur;
    }
}

function setScaleFromTo(layer,t1,t2,s1,s2){
    //sets the scale of a given layer from scale s1 at time t1 so s2 at time t2
    layer.property("scale").setValueAtTime(t1,[s1,s1,s1]);
    layer.property("scale").setValueAtTime(t2,[s2,s2,s2]);
}

function fitToComp(layer){ //meant for layer to fill all of the screen
    //define golden ratio
    var goldenW=1920;
    var goldenH=1080;
    var goldenRatio=goldenH/goldenW;
    //alert(goldenRatio); //0.5625
    var comp=layer.containingComp;
    //alert('comp.name '+comp.name+' layer.name '+layer.name);
    var compW=comp.width;//*comp.pixelAspect;
    var compH=comp.height;//*comp.pixelAspect;
    var layerW=layer.width;//*layer.source.pixelAspect;
    var layerH=layer.height;//*layer.source.pixelAspect;
    //

    // if the composition is NOT logo resize to fill the screen, otherwise only rescale 40%
    if (comp.name !== 'logo') {
        if(layerH!=compH  || layerW!=compW){
        //alert('layerH '+layerH+' layerW '+layerW+' compW '+compW+' compH '+compH);
            var ratio=layerH/layerW;
            if (ratio>=goldenRatio){
            //   alert('bigger, resizing by width');
                var scaleValue=100*(compW/layerW);
            } else {
            //    alert('smaller, adjusting by height');
                var scaleValue=100*(compH/layerH);
            } 
        //  alert(scaleValue + " scaleValue for " + layer.name);      
            layer.property('Scale').setValueAtTime(1,[scaleValue,scaleValue]);
            // layer.property('Scale').setValueAtKey([scaleValue,scaleValue]);
        }
    } else {
        if(layerH!=compH || layerW!=compW){
            var ratio=layerH/layerW;
            if (ratio>=goldenRatio){
                var scaleValue=40*(compW/layerW);
            } else {
                var scaleValue=40*(compH/layerH);
            }     
            layer.property('Scale').setValueAtTime(1,[scaleValue,scaleValue]);
        }

    }
}

function getLayerPosition(layer){
    var layerPosition=layer.property("position").value;
    return getXYZ(layerPosition);
    }

function getLayerScale(layer){
    var layerScale=layer.property("scale").value;
    return getXYZ(layerScale);
    }

function getXYZ(array){
    var x=array[0];
    var y=array[1];
    var z=array[2];
    return {x:x,y:y,z:z}
    }

function setFadeOut(layer,start,end){
    layer.property('opacity').setValueAtTime(start,100);
    layer.property('opacity').setValueAtTime(end,0);
}