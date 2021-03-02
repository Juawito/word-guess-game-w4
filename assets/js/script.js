// Questions for quiz with answers
let questions = [
    {
        question: 'What are arrays?',
        answers: ['Function', 'Object', 'Methods', 'Data-type'],
        correctAnswer: 'Data-type'
    },

    {
        question: 'What is a div element?',
        answers: ['A container', 'A list', 'An image', 'Object'],
        correctAnswer: 'A container'
    },
    {
        question: 'What standard of JS is standard as of today?',
        answers: ['ECMAScript 6', 'ECMAScript 5', 'Node.js', 'React.js'],
        correctAnswer: 'ECMAScript 6'
    },
    {
        question: 'How are JS files added to an HTML document?',
        answers: ['href', 'link tag', 'a tag', 'script tag'],
        correctAnswer: 'script tag'
    },
    {
        question: 'How are CSS files added to an HTML document?',
        answers: ['href', 'link tag', 'a tag', 'script tag'],
        correctAnswer: 'link tag'
    },
    {
        question: 'What are APIs?',
        answers: ['Programming Interface', 'Data-type', 'Methods', 'Function'],
        correctAnswer: 'Programming Interface'
    }];

let bodyEl = document.querySelector('body');
let quizContainer = document.createElement('div');
quizContainer.setAttribute('id', 'quiz');
let rOrW = document.createElement('div');
rOrW.setAttribute('id', 'r-or-w')
let timerEl = document.createElement('div');
timerEl.setAttribute('id', 'timer');
let highscoreList = document.createElement('div');
highscoreList.setAttribute('id', 'highscore-list');
let startBtn = document.querySelector('#start-button');
let intro = document.querySelector('.instructions-container');
var allScores = localStorage.getItem("allScores");


let secondsLeft = 60;
let currentIndex = 0;
let score = 0;
let ul = document.createElement('ul');
let wrongAnswer = 10;
let timeLeft = 0;


//Function for timer
function quizTimer() {
    let timerInterval = setInterval(function () {
        secondsLeft--;
        timerEl.textContent = secondsLeft + 'Seconds Left';
        if (secondsLeft === 0) {
            clearInterval(timerInterval);
            timerEl.innerHTML = '';
            inputHighscores();
        }
        if (currentIndex >= 5) {
            timerEl.innerHTML = '';
            clearInterval(timerInterval);
        }

    }, 1000)
}
//function to select a question
function renderQuestion() {
    // shuffle(questions);
    quizContainer.innerHTML = '';
    ul.innerHTML = '';
    let currentQuestion = questions[currentIndex].question;
    var userChoices = questions[currentIndex].answers;
    quizContainer.textContent = currentQuestion;
    userChoices.forEach(function (newItem) {
        console.log('Running loop');
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        listItem.setAttribute('class', 'answers');
        ul.append(listItem);
        listItem.addEventListener("click", (compare));
    })
    console.log(ul);
    quizContainer.append(ul);
};
function compare() {
    if (this.innerHTML === questions[currentIndex].correctAnswer) {
        rOrW.textContent = 'correct';
        score++;
    }
    if (this.innerHTML !== questions[currentIndex].correctAnswer) {
        rOrW.textContent = 'Incorrect' + questions[currentIndex].correctAnswer;
        secondsLeft = secondsLeft - wrongAnswer;
    }
    currentIndex++;
    if (currentIndex >= questions.length) {
        timerEl.innerHTML = '';
        return inputHighscores();

    }
    renderQuestion();
};
function inputHighscores() {
    quizContainer.innerHTML = '';
    timerEl.innerHTML = '';
    rOrW.innerHTML = '';

    var newH2 = document.createElement('h2');
    newH2.textContent = 'Submit your Highscore';

    quizContainer.append(newH2);

    var timeLeft = document.createElement('p');
    if (secondsLeft <= 0) {
        timeLeft.textContent = 'No time remaining';
        rOrW.style.display = 'none';
    }
    else {
        timeLeft.textContent = 'Your remaining time: ' + secondsLeft;
    }
    quizContainer.append(timeLeft);

    var inputInitials = document.createElement("input"); //input element, text
    inputInitials.setAttribute('type', "text");
    inputInitials.setAttribute('name', "initials");
    inputInitials.setAttribute('class', 'initials-input');

    var submitButn = document.createElement("button"); //input element, Submit button
    submitButn.textContent = 'Submit';
    submitButn.setAttribute('type', "submit");
    submitButn.setAttribute('value', "Submit");


    quizContainer.appendChild(inputInitials);
    quizContainer.appendChild(submitButn);

    submitButn.addEventListener('click', function (event) {
        event.stopPropagation();
        quizContainer = '';
        bodyEl.removeChild(timerEl);
        bodyEl.removeChild(rOrW);

        var initials = inputInitials.value;

        if (initials === null) {

            console.log("No value entered!");

        } else {
            var finalScore = {
                initials: initials,
                score: score,
                timeLeft: secondsLeft
            }
            console.log(finalScore);
            if (allScores === null) {
                allScores = [];
            } else {
                allScores.push(finalScore);
                renderHighscore();
            }

        };

    })
};

function renderHighscore() {
    let playAgainBtn = document.createElement('button');
    var allScores = localStorage.getItem('allScores');
    allScores = JSON.parse('allScores')
    newUl = document.createElement('ul')
    highscoreList.appendChild(newUl);
    for (var i = 0; i < allScores.length; i++) {
        newLi = document.createElement('li');
        newUl.appendChild(newLi);
    }

    quizContainer.appendChild(highscoreList);

    playAgainBtn.textContent = 'Playagain';
    playAgainBtn.addEventListener('click', function () {
       intro.style.display = 'flex';
    })
    quizContainer.appendChild(playAgainBtn);

}

startBtn.addEventListener('click', function (Event) {
    Event.stopPropagation
    intro.style.display = 'none'
    bodyEl.appendChild(timerEl);
    bodyEl.appendChild(quizContainer);
    bodyEl.appendChild(rOrW);

    quizTimer();
    renderQuestion();
});


