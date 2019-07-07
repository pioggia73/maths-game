
var playing = false;
var score;
var action;
var timeRemaining;
var correctAnswer;

// If we click on start/reset button 

document.getElementById("start-reset").onclick = function() {

    // if we are playing

    if(playing == true) {
        location.reload();                  // a syntax to reload the page

    } else {                                // if we are not playing


        playing = true;                     // change mode to playing
        
        score = 1;                           // - set score to 0

        
        document.getElementById("score-value").innerHTML = score;

        // - show the countdown box
        show("time-remaining");
        timeRemaining = 60;
        document.getElementById("time-remaining-value").innerHTML = timeRemaining;

        // hide GAME OVER box

        hide("game-over");

        // - change the button text to "reset"
        document.getElementById("start-reset").innerHTML = "Reset Game";

        // - start countdown
        startCountdown();

        // - generate a new question and answers

        generateQA();

    }

}

// Clicking on an answer box

 for(i=1; i<5; i++) {
    document.getElementById("box"+i).onclick = function() {

        // check if we are playing
        if(playing == true) {           // yes
    
            if(this.innerHTML == correctAnswer) {                               // correct answer
    
                score++;                                                        // increase score by 1
    
                document.getElementById("score-value").innerHTML = score;       // display the score
    
                show("correct");                                                // show the CORRECT box
    
                hide("wrong");                                                  //hide the WRONG box
    
                setTimeout(function() {
                    hide("correct");
               }, 1000);
    
               // Generate a new Q&A
    
               generateQA();
    
    
            }
    
            else {
                show("wrong");                                                // show the CORRECT box
    
                hide("correct");                                              //hide the WRONG box
    
                setTimeout(function() {                                       // wrong answer      
                    hide("wrong");
               }, 1000);                    
            }
    
    
        }
     } 
    
 }

// If we click on the answer box
    // if we are playing
        // - correct ?
            // - yes
                    // - increase the score by 1
                    // - show the correct box for 1 sec
                    // - generate a new question and answers
            // - no
                // - show the "TRY AGAIN" box for 1 sec

// FUNCTIONS

// start counter

function startCountdown () {
    action = setInterval(function() {
        timeRemaining -= 1;
        document.getElementById("time-remaining-value").innerHTML = timeRemaining;
        if(timeRemaining == 0) {                    // Game Over
            stopCountdown();
            show("game-over");
            document.getElementById("game-over").innerHTML = "<p>Game Over!</p><p>Your score is " + score + ".</p>";
            hide("time-remaining");
            hide("correct");
            hide("wrong");
            playing = false;
            document.getElementById("start-reset").innerHTML = "Start Game";

        }
    }, 1000);
}

// stop counter

function stopCountdown() {
    clearInterval(action);
}

// hide certain element

function hide(Id) {
    document.getElementById(Id).style.display = "none";
}

// show certain element

function show(Id) {
    document.getElementById(Id).style.display = "block";
}

// generate a question and answers

function generateQA() {

    var x = 1 + Math.round(9*Math.random());
    var y = 1 + Math.round(9*Math.random());
    correctAnswer = x*y;

    document.getElementById("question").innerHTML = x + "x" + y;

    var correctPosition = 1 + Math.round(3*Math.random());
    document.getElementById("box"+correctPosition).innerHTML = correctAnswer;   // fill one box with the correct answer

    // fill other boxes with wrong answers

    var answers = [correctAnswer];

    for (i=1; i<5; i++) {
        if(i !== correctPosition) {
            var wrongAnswer;

            do{ wrongAnswer = (1 + Math.round(9*Math.random())) * (1 + Math.round(9*Math.random())); }

            while(answers.indexOf(wrongAnswer)>-1) 
                
            document.getElementById("box" + i).innerHTML = wrongAnswer;

            answers.push(wrongAnswer);
        }


    }
}