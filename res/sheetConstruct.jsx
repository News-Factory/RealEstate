//Here we'll be using specific labels to construct the google sheet
function constructGS(x){
    //var selectedLabels=[6,10]; //peach, purple
    var symbols=x.sym;
    var peachLabels=labels_getAllLayersWithLabel(x,3);
    var first=peachLabels[0];
    makeTitleAndType(symbols,first,6);
    //var 
}

function makeTitleAndType(symbols,layer,label){
    var layerName=layer.name;
    var layerType=getLayerType(layer);
    alert(layerName);
    alert(layerType);
}

function sheetConstruct_defineTypesByLabels(){
    //Labels peach, purple, brown and fuchsia will be used as follows:
    var res={};
    res.peach='text';
    res.purple='vid';
    res.brown='pic';
    res.fuchsia='audio';
    return res;
}
