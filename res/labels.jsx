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



