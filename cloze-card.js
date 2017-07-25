module.exports = ClozeCard;

function ClozeCard( tFullText, tAnswer )
{
    this.fullText = tFullText;
    this.answer = tAnswer;
    this.partialText = this.getPartialText();
}

ClozeCard.prototype.getPartialText = function()
{
    let tempPartial = this.fullText.replace( this.answer, '...' );

    if( tempPartial == this.fullText )
    {
        console.log( "no answer found in the full text" );
        return null;
    }

    console.log( tempPartial );
    return tempPartial;
}