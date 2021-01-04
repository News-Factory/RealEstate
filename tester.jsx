//process waiting folder and move txt files into processed folder OM 04/01/2020

//#includessss

//panel
{
    function myScript(thisObj){
        function myScript_buildUI(thisObj){
            var myPanel = (thisObj instanceof Panel) ? thisObj: new Window("palette", "RealEstate", undefined, {resizeable:true});
            
            var masterGroup = myPanel.add("group");
            masterGroup.orientation = "column";
            
            var subA=masterGroup.add("group"); subA.orientation="row";
            var btnA=subA.add("button",undefined,"batch");
            btnA.onClick=function(){batchProcess();}
            
            myPanel.layout.layout(true);
            return myPanel;
            }
        var myScriptPal = myScript_buildUI(thisObj);
        if (myScriptPal != null && myScriptPal instanceof Window){
            myScriptPal.center();
            myScriptPal.show();
        }
    }
    myScript(this);
 }

function batchProcess(){
    var mommyFolderPath='C:/Users/NF5/Documents/RealEstate - Github/RealEstate/';
    var waitingFolder=new Folder(mommyFolderPath+'waiting');
    var processedFolder=new Folder(mommyFolderPath+'processed');

    var wFiles=waitingFolder.getFiles();
    for (var i=0; i<wFiles.length; i++){
        //var txtFile=wFiles[i];
        var txtFilePath=mommyFolderPath+waitingFolder.name+'/'+fileName;

        app.open(edition);

        //success //move txt file
        var fileName=wFiles[i].name;
        var dest=mommyFolderPath+processedFolder.name+'/'+fileName;
        wFiles[i].copy(dest);
        wFiles[i].remove();
    }   
}

