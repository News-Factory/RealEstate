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
#include "./res/random.jsx";
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
    var waitingFolder=new Folder(mommyFolderPath+'waiting2');  // the normal folder is "waiting"
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

    setScaleDurationMarkersForBothPhotosComp(x);
    
    // "twin" function of the one above to change duration of footages in [Videos Comp]  18/12/2020
    setScaleDurationMarkersForVideosComp(x);

    setDurationForOutroComp(x);  // 30/12/2020  defines the lenght of the outro comp 
    
    //Stage05
    soundAndDetails(x);
    
    // Stage06
    slicer(x);
    //setMainCompDuration(mainComp);
    //checkLayersMarker(x.comps);
    //RQaddActiveItem(x);

    app.endUndoGroup();

   return true;
}


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


//ARRANGE slicer003

//Four functions to supplement the slicer
function slicer(x){
    var mainLayers = x.mainComp.layers;

    // 22/01/2021
    // these variables are added because the function needs to set the length of the
    // intro comp based on the music in the intro

    if (x.photoComp) {//if naming was done correctly start
        
        var pcLayer=x.allLayers['Photos Comp 2'].comp;
        var photoLayers = pcLayer.layers;
        var howMany_Pictures = photoLayers.length;
        // alert(howMany_Pictures);
        var gap = 1;
        var locTestPhoto = getLoc_TestPhoto(x);
        // alert(locTestPhoto);

        var lastPic = x.allLayers['Photos Comp 2']['Room_Photo_'+locTestPhoto];
        brandIntroLayer = getByName(mainLayers, "Intro");
        droneLayer = getByName(mainLayers, "Drone Comp");
        pcLayer = getByName(mainLayers,"2_Photos Comp"); 
        alert(brandIntroLayer.outPoint);
        pcLayer.outPoint = lastPic.inPoint + droneLayer.outPoint;     
        // alert(lastPic.outPoint);

        // adjustDroneIntroOnMusicRB(x);  
        // var backgroundIntroSong = x.allLayers['Drone Shot']['Intro Sound'];
        // var neededTime = backgroundIntroSong.source.duration;
        // // alert(neededTime);
        // mainLayers[2].outPoint=neededTime + brandIntroLayer.outpoint;

        for (var i=1; i<mainLayers.length-2; i++){
            var layer = mainLayers[i];
            var nextLayer = mainLayers[i+1];
            // alert(layer.name);
            if (i ==2){
                adjustDroneIntroOnMusicRB(x);  
                var backgroundIntroSong = x.allLayers['Drone Shot']['Intro Sound'];
                var neededTime = backgroundIntroSong.source.duration;
                // alert(neededTime);
                mainLayers[2].outPoint=neededTime + brandIntroLayer.outPoint;
                nextLayer.startTime=layer.outPoint -gap;   
            } else {
                nextLayer.startTime=layer.outPoint -gap;    
            }
        } 

        fitSoundOnPhotosComp(x);       
        // 20/01/2021  this part changes the length of the whole project that is gonna be exported 
        var veryEnd=x.allLayers['0_Main Comp']['Outro'].outPoint;
        // alert(veryEnd);
        var main= x.allLayers['0_Main Comp'].comp;
        main.workAreaDuration = veryEnd;
   
    } else { //If naming hasn't been done correctly sound the alarm
        alert("0_Main Comp or 1_Photos Comp were not found. Please make sure their labels are named correctly and try again.");
    }
}

// END ARRANGE SCLICER003    

///// modified on 9/12/2020 to take into account the double length of the video layer

function getLoc_TestPhoto(x){//get the layer number where test photo is at

    var fixForm = 0;   // needed to use the google Form files folders 08/01/2020

    var pcLayer=x.allLayers['Photos Comp 2'].comp;
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
                    return f; 
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
        formatLogoTR(x);
        iconsCheckTR(x);
        insertIconsTopTicker(x)
        // fitSoundOnAll(x);
    }
    else if (template === 'Red&BlueNew'){
        formatLogoRB(x);
        formatBothPhotosComp(x);
        randomDroneShot(x);
        randomDroneComp(x);
        randomVideoAvira(x,1);
        randomVideoAvira(x,2);
        randomVideoAvira(x,3);
        onlyHebrewAviraBox(x);
        iconsCheckRB(x);
    }
    // fitSoundOnIntroOutro(x);
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


// 22/01/2021 this section changes the length of the intro comp based on the length of its music layer

function adjustDroneIntroOnMusicRB(x){
    var mainLayers = x.mainComp.layers;
    var introComp = mainLayers[1];
    // alert(introComp.outPoint);
    var droneIntro = mainLayers[2];
    var backgroundIntroSong = x.allLayers['Drone Shot']['Intro Sound'];
    var neededTime = backgroundIntroSong.source.duration;
    // alert(neededTime);
    droneIntro.outPoint = neededTime + introComp.outPoint;
}
