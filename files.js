//DATA
const fs = require('fs');
const input = fs.readFileSync('./data/input.txt', 'utf-8');

//Output structure
var output = [];

const setOutput = () => {
    let set = new Set(output.map(JSON.stringify));
    output = Array.from(set).map(JSON.parse);
}

// CREATE
function createDirectory(params){
    let level = 1;
    let father = 'root';
    while(params.length > 1){
        father = params.shift();
        output.push({level: level, name: params[0], father: father});
        level++;
    }
    if(params.length = 1 && father === 'root'){
        output.push({level: 0, name: params[0], father: 'root'});
    }
}

// DELETE
function deleteDirectory(params){
    const level = params.length-1;
    const param = params.pop();
    let indexToDelete;

    if(output.length > 1){
        output.forEach((obj, i) => {
            if(obj.level === level && obj.name === param){
                indexToDelete = i;
            }
        });
        output.splice(indexToDelete, 1);
        output.forEach((obj, i) => {
            if(obj.level > level && obj.father === param){
                output.splice(i, 1);   
            }
        });
    }
    else{
        console.error(`No data found`);
    }  
}

// MOVE
function moveDirectory(origin, goal){

    let level = origin.length-1;
    let directory = origin.pop();
    let father;
    (origin.length >= 1) ? father = origin.pop() : father = 'root';
    const goalLevel = goal.length-1;
    const goalDirectory = goal.pop();
    let goalFather;
    (goal.length >= 1) ? goalFather = goal.pop() : goalFather = 'root';

    let indexToChange;
    let internalChanges = [];
    output.forEach((obj,i) => {
        if(obj.level === level && obj.name === directory && obj.father === father){
            indexToChange = i; 
        };
        if(obj.level === level+1 && obj.father === directory){
            internalChanges.push(i);
        };
    });
    output[indexToChange] = {level: goalLevel+1, name: directory, father: goalDirectory}
    
    while(internalChanges.length > 0){
        internalChanges.forEach((e,i) => {
            output[e] = {level: output[e].level+1, name: output[e].name, father: output[e].father};
            internalChanges.shift();
            output.forEach((obj,i) => {
                if(obj.level === level+1 && obj.father === output[e].father){
                    internalChanges.push(i);
                };
            });
        });
    }
    
}

function commandManager(command){
    let arr = command.split(" ");
    //LIST
    if(arr.length === 1 && arr[0] === 'LIST'){
        console.log('LIST');
        setOutput();
        console.log(output);
    }
    //CREATE
    else if(arr.length === 2 && arr[0] === 'CREATE'){
        console.log('CREATE '+arr[1]);
        createDirectory(arr[1].split("/"));
    }
    //MOVE
    else if(arr.length === 3 && arr[0] === 'MOVE'){
        console.log('MOVE '+arr[1]+" "+arr[2]);
        setOutput();
        moveDirectory(arr[1].split("/"), arr[2].split("/"));
    }
    //DELETE
    else if(arr.length === 2 && arr[0] === 'DELETE'){
        console.log('DELETE '+arr[1]);
        setOutput();
        deleteDirectory(arr[1].split("/"));
    }
    else{
        console.error("Invalid command, please verify your instructions");
    }

};

function main(){
    let commands = input.split("\n");

    commands.forEach(command => {
        command = command.replace("\r", "");
        commandManager(command);
    });
};

main();