
#include "scale.jsx";

function randomIntroOutroTR(x){    // 15/01/2021
    var cityBoth= x.allLayers['Avira Headline Text']['city'].sourceText.value.toString();
    var city=cityBoth.split('-')[0];
    var mommyFolderPath='G:/My Drive/Real Estate Project/';
    var introFootageFolder= new Folder(mommyFolderPath+'City Footage/air shots/intros/'+city);

    var introFootage= introFootageFolder.getFiles();

    var introInt=introFootage.length;
    var introLayer=x.allLayers['Intro']['Video Intro'];
    var outroLayer=x.allLayers['Outro']['Video Outro'];
    // alert(introLayer.name);

    var randomIntro= Math.floor(Math.random()*introInt);
    if(randomIntro == 1){
        var randomOutro= 2;
    } else {
        var randomOutro= 1;
    }
    // var randomOutro= Math.floor(Math.random()*outroInt);
    var videoIntroPath= introFootage[randomIntro];
    var videoOutroPath= introFootage[randomOutro];

    // this is the part of code to avoid the fucking .ini files
    var noIni1= String(videoIntroPath).split('.')[1];
    var noIni2= String(videoOutroPath).split('.')[1];



    var videoIntro= app.project.importFile(new ImportOptions(new File(videoIntroPath)));
    var videoOutro= app.project.importFile(new ImportOptions(new File(videoOutroPath)));
    // alert(videoIntro.name);

    introLayer.replaceSource(videoIntro,true);
    fitToComp(introLayer);
    outroLayer.replaceSource(videoOutro,true);
    fitToComp(outroLayer);
}

function randomStartVideoComp(x){   // 19/01/2021
    var mommyFolderPath='G:/My Drive/Real Estate Project/';
    var barsFootageFolder= new Folder(mommyFolderPath+'Footage/Bars');
    var beachParksFootageFolder= new Folder(mommyFolderPath+'Footage/Beach');
    var familyFootageFolder= new Folder(mommyFolderPath+'Footage/Playground');
    var marketsFootageFolder= new Folder(mommyFolderPath+'Footage/Restaurants');
    var shoppingFootageFolder= new Folder(mommyFolderPath+'Footage/Shopping Malls');

    var barsFootage= barsFootageFolder.getFiles();
    var beachParksFootage= beachParksFootageFolder.getFiles();
    var familyFootage= familyFootageFolder.getFiles();
    var marketsFootage= marketsFootageFolder.getFiles();
    var shoppingFootage= shoppingFootageFolder.getFiles();

    var firstInt=familyFootage.length;
    var secondInt=beachParksFootage.length;
    // alert(firstInt);
    // alert(secondInt);

    var firstVidLayer=x.allLayers['Videos Comp']['Video_5'];
    var secondVidLayer=x.allLayers['Videos Comp']['Video_4'];

    var randomFirst= Math.floor(Math.random()*firstInt);
    var randomSecond= Math.floor(Math.random()*secondInt);

    var firstVidPath= familyFootage[randomFirst];
    var secondVidPath= beachParksFootage[randomSecond];

    var firstVideo= app.project.importFile(new ImportOptions(new File(firstVidPath)));
    var secondVideo= app.project.importFile(new ImportOptions(new File(secondVidPath)));
    // alert(videoIntro.name);

    firstVidLayer.replaceSource(firstVideo,true);
    fitToComp(firstVidLayer);
    secondVidLayer.replaceSource(secondVideo,true);
    fitToComp(secondVidLayer);

}

function randomVideoCompCity(x){
    var cityBoth= x.allLayers['Avira Headline Text']['city'].sourceText.value.toString();
    var city=cityBoth.split('-')[0];
    // alert(city);

    var mommyFolderPath='G:/My Drive/Real Estate Project/';
    var cityFootageFolder= new Folder(mommyFolderPath+'City Footage/air shots/'+city);
    var cityFootage= cityFootageFolder.getFiles();

    var cityInt=cityFootage.length -1;

    var firstVidLayer=x.allLayers['Videos Comp']['Video_5'];
    var secondVidLayer=x.allLayers['Videos Comp']['Video_4'];

    var random= Math.floor(Math.random()*cityInt);

    var firstVidPath= cityFootage[random];
    if (random > cityInt/2){
        var secondVidPath= cityFootage[random-1];
    } else{
        var secondVidPath= cityFootage[random+1];
    }

    var firstVideo= app.project.importFile(new ImportOptions(new File(firstVidPath)));
    var secondVideo= app.project.importFile(new ImportOptions(new File(secondVidPath)));
    // alert(videoIntro.name);

    firstVidLayer.replaceSource(firstVideo,true);
    fitToComp(firstVidLayer);
    secondVidLayer.replaceSource(secondVideo,true);
    fitToComp(secondVidLayer);
}

function randomVideoAvira(x, aviraNumber) {
    var aviraString= x.allLayers['Avira Text Box']['Avira'+aviraNumber].sourceText.value.toString();
    var avira= aviraString.split(' - ')[1];
    // alert(avira);
    var mommyFolderPath='G:/My Drive/Real Estate Project/';
    var aviraFootageFolder= new Folder(mommyFolderPath+'Footage/ISRAEL/'+avira);
    var aviraFootage= aviraFootageFolder.getFiles();

    var integer=aviraFootage.length-1;
    var vidLayer=x.allLayers['Videos Comp']['Video_'+(4-aviraNumber)];
    var random= Math.floor(Math.random()*integer);
    var vidPath= aviraFootage[random];
    var video= app.project.importFile(new ImportOptions(new File(vidPath)));
    vidLayer.replaceSource(video,true);
    fitToComp(vidLayer);
}