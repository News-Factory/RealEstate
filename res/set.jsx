function setFootage(layer, footage){      
    layer.replaceSource(footage,true);
}

function setText(layer,text){
    layer.property("Source Text").setValue(text);
 }

function setVisibility(layer,onoffBoolean){
    layer.enabled=onoffBoolean;
}

function settxt(filePath,content){
    //creates a file if doesn't exist, overwrites existing content
    var txtFile = File(filePath);
    txtFile.encoding ="utf-8";
    txtFile.open("w");
    txtFile.write(content);
    txtFile.close();
}