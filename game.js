// Variable Declarations
const question = document.querySelector(".question");
const form = document.querySelector("form");
const userAnswer = document.querySelector("form input");
const popUp = document.querySelector(".overlay");
const bg = document.querySelector(".problem");
const progressBar = document.querySelector(".progress-bar");
const statement = document.querySelector(".statement");
const gameStatus = document.querySelector(".game-status");
const reset = document.querySelector(".overlay button");

let state = {
    wrongAnswers : 0,
    questionsLeft : 10
}

// Function Declarations
function generateNumber(x) {
    return Math.floor(Math.random() * x + 1);
}

function generateQuestion() {
    return {
        value1 : generateNumber(10),
        value2 : generateNumber(10),
        operator : ['+', '-', 'x'][generateNumber(2)]
    }
}

function updateQuestion() {
    state.currentQuestion = generateQuestion();
    let q = state.currentQuestion;
    question.textContent = `${q.value1} ${q.operator} ${q.value2}`;
}

function formSub(e) {
    e.preventDefault();

    let q = state.currentQuestion;
    let correctAnswer;

    if(q.operator === '+') correctAnswer =  q.value1 +  q.value2;
    if(q.operator === '-') correctAnswer =  q.value1 -  q.value2;
    if(q.operator === 'x') correctAnswer =  q.value1 *  q.value2;
    
    form.focus();
    userAnswer.value = '';

    if(correctAnswer === userAnswer.valueAsNumber) {
        state.questionsLeft -= 1;
        statement.textContent = `You have ${state.questionsLeft} questions to answer, and can answer ${3-state.wrongAnswers} wrongs.`;
        progressBar.style.transform = `scaleX(0.${10 - state.questionsLeft})`;

        if(state.questionsLeft === 0) {
            reset.focus();
            gameOver(true);
        }

    } else {
        state.wrongAnswers += 1;
        question.classList.add("error");
        statement.textContent = `You have ${state.questionsLeft} questions to answer, and can answer ${3-state.wrongAnswers} wrongs.`;
        setTimeout(() => { question.classList.remove("error"); }, 550);
        if(state.wrongAnswers === 3) {
            reset.focus();
            gameOver(false)
        }
    }

    updateQuestion();
}

function gameOver(won) {
    form.blur();
    userAnswer.blur()

    reset.focus();
    bg.classList.add("blur")
    popUp.classList.remove("hid");
    progressBar.style.transform = `scaleX(0.0)`;


    if(won) {
        gameStatus.textContent = `Congratulations! You've Won the Game.`;
    } else {
        gameStatus.textContent = `Sorry, You've Lost the Game.`;
    }
}

function resetGame() {
    state.questionsLeft = 10;
    state.wrongAnswers = 0;

    bg.classList.remove("blur")
    popUp.classList.add("hid");
    progressBar.style.transform = `scaleX(0.0)`;
    updateQuestion();
}



// Events
form.addEventListener("submit", formSub);
reset.addEventListener("click", resetGame);




// Function Calls
updateQuestion();