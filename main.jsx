#include "./res/define.jsx";
#include "./res/trim.jsx";
#include "./res/check.jsx";
#include "./res/set.jsx";
#include "./res/import.jsx";
#include "./res/match.jsx";
#include "./res/insert.jsx";
#include "./res/scale.jsx";
#include "./res/format.jsx";
#include "./res/fade.jsx";
#include "./res/labels.jsx";
#include "./res/sheetConstruct.jsx";

//Stage01 Match - match the titles in the sheet to layers in the project
//Stage02 Import files into the project
//Stage03 Insert text, footage and visibility
//Stage04 Trim and set composition locations
//Stage05 Set length, opacity, markers for Photos Comp
//Stage06 Slicer

{
    var x=defineMainProjectItems();
    realEstate(x);
    // formatPhotosComp(x);
    // sc_constructGS(x);

    // var PhotosComp=x.allLayers['Photos Comp'].comp;
    // var layer=PhotosComp.layers[5];
    // alert(layer.outPoint);
}

function realEstate(x){

    app.beginUndoGroup("realEstate");
        //the next line is a general procedure to find problems in the AE project
        //if(x.tog.alertErrorMode){checkFor_duplicateLayers(x);} //Alert duplicate layers //inside check.jsx
    
    //Stage01 load all layers by titles
    var found=matchAllTitlesToLayers(x);
        //we now have found.text=[], found.vid=[]... pic sound onoff
        //every item in the array==> found.text=[{layer,value,containingComp},{...},{...}]
        //in the case of AVlayers we need value to become an imported file:
        //found=importFiles(x,found,avtypes);
        
    //Stage02
    found=importAllFilesIntoProject(x,found);
        //Now all files are imported and the found obj now has a file where necessary
        //New structure: found.pic=[{layer,value,containingComp,file,fileType},{...},{...}]
        //When importing a file we need to know in what layer this file needs to go

    //Stage03
    insertAll(x,found); //set.jsx

    //Stage04
    setScaleDurationMarkersForPhotosComp(x);
    // "twin" function of the one above to change duration of footages in [Videos Comp]  18/12/2020
    setScaleDurationMarkersForVideosComp(x);
    
    //Stage05
    slicer(x);
    //setMainCompDuration(mainComp);
    //checkLayersMarker(x.comps);
    //RQaddActiveItem(x);

   app.endUndoGroup();   
}

function onOffProcedure(found){
    //New form of setVisibility
    for (var n=0; n<found.onoff.length; n++){
        var layerName=found.onoff[n].layer.name;
        var onoffBoolean=found.onoff[n].value.toLowerCase().indexOf('on')>-1;
        for (var i=0; i<x.comps.length; i++){
            var comp=x.comps[i];
            var layers=comp.layers; 
            for (var j=1; j<=layers.length; j++){
                if (layers[j].name==layerName){
                   // setVisibility(layers[j].name,onoffBoolean);   
                    if(!onoffBoolean){
                        setText(layers[j+1]," ");
                    }                
                }
            }
        }
    }
}

//ARRANGE slicer003

//Four functions to supplement the slicer
function slicer(x){
    var mainLayers = x.mainComp.layers;
    //var photosComp = getByName(x.comps,"Photos Comp");

    if (x.photoComp) {//if naming was done correctly start
        // var pcLayer = getByName(x.photoComp.layers,"Photos Comp");
        var pcLayer=x.allLayers['Photos Comp'].comp;
        var photoLayers = pcLayer.layers;
        var howMany_Pictures = photoLayers.length;
        // alert(howMany_Pictures);

        var locTestPhoto = getLoc_TestPhoto(x);
        ///// finding a different way to cut the end of the "Photos Comp"  14/12/2020
        ///// modifying it to work also without "Test Photo"  21/12/2020 
        if(locTestPhoto){
            var lastPic = x.allLayers['Photos Comp']['Room_Photo_'+(locTestPhoto -1)];        
        } else {
            var lastPic = x.allLayers['Photos Comp']['Room_Photo_'+(howMany_Pictures)];
        }

        pcLayer = getByName(mainLayers,"1_Photos Comp");
        pcLayer.outPoint = lastPic.outPoint-1;
        alert(pcLayer.outPoint);

        /////for (var i=5; i>1; i--){
        for (var i=1; i<=4; i++){
            var layer = mainLayers[i];
            // alert(layer.name);
            var marker = layer.property("Marker");
            // var numMarkers = marker.numKeys; //either 2 or 1
            // var firstComment = marker.keyValue(1).comment;
            // var secondComment = marker.keyValue(numMarkers).comment;
            // var firstMarkerTime = marker.keyTime(1);
            // var secondMarkerTime = marker.keyTime(numMarkers);
    
            //define previous layer marker params
            var nextLayer = mainLayers[i+1];
            // var prevLayerMarker = prevLayer.property("Marker");
            // var prevNumMarkers = prevLayerMarker.numKeys; //either 2 or 1
            // var prevLayerMarkerFirstComment = prevLayerMarker.keyValue(1).comment;
            // var prevLayerMarkerLastComment = prevLayerMarker.keyValue(prevNumMarkers).comment;
        
            //set locations based on marker comments
            // if (prevLayerMarkerLastComment==firstComment){
            //     var prevLayerMarkerTime = prevLayerMarker.keyTime(prevNumMarkers);
            //     var gap = firstMarkerTime-layer.startTime; //gap is calculated because layer starting point may differ from entry marker point
            //     layer.startTime=prevLayerMarkerTime-gap;
            // } else{
                nextLayer.startTime=layer.outPoint;
            // }
            
        } // end for stage 2 
    } else { //If naming hasn't been done correctly sound the alarm
        alert("0_Main Comp or 1_Photos Comp were not found. Please make sure their labels are named correctly and try again.");
    }
}

// END ARRANGE SCLICER003    

///// getLoc_TestPhoto has been modified on 9/12/2020 to take into account the double
///// length of the video layer

function getLoc_TestPhoto(x){//get the composition number where test photo is at

    var pcLayer=x.allLayers['Photos Comp'].comp;
    var photoLayers = pcLayer.layers;
    var howMany_Pictures = photoLayers.length;

    for (var j=1; j<= howMany_Pictures; j++){
        var compName = "Room_Photo_"+j;
        var comp = getByName(x.comps,compName);
        var tLayers = comp.layers;

        for (i=1; i<= tLayers.length; i++){
            var layerName = tLayers[i].name;
        
            if (layerName === "RoomP"+j){
                var imageSourceName = tLayers[i].source.name;  // check every layer for the image with the source
                var imageSourceType = getFileType(imageSourceName);

                if (imageSourceName=="Test Photo.jpg"){ //if the source is Test Photo we can then get the location
                    return j; 
                }
            }
        }
    }
}

