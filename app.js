/* =========================================================
   CHINESE DAILY TEST
   APP.JS
========================================================= */


/* =========================================================
   CONFIGURATION
========================================================= */

const CONFIG = {

    API_URL:
        "https://script.google.com/macros/s/AKfycbwS3UyHA-h6D9nsJ7fO1cm7zPFna8DyGJnKuwdwQPw39WSVSFKaYlVh-qt05qK7S6Bl/exec",

    CLASS_CONFIG: {

        Beginner: {
            folder: "chapters",
            totalChapters: 15
        },

        Speaking: {
            folder: "speaking",
            totalChapters: 35
        }

    }

};


/* =========================================================
   APPLICATION STATE
========================================================= */

const state = {

    username: null,

    studentClass: null,

    currentChapter: null,

    chapterData: null,

    currentPart: "part1",

    currentQuestionIndex: 0,

    answers: {

        part1: {},
        part2: {},
        part3: {}

    },

    scores: {

        part1: 0,
        part2: 0,
        part3: 0,
        total: 0

    },

    randomOrders: {

        part1: {},
        part2: {},
        part3: {}

    },

    testSaved: false,

    answerRecordsSaved: false

};


/* =========================================================
   DOM ELEMENTS
========================================================= */

let loginScreen;
let chapterScreen;
let testScreen;
let resultScreen;
let historyScreen;

let loginForm;
let loginMessage;
let loginButton;

let usernameInput;
let passwordInput;

let welcomeUsername;
let studentClassBadge;
let chapterGrid;
let logoutButton;

let backToChapters;

let testChapter;
let partTitle;
let questionCounter;
let progressBar;
let questionType;
let questionText;

let selectedWords;
let wordBank;
let clearAnswer;

let previousButton;
let nextButton;

let partTabs;

let resultChapter;
let part1Score;
let part2Score;
let part3Score;
let totalScore;
let percentageScore;
let saveStatus;
let backToChapterButton;

let scoreHistoryButton;
let chapterHistoryButton;

let backFromHistory;
let historyStudent;
let historyLoading;
let historyEmpty;
let historyList;


/* =========================================================
   INITIALIZATION
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    initializeApp
);


function initializeApp() {

    cacheDOMElements();

    setupEventListeners();

    showScreen(
        loginScreen
    );

}


/* =========================================================
   CACHE DOM ELEMENTS
========================================================= */

function cacheDOMElements() {

    loginScreen =
        document.getElementById(
            "loginScreen"
        );

    chapterScreen =
        document.getElementById(
            "chapterScreen"
        );

    testScreen =
        document.getElementById(
            "testScreen"
        );

    resultScreen =
        document.getElementById(
            "resultScreen"
        );

    historyScreen =
        document.getElementById(
            "historyScreen"
        );


    loginForm =
        document.getElementById(
            "loginForm"
        );

    loginMessage =
        document.getElementById(
            "loginMessage"
        );

    loginButton =
        document.getElementById(
            "loginButton"
        );


    usernameInput =
        document.getElementById(
            "username"
        );

    passwordInput =
        document.getElementById(
            "password"
        );


    welcomeUsername =
        document.getElementById(
            "welcomeUsername"
        );

    studentClassBadge =
        document.getElementById(
            "studentClassBadge"
        );

    chapterGrid =
        document.getElementById(
            "chapterGrid"
        );

    logoutButton =
        document.getElementById(
            "logoutButton"
        );


    backToChapters =
        document.getElementById(
            "backToChapters"
        );


    testChapter =
        document.getElementById(
            "testChapter"
        );

    partTitle =
        document.getElementById(
            "partTitle"
        );

    questionCounter =
        document.getElementById(
            "questionCounter"
        );

    progressBar =
        document.getElementById(
            "progressBar"
        );

    questionType =
        document.getElementById(
            "questionType"
        );

    questionText =
        document.getElementById(
            "questionText"
        );


    selectedWords =
        document.getElementById(
            "selectedWords"
        );

    wordBank =
        document.getElementById(
            "wordBank"
        );

    clearAnswer =
        document.getElementById(
            "clearAnswer"
        );


    previousButton =
        document.getElementById(
            "previousButton"
        );

    nextButton =
        document.getElementById(
            "nextButton"
        );


    partTabs =
        document.querySelectorAll(
            ".part-tab"
        );


    resultChapter =
        document.getElementById(
            "resultChapter"
        );

    part1Score =
        document.getElementById(
            "part1Score"
        );

    part2Score =
        document.getElementById(
            "part2Score"
        );

    part3Score =
        document.getElementById(
            "part3Score"
        );

    totalScore =
        document.getElementById(
            "totalScore"
        );

    percentageScore =
        document.getElementById(
            "percentageScore"
        );

    saveStatus =
        document.getElementById(
            "saveStatus"
        );

    backToChapterButton =
        document.getElementById(
            "backToChapterButton"
        );


    scoreHistoryButton =
        document.getElementById(
            "scoreHistoryButton"
        );

    chapterHistoryButton =
        document.getElementById(
            "chapterHistoryButton"
        );


    backFromHistory =
        document.getElementById(
            "backFromHistory"
        );

    historyStudent =
        document.getElementById(
            "historyStudent"
        );

    historyLoading =
        document.getElementById(
            "historyLoading"
        );

    historyEmpty =
        document.getElementById(
            "historyEmpty"
        );

    historyList =
        document.getElementById(
            "historyList"
        );

}


/* =========================================================
   EVENT LISTENERS
========================================================= */

