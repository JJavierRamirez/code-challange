function makeTree( paths ){
    let result = [];
    let level = { result };

    paths.forEach(path => {
        path.split('/').reduce(( r, name ) => {
            if(!r[name]) {
            r[name] = { result: [] };
            r.result.push( {name, children: r[name].result} )
            }
            
            return r[name];
        }, level)
    })
    return result;
}

const deleteOnCascade = ( paths, pathsFiltered ) => {
    return new Promise( ( resolve ) => {
            pathsFiltered.forEach( ( e, i ) => {
                paths.includes( e )
                var i = paths.indexOf( e );
                if ( i !== -1 ) {
                    paths.splice( i, 1 );
                }
            });
            resolve( paths );
        });
}

function writeOutput( fs, tree ){
    fs.writeFile('./data/output.json', JSON.stringify( tree ), ( err ) => {
        if ( err ) throw err;
        console.log('Output saved');
    });
}

module.exports = { 
    makeTree,
    writeOutput,
    deleteOnCascade
}