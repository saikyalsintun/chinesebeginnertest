/*******************************************************
 * CHINESE DAILY TEST - APP.JS
 *******************************************************/

const CONFIG = {

    API_URL:
        "https://script.google.com/macros/s/AKfycbwS3UyHA-h6D9nsJ7fO1cm7zPFna8DyGJnKuwdwQPw39WSVSFKaYlVh-qt05qK7S6Bl/exec",

    CHAPTER_PATH:
        "chapters/",

    BEGINNER_CHAPTERS:
        15,

    SPEAKING_CHAPTERS:
        35

};


/*******************************************************
 * APPLICATION STATE
 *******************************************************/

const state = {

    username: "",

    studentClass: "",

    currentChapter: 1,

    chapterData: null,

    currentPart: 1,

    currentQuestionIndex: 0,

    answers: {

        part1: {},

        part2: {},

        part3: {}

    },

    scores: {

        part1: 0,

        part2: 0,

        part3: 0

    },

    randomOrders: {

        part1: {},

        part2: {},

        part3: {}

    },

    testSaved: false,

    answerRecordsSaved: false

};


/*******************************************************
 * DOM ELEMENTS
 *******************************************************/

const loginScreen =
    document.getElementById("loginScreen");

const testScreen =
    document.getElementById("testScreen");

const resultScreen =
    document.getElementById("resultScreen");

const loginForm =
    document.getElementById("loginForm");

const usernameInput =
    document.getElementById("username");

const passwordInput =
    document.getElementById("password");

const loginMessage =
    document.getElementById("loginMessage");

const loginButton =
    document.getElementById("loginButton");

const studentName =
    document.getElementById("studentName");

const studentClassElement =
    document.getElementById("studentClass");

const chapterSelect =
    document.getElementById("chapterSelect");

const chapterTitle =
    document.getElementById("chapterTitle");

const questionNumber =
    document.getElementById("questionNumber");

const questionText =
    document.getElementById("questionText");

const wordBank =
    document.getElementById("wordBank");

const answerArea =
    document.getElementById("answerArea");

const checkButton =
    document.getElementById("checkButton");

const nextButton =
    document.getElementById("nextButton");

const previousButton =
    document.getElementById("previousButton");

const finishButton =
    document.getElementById("finishButton");

const part1Tab =
    document.getElementById("part1Tab");

const part2Tab =
    document.getElementById("part2Tab");

const part3Tab =
    document.getElementById("part3Tab");

const part1Score =
    document.getElementById("part1Score");

const part2Score =
    document.getElementById("part2Score");

const part3Score =
    document.getElementById("part3Score");

const totalScore =
    document.getElementById("totalScore");

const percentageScore =
    document.getElementById("percentageScore");

const historyContainer =
    document.getElementById("historyContainer");

const logoutButton =
    document.getElementById("logoutButton");


/*******************************************************
 * INITIALIZATION
 *******************************************************/

document.addEventListener(
    "DOMContentLoaded",
    function () {

        setupEventListeners();

    }
);


/*******************************************************
 * EVENT LISTENERS
 *******************************************************/

function setupEventListeners() {

    if (loginForm) {

        loginForm.addEventListener(
            "submit",
            handleLogin
        );

    }


    if (chapterSelect) {

        chapterSelect.addEventListener(
            "change",
            function () {

                const chapter =
                    Number(chapterSelect.value);

                if (chapter) {

                    loadChapter(chapter);

                }

            }
        );

    }


    if (part1Tab) {

        part1Tab.addEventListener(
            "click",
            function () {

                switchPart(1);

            }
        );

    }


    if (part2Tab) {

        part2Tab.addEventListener(
            "click",
            function () {

                switchPart(2);

            }
        );

    }


    if (part3Tab) {

        part3Tab.addEventListener(
            "click",
            function () {

                switchPart(3);

            }
        );

    }


    if (previousButton) {

        previousButton.addEventListener(
            "click",
            previousQuestion
        );

    }


    if (nextButton) {

        nextButton.addEventListener(
            "click",
            nextQuestion
        );

    }


    if (checkButton) {

        checkButton.addEventListener(
            "click",
            checkCurrentQuestion
        );

    }


    if (finishButton) {

        finishButton.addEventListener(
            "click",
            finishTest
        );

    }


    if (logoutButton) {

        logoutButton.addEventListener(
            "click",
            logout
        );

    }

}


/*******************************************************
 * API
 *******************************************************/

async function callAPI(action, data = {}) {

    const params =
        new URLSearchParams();

    params.append(
        "action",
        action
    );


    Object.keys(data).forEach(
        function (key) {

            let value =
                data[key];


            if (
                typeof value === "object"
            ) {

                value =
                    JSON.stringify(value);

            }


            params.append(
                key,
                value
            );

        }
    );


    const response =
        await fetch(

            CONFIG.API_URL,

            {

                method: "POST",

                headers: {

                    "Content-Type":
                        "application/x-www-form-urlencoded;charset=UTF-8"

                },

                body:
                    params.toString(),

                cache:
                    "no-store"

            }

        );


    if (!response.ok) {

        throw new Error(
            "API request failed: " +
            response.status
        );

    }


    return await response.json();

}


