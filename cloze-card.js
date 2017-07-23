module.exports = ClozeCard;

function ClozeCard( tFullText, tAnswer )
{
    this.fullText = tFullText;
    this.answer = tAnswer;
}

ClozeCard.prototype.getPartialText = function()
{
    tempPartial = this.fullText.replace( this.answer, ' ... ' );
    return tempPartial;
}