function setupEventListeners() {

    if (loginForm) {

        loginForm.addEventListener(
            "submit",
            handleLogin
        );

    }


    if (logoutButton) {

        logoutButton.addEventListener(
            "click",
            handleLogout
        );

    }


    if (backToChapters) {

        backToChapters.addEventListener(
            "click",
            () => {

                showScreen(
                    chapterScreen
                );

            }
        );

    }


    if (backToChapterButton) {

        backToChapterButton.addEventListener(
            "click",
            () => {

                showScreen(
                    chapterScreen
                );

            }
        );

    }


    if (clearAnswer) {

        clearAnswer.addEventListener(
            "click",
            clearCurrentAnswer
        );

    }


    if (previousButton) {

        previousButton.addEventListener(
            "click",
            goToPreviousQuestion
        );

    }


    if (nextButton) {

        nextButton.addEventListener(
            "click",
            goToNextQuestion
        );

    }


    partTabs.forEach(
        tab => {

            tab.addEventListener(
                "click",
                () => {

                    const requestedPart =
                        tab.dataset.part;

                    switchPart(
                        requestedPart
                    );

                }
            );

        }
    );


    if (scoreHistoryButton) {

        scoreHistoryButton.addEventListener(
            "click",
            showScoreHistory
        );

    }


    if (chapterHistoryButton) {

        chapterHistoryButton.addEventListener(
            "click",
            showScoreHistory
        );

    }


    if (backFromHistory) {

        backFromHistory.addEventListener(
            "click",
            () => {

                showScreen(
                    chapterScreen
                );

            }
        );

    }

}


/* =========================================================
   SCREEN MANAGEMENT
========================================================= */

function showScreen(
    screen
) {

    document
        .querySelectorAll(
            ".screen"
        )
        .forEach(
            currentScreen => {

                currentScreen.classList.remove(
                    "active"
                );

            }
        );


    if (screen) {

        screen.classList.add(
            "active"
        );

    }


    window.scrollTo(
        0,
        0
    );

}


/* =========================================================
   CLASS HELPERS
========================================================= */

function normalizeStudentClass(
    value
) {

    if (
        value === null ||
        value === undefined
    ) {

        return "";

    }


    const raw =
        String(
            value
        ).trim();


    if (!raw) {

        return "";

    }


    const matchingClass =
        Object.keys(
            CONFIG.CLASS_CONFIG
        ).find(
            className =>
                className.toLowerCase() ===
                raw.toLowerCase()
        );


    return (
        matchingClass ||
        raw
    );

}


function getClassConfig() {

    if (
        !state.studentClass
    ) {

        return null;

    }


    return (
        CONFIG.CLASS_CONFIG[
            state.studentClass
        ] ||
        null
    );

}


