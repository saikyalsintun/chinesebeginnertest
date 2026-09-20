/* =========================================================
   CHINESE DAILY TEST
   COMPLETE APP.JS
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

                    switchPart(
                        part
                    );

                }
            );

        }
    );


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
   SHOW SCREEN
========================================================= */

function showScreen(
    screen
) {

    const screens = [

        loginScreen,

        chapterScreen,

        testScreen,

        resultScreen,

        historyScreen

    ];


    screens.forEach(
        currentScreen => {

            if (
                currentScreen
            ) {

                currentScreen.classList.remove(
                    "active"
                );

            }

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
   CLASS NORMALIZATION
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


    const match =
        Object.keys(
            CONFIG.CLASS_CONFIG
        ).find(
            className =>
                className.toLowerCase() ===
                raw.toLowerCase()
        );


    return match || raw;

}


/* =========================================================
   GET CLASS CONFIG
========================================================= */

function getClassConfig() {

    if (
        !state.studentClass
    ) {

        return null;

    }


    return CONFIG.CLASS_CONFIG[
        state.studentClass
    ] || null;

}


/* =========================================================
   GENERATE CHAPTER BUTTONS
========================================================= */

function generateChapterButtons() {

    if (!chapterGrid) {

        return;

    }


    chapterGrid.innerHTML = "";


    const classConfig =
        getClassConfig();


    if (!classConfig) {

        chapterGrid.innerHTML = `
            <div class="history-error">
                No chapter configuration found
                for your class.
            </div>
        `;

        return;

    }


    for (
        let i = 1;
        i <= classConfig.totalChapters;
        i++
    ) {

        const button =
            document.createElement(
                "button"
            );


        button.type =
            "button";


        button.className =
            "chapter-card";


        button.innerHTML = `
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


        button.addEventListener(
            "click",
            () => {

                /*
                 * IMPORTANT:
                 * Chapter is opened ONLY
                 * when the student clicks it.
                 */
                loadChapter(
                    i
                );

            }
        );


        chapterGrid.appendChild(
            button
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


    if (!username) {

        showLoginMessage(
            "Please enter your username.",
            "error"
        );

        return;

    }


    if (!password) {

        showLoginMessage(
            "Please enter your password.",
            "error"
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
                "Login failed.",
                "error"
            );

            return;

        }


        const studentClass =
            normalizeStudentClass(
                result.class ||
                result.Class ||
                result.studentClass
            );


        if (!studentClass) {

            showLoginMessage(
                "Your account does not have a class assigned.",
                "error"
            );

            return;

        }


        if (
            !CONFIG.CLASS_CONFIG[
                studentClass
            ]
        ) {

            showLoginMessage(
                `Class "${studentClass}" is not configured yet.`,
                "error"
            );

            return;

        }


        /*
         * Save login state.
         */

        state.username =
            result.username ||
            username;

        state.studentClass =
            studentClass;


        /*
         * Update UI.
         */

        if (welcomeUsername) {

            welcomeUsername.textContent =
                state.username;

        }


        if (studentClassBadge) {

            studentClassBadge.textContent =
                state.studentClass;

        }


        /*
         * Generate ALL chapters.
         *
         * DO NOT call loadChapter(1).
         */
        generateChapterButtons();


        /*
         * Clear password.
         */

        if (passwordInput) {

            passwordInput.value =
                "";

        }


        /*
         * IMPORTANT:
         *
         * Login ends here.
         *
         * The student sees the chapter
         * selection screen.
         */

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
            "Unable to connect to the server.",
            "error"
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
    message,
    type = "error"
) {

    if (!loginMessage) {

        return;

    }


    loginMessage.textContent =
        message;


    loginMessage.style.display =
        "block";


    if (
        type === "success"
    ) {

        loginMessage.style.color =
            "#238636";

    } else {

        loginMessage.style.color =
            "#d93636";

    }

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


/* =========================================================
   LOGIN BUTTON LOADING
========================================================= */

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

    if (
        !CONFIG.API_URL
    ) {

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

            const value =
                data[key];


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
        chapter > classConfig.totalChapters
    ) {

        alert(
            "Invalid chapter."
        );

        return;

    }


    /*
     * Set chapter state.
     */

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


    /*
     * Show test screen.
     */

    showScreen(
        testScreen
    );


    showTestLoading();


    const fileName =
        `Chapter${chapter}.json`;


    const chapterPath =
        `./${classConfig.folder}/${fileName}`;


    try {

        const response =
            await fetch(
                chapterPath,
                {
                    cache: "no-store"
                }
            );


        if (!response.ok) {

            throw new Error(
                `Could not load ${fileName}.`
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
            `Unable to load Chapter ${chapter}. Please check that ${chapterPath} exists.`
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


    if (!chapter) {

        throw new Error(
            "Chapter data is empty."
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
            "Please wait";

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


    return state.chapterData[
        state.currentPart
    ] || null;

}


/* =========================================================
   GET CURRENT QUESTION
========================================================= */

function getCurrentQuestion() {

    const part =
        getCurrentPartData();


    if (!part) {

        return null;

    }


    return (
        part.questions?.[
            state.currentQuestionIndex
        ] || null
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
        state.currentQuestionIndex + 1;


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


    updatePartTabs();

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
        ""
    );

}


/* =========================================================
   UPDATE PART TABS
========================================================= */

function updatePartTabs() {

    partTabs.forEach(
        tab => {

            if (
                tab.dataset.part ===
                state.currentPart
            ) {

                tab.classList.add(
                    "active"
                );

            } else {

                tab.classList.remove(
                    "active"
                );

            }

        }
    );

}


/* =========================================================
   SWITCH PART
========================================================= */

function switchPart(
    part
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


    state.currentQuestionIndex =
        0;


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
        words.map(
            (
                word,
                originalIndex
            ) => ({

                word,
                originalIndex

            })
        );


    for (
        let i = items.length - 1;
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


    const questionIndex =
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
        ][questionIndex]
    ) {

        state.randomOrders[
            part
        ][questionIndex] =
            shuffleWords(
                question.words || []
            );

    }


    return state.randomOrders[
        part
    ][questionIndex];

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
        ] || [];


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


            const selectedIndex =
                currentAnswer.findIndex(
                    answerItem =>
                        answerItem.originalIndex ===
                        item.originalIndex
                );


            if (
                selectedIndex !== -1
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
        !state.answers[part]
    ) {

        state.answers[part] =
            {};

    }


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
        ] || [];


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
        answerIndex >= answer.length
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
   CLEAR CURRENT ANSWER
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

    const part =
        getCurrentPartData();


    if (
        !part ||
        !Array.isArray(
            part.questions
        )
    ) {

        return;

    }


    const totalQuestions =
        part.questions.length;


    const isFirstQuestion =
        state.currentQuestionIndex === 0;


    const isLastQuestion =
        state.currentQuestionIndex ===
        totalQuestions - 1;


    if (previousButton) {

        previousButton.disabled =
            isFirstQuestion;

    }


    if (nextButton) {

        if (
            isLastQuestion
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
        state.currentQuestionIndex <= 0
    ) {

        return;

    }


    state.currentQuestionIndex--;


    renderCurrentQuestion();


    window.scrollTo(
        0,
        0
    );

}


/* =========================================================
   NEXT QUESTION
========================================================= */

function goToNextQuestion() {

    const part =
        getCurrentPartData();


    if (
        !part ||
        !Array.isArray(
            part.questions
        )
    ) {

        return;

    }


    const totalQuestions =
        part.questions.length;


    const isLastQuestion =
        state.currentQuestionIndex >=
        totalQuestions - 1;


    if (!isLastQuestion) {

        state.currentQuestionIndex++;


        renderCurrentQuestion();


        window.scrollTo(
            0,
            0
        );


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
   FINISH TEST
========================================================= */

async function finishTest() {

    if (
        state.testSaved
    ) {

        showScreen(
            resultScreen
        );

        return;

    }


    calculateAllScores();

    renderResults();

    showScreen(
        resultScreen
    );


    await saveScore();

    await saveAnswerRecords();

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
   CALCULATE PART SCORE
========================================================= */

function calculatePartScore(
    partName
) {

    const part =
        state.chapterData?.[
            partName
        ];


    if (
        !part ||
        !Array.isArray(
            part.questions
        )
    ) {

        return 0;

    }


    let score = 0;


    part.questions.forEach(
        (
            question,
            index
        ) => {

            const studentAnswer =
                state.answers[
                    partName
                ][
                    index
                ] || [];


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
   NORMALIZE ANSWER WORDS
========================================================= */

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
        item => {

            if (
                typeof item ===
                "string"
            ) {

                return normalizeWord(
                    item
                );

            }


            if (
                item &&
                typeof item.word ===
                "string"
            ) {

                return normalizeWord(
                    item.word
                );

            }


            return "";

        }
    );

}


/* =========================================================
   NORMALIZE WORD
========================================================= */

function normalizeWord(
    word
) {

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


/* =========================================================
   ANSWER CORRECTNESS
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
        accepted => {

            const acceptedWords =
                normalizeAnswerWords(
                    accepted
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
                ) => {

                    return (
                        word ===
                        studentWords[index]
                    );

                }
            );

        }
    );

}


/* =========================================================
   RENDER RESULTS
========================================================= */

function renderResults() {

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
            state.scores.total;

    }


    const maxScore =
        getMaximumScore();


    const percentage =
        maxScore > 0
            ? Math.round(
                (
                    state.scores.total /
                    maxScore
                ) * 100
            )
            : 0;


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
   GET MAXIMUM SCORE
========================================================= */

function getMaximumScore() {

    if (
        !state.chapterData
    ) {

        return 0;

    }


    let maximum = 0;


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
        !state.studentClass
    ) {

        if (saveStatus) {

            saveStatus.textContent =
                "Unable to save score: student information is missing.";

            saveStatus.style.color =
                "#d93636";

        }

        return;

    }


    if (
        !state.currentChapter
    ) {

        if (saveStatus) {

            saveStatus.textContent =
                "Unable to save score: chapter is missing.";

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
            "Save Score Response:",
            result
        );


        if (
            result &&
            result.success
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
            "Save score error:",
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

    if (
        state.answerRecordsSaved
    ) {

        return;

    }


    if (
        !state.username ||
        !state.studentClass ||
        !state.chapterData
    ) {

        console.error(
            "Cannot save answer records: missing student or chapter data."
        );

        return;

    }


    const records = [];


    [
        "part1",
        "part2",
        "part3"
    ].forEach(
        partName => {

            const part =
                state.chapterData[
                    partName
                ];


            if (
                !part ||
                !Array.isArray(
                    part.questions
                )
            ) {

                return;

            }


            part.questions.forEach(
                (
                    question,
                    index
                ) => {

                    const answer =
                        state.answers[
                            partName
                        ][
                            index
                        ] || [];


                    const words =
                        normalizeAnswerWords(
                            answer
                        );


                    records.push({

                        question:
                            question.question ||
                            "",

                        answer:
                            words.join(" ")

                    });

                }
            );

        }
    );


    console.log(
        "START SAVING ANSWER RECORDS"
    );

    console.log(
        "Username:",
        state.username
    );

    console.log(
        "Class:",
        state.studentClass
    );

    console.log(
        "Records:",
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
                        JSON.stringify(
                            records
                        )

                }
            );


        console.log(
            "GOOGLE APPS SCRIPT ANSWER RECORD RESPONSE:",
            result
        );


        if (
            result &&
            result.success
        ) {

            state.answerRecordsSaved =
                true;

        } else {

            console.error(
                "Answer records were not saved:",
                result
            );

        }


    } catch (error) {

        console.error(
            "Save answer records error:",
            error
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

            success: false,

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


        const history =
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
            history.length === 0
        ) {

            if (historyEmpty) {

                historyEmpty.style.display =
                    "block";

            }

            return;

        }


        renderScoreHistory(
            history
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
   RENDER SCORE HISTORY
========================================================= */

function renderScoreHistory(
    history
) {

    if (!historyList) {

        return;

    }


    historyList.innerHTML =
        "";


    history.forEach(
        (
            item,
            index
        ) => {

            const percentage =
                calculateHistoryPercentage(
                    item
                );


            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "history-item";


            const info =
                document.createElement(
                    "div"
                );

            info.className =
                "history-info";


            const title =
                document.createElement(
                    "div"
                );

            title.className =
                "history-title";


            title.textContent =
                item.chapter ||
                "Chapter";


            const details =
                document.createElement(
                    "div"
                );

            details.className =
                "history-details";


            const date =
                document.createElement(
                    "span"
                );

            date.textContent =
                formatHistoryDate(
                    item.date
                );


            const classText =
                document.createElement(
                    "span"
                );

            classText.textContent =
                item.class ||
                state.studentClass;


            details.appendChild(
                date
            );

            details.appendChild(
                classText
            );


            info.appendChild(
                title
            );

            info.appendChild(
                details
            );


            const scores =
                document.createElement(
                    "div"
                );

            scores.className =
                "history-scores";


            scores.innerHTML = `

                <div>

                    <span>
                        Part 1
                    </span>

                    <strong>
                        ${escapeHTML(
                            String(
                                item.part1 ??
                                0
                            )
                        )}
                    </strong>

                </div>


                <div>

                    <span>
                        Part 2
                    </span>

                    <strong>
                        ${escapeHTML(
                            String(
                                item.part2 ??
                                0
                            )
                        )}
                    </strong>

                </div>


                <div>

                    <span>
                        Part 3
                    </span>

                    <strong>
                        ${escapeHTML(
                            String(
                                item.part3 ??
                                0
                            )
                        )}
                    </strong>

                </div>

            `;


            const totalBox =
                document.createElement(
                    "div"
                );

            totalBox.className =
                "history-total-box";


            totalBox.innerHTML = `

                <div>

                    <span>
                        Total
                    </span>

                    <strong>
                        ${escapeHTML(
                            String(
                                item.total ??
                                0
                            )
                        )}
                    </strong>

                </div>


                <div>

                    <span>
                        Percentage
                    </span>

                    <strong>
                        ${percentage}%
                    </strong>

                </div>

            `;


            const actions =
                document.createElement(
                    "div"
                );

            actions.className =
                "history-actions";


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
                () => {

                    printResultPDF(
                        item
                    );

                }
            );


            actions.appendChild(
                printButton
            );


            card.appendChild(
                info
            );

            card.appendChild(
                scores
            );

            card.appendChild(
                totalBox
            );

            card.appendChild(
                actions
            );


            historyList.appendChild(
                card
            );

        }
    );

}


/* =========================================================
   CALCULATE HISTORY PERCENTAGE
========================================================= */

function calculateHistoryPercentage(
    item
) {

    const total =
        Number(
            item?.total ??
            item?.Total
        ) || 0;


    const maximum =
        Number(
            item?.maximum ??
            item?.Maximum
        ) || 0;


    if (
        maximum > 0
    ) {

        return Math.round(
            (
                total /
                maximum
            ) * 100
        );

    }


    const knownMaximum =
        getKnownMaximumForHistoryItem(
            item
        );


    if (
        knownMaximum > 0
    ) {

        return Math.round(
            (
                total /
                knownMaximum
            ) * 100
        );

    }


    const recordedPartTotal =
        (
            Number(
                item?.part1
            ) || 0
        ) +
        (
            Number(
                item?.part2
            ) || 0
        ) +
        (
            Number(
                item?.part3
            ) || 0
        );


    if (
        recordedPartTotal <= 0
    ) {

        return 0;

    }


    return 0;

}


/* =========================================================
   GET KNOWN MAXIMUM
========================================================= */

function getKnownMaximumForHistoryItem(
    item
) {

    const chapterNumber =
        extractChapterNumber(
            item?.chapter
        );


    if (
        !chapterNumber
    ) {

        return 0;

    }


    if (
        state.currentChapter ===
        chapterNumber &&
        state.chapterData
    ) {

        return getMaximumScore();

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

    const text =
        String(
            value ||
            ""
        );


    const match =
        text.match(
            /(\d+)/
        );


    if (!match) {

        return 0;

    }


    return Number(
        match[1]
    );

}


/* =========================================================
   PRINT / SAVE PDF
========================================================= */

function printResultPDF(
    result
) {

    if (!result) {

        return;

    }


    const student =
        result.username ||
        state.username ||
        "";


    const studentClass =
        result.class ||
        state.studentClass ||
        "";


    const chapter =
        result.chapter ||
        "Chapter";


    const part1 =
        Number(
            result.part1
        ) || 0;


    const part2 =
        Number(
            result.part2
        ) || 0;


    const part3 =
        Number(
            result.part3
        ) || 0;


    const total =
        Number(
            result.total
        ) || 0;


    let maximum =
        Number(
            result.maximum
        ) || 0;


    if (
        maximum <= 0 &&
        result === getCurrentResultObject()
    ) {

        maximum =
            getMaximumScore();

    }


    const percentage =
        maximum > 0
            ? Math.round(
                (
                    total /
                    maximum
                ) * 100
            )
            : calculateHistoryPercentage(
                result
            );


    const date =
        formatHistoryDate(
            result.date
        );


    const printWindow =
        window.open(
            "",
            "_blank",
            "width=900,height=700"
        );


    if (!printWindow) {

        alert(
            "Please allow pop-ups to print the result."
        );

        return;

    }


    const safeStudent =
        escapeHTML(
            student
        );


    const safeClass =
        escapeHTML(
            studentClass
        );


    const safeChapter =
        escapeHTML(
            chapter
        );


    const safeDate =
        escapeHTML(
            date
        );


    printWindow.document.open();


    printWindow.document.write(`

<!DOCTYPE html>

<html>

<head>

<meta charset="UTF-8">

<title>
    Chinese Test Result
</title>

<style>

    * {
        box-sizing: border-box;
    }

    body {
        margin: 0;
        padding: 40px;
        font-family:
            Arial,
            Helvetica,
            sans-serif;
        background: #ffffff;
        color: #222222;
    }

    .page {
        max-width: 800px;
        margin: 0 auto;
    }

    .header {
        text-align: center;
        margin-bottom: 35px;
        border-bottom: 2px solid #222;
        padding-bottom: 20px;
    }

    .header h1 {
        margin: 0 0 10px;
        font-size: 28px;
    }

    .header p {
        margin: 4px 0;
        color: #666;
    }

    .student-info {
        display: grid;
        grid-template-columns:
            1fr 1fr;
        gap: 15px;
        margin-bottom: 30px;
    }

    .info-box {
        border: 1px solid #dddddd;
        border-radius: 8px;
        padding: 15px;
    }

    .info-label {
        display: block;
        font-size: 12px;
        color: #777777;
        margin-bottom: 5px;
    }

    .info-value {
        font-size: 16px;
        font-weight: bold;
    }

    .scores {
        display: grid;
        grid-template-columns:
            repeat(3, 1fr);
        gap: 15px;
        margin-bottom: 25px;
    }

    .score-box {
        border: 1px solid #dddddd;
        border-radius: 8px;
        padding: 20px;
        text-align: center;
    }

    .score-box span {
        display: block;
        font-size: 13px;
        color: #777777;
        margin-bottom: 8px;
    }

    .score-box strong {
        font-size: 25px;
    }

    .total {
        border: 2px solid #222222;
        border-radius: 8px;
        padding: 20px;
        display: flex;
        justify-content:
            space-between;
        align-items: center;
        margin-bottom: 30px;
    }

    .total-label {
        font-size: 18px;
        font-weight: bold;
    }

    .total-value {
        font-size: 28px;
        font-weight: bold;
    }

    .percentage {
        text-align: center;
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 30px;
    }

    .footer {
        text-align: center;
        font-size: 12px;
        color: #888888;
        border-top: 1px solid #dddddd;
        padding-top: 15px;
    }

    @media print {

        body {
            padding: 0;
        }

        .page {
            max-width: none;
        }

        @page {
            size: A4;
            margin: 18mm;
        }

    }

</style>

</head>

<body>

<div class="page">

    <div class="header">

        <h1>
            Chinese Daily Test
        </h1>

        <p>
            Test Result
        </p>

    </div>


    <div class="student-info">

        <div class="info-box">

            <span class="info-label">
                Student
            </span>

            <span class="info-value">
                ${safeStudent}
            </span>

        </div>


        <div class="info-box">

            <span class="info-label">
                Class
            </span>

            <span class="info-value">
                ${safeClass}
            </span>

        </div>


        <div class="info-box">

            <span class="info-label">
                Chapter
            </span>

            <span class="info-value">
                ${safeChapter}
            </span>

        </div>


        <div class="info-box">

            <span class="info-label">
                Date
            </span>

            <span class="info-value">
                ${safeDate}
            </span>

        </div>

    </div>


    <div class="scores">

        <div class="score-box">

            <span>
                Part 1
            </span>

            <strong>
                ${part1}
            </strong>

        </div>


        <div class="score-box">

            <span>
                Part 2
            </span>

            <strong>
                ${part2}
            </strong>

        </div>


        <div class="score-box">

            <span>
                Part 3
            </span>

            <strong>
                ${part3}
            </strong>

        </div>

    </div>


    <div class="total">

        <span class="total-label">
            Total Score
        </span>

        <span class="total-value">
            ${total}
            ${
                maximum > 0
                    ? ` / ${maximum}`
                    : ""
            }
        </span>

    </div>


    <div class="percentage">

        Percentage:
        ${percentage}%

    </div>


    <div class="footer">

        Chinese Daily Test

    </div>

</div>

<script>

window.addEventListener(
    "load",
    function() {

        setTimeout(
            function() {

                window.print();

            },
            300
        );

    }
);

</script>

</body>

</html>

    `);


    printWindow.document.close();

}


/* =========================================================
   CURRENT RESULT OBJECT
========================================================= */

function getCurrentResultObject() {

    return {

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
            getMaximumScore(),

        date:
            new Date().toISOString()

    };

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
            "Beginner";

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
   END OF APP.JS
========================================================= */
