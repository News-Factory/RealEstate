#include "get.jsx"   

function setDurationForIntroComp(x){
    var introComp=x.allLayers['Intro'].comp;
    var layers=introComp.layers;

    for (var i=layers.length; i>0; i--){
        var musicSource=getFileType(layers[i].source.name);
        
        if (musicSource == 'sound' && layers.length <=3){
            var logoMusicEnd = layers[i].source.duration;
            // alert(videoEnd);
            introComp.duration = logoMusicEnd;
            // alert(introComp.time);
        }
    }
}


function setScaleDurationMarkersPhotosComp(x){
    //Main function in scale.jsx
    var photosComp=x.allLayers['Photos Comp'].comp;
    var layers=photosComp.layers;
    //params
    //durations:
    var vidDur=10;
    var picDur=10;
    var padding = 1;
    //scales:
    var scaleFactor=1.05;
    var durTypes=setDurationDefByFileType(vidDur,picDur); //types=['video','text','pic','sound'];

    for (var i=layers.length -1; i>2; i--){
        // alert(i-2);
        var layer=layers[i]; //CompLayer
        // alert(layer.name);
        var roomPx=layer.name;
        var innerComp=x.allLayers[roomPx].comp; //'Room_Photo_X'
        var innerLayer=innerComp.layer('RoomP'+(i-2)); //Layer RoomPX
        var controlLayer=innerComp.layer('Photo Controler');
        // alert(innerLayer.name);
        var sourceType=getFileType(innerLayer.source.name);
        var dur=durTypes[sourceType];
        setCompAndLayerDuration(innerComp,dur);

        var scaleA=getLayerScale(controlLayer)['x'];
        var width=innerLayer.width;
        var height=innerLayer.height;

        if (width/2 > height ){
            scaleA*= 1.2;
        }

        var scaleB=scaleA*scaleFactor;
        setScaleFromTo(controlLayer,0,dur,scaleA,scaleB);
    }
}

   
// this function is the same as above but targets a ['Videos Comp'] for project 2   // 23/12/2020
function setScaleDurationMarkersForVideosComp(x){
    // looping through the comps to check for a ['Video Comp']
    for (c=0; c < x.comps.length; c++){       
        if(x.comps[c].name == 'Footage Comp'){
            var VideosComp=x.allLayers['Footage Comp'].comp;
            var layers=VideosComp.layers;
            
            //durations:
            var vidDur=6.2;
            var picDur=7;
            var padding = 1.9;
            var durTypes=setDurationDefByFileType(vidDur,picDur); //types=['video','text','pic','sound'];

            for (var i=layers.length - 1; i>1; i--){
                var video_x=layers[i].name; //CompLayer
                var innerComp=x.allLayers[video_x].comp; //'Room_Photo_X'

                // this is because this fucking AEP is full of comps that have no reason to exist
                if (i>4){
                    var innerLayer=innerComp.layer(1); //Layer RoomPX
                } else {
                    var innerLayer=layers[i]; 
                }
                // alert(innerLayer.name);
                var sourceType=getFileType(innerLayer.source.name);
                var dur=durTypes[sourceType];
                setCompAndLayerDuration(innerComp,dur);
                
                // this part cuts short the video comp based on the duration of its last video
                if (i =2){
                    var videoCompEnd = layers[i].outPoint;
                    var mainComp= x.allLayers['0_Main Comp'].comp;
                    var photoCompEnd = mainComp.layer('1_Photos Comp').outPoint;
                    var mainVideoComp = mainComp.layer('Videos Comp');
                    mainVideoComp.outPoint= photoCompEnd + videoCompEnd;
                }
            }
        }
    }      
}

function setDurationForOutroComp(x){
    var outroComp=x.allLayers['Outro'].comp;
    var layers=outroComp.layers;

    for (var i=layers.length; i>0; i--){
        var videoSource=getFileType(layers[i].source.name);
        
        if (videoSource == 'video' && layers.length <=3){
            var videoEnd = layers[i].source.duration;
            // alert(videoEnd);
            outroComp.duration = videoEnd;
            // alert(introComp.time);
        }
    }
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

// this function is used into "insert.jsx"
function fitToComp(layer){ //meant for layer to fill all of the screen
    //define golden ratio
    var goldenW=1920;
    var goldenH=1080;
    var goldenRatio=goldenH/goldenW;
    //alert(goldenRatio); //0.5625
    var comp=layer.containingComp;
    // alert('comp.name '+comp.name+' layer.name '+layer.name);
    var compW=comp.width;
    var compH=comp.height;
    var layerW=layer.width;
    var layerH=layer.height;

    // if the comp/layer contains a logo rescale based on dimensions, 
    // otherwise rescale to fit the screen, changed on 14/01/2021
    if (comp.name == 'logo' || comp.name == "Flat Logo" || comp.name == "LogoR&B" ) {
        if(layerH!=compH  || layerW!=compW){
        // alert('layerH '+layerH+' layerW '+layerW+' compW '+compW+' compH '+compH);
            var ratio=layerH/layerW;

            if (ratio>=goldenRatio){
                var scaleValue=35*(compW/layerW);
            } else {
                var scaleValue=35*(compH/layerH);
            } 
            // alert(scaleValue + " scaleValue for " + layer.name);      
            layer.property('Scale').setValueAtTime(0.1,[scaleValue,scaleValue]);
        }
    } else {   
        if(layerH!=compH || layerW!=compW){
            var ratio=layerH/layerW;
            if (ratio>=goldenRatio){
                var scaleValue=100*(compW/layerW);
                // alert(scaleValue + " scaleValue for " + layer.name);  
            } else {
                var scaleValue=100*(compH/layerH);
                // alert(scaleValue + " scaleValue for " + layer.name);  
            }     
            layer.property('Scale').setValueAtTime(0.1,[scaleValue,scaleValue]);
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
function setFadeIn(layer,start,end){
    layer.property('opacity').setValueAtTime(start,0);
    layer.property('opacity').setValueAtTime(end,100);
}
function setFadeOut(layer,start,end){
    layer.property('opacity').setValueAtTime(start,100);
    layer.property('opacity').setValueAtTime(end,0);
}
