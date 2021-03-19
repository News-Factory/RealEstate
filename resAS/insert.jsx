#include "scale.jsx";

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

// 20/01/2021
// thuis was a huge pain in the ass function to show the hebrew names
// of the icons in the upper ticker of the photo comp

function insertIconsTopTicker(x){   
    var theIcons=x.dataByType['onoff'];
    var iconString= theIcons[0].value.toString();
    var activeIcons= iconString.split(', ');
    var tickerComp= x.allLayers['Details 2'].comp;
    // alert(activeIcons.length);

    for(i=0; i<activeIcons.length; i++){
        var iconWord = activeIcons[i].split('-');
        var option=iconWord[0];
        // alert(option); 
        var comp= x.allLayers['Details 2']['icon Ticker '+i];
        var layer= x.allLayers['icon Ticker '+i]['IT'+i];
        // alert(layer.name);
        layer.enabled=true;
        setText(layer,option);

        switch (i){
            case 0:
            tickerComp.width= 2700;
            moveBasicInfo(70);
            moveNewInfo(2272);
            break;
            case 1:
            tickerComp.width= 3100;
            moveBasicInfo(4);
            moveNewInfo(2635);
            break;
            case 2:
            tickerComp.width= 3400;
            moveBasicInfo(6);
            moveNewInfo(2900);
            break;
            case 3:
            tickerComp.width= 3700;
            moveBasicInfo(2);
            moveNewInfo(3230);
            break;
            case 4:
            tickerComp.width= 4000;
            moveBasicInfo(2);
            moveNewInfo(3500);
            break;
            case 5:
            tickerComp.width= 4300;
            moveBasicInfo(2);
            moveNewInfo(3735);
            break;
        }
    }

    // this function moves to the left all of the information that were already 'active' in the ticker
    // in order to make space for new info layers

    function moveBasicInfo(howMuch){
        for(j=1; j<= (6+i); j++){
            var infoLayer= tickerComp.layer(j);
            // alert(infoLayer.name);
            var position=infoLayer.property('Position');
            var keyNumber=position.numKeys;
            // alert(keyNumber);
            for (k=1; k<= keyNumber; k++){
                var time= position.keyTime(k);
                // alert(time);
                var value= position.keyValue(k);
                // alert(value[0]);
                var newValue= value[0]-howMuch;
                // alert(newValue);
                position.removeKey(k);
                position.setValueAtTime(time, [newValue, value[1]]);
            }
        }
    }

    // this function changes the X value for the position keyframes property of a layer
    // you need to have know the correct x value of where the layer needs to be, ofc

    function moveNewInfo(theX){  
        var position=comp.property('Position');
        var keyNumber=position.numKeys;
        for (n=1; n<= keyNumber; n++){
            var time= position.keyTime(n);
            // alert(time);
            var value= position.keyValue(n);
            // alert(value[0]);
            position.removeKey(n);
            position.setValueAtTime(time, [theX, value[1]]);
        }
    }
}