
function commandManager( command, paths, pathsFiltered, pathsToAdd ){
    let arr = command.split(" ");
    //LIST
    if(arr.length === 1 && arr[0] === 'LIST'){
        //console.log('LIST',paths);
        //formatOutput(paths);

    }
    //CREATE
    else if(arr.length === 2 && arr[0] === 'CREATE'){
        (!paths.includes(arr[1])) && paths.push(arr[1]);
    }
    //MOVE
    else if(arr.length === 3 && arr[0] === 'MOVE'){
        let origin = arr[1];
        let destiny = arr[2];
        if(paths.includes(origin) && paths.includes(destiny)){ 
            pathsFiltered.push(origin);
            paths.forEach(path => {
                if (path.includes( origin )){
                    pathsFiltered.push(path);
                    pathsToAdd.push(path);
                    if(path !== pathsToAdd[0]) paths.push(destiny+"/"+path); 
                }
            });
            origin = origin.split("/");
            lastElement = origin.slice(-1);
            paths.push(destiny+"/"+lastElement[0]);

        }
        else{
            console.log("MOVE error: origin or destiny doesnt exist")
        }
    }
    //DELETE
    else if(arr.length === 2 && arr[0] === 'DELETE'){
        paths.forEach(path => {
            if (path.includes( arr[1] )){
                pathsFiltered.push(path);
            }
        });
    }
    else{
        console.error("Invalid command, please verify your instructions");
    }
};

module.exports = { 
    commandManager
}