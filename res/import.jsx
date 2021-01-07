function importAllFilesIntoProject(x,found){
    //The main import function that both imports files and returns the found layers object with the
    //corresponding file references.
    var avtypes_forSetFootage=['vid','pic','sound'];
    var lostFiles=[];
    for (var i=0; i<avtypes_forSetFootage.length; i++){
        //run per avtype
        var avtype=avtypes_forSetFootage[i];
        for (var j=0; j<found[avtype].length; j++){
            //var fileName=found[avtype][j].value;
            //var filePath=x.paths['footageFolder']+'/'+fileName;
            var filePath=found[avtype][j].value;
            var fileName=filePath.split('\\')[8];
            var file=importSingleFile(filePath,x['importFolder']);
            if (file){ //Now we create a file reference
                found[avtype][j].file=file;
                found[avtype][j].fileType=getFileType(file.name);
            } else {
                lostFiles.push(fileName);
            }
        }
    }
    if (lostFiles.length>0){
        alert("in lostFile.length > 0")
        var lostFiles_log='The following files could not be found in the import folder:';
          for (var i=0; i<lostFiles.length; i++){
            alert(lostFiles[i])
            lostFiles_log+='\n'+lostFiles[i];
        }
     
        lostFiles_log+='Please insert the files into the import folder and restart the function';
        alert(lostFiles_log);
        return false;
    }
    return found;
}

function importSingleFile(fileOrPath,bin){
    if (typeof fileOrPath=="string"){
        var file = new File(fileOrPath);
    }
    else {
        var file = fileOrPath;
    }
    if (file.exists){

        var importOptions = new ImportOptions(file);
        var importedFile = app.project.importFile(importOptions);
        importedFile.parentFolder = bin;
        return importedFile;
        }
    else {return false;}
}

function importManyFiles(filesOrPaths,bin){
    var importedFiles = [];
    for (var i=0; i<filesOrPaths.length; i++){
        importedFiles.push(importSingleFile(filesOrPaths[i],bin));
        }
    return importedFiles;
}

function howManyFilesInFolder(folderPath){
    var folder = File([folderPath]);
    var files = folder.getFiles();
    return files.length;
}