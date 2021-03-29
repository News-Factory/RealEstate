#include "labels.jsx"

//Here we'll be using specific labels to construct the google sheet
function sc_constructGS(x){
    var selectedLabels=[4,6,10,12,13]; //peach, purple, brown, fuchsia
    var labelTypes=sc_defineTypesByLabels(); //array of objects {colorName,type}
    var resTitleRow=[]; //we're exporting a csv txt
    var resLabelTypeRow=[]; //we'll be joining the arrayes to a text later

    for (var i=0; i<selectedLabels.length; i++){
        var labelNum=selectedLabels[i]; //6/10/12/13
        var labelType=labelTypes[labelNum].type; //text,vid,pic,audio
        var allLayers_ofLabel=labels_getAllLayersWithLabel(x,labelNum);
        for (var j=0; j<allLayers_ofLabel.length; j++){
            var layerName=allLayers_ofLabel[j].name;
            resTitleRow.push(layerName);
            resLabelTypeRow.push(labelType);
        }
    }

    var res=resTitleRow.join()+'\n';
    res+=resLabelTypeRow.join();

    var scriptFolderPath=File($.fileName).path;
    //alert(scriptFolderPath);
    
    var outoutCSV=File(scriptFolderPath+'/test.csv');
    outoutCSV.encoding ="utf-8";
    outoutCSV.open("w");
    outoutCSV.write(res);
    outoutCSV.close();
    
}

function sc_makeTitleAndType(types,symbols,first,label){
    //construct a single object containing layerName and type
    var layerName=layer.name;
    var type=
    alert(layerName);
    alert(layerType);
}

function sc_defineTypesByLabels(){
    //Labels peach, purple, brown and fuchsia will be used
    var labels=[null,'red','yellow','aqua','pink','lavender','peach','seaFoam','blue','green','purple','orange','brown','fuchsia','cyan','sandstone','darkGreen'];
    var res=[];
    for (var i=1; i<labels.length; i++){
        res.push({colorName:labels[i]});
    }
    res[4].type='onoff'; //pink
    res[6].type='text'; //peach
    res[10].type='vid'; //purple
    res[12].type='pic'; //brown
    res[13].type='audio'; //fuchsia

    return res;
}
