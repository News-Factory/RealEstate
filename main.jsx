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
//Stage05 Slicer
//Stage06 Set background music ++

{
    // sc_constructGS(x);  // this function creates the google sheet thingy
    batchProcess();
}

function batchProcess(){
    // app.beginSuppressDialogs();
    var mommyFolderPath='G:/My Drive/Real Estate Project/';
    var waitingFolder=new Folder(mommyFolderPath+'waiting');
    var processedFolder=new Folder(mommyFolderPath+'processed');

    var wFiles=waitingFolder.getFiles();
    for (var i=0; i<wFiles.length; i++){
        var fileExt=wFiles[i].name.split('.')[1];
        if (fileExt=='txt'){
            var txtFilePath=mommyFolderPath+waitingFolder.name+'/'+wFiles[i].name;
            var x=defineMainProjectItems(txtFilePath);
            var success=realEstate(x);
            
            // realExtate success activates the rendering queue and moves txt files
            if (success){                
                renderIt(x);
                
                var fileName=wFiles[i].name;
                var dest=mommyFolderPath+processedFolder.name+'/'+fileName;
                wFiles[i].copy(dest);
                wFiles[i].remove();              
            }
        }
    }
    app.endSuppressDialogs(alert);
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

    setDurationForOutroComp(x);  // 30/12/2020  defines the lenght of the outro comp 
    
    //Stage05
    slicer(x);
    //setMainCompDuration(mainComp);
    //checkLayersMarker(x.comps);
    //RQaddActiveItem(x);

    // Stage06
    soundAndDetails(x);

    app.endUndoGroup();

   return true;
}

// function onOffProcedure(found){
//     //New form of setVisibility
//     for (var n=0; n<found.onoff.length; n++){
//         var layerName=found.onoff[n].layer.name;
//         alert(found.onoff.length);
//         var onoffBoolean=found.onoff[n].value.toLowerCase().indexOf('on')>-1;
//         for (var i=0; i<x.comps.length; i++){
//             var comp=x.comps[i];
//             var layers=comp.layers; 
//             for (var j=1; j<=layers.length; j++){
//                 if (layers[j].name==layerName){
//                    // setVisibility(layers[j].name,onoffBoolean);   
//                     if(!onoffBoolean){
//                         setText(layers[j+1]," ");
//                     }                
//                 }
//             }
//         }
//     }
// }

// new logic for turning on and off the icons in R&B  12/01/2020
function iconsCheckRB(x){    
    for (var i=1; i<11; i++){
        var theIcon= x.allLayers['Apartment Icons']['Icon'+i];
        // alert(theIcon.property("Source Text").value);
        var approved= x.allLayers['Apartment Icons']['CM'+i];
        // alert(approved.name);
        if (theIcon.property("Source Text").value != ''){
            approved.enabled=true;
        } else {
            approved.enabled=false;
        }
    }
}

