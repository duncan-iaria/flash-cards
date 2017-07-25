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

dataService.readBasicCards = function( tCallback )
{
    readData( basicFilePath, tCallback );
}

dataService.readClozeCards = function( tCallback )
{
    readData( clozeFilePath, tCallback );
}

dataService.writeBasicCards = function( tCard, tCallback )
{
    basicCardData.push( tCard );

    let tempCardData = JSON.stringify( basicCardData, null, '\t' );

    writeData( basicFilePath, tempCardData, tCallback );
}

dataService.writeClozeCards = function( tCard, tCallback )
{
    clozeCardData.push( tCard );

    let tempCardData = JSON.stringify( clozeCardData, null, '\t' );
    
    writeData( clozeFilePath, tempCardData, tCallback );
}

//======================
// PRIVATE FUNCTIONS
//======================
function writeData( tPath, tData, tCallback )
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
            dataService.log( '\nwriting card complete!\n' );
        }

        if( tCallback != null )
        {
            tCallback();
        }
    }
}

function readData( tPath, tCallback )
{
    fs.readFile( tPath, 'utf8', onReadComplete );

    function onReadComplete( tError, tData )
    {
        if( tError )
        {
            dataService.log( 'there was an error when reading data: ' + tError );
        }
        else
        {
            dataService.log( tData );
        }

        if( tCallback != null )
        {
            tCallback();
        }
    }
}
