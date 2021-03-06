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
// Elements that are on static page as well as elements that will be dynamically appended
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
let highscoreH2 = document.querySelector('#highscore-h2');

// variable for running code
let secondsLeft = 60;
let currentIndex = 0;
let score = 0;
let ul = document.createElement('ul');
ul.setAttribute('id', 'answers-ul');
let wrongAnswer = 10;


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
    quizContainer.innerHTML = '';
    ul.innerHTML = '';
    let currentQuestion = questions[currentIndex].question;
    var userChoices = questions[currentIndex].answers;
    var newP = document.createElement('p');
    newP.setAttribute('class', 'current-question')
    newP.textContent = currentQuestion;
    quizContainer.appendChild(newP);
    userChoices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        listItem.setAttribute('class', 'answers');
        ul.append(listItem);
        listItem.addEventListener("click", (compare));
    })
    quizContainer.append(ul);
};
//function to compare questions
function compare() {
    if (this.innerHTML === questions[currentIndex].correctAnswer) {
        rOrW.textContent = 'correct';
        score++;
    }
    if (this.innerHTML !== questions[currentIndex].correctAnswer) {
        rOrW.textContent = 'Incorrect' + ' : ' + questions[currentIndex].correctAnswer;
        secondsLeft = secondsLeft - wrongAnswer;
    }
    currentIndex++;
    if (currentIndex >= questions.length) {
        timerEl.innerHTML = '';
        return inputHighscores();

    }
    renderQuestion();
};
//function to display form and clear questions from screen
function inputHighscores() {
    quizContainer.innerHTML = '';
    bodyEl.removeChild(timerEl);
    bodyEl.removeChild(rOrW);

    var newH2 = document.createElement('h2');
    newH2.setAttribute('class','h2-created')
    newH2.textContent = 'Submit your Highscore';

    quizContainer.append(newH2);

    var timeLeft = document.createElement('p');
    timeLeft.setAttribute('class', 'p-created');
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
    submitButn.setAttribute('id','submit-btn');


    quizContainer.appendChild(inputInitials);
    quizContainer.appendChild(submitButn);

    submitButn.addEventListener('click', function (event) {
        event.stopPropagation();
        quizContainer.innerHTML = '';

        var initials = inputInitials.value;

        if (initials === null) {

        } else {
            var finalScore = {
                initials: initials,
                score: secondsLeft
            }
            var allScores = JSON.parse(localStorage.getItem('allScores')) || [];
            allScores.push(finalScore);
            localStorage.setItem('allScores', JSON.stringify(allScores));
            renderHighscore();
        };
    })
};
//function to change to all scores screen
function renderHighscore() {
    intro.style.display = 'none';
    let playAgainBtn = document.createElement('button');
    var storedScores = JSON.parse(localStorage.getItem('allScores'));
    newUl = document.createElement('ul');
    newUl.setAttribute('id', 'highscore-ul');
    for (var i = 0; i < storedScores.length; i++) {
        newLi = document.createElement('li');
        newLi.setAttribute('class', 'highscore-li');
        newLi.textContent = storedScores[i].initials + ' : ' + storedScores[i].score;
        newUl.appendChild(newLi);
    }
    highscoreList.appendChild(newUl);
    bodyEl.appendChild(highscoreList);

    playAgainBtn.textContent = 'Playagain';
    playAgainBtn.addEventListener('click', function () {
        highscoreList.innerHTML = '';
        bodyEl.removeChild(highscoreList);
        currentIndex = 0;
        secondsLeft = 60;
        intro.style.display = 'flex';
    });
    highscoreList.appendChild(playAgainBtn);
    
}
//event listener for the word Highschore 
highscoreH2.addEventListener('click', renderHighscore);
//event to start the game
startBtn.addEventListener('click', function (Event) {
    Event.stopPropagation
    intro.style.display = 'none'
    bodyEl.appendChild(timerEl);
    bodyEl.appendChild(quizContainer);
    bodyEl.appendChild(rOrW);

    quizTimer();
    renderQuestion();
});


