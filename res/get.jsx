#include "is-has.jsx";
//merged with import 050920

function getFileType(fileName){
    //Recognize filetypes by extention
    //Consider replacing "isLegitFileType"
    var fileTypes=[];
    fileTypes.push({ext:'txt',type:'text'});
    fileTypes.push({ext:'png',type:'pic'});
    fileTypes.push({ext:'jpg',type:'pic'});
    fileTypes.push({ext:'mp3',type:'sound'});
    fileTypes.push({ext:'wav',type:'sound'});
    fileTypes.push({ext:'mp4',type:'video'});
    fileTypes.push({ext:'mov',type:'video'});
    fileTypes.push({ext:'mxf',type:'video'});
    fileTypes.push({ext:'flv',type:'video'});
    //fileTypes.push({ext:'txt',type:'text'});
    fileType=fileName.toString().toLowerCase().split('.')[1];
    for (var i=0; i<fileTypes.length; i++){
        if (fileType==fileTypes[i].ext){
            return fileTypes[i].type;
        }
    }
    return false;
}

function gettxt(filePath){
    var txtFile = File(filePath);
    txtFile.open("r");  
    var str = txtFile.read();
    txtFile.close();
    return str;
}

function getMainComp(allComps){
    for (var i=0; i<allComps.length; i++){
        var compName = allComps[i].name.toLowerCase();
        if(compName.indexOf("main comp")>-1){
            return allComps[i];
            }
        }
    return false;
}

function getAllByType(inArray,type){
    //Folder / Composition / Footage
    //returns array
    var res = [];    
    for (var i=1; i<=inArray.length; i++){
        if (inArray[i].typeName==type){
            res.push(inArray[i]);
            }
        }
    return res;
}

function getData_byTitleValueType(data){
    //returns the text file sorted into the following types: 19/10/2020

    // undefined in var types only makes the program run, needs to be fixed/debugged
    var types = ["info","vid","pic","sound","text","onoff","meta","null", "undefined"];
    var res = {};
    for (var i=0; i<types.length; i++){res[types[i]]=[];} //Make empty arrays //res['info']=[],res['vid']=[]...

    for (var i=0; i<data.length; i++){
        if (isFullObject(data[i])){

            // alert('i: '+i+' title: '+data[i]['title']);
            res[data[i]['type']].push({title:data[i]['title'],value:data[i]['value']});    
        }
    }
    return res;

    // this alert is to show how many undefined data there are
    var log='The following titles in the master sheet are undefined:\n';
    for (var i=0; i<res['undefined'].length; i++){
        log+=res['undefined'][i].title+'\n';
    }
    alert(log);
}

function getAllLayersByType(allComps){
    //goes over all compositions in the project and gets the layers that are avlayers and textlayers 19/10/2020
    var all={};
    all.text=[];
    all.av=[];
    all.comps=[];
    
    for (var i=0;i<allComps.length;i++){
        var layers=allComps[i].layers;
        for (var j=1;j<=layers.length;j++){
            var layer=layers[j];
            if (isCompLayer(layer)){
                all.comps.push({containingComp:layer.containingComp,layer:layer});
            } else {
                if (isFootageLayer(layer)){
                    all.av.push({containingComp:layer.containingComp,layer:layer});
                    //all.av.push(layer);
                } else {
                if (isTextLayer(layer)){
                    all.text.push({containingComp:layer.containingComp,layer:layer});
                    //all.text.push(layer);
            }}}
        }
    }
    //alert(all.av.length); //213
    //alert(all.text.length); //179
    return all;
}

function getAllByLabel(layers,label){
    //returns array
    var res = [];
    for (var i=1; i<=layers.length; i++){
        if (layers[i].label==label){
            res.push(layers[i]);
            }
            alert(layers[i].name);
        }
    return res;
}

function getSeveralLabels(layers,labelArray){
    //returns array
    var res = [];
    for (var i=1; i<=layers.length; i++){
        for (var j=0; j<labelArray.length; j++){
            if (layers[i].label==labelArray[j]){
                res.push(layers[i]);
                break;
                }
            }
        }
    return res;
}

function getByName(inArray,name){
    try {
        //for (var i=0; i<inArray.length; i++) ~~ inArray[0] dosen`t exist, itg starts from index 1        
        for (var i=0; i<inArray.length; i++){
            if (inArray[i].name==name){                
                return inArray[i];
            }
        }
        return false;
    }
    catch (e){
        for (var i=1; i<=inArray.length; i++){
            if (inArray[i].name==name){
                return inArray[i];
            }
        }
        return false;
    }
}

function getLayerType(layer){ //strange, needs checking O.M. 15/12/2020
    if(isCompLayer(layer)){return "comp";} 
    else 
    {
        if((layer)){return "vid";}
        else 
        {
            if(isTextLayer(layer)){return "text";}
            else {return "other";}
        }
    }
}

