$(document).ready(function () {

    let wrongArr = [];
    const gameWords = ["batman", "superman", "catwoman", "wolverine"];
    let dashArr = [];
    let dash = "__";
    let winWord = "";
    let userKeyPress = "";
    let count = 0;


    //this function checks if there's any dashes left in the dashArr.  If not, user wins.
    winCheck = () => {
        if (!dashArr.includes(dash)) {
            $('#loseText').html(`<h1><b>YOU WIN!</b><h1>`);
            $('button').removeClass('hidden');
        }
    };

    //this function writes dash array and letters to the dom
    write = () => {
        document.getElementById("guessLetters").innerHTML = `<h2>${dashArr.join('  ')}</h2>`;
        // document.getElementById('wrong').innerHTML = `<p>${wrongArr.join(' , ')}</p>`;
        winCheck();

    }
    //iffe for picking a word out of the array randomly
    (pickWord = () => {
        winWord = gameWords[Math.floor(Math.random() * gameWords.length)];
        let howManyDash = winWord.length;
        count = winWord.length + 5;
        for (let i = 0; i < howManyDash; i++) {
            dashArr.push(dash);
        }
        write();
        console.log(winWord);
    })();

    // logs the users key presess and calls checkAnswer()
    $(document).keypress((event) => {
        userKeyPress = (String.fromCharCode(event.which)).toLowerCase();
        count = count - 1;
        checkAnswer();
    });


    //checks the answer and calls write() 
    checkAnswer = () => {
        if (count == 0) {
            console.log("you lose");
            $('#loseText').html(`<h1><b>YOU LOSE!</b><h1>`);
            $('button').removeClass('hidden');
            return;
        } else {

            for (let i = 0; i < winWord.length; i++) {
                if (userKeyPress == winWord.charAt(i)) {
                    let letter = winWord.charAt(i);
                    let key = winWord.indexOf(winWord.charAt(i));
                    dashArr.forEach(() => {
                        dashArr[key] = letter
                    });
                    winWord = winWord.replace(letter, '-');

                }
            };
        };

        write();
    };

    newGame = () => {
        $('button').addClass('hidden');
        dashArr = [];
        wrongArr = [];
        winWord = "";
        userKeyPress = "";
        count = 0;
        $('#loseText').html(`<h1><b id="loseText">HANGMAN GAME</b></h1>`);
        pickWord();
    }

    $('button').click(() => {newGame();});
});