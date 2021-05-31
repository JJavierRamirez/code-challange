const { commandManager } = require('./controllers/command.controller');
const { makeTree, deleteOnCascade, writeOutput } = require('./helpers/tree.helpers');

const fs = require('fs');

async function main(){
    var paths = []; 
    var pathsFiltered = []; 
    var pathsToAdd = []; 
    
    //Manage data
    const input = fs.readFileSync('./data/input.txt', 'utf-8');
    let commands = input.split("\n");
    commands.forEach(command => {
        command = command.replace("\r", "");
        commandManager(command, paths, pathsFiltered, pathsToAdd);
    });

    //Output
    paths = await deleteOnCascade( paths,pathsFiltered );
    let result = makeTree(paths);
    writeOutput(fs,result);

};

main();




