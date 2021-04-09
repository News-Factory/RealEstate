
/////  16/12/2020
///// Functions that fix details for text paddings/margins etc in R&B template

function setLogoScaleAndPositionDE(layer){
    var width=layer.width;
    var height=layer.height;
    // alert(height);
    // alert(width); 
    clearKeys(layer,'scale')
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
    layer.property('position').setValueAtTime(0.1, [500, 200]);
}



function duplicateWebsiteString(x){
    var websiteString= x.allLayers['1_Middle Ticker']['AgencyWebsite'].sourceText.value.toString();
    var logoWebsiteLayer= x.allLayers['Logo']['AgencyWebsite'];
    var closingWebsiteLayer= x.allLayers['Closing_Logo']['AgencyWebsite'];
    var videoWebsiteLayer= x.allLayers['2_Avira Text Box']['Website'];
    setText(logoWebsiteLayer, websiteString);
    setText(closingWebsiteLayer, websiteString);
    setText(videoWebsiteLayer, websiteString);
}

function duplicatePhoneString(x){
    var phoneString= x.allLayers['1_Middle Ticker']['BranchPhone'].sourceText.value.toString();
    var videoPhoneLayer= x.allLayers['2_Avira Text Box']['Phone'];
    setText(videoPhoneLayer, phoneString);
}

function onlyEnglishAviraAndCity(x){
    for (i=1; i<=3; i++){
        var layer=  x.allLayers['2_Avira Text Box']['Avira'+i];
        // alert(layer.name);
        var aviraString= layer.sourceText.value.toString();
        var avira= ' > '+aviraString.split(' - ')[1];
        setText(layer, avira);
    }
    var anotherLayer=  x.allLayers['1_Middle Ticker']['City'];
    var city= anotherLayer.sourceText.value.toString().split('-')[0];
    setText(anotherLayer, city);
}

function onlyHebrewAviraAndCity(x){
    for (i=1; i<=3; i++){
        var layer=  x.allLayers['Avira Text Box']['Avira'+i];
        // alert(layer.name);
        var aviraString= layer.sourceText.value.toString();
        var avira= ' > '+aviraString.split(' - ')[0];
        setText(layer, avira);
    }
    var anotherLayer=  x.allLayers['1_Middle Ticker']['City'];
    var city= anotherLayer.sourceText.value.toString().split('-')[1];
    setText(anotherLayer, city);
}


function onlyEnglishExtras(x){
    for (i=1; i<=6; i++){
        var textHolder = 'TEXTHOLDER'+(i+6);
        var extra = 'Extra'+i;
    
        var layer = x.allLayers[textHolder][extra];
        var extraString= layer.sourceText.value.toString();
        var feature= extraString.split('-')[1];

        setText(layer, feature);
    }
}


function onlyHebrewExtras(x){
    var layer = x.allLayers['1_Apartment Details']['Extras'];
    var extraString= layer.sourceText.value.toString();
    var allTheFeatures= extraString.split(',');

    for(i=0; i<allTheFeatures.length; i++){
        allTheFeatures[i] = allTheFeatures[i].split('-')[0];
    }
    allTheFeatures.unshift('\n');
    var allTheExtras= allTheFeatures.join('\n > ');

    setText(layer, allTheExtras);
}

// This function takes the price number and adds points to make it more readable  28/01/2021
function stylePrice(x){
    var layer=  x.allLayers['TEXTHOLDER1']['Price'];
    var priceString= layer.sourceText.value.toString();
    var len= priceString.length;
    var needsTo =priceString.indexOf(".");
    var needsToo =priceString.indexOf(",");
    // 
    if(needsTo == -1 && needsToo == -1){
        var first=priceString.slice(0, len-6);
        var second=priceString.slice(len-6,len-3);
        var third=priceString.slice(len-3,len);
        if (priceString < 5){
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

    var mommyFolderPath='G:/My Drive/Real Estate Project/';
    var musicFolder= new Folder(mommyFolderPath+'BackgroundMusic/Waveform Edits/'+moodString);
    var audioTracks= musicFolder.getFiles();
    var bodyTrackLayer=x.allLayers['Sound Comp']['BackgroundMusic'];

    var bodyPath= audioTracks[1];
    // alert(introPath);
    var bodyAudioTrack= app.project.importFile(new ImportOptions(new File(bodyPath)));
    bodyTrackLayer.replaceSource(bodyAudioTrack,true);
}
