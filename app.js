/* =========================================================
   CHINESE DAILY TEST - app.js
   ========================================================= */

const CONFIG = {
    API_URL: "https://script.google.com/macros/s/AKfycbwS3UyHA-h6D9nsJ7fO1cm7zPFna8DyGJnKuwdwQPw39WSVSFKaYlVh-qt05qK7S6Bl/exec",

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

    testSaved: false

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

                    const part =
                        tab.dataset.part;

                    if (
                        [
                            "part1",
                            "part2",
                            "part3"
                        ].includes(part)
                    ) {

                        switchPart(
                            part
                        );

                    }

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
        .querySelectorAll(".screen")
        .forEach(
            item => {

                item.classList.remove(
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

    const raw =
        String(
            value ?? ""
        ).trim();


    if (!raw) {

        return "";

    }


    return (
        Object.keys(
            CONFIG.CLASS_CONFIG
        ).find(
            className =>
                className.toLowerCase() ===
                raw.toLowerCase()
        ) ||
        raw
    );

}


function getClassConfig() {

    const studentClass =
        normalizeStudentClass(
            state.studentClass
        );


    return (
        CONFIG.CLASS_CONFIG[
            studentClass
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
                No chapter configuration found for your class.
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
                Daily Chinese Test
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
            "Login API Response:",
            result
        );


        if (
            !result ||
            !result.success
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
                `Class "${studentClass}" is not configured yet.`
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
            "Login error:",
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
   IMPORTANT: POST, NOT GET
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
                value !== undefined &&
                value !== null &&
                typeof value === "object"
            ) {

                value =
                    JSON.stringify(
                        value
                    );

            }


            if (
                value !== undefined &&
                value !== null
            ) {

                params.set(
                    key,
                    String(value)
                );

            }

        }
    );


    console.log(
        "API Request:",
        action,
        data
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
            `Server returned ${response.status}.`
        );

    }


    const text =
        await response.text();


    let result;


    try {

        result =
            JSON.parse(
                text
            );

    } catch (error) {

        console.error(
            "Invalid API response:",
            text
        );


        throw new Error(
            "The server returned an invalid response."
        );

    }


    console.log(
        "API Response:",
        result
    );


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


    showScreen(
        testScreen
    );


    showTestLoading();


    const chapterPath =
        `./${classConfig.folder}/Chapter${chapter}.json`;


    try {

        console.log(
            "Loading chapter:",
            chapterPath
        );


        const response =
            await fetch(
                chapterPath,
                {
                    cache: "no-store"
                }
            );


        if (!response.ok) {

            throw new Error(
                `Could not load ${chapterPath} (${response.status}).`
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
            "Chapter loading error:",
            error
        );


        showTestError(
            `Unable to load Chapter ${chapter}.\n\n` +
            `Expected file: ${chapterPath}\n\n` +
            `${error.message || "Unknown error."}`
        );

    }

}


/* =========================================================
   VALIDATE CHAPTER
========================================================= */

function validateChapterData(
    data
) {

    const chapter =
        data?.chapter ||
        data;


    if (
        !chapter ||
        typeof chapter !== "object"
    ) {

        throw new Error(
            "Chapter data is empty."
        );

    }


    [
        "part1",
        "part2",
        "part3"
    ].forEach(
        part => {

            if (!chapter[part]) {

                throw new Error(
                    `Chapter is missing ${part}.`
                );

            }


            if (
                !Array.isArray(
                    chapter[part].questions
                )
            ) {

                throw new Error(
                    `${part} does not contain a questions array.`
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
            "";

    }


    if (questionText) {

        questionText.textContent =
            "";

    }


    if (wordBank) {

        wordBank.innerHTML =
            "";

    }


    if (selectedWords) {

        selectedWords.innerHTML =
            "";

    }

}


function showTestError(
    message
) {

    if (partTitle) {

        partTitle.textContent =
            "Unable to load test";

    }


    if (questionText) {

        questionText.textContent =
            message;

    }


    if (wordBank) {

        wordBank.innerHTML =
            "";

    }


    if (selectedWords) {

        selectedWords.innerHTML =
            "";

    }

}


/* =========================================================
   QUESTION HELPERS
========================================================= */

function getCurrentPartData() {

    return (
        state.chapterData?.[
            state.currentPart
        ] ||
        null
    );

}


function getCurrentQuestions() {

    return (
        getCurrentPartData()
            ?.questions ||
        []
    );

}


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
   RENDER QUESTION
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


    const currentNumber =
        state.currentQuestionIndex +
        1;


    const totalQuestions =
        questions.length;


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


    if (progressBar) {

        progressBar.style.width =
            `${
                totalQuestions
                    ? (
                        currentNumber /
                        totalQuestions
                    ) * 100
                    : 0
            }%`;

    }


    updatePartTabs();


    renderSelectedWords();


    renderWordBank(
        question
    );


    updateNavigationButtons();

}


/* =========================================================
   PART NAME
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
   UPDATE PART TABS
   THIS WAS MISSING IN YOUR CURRENT FILE
========================================================= */

function updatePartTabs() {

    if (!partTabs) {

        return;

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
        ].includes(part)
    ) {

        return;

    }


    state.currentPart =
        part;


    const questions =
        getCurrentQuestions();


    state.currentQuestionIndex =
        goToLastQuestion
            ? Math.max(
                questions.length - 1,
                0
            )
            : 0;


    updatePartTabs();


    renderCurrentQuestion();

}


/* =========================================================
   WORD RANDOMIZATION
========================================================= */

function shuffleWords(
    words
) {

    const items =
        (
            Array.isArray(words)
                ? words
                : []
        )
        .map(
            (
                word,
                originalIndex
            ) => ({

                word:
                    String(word),

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
        !state.randomOrders[part]
    ) {

        state.randomOrders[part] =
            {};

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


            if (
                currentAnswer.some(
                    answer =>
                        answer.originalIndex ===
                        item.originalIndex
                )
            ) {

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
   ADD WORD
========================================================= */

function addWordToAnswer(
    wordItem
) {

    const part =
        state.currentPart;


    const index =
        state.currentQuestionIndex;


    if (
        !Array.isArray(
            state.answers[
                part
            ][index]
        )
    ) {

        state.answers[
            part
        ][index] =
            [];

    }


    const answer =
        state.answers[
            part
        ][index];


    if (
        answer.some(
            item =>
                item.originalIndex ===
                wordItem.originalIndex
        )
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
   SELECTED ANSWER
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
             * IMPORTANT:
             * Same word-button design as word bank.
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
        !questions.length
    ) {

        return;

    }


    if (previousButton) {

        previousButton.disabled =
            state.currentQuestionIndex ===
            0 &&
            state.currentPart ===
            "part1";

    }


    if (nextButton) {

        const isLast =
            state.currentQuestionIndex >=
            questions.length - 1;


        nextButton.textContent =
            isLast
                ? (
                    state.currentPart ===
                    "part3"
                        ? "Finish Test →"
                        : "Next Part →"
                )
                : "Next →";

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

    } else if (
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
        !questions.length
    ) {

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
   ANSWER NORMALIZATION
========================================================= */

function normalizeWord(
    word
) {

    if (
        word &&
        typeof word ===
        "object" &&
        "word" in word
    ) {

        word =
            word.word;

    }


    return String(
        word ?? ""
    )
        .trim()
        .replace(
            /\s+/g,
            " "
        )
        .toLowerCase();

}


function normalizeAnswerWords(
    answer
) {

    if (
        !Array.isArray(
            answer
        )
    ) {

        return [];

    }


    return answer.map(
        normalizeWord
    );

}


/* =========================================================
   CHECK ANSWER
========================================================= */

function isAnswerCorrect(
    studentAnswer,
    question
) {

    const student =
        normalizeAnswerWords(
            studentAnswer
        );


    const accepted =
        Array.isArray(
            question?.answers
        )
            ? question.answers
            : [];


    return accepted.some(
        correct => {

            const expected =
                normalizeAnswerWords(
                    correct
                );


            if (
                expected.length !==
                student.length
            ) {

                return false;

            }


            return expected.every(
                (
                    word,
                    index
                ) =>
                    word ===
                    student[index]
            );

        }
    );

}


/* =========================================================
   CALCULATE SCORE
========================================================= */

function calculatePartScore(
    part
) {

    const questions =
        state.chapterData?.[
            part
        ]?.questions ||
        [];


    let score =
        0;


    questions.forEach(
        (
            question,
            index
        ) => {

            const answer =
                state.answers[
                    part
                ][index] ||
                [];


            if (
                isAnswerCorrect(
                    answer,
                    question
                )
            ) {

                score++;

            }

        }
    );


    return score;

}


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
   MAXIMUM SCORE
========================================================= */

function getMaximumScore() {

    return [
        "part1",
        "part2",
        "part3"
    ].reduce(
        (
            total,
            part
        ) =>
            total +
            (
                state.chapterData?.[
                    part
                ]?.questions?.length ||
                0
            ),
        0
    );

}


/* =========================================================
   FINISH TEST
========================================================= */

async function finishTest() {

    calculateAllScores();

    renderResults();

    showScreen(
        resultScreen
    );

    await saveScore();

}


/* =========================================================
   RESULT
========================================================= */

function renderResults() {

    const p1 =
        state.chapterData
            ?.part1
            ?.questions
            ?.length ||
        0;


    const p2 =
        state.chapterData
            ?.part2
            ?.questions
            ?.length ||
        0;


    const p3 =
        state.chapterData
            ?.part3
            ?.questions
            ?.length ||
        0;


    const maximum =
        p1 +
        p2 +
        p3;


    const total =
        state.scores.total;


    const percentage =
        maximum
            ? Math.round(
                (
                    total /
                    maximum
                ) *
                100
            )
            : 0;


    if (resultChapter) {

        resultChapter.textContent =
            `Chapter ${state.currentChapter}`;

    }


    if (part1Score) {

        part1Score.textContent =
            `${state.scores.part1} / ${p1}`;

    }


    if (part2Score) {

        part2Score.textContent =
            `${state.scores.part2} / ${p2}`;

    }


    if (part3Score) {

        part3Score.textContent =
            `${state.scores.part3} / ${p3}`;

    }


    if (totalScore) {

        totalScore.textContent =
            `${total} / ${maximum}`;

    }


    if (percentageScore) {

        percentageScore.textContent =
            `${percentage}%`;

    }


    if (saveStatus) {

        saveStatus.textContent =
            "Saving your score...";

    }

}


/* =========================================================
   SAVE SCORE
========================================================= */

async function saveScore() {

    if (
        state.testSaved
    ) {

        return;

    }


    if (
        !state.username ||
        !state.studentClass ||
        !state.currentChapter
    ) {

        if (saveStatus) {

            saveStatus.textContent =
                "Unable to save score: student information is missing.";

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

                    /*
                     * IMPORTANT:
                     * Code.gs expects maximum.
                     */

                    maximum:
                        getMaximumScore()

                }
            );


        if (
            result?.success
        ) {

            state.testSaved =
                true;


            if (saveStatus) {

                saveStatus.textContent =
                    "✓ Score saved successfully.";

                saveStatus.style.color =
                    "#238636";

            }

        } else if (saveStatus) {

            saveStatus.textContent =
                result?.message ||
                "Unable to save score.";

        }

    } catch (error) {

        console.error(
            "Save score error:",
            error
        );


        if (saveStatus) {

            saveStatus.textContent =
                "Unable to save score. Please try again.";

        }

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


    return callAPI(
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

        showLoginMessage(
            "Please login first."
        );

        return;

    }


    if (!historyScreen) {

        console.error(
            "historyScreen is missing from index.html"
        );

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
            "Score History Response:",
            result
        );


        if (historyLoading) {

            historyLoading.style.display =
                "none";

        }


        if (
            !result ||
            !result.success
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


        /*
         * Code.gs returns:
         *
         * {
         *   success: true,
         *   records: [...]
         * }
         *
         * "history" is kept as fallback.
         */

        const rawRecords =
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


        const records =
            rawRecords.map(
                normalizeHistoryRecord
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


        renderScoreHistory(
            records
        );


    } catch (error) {

        console.error(
            "Score history error:",
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
        records.map(
            (
                item,
                index
            ) => {

                const percentage =
                    calculateHistoryPercentage(
                        item
                    );


                return `
                    <div
                        class="history-card"
                        style="
                            background:#ffffff;
                            border-radius:18px;
                            padding:18px;
                            margin-bottom:16px;
                            border:1px solid #e7e7e7;
                            box-shadow:0 5px 18px rgba(0,0,0,.07);
                            overflow:hidden;
                            width:100%;
                            box-sizing:border-box;
                        "
                    >

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


                                <h3
                                    style="
                                        margin:0;
                                        font-size:18px;
                                        line-height:1.3;
                                        color:#222;
                                        word-break:break-word;
                                        overflow-wrap:anywhere;
                                    "
                                >
                                    ${escapeHTML(
                                        item.chapter
                                    )}
                                </h3>

                            </div>


                            <div
                                style="
                                    flex-shrink:0;
                                    min-width:52px;
                                    height:52px;
                                    border-radius:14px;
                                    display:flex;
                                    align-items:center;
                                    justify-content:center;
                                    background:#383838;
                                    color:#ffffff;
                                    font-size:18px;
                                    font-weight:800;
                                    box-sizing:border-box;
                                "
                            >
                                ${item.total}
                            </div>

                        </div>


                        <div
                            style="
                                display:grid;
                                grid-template-columns:repeat(3,minmax(0,1fr));
                                gap:8px;
                                width:100%;
                                box-sizing:border-box;
                            "
                        >

                            ${historyPartCard(
                                "Part 1",
                                item.part1
                            )}

                            ${historyPartCard(
                                "Part 2",
                                item.part2
                            )}

                            ${historyPartCard(
                                "Part 3",
                                item.part3
                            )}

                        </div>


                        <div
                            style="
                                display:flex;
                                justify-content:space-between;
                                align-items:center;
                                gap:12px;
                                margin-top:15px;
                                padding-top:13px;
                                border-top:1px solid #eeeeee;
                            "
                        >

                            <span
                                style="
                                    color:#8a8f98;
                                    font-size:12px;
                                    min-width:0;
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
                                    flex-shrink:0;
                                    font-size:15px;
                                    color:#383838;
                                "
                            >
                                ${
                                    percentage === null
                                        ? "—"
                                        : `${percentage}%`
                                }
                            </strong>

                        </div>

                    </div>
                `;

            }
        )
        .join("");

}


/* =========================================================
   HISTORY PART CARD
========================================================= */

function historyPartCard(
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
                    color:#777;
                    margin-bottom:4px;
                "
            >
                ${label}
            </span>


            <strong
                style="
                    display:block;
                    font-size:16px;
                    color:#222;
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

function calculateHistoryPercentage(
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


    /*
     * New records contain Maximum.
     */

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


    /*
     * If API already provides percentage.
     */

    const apiPercentage =
        Number(
            item.percentage
        );


    if (
        item.percentage !== "" &&
        !Number.isNaN(
            apiPercentage
        )
    ) {

        return Math.round(
            apiPercentage
        );

    }


    /*
     * If the currently loaded chapter
     * matches this history record,
     * we know the exact maximum.
     */

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


    return null;

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


    if (usernameInput) {

        usernameInput.value =
            "";

    }


    if (passwordInput) {

        passwordInput.value =
            "";

    }


    clearLoginMessage();


    if (chapterGrid) {

        chapterGrid.innerHTML =
            "";

    }


    showScreen(
        loginScreen
    );

}