/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeHTML(
    value
) {

    return String(
        value ?? ""
    )
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


/* =========================================================
   GENERATE CHAPTER BUTTONS
========================================================= */

function generateChapterButtons() {

    if (!chapterGrid) {

        return;

    }


    chapterGrid.innerHTML =
        "";


    const classConfig =
        getClassConfig();


    if (!classConfig) {

        chapterGrid.innerHTML = `
            <div class="history-error">
                No chapter configuration found.
            </div>
        `;

        return;

    }


    for (
        let i = 1;
        i <= classConfig.totalChapters;
        i++
    ) {

        const card =
            document.createElement(
                "button"
            );


        card.type =
            "button";


        card.className =
            "chapter-card";


        card.innerHTML = `
            <div class="chapter-number">
                CHAPTER ${i}
            </div>

            <h3>
                Chapter ${i}
            </h3>

            <p>
                ${escapeHTML(
                    state.studentClass
                )} Chinese Test
            </p>
        `;


        card.addEventListener(
            "click",
            () => {

                loadChapter(
                    i
                );

            }
        );


        chapterGrid.appendChild(
            card
        );

    }

}


/* =========================================================
   LOGIN
========================================================= */

async function handleLogin(
    event
) {

    event.preventDefault();


    const username =
        String(
            usernameInput?.value ||
            ""
        ).trim();


    const password =
        String(
            passwordInput?.value ||
            ""
        );


    clearLoginMessage();


    if (
        !username ||
        !password
    ) {

        showLoginMessage(
            "Please enter username and password."
        );

        return;

    }


    setLoginLoading(
        true
    );


    try {

        const result =
            await callAPI(
                "login",
                {
                    username,
                    password
                }
            );


        console.log(
            "LOGIN RESPONSE:",
            result
        );


        if (
            !result ||
            result.success !== true
        ) {

            showLoginMessage(
                result?.message ||
                "Invalid username or password."
            );

            return;

        }


        const studentClass =
            normalizeStudentClass(
                result.class ??
                result.Class ??
                result.studentClass
            );


        if (!studentClass) {

            showLoginMessage(
                "Your account does not have a class assigned."
            );

            return;

        }


        if (
            !CONFIG.CLASS_CONFIG[
                studentClass
            ]
        ) {

            showLoginMessage(
                `Class "${studentClass}" is not configured.`
            );

            return;

        }


        state.username =
            result.username ||
            username;


        state.studentClass =
            studentClass;


        if (welcomeUsername) {

            welcomeUsername.textContent =
                state.username;

        }


        if (studentClassBadge) {

            studentClassBadge.textContent =
                state.studentClass;

        }


        generateChapterButtons();


        if (passwordInput) {

            passwordInput.value =
                "";

        }


        showScreen(
            chapterScreen
        );


    } catch (error) {

        console.error(
            "LOGIN ERROR:",
            error
        );


        showLoginMessage(
            error.message ||
            "Unable to connect to the server."
        );


    } finally {

        setLoginLoading(
            false
        );

    }

}


/* =========================================================
   LOGIN MESSAGE
========================================================= */

function showLoginMessage(
    message
) {

    if (!loginMessage) {

        return;

    }


    loginMessage.textContent =
        message;


    loginMessage.style.display =
        "block";


    loginMessage.className =
        "message error";

}


function clearLoginMessage() {

    if (!loginMessage) {

        return;

    }


    loginMessage.textContent =
        "";

    loginMessage.style.display =
        "none";

}


function setLoginLoading(
    loading
) {

    if (!loginButton) {

        return;

    }


    loginButton.disabled =
        loading;


    loginButton.textContent =
        loading
            ? "Logging in..."
            : "Login";

}


/* =========================================================
   GOOGLE APPS SCRIPT API
========================================================= */

async function callAPI(
    action,
    data = {}
) {

    if (!CONFIG.API_URL) {

        throw new Error(
            "API URL is not configured."
        );

    }


    const params =
        new URLSearchParams();


    params.set(
        "action",
        action
    );


    Object.keys(
        data
    ).forEach(
        key => {

            let value =
                data[key];


            if (
                value !== null &&
                value !== undefined &&
                typeof value === "object"
            ) {

                value =
                    JSON.stringify(
                        value
                    );

            }


            if (
                value !== null &&
                value !== undefined
            ) {

                params.set(
                    key,
                    String(value)
                );

            }

        }
    );


    console.log(
        "API ACTION:",
        action
    );


    const response =
        await fetch(
            CONFIG.API_URL,
            {

                method:
                    "POST",

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
            `Server returned ${response.status}.`
        );

    }


    const text =
        await response.text();


    console.log(
        "API RAW RESPONSE:",
        text
    );


    let result;


    try {

        result =
            JSON.parse(
                text
            );

    } catch (error) {

        console.error(
            "INVALID API RESPONSE:",
            text
        );


        throw new Error(
            "The server returned an invalid response."
        );

    }


    return result;

}


/* =========================================================
   LOAD CHAPTER
========================================================= */

async function loadChapter(
    chapterNumber
) {

    const classConfig =
        getClassConfig();


    if (!classConfig) {

        alert(
            "Your class has not been configured."
        );

        return;

    }


    const chapter =
        Number(
            chapterNumber
        );


    if (
        !Number.isInteger(
            chapter
        ) ||
        chapter < 1 ||
        chapter >
        classConfig.totalChapters
    ) {

        alert(
            "Invalid chapter."
        );

        return;

    }


    state.currentChapter =
        chapter;

    state.currentPart =
        "part1";

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
        part3: 0,
        total: 0

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


    showScreen(
        testScreen
    );


    showTestLoading();


    const fileName =
        `Chapter${chapter}.json`;


    const chapterPath =
        `./${classConfig.folder}/${fileName}`;


    console.log(
        "LOADING CHAPTER:",
        chapterPath
    );


    try {

        const response =
            await fetch(
                chapterPath,
                {
                    cache:
                        "no-store"
                }
            );


        if (!response.ok) {

            throw new Error(
                `HTTP ${response.status} - ${chapterPath}`
            );

        }


        const data =
            await response.json();


        validateChapterData(
            data
        );


        state.chapterData =
            data.chapter ||
            data;


        if (testChapter) {

            testChapter.textContent =
                `Chapter ${chapter}`;

        }


        renderCurrentQuestion();


    } catch (error) {

        console.error(
            "CHAPTER LOADING ERROR:",
            error
        );


        showTestError(
            `Unable to load Chapter ${chapter}.

Make sure this file exists:

${chapterPath}

Error:
${error.message}`
        );

    }

}


/* =========================================================
   VALIDATE CHAPTER DATA
========================================================= */

function validateChapterData(
    data
) {

    const chapter =
        data?.chapter ||
        data;


    if (
        !chapter ||
        typeof chapter !==
        "object"
    ) {

        throw new Error(
            "Chapter JSON is empty or invalid."
        );

    }


    const requiredParts = [

        "part1",
        "part2",
        "part3"

    ];


    requiredParts.forEach(
        part => {

            if (
                !chapter[part]
            ) {

                throw new Error(
                    `Chapter is missing ${part}.`
                );

            }


            if (
                !Array.isArray(
                    chapter[
                        part
                    ].questions
                )
            ) {

                throw new Error(
                    `${part}.questions must be an array.`
                );

            }

        }
    );

}


/* =========================================================
   TEST LOADING
========================================================= */

function showTestLoading() {

    if (partTitle) {

        partTitle.textContent =
            "Loading...";

    }


    if (questionCounter) {

        questionCounter.textContent =
            "Please wait";

    }


    if (questionType) {

        questionType.textContent =
            "";

    }


    if (questionText) {

        questionText.textContent =
            "Loading chapter...";

    }


    if (selectedWords) {

        selectedWords.innerHTML =
            "";

    }


    if (wordBank) {

        wordBank.innerHTML =
            "";

    }


    if (progressBar) {

        progressBar.style.width =
            "0%";

    }

}


/* =========================================================
   TEST ERROR
========================================================= */

function showTestError(
    message
) {

    if (partTitle) {

        partTitle.textContent =
            "Error";

    }


    if (questionCounter) {

        questionCounter.textContent =
            "";

    }


    if (questionText) {

        questionText.textContent =
            message;

    }


    if (selectedWords) {

        selectedWords.innerHTML =
            "";

    }


    if (wordBank) {

        wordBank.innerHTML =
            "";

    }


    if (progressBar) {

        progressBar.style.width =
            "0%";

    }

}


/* =========================================================
   GET CURRENT PART
========================================================= */

function getCurrentPartData() {

    if (
        !state.chapterData
    ) {

        return null;

    }


    return (
        state.chapterData[
            state.currentPart
        ] ||
        null
    );

}


/* =========================================================
   GET CURRENT QUESTIONS
========================================================= */

function getCurrentQuestions() {

    const part =
        getCurrentPartData();


    if (
        !part ||
        !Array.isArray(
            part.questions
        )
    ) {

        return [];

    }


    return part.questions;

}


/* =========================================================
   GET CURRENT QUESTION
========================================================= */

function getCurrentQuestion() {

    const questions =
        getCurrentQuestions();


    return (
        questions[
            state.currentQuestionIndex
        ] ||
        null
    );

}


/* =========================================================
   RENDER CURRENT QUESTION
========================================================= */

function renderCurrentQuestion() {

    const part =
        getCurrentPartData();


    const question =
        getCurrentQuestion();


    if (
        !part ||
        !question
    ) {

        return;

    }


    const questions =
        part.questions;


    const totalQuestions =
        questions.length;


    const currentNumber =
        state.currentQuestionIndex +
        1;


    if (testChapter) {

        testChapter.textContent =
            `Chapter ${state.currentChapter}`;

    }


    if (partTitle) {

        partTitle.textContent =
            part.title ||
            getPartDisplayName(
                state.currentPart
            );

    }


    if (questionCounter) {

        questionCounter.textContent =
            `Question ${currentNumber} / ${totalQuestions}`;

    }


    if (questionType) {

        questionType.textContent =
            getQuestionTypeLabel(
                state.currentPart
            );

    }


    if (questionText) {

        questionText.textContent =
            question.question ||
            "";

    }


    const progress =
        totalQuestions > 0
            ? (
                currentNumber /
                totalQuestions
            ) * 100
            : 0;


    if (progressBar) {

        progressBar.style.width =
            `${progress}%`;

    }


    partTabs.forEach(
        tab => {

            tab.classList.toggle(
                "active",
                tab.dataset.part ===
                state.currentPart
            );

        }
    );


    renderSelectedWords();


    renderWordBank(
        question
    );


    updateNavigationButtons();

}


/* =========================================================
   PART DISPLAY NAME
========================================================= */

function getPartDisplayName(
    part
) {

    const names = {

        part1:
            "Translation",

        part2:
            "Answer the Question",

        part3:
            "Scramble"

    };


    return (
        names[part] ||
        part
    );

}


/* =========================================================
   QUESTION TYPE
========================================================= */

function getQuestionTypeLabel(
    part
) {

    const labels = {

        part1:
            "TRANSLATION",

        part2:
            "QUESTION",

        part3:
            "SCRAMBLE"

    };


    return (
        labels[part] ||
        "QUESTION"
    );

}


/* =========================================================
   SWITCH PART
========================================================= */

function switchPart(
    part,
    goToLastQuestion = false
) {

    if (
        !state.chapterData
    ) {

        return;

    }


    if (
        ![
            "part1",
            "part2",
            "part3"
        ].includes(
            part
        )
    ) {

        return;

    }


    const partData =
        state.chapterData[
            part
        ];


    if (
        !partData ||
        !Array.isArray(
            partData.questions
        )
    ) {

        return;

    }


    state.currentPart =
        part;


    if (
        goToLastQuestion
    ) {

        state.currentQuestionIndex =
            Math.max(
                partData.questions.length -
                1,
                0
            );

    } else {

        state.currentQuestionIndex =
            0;

    }


    renderCurrentQuestion();


    window.scrollTo(
        0,
        0
    );

}


/* =========================================================
   SHUFFLE WORDS
========================================================= */

function shuffleWords(
    words
) {

    const items =
        (
            Array.isArray(
                words
            )
                ? words
                : []
        )
        .map(
            (
                word,
                originalIndex
            ) => ({

                word:
                    String(
                        word
                    ),

                originalIndex

            })
        );


    for (
        let i =
            items.length - 1;

        i > 0;

        i--
    ) {

        const j =
            Math.floor(
                Math.random() *
                (i + 1)
            );


        [
            items[i],
            items[j]
        ] = [
            items[j],
            items[i]
        ];

    }


    return items;

}


/* =========================================================
   GET RANDOM ORDER
========================================================= */

function getRandomOrder(
    question
) {

    const part =
        state.currentPart;


    const index =
        state.currentQuestionIndex;


    if (
        !state.randomOrders[
            part
        ]
    ) {

        state.randomOrders[
            part
        ] = {};

    }


    if (
        !state.randomOrders[
            part
        ][index]
    ) {

        state.randomOrders[
            part
        ][index] =
            shuffleWords(
                question?.words ||
                []
            );

    }


    return state.randomOrders[
        part
    ][index];

}


/* =========================================================
   RENDER WORD BANK
========================================================= */

function renderWordBank(
    question
) {

    if (!wordBank) {

        return;

    }


    wordBank.innerHTML =
        "";


    const order =
        getRandomOrder(
            question
        );


    const currentAnswer =
        state.answers[
            state.currentPart
        ][
            state.currentQuestionIndex
        ] ||
        [];


    order.forEach(
        item => {

            const button =
                document.createElement(
                    "button"
                );


            button.type =
                "button";


            button.className =
                "word-button";


            button.textContent =
                item.word;


            const selected =
                currentAnswer.some(
                    answerItem =>
                        answerItem.originalIndex ===
                        item.originalIndex
                );


            if (selected) {

                button.classList.add(
                    "selected"
                );

            }


            button.addEventListener(
                "click",
                () => {

                    addWordToAnswer(
                        item
                    );

                }
            );


            wordBank.appendChild(
                button
            );

        }
    );

}


/* =========================================================
   ADD WORD TO ANSWER
========================================================= */

function addWordToAnswer(
    wordItem
) {

    const part =
        state.currentPart;


    const questionIndex =
        state.currentQuestionIndex;


    if (
        !Array.isArray(
            state.answers[
                part
            ][
                questionIndex
            ]
        )
    ) {

        state.answers[
            part
        ][
            questionIndex
        ] = [];

    }


    const answer =
        state.answers[
            part
        ][
            questionIndex
        ];


    const alreadySelected =
        answer.some(
            item =>
                item.originalIndex ===
                wordItem.originalIndex
        );


    if (
        alreadySelected
    ) {

        return;

    }


    answer.push({

        word:
            wordItem.word,

        originalIndex:
            wordItem.originalIndex

    });


    renderSelectedWords();


    renderWordBank(
        getCurrentQuestion()
    );

}


/* =========================================================
   RENDER SELECTED WORDS
========================================================= */

function renderSelectedWords() {

    if (!selectedWords) {

        return;

    }


    selectedWords.innerHTML =
        "";


    const answer =
        state.answers[
            state.currentPart
        ][
            state.currentQuestionIndex
        ] ||
        [];


    if (
        answer.length === 0
    ) {

        const placeholder =
            document.createElement(
                "span"
            );


        placeholder.textContent =
            "Select words below to build your answer";


        placeholder.style.color =
            "#a0a7af";


        placeholder.style.fontSize =
            "13px";


        placeholder.style.fontWeight =
            "600";


        selectedWords.appendChild(
            placeholder
        );


        return;

    }


    answer.forEach(
        (
            item,
            index
        ) => {

            const button =
                document.createElement(
                    "button"
                );


            button.type =
                "button";


            /*
             * Same design as the word bank.
             */

            button.className =
                "word-button selected-word";


            button.textContent =
                item.word;


            button.title =
                "Remove this word";


            button.addEventListener(
                "click",
                () => {

                    removeWordFromAnswer(
                        index
                    );

                }
            );


            selectedWords.appendChild(
                button
            );

        }
    );

}


/* =========================================================
   REMOVE WORD
========================================================= */

function removeWordFromAnswer(
    answerIndex
) {

    const answer =
        state.answers[
            state.currentPart
        ][
            state.currentQuestionIndex
        ];


    if (
        !Array.isArray(
            answer
        )
    ) {

        return;

    }


    if (
        answerIndex < 0 ||
        answerIndex >=
        answer.length
    ) {

        return;

    }


    answer.splice(
        answerIndex,
        1
    );


    renderSelectedWords();


    renderWordBank(
        getCurrentQuestion()
    );

}


/* =========================================================
   CLEAR ANSWER
========================================================= */

function clearCurrentAnswer() {

    state.answers[
        state.currentPart
    ][
        state.currentQuestionIndex
    ] = [];


    renderSelectedWords();


    renderWordBank(
        getCurrentQuestion()
    );

}


/* =========================================================
   NAVIGATION BUTTONS
========================================================= */

function updateNavigationButtons() {

    const questions =
        getCurrentQuestions();


    if (
        questions.length === 0
    ) {

        return;

    }


    const firstQuestion =
        state.currentQuestionIndex === 0;


    const lastQuestion =
        state.currentQuestionIndex ===
        questions.length - 1;


    if (previousButton) {

        previousButton.disabled =
            firstQuestion &&
            state.currentPart ===
            "part1";

    }


    if (nextButton) {

        if (
            lastQuestion
        ) {

            if (
                state.currentPart ===
                "part3"
            ) {

                nextButton.textContent =
                    "Finish Test →";

            } else {

                nextButton.textContent =
                    "Next Part →";

            }

        } else {

            nextButton.textContent =
                "Next →";

        }

    }

}


/* =========================================================
   PREVIOUS QUESTION
========================================================= */

function goToPreviousQuestion() {

    if (
        state.currentQuestionIndex >
        0
    ) {

        state.currentQuestionIndex--;

        renderCurrentQuestion();

        return;

    }


    if (
        state.currentPart ===
        "part2"
    ) {

        switchPart(
            "part1",
            true
        );

        return;

    }


    if (
        state.currentPart ===
        "part3"
    ) {

        switchPart(
            "part2",
            true
        );

    }

}


/* =========================================================
   NEXT QUESTION
========================================================= */

function goToNextQuestion() {

    const questions =
        getCurrentQuestions();


    if (
        questions.length === 0
    ) {

        return;

    }


    const lastQuestion =
        state.currentQuestionIndex >=
        questions.length - 1;


    if (!lastQuestion) {

        state.currentQuestionIndex++;

        renderCurrentQuestion();

        return;

    }


    if (
        state.currentPart ===
        "part1"
    ) {

        switchPart(
            "part2"
        );

        return;

    }


    if (
        state.currentPart ===
        "part2"
    ) {

        switchPart(
            "part3"
        );

        return;

    }


    finishTest();

}


/* =========================================================
   NORMALIZE ANSWER WORDS
========================================================= */

function normalizeAnswerWords(
    answer
) {

    if (
        typeof answer ===
        "string"
    ) {

        return answer
            .trim()
            .split(
                /\s+/
            )
            .filter(
                word =>
                    word.length > 0
            )
            .map(
                word =>
                    word
                        .trim()
                        .toLowerCase()
            );

    }


    if (
        Array.isArray(
            answer
        )
    ) {

        return answer
            .map(
                item => {

                    if (
                        item &&
                        typeof item ===
                        "object" &&
                        "word" in item
                    ) {

                        return String(
                            item.word
                        )
                            .trim()
                            .toLowerCase();

                    }


                    return String(
                        item
                    )
                        .trim()
                        .toLowerCase();

                }
            )
            .filter(
                word =>
                    word.length > 0
            );

    }


    return [];

}


/* =========================================================
   CHECK ANSWER
========================================================= */

function isAnswerCorrect(
    studentAnswer,
    question
) {

    const studentWords =
        normalizeAnswerWords(
            studentAnswer
        );


    const acceptedAnswers =
        Array.isArray(
            question?.answers
        )
            ? question.answers
            : [];


    if (
        acceptedAnswers.length === 0
    ) {

        return false;

    }


    return acceptedAnswers.some(
        acceptedAnswer => {

            const acceptedWords =
                normalizeAnswerWords(
                    acceptedAnswer
                );


            if (
                acceptedWords.length !==
                studentWords.length
            ) {

                return false;

            }


            return acceptedWords.every(
                (
                    word,
                    index
                ) =>
                    word ===
                    studentWords[
                        index
                    ]
            );

        }
    );

}


/* =========================================================
   CALCULATE PART SCORE
========================================================= */

function calculatePartScore(
    partName
) {

    const questions =
        state.chapterData?.[
            partName
        ]?.questions ||
        [];


    let score =
        0;


    questions.forEach(
        (
            question,
            index
        ) => {

            const studentAnswer =
                state.answers[
                    partName
                ][index] ||
                [];


            if (
                isAnswerCorrect(
                    studentAnswer,
                    question
                )
            ) {

                score++;

            }

        }
    );


    return score;

}


/* =========================================================
   CALCULATE ALL SCORES
========================================================= */

function calculateAllScores() {

    state.scores.part1 =
        calculatePartScore(
            "part1"
        );


    state.scores.part2 =
        calculatePartScore(
            "part2"
        );


    state.scores.part3 =
        calculatePartScore(
            "part3"
        );


    state.scores.total =
        state.scores.part1 +
        state.scores.part2 +
        state.scores.part3;

}


/* =========================================================
   GET MAXIMUM SCORE
========================================================= */

function getMaximumScore() {

    if (
        !state.chapterData
    ) {

        return 0;

    }


    let maximum =
        0;


    [
        "part1",
        "part2",
        "part3"
    ].forEach(
        partName => {

            const questions =
                state.chapterData?.[
                    partName
                ]?.questions;


            if (
                Array.isArray(
                    questions
                )
            ) {

                maximum +=
                    questions.length;

            }

        }
    );


    return maximum;

}


/* =========================================================
   FINISH TEST
========================================================= */

async function finishTest() {

    console.log(
        "================================="
    );

    console.log(
        "FINISHING TEST"
    );

    console.log(
        "================================="
    );


    calculateAllScores();


    renderResults();


    showScreen(
        resultScreen
    );


    /*
     * Save score.
     */

    await saveScore();


    /*
     * Save all student answers.
     */

    await saveAnswerRecords();

}


/* =========================================================
   RENDER RESULTS
========================================================= */

function renderResults() {

    const maximum =
        getMaximumScore();


    const total =
        state.scores.total;


    const percentage =
        maximum > 0
            ? Math.round(
                (
                    total /
                    maximum
                ) * 100
            )
            : 0;


    if (resultChapter) {

        resultChapter.textContent =
            `Chapter ${state.currentChapter}`;

    }


    if (part1Score) {

        part1Score.textContent =
            state.scores.part1;

    }


    if (part2Score) {

        part2Score.textContent =
            state.scores.part2;

    }


    if (part3Score) {

        part3Score.textContent =
            state.scores.part3;

    }


    if (totalScore) {

        totalScore.textContent =
            total;

    }


    if (percentageScore) {

        percentageScore.textContent =
            `${percentage}%`;

    }


    if (saveStatus) {

        saveStatus.textContent =
            "Saving your score...";

        saveStatus.style.color =
            "#6e767f";

    }

}


/* =========================================================
   SAVE SCORE
========================================================= */

async function saveScore() {

    if (
        state.testSaved
    ) {

        console.log(
            "Score already saved."
        );

        return;

    }


    if (
        !state.username ||
        !state.studentClass ||
        !state.currentChapter
    ) {

        console.error(
            "Cannot save score: missing student information."
        );

        if (saveStatus) {

            saveStatus.textContent =
                "Unable to save score.";

            saveStatus.style.color =
                "#d93636";

        }

        return;

    }


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
                        `Chapter ${state.currentChapter}`,

                    part1:
                        state.scores.part1,

                    part2:
                        state.scores.part2,

                    part3:
                        state.scores.part3,

                    total:
                        state.scores.total,

                    maximum:
                        getMaximumScore()

                }
            );


        console.log(
            "SAVE SCORE RESPONSE:",
            result
        );


        if (
            result?.success === true
        ) {

            state.testSaved =
                true;


            if (saveStatus) {

                saveStatus.textContent =
                    "✓ Score saved successfully.";

                saveStatus.style.color =
                    "#238636";

            }

        } else {

            if (saveStatus) {

                saveStatus.textContent =
                    result?.message ||
                    "Unable to save score.";

                saveStatus.style.color =
                    "#d93636";

            }

        }

    } catch (error) {

        console.error(
            "SAVE SCORE ERROR:",
            error
        );


        if (saveStatus) {

            saveStatus.textContent =
                "Unable to save score. Please try again.";

            saveStatus.style.color =
                "#d93636";

        }

    }

}