// new logic for turning on and off the icons in TR  13/01/2020
function iconsCheckTR(x){
    var theIcons=x.dataByType['onoff'];
    var iconString= theIcons[0].value.toString();
    var activeIcons= iconString.split(', ');
    // alert(activeIcons[0]);
    var background=  x.allLayers['1_Photos Comp']['IconsBackground'];
    // alert(background.name);
    background.property('position').removeKey(2);

    for(i=0; i<activeIcons.length; i++){
        var option = activeIcons[i];
        // alert(option);
        var iconLayer = x.allLayers['ICONS 003']['icon '+option];
        // alert(iconLayer.name);
        iconLayer.enabled=true;
        
        switch (i){
            case 0:
            iconLayer.property('position').setValueAtTime(0.1, [739, 167]);
            break;
            case 1:
            iconLayer.property('position').setValueAtTime(0.1, [617, 167]);
            break;
            case 2:
            iconLayer.property('position').setValueAtTime(0.1, [493, 167]);
            break;
            case 3:
            iconLayer.property('position').setValueAtTime(0.1, [369, 167]);
            break;
            case 4:
            iconLayer.property('position').setValueAtTime(0.1, [248, 167]);
            break;
            case 5:
            iconLayer.property('position').setValueAtTime(0.1, [125, 167]);
            break;
        }
    }

    var distance = 1510 - 110 * (activeIcons.length-1);
    background.property('position').setValueAtTime(2.5, [distance, 540]);


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
        var gap = 1.5;
        var locTestPhoto = getLoc_TestPhoto(x);
        // alert(locTestPhoto);

        ///// This if statement arranges the layers in [0_Main Comp] in different ways
        ///// depending if the AE project has test pictures or not   23/12/2020
        if(locTestPhoto){
            var lastPic = x.allLayers['Photos Comp']['Room_Photo_'+(locTestPhoto +1)];
            pcLayer = getByName(mainLayers,"1_Photos Comp");  
            pcLayer.outPoint = lastPic.outPoint - gap;     
            // alert(lastPic.outPoint);

            for (var i=1; i<4; i++){
            var layer = mainLayers[i];
            var nextLayer = mainLayers[i+1];
            nextLayer.startTime=layer.outPoint;           
            } 

        } else {
            var lastPic = x.allLayers['Photos Comp']['Room_Photo_21'];
            var introDuration = mainLayers[1].outPoint;
            pcLayer = getByName(mainLayers,"1_Photos Comp");  
            pcLayer.outPoint = lastPic.outPoint + introDuration -gap; 
            // alert(lastPic.outPoint);
            
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

    var template = x.projFile.name.split('.')[0];
    var fixForm = 0;   // needed to use the google Form files folders 08/01/2020

    if (template == 'Transparent'){
        fixForm = 20;
    }

    var pcLayer=x.allLayers['Photos Comp'].comp;
    var photoLayers = pcLayer.layers;
    var howMany_Pictures = photoLayers.length;

    for (var j=howMany_Pictures; j>1; j--){
        var f =j+fixForm;
        var compName = "Room_Photo_"+f;
        var comp = getByName(x.comps,compName);
        var tLayers = comp.layers;
        // alert(compName);

        for (i=1; i<= tLayers.length; i++){
            var layerName = tLayers[i].name;
        
            if (layerName == "RoomP"+f){
                var imageSourceName = tLayers[i].source.name;  // check every layer for the image with the source
                var imageSourceType = getFileType(imageSourceName);

                if (imageSourceName=="Test Photo.jpg"){ //if the source is Test Photo we can then get the location
                    return j; 
                }
            }
        }
    }
}


// 05/01/2020 recognizes what kind of template we are working on and 
// calls the last functions needed to fix the sound composition and some other last details
function soundAndDetails(x){  
    var template = x.projFile.name.split('.')[0];
    // alert(template);
    if (template === 'Transparent'){
        formatLogo(x);
        iconsCheckTR(x)
        fitSoundOnAll(x);
    }
    else if (template === 'Red&Blue'){
        // alert('hi');
        formatPhotosComp(x);
        iconsCheckRB(x)
        fitSoundOnPhotosComp(x);
        fitSoundOnIntroOutro(x);
    }
}

function renderIt(x){
    //save and export

    // define date and hour for the export name
    var today=new Date();
    var date=today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
    var time=today.getHours()+"-"+today.getMinutes()+"-"+today.getSeconds();
    var dateTime=date+' '+time;

    var exportName='tempName';
    var exportComp=x.mainComp.duplicate();
    var resultFile = new File(x.paths['exports']+'/'+dateTime+exportName+'.mp4');
    var savePath = x.paths['saves']; //+' '+exportName+'.aep';
    // alert(savePath);
    exportComp.name = x.paths['exports']+'/'+dateTime+exportName+'.mp4'; //paths['exports']+

    exportComp.openInViewer();
    var renderQueue=app.project.renderQueue;
    var render=renderQueue.items.add(exportComp);
    render.outputModules[1].file=resultFile;
    app.project.renderQueue.queueInAME(true);
    //app.project.save(resultFile);
    app.project.close(CloseOptions.DO_NOT_SAVE_CHANGES);
}