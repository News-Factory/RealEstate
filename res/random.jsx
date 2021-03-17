#include "scale.jsx"  
#include "import.jsx"  

function randomDroneShot(x){    // 05/02/2021
    var mommyFolderPath='D:/Real Estate Folder/';
    var introFootageFolder= new Folder(mommyFolderPath+'Shutterstock/City/Intro');
    var introFootage= introFootageFolder.getFiles();
    var index=introFootage.length;
    var droneIntroLayer=x.allLayers['Drone Shot']['Video Drone Intro'];

    var randomDrone= Math.floor(Math.random()*index);
    var videoDroneIntroPath= introFootage[randomDrone];

    var noIniD= String(videoDroneIntroPath).split('.')[1];
    if (noIni1 == 'ini'){
        if (randomDrone > index/2){
            var videoDroneIntroPath= introFootage[randomDrone - 1];
        } else {
            var videoDroneIntroPath= introFootage[randomDrone + 1];
        }
    }

    var videoDroneShot= app.project.importFile(new ImportOptions(new File(videoDroneIntroPath)));

    // alert(videoIntro.name);
    droneIntroLayer.replaceSource(videoDroneShot,true);
}

function randomVideoAvira(x, aviraNumber) {
    var aviraString= x.allLayers['Avira Headline']['Avira'+aviraNumber].sourceText.value.toString();
    var avira= aviraString.split(' - ')[1];
    // alert(avira);
    var mommyFolderPath='G:/My Drive/Real Estate Project/';
    var aviraFootageFolder= new Folder(mommyFolderPath+'Footage/'+avira);
    var aviraFootage= aviraFootageFolder.getFiles();

    // Code down here is to take out the desktop.ini files that create a TON of issues otherwise
    var index = aviraFootage.length;
    aviraFootage.splice(index,1);
    // alert(aviraFootage);

    var vidLayer=x.allLayers['Footage Comp']['Footage'+(aviraNumber+2)];
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

    // alert(vidLayer);
    var video= app.project.importFile(new ImportOptions(new File(vidPath)));
    vidLayer.replaceSource(video,true);
}

function randomCityDrones(x){   // 19/01/2021

    var cityTextLayer=  x.allLayers['Flat Details']['City'];
    var city= cityTextLayer.sourceText.value.toString().split('-')[0];
    // alert(city);

    var mommyFolderPath='G:/My Drive/Real Estate Project/City Footage/';
    var cityDronesFootageFolder= new Folder(mommyFolderPath+'air shots/'+ city);
    var cityDroneFootage= cityDronesFootageFolder.getFiles();
    // alert(cityDroneFootage);

    // Code down here is to take out the desktop.ini files that create a TON of issues otherwise
    var index = cityDroneFootage.length -1;
    cityDroneFootage.splice(index,1);
    // alert(cityDroneFootage);

    var Int=cityDroneFootage.length;
    // alert(Int/2);

    var firstVidLayer=x.allLayers['Footage1']['Footage1'];
    var secondVidLayer=x.allLayers['Footage2']['Footage2'];

    var randomFirst= Math.floor(Math.random()*Int);
    // alert(randomFirst);
    if (randomFirst >= Int/2 && randomFirst != 0){
        var randomSecond= randomFirst-1;
    } else {
        var randomSecond= randomFirst+1;
    }
    var firstVidPath= cityDroneFootage[randomFirst];
    var secondVidPath= cityDroneFootage[randomSecond];

    var noIni1= String(firstVidPath).split('.')[1];
    var noIni2= String(secondVidPath).split('.')[1];

    if (noIni1 == 'ini'){
        if (random > index/2){
            var firstVidPath= cityDroneFootage[randomFirst-2];
        } else {
            var firstVidPath= cityDroneFootage[randomFirst+2];
        }
    }

    if (noIni2 == 'ini'){
        if (random > index/2){
            var secondVidPath= cityDroneFootage[randomSecond-2];
        } else {
            var secondVidPath= cityDroneFootage[randomSecond+2];
        }
    }

    var firstVideo= app.project.importFile(new ImportOptions(new File(firstVidPath)));
    var secondVideo= app.project.importFile(new ImportOptions(new File(secondVidPath)));
    // alert(videoIntro.name);
    firstVidLayer.replaceSource(firstVideo,true);
    secondVidLayer.replaceSource(secondVideo,true);
    fitToComp(firstVidLayer);
    fitToComp(secondVidLayer);
}