/* =========================================================
   SAVE ANSWER RECORDS
========================================================= */

async function saveAnswerRecords() {

    console.log(
        "================================="
    );

    console.log(
        "START SAVING ANSWER RECORDS"
    );

    console.log(
        "================================="
    );


    if (
        state.answerRecordsSaved
    ) {

        console.log(
            "Answer records already saved."
        );

        return;

    }


    if (
        !state.username ||
        !state.studentClass ||
        !state.chapterData
    ) {

        console.error(
            "Missing information:",
            {

                username:
                    state.username,

                class:
                    state.studentClass,

                chapterData:
                    !!state.chapterData

            }
        );

        return;

    }


    try {

        const records = [];


        /*
         * ================================================
         * PART 1
         * ================================================
         */

        const part1Questions =
            state.chapterData?.part1?.questions ||
            [];


        part1Questions.forEach(
            (
                question,
                index
            ) => {

                const studentAnswer =
                    state.answers.part1[index] ||
                    [];


                const answerText =
                    studentAnswer
                        .map(
                            item => {

                                if (
                                    item &&
                                    typeof item ===
                                    "object" &&
                                    item.word !==
                                    undefined
                                ) {

                                    return String(
                                        item.word
                                    );

                                }


                                return String(
                                    item
                                );

                            }
                        )
                        .join(" ");


                records.push({

                    question:
                        String(
                            question?.question ||
                            ""
                        ).trim(),

                    answer:
                        answerText.trim()

                });

            }
        );


        /*
         * ================================================
         * PART 2
         * ================================================
         */

        const part2Questions =
            state.chapterData?.part2?.questions ||
            [];


        part2Questions.forEach(
            (
                question,
                index
            ) => {

                const studentAnswer =
                    state.answers.part2[index] ||
                    [];


                const answerText =
                    studentAnswer
                        .map(
                            item => {

                                if (
                                    item &&
                                    typeof item ===
                                    "object" &&
                                    item.word !==
                                    undefined
                                ) {

                                    return String(
                                        item.word
                                    );

                                }


                                return String(
                                    item
                                );

                            }
                        )
                        .join(" ");


                records.push({

                    question:
                        String(
                            question?.question ||
                            ""
                        ).trim(),

                    answer:
                        answerText.trim()

                });

            }
        );


        /*
         * ================================================
         * PART 3
         * ================================================
         */

        const part3Questions =
            state.chapterData?.part3?.questions ||
            [];


        part3Questions.forEach(
            (
                question,
                index
            ) => {

                const studentAnswer =
                    state.answers.part3[index] ||
                    [];


                const answerText =
                    studentAnswer
                        .map(
                            item => {

                                if (
                                    item &&
                                    typeof item ===
                                    "object" &&
                                    item.word !==
                                    undefined
                                ) {

                                    return String(
                                        item.word
                                    );

                                }


                                return String(
                                    item
                                );

                            }
                        )
                        .join(" ");


                records.push({

                    question:
                        String(
                            question?.question ||
                            ""
                        ).trim(),

                    answer:
                        answerText.trim()

                });

            }
        );


        /*
         * ================================================
         * CHECK RECORDS BEFORE SENDING
         * ================================================
         */

        console.log(
            "Username:",
            state.username
        );


        console.log(
            "Class:",
            state.studentClass
        );


        console.log(
            "Number of records:",
            records.length
        );


        console.log(
            "Records:",
            records
        );


        /*
         * ================================================
         * SEND TO GOOGLE APPS SCRIPT
         * ================================================
         */

        const result =
            await callAPI(
                "saveAnswerRecords",
                {

                    username:
                        state.username,

                    class:
                        state.studentClass,

                    records:
                        JSON.stringify(
                            records
                        )

                }
            );


        /*
         * ================================================
         * SHOW SERVER RESPONSE
         * ================================================
         */

        console.log(
            "GOOGLE APPS SCRIPT RESPONSE:",
            result
        );


        if (
            result &&
            result.success === true
        ) {

            state.answerRecordsSaved =
                true;


            console.log(
                "================================="
            );

            console.log(
                "ANSWER RECORDS SAVED SUCCESSFULLY"
            );

            console.log(
                "Saved:",
                result.saved
            );

            console.log(
                "================================="
            );

        } else {

            console.error(
                "================================="
            );

            console.error(
                "ANSWER RECORDS FAILED"
            );

            console.error(
                result?.message ||
                "Unknown error"
            );

            console.error(
                "================================="
            );

        }

    } catch (error) {

        console.error(
            "================================="
        );

        console.error(
            "SAVE ANSWER RECORDS ERROR"
        );

        console.error(
            error
        );

        console.error(
            "================================="
        );

    }

}


