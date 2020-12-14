//The second section of sync.jsx will be specified functions dealing with specific cases
//The first section will be a function that maps out the markers of a given layer

function getMarkers(layer){
    //A marker can have a name and cannot have a name, there can be more than one and there can be none
    //All of these options should be covered in this function
    //If there are no markers, will return false
    var marker=layer.marker; //returns
    var numMarkers=marker.numKeys;
    if (numMarkers>0){ //if there are markers
        var markers=[];
        for (var i=1; i<=numMarkers; i++){
            var time=marker.keyTime(i);
            var comment=marker.keyValue(i).comment;
            if (comment==''){comment=false;} //If doesn't have a comment return a false comment
            markers.push({time:time,comment:comment});
        }
        return markers;
    } else {return false;} //numMarkers=0 There are no markers in this layer
}

function moveMarker(layer,newTime){
    //we go with index because that's probably the best way to grab a marker
    //relevant for layers with only one marker
    //since AE sucks so the only way to do this is by deleting the marker and remaking it
    var markers=getMarkers(layer);
    if (markers){
        var markerComment=markers[0].comment;
        if (markerComment){markerComment=new MarkerValue(markerComment);}
        else {markerComment=new MarkerValue('');}
    }
    var marker=layer.marker;
    marker.removeKey(1);
    marker.setValueAtTime(newTime, markerComment);
}

function locateMarkerIndex(marker,name){
    var numMarkers=marker.numKeys;
    for (var i=1; i<=numMarkers; i++){
        if (marker.keyValue(i).comment==name){
            return i;
        }
    }
    return -1;
}

function getMarkerStartGap(layer,marker,markerIndex){
    var markerTime=marker.keyTime(markerIndex);
    var gap=markerTime-layer.startTime;
    return gap;
}

//second section, will need modifying to adjust to new basic functions in section one 29/11/2020
function syncMarkerToOutPoint(layerA,layerB){
    //syncs LayerA based on its first marker (and maybe the only one) with the outPoint of layerB
    var marker=layerA.marker;
    var gap=getMarkerStartGap(layerA,marker,1);
    var syncPoint=layerB.outPoint-gap;
    layerA.startTime=syncPoint;
}

function syncInPointToTime(layer,time,timePadding){
    //moves layer based on inPoint with the marker and adds padding if exists
    var gap=layer.inPoint-layer.startTime;
    var syncPoint=time-gap+timePadding;
    layer.startTime=syncPoint;
}

function syncInPointToOutPoint(layerA,layerB,padding){
    //syncs layerA's inPoint with layerB's outPoint
    layerA.startTime=layerB.outPoint-(layerA.inPoint-layerA.startTime)+padding;
    }

function syncOutPointToInPoint(layerA,layerB,padding){
    //syncs layerA's outPoint with layerB's inPoint
    layerB.startTime=layerA.outPoint-padding;
    }

function syncMarkers(layerA,layerB,markerName){
    //moves layerA based on named marker to layerB marker position    
    var layerAMarker=layerA.property("Marker");
    var layerBMarker=layerB.property("Marker");
    var layerAMarkerIndex=locateMarkerIndex(layerAMarker,markerName);
    var layerBMarkerIndex=locateMarkerIndex(layerBMarker,markerName);
    if ((layerAMarkerIndex+layerBMarkerIndex)>0){ //GO
        var markerATime=layerAMarker.keyTime(layerAMarkerIndex);
        var markerBTime=layerBMarker.keyTime(layerBMarkerIndex);
        var gap=getMarkerStartGap(layerA,layerAMarker,layerAMarkerIndex);
        layerA.startTime=markerBTime-gap;
    } else {
        alert("one or more markNames weren't found");
    }
}

function syncSingleMarkers(layerA,layerB){
    //moves layerA based on single marker to layerB marker position    
    var layerAMarker=layerA.property("Marker");
    var layerBMarker=layerB.property("Marker");
    //var layerAMarkerIndex = locateMarkerIndex(layerAMarker,markerName);
    //var layerBMarkerIndex = locateMarkerIndex(layerBMarker,markerName);
    //if ((layerAMarkerIndex+layerBMarkerIndex)>0){ //GO
        var markerATime=layerAMarker.keyTime(1);
        var markerBTime=layerBMarker.keyTime(1);
        var gap=getMarkerStartGap(layerA,layerAMarker,1);
        layerA.startTime=markerBTime-gap;
    //} else {
        //alert("one or more markNames weren't found");
    //}
}

function syncTransitionsToTheirNextLayer(mainLayers,transitions){
    for (var i=0; i<transitions.length; i++){
        var index=transitions[i].index;
        var nextLayer=mainLayers[index+1];
        syncMarkerToOutPoint(transitions[i],nextLayer);
    }
}

function syncAllLayersThatHaveSound(allLayersThatHaveSound,introLayer){
    //snap to workAreaStart
    syncInPointToOutPoint(allLayersThatHaveSound[0],introLayer,0);
    for (var i=1; i<allLayersThatHaveSound.length; i++){ //we start at 1 cause first layer snapped to begining
        var current=allLayersThatHaveSound[i];
        var prior=allLayersThatHaveSound[i-1];
        syncInPointToOutPoint(current,prior,0);
    }
}