/*******************************************************
 * LOGIN
 *******************************************************/

async function handleLogin(event) {

    event.preventDefault();


    const username =
        usernameInput.value.trim();

    const password =
        passwordInput.value;


    if (!username || !password) {

        showLoginMessage(
            "Please enter username and password."
        );

        return;

    }


    if (loginButton) {

        loginButton.disabled = true;

        loginButton.textContent =
            "Logging in...";

    }


    try {

        const result =
            await callAPI(

                "login",

                {

                    username:
                        username,

                    password:
                        password

                }

            );


        if (!result.success) {

            showLoginMessage(
                result.message ||
                "Login failed."
            );

            return;

        }


        state.username =
            result.username ||
            username;


        state.studentClass =
            result.class ||
            "";


        /*
         * ADMIN REDIRECT
         */

        if (
            state.studentClass
                .trim()
                .toLowerCase() ===
            "admin"
        ) {

            window.location.href =
                "admin.html";

            return;

        }


        showStudentScreen();

        populateStudentInfo();

        populateChapterSelector();

        await loadChapter(1);


    } catch (error) {

        console.error(
            "LOGIN ERROR:",
            error
        );


        showLoginMessage(
            "Unable to connect to the server."
        );


    } finally {

        if (loginButton) {

            loginButton.disabled =
                false;

            loginButton.textContent =
                "Login";

        }

    }

}


/*******************************************************
 * LOGIN MESSAGE
 *******************************************************/

function showLoginMessage(message) {

    if (!loginMessage) {
        return;
    }


    loginMessage.textContent =
        message;

}


/*******************************************************
 * SHOW STUDENT SCREEN
 *******************************************************/

function showStudentScreen() {

    if (loginScreen) {

        loginScreen.classList.remove(
            "active"
        );

        loginScreen.style.display =
            "none";

    }


    if (testScreen) {

        testScreen.classList.add(
            "active"
        );

        testScreen.style.display =
            "";

    }


    if (resultScreen) {

        resultScreen.classList.remove(
            "active"
        );

        resultScreen.style.display =
            "none";

    }

}


/*******************************************************
 * POPULATE STUDENT INFO
 *******************************************************/

function populateStudentInfo() {

    if (studentName) {

        studentName.textContent =
            state.username;

    }


    if (studentClassElement) {

        studentClassElement.textContent =
            state.studentClass;

    }

}


/*******************************************************
 * CHAPTER SELECTOR
 *******************************************************/

function populateChapterSelector() {

    if (!chapterSelect) {
        return;
    }


    chapterSelect.innerHTML =
        "";


    let numberOfChapters =
        CONFIG.BEGINNER_CHAPTERS;


    if (
        state.studentClass
            .trim()
            .toLowerCase() ===
        "speaking"
    ) {

        numberOfChapters =
            CONFIG.SPEAKING_CHAPTERS;

    }


    for (
        let i = 1;
        i <= numberOfChapters;
        i++
    ) {

        const option =
            document.createElement(
                "option"
            );


        option.value =
            i;


        option.textContent =
            "Chapter " + i;


        chapterSelect.appendChild(
            option
        );

    }


    chapterSelect.value =
        state.currentChapter;

}


/*******************************************************
 * LOAD CHAPTER
 *******************************************************/

async function loadChapter(chapterNumber) {

    try {

        state.currentChapter =
            Number(chapterNumber);

        state.currentPart =
            1;

        state.currentQuestionIndex =
            0;


        state.chapterData =
            null;


        state.answers = {

            part1: {},

            part2: {},

            part3: {}

        };


        state.scores = {

            part1: 0,

            part2: 0,

            part3: 0

        };


        state.randomOrders = {

            part1: {},

            part2: {},

            part3: {}

        };


        state.testSaved =
            false;


        state.answerRecordsSaved =
            false;


        const response =
            await fetch(

                CONFIG.CHAPTER_PATH +
                "Chapter" +
                state.currentChapter +
                ".json?" +
                Date.now()

            );


        if (!response.ok) {

            throw new Error(
                "Chapter file not found."
            );

        }


        state.chapterData =
            await response.json();


        if (chapterTitle) {

            chapterTitle.textContent =
                state.chapterData.title ||
                "Chapter " +
                state.currentChapter;

        }


        renderCurrentQuestion();


    } catch (error) {

        console.error(
            "LOAD CHAPTER ERROR:",
            error
        );


        alert(
            "Unable to load Chapter " +
            state.currentChapter
        );

    }

}


