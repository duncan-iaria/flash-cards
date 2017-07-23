function controller()
{
    console.log( 'hay' );
    
    this.createCard = function()
    {
        console.log( "create card" );
    }

    this.readCard = function()
    {
        console.log( "read card" );
    }
}

module.exports = controller;