/* =========================================================
   GET SCORE HISTORY
========================================================= */

async function getScoreHistory() {

    if (
        !state.username ||
        !state.studentClass
    ) {

        return {

            success:
                false,

            message:
                "Student information is missing."

        };

    }


    return await callAPI(
        "getScoreHistory",
        {

            username:
                state.username,

            class:
                state.studentClass

        }
    );

}


/* =========================================================
   SHOW SCORE HISTORY
========================================================= */

async function showScoreHistory() {

    if (
        !state.username ||
        !state.studentClass
    ) {

        return;

    }


    showScreen(
        historyScreen
    );


    if (historyLoading) {

        historyLoading.style.display =
            "block";

    }


    if (historyEmpty) {

        historyEmpty.style.display =
            "none";

    }


    if (historyList) {

        historyList.innerHTML =
            "";

    }


    if (historyStudent) {

        historyStudent.textContent =
            `${state.username} • ${state.studentClass}`;

    }


    try {

        const result =
            await getScoreHistory();


        console.log(
            "SCORE HISTORY RESPONSE:",
            result
        );


        if (historyLoading) {

            historyLoading.style.display =
                "none";

        }


        if (
            !result ||
            result.success !== true
        ) {

            if (historyList) {

                historyList.innerHTML = `
                    <div class="history-error">
                        ${escapeHTML(
                            result?.message ||
                            "Unable to load score history."
                        )}
                    </div>
                `;

            }

            return;

        }


        const records =
            Array.isArray(
                result.records
            )
                ? result.records
                : (
                    Array.isArray(
                        result.history
                    )
                        ? result.history
                        : []
                );


        if (
            records.length === 0
        ) {

            if (historyEmpty) {

                historyEmpty.style.display =
                    "block";

            }

            return;

        }


        const normalizedRecords =
            records.map(
                normalizeHistoryRecord
            );


        renderScoreHistory(
            normalizedRecords
        );


    } catch (error) {

        console.error(
            "SCORE HISTORY ERROR:",
            error
        );


        if (historyLoading) {

            historyLoading.style.display =
                "none";

        }


        if (historyList) {

            historyList.innerHTML = `
                <div class="history-error">
                    Unable to load score history.
                    <br><br>
                    ${escapeHTML(
                        error.message ||
                        ""
                    )}
                </div>
            `;

        }

    }

}