/*******************************************************
 * GET CURRENT PART DATA
 *******************************************************/

function getCurrentPartData() {

    if (!state.chapterData) {
        return [];
    }


    if (state.currentPart === 1) {

        return state.chapterData.part1 || [];

    }


    if (state.currentPart === 2) {

        return state.chapterData.part2 || [];

    }


    if (state.currentPart === 3) {

        return state.chapterData.part3 || [];

    }


    return [];

}


/*******************************************************
 * RENDER CURRENT QUESTION
 *******************************************************/

function renderCurrentQuestion() {

    const questions =
        getCurrentPartData();


    if (!questions.length) {

        if (questionText) {

            questionText.textContent =
                "No questions available.";

        }

        return;

    }


    const index =
        state.currentQuestionIndex;


    const question =
        questions[index];


    if (!question) {
        return;
    }


    if (questionNumber) {

        questionNumber.textContent =
            `${index + 1} / ${questions.length}`;

    }


    if (questionText) {

        questionText.textContent =
            question.question || "";

    }


    if (part1Tab) {

        part1Tab.classList.toggle(
            "active",
            state.currentPart === 1
        );

    }


    if (part2Tab) {

        part2Tab.classList.toggle(
            "active",
            state.currentPart === 2
        );

    }


    if (part3Tab) {

        part3Tab.classList.toggle(
            "active",
            state.currentPart === 3
        );

    }


    renderSelectedAnswer();

    renderWordBank(question);

    updateNavigationButtons();

}


/*******************************************************
 * GET WORDS
 *******************************************************/

function getQuestionWords(question) {

    if (
        Array.isArray(question.words)
    ) {

        return question.words;

    }


    if (
        Array.isArray(question.options)
    ) {

        return question.options;

    }


    return [];

}


/*******************************************************
 * SHUFFLE
 *******************************************************/

function shuffleArray(array) {

    const result =
        [...array];


    for (
        let i = result.length - 1;
        i > 0;
        i--
    ) {

        const j =
            Math.floor(
                Math.random() * (i + 1)
            );


        [
            result[i],
            result[j]
        ] =
        [
            result[j],
            result[i]
        ];

    }


    return result;

}


/*******************************************************
 * GET RANDOM WORDS
 *******************************************************/

function getRandomWords(
    part,
    questionIndex,
    question
) {

    if (
        state.randomOrders[part][questionIndex]
    ) {

        return state.randomOrders[part][questionIndex];

    }


    const words =
        getQuestionWords(question);


    const shuffled =
        shuffleArray(words);


    state.randomOrders[part][questionIndex] =
        shuffled;


    return shuffled;

}


/*******************************************************
 * RENDER WORD BANK
 *******************************************************/

function renderWordBank(question) {

    if (!wordBank) {
        return;
    }


    wordBank.innerHTML =
        "";


    const words =
        getRandomWords(

            "part" +
            state.currentPart,

            state.currentQuestionIndex,

            question

        );


    words.forEach(
        function(word, index) {

            const button =
                document.createElement(
                    "button"
                );


            button.type =
                "button";


            button.className =
                "word-button";


            button.textContent =
                word;


            button.dataset.word =
                word;


            button.dataset.index =
                index;


            button.addEventListener(
                "click",
                function() {

                    selectWord(
                        word,
                        button
                    );

                }
            );


            wordBank.appendChild(
                button
            );

        }
    );


    updateWordButtonStates();

}


/*******************************************************
 * UPDATE WORD BUTTON STATES
 *******************************************************/

function updateWordButtonStates() {

    if (!wordBank) {
        return;
    }


    const selected =
        state.answers[
            "part" +
            state.currentPart
        ][
            state.currentQuestionIndex
        ] || [];


    const selectedCounts = {};


    selected.forEach(
        function(item) {

            const word =
                item.word;


            selectedCounts[word] =
                (selectedCounts[word] || 0) + 1;

        }
    );


    const usedCounts = {};


    Array.from(
        wordBank.children
    ).forEach(
        function(button) {

            const word =
                button.dataset.word;


            usedCounts[word] =
                usedCounts[word] || 0;


            if (
                usedCounts[word] <
                (selectedCounts[word] || 0)
            ) {

                button.classList.add(
                    "selected-word"
                );

                usedCounts[word]++;

            } else {

                button.classList.remove(
                    "selected-word"
                );

            }

        }
    );

}


/*******************************************************
 * SELECT WORD
 *******************************************************/

