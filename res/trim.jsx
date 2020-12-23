#include "sync.jsx";
#include "get.jsx";

function trimByAudio(containingComp,layer,threshold,inPadding,outPadding,maxBool){
    //The maxBool boolean will determine if we're going to work with a maximum limit
    //With limitations on in and out
    //inPadding,outPadding are in keyFrames, not seconds
    var audioInOut = getAudioAnalysis(layer,containingComp,threshold);
    //alert(audioInOut.inn+", "+audioInOut.out);
    var threshIn = audioInOut["inn"];
    var threshOut = audioInOut["out"];
    if (maxBool){
        var layerComp = layer.source; //EXTERNAL
        var maxOut = getMaxOutPoint(layer,layerComp);
        }
    else {
        var maxOut = threshOut+100;
        }
    setInPoint_B(layer,threshIn,inPadding);
    setOutPoint_B(layer,threshOut,outPadding,maxOut);
 }

function massTrim(containingComp,layerArray,threshold,inPadding,outPadding,maxBool){
    containingComp.openInViewer();
    for (var i=0; i<layerArray.length; i++){
        //alert(layerArray[i].name);
        trimByAudio(containingComp,layerArray[i],threshold,inPadding,outPadding,maxBool);
        }
}

function multiTrim(layersToMultiTrim,padding){
    //A series of massTrims
    //Trim sound layers of Graph comp, Today news, Indicator comp - all labelled 11
    //It then syncs sound layers and markers    
    for (var i=0; i<layersToMultiTrim.length; i++){
        alert("Primul for")
        var containingComp = layersToMultiTrim[i].source;
        var markerLayer = getAllByLabel(containingComp.layers,1)[0];
        var soundLayers = getAllByLabel(containingComp.layers,9);
        var BGFootageLayers = getAllByLabel(containingComp.layers,8);
        //trim each soundLayer by audio in itself
        massTrim(containingComp,soundLayers,1,padding.audioPadIn,padding.audioPadOut,false);
        //move first soundLayer to compStart        
        syncInPointToTime(soundLayers[0],0,padding.inn);
        //sync soundLayers with each other. Move the start of every next layer to prior layer's end
        for (var j=1; j<soundLayers.length; j++){
            alert("al 2 lea for")
            var current = soundLayers[j];
            var prior = soundLayers[j-1];
            syncInPointToOutPoint(current,prior,padding.inn);
            }
        var markerTimes = reLocateMarkers(markerLayer,soundLayers);
        //alert(markerTimes.length);
        //if BGFootage exists we now trim and sync those
        if(BGFootageLayers.length>0){
            BGFootageLayers.reverse();
            for (var j=1; j<BGFootageLayers.length; j++){
                alert("al 3 lea for")
                BGFootageLayers[j].startTime = markerTimes[j];
                }
            }
        }
}

function reLocateMarkers(markerLayer,soundLayers){
    //relocate markers in comp labelled 1
    var markerNumKeys = markerLayer.marker.numKeys; //= the number of soundLayers
    //alert("markerNumKeys: "+markerNumKeys);
    var markerComments=[];
    var markerTimes = [0];
    var markerKeyValue="";
    
    //get markers 2 and after and make array
    for (var j=1; j<markerNumKeys; j++){
        markerKeyValue=markerLayer.marker.keyValue(j+1); //next marker
        //alert("markerKeyValue: "+markerKeyValue.comment);
        markerComments.push(markerKeyValue.comment);
        }
    
    //remove all markers but the first
    for (var j=1; j<markerNumKeys; j++){markerLayer.marker.removeKey(2);}
    
    //remake markers
    for (var j=1; j<markerNumKeys; j++){
        var newMarker = new MarkerValue(markerComments[j-1]); // creates new marker object   
        var newMarkerTime = soundLayers[j-1].outPoint;
        markerTimes.push(newMarkerTime);
        markerLayer.marker.setValueAtTime(newMarkerTime,newMarker);
        }
    return markerTimes;
}

function trimWorkAreaByFirstLayerVideoOutPoint(layer){    
    try{
        var comp = layer.source;
        var compLayer = comp.layers[1];
        //comp.workAreaDuration = compLayer.outPoint;
        layer.outPoint=compLayer.outPoint+layer.startTime;
    }
    catch (e){
        //Probably means that everything's ok
    }
}

function trimWorkAreaByVideo(layer){
    //trims both inside internal compLayer and trims compLayer in the containing comp
    try{
        var comp = layer.source;
        var footageLayer = getFirstLayerByType(comp,"[object FootageItem]");
        //comp.workAreaDuration = footageLayer.outPoint; //internal
        layer.outPoint=footageLayer.outPoint+layer.startTime; //external
    }
    catch (e){
        //Probably means that everything's ok
    }
}

function trimComplexIntroLayer(mainComp,introLayer,introComp,padding){ //310520 currently relevant only to vantage FX
    //alert("Complex Intro");
    var layers = introComp.layers;
    var soundLayers = getAllByLabel(layers,9); //2 layers
    var markerLayers = getAllByLabel(layers,1); //2 layers
    
    var marker = markerLayers[1].property("Marker");
    var newsInMarkerTime = marker.keyTime(1);
    massTrim(introComp,soundLayers,1,padding.inn,padding.out);
    syncInPointToTime(soundLayers[0],newsInMarkerTime,0);
    syncMarkerToOutPoint(markerLayers[0],soundLayers[0]);
    syncInPointToOutPoint(soundLayers[1],soundLayers[0],0);
    //alert("finished syncing");
    
    var audioData = getAudioAnalysis(introLayer,mainComp,padding.threshold);
    var audioOut = audioData["out"];
    setOutPoint_B(introLayer,audioOut,padding.presentorOut,audioOut+100);  //inside: get.jsx
    //alert("Done with complex intro");
}

