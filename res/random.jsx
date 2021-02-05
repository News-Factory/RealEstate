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

function randomStartVideoComp(x){   // 19/01/2021
    var mommyFolderPath='D:/Real Estate Folder/';
    var barsFootageFolder= new Folder(mommyFolderPath+'Shutterstock/Bars-Restaurants');
    var beachParksFootageFolder= new Folder(mommyFolderPath+'Shutterstock/Beach-Parks');
    var familyFootageFolder= new Folder(mommyFolderPath+'Shutterstock/Family');
    var marketsFootageFolder= new Folder(mommyFolderPath+'Shutterstock/Bars-Restaurants');
    var shoppingFootageFolder= new Folder(mommyFolderPath+'Shutterstock/Shopping');
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
    secondVidLayer.replaceSource(secondVideo,true);
}
