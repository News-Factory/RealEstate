#include 'get.jsx';

function defineMainProjectItems(txtFilePath){
    var x = {};
    x.paths=definePaths(true); //TRUE is script is in News Factory
    x.sym=defineSymbols();
    x.data=defineMasterObj(txtFilePath, x.sym); //An array of objects with title, value and type
    x.dataByType=getData_byTitleValueType(x.data);
    
    var template = txtFilePath.split('/')[4];
    var templateName = template.slice(18, template.length -4).toString();
    var projectFilePath=x.paths['projects']+'/'+templateName+'.aep';
    x.projFile=File(projectFilePath);
    alert('projFile: '+x.projFile.name);
    app.open(x.projFile);

    //x.projFile = app.project.file;
    x.items = app.project.items;   

    x.comps = getAllByType(x.items,"Composition");
    x.folders = getAllByType(x.items,"Folder");    
    x.footages = getAllByType(x.items,"Footage");   
    x.importFolder = getByName(x.items,"importFolder");

    x.allLayers=reconstructProjectAsNamesObjects(x.comps);
    x.mainComp=getMainComp(x.comps);
    x.photoComp=getByName(x.comps,"1_Photos Comp");

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
        //paths['txtFile']=paths['realEstate']+'old/OneRow/export2.txt'; //Varies according to computer, CHANGE TXT HERE according on project
        //paths['updateFile']=paths['realEstate']+'OneRow/whenUpdated.txt';    
        paths['footageFolder']=paths['drive'] + ':/My Drive/Programming/real-estate/Realestate Project 121020/(Footage)/importFolder';

        //paths['waitingFolder']=paths['realEstate']+'waiting';
        //paths['processedFolder']=paths['realEstate']+'processed';
        paths['projects']=paths['realEstate']+'projects';
        paths['saved']=paths['realEstate']+'saved';
        paths['exports']=paths['realEstate']+'exportsNew/Red&Blue';
    }
    return paths;
}

function defineTemplate(){
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
    tog.errorBreakMode = false; //if an error is found break if true
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

function defineMasterObj(txtFilePath, sym){
    //The more advanced version, can accept several object titles: title, value, and type.
    try{
    var txt = gettxt(txtFilePath);
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