#include "scale.jsx"  
#include "import.jsx"  

function randomDroneShot(x){    // 05/02/2021
    var mommyFolderPath='D:/Real Estate Folder/';
    var introFootageFolder= new Folder(mommyFolderPath+'Shutterstock/City/Intro');
    var introFootage= introFootageFolder.getFiles();
    var introInt=introFootage.length;
    var droneIntroLayer=x.allLayers['Drone Shot']['Video Drone Intro'];

    var randomDrone= Math.floor(Math.random()*introInt);
    var videoDroneIntroPath= introFootage[randomDrone];
    var videoDroneShot= app.project.importFile(new ImportOptions(new File(videoDroneIntroPath)));

    // alert(videoIntro.name);
    droneIntroLayer.replaceSource(videoDroneShot,true);
}

function randomVideoAvira(x, aviraNumber) {
    var aviraString= x.allLayers['Avira Text Box']['Avira'+aviraNumber].sourceText.value.toString();
    var avira= aviraString.split(' - ')[1];
    // alert(avira);
    var mommyFolderPath='G:/My Drive/Real Estate Project/';
    var aviraFootageFolder= new Folder(mommyFolderPath+'Footage/'+avira);
    var aviraFootage= aviraFootageFolder.getFiles();

    // Code down here is to take out the desktop.ini files that create a TON of issues otherwise
    var index = aviraFootage.length -1;
    aviraFootage.splice(index,1);
    // alert(aviraFootage);

    var integer=aviraFootage.length;
    var vidLayer=x.allLayers['Videos Comp']['Video_'+(4-aviraNumber)];
    var random= Math.floor(Math.random()*integer);
    var vidPath= aviraFootage[random];
    // alert(vidPath);
    var video= app.project.importFile(new ImportOptions(new File(vidPath)));
    vidLayer.replaceSource(video,true);
}

function randomDroneComp(x){   // 19/01/2021

    var cityTextLayer=  x.allLayers['AddressComp']['City'];
    var city= cityTextLayer.sourceText.value.toString().split('-')[0];
    // alert(city);

    var mommyFolderPath='G:/My Drive/Real Estate Project/Customer Photos/';
    var cityDronesFootageFolder= new Folder(mommyFolderPath+'Drones/'+ city);
    var cityDroneFootage= cityDronesFootageFolder.getFiles();
    // alert(cityDroneFootage);

    // Code down here is to take out the desktop.ini files that create a TON of issues otherwise
    var index = cityDroneFootage.length -1;
    cityDroneFootage.splice(index,1);
    // alert(cityDroneFootage);

    var Int=cityDroneFootage.length;
    // alert(Int/2);

    var firstVidLayer=x.allLayers['Drone Footage']['DroneFootage1'];
    var secondVidLayer=x.allLayers['Drone Footage']['DroneFootage2'];

    var randomFirst= Math.floor(Math.random()*Int);
    // alert(randomFirst);
    if (randomFirst >= Int/2 && randomFirst != 0){
        var randomSecond= randomFirst-1;
    } else {
        var randomSecond= randomFirst+1;
    }
    var firstVidPath= cityDroneFootage[randomFirst];
    var secondVidPath= cityDroneFootage[randomSecond];
    var firstVideo= app.project.importFile(new ImportOptions(new File(firstVidPath)));
    var secondVideo= app.project.importFile(new ImportOptions(new File(secondVidPath)));
    // alert(videoIntro.name);
    firstVidLayer.replaceSource(firstVideo,true);
    secondVidLayer.replaceSource(secondVideo,true);
    fitToComp(firstVidLayer);
    fitToComp(secondVidLayer);
}