/* =========================================================
   NORMALIZE HISTORY RECORD
========================================================= */

function normalizeHistoryRecord(
    record
) {

    record =
        record ||
        {};


    return {

        chapter:
            record.chapter ??
            record.Chapter ??
            "Chapter",


        part1:
            Number(
                record.part1 ??
                record["Part 1 Score"] ??
                0
            ) ||
            0,


        part2:
            Number(
                record.part2 ??
                record["Part 2 Score"] ??
                0
            ) ||
            0,


        part3:
            Number(
                record.part3 ??
                record["Part 3 Score"] ??
                0
            ) ||
            0,


        total:
            Number(
                record.total ??
                record.Total ??
                0
            ) ||
            0,


        maximum:
            Number(
                record.maximum ??
                record.Maximum ??
                0
            ) ||
            0,


        percentage:
            record.percentage ??
            record.Percentage ??
            "",


        date:
            record.date ??
            record.Date ??
            ""

    };

}


/* =========================================================
   RENDER SCORE HISTORY
========================================================= */

function renderScoreHistory(
    records
) {

    if (!historyList) {

        return;

    }


    historyList.innerHTML =
        "";


    records.forEach(
        (
            item,
            index
        ) => {

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "history-card";


            card.style.background =
                "#ffffff";

            card.style.borderRadius =
                "18px";

            card.style.padding =
                "18px";

            card.style.marginBottom =
                "16px";

            card.style.border =
                "1px solid #e7e7e7";

            card.style.boxShadow =
                "0 5px 18px rgba(0,0,0,.07)";

            card.style.boxSizing =
                "border-box";

            card.style.width =
                "100%";


            const percentage =
                getHistoryPercentage(
                    item
                );


            card.innerHTML = `

                <div
                    style="
                        display:flex;
                        justify-content:space-between;
                        align-items:center;
                        gap:12px;
                        margin-bottom:16px;
                    "
                >

                    <div
                        style="
                            min-width:0;
                            flex:1;
                        "
                    >

                        <div
                            style="
                                font-size:11px;
                                font-weight:700;
                                letter-spacing:1px;
                                color:#8a8f98;
                                margin-bottom:5px;
                            "
                        >
                            TEST ${records.length - index}
                        </div>


                        <div
                            style="
                                font-size:18px;
                                font-weight:800;
                                line-height:1.3;
                                color:#222222;
                                word-break:break-word;
                                overflow-wrap:anywhere;
                            "
                        >
                            ${escapeHTML(
                                item.chapter
                            )}
                        </div>

                    </div>


                    <div
                        style="
                            flex-shrink:0;
                            width:54px;
                            height:54px;
                            border-radius:14px;
                            background:#383838;
                            color:#ffffff;
                            display:flex;
                            align-items:center;
                            justify-content:center;
                            font-size:18px;
                            font-weight:800;
                        "
                    >
                        ${item.total}
                    </div>

                </div>


                <div
                    style="
                        display:grid;
                        grid-template-columns:
                            repeat(3,minmax(0,1fr));
                        gap:8px;
                        width:100%;
                    "
                >

                    ${createHistoryPart(
                        "Part 1",
                        item.part1
                    )}

                    ${createHistoryPart(
                        "Part 2",
                        item.part2
                    )}

                    ${createHistoryPart(
                        "Part 3",
                        item.part3
                    )}

                </div>


                <div
                    style="
                        display:flex;
                        justify-content:space-between;
                        align-items:center;
                        gap:10px;
                        margin-top:15px;
                        padding-top:13px;
                        border-top:1px solid #eeeeee;
                    "
                >

                    <span
                        style="
                            font-size:12px;
                            color:#8a8f98;
                            word-break:break-word;
                        "
                    >
                        ${escapeHTML(
                            formatHistoryDate(
                                item.date
                            )
                        )}
                    </span>


                    <strong
                        style="
                            font-size:15px;
                            color:#383838;
                            flex-shrink:0;
                        "
                    >
                        ${percentage}%
                    </strong>

                </div>

            `;


            historyList.appendChild(
                card
            );

        }
    );

}


