#include 'get.jsx';
//merged with readWrite 050920

function defineMainProjectItems(){
    var x = {};
    x.projFile = app.project.file;
    x.items = app.project.items;   

    x.comps = getAllByType(x.items,"Composition");
    x.folders = getAllByType(x.items,"Folder");    
    x.footages = getAllByType(x.items,"Footage");   
    x.importFolder = getByName(x.items,"importFolder");

    x.allLayers=reconstructProjectAsNamesObjects(x.comps);
    x.mainComp=getMainComp(x.comps);
    x.photoComp=getByName(x.comps,"1_Photos Comp");

    x.paths = definePaths(true); //true is script is in News Factory
    x.sym = defineSymbols();
    x.data = defineMasterObj(x.paths, x.sym); //An array of objects with title, value and type
    x.dataByType=getData_byTitleValueType(x.data);
    x.tog = defineTogglers();
    //x.log = setUpLogFile(x.paths['logFile'],x.projFile);

    var allLayers=getAllLayersByType(x.comps); //get all text and av layers 19/10/2020
    x.textLayers=allLayers.text;
    x.avLayers=allLayers.av;
    x.compLayers=allLayers.comps;
    return x;
}

function definePaths(newsfactoryBoolean){
    var paths={};
    if(newsfactoryBoolean){
        //News factory paths:
        paths['drive']='G';
        paths['realEstate']=paths['drive']+':/My Drive/Real Estate Project/';
        paths['txtFile']=paths['realEstate']+'old/OneRow/sharonH.txt'; //Varies according to computer;
        //paths['updateFile']=paths['realEstate']+'OneRow/whenUpdated.txt';    
        paths['footageFolder']=paths['drive'] + ':/My Drive/Programming/real-estate/Realestate Project 121020/(Footage)/importFolder';
    } else {
        //Oren paths:
        paths['realEstate']='H:/alt Studio Dropbox/Oren Menache/News Factory/Nadlan/Realestate1/';
        paths['txtFile']=paths['realEstate']+'export.txt';
        paths['footageFolder']=paths['realEstate']+'(Footage)/importFolder';
    }
    return paths;
}

function reconstructProjectAsNamesObjects(comps){
    //go over every item, comp, folder, and get items by their name
    var complexComps={}; //two dimentional object
    var layerCounter=0;
    //var i=0;
    //alert(comps[i].name);
    for (var i=0; i<comps.length; i++){
        complexComps[comps[i].name]={comp:comps[i]};
        var layers=comps[i].layers;
        for (var j=1; j<=layers.length; j++){
            //Every comp object will now contain a set of named layers
            //alert(layers[j].name);
            complexComps[comps[i].name][layers[j].name]=layers[j];
            layerCounter++;
        }
    }
    return complexComps;
}

function defineTogglers(){
    var tog = {};
    tog.testingMode = false;
    tog.alertWhereWeAre = false;
    tog.errorBreakMode = true; //if an error is found break if true
    tog.loggingMode = true; //log errors if true, should always be turned on
    tog.alertErrorMode = true;
    return tog;
}

function defineSymbols(){
    var sym = {};
    sym['con']= "&~"; //will replace spaces
    sym['ref'] = "&^"; //divides object title and value
    return sym;
}

function defineMasterObj(paths, sym){
    //The more advanced version, can accept several object titles: title, value, type whereas the previous version could only accept two.
    try{
    var txt = gettxt(paths['txtFile']);
    var splitted = txt.split(sym['con']); //'title: '+title+sym['ref']+'value: '+value+sym['ref']+'type: '+type;
    
    var masterObj = [];
    for (var i=0; i<splitted.length; i++){
        var blob = splitted[i].split(sym['ref']);
        var singleObj = {}
        for (var j=0; j<blob.length; j++){
            var objPair = blob[j].split(": ");
            singleObj[objPair[0]]=objPair[1];
            }
        masterObj.push(singleObj);
        }
    return masterObj;
    } catch (e){
        alert(e.toString());
        return false;
    }
}

function defineAVTypes(){
    return ["vid","pic","sound"];
}