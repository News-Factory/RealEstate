
/////  16/12/2020
///// Functions that fix details for text paddings/margins etc in R&B template

function setLogoScaleAndPositionRB(layer){
        var width=layer.width;
        var height=layer.height;
        // alert(height);
        // alert(width); 

        if (height > 1000){
            layer.property('scale').setValueAtTime(0.2,[20,-20,100]);
            layer.property('position').setValueAtTime(0.2, [-1062, -400]);
        } else if (height > 500 && width >1500){
            layer.property('scale').setValueAtTime(0.2,[26,26,100]);
            layer.property('position').setValueAtTime(0.2, [1000, 530]);
        }else {
            layer.property('scale').setValueAtTime(0.2,[60,60,100]);
            layer.property('position').setValueAtTime(0.2, [550, 550]);
        }
    }

function setLogoScaleAndPositionTR(layer){
        var width=layer.width;
        var height=layer.height;
        // alert(height);
        // alert(width); 
        if (height < 150 && width < 250){
            layer.property('scale').setValueAtTime(0.1,[250,250,100]);
        }else{
            layer.property('scale').setValueAtTime(0.1,[50,50,100]);
        }
        layer.property('position').setValueAtTime(0.1, [290, 335]);
    }


function centerText_BackGroundPadding(x,layer){
    var textBG = x.allLayers[layer]['Text BG'];
    textBG.property('position').setValue([-10.5, -77]);
}

function topScrollingText_SpaceBetween(x){
    // fixing yet more text variations, this time for the up scroll spaces between words
    var Rooms = x.allLayers['Data']['Rooms'];
    var HRooms = x.allLayers['Data']['HRooms'];
    var Size = x.allLayers['Data']['Size'];
    var HSize = x.allLayers['Data']['HSize'];
    var Floor = x.allLayers['Data']['Floor'];
    var HFloor = x.allLayers['Data']['HFloor'];
    var Price = x.allLayers['Data']['Price'];
    var HPrice = x.allLayers['Data']['HPrice'];

    // this is to fix the position between them (need to wrap in a function like the one below)
    Rooms.property('position').setValue([1700, 30]);
    HRooms.property('position').setValue([1875, 30]);
    Size.property('position').setValue([1330, 30]);
    HSize.property('position').setValue([1585, 30]);
    Floor.property('position').setValue([970, 30]);
    HFloor.property('position').setValue([1125, 30]);
    Price.property('position').setValue([655, 30]);
    HPrice.property('position').setValue([805, 30]);

    // fixing the anchor point of the writings on the top scroll for Photos Comp
    var dataText = x.allLayers['Data'].comp;
    var data = dataText.layers;

    for (i = 1; i < data.length; i++){
        data[i].property('anchorPoint').setValue([-1.6, -20]);
    }
}

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
