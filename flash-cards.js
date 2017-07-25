//this is the controller and entry point file
const inquirer = require( 'inquirer' );
const data = require( './data-service' );

//card constructors
const BasicCard = require( './basic-card' );
const ClozeCard = require( './cloze-card' );

//program start
modePrompt();

//======================
// INITIAL PROMPT
//======================
function modePrompt()
{
   inquirer.prompt
   ([
        {
            type: 'list',
            name: 'mode',
            message: 'Would you like to create new flash cards, or read premade ones?',
            choices: [ 'create-card', 'read-card' ]
        }
    ]).then( onModePromptComplete );

    function onModePromptComplete( tAnswers )
    {
        if( tAnswers.mode === 'create-card' )
        {
            createCard();
        }
        else
        {
            readCard();
        }
    } 
}

//======================
// CREATE CARD
//======================
function createCard()
{
   inquirer.prompt
   ([
        {
            type: 'list',
            name: 'type',
            message: 'What kind of card would you like to make?',
            choices: [ 'basic-card', 'cloze-card' ]
        }
    ]).then( onTypeComplete );

    function onTypeComplete( tAnswers )
    {
        if( tAnswers.type === 'basic-card' )
        {
            createBasicCard();
        }
        else
        {
            createClozeCard();
        }
    }

    function createBasicCard()
    {
        inquirer.prompt
        ([
            {
                type: 'input',
                name: 'cardFront',
                message: 'What would you like the front of the card to say?'
            },
            {
                type: 'input',
                name: 'cardBack',
                message: 'What would you like the back of the card to say (the answer)?'
            }
        ]).then( onBasicCardComplete );

        function onBasicCardComplete( tAnswers )
        {
            let tempBasicCard = new BasicCard( tAnswers.cardFront, tAnswers.cardBack );
            //console.log( tempBasicCard );
            data.writeBasicCards( tempBasicCard );
        }
    }

    function createClozeCard()
    {
        inquirer.prompt
        ([
            {
                type: 'input',
                name: 'fullText',
                message: 'What is the full text of the card?'
            },
            {
                type: 'input',
                name: 'answer',
                message: 'What is the answer (to be replaced)?'
            }
        ]).then( onClozeCardComplete );

        function onClozeCardComplete( tAnswers )
        {
            let tempClozeCard = new ClozeCard( tAnswers.fullText, tAnswers.answer );
            console.log( tempClozeCard );

            if( tempClozeCard.partialText != null )
            {
                data.writeClozeCards( tempClozeCard );    
            }
        }
    }
}

//======================
// READ CARD
//======================
function readCard()
{
    inquirer.prompt
    ([
        {
            type: 'list',
            name: 'readType',
            message: 'Which type of card would you like to read?',
            choices: [ 'basic-card', 'cloze-card' ]
        },
    ]).then( onReadTypeComplete );

    function onReadTypeComplete( tAnswers )
    {
        if( tAnswers.readType === 'basic-card' )
        {
            data.readBasicCards();
        }
        else
        {
            data.readClozeCards();
        }
    }
}