/* =========================================================
   HISTORY PART CARD
========================================================= */

function createHistoryPart(
    label,
    score
) {

    return `

        <div
            style="
                background:#f6f6f6;
                border-radius:12px;
                padding:11px 8px;
                text-align:center;
                min-width:0;
                box-sizing:border-box;
            "
        >

            <span
                style="
                    display:block;
                    font-size:11px;
                    color:#777777;
                    margin-bottom:4px;
                "
            >
                ${label}
            </span>


            <strong
                style="
                    display:block;
                    font-size:16px;
                    color:#222222;
                "
            >
                ${score}
            </strong>

        </div>

    `;

}


/* =========================================================
   HISTORY PERCENTAGE
========================================================= */

function getHistoryPercentage(
    item
) {

    const total =
        Number(
            item.total
        ) ||
        0;


    const maximum =
        Number(
            item.maximum
        ) ||
        0;


    if (
        maximum > 0
    ) {

        return Math.round(
            (
                total /
                maximum
            ) *
            100
        );

    }


    if (
        item.percentage !== "" &&
        item.percentage !== null &&
        item.percentage !== undefined
    ) {

        const percentage =
            Number(
                item.percentage
            );


        if (
            !Number.isNaN(
                percentage
            )
        ) {

            return Math.round(
                percentage
            );

        }

    }


    const chapterNumber =
        extractChapterNumber(
            item.chapter
        );


    if (
        chapterNumber &&
        state.currentChapter ===
        chapterNumber &&
        state.chapterData
    ) {

        const knownMaximum =
            getMaximumScore();


        if (
            knownMaximum > 0
        ) {

            return Math.round(
                (
                    total /
                    knownMaximum
                ) *
                100
            );

        }

    }


    return 0;

}


