const fs = require( 'fs' );
const basicCardData = require( './data/basic-card-data.json' );
const clozeCardData = require( './data/cloze-card-data.json' );

const basicFilePath = './data/basic-card-data.json';
const clozeFilePath = './data/cloze-card-data.json';
const dataService = {};

module.exports = dataService;

dataService.log = function( tMessage )
{
    console.log( tMessage );
}

dataService.readBasicCards = function()
{
    console.log( 'reading basic cards' );
}

dataService.readClozeCards = function()
{

}

dataService.writeBasicCards = function( tCard )
{
    basicCardData.push( tCard );

    let tempCardData = JSON.stringify( basicCardData, null, '\t' );

    writeData( basicFilePath, tempCardData );
}

dataService.writeClozeCards = function( tCard )
{
    clozeCardData.push( tCard );

    let tempCardData = JSON.stringify( clozeCardData, null, '\t' );
    
    writeData( clozeFilePath, tempCardData );
}

function writeData( tPath, tData )
{
    fs.writeFile( tPath, tData, onWriteComplete );

    function onWriteComplete( tError )
    {
        if( tError )
        {
            dataService.log( 'error when writing file: ' + tError );
        }
        else
        {
            dataService.log( 'jobs done!' );
        }
    }
}
