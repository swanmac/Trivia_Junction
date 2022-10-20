console.log("working today")
// Variables //
const question = document.getElementById('question');
// Convert choices into an array to be able to use array functions - data set plus number will indicate number, currently 1 & 2 respectively //
const choices = Array.from(document.getElementsByClassName('choice-text'));
console.log(choices);
const game = document.getElementById('game');
const scoreText = document.getElementById('score');
const progressText = document.getElementById('progressText');
let availableQuestions = [];
let questions = [];
let questionCounter = 0;
let score = 0;
let currentQuestion = {};
let acceptingAnswers = false;
let answerIndex = 0;
function randomAnswer () {
    answerIndex = Math.floor(Math.random() * 1) + 2;
}

fetch(
    'https://opentdb.com/api.php?amount=10&type=boolean'
)
    .then((res) => {
        return res.json();
    })
    .then((loadedQuestions) => {
        questions = loadedQuestions.results.map((loadedQuestion) => {
            const formattedQuestion = {
                question: loadedQuestion.question,
            };
            console.log(loadedQuestions);
            // Creates random answers from the answer choices //
            const answerChoices = [...loadedQuestion.incorrect_answers];
            formattedQuestion.answer = Math.floor(Math.random() * 1 + Math.ceil(Math.random() *2));
            
            // Answer choices are not zero based index so we put in -1, and we are not removing one so we put 0, then we have answer choices with the correct answers in random position //
            answerChoices.splice(formattedQuestion.answer - 1, 0,
            loadedQuestion.correct_answer
            );
            console.log(formattedQuestion.answer);

            // Reference to each answer choice and it's index, then formatted question (choice + index + 1) then assign a choice //
            answerChoices.forEach((choice, index) => {
                formattedQuestion['choice' + (index + 1)] = choice;
            });

            return formattedQuestion;
        });

        startGame();
    })
    .catch((err) => {
        console.error(err);
    });


const score_unit = 5;
let total_questions = 0;

startGame = () => {
    total_questions = questions.length
    questionCounter = 0;
    score = 0;
    // Use spread operator to get a full copy of all questions from questions array //
    availableQuestions = [...questions];
    console.log(availableQuestions);
    getNewQuestion();
    game.classList.remove('hidden');
    randomAnswer()
};

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= total_questions) {
    }
    if (questionCounter >= questions.length) {
        return
    } else {questionCounter++;}

    // template literal question count and total questions in progress text //
    progressText.innerText = `Question ${questionCounter}/${total_questions}`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerHTML = currentQuestion.question;

    // Calls a function for each element in the choices array //
    // Get number property from dataset - from current question get choice and use number to get the appropriate choice from current question //
    choices.forEach((choice) => {
        const number = choice.dataset['number'];
        choice.innerHTML = currentQuestion['choice' + number];
    });

    // We want to splice out one question that we already used from the availableQuestions array so that we don't use the question again //
    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
};
    // Answer choices listed //
    choices.forEach((choice) => {
        choice.addEventListener('click', (e) => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        console.log(selectedAnswer == currentQuestion.answer);

        // Use ternary operator if selected answer equals current answer and it is correct, class to apply is correct, else class to apply is incorrect //
        const classToApply =
            selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'; 

        if (classToApply === 'correct') {
            incrementScore(score_unit);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        // Gives one second delay to remove class to apply in order to get new question//
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
        randomAnswer()
    });
});

incrementScore = (num) => {
    score += num;
    scoreText.innerText = score;
};