function selectWord(word, button) {

    const partKey =
        "part" +
        state.currentPart;


    if (
        !state.answers[partKey][
            state.currentQuestionIndex
        ]
    ) {

        state.answers[partKey][
            state.currentQuestionIndex
        ] = [];

    }


    const selected =
        state.answers[partKey][
            state.currentQuestionIndex
        ];


    const buttons =
        Array.from(
            wordBank.querySelectorAll(
                ".word-button"
            )
        );


    const clickedIndex =
        buttons.indexOf(button);


    if (
        button.classList.contains(
            "selected-word"
        )
    ) {

        const occurrence =
            buttons
                .slice(0, clickedIndex + 1)
                .filter(
                    function(item) {

                        return (
                            item.dataset.word ===
                            word
                        );

                    }
                ).length;


        let matchingIndex = -1;

        let count = 0;


        for (
            let i = 0;
            i < selected.length;
            i++
        ) {

            if (
                selected[i].word === word
            ) {

                count++;


                if (
                    count === occurrence
                ) {

                    matchingIndex =
                        i;

                    break;

                }

            }

        }


        if (
            matchingIndex !== -1
        ) {

            selected.splice(
                matchingIndex,
                1
            );

        }

    } else {

        selected.push({

            word:
                word,

            index:
                clickedIndex

        });

    }


    renderSelectedAnswer();

    updateWordButtonStates();

}


/*******************************************************
 * RENDER SELECTED ANSWER
 *******************************************************/

function renderSelectedAnswer() {

    if (!answerArea) {
        return;
    }


    answerArea.innerHTML =
        "";


    const partKey =
        "part" +
        state.currentPart;


    const selected =
        state.answers[partKey][
            state.currentQuestionIndex
        ] || [];


    selected.forEach(
        function(item, index) {

            const button =
                document.createElement(
                    "button"
                );


            button.type =
                "button";


            button.className =
                "selected-answer-word";


            button.textContent =
                item.word;


            button.addEventListener(
                "click",
                function() {

                    selected.splice(
                        index,
                        1
                    );


                    renderSelectedAnswer();

                    updateWordButtonStates();

                }
            );


            answerArea.appendChild(
                button
            );

        }
    );

}


/*******************************************************
 * SWITCH PART
 *******************************************************/

function switchPart(part) {

    if (
        part < 1 ||
        part > 3
    ) {

        return;

    }


    state.currentPart =
        part;


    state.currentQuestionIndex =
        0;


    renderCurrentQuestion();

}


/*******************************************************
 * NEXT QUESTION
 *******************************************************/

function nextQuestion() {

    const questions =
        getCurrentPartData();


    if (!questions.length) {
        return;
    }


    if (
        state.currentQuestionIndex <
        questions.length - 1
    ) {

        state.currentQuestionIndex++;

        renderCurrentQuestion();

        return;

    }


    if (
        state.currentPart < 3
    ) {

        state.currentPart++;

        state.currentQuestionIndex =
            0;

        renderCurrentQuestion();

    }

}


/*******************************************************
 * PREVIOUS QUESTION
 *******************************************************/

function previousQuestion() {

    if (
        state.currentQuestionIndex > 0
    ) {

        state.currentQuestionIndex--;

        renderCurrentQuestion();

        return;

    }


    if (
        state.currentPart > 1
    ) {

        state.currentPart--;

        const questions =
            getCurrentPartData();


        state.currentQuestionIndex =
            Math.max(
                0,
                questions.length - 1
            );


        renderCurrentQuestion();

    }

}


/*******************************************************
 * UPDATE NAVIGATION BUTTONS
 *******************************************************/

function updateNavigationButtons() {

    const questions =
        getCurrentPartData();


    if (previousButton) {

        previousButton.disabled =
            (
                state.currentPart === 1 &&
                state.currentQuestionIndex === 0
            );

    }


    if (nextButton) {

        const isLastQuestion =
            state.currentQuestionIndex >=
            questions.length - 1;


        const isLastPart =
            state.currentPart === 3;


        nextButton.disabled =
            (
                isLastQuestion &&
                isLastPart
            );

    }

}


/*******************************************************
 * CHECK CURRENT QUESTION
 *******************************************************/

function checkCurrentQuestion() {

    const partKey =
        "part" +
        state.currentPart;


    const selected =
        state.answers[partKey][
            state.currentQuestionIndex
        ] || [];


    const answer =
        selected
            .map(
                function(item) {

                    return item.word;

                }
            )
            .join(" ");


    const questions =
        getCurrentPartData();


    const question =
        questions[
            state.currentQuestionIndex
        ];


    if (!question) {
        return;
    }


    const correctAnswers =
        getAcceptedAnswers(question);


    const normalizedAnswer =
        normalizeAnswer(answer);


    const correct =
        correctAnswers.some(
            function(correctAnswer) {

                return (
                    normalizeAnswer(
                        correctAnswer
                    ) ===
                    normalizedAnswer
                );

            }
        );


    if (correct) {

        alert("Correct!");

    } else {

        alert("Not correct.");

    }

}


/*******************************************************
 * GET ACCEPTED ANSWERS
 *******************************************************/

