/* =========================================================
   CHINESE DAILY TEST
   app.js
========================================================= */


/* =========================================================
   CONFIGURATION
========================================================= */

const CONFIG = {

    API_URL:
        "https://script.google.com/macros/s/AKfycbwS3UyHA-h6D9nsJ7fO1cm7zPFna8DyGJnKuwdwQPw39WSVSFKaYlVh-qt05qK7S6Bl/exec",

    CHAPTER_PATH:
        "./chapters/",

    TOTAL_CHAPTERS:
        15

};


/* =========================================================
   CLASS / COURSE CONFIGURATION
========================================================= */

const CLASS_CONFIG = {

    Beginner: {
        folder: "chapters",
        totalChapters: 15
    },

    Speaking: {
        folder: "speaking",
        totalChapters: 35
    }

    /*
     * Future example:
     *
     * Intermediate: {
     *     folder: "intermediate",
     *     totalChapters: 30
     * }
     */

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
        part3: 0

    },

    /*
     * Prevent duplicate AnswerRecords submissions.
     */
    answerRecordsSaved: false,

    /*
     * Keeps randomized word order stable
     * while moving between questions.
     */
    randomOrders: {

        part1: {},
        part2: {},
        part3: {}

    }

};


/* =========================================================
   DOM ELEMENTS
========================================================= */

let loginScreen;
let chapterScreen;
let testScreen;
let resultScreen;

let loginForm;
let loginMessage;
let loginButton;
let usernameInput;
let passwordInput;

let welcomeUsername;
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


/* =========================================================
   HISTORY ELEMENTS
========================================================= */

let historyScreen;
let backFromHistory;
let historyStudent;
let historyLoading;
let historyEmpty;
let historyList;

let chapterHistoryButton;
let scoreHistoryButton;


/* =========================================================
   INITIALIZATION
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    initializeApp
);


function initializeApp() {

    /*
     * Find DOM elements.
     */

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


    /*
     * History elements.
     */

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

    chapterHistoryButton =
        document.getElementById(
            "chapterHistoryButton"
        );

    scoreHistoryButton =
        document.getElementById(
            "scoreHistoryButton"
        );


    /*
     * Required elements.
     */

    const requiredElements = [

        [
            "loginScreen",
            loginScreen
        ],

        [
            "chapterScreen",
            chapterScreen
        ],

        [
            "testScreen",
            testScreen
        ],

        [
            "resultScreen",
            resultScreen
        ],

        [
            "loginForm",
            loginForm
        ],

        [
            "loginMessage",
            loginMessage
        ],

        [
            "loginButton",
            loginButton
        ],

        [
            "username",
            usernameInput
        ],

        [
            "password",
            passwordInput
        ],

        [
            "chapterGrid",
            chapterGrid
        ],

        [
            "logoutButton",
            logoutButton
        ],

        [
            "nextButton",
            nextButton
        ],

        [
            "previousButton",
            previousButton
        ],

        [
            "wordBank",
            wordBank
        ],

        [
            "selectedWords",
            selectedWords
        ]

    ];


    const missingElements =
        requiredElements
            .filter(
                item =>
                    !item[1]
            )
            .map(
                item =>
                    item[0]
            );


    if (
        missingElements.length > 0
    ) {

        console.error(
            "Missing HTML elements:",
            missingElements
        );

        return;

    }


    chapterGrid.innerHTML =
        "";


    setupEventListeners();

}


/* =========================================================
   EVENT LISTENERS
========================================================= */