function getFirstLayerByType(comp,layerType,logFile){
    var layers = comp.layers;
    for (var i=1; i<=layers.length; i++){
        if (getLayerType(layers[i])==layerType){
            return layers[i];
            }
        }
    return false;
}

function getLayer(comp,layerName){
    //gets a layer from a given comp with a given name
    var layers = comp.layers;
    return getByName(layers,layerName);
}

function getAllLayers(x){
    //returns an array containing all layers in a given project 15/12/2020
    var allLayers=[];
    for (var i=0; i<x.comps.length; i++){
        var layers=x.comps[i].layers;
        for (var j=1; j<=layers.length; j++){
            allLayers.push(layers[j]);
        }
    }
    return allLayers;
}

/*
function getAllLayersByNameAndType(allComps,layerName,layerType,logFile){
    //logFile.write("function getAllLayersByNameAndType");
    //logFile.write('\n');
    var res = [];
    for (var i=0; i<allComps.length; i++){
        var comp = allComps[i];
        var layers = comp.layers;
        for (var j=1; j<=layers.length; j++){
            var layer = layers[j];
            //logFile.write("comp: "+comp.name+". layer:"+layer.name);
            //logFile.write('\n');
            var type = getLayerType(layer);
            if (layer.name==layerName && type==layerType){
                res.push(layer);
                }
            }
        }
    if (res.length==0){
        return false;
        }
    return res;
}*/

/*
function getLayerByNameAndType(comp,layerName,layerType){
    var layers = comp.layers;
    for (var i=1; i<=layers.length; i++){
        if(layers[i].name==layerName){
            var type = getLayerType(layers[i]);
            if (type==layerType){return layers[i];}
        }
    }
    return false;
}
*/

//GET AUDIO ANALYSIS 13/06/20

function getAudioAnalysis(layer,containingComp,threshold){
    //returns the time locations where the audio of layer within containingComp
    //goes over (inPoint) and under (outPoint) the threshold    
    containingComp.openInViewer();
    layer.solo=true;
    app.executeCommand(app.findMenuCommandId("Convert Audio to Keyframes")); //creates new layer
    var audioAnalLayer = containingComp.layer(1); // Audio Amplitude
    //alert("Layer 1");
    var audioAnalEffect = audioAnalLayer.effect("Both Channels")("Slider");    
    
    var threshIn = getThresholdIn(audioAnalEffect,threshold);
    var threshOut = getThresholdOut(audioAnalEffect,threshold);
        
    audioAnalLayer.remove();
    layer.solo=false;
    
    if(threshIn==-1 ||  threshOut==-1){
        alert("Audio analysis failed in layer: "+layer.name);
        return false;
    }
    else {
        return {inn: threshIn, out: threshOut};
    }
}

function getThresholdIn(audioAnalEffect,threshold){
    for (var i=1; i<=audioAnalEffect.numKeys; i++){
        if (audioAnalEffect.keyValue(i) > threshold){
            return audioAnalEffect.keyTime(i);
        }
    }
    return -1;
}

function getThresholdOut(audioAnalEffect,threshold){
    var end=audioAnalEffect.numKeys;
        for (var i=end; i>0; i--){
            if (audioAnalEffect.keyValue(i) > threshold){
                var out = audioAnalEffect.keyTime(i);
                return out;
            }
        }
    return -1;
}

function setInPoint_B(layer,threshIn,inPadding){
    var paddedIn = threshIn-inPadding;
    if (paddedIn<0){paddedIn=0;}
    layer.inPoint = paddedIn;
}

function setOutPoint_B(layer,threshOut,outPadding,maxOut){
    var paddedOut = threshOut+outPadding;
    //alert("paddedOut "+paddedOut);
    if (paddedOut>maxOut){
        paddedOut=maxOut;
        //alert("Audio padding exeeds maximum outPoint. Trimming...")
        }
    layer.outPoint = paddedOut;
}

function getMaxOutPoint(layer,layerComp){
    //"layer" is the layer we're trimming inside "containingComp"
    //Layer is analyzed by first footage internal layer;
    //We're going to make sure that the out padding of "layer" inside "containingComp"
    //doesn't exceed the outPoint of the footage inside it.
    
    //Let's get the startTime of "layer" inside "inComp":
    var externalStartTime = layer.startTime;
    
    //Now we find the first footage layer inside layerComp:
    var layers = layerComp.layers;
    for (var i=1; i<=layers.length; i++){
        if (layers[i].source=="[object FootageItem]"){
            
            var internalFootageLayer = layers[i];
            //Found the first footage layer, the outPoint of which will limit the padding
            var internalOutPoint = internalFootageLayer.outPoint;
            
            //Now let's calculate the maximum outPoint of layer:
            var maxOutPoint = externalStartTime+internalOutPoint;
            
            return maxOutPoint;
            }
        }
    //if there's no footage layer return false
    return false;
}