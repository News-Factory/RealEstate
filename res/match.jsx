
//returns found layers, alerts for lost ones and kills offLayers
function matchAllTitlesToLayers(x){

    var avtypes=defineAVTypes();
    var found={}; //Found Layers

    ////// TEXT
    var dt='text';
    var lt='textLayers';
    found[dt]=matchLayers_GENERIC(x,dt,lt);

    ////// AV
    for (var i=0; i<avtypes.length; i++){
        dt=avtypes[i];
        lt='avLayers';
        found[dt]=matchLayers_GENERIC(x,dt,lt);         
    }

    ////// ONOFF  (either text or av)
    dt='onoff';
    lt='textLayers';
    found[dt]=matchLayers_GENERIC(x,dt,lt);
    lt='avLayers';
    found[dt]=matchLayers_GENERIC(x,dt,lt);
    lt='compLayers';
    found[dt]=matchLayers_GENERIC(x,dt,lt);
    return found;
}

function matchLayers_GENERIC(x,dt,lt){ //dataType = av/text, layerType = textLayers/avLayers
    var foundLayers=[];
    var lostLayers=[];
    for (var i=0; i<x.dataByType[dt].length; i++){
        var title=x.dataByType[dt][i].title.toLowerCase();
        var res=matchLayers_GEN_internal(x,i,title,dt,lt);
        if(res){foundLayers.push(res);}
        else{lostLayers.push(title);}
    }
    if (lostLayers.length>0 && dt!='onoff'){checkFor_lostLayers(lostLayers);} //Alert lost text layers
        if(x.tog.alertWhereWeAre){alert('layers with data of type '+dt+': '+foundLayers.length);}
    return foundLayers;
}

function matchLayers_GEN_internal(x,i,title,dt,lt){
    for (var j=0;j<x[lt].length; j++){
        var layerName=x[lt][j].layer.name.toLowerCase();
        //if (layerName.indexOf('icon')>-1 && dt=='onoff'){alert('layerName: '+layerName+' lt: '+lt+' dt: '+dt);}
        if (title==layerName){
            return{
                layer:x[lt][j].layer,
                containingComp:x[lt][j].containingComp,
                value:x.dataByType[dt][i].value
            };
        }
    }
    return false;
}