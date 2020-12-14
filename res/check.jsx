function checkFor_lostLayers(lostLayers){
    var lostAndFound_log='The following  layers could not be found:';
    for (var i=0;i<lostLayers.length;i++){
        lostAndFound_log+='\n'+lostLayers[i];
    }
    lostAndFound_log+='\n'+'please fix the AE project and run the script again.';
    alert(lostAndFound_log);
}

function checkFor_duplicateLayers(x){
    var duplicateLayers=[];
    alert(x.textLayers.length);
    for (var i=0;i<x.textLayers.length; i++){
        var layerName=x.textLayers[i].layer.name.toLowerCase();
        if (duplicateLayers.indexOf(layerName)==-1){
            var existsMoreThatOne=checkFor_duplicateLayers_singleLayer(x,i,layerName);
            if (existsMoreThatOne){duplicateLayers.push(layerName);}
        }
    }
    if (duplicateLayers.length>0){
        var duplicateLayers_log='The following layer names appear more than once in the project:';
        for (var i=0; i<duplicateLayers.length; i++){
            duplicateLayers_log+='\n'+duplicateLayers[i];
        }
        alert(duplicateLayers_log);
        return false;
    } else {
        alert('No duplicates found');
        return true;
    }
}

function checkFor_duplicateLayers_singleLayer(x,i,layerName){
    var counter=0;
    for (var j=i+1;j<x.textLayers.length; j++){
        var layerToCheck=x.textLayers[j].layer.name.toLowerCase();
        if (layerName==layerToCheck){
            counter++;
            if (counter>1){
                return true;
            }
        }
    }
    return false;
}