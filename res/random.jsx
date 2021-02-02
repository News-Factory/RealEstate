function randomIntroOutroTR(x){    // 15/01/2021
    var mommyFolderPath='D:/Real Estate Folder/';
    var introFootageFolder= new Folder(mommyFolderPath+'Shutterstock/City/Intro');
    var outroFootageFolder= new Folder(mommyFolderPath+'Shutterstock/City/Outro');

    var introFootage= introFootageFolder.getFiles();
    var outroFootage= outroFootageFolder.getFiles();

    var introInt=introFootage.length;
    var outroInt=outroFootage.length;

    var introLayer=x.allLayers['Intro']['Video Intro'];
    var outroLayer=x.allLayers['Outro']['Video Outro'];
    // alert(introLayer.name);

    var randomIntro= Math.floor(Math.random()*introInt);
    var randomOutro= Math.floor(Math.random()*outroInt);

    var videoIntroPath= introFootage[randomIntro];
    var videoOutroPath= outroFootage[randomOutro];

    var videoIntro= app.project.importFile(new ImportOptions(new File(videoIntroPath)));
    var videoOutro= app.project.importFile(new ImportOptions(new File(videoOutroPath)));
    // alert(videoIntro.name);

    introLayer.replaceSource(videoIntro,true);
    outroLayer.replaceSource(videoOutro,true);
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

function randomVideoCompCity(x){
    var cityBoth= x.allLayers['Avira Headline Text']['city'].sourceText.value.toString();
    var city=cityBoth.split('-')[0];
    // alert(city);

    var mommyFolderPath='D:/Real Estate Folder/';
    var cityFootageFolder= new Folder(mommyFolderPath+'Rahaf/Edited Shutterstock/'+city);
    var cityFootage= cityFootageFolder.getFiles();

    var cityInt=cityFootage.length;

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
    secondVidLayer.replaceSource(secondVideo,true);
}

function randomVideoAvira(x, aviraNumber) {
    var aviraString= x.allLayers['Avira Text Box']['Avira'+aviraNumber].sourceText.value.toString();
    var avira= aviraString.split(' - ')[1];
    // alert(avira);
    var mommyFolderPath='D:/Real Estate Folder/';
    var aviraFootageFolder= new Folder(mommyFolderPath+'Shutterstock/'+avira);
    var aviraFootage= aviraFootageFolder.getFiles();

    var integer=aviraFootage.length;
    var vidLayer=x.allLayers['Videos Comp']['Video_'+(4-aviraNumber)];
    var random= Math.floor(Math.random()*integer);
    var vidPath= aviraFootage[random];
    var video= app.project.importFile(new ImportOptions(new File(vidPath)));
    vidLayer.replaceSource(video,true);
}