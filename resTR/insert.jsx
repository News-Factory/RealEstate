#include "scale.jsx";
#include "style.jsx";

function insertAll(x,found){
    if (found){
        //alert('insert text');
        insertAll_text(x,found);
        //alert('insert onoff');
        insertAll_onoff(x,found);
        //alert('insert footage');
        insertAll_footage(x,found);
        //alert('insert sounds');
        insertAll_sounds(x,found);

    } else {
        alert('Insert failed');
    }
}

function insertAll_text(x,found){
    for (var i=0; i<found.text.length; i++){
        //Parameters:
        var layer=found.text[i].layer;
        var text=found.text[i].value;
        // alert(layer. name);
        // alert(text);
        if (x.tog.alertWhereWeAre){found.text[i].containingComp.openInViewer();}
        setText(layer,text);
        if (x.tog.alertWhereWeAre){
            alert('Text was inserted in layer: '+layer.name);
        }
    }
}

function insertAll_footage(x,found){
    var avtypes=defineAVTypes();
    for (var j=0; j<avtypes.length-1; j++){
        var arr=found[avtypes[j]];
        for (var i=0; i<arr.length; i++){
            //Parameters:
            if (x.tog.alertWhereWeAre){
                arr[i].containingComp.openInViewer();
            }
            setFootage(arr[i].layer,arr[i].file);
            fitToComp(arr[i].layer);
            //setDurationByType(arr[i]);
            if (x.tog.alertWhereWeAre){
                alert('Footage' +arr[i].file.name + ' was inserted in layer: '+arr[i].layer.name);
            }
        }
    }
}

function insertAll_sounds(x,found){
    var avtypes=defineAVTypes();
    var arr=found[avtypes[2]];
    for (var i=0; i<arr.length; i++){
        //Parameters:
        if (x.tog.alertWhereWeAre){
            arr[i].containingComp.openInViewer();
        }
        setFootage(arr[i].layer,arr[i].file);
        // fitToComp(arr[i].layer);
        //setDurationByType(arr[i]);
        if (x.tog.alertWhereWeAre){
            alert('Footage was inserted in layer: '+arr[i].layer.name);
        }
    }
    
}


function insertAll_onoff(x,found){
    //alert('found.onoff.length: '+found.onoff.length);
    for (var i=0; i<found.onoff.length; i++){
        //Parameters:
        var layer=found.onoff[i].layer;
        var onoffBoolean=found.onoff[i].value.toLowerCase().indexOf('on')>-1;
        // alert(layer.name+' is set to: '+onoffBoolean.toString());
        if (x.tog.alertWhereWeAre){found.onoff[i].containingComp.openInViewer();}
        setVisibility(layer,onoffBoolean); //Check if this works
        if (x.tog.alertWhereWeAre){alert('Footage visibility in layer: '+layer.name+' was set to: '+onoffBoolean.toString());}
    }
}

