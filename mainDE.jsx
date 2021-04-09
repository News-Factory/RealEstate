#include "./resDE/define.jsx";
#include "./resDE/trim.jsx";
#include "./resDE/check.jsx";
#include "./resDE/set.jsx";
#include "./resDE/import.jsx";
#include "./resDE/match.jsx";
#include "./resDE/insert.jsx";
#include "./resDE/scale.jsx";
#include "./resDE/style.jsx";
#include "./resDE/format.jsx";
#include "./resDE/fade.jsx";
#include "./resDE/labels.jsx";
#include "./resDE/random.jsx";
#include "./resDE/sheetConstruct.jsx";

//Stage01 Match - match the titles in the sheet to layers in the project
//Stage02 Import files into the project
//Stage03 Insert text, footage and visibility
//Stage04 Trim and set composition locations
//Stage05 Slicer
//Stage06 Set background music ++

{   
    // var mommyFolderPath='G:/My Drive/Real Estate Project/';
    // var waitingFolder=new Folder(mommyFolderPath+'waiting4csv');  // the normal folder is "waiting"
    // var processedFolder=new Folder(mommyFolderPath+'processed');

    // var wFiles=waitingFolder.getFiles();
    // var txtFilePath=mommyFolderPath+waitingFolder.name+'/'+wFiles[0].name;
    // var x=defineMainProjectItems(txtFilePath); 
    // sc_constructGS(x);  // this function creates the google sheet thingy
    batchProcessDE();
}


function batchProcessDE(){
    // app.beginSuppressDialogs();
    var mommyFolderPath='G:/My Drive/Real Estate Project/';
    var waitingFolder=new Folder(mommyFolderPath+'waiting');  // the normal folder is "waiting"
    var processedFolder=new Folder(mommyFolderPath+'testProcess');

    var wFiles=waitingFolder.getFiles();
    for (var i=0; i<wFiles.length; i++){

        var fileName=wFiles[i].name.indexOf('Descriptive');
        var fileExt=wFiles[i].name.split('.')[1];
        
        if (fileExt=='txt' && fileName !== -1){
            var txtFilePath=mommyFolderPath+waitingFolder.name+'/'+wFiles[i].name;
            var x=defineMainProjectItems(txtFilePath); 
                
            var success=realEstateDE(x);
            // realEstate success activates the rendering queue and moves txt files
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

function realEstateDE(x){

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

    setTheMusic(x);

    // Stage05
    slicer(x);

    // setDurationForIntroComp(x);  // defines the lenght of the intro comp based on music
    // setDurationForOutroComp(x);  // defines the lenght of the outro comp based on the music
    // setScaleDurationMarkersForVideosComp(x);
    
    //Stage06
    soundAndDetails(x);
    
    app.endUndoGroup();
   return true;
}

//ARRANGE slicer003

//Four functions to supplement the slicer
function slicer(x){
    // 20/01/2021  this part changes the length of the whole project that is gonna be exported 
    var main= x.allLayers['0_Main Comp'].comp;
    var veryEnd=main.layers[3].outPoint;
    main.workAreaDuration = veryEnd;
}


// 05/01/2020 recognizes what kind of template we are working on and 
// calls the last functions needed to fix the sound composition and some other last details
function soundAndDetails(x){  
    var template = x.projFile.name.split('.')[0];
    var logoLayer= x.allLayers['YOUR LOGO']['logo'];
    // alert(template);

    setLogoScaleAndPositionDE(logoLayer);
    // randomIntroOutroDE(x);
    onlyEnglishExtras(x);
    stylePrice(x);

    // fitSoundOnPhotoAndVideoComp(x);

}

function renderIt(x){
    //save and export

    // define date and hour for the export name
    var today=new Date();
    var date=today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
    var time=today.getHours()+"-"+today.getMinutes()+"-"+today.getSeconds();
    var dateTime=date+' '+time;

    var exportName=x.projFile.name.split('.')[0];;
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