function setupEventListeners() {

    loginForm.addEventListener(
        "submit",
        handleLogin
    );


    clearAnswer.addEventListener(
        "click",
        handleClearAnswer
    );


    nextButton.addEventListener(
        "click",
        handleNext
    );


    previousButton.addEventListener(
        "click",
        handlePrevious
    );


    partTabs.forEach(
        tab => {

            tab.addEventListener(
                "click",
                () => {

                    const requestedPart =
                        tab.dataset.part;


                    if (
                        requestedPart &&
                        [
                            "part1",
                            "part2",
                            "part3"
                        ].includes(
                            requestedPart
                        )
                    ) {

                        switchPart(
                            requestedPart
                        );

                    }

                }
            );

        }
    );


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


    if (logoutButton) {

        logoutButton.addEventListener(
            "click",
            handleLogout
        );

    }


    /*
     * Score history.
     */

    if (chapterHistoryButton) {

        chapterHistoryButton.addEventListener(
            "click",
            () => {

                loadScoreHistory();

            }
        );

    }


    if (scoreHistoryButton) {

        scoreHistoryButton.addEventListener(
            "click",
            () => {

                loadScoreHistory();

            }
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

function showScreen(screen) {

    if (!screen) {

        return;

    }


    document
        .querySelectorAll(
            ".screen"
        )
        .forEach(
            item => {

                item.classList.remove(
                    "active"
                );

            }
        );


    screen.classList.add(
        "active"
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


    const rawValue =
        String(value).trim();


    if (!rawValue) {

        return "";

    }


    const matchingClass =
        Object.keys(
            CLASS_CONFIG
        ).find(
            className =>
                className.toLowerCase() ===
                rawValue.toLowerCase()
        );


    return (
        matchingClass ||
        rawValue
    );

}


function getCurrentClassConfig() {

    const studentClass =
        normalizeStudentClass(
            state.studentClass
        );


    if (!studentClass) {

        return null;

    }


    return (
        CLASS_CONFIG[
            studentClass
        ] ||
        null
    );

}


/* =========================================================
   SAFE HTML
========================================================= */

function escapeHTML(value) {

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

    chapterGrid.innerHTML =
        "";


    const studentClass =
        normalizeStudentClass(
            state.studentClass
        );


    state.studentClass =
        studentClass;


    const classConfig =
        CLASS_CONFIG[
            studentClass
        ];


    if (!classConfig) {

        chapterGrid.innerHTML = `

            <div class="empty-state">

                <h3>
                    Course Not Available
                </h3>

                <p>
                    Your class
                    <strong>
                        ${escapeHTML(
                            studentClass ||
                            "Unknown"
                        )}
                    </strong>
                    has not been configured yet.
                </p>

            </div>

        `;


        console.error(
            "No course configuration found for:",
            studentClass
        );


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
                    studentClass
                )}
                Chinese Test
            </p>

        `;


        card.addEventListener(
            "click",
            () =>
                loadChapter(i)
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
        usernameInput.value.trim();


    const password =
        passwordInput.value;


    if (
        !username ||
        !password
    ) {

        showLoginError(
            "Please enter username and password."
        );


        return;

    }


    loginButton.disabled =
        true;


    loginButton.textContent =
        "Logging in...";


    loginMessage.textContent =
        "";


    loginMessage.className =
        "message";


    try {

        const result =
            await callAPI(
                "login",
                {
                    username,
                    password
                }
            );


        if (
            result &&
            result.success === true
        ) {

            state.username =
                result.username ||
                username;


            state.studentClass =
                normalizeStudentClass(
                    result.class ||
                    result.Class ||
                    result.studentClass ||
                    ""
                );


            if (
                !state.studentClass
            ) {

                showLoginError(
                    "Login succeeded, but your class was not provided."
                );


                return;

            }


            if (
                !CLASS_CONFIG[
                    state.studentClass
                ]
            ) {

                showLoginError(
                    `Your class "${state.studentClass}" has not been configured yet.`
                );


                console.error(
                    "Unknown student class:",
                    state.studentClass
                );


                return;

            }


            welcomeUsername.textContent =
                state.username;


            generateChapterButtons();


            showScreen(
                chapterScreen
            );


        } else {

            showLoginError(
                result?.message ||
                "Invalid username or password."
            );

        }

    } catch (error) {

        console.error(
            "Login error:",
            error
        );


        showLoginError(
            "Unable to connect to the server."
        );

    } finally {

        loginButton.disabled =
            false;


        loginButton.textContent =
            "Login";

    }

}


/* =========================================================
   LOGIN ERROR
========================================================= */

function showLoginError(
    message
) {

    loginMessage.textContent =
        message;


    loginMessage.className =
        "message error";

}


/* =========================================================
   GOOGLE APPS SCRIPT API
========================================================= */

async function callAPI(
    action,
    data = {}
) {

    /*
     * Development mode.
     */

    if (
        !CONFIG.API_URL ||
        CONFIG.API_URL ===
        "YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL"
    ) {

        if (
            action === "login"
        ) {

            return {

                success: true,

                username:
                    data.username,

                class:
                    data.class ||
                    "Beginner"

            };

        }


        if (
            action === "saveScore"
        ) {

            console.log(
                "Development mode - score:",
                data
            );


            return {

                success: true,

                message:
                    "Score saved in development mode."

            };

        }


        if (
            action === "saveAnswerRecords"
        ) {

            console.log(
                "Development mode - answer records:",
                data
            );


            return {

                success: true,

                message:
                    "Answer records saved in development mode."

            };

        }


        if (
            action === "getScoreHistory"
        ) {

            return {

                success: true,

                records: []

            };

        }


        return {

            success: true

        };

    }


    /*
     * Current API uses GET.
     */

    const params =
        new URLSearchParams();


    params.append(
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

                params.append(
                    key,
                    String(value)
                );

            }

        }
    );


    const url =
        `${CONFIG.API_URL}?${params.toString()}`;


    console.log(
        "API Request:",
        url
    );


    try {

        const response =
            await fetch(
                url,
                {
                    method: "GET",
                    cache: "no-store"
                }
            );


        if (
            !response.ok
        ) {

            throw new Error(
                `API Error: ${response.status}`
            );

        }


        const result =
            await response.json();


        console.log(
            "API Response:",
            result
        );


        return result;

    } catch (error) {

        console.error(
            "API Request Failed:",
            error
        );


        throw error;

    }

}


/* =========================================================
   LOAD CHAPTER
========================================================= */

async function loadChapter(
    chapterNumber
) {

    const studentClass =
        normalizeStudentClass(
            state.studentClass
        );


    const classConfig =
        CLASS_CONFIG[
            studentClass
        ];


    if (!classConfig) {

        alert(
            "Your class is missing or has not been configured yet."
        );


        return;

    }


    if (
        !Number.isInteger(
            chapterNumber
        ) ||
        chapterNumber < 1 ||
        chapterNumber >
            classConfig.totalChapters
    ) {

        alert(
            `Chapter ${chapterNumber} is not available for ${studentClass}.`
        );


        return;

    }


    const fileName =
        `Chapter${chapterNumber}.json`;


    const chapterPath =
        `./${classConfig.folder}/${fileName}`;


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


        if (
            !response.ok
        ) {

            throw new Error(
                `Could not load ${chapterPath} (${response.status})`
            );

        }


        const data =
            await response.json();


        if (
            !data ||
            typeof data !== "object"
        ) {

            throw new Error(
                `${chapterPath} does not contain valid JSON.`
            );

        }


        const chapter =
            data.chapter ||
            data;


        if (
            !chapter.part1 ||
            !chapter.part2 ||
            !chapter.part3
        ) {

            throw new Error(
                `${chapterPath} must contain part1, part2 and part3.`
            );

        }


        state.currentChapter =
            chapterNumber;


        state.chapterData =
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
            part3: 0

        };


        /*
         * Reset answer-record status.
         */
        state.answerRecordsSaved =
            false;


        /*
         * New random order for every chapter.
         */
        state.randomOrders = {

            part1: {},
            part2: {},
            part3: {}

        };


        testChapter.textContent =
            `Chapter ${chapterNumber}`;


        updatePartTabs();


        showScreen(
            testScreen
        );


        renderQuestion();

    } catch (error) {

        console.error(
            "Chapter loading error:",
            error
        );


        alert(
            `Unable to load Chapter ${chapterNumber}.\n\n` +
            `Class: ${studentClass}\n` +
            `Expected file: ${chapterPath}`
        );

    }

}


/* =========================================================
   GET CURRENT QUESTIONS
========================================================= */

function getCurrentQuestions() {

    if (
        !state.chapterData
    ) {

        return [];

    }


    return (
        state.chapterData[
            state.currentPart
        ]?.questions ||
        []
    );

}


/* =========================================================
   RENDER QUESTION
========================================================= */

function renderQuestion() {

    const questions =
        getCurrentQuestions();


    if (
        !questions.length
    ) {

        questionText.textContent =
            "No questions available.";


        questionCounter.textContent =
            "0 / 0";


        progressBar.style.width =
            "0%";


        selectedWords.innerHTML =
            "";


        wordBank.innerHTML =
            "";


        previousButton.disabled =
            true;


        nextButton.disabled =
            true;


        return;

    }


    if (
        state.currentQuestionIndex < 0
    ) {

        state.currentQuestionIndex =
            0;

    }


    if (
        state.currentQuestionIndex >=
        questions.length
    ) {

        state.currentQuestionIndex =
            questions.length - 1;

    }


    const question =
        questions[
            state.currentQuestionIndex
        ];


    testChapter.textContent =
        `Chapter ${state.currentChapter}`;


    partTitle.textContent =
        state.chapterData[
            state.currentPart
        ]?.title ||
        "Test";


    questionType.textContent =
        state.chapterData[
            state.currentPart
        ]?.title ||
        "Question";


    questionCounter.textContent =
        `${state.currentQuestionIndex + 1} / ${questions.length}`;


    const progress =
        (
            (
                state.currentQuestionIndex + 1
            )
            /
            questions.length
        ) * 100;


    progressBar.style.width =
        `${progress}%`;


    questionText.textContent =
        question.question ||
        "Arrange the words correctly.";


    renderSelectedWords(
        question
    );


    renderWordBank(
        question
    );


    previousButton.disabled =
        state.currentPart === "part1" &&
        state.currentQuestionIndex === 0;


    nextButton.disabled =
        false;


    if (
        state.currentQuestionIndex ===
        questions.length - 1
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


/* =========================================================
   GET CURRENT ANSWER
========================================================= */

function getCurrentAnswer() {

    const part =
        state.currentPart;


    const index =
        state.currentQuestionIndex;


    return (
        state.answers[
            part
        ][index] ||
        []
    );

}


/* =========================================================
   RENDER SELECTED WORDS
========================================================= */

function renderSelectedWords(
    question
) {

    selectedWords.innerHTML =
        "";


    const answer =
        getCurrentAnswer();


    if (
        !answer.length
    ) {

        selectedWords.innerHTML = `

            <span class="empty-answer">
                Tap the words below
            </span>

        `;


        return;

    }


    answer.forEach(
        (
            word,
            index
        ) => {

            const chip =
                document.createElement(
                    "button"
                );


            chip.type =
                "button";


            chip.className =
                "word-chip";


            chip.textContent =
                word;


            chip.addEventListener(
                "click",
                () => {

                    removeWord(
                        index
                    );

                }
            );


            selectedWords.appendChild(
                chip
            );

        }
    );

}


/* =========================================================
   RENDER WORD BANK
========================================================= */

function renderWordBank(
    question
) {

    wordBank.innerHTML =
        "";


    const part =
        state.currentPart;


    const questionIndex =
        state.currentQuestionIndex;


    const answer =
        getCurrentAnswer();


    const words =
        Array.isArray(
            question.words
        )
            ? question.words
            : [];


    if (
        !words.length
    ) {

        wordBank.innerHTML = `

            <span class="empty-answer">
                No word choices available.
            </span>

        `;


        return;

    }


    /*
     * Create random order only once
     * per question.
     */

    if (
        !state.randomOrders[
            part
        ][
            questionIndex
        ]
    ) {

        state.randomOrders[
            part
        ][
            questionIndex
        ] =
            shuffleWords(
                words
            );

    }


    const randomizedWords =
        state.randomOrders[
            part
        ][
            questionIndex
        ];


    const usedIndexes =
        getUsedWordIndexes(
            words,
            answer
        );


    randomizedWords.forEach(
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
                usedIndexes.includes(
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

                    if (
                        usedIndexes.includes(
                            item.originalIndex
                        )
                    ) {

                        return;

                    }


                    addWord(
                        item.word,
                        item.originalIndex
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
   SHUFFLE WORDS
========================================================= */

function shuffleWords(
    words
) {

    const shuffled =
        words.map(
            (
                word,
                index
            ) => {

                return {

                    word:
                        word,

                    originalIndex:
                        index

                };

            }
        );


    for (
        let i =
            shuffled.length - 1;
        i > 0;
        i--
    ) {

        const randomIndex =
            Math.floor(
                Math.random() *
                (i + 1)
            );


        const temporary =
            shuffled[i];


        shuffled[i] =
            shuffled[
                randomIndex
            ];


        shuffled[
            randomIndex
        ] =
            temporary;

    }


    console.log(
        "Randomized words:",
        shuffled.map(
            item =>
                item.word
        )
    );


    return shuffled;

}


/* =========================================================
   FIND USED WORD INDEXES
========================================================= */

function getUsedWordIndexes(
    words,
    answer
) {

    const used = [];


    const availableIndexes =
        words.map(
            (
                word,
                index
            ) =>
                index
        );


    answer.forEach(
        word => {

            const matchingPosition =
                availableIndexes.findIndex(
                    index =>
                        words[index] ===
                        word
                );


            if (
                matchingPosition !== -1
            ) {

                const originalIndex =
                    availableIndexes[
                        matchingPosition
                    ];


                used.push(
                    originalIndex
                );


                availableIndexes.splice(
                    matchingPosition,
                    1
                );

            }

        }
    );


    return used;

}


/* =========================================================
   ADD WORD
========================================================= */

function addWord(
    word,
    wordIndex
) {

    const part =
        state.currentPart;


    const questionIndex =
        state.currentQuestionIndex;


    if (
        !state.answers[
            part
        ][
            questionIndex
        ]
    ) {

        state.answers[
            part
        ][
            questionIndex
        ] = [];

    }


    void wordIndex;


    state.answers[
        part
    ][
        questionIndex
    ].push(
        word
    );


    renderQuestion();

}


/* =========================================================
   REMOVE WORD
========================================================= */

function removeWord(
    index
) {

    const part =
        state.currentPart;


    const questionIndex =
        state.currentQuestionIndex;


    const answer =
        state.answers[
            part
        ][
            questionIndex
        ];


    if (
        !answer ||
        index < 0 ||
        index >= answer.length
    ) {

        return;

    }


    answer.splice(
        index,
        1
    );


    renderQuestion();

}


/* =========================================================
   CLEAR ANSWER
========================================================= */

function handleClearAnswer() {

    const part =
        state.currentPart;


    const questionIndex =
        state.currentQuestionIndex;


    state.answers[
        part
    ][
        questionIndex
    ] = [];


    renderQuestion();

}


/* =========================================================
   NEXT BUTTON
========================================================= */

function handleNext() {

    const questions =
        getCurrentQuestions();


    if (
        !questions.length
    ) {

        return;

    }


    /*
     * Next question.
     */

    if (
        state.currentQuestionIndex <
        questions.length - 1
    ) {

        state.currentQuestionIndex++;


        renderQuestion();


        return;

    }


    /*
     * Part 1 → Part 2
     */

    if (
        state.currentPart ===
        "part1"
    ) {

        switchPart(
            "part2"
        );


        return;

    }


    /*
     * Part 2 → Part 3
     */

    if (
        state.currentPart ===
        "part2"
    ) {

        switchPart(
            "part3"
        );


        return;

    }


    /*
     * Part 3 → Finish.
     */

    finishTest();

}


/* =========================================================
   PREVIOUS BUTTON
========================================================= */

function handlePrevious() {

    /*
     * Previous question.
     */

    if (
        state.currentQuestionIndex > 0
    ) {

        state.currentQuestionIndex--;


        renderQuestion();


        return;

    }


    /*
     * Part 2 → Part 1.
     */

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


    /*
     * Part 3 → Part 2.
     */

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
   PART TABS
========================================================= */

function switchPart(
    part,
    goToLastQuestion = false
) {

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


    if (
        !state.chapterData
    ) {

        return;

    }


    state.currentPart =
        part;


    const questions =
        getCurrentQuestions();


    if (
        goToLastQuestion
    ) {

        state.currentQuestionIndex =
            Math.max(
                questions.length - 1,
                0
            );

    } else {

        state.currentQuestionIndex =
            0;

    }


    updatePartTabs();


    renderQuestion();

}


/* =========================================================
   UPDATE PART TABS
========================================================= */

function updatePartTabs() {

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
   FINISH TEST
========================================================= */

async function finishTest() {

    calculateScores();


    displayResults();


    showScreen(
        resultScreen
    );


    /*
     * Save score first.
     */
    await saveScore();


    /*
     * Save all student answers.
     */
    await saveAnswerRecords();

}


/* =========================================================
   CALCULATE SCORES
========================================================= */

function calculateScores() {

    state.scores = {

        part1:
            calculatePartScore(
                "part1"
            ),

        part2:
            calculatePartScore(
                "part2"
            ),

        part3:
            calculatePartScore(
                "part3"
            )

    };

}


/* =========================================================
   CALCULATE PART SCORE
========================================================= */

function calculatePartScore(
    part
) {

    const questions =
        state.chapterData[
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

            const studentAnswer =
                state.answers[
                    part
                ][index] ||
                [];


            const correctAnswers =
                Array.isArray(
                    question.answers
                )
                    ? question.answers
                    : [];


            const isCorrect =
                correctAnswers.some(
                    correctAnswer =>
                        arraysEqual(
                            studentAnswer,
                            correctAnswer
                        )
                );


            if (
                isCorrect
            ) {

                score++;

            }

        }
    );


    return score;

}


/* =========================================================
   ARRAY COMPARISON
========================================================= */

function arraysEqual(
    first,
    second
) {

    if (
        !Array.isArray(first) ||
        !Array.isArray(second)
    ) {

        return false;

    }


    if (
        first.length !==
        second.length
    ) {

        return false;

    }


    return first.every(
        (
            value,
            index
        ) =>
            value ===
            second[index]
    );

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


    const part1 =
        state.chapterData
            .part1
            ?.questions
            ?.length ||
        0;


    const part2 =
        state.chapterData
            .part2
            ?.questions
            ?.length ||
        0;


    const part3 =
        state.chapterData
            .part3
            ?.questions
            ?.length ||
        0;


    return (
        part1 +
        part2 +
        part3
    );

}


/* =========================================================
   DISPLAY RESULTS
========================================================= */

function displayResults() {

    const p1Questions =
        state.chapterData
            .part1
            ?.questions
            ?.length ||
        0;


    const p2Questions =
        state.chapterData
            .part2
            ?.questions
            ?.length ||
        0;


    const p3Questions =
        state.chapterData
            .part3
            ?.questions
            ?.length ||
        0;


    const totalQuestions =
        p1Questions +
        p2Questions +
        p3Questions;


    const total =
        state.scores.part1 +
        state.scores.part2 +
        state.scores.part3;


    const percentage =
        totalQuestions > 0
            ? Math.round(
                (
                    total /
                    totalQuestions
                ) * 100
            )
            : 0;


    resultChapter.textContent =
        `Chapter ${state.currentChapter}`;


    part1Score.textContent =
        `${state.scores.part1} / ${p1Questions}`;


    part2Score.textContent =
        `${state.scores.part2} / ${p2Questions}`;


    part3Score.textContent =
        `${state.scores.part3} / ${p3Questions}`;


    totalScore.textContent =
        `${total} / ${totalQuestions}`;


    percentageScore.textContent =
        `${percentage}%`;

}


/* =========================================================
   SAVE SCORE
========================================================= */

async function saveScore() {

    saveStatus.textContent =
        "Saving your score...";


    const maximum =
        getMaximumScore();


    const total =
        state.scores.part1 +
        state.scores.part2 +
        state.scores.part3;


    const percentage =
        maximum > 0
            ? Math.round(
                (
                    total /
                    maximum
                ) * 100
            )
            : 0;


    const data = {

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
            total,

        maximum:
            maximum,

        percentage:
            percentage

    };


    try {

        const result =
            await callAPI(
                "saveScore",
                data
            );


        if (
            result &&
            result.success === true
        ) {

            saveStatus.textContent =
                "✓ Score saved successfully.";

        } else {

            saveStatus.textContent =
                result?.message ||
                "Score could not be saved.";

        }

    } catch (error) {

        console.error(
            "Save score error:",
            error
        );


        saveStatus.textContent =
            "Score could not be saved. Please try again later.";

    }

}


/* =========================================================
   SAVE ANSWER RECORDS
========================================================= */

async function saveAnswerRecords() {

    /*
     * Prevent duplicate submission.
     */

    if (
        state.answerRecordsSaved
    ) {

        console.log(
            "Answer records have already been saved."
        );


        return;

    }


    if (
        !state.chapterData ||
        !state.username ||
        !state.studentClass
    ) {

        console.error(
            "Cannot save answer records: missing test data."
        );


        return;

    }


    const records = [];


    /*
     * Collect all questions from
     * Part 1, Part 2 and Part 3.
     */

    [
        "part1",
        "part2",
        "part3"
    ].forEach(
        part => {

            const questions =
                state.chapterData[
                    part
                ]?.questions ||
                [];


            questions.forEach(
                (
                    question,
                    index
                ) => {

                    /*
                     * Get student's actual answer.
                     *
                     * Blank answer becomes "".
                     */

                    const studentAnswer =
                        state.answers[
                            part
                        ][index] ||
                        [];


                    /*
                     * Convert selected words
                     * to a single string.
                     */

                    const answerText =
                        Array.isArray(
                            studentAnswer
                        )
                            ? studentAnswer.join(" ")
                            : String(
                                studentAnswer ||
                                ""
                            );


                    /*
                     * Question text.
                     */

                    let questionTextValue =
                        question.question ||
                        "";


                    if (
                        !questionTextValue
                    ) {

                        questionTextValue =
                            `Question ${index + 1}`;

                    }


                    /*
                     * Include Part name so
                     * Part 1 / 2 / 3 are clear.
                     */

                    const questionLabel =
                        `${formatPartName(part)} - ${questionTextValue}`;


                    records.push({

                        username:
                            state.username,

                        class:
                            state.studentClass,

                        question:
                            questionLabel,

                        answer:
                            answerText

                    });

                }
            );

        }
    );


    if (
        !records.length
    ) {

        console.warn(
            "No answer records found."
        );


        return;

    }


    console.log(
        "Saving answer records:",
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
                        records

                }
            );


        if (
            result &&
            result.success === true
        ) {

            state.answerRecordsSaved =
                true;


            console.log(
                `✓ ${records.length} answer records saved successfully.`
            );

        } else {

            console.error(
                "Answer records could not be saved:",
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
   FORMAT PART NAME
========================================================= */

function formatPartName(
    part
) {

    if (
        part === "part1"
    ) {

        return "Part 1";

    }


    if (
        part === "part2"
    ) {

        return "Part 2";

    }


    if (
        part === "part3"
    ) {

        return "Part 3";

    }


    return part;

}


/* =========================================================
   LOAD SCORE HISTORY
========================================================= */

async function loadScoreHistory() {

    if (
        !state.username ||
        !state.studentClass
    ) {

        return;

    }


    showScreen(
        historyScreen
    );


    if (historyStudent) {

        historyStudent.textContent =
            `${state.username} • ${state.studentClass}`;

    }


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


    try {

        const result =
            await callAPI(
                "getScoreHistory",
                {

                    username:
                        state.username,

                    class:
                        state.studentClass

                }
            );


        if (
            historyLoading
        ) {

            historyLoading.style.display =
                "none";

        }


        if (
            !result ||
            result.success !== true
        ) {

            if (historyEmpty) {

                historyEmpty.style.display =
                    "block";

                historyEmpty.textContent =
                    result?.message ||
                    "Unable to load score history.";

            }


            return;

        }


        const records =
            Array.isArray(
                result.records
            )
                ? result.records
                : [];


        if (
            !records.length
        ) {

            if (historyEmpty) {

                historyEmpty.style.display =
                    "block";

                historyEmpty.textContent =
                    "No score history yet.";

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


        if (historyEmpty) {

            historyEmpty.style.display =
                "block";

            historyEmpty.textContent =
                "Unable to load score history.";

        }

    }

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
        item => {

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "history-card";


            const total =
                Number(
                    item.total || 0
                );


            const maximum =
                Number(
                    item.maximum || 0
                );


            let percentage =
                Number(
                    item.percentage || 0
                );


            /*
             * Fallback calculation for
             * older records.
             */

            if (
                !percentage &&
                maximum > 0
            ) {

                percentage =
                    Math.round(
                        (
                            total /
                            maximum
                        ) * 100
                    );

            }


            card.innerHTML = `

                <div class="history-card-header">

                    <div>

                        <h3>
                            ${escapeHTML(
                                item.chapter ||
                                "Chapter"
                            )}
                        </h3>

                        <span>
                            ${escapeHTML(
                                item.class ||
                                state.studentClass
                            )}
                        </span>

                    </div>

                    <div class="history-percentage">

                        ${percentage}%

                    </div>

                </div>


                <div class="history-score">

                    <strong>
                        ${total}
                        ${maximum
                            ? ` / ${maximum}`
                            : ""
                        }
                    </strong>

                </div>


                <div class="history-parts">

                    <span>
                        Part 1:
                        ${Number(
                            item.part1 || 0
                        )}
                    </span>

                    <span>
                        Part 2:
                        ${Number(
                            item.part2 || 0
                        )}
                    </span>

                    <span>
                        Part 3:
                        ${Number(
                            item.part3 || 0
                        )}
                    </span>

                </div>


                <div class="history-date">

                    ${formatHistoryDate(
                        item.date
                    )}

                </div>

            `;


            historyList.appendChild(
                card
            );

        }
    );

}


/* =========================================================
   FORMAT HISTORY DATE
========================================================= */

function formatHistoryDate(
    value
) {

    if (!value) {

        return "";

    }


    const date =
        new Date(
            value
        );


    if (
        Number.isNaN(
            date.getTime()
        )
    ) {

        return String(
            value
        );

    }


    return date.toLocaleString();

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


    state.randomOrders = {

        part1: {},
        part2: {},
        part3: {}

    };


    state.scores = {

        part1: 0,
        part2: 0,
        part3: 0

    };


    state.answerRecordsSaved =
        false;


    usernameInput.value =
        "";


    passwordInput.value =
        "";


    loginMessage.textContent =
        "";


    loginMessage.className =
        "message";


    chapterGrid.innerHTML =
        "";


    showScreen(
        loginScreen
    );

}
