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
//Stage06 Set background music 

{   
    //    HAVE A LOOK HERE!!!!!!
    
    //    HAVE A LOOK HERE!!!!!!!

    //    YOU MUST UNCOMMENT THE batchProcess() FUNCTION!!!!


    // var mommyFolderPath='G:/My Drive/Real Estate Project/';
    // var waitingFolder=new Folder(mommyFolderPath+'waiting2');  // the normal folder is "waiting"
    // var wFiles=waitingFolder.getFiles();
    // var txtFilePath=mommyFolderPath+waitingFolder.name+'/'+wFiles[0].name;
    // var x=defineMainProjectItems(txtFilePath); 
    // sc_constructGS(x);  // this function creates the google sheet thingy
    batchProcess();
}

function batchProcess(){
    // app.beginSuppressDialogs();
    var mommyFolderPath='G:/My Drive/Real Estate Project/';
    var waitingFolder=new Folder(mommyFolderPath+'waiting');  // the normal folder is "waiting"
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
    randomCityDrones(x);
    randomVideoAvira(x,1);
    randomVideoAvira(x,2);
    randomVideoAvira(x,3);

    //Stage04
    // setDurationForIntroComp(x);  // 29/12/2020  defines the lenght of the intro comp 

    setScaleDurationMarkersPhotosComp(x);
    
    // "twin" function of the one above to change duration of footages in [Videos Comp]  18/12/2020
    setScaleDurationMarkersForVideosComp(x);

    // setDurationForOutroComp(x);  // 30/12/2020  defines the lenght of the outro comp 
    
    // Stage05
    slicer(x);
    //setMainCompDuration(mainComp);
    //checkLayersMarker(x.comps);
    //RQaddActiveItem(x);

    //Stage06
    soundAndDetails(x);

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

function iconsCheckAS(x){
    var theIcons=x.dataByType['onoff'];
    // alert(activeIcons[0]);
    // var background=  x.allLayers['1_Photos Comp']['IconsBackground'];
    // // alert(background.name);
    // background.property('position').removeKey(2);

    for(i=1; i<=theIcons.length; i++){
        var iconString= theIcons[i-1].value.toString();
        // var activeIcons= iconString.split(', ');
        var optionLanguage = iconString.split('-');
        var option=optionLanguage[1];
        // alert(option);
        var iconComp = x.allLayers['Icon Loop '+i].comp;
        var iconLayer = iconComp.layer(option);
        // alert(iconLayer.name);
        iconLayer.enabled=true;

    }
}


//ARRANGE slicer003

//Four functions to supplement the slicer
function slicer(x){
    var mainLayers = x.mainComp.layers;
    var gap = 0.3;

    for (var i=1; i<mainLayers.length-1; i++){
        var layer = mainLayers[i];
        var nextLayer = mainLayers[i+1];
        if (i == 2){
            gap =1.2;
            nextLayer.startTime=layer.outPoint -gap;  
            var photoComp = x.allLayers['0_Main Comp']['1_Photos Comp'];
            var transition = photoComp.effect(1).property('Transition Completion');
            // alert(transition);
            for (k=2; k > 0; k--){
                transition.removeKey(k);
                if (k==2){
                    transition.setValueAtTime(layer.outPoint, 100);
                } 
                else {
                    transition.setValueAtTime(layer.outPoint -gap, 0);
                }
            }
        }else{
        // alert(layer.name);
        nextLayer.startTime=layer.outPoint -gap; 
        }  
    } 
    // fitSoundOnPhotosComp(x);       
    // 20/01/2021  this part changes the length of the whole project that is gonna be exported 
    var veryEnd=x.allLayers['0_Main Comp']['Outro'].outPoint;
    // alert(veryEnd);
    var main= x.allLayers['0_Main Comp'].comp;
    main.workAreaDuration = veryEnd;
}

// END ARRANGE SCLICER003    


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
    else if (template === 'Anglo-Saxon'){
        // formatPhotosComp(x);
        iconsCheckAS(x);
        onlyHebrewText(x);
        stylePrice(x);
        // iconsCheckAS(x);
    }
    setTheMusic(x);
    fitSoundOnAll(x);
}

function renderIt(x){
    //save and export

    // define date and hour for the export name
    var today=new Date();
    var date=today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
    var time=today.getHours()+"-"+today.getMinutes()+"-"+today.getSeconds();
    var dateTime=date+' '+time;

    var exportName=x.projFile.name.split('.')[0];
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

// 22/01/2021 this section changes the length of the intro comp based on the length of its music

function adjustDroneIntroSlideOnMusicRB(x){

    var introHeadlineLayer = x.allLayers['Drone Shot']['Intro Box'];
    var backgroundIntroSong = x.allLayers['Drone Shot']['Intro Sound'];
    var gap = 1;
    var neededTime = backgroundIntroSong.source.duration;
    // alert(neededTime);

    var headlinePos = introHeadlineLayer.property('position');
    
    var droneMask = x.allLayers['Drone Shot']['Cyan Solid'];
    var pathMask = droneMask.mask(1).property('ADBE Mask Shape');

    var keyNumber=2
    for (k=1; k <= keyNumber; k++){
        var position = headlinePos.keyValue(k);
        // this is a shape object, the vertices attributes is an array of 4 objects
        var pathValue= pathMask.keyValue(k); 
        headlinePos.removeKey(k);
        pathMask.removeKey(k);

        if (k==1){
            headlinePos.setValueAtTime(neededTime -0.2, position);
            pathMask.setValueAtTime(neededTime, pathValue);
        } else {
            headlinePos.setValueAtTime(neededTime + gap -0.2, position);
            pathMask.setValueAtTime(neededTime + gap, pathValue);
        }
    }
}

function adjustAnimationEndPhotosComp2(x, neededTime){
    var photoMask = x.allLayers['2_Photos Comp']['Cyan Solid'];
    var gap = 0.5;
    // alert(neededTime);
    var pathMask=photoMask.mask(1).property('ADBE Mask Shape');

    var keyNumber=2
    for (k=1; k <= keyNumber; k++){
        // this is a shape object, the vertices attributes is an array of 4 objects
        var pathValue= pathMask.keyValue(k);  
        pathMask.removeKey(k);

        if (k==1){
            pathMask.setValueAtTime(neededTime- gap, pathValue);
        } else {
            pathMask.setValueAtTime(neededTime, pathValue);
        }
    }
}