function getAcceptedAnswers(question) {

    if (
        Array.isArray(question.answers)
    ) {

        return question.answers;

    }


    if (
        typeof question.answer ===
        "string"
    ) {

        return [
            question.answer
        ];

    }


    return [];

}


/*******************************************************
 * NORMALIZE ANSWER
 *******************************************************/

function normalizeAnswer(value) {

    return String(value || "")

        .trim()

        .replace(
            /\s+/g,
            " "
        )

        .toLowerCase();

}


/*******************************************************
 * CALCULATE SCORES
 *******************************************************/

function calculateScores() {

    state.scores = {

        part1: 0,

        part2: 0,

        part3: 0

    };


    const parts = [

        {

            key: "part1",

            data:
                state.chapterData.part1 || []

        },

        {

            key: "part2",

            data:
                state.chapterData.part2 || []

        },

        {

            key: "part3",

            data:
                state.chapterData.part3 || []

        }

    ];


    parts.forEach(
        function(part) {

            part.data.forEach(
                function(question, index) {

                    const selected =
                        state.answers[
                            part.key
                        ][index] || [];


                    const userAnswer =
                        selected

                            .map(
                                function(item) {

                                    return item.word;

                                }
                            )

                            .join(" ");


                    const acceptedAnswers =
                        getAcceptedAnswers(
                            question
                        );


                    const correct =
                        acceptedAnswers.some(
                            function(answer) {

                                return (
                                    normalizeAnswer(
                                        answer
                                    ) ===
                                    normalizeAnswer(
                                        userAnswer
                                    )
                                );

                            }
                        );


                    if (correct) {

                        state.scores[
                            part.key
                        ]++;

                    }

                }
            );

        }
    );


    return state.scores;

}


/*******************************************************
 * FINISH TEST
 *******************************************************/

async function finishTest() {

    const scores =
        calculateScores();


    const part1Total =
        (
            state.chapterData.part1 || []
        ).length;


    const part2Total =
        (
            state.chapterData.part2 || []
        ).length;


    const part3Total =
        (
            state.chapterData.part3 || []
        ).length;


    const total =
        scores.part1 +
        scores.part2 +
        scores.part3;


    const maximum =
        part1Total +
        part2Total +
        part3Total;


    const percentage =
        maximum > 0
            ? Math.round(
                (
                    total /
                    maximum
                ) * 100
            )
            : 0;


    showResults(

        scores,

        total,

        maximum,

        percentage

    );


    await saveScore();

    await saveAnswerRecords();

}


/*******************************************************
 * SHOW RESULTS
 *******************************************************/

function showResults(
    scores,
    total,
    maximum,
    percentage
) {

    if (testScreen) {

        testScreen.classList.remove(
            "active"
        );

        testScreen.style.display =
            "none";

    }


    if (resultScreen) {

        resultScreen.classList.add(
            "active"
        );

        resultScreen.style.display =
            "";

    }


    if (part1Score) {

        part1Score.textContent =
            scores.part1;

    }


    if (part2Score) {

        part2Score.textContent =
            scores.part2;

    }


    if (part3Score) {

        part3Score.textContent =
            scores.part3;

    }


    if (totalScore) {

        totalScore.textContent =
            `${total} / ${maximum}`;

    }


    if (percentageScore) {

        percentageScore.textContent =
            `${percentage}%`;

    }


    loadScoreHistory();

}


/*******************************************************
 * SAVE SCORE
 *******************************************************/

async function saveScore() {

    if (state.testSaved) {
        return;
    }


    const scores =
        state.scores;


    const part1Total =
        (
            state.chapterData.part1 || []
        ).length;


    const part2Total =
        (
            state.chapterData.part2 || []
        ).length;


    const part3Total =
        (
            state.chapterData.part3 || []
        ).length;


    const total =
        scores.part1 +
        scores.part2 +
        scores.part3;


    const maximum =
        part1Total +
        part2Total +
        part3Total;


    const percentage =
        maximum > 0
            ? Math.round(
                (
                    total /
                    maximum
                ) * 100
            )
            : 0;


    try {

        const result =
            await callAPI(

                "saveScore",

                {

                    username:
                        state.username,

                    class:
                        state.studentClass,

                    chapter:
                        state.currentChapter,

                    part1Score:
                        scores.part1,

                    part2Score:
                        scores.part2,

                    part3Score:
                        scores.part3,

                    total:
                        total,

                    maximum:
                        maximum,

                    percentage:
                        percentage

                }

            );


        if (result.success) {

            state.testSaved =
                true;

        }


    } catch (error) {

        console.error(
            "SAVE SCORE ERROR:",
            error
        );

    }

}


/*******************************************************
 * SAVE ANSWER RECORDS
 *******************************************************/

