//IS functions// 
////////////////////////

// isCompLayer(layer)
// isFootageLayer(layer)
// isCameraLayer(layer)
// isTextLayer(layer)

////////////////////////

function isCompLayer(layer){
    return layer.source=="[object CompItem]";
}

function isFootageLayer(layer){
    return layer.source=="[object FootageItem]";
    //return layer instance of AVLayer;
}

function isTextLayer(layer){
    //return layer.toString()=="[object TextLayer]";
    return layer.property("sourceText")!==null;
}

function isSoundLayer(layer){
    return layer.hasAudio;
}


function isCameraLayer(layer){
    //return layer.toString()=="[object CameraLayer]";
    return layer instanceof CameraLayer;
}

function isLegitFileName(txt){
    var legitFileTypes = ['.mp3','.wav','.mp4','.mov','.jpg','.jpeg','.png'];
    try {
        for (var i=0; i<legitFileTypes.length; i++){
            txt=txt.toLowerCase();
            if (txt.indexOf(legitFileTypes[i])>-1){return true;}
        }
        return false
    }
    catch (e){return false;}
}


function isComplexIntro(introComp){
    if (hasOverNumLayers(introComp,2) && hasLabel(introComp,9)){
        return true;
        }
    return false;
}

function isFullObject(obj){
    var n;
    for (n in obj){
        if (obj[n]==""){return false;}
        }
    return true;
}

function isUndefined(obj){
    var n;
    for (n in obj){
        if (obj[n]=='undefined'){return false;}
        }
    return true;
}

// a function that recognizes numbers from words in text 08/12/2020
function isNumber(text){
    var n = parseFloat(text);
    if (isNaN(n)){
        n = null;
    } else {return n;}
}

///////////////////////////////////////////////
///// The HAS section

function hasAttr(obj,attrName){
    var n;
    for (n in obj){
        if (n==attrName){
            return true;
            }
        }
    return false;
}

function hasOverNumLayers(comp,numLayers){
    var layers = comp.layers;
    //alert(layers.length);
    if (layers.length>numLayers){
        return true;
    }
    return false;
}

///////////////////////////////////////////////