
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
            layer.property('position').setValueAtTime(0.2, [890, 540]);
        }else if (height <100  && width < 300){
            layer.property('scale').setValueAtTime(0.2,[200,200,100]);
            layer.property('position').setValueAtTime(0.2, [950, 540]);
        }else {
            layer.property('scale').setValueAtTime(0.2,[60,60,100]);
            layer.property('position').setValueAtTime(0.2, [550, 550]);
        }
    }


function centerText_BackGroundPadding(x,layer){
    var textBG = x.allLayers[layer]['Text BG'];
    textBG.property('position').setValue([-10.5, -77]);
}

function topScrollingText_SpaceBetween(x){
    // fixing yet more text variations, this time for the up scroll spaces between words
    var Rooms = x.allLayers['Data']['Rooms'];
    var HRooms = x.allLayers['Data']['HRooms'];
    var Size = x.allLayers['Data']['SizeM2'];
    var HSize = x.allLayers['Data']['HSize'];
    var Floor = x.allLayers['Data']['ApartmentFloor'];
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

function onlyHebrewText(x){
    for (i=1; i<=3; i++){
        var layer=  x.allLayers['Avira Text Box']['Avira'+i];
        // alert(layer.name);
        var aviraString= layer.sourceText.value.toString();
        var avira= aviraString.split(' - ')[0];
        setText(layer, avira);
    }
    var cityTextLayer=  x.allLayers['AddressComp']['City'];
    var cityTextLayer2=  x.allLayers['Drone Text Box']['City'];
    var city= cityTextLayer.sourceText.value.toString().split('-')[1];
    setText(cityTextLayer, city);
    setText(cityTextLayer2, city);
}

function setTheMusic(x){
    var theMood=x.dataByType['meta'];
    var moodString= theMood[0].value.toString();
    // alert(moodString);

    var mommyFolderPath='D:/Real Estate Folder/';
    var musicFolder= new Folder(mommyFolderPath+'BackgroundMusic/Waveform Edits/'+moodString);
    var audioTracks= musicFolder.getFiles();
    var introTrackLayer=x.allLayers['Drone Shot']['Intro Sound'];
    var bodyTrackLayer=x.allLayers['Sound Comp']['BackgroundMusic'];
    
    var introPath= audioTracks[1];
    var bodyPath= audioTracks[0];
    // alert(bodyPath);
    var introAudioTrack= app.project.importFile(new ImportOptions(new File(introPath)));
    var bodyAudioTrack= app.project.importFile(new ImportOptions(new File(bodyPath)));
    introTrackLayer.replaceSource(introAudioTrack,true);
    bodyTrackLayer.replaceSource(bodyAudioTrack,true);
}

// This function takes the price number and adds points to make it more readable  28/01/2021
function stylePrice(x){
    var layer=  x.allLayers['Data']['Price'];
    var priceString= layer.sourceText.value.toString();
    var len= priceString.length;
    var needsTo =priceString.indexOf(".");
    var needsToo =priceString.indexOf(",");
    // 
    if(needsTo == -1 && needsToo == -1){
        var first=priceString.slice(0, len-6);
        var second=priceString.slice(len-6,len-3);
        var third=priceString.slice(len-3,len);
        if (priceString > 5){
            var endNumber=second+'.'+third;
        // alert(endNumber);
        } else {
            var endNumber=first+'.'+second+'.'+third;
        }
        setText(layer, endNumber);
    }
}