async function saveAnswerRecords() {

    if (state.answerRecordsSaved) {
        return;
    }


    console.log(
        "START SAVING ANSWER RECORDS"
    );


    const records = [];


    const parts = [

        {

            key: "part1",

            data:
                state.chapterData.part1 || []

        },

        {

            key: "part2",

            data:
                state.chapterData.part2 || []

        },

        {

            key: "part3",

            data:
                state.chapterData.part3 || []

        }

    ];


    parts.forEach(
        function(part) {

            part.data.forEach(
                function(question, index) {

                    const selected =
                        state.answers[
                            part.key
                        ][index] || [];


                    const answer =
                        selected

                            .map(
                                function(item) {

                                    return item.word;

                                }
                            )

                            .join(" ");


                    records.push({

                        question:
                            question.question || "",

                        answer:
                            answer

                    });

                }
            );

        }
    );


    console.log(
        "USERNAME:",
        state.username
    );


    console.log(
        "CLASS:",
        state.studentClass
    );


    console.log(
        "NUMBER OF RECORDS:",
        records.length
    );


    console.log(
        "RECORDS:",
        records
    );


    try {

        const result =
            await callAPI(

                "saveAnswerRecords",

                {

                    username:
                        state.username,

                    class:
                        state.studentClass,

                    records:
                        JSON.stringify(records)

                }

            );


        console.log(
            "GOOGLE APPS SCRIPT RESPONSE:",
            result
        );


        if (
            result.success === true
        ) {

            state.answerRecordsSaved =
                true;


            console.log(
                "ANSWER RECORDS SAVED SUCCESSFULLY"
            );

        } else {

            console.error(
                "ANSWER RECORD SAVE FAILED:",
                result.message
            );

        }


    } catch (error) {

        console.error(
            "SAVE ANSWER RECORDS ERROR:",
            error
        );

    }

}


/*******************************************************
 * LOAD SCORE HISTORY
 *******************************************************/

async function loadScoreHistory() {

    if (!historyContainer) {
        return;
    }


    historyContainer.innerHTML =
        "Loading history...";


    try {

        const result =
            await callAPI(

                "getScoreHistory",

                {

                    username:
                        state.username

                }

            );


        if (!result.success) {

            historyContainer.innerHTML =
                "Unable to load history.";

            return;

        }


        const records =
            result.records ||
            result.history ||
            [];


        if (!records.length) {

            historyContainer.innerHTML =
                "No score history yet.";

            return;

        }


        historyContainer.innerHTML =
            "";


        records.forEach(
            function(record, index) {

                /*
                 * Support both the original
                 * Google Sheet column names
                 * and lowercase alternatives.
                 */

                const chapter =
                    record.Chapter ??
                    record.chapter ??
                    "";


                const className =
                    record.Class ??
                    record.class ??
                    state.studentClass;


                const p1 =
                    record["Part 1 Score"] ??
                    record.part1Score ??
                    0;


                const p2 =
                    record["Part 2 Score"] ??
                    record.part2Score ??
                    0;


                const p3 =
                    record["Part 3 Score"] ??
                    record.part3Score ??
                    0;


                const total =
                    record.Total ??
                    record.total ??
                    0;


                const maximum =
                    record.Maximum ??
                    record.maximum ??
                    0;


                const percentage =
                    record.Percentage ??
                    record.percentage ??
                    0;


                const date =
                    record.Date ??
                    record.date ??
                    "";


                const item =
                    document.createElement(
                        "div"
                    );


                item.className =
                    "history-item";


                /*
                 * Store the full result on the
                 * button using a unique ID.
                 */

                const resultData = {

                    username:
                        state.username,

                    class:
                        className,

                    chapter:
                        chapter,

                    part1Score:
                        p1,

                    part2Score:
                        p2,

                    part3Score:
                        p3,

                    total:
                        total,

                    maximum:
                        maximum,

                    percentage:
                        percentage,

                    date:
                        date

                };


                const printButton =
                    document.createElement(
                        "button"
                    );


                printButton.type =
                    "button";


                printButton.className =
                    "print-result-button";


                printButton.textContent =
                    "Print / Save PDF";


                printButton.addEventListener(
                    "click",
                    function() {

                        printResultPDF(
                            resultData
                        );

                    }
                );


                /*
                 * Create the history record.
                 */

                const info =
                    document.createElement(
                        "div"
                    );


                info.className =
                    "history-info";


                info.innerHTML = `

                    <div class="history-title">
                        Chapter ${escapeHTML(
                            String(chapter)
                        )}
                    </div>

                    <div class="history-details">

                        <span>
                            ${escapeHTML(
                                String(total)
                            )}
                            /
                            ${escapeHTML(
                                String(maximum)
                            )}
                        </span>

                        <span>
                            ${escapeHTML(
                                String(percentage)
                            )}%
                        </span>

                        <span>
                            ${escapeHTML(
                                String(date)
                            )}
                        </span>

                    </div>

                `;


                const scores =
                    document.createElement(
                        "div"
                    );


                scores.className =
                    "history-scores";


                scores.innerHTML = `

                    <div>
                        <span>Part 1</span>
                        <strong>
                            ${escapeHTML(
                                String(p1)
                            )}
                        </strong>
                    </div>

                    <div>
                        <span>Part 2</span>
                        <strong>
                            ${escapeHTML(
                                String(p2)
                            )}
                        </strong>
                    </div>

                    <div>
                        <span>Part 3</span>
                        <strong>
                            ${escapeHTML(
                                String(p3)
                            )}
                        </strong>
                    </div>

                `;


                const actions =
                    document.createElement(
                        "div"
                    );


                actions.className =
                    "history-actions";


                actions.appendChild(
                    printButton
                );


                item.appendChild(
                    info
                );


                item.appendChild(
                    scores
                );


                item.appendChild(
                    actions
                );


                historyContainer.appendChild(
                    item
                );

            }
        );


    } catch (error) {

        console.error(
            "HISTORY ERROR:",
            error
        );


        historyContainer.innerHTML =
            "Unable to load history.";

    }

}


