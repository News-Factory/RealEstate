function fade(layer,startAt,endAt,duration,startVal,endVal){
    //Only ONE of params startAt and endAt should be inputted
    //startAt is the time to ADD to the beginning of the audio file- this is where fade will begin
    //endAt is the time to SUBTRACT from the end of the audio file- this is where fade will end
    //the irrelevant value should be null
    //it's best to use functions fadeIn and fadeOut which use this function
    if (startAt!=null){
        var relativeStartTime=layer.inPoint+startAt;
        var relativeEndTime=relativeStartTime+duration;
    } else {
        var relativeEndTime=layer.outPoint-endAt;
        var relativeStartTime=relativeEndTime-duration;
    }
    // alert(layer.inPoint);
    // alert(layer.outPoint);

    layer.property('Audio Levels').setValueAtTime(relativeStartTime,[startVal,startVal]);
    layer.property('Audio Levels').setValueAtTime(relativeEndTime,[endVal,endVal]);
}

function xFade(layer,startAt,endAt,duration,startVal,endVal){ // same function as ABOVE but as MIXING X FADE
    if (startAt!=null){
        var relativeStartTime=layer.inPoint+startAt - duration/2;
        var relativeEndTime=relativeStartTime+duration;
    } else {
        var relativeEndTime= endAt + duration/2;   // layer.outPoint-
        var relativeStartTime=relativeEndTime-duration;
    }
    // alert(layer.inPoint);
    // alert(layer.outPoint);

    layer.property('Audio Levels').setValueAtTime(relativeStartTime,[startVal,startVal]);
    layer.property('Audio Levels').setValueAtTime(relativeEndTime,[endVal,endVal]);
}

function fadeIn(layer,startAt,duration,startVal,endVal){
    fade(layer,startAt,null,duration,startVal,endVal);
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

function fadeIn_fromStart_fadeOut_fromEnd(layer,duration){
    fadeIn(layer,0,duration,-100,0);
    fadeOut(layer,0,duration,0,-100);
}
