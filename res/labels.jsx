///// created on 11/12/2020
#include "is-has.jsx";

var red = 1;
var yellow = 2;
var aqua = 3;
var pink = 4;
var lavender = 5;
var peach = 6;
var seaFoam = 7;
var blue = 8;
var green = 9;
var purple = 10;
var orange = 11;
var brown = 12;
var fuchsia = 13;
var cyan = 14;
var sandstone = 15;
var darkGreen = 16;

function labelledLayers_InAComp(comp,label){
    //var layers = comp.numlayers;
    var res=[];
    var layers=comp.layers;
    for (var i=1; i<=layers.length; i++){
        var testLabel=comp.layers[i].label;
        // alert('testLabel='+testLabel+' label='+label);
        if (testLabel==label){
            res.push(layers[i]);
        }
    }
    return res;
}

function layerHasLabel(layer,label){
    var testLabel = layer.label;
    if (testLabel==label){
        return true;
    }
    return false;
}

function getAllByLabel(layers,label){
    //returns array
    var res = [];
    for (var i=1; i<=layers.length; i++){
        if (layers[i].label==label){
            res.push(layers[i]);
            }
            alert(layers[i].name);
        }
    return res;
}

function getSeveralLabels(layers,labelArray){
    //returns array
    var res = [];
    for (var i=1; i<=layers.length; i++){
        for (var j=0; j<labelArray.length; j++){
            if (layers[i].label==labelArray[j]){
                res.push(layers[i]);
                break;
                }
            }
        }
    return res;
}
function numberToLabelColorName(number){
    var labels=[null,'red','yellow','aqua','pink','lavender','peach',
    'seaFoam','blue','green','purple','orange','brown','fuchsia','cyan','sandstone','darkGreen'];
    return labels[number];
}

function labels_getAll(x){
    //var allLayers=[];
    var allLabels=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    //var allLabels=[null,'red','yellow','aqua','pink','lavender','peach','seaFoam','blue','green','purple','orange','brown','fuchsia','cyan','sandstone','darkGreen'];
    for (var i=0; i<x.comps.length; i++){
        var layers=x.comps[i].layers;
        for (var j=1; j<=layers.length; j++){
            //allLayers.push(layers[j]);
            var label=layers[j].label;
            allLabels[label]++;
        }
    }
    //alert(allLayers.length);
    var res='labels found:\n';
    for (var i=1; i<allLabels.length; i++){
        //if (allLabels[i]>0){
            var labelName=numberToLabelColorName(i);
            res+=labelName+' exists: '+allLabels[i]+'\n';
        //}
    }
    alert(res);
}

function labels_getAllLayersWithLabel(x, lableNum){
    var res = [];
    for (var i=0; i<x.comps.length; i++){
        var layers=x.comps[i].layers;
        for (var j=1; j<=layers.length; j++){
            //allLayers.push(layers[j]);
            var label=layers[j].label;
            if (label == lableNum){
                res.push(layers[j]);
            }            
        }
    }
    return res;
}
