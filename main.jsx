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

    ///// ADDITIONAL functions to call in RED&BLUE
    // formatPhotosComp(x);
    // fitSoundOnPhotosComp();

    ///// ADDITIONAL functions to call in TRANSPARENT
    fitSoundOnAll();

    // sc_constructGS(x);  // this function creates the google sheet thingy

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
    setDurationForIntroComp(x);  // 29/12/2020  defines the lenght of the intro comp 

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
    // alert(mainLayers.length);

    if (x.photoComp) {//if naming was done correctly start
        
        var pcLayer=x.allLayers['Photos Comp'].comp;
        var photoLayers = pcLayer.layers;
        var howMany_Pictures = photoLayers.length;
        var gap = 0.75;
        var locTestPhoto = getLoc_TestPhoto(x);
        // alert(locTestPhoto);

        ///// This if statement arranges the layers in [0_Main Comp] in different ways
        ///// depending if the AE project has test pictures or not   23/12/2020
        if(locTestPhoto){
            var lastPic = x.allLayers['Photos Comp']['Room_Photo_'+(locTestPhoto +1)];
            pcLayer = getByName(mainLayers,"1_Photos Comp");  
            pcLayer.outPoint = lastPic.outPoint - gap*2;     
            // alert(lastPic.outPoint);

            for (var i=1; i<4; i++){
            var layer = mainLayers[i];
            var nextLayer = mainLayers[i+1];
            nextLayer.startTime=layer.outPoint;           
            } 

        } else {
            var lastPic = x.allLayers['Photos Comp']['Room_Photo_1'];
            gap = gap*2; 

            for (var i=2; i<4; i++){
            var layer = mainLayers[i];
            var nextLayer = mainLayers[i+1];         
            nextLayer.startTime=layer.outPoint -gap;
            }
        } 

    } else { //If naming hasn't been done correctly sound the alarm
        alert("0_Main Comp or 1_Photos Comp were not found. Please make sure their labels are named correctly and try again.");
    }
}

// END ARRANGE SCLICER003    

///// modified on 9/12/2020 to take into account the double length of the video layer

function getLoc_TestPhoto(x){//get the layer number where test photo is at

    var pcLayer=x.allLayers['Photos Comp'].comp;
    var photoLayers = pcLayer.layers;
    var howMany_Pictures = photoLayers.length;

    for (var j=howMany_Pictures; j>1; j--){
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

