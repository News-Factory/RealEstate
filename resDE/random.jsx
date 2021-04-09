
#include "scale.jsx";

function randomIntroOutroDE(x){    // 15/01/2021
    var cityBoth= x.allLayers['1_Middle Ticker']['City'].sourceText.value.toString();
    var city=cityBoth.split('-')[0];
    var mommyFolderPath='G:/My Drive/Real Estate Project/';
    var introFootageFolder= new Folder(mommyFolderPath+'City Footage/air shots/'+city);

    var introFootage= introFootageFolder.getFiles();

    var index=introFootage.length;
    var introLayer=x.allLayers['Video Intro']['Video Intro'];
    var outroLayer=x.allLayers['Video Outro']['Video Outro'];
    // alert(introLayer.name);

    var randomIntro= Math.floor(Math.random()*index);
    if(randomIntro <= index/2){
        var randomOutro= randomIntro+1;
    } else {
        var randomOutro= randomIntro-1;
    }
    // var randomOutro= Math.floor(Math.random()*outroInt);
    var videoIntroPath= introFootage[randomIntro];
    var videoOutroPath= introFootage[randomOutro];

    // this is the part of code to avoid the fucking .ini files
    var noIni1= String(videoIntroPath).split('.')[1];
    var noIni2= String(videoOutroPath).split('.')[1];

    if (noIni1 == 'ini'){
        if (randomIntro > index/2){
            var videoIntroPath= introFootage[randomIntro-2];
        } else {
            var videoIntroPath= introFootage[randomIntro+2];
        }
    }

    if (noIni2 == 'ini'){
        if (randomOutro > index/2){
            var videoOutroPath= introFootage[randomOutro-2];
        } else {
            var videoOutroPath= introFootage[randomOutro2];
        }
    }

    var videoIntro= app.project.importFile(new ImportOptions(new File(videoIntroPath)));
    var videoOutro= app.project.importFile(new ImportOptions(new File(videoOutroPath)));
    // alert(videoIntro.name);

    introLayer.replaceSource(videoIntro,true);
    fitToComp(introLayer);
    outroLayer.replaceSource(videoOutro,true);
    fitToComp(outroLayer);
}

function randomVideoAvira(x, aviraNumber) {
    var aviraString= x.allLayers['Avira Text Box']['Avira'+aviraNumber].sourceText.value.toString();
    var avira= aviraString.split(' - ')[1];
    // alert(avira);
    var mommyFolderPath='G:/My Drive/Real Estate Project/';
    var aviraFootageFolder= new Folder(mommyFolderPath+'Footage/ISRAEL/'+avira);
    var aviraFootage= aviraFootageFolder.getFiles();

    var index=aviraFootage.length;
    var vidLayer=x.allLayers['Video Comp']['Video_'+(aviraNumber)];
    var random= Math.floor(Math.random()*index);
    var vidPath= aviraFootage[random];

    var noIni1= String(vidPath).split('.')[1];
    if (noIni1 == 'ini'){
        if (random > index/2){
            var vidPath= aviraFootage[random - 1];
        } else {
            var vidPath= aviraFootage[random + 1];
        }
    }
    var video= app.project.importFile(new ImportOptions(new File(vidPath)));
    vidLayer.replaceSource(video,true);
    fitToComp(vidLayer);
}