/* =========================================================
   FORMAT HISTORY DATE
========================================================= */

function formatHistoryDate(
    date
) {

    if (!date) {

        return "";

    }


    const parsed =
        new Date(
            date
        );


    if (
        Number.isNaN(
            parsed.getTime()
        )
    ) {

        return String(
            date
        );

    }


    return parsed.toLocaleDateString(
        undefined,
        {

            year:
                "numeric",

            month:
                "short",

            day:
                "numeric"

        }
    );

}


/* =========================================================
   EXTRACT CHAPTER NUMBER
========================================================= */

function extractChapterNumber(
    value
) {

    const match =
        String(
            value ?? ""
        ).match(
            /(\d+)/
        );


    return match
        ? Number(
            match[1]
        )
        : 0;

}


/* =========================================================
   LOGOUT
========================================================= */

function handleLogout() {

    const confirmed =
        window.confirm(
            "Are you sure you want to logout?"
        );


    if (!confirmed) {

        return;

    }


    state.username =
        null;


    state.studentClass =
        null;


    state.currentChapter =
        null;


    state.chapterData =
        null;


    state.currentPart =
        "part1";


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
        part3: 0,
        total: 0

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


    if (welcomeUsername) {

        welcomeUsername.textContent =
            "Student";

    }


    if (studentClassBadge) {

        studentClassBadge.textContent =
            "";

    }


    if (chapterGrid) {

        chapterGrid.innerHTML =
            "";

    }


    clearLoginMessage();


    showScreen(
        loginScreen
    );

}


/* =========================================================
   END OF APP.JS
========================================================= */
