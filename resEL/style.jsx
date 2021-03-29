
/////  16/12/2020
///// Functions that fix details for text paddings/margins etc in R&B template

function setLogoScaleAndPositionRB(layer){
        var width=layer.width;
        var height=layer.height;
        // alert(height);

        if (height > 1000){
            layer.property('scale').setValueAtTime(0.2,[20,-20,100]);
            layer.property('position').setValueAtTime(0.2, [-1062, -400]);
        } else {
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
        } else if(width < 500){
            layer.property('scale').setValueAtTime(0.2,[90,90,100]);
        } else if (height < 100){
            layer.property('scale').setValueAtTime(0.1,[40,40,100]);           
        } else if (height >3000){
            layer.property('scale').setValueAtTime(0.1,[10,10,100]);  
        }else if (height >1000 && height <1500){
            layer.property('scale').setValueAtTime(0.1,[27,27,100]);  
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

function onlyHebrewAviraBox(x){
    for (i=1; i<=3; i++){
        var layer=  x.allLayers['Avira Text Box']['Avira'+i];
        // alert(layer.name);
        var aviraString= layer.sourceText.value.toString();
        var avira= aviraString.split(' - ')[0];
        setText(layer, avira);
    }
    var anotherLayer=  x.allLayers['Avira Headline Text']['city'];
    var city= anotherLayer.sourceText.value.toString().split('-')[1];
    setText(anotherLayer, city);
}

// This function takes the price number and adds points to make it more readable  28/01/2021
function stylePrice(x){
    var layer=  x.allLayers['Price']['Price'];
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

function setTheMusic(x){
    var theMood=x.dataByType['meta'];
    var moodString= theMood[0].value.toString();
    // alert(moodString);

    var mommyFolderPath='D:/Real Estate Folder/';
    var musicFolder= new Folder(mommyFolderPath+'BackgroundMusic/Waveform Edits/'+moodString);
    var audioTracks= musicFolder.getFiles();
    var introTrackLayer=x.allLayers['Intro']['Intro Sound'];
    var bodyTrackLayer=x.allLayers['Sound Comp']['BackgroundMusic'];
    
    var introPath= audioTracks[1];
    var bodyPath= audioTracks[0];
    // alert(introPath);
    var introAudioTrack= app.project.importFile(new ImportOptions(new File(introPath)));
    var bodyAudioTrack= app.project.importFile(new ImportOptions(new File(bodyPath)));
    introTrackLayer.replaceSource(introAudioTrack,true);
    bodyTrackLayer.replaceSource(bodyAudioTrack,true);
}


// 20/01/2021
// this was a huge pain in the ass function to show the hebrew names
// of the icons in the upper ticker of the photo comp

function insertIconsTopTicker(x){   
    var theIcons=x.dataByType['onoff'];
    var iconString= theIcons[0].value.toString();
    var activeIcons= iconString.split(', ');
    var tickerComp= x.allLayers['Details 2'].comp;
    // alert(activeIcons.length);

    for(i=0; i<activeIcons.length; i++){
        var iconWord = activeIcons[i].split('-');
        var option=iconWord[0];
        // alert(option); 
        var comp= x.allLayers['Details 2']['icon Ticker '+i];
        var layer= x.allLayers['icon Ticker '+i]['IT'+i];
        // alert(layer.name);
        layer.enabled=true;
        setText(layer,option);

        switch (i){
            case 0:
            tickerComp.width= 2700;
            moveBasicInfo(70);
            moveNewInfo(2272);
            break;
            case 1:
            tickerComp.width= 3100;
            moveBasicInfo(4);
            moveNewInfo(2635);
            break;
            case 2:
            tickerComp.width= 3400;
            moveBasicInfo(6);
            moveNewInfo(2900);
            break;
            case 3:
            tickerComp.width= 3700;
            moveBasicInfo(2);
            moveNewInfo(3230);
            break;
            case 4:
            tickerComp.width= 4000;
            moveBasicInfo(2);
            moveNewInfo(3500);
            break;
            case 5:
            tickerComp.width= 4300;
            moveBasicInfo(2);
            moveNewInfo(3735);
            break;
        }
    }

    // this function moves to the left all of the information that were already 'active' in the ticker
    // in order to make space for new info layers

    function moveBasicInfo(howMuch){
        for(j=1; j<= (6+i); j++){
            var infoLayer= tickerComp.layer(j);
            // alert(infoLayer.name);
            var position=infoLayer.property('Position');
            var keyNumber=position.numKeys;
            // alert(keyNumber);
            for (k=1; k<= keyNumber; k++){
                var time= position.keyTime(k);
                // alert(time);
                var value= position.keyValue(k);
                // alert(value[0]);
                var newValue= value[0]-howMuch;
                // alert(newValue);
                position.removeKey(k);
                position.setValueAtTime(time, [newValue, value[1]]);
            }
        }
    }

    // this function changes the X value for the position keyframes property of a layer
    // you need to have know the correct x value of where the layer needs to be, ofc

    function moveNewInfo(theX){  
        var position=comp.property('Position');
        var keyNumber=position.numKeys;
        for (n=1; n<= keyNumber; n++){
            var time= position.keyTime(n);
            // alert(time);
            var value= position.keyValue(n);
            // alert(value[0]);
            position.removeKey(n);
            position.setValueAtTime(time, [theX, value[1]]);
        }
    }
}