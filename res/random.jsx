#include "scale.jsx"  
#include "import.jsx"  


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

function randomDroneShotAndComp(x){   // 19/01/2021
    var cityTextLayer=  x.allLayers['AddressComp']['City'];
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

    var Int=cityDroneFootage.length -1;
    // alert(Int/2);

    var firstVidLayer=x.allLayers['Drone Footage']['DroneFootage1'];
    var secondVidLayer=x.allLayers['Drone Footage']['DroneFootage2'];

    var randomFirst= Math.floor(Math.random()*Int);
    // alert(randomFirst);
    if (randomFirst >= Int/2 && randomFirst != 0){
        var randomSecond= randomFirst-1;
        var randomDrone= randomFirst-2;
    } else {
        var randomSecond= randomFirst+1;
        var randomDrone= randomFirst+2;
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

    var droneIntroLayer=x.allLayers['Drone Shot']['Video Drone Intro'];

    var videoDroneIntroPath= cityDroneFootage[randomDrone];
    var videoDroneShot= app.project.importFile(new ImportOptions(new File(videoDroneIntroPath)));

    // alert(videoIntro.name);
    droneIntroLayer.replaceSource(videoDroneShot,true);
}
