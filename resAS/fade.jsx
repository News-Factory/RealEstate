function fade(layer,startAt,endAt,duration,startVal,endVal){
    //Only ONE of params startAt and endAt should be inputted
    //startAt is the time to ADD to the beginning of the audio file- 
    //endAt is the time to SUBTRACT from the end of the audio file-
    //the irrelevant value should be null
    //it's best to use functions fadeIn and fadeOut which use this function
    if (startAt!=null){
        var relativeStartTime=layer.inPoint+startAt;
        var relativeEndTime=relativeStartTime+duration;
    } else {
        var relativeEndTime=endAt; //layer.outPoint-
        var relativeStartTime=relativeEndTime-duration;
    }
    
    layer.property('Audio Levels').setValueAtTime(relativeStartTime,[startVal,startVal]);
    layer.property('Audio Levels').setValueAtTime(relativeEndTime,[endVal,endVal]);
}

function xFade(layer,startAt,endAt,duration,startVal,endVal){ // it's the same concept as fade but applied as if it was an Xfade
    if (startAt!=null){
        var relativeStartTime=layer.inPoint+startAt - duration/2;
        var relativeEndTime=relativeStartTime+duration;
    } else {
        var relativeEndTime= endAt + duration/2;   
        var relativeStartTime=relativeEndTime-duration;
    }

    layer.property('Audio Levels').setValueAtTime(relativeStartTime,[startVal,startVal]);
    layer.property('Audio Levels').setValueAtTime(relativeEndTime,[endVal,endVal]);
}

function fadeIn(layer,startAt,duration,startVal,endVal){
    fade(layer,startAt,null,duration,startVal,endVal);
}

function preFadeIn(layer,startAt,duration,startVal,endVal){
    fade(layer,startAt -duration,null,duration,startVal,endVal);
}


function fadeOut(layer,endAt,duration,startVal,endVal){
    fade(layer,null,endAt,duration,startVal,endVal);
}

function xFadeIn(layer,startAt,duration,startVal,endVal){
    xFade(layer,startAt,null,duration,startVal,endVal);
}

function xFadeOut(layer,endAt,duration,startVal,endVal){
    xFade(layer,null,endAt,duration,startVal,endVal);
}

function fadeIn_fromStart(layer,duration){
    //simplified version of fade in where values are 0db and -100db
    fadeIn(layer,0,duration,-100,0);
}

function fadeOut_fromEnd(layer,duration){
    fadeOut(layer,0,duration,0,-100);
}
 
function slowFadeOut(layer,endAt,duration,endVal,parts){
    var unit = duration/parts;
    var volUnit= endVal/parts;
    for (i=0; i <=parts; i++){
        var gap= unit*i;
        var startVol= volUnit *(parts-i);
        var endVol= volUnit *(parts-i+1);
        fade(layer,null,endAt-gap,unit,startVol,endVol);
    }
}