///// Here there are the functions that CLEAR some property
///// or keys/expressions from the layers


///// clears opacity values
function clearOpacity(layer){
    var opacity=layer.property('opacity');
    var numKeys=opacity.numKeys;
    for (var i=1; i<=numKeys; i++){
        opacity.removeKey(1);
    }
}

///// clears property Keys and expression
function clearKeys(layer,propertyName){
    layer.property(propertyName).expression='';
    var numKeys=layer.property(propertyName).numKeys;
    for (var k=1; k<=numKeys; k++){
        layer.property(propertyName).removeKey(1);
    }
}

///// function to clear markers of a composition or layer    14/12/2020
function clearMarkers(layer){
    var marker=layer.marker; //returns
    var numMarkers=marker.numKeys;
    for(m = 0; m < numMarkers; m++){
        marker.removeKey(1);
    }
}