/*******************************************************
 * ESCAPE HTML
 *******************************************************/

function escapeHTML(value) {

    return String(value)

        .replace(
            /&/g,
            "&amp;"
        )

        .replace(
            /</g,
            "&lt;"
        )

        .replace(
            />/g,
            "&gt;"
        )

        .replace(
            /"/g,
            "&quot;"
        )

        .replace(
            /'/g,
            "&#039;"
        );

}


/*******************************************************
 * PRINT / SAVE RESULT AS PDF
 *******************************************************/

function printResultPDF(result) {

    const username =
        escapeHTML(
            result.username
        );


    const studentClass =
        escapeHTML(
            result.class
        );


    const chapter =
        escapeHTML(
            String(result.chapter)
        );


    const part1 =
        escapeHTML(
            String(result.part1Score)
        );


    const part2 =
        escapeHTML(
            String(result.part2Score)
        );


    const part3 =
        escapeHTML(
            String(result.part3Score)
        );


    const total =
        escapeHTML(
            String(result.total)
        );


    const maximum =
        escapeHTML(
            String(result.maximum)
        );


    const percentage =
        escapeHTML(
            String(result.percentage)
        );


    const date =
        escapeHTML(
            String(result.date)
        );


    /*
     * Create a completely separate
     * printable window.
     */

    const printWindow =
        window.open(
            "",
            "_blank",
            "width=900,height=900"
        );


    if (!printWindow) {

        alert(
            "Please allow pop-ups to print your result."
        );

        return;

    }


    printWindow.document.open();


    printWindow.document.write(`

        <!DOCTYPE html>

        <html lang="en">

        <head>

            <meta charset="UTF-8">

            <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0"
            >

            <title>
                Chinese Daily Test - Result
            </title>


            <style>

                * {
                    box-sizing: border-box;
                }


                body {

                    margin: 0;

                    padding: 40px 20px;

                    background: #f3f3f3;

                    font-family:
                        Arial,
                        Helvetica,
                        sans-serif;

                    color: #222;

                }


                .print-page {

                    width: 100%;

                    max-width: 800px;

                    margin: 0 auto;

                    background: white;

                    padding: 50px;

                    border: 1px solid #ddd;

                }


                .header {

                    text-align: center;

                    border-bottom:
                        3px solid #383838;

                    padding-bottom: 25px;

                    margin-bottom: 30px;

                }


                .logo {

                    width: 58px;

                    height: 58px;

                    margin: 0 auto 15px;

                    border-radius: 50%;

                    background: #383838;

                    color: white;

                    display: flex;

                    align-items: center;

                    justify-content: center;

                    font-size: 28px;

                    font-weight: bold;

                }


                .header h1 {

                    margin: 0;

                    font-size: 28px;

                    letter-spacing: 1px;

                }


                .header p {

                    margin: 8px 0 0;

                    color: #666;

                    font-size: 14px;

                }


                .student-section {

                    display: grid;

                    grid-template-columns:
                        1fr 1fr;

                    gap: 15px;

                    margin-bottom: 30px;

                }


                .student-box {

                    padding: 16px;

                    border:
                        1px solid #ddd;

                    border-radius: 8px;

                    background: #fafafa;

                }


                .label {

                    font-size: 11px;

                    text-transform: uppercase;

                    letter-spacing: 1px;

                    color: #777;

                    margin-bottom: 6px;

                }


                .value {

                    font-size: 16px;

                    font-weight: 600;

                }


                .chapter {

                    text-align: center;

                    margin-bottom: 30px;

                }


                .chapter h2 {

                    margin: 0;

                    font-size: 23px;

                }


                .scores {

                    border:
                        1px solid #ddd;

                    border-radius: 10px;

                    overflow: hidden;

                    margin-bottom: 30px;

                }


                .score-row {

                    display: grid;

                    grid-template-columns:
                        1fr 150px;

                    padding: 17px 20px;

                    border-bottom:
                        1px solid #ddd;

                }


                .score-row:last-child {

                    border-bottom: none;

                }


                .score-row span {

                    color: #555;

                }


                .score-row strong {

                    text-align: right;

                }


                .total-row {

                    background: #383838;

                    color: white;

                    font-size: 18px;

                }


                .total-row span {

                    color: white;

                }


                .percentage-box {

                    text-align: center;

                    padding: 25px;

                    border:
                        2px solid #383838;

                    border-radius: 10px;

                    margin-bottom: 30px;

                }


                .percentage-label {

                    font-size: 12px;

                    text-transform: uppercase;

                    letter-spacing: 2px;

                    color: #666;

                }


                .percentage {

                    font-size: 42px;

                    font-weight: bold;

                    margin-top: 8px;

                }


                .footer {

                    text-align: center;

                    padding-top: 25px;

                    border-top:
                        1px solid #ddd;

                    color: #777;

                    font-size: 12px;

                }


                @media print {

                    body {

                        background: white;

                        padding: 0;

                    }


                    .print-page {

                        max-width: none;

                        border: none;

                        padding: 35px;

                    }

                }


                @page {

                    size: A4;

                    margin: 15mm;

                }

            </style>

        </head>


        <body>

            <div class="print-page">


                <div class="header">

                    <div class="logo">
                        中
                    </div>

                    <h1>
                        CHINESE DAILY TEST
                    </h1>

                    <p>
                        STUDENT TEST RESULT
                    </p>

                </div>


                <div class="student-section">

                    <div class="student-box">

                        <div class="label">
                            Student
                        </div>

                        <div class="value">
                            ${username}
                        </div>

                    </div>


                    <div class="student-box">

                        <div class="label">
                            Class
                        </div>

                        <div class="value">
                            ${studentClass}
                        </div>

                    </div>


                    <div class="student-box">

                        <div class="label">
                            Chapter
                        </div>

                        <div class="value">
                            Chapter ${chapter}
                        </div>

                    </div>


                    <div class="student-box">

                        <div class="label">
                            Date
                        </div>

                        <div class="value">
                            ${date}
                        </div>

                    </div>

                </div>


                <div class="chapter">

                    <h2>
                        Chapter ${chapter} Result
                    </h2>

                </div>


                <div class="scores">

                    <div class="score-row">

                        <span>
                            Part 1 — Translation
                        </span>

                        <strong>
                            ${part1}
                        </strong>

                    </div>


                    <div class="score-row">

                        <span>
                            Part 2 — Answer the Question
                        </span>

                        <strong>
                            ${part2}
                        </strong>

                    </div>


                    <div class="score-row">

                        <span>
                            Part 3 — Scramble
                        </span>

                        <strong>
                            ${part3}
                        </strong>

                    </div>


                    <div class="score-row total-row">

                        <span>
                            Total Score
                        </span>

                        <strong>
                            ${total} / ${maximum}
                        </strong>

                    </div>

                </div>


                <div class="percentage-box">

                    <div class="percentage-label">
                        Final Score
                    </div>

                    <div class="percentage">
                        ${percentage}%
                    </div>

                </div>


                <div class="footer">

                    Chinese Daily Test

                    <br>

                    Student Result Report

                </div>


            </div>


            <script>

                window.onload = function () {

                    setTimeout(
                        function () {

                            window.print();

                        },
                        300
                    );

                };

            <\/script>

        </body>

        </html>

    `);


    printWindow.document.close();

}


/*******************************************************
 * LOGOUT
 *******************************************************/

function logout() {

    state.username =
        "";

    state.studentClass =
        "";

    state.currentChapter =
        1;

    state.chapterData =
        null;

    state.currentPart =
        1;

    state.currentQuestionIndex =
        0;


    state.answers = {

        part1: {},

        part2: {},

        part3: {}

    };


    state.scores = {

        part1: 0,

        part2: 0,

        part3: 0

    };


    state.randomOrders = {

        part1: {},

        part2: {},

        part3: {}

    };


    state.testSaved =
        false;


    state.answerRecordsSaved =
        false;


    if (usernameInput) {

        usernameInput.value =
            "";

    }


    if (passwordInput) {

        passwordInput.value =
            "";

    }


    if (loginMessage) {

        loginMessage.textContent =
            "";

    }


    if (testScreen) {

        testScreen.classList.remove(
            "active"
        );

        testScreen.style.display =
            "none";

    }


    if (resultScreen) {

        resultScreen.classList.remove(
            "active"
        );

        resultScreen.style.display =
            "none";

    }


    if (loginScreen) {

        loginScreen.classList.add(
            "active"
        );

        loginScreen.style.display =
            "";

    }

}
