/* =========================================================
   CHINESE DAILY TEST
   app.js

   DESIGN-SAFE VERSION
   ---------------------------------------------------------
   Keeps the existing website design/behavior.

   Added / fixed:
   1. Beginner / Speaking class support
   2. Dynamic chapter folders
   3. Score saving with Class
   4. AnswerRecords saving
   5. Answer-area words use word-button design
   6. Highlighted Score History cards
========================================================= */


/* =========================================================
   CONFIGURATION
========================================================= */

const CONFIG = {

    API_URL:
        "https://script.google.com/macros/s/AKfycbwS3UyHA-H6D9nsJ7fO1cm7zPFna8DyGJnKuwdwQPw39WSVSFKaYlVh-qt05qK7S6Bl/exec",

    CHAPTER_PATH:
        "./chapters/",

    TOTAL_CHAPTERS:
        15

};


/* =========================================================
   CLASS CONFIGURATION
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

    randomOrders: {

        part1: {},
        part2: {},
        part3: {}

    },

    answerRecordsSaved: false

};


/* =========================================================
   DOM ELEMENTS
========================================================= */

const loginScreen =
    document.getElementById("loginScreen");

const chapterScreen =
    document.getElementById("chapterScreen");

const testScreen =
    document.getElementById("testScreen");

const resultScreen =
    document.getElementById("resultScreen");

const historyScreen =
    document.getElementById("historyScreen");


const loginForm =
    document.getElementById("loginForm");

const loginMessage =
    document.getElementById("loginMessage");

const loginButton =
    document.getElementById("loginButton");

const usernameInput =
    document.getElementById("username");

const passwordInput =
    document.getElementById("password");

const welcomeUsername =
    document.getElementById("welcomeUsername");

const chapterGrid =
    document.getElementById("chapterGrid");

const logoutButton =
    document.getElementById("logoutButton");

const backToChapters =
    document.getElementById("backToChapters");


const testChapter =
    document.getElementById("testChapter");

const partTitle =
    document.getElementById("partTitle");

const questionCounter =
    document.getElementById("questionCounter");

const progressBar =
    document.getElementById("progressBar");

const questionType =
    document.getElementById("questionType");

const questionText =
    document.getElementById("questionText");

const selectedWords =
    document.getElementById("selectedWords");

const wordBank =
    document.getElementById("wordBank");

const clearAnswer =
    document.getElementById("clearAnswer");

const previousButton =
    document.getElementById("previousButton");

const nextButton =
    document.getElementById("nextButton");

const partTabs =
    document.querySelectorAll(".part-tab");


const resultChapter =
    document.getElementById("resultChapter");

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

const saveStatus =
    document.getElementById("saveStatus");

const backToChapterButton =
    document.getElementById("backToChapterButton");


/* =========================================================
   HISTORY ELEMENTS
========================================================= */

const backFromHistory =
    document.getElementById("backFromHistory");

const historyStudent =
    document.getElementById("historyStudent");

const historyLoading =
    document.getElementById("historyLoading");

const historyEmpty =
    document.getElementById("historyEmpty");

const historyList =
    document.getElementById("historyList");

const chapterHistoryButton =
    document.getElementById("chapterHistoryButton");

const scoreHistoryButton =
    document.getElementById("scoreHistoryButton");


/* =========================================================
   SCREEN MANAGEMENT
========================================================= */

function showScreen(screen) {

    document
        .querySelectorAll(".screen")
        .forEach(item => {

            item.classList.remove("active");

        });


    if (screen) {

        screen.classList.add("active");

    }

}


/* =========================================================
   INITIALIZATION
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        /*
         * Do not generate chapters before login.
         *
         * The student's Class determines:
         *
         * Beginner -> chapters/
         * Speaking -> speaking/
         */

    }
);


/* =========================================================
   GET CURRENT CLASS CONFIG
========================================================= */

function getCurrentClassConfig() {

    return (
        CLASS_CONFIG[state.studentClass] ||
        CLASS_CONFIG.Beginner
    );

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
        getCurrentClassConfig();


    for (
        let i = 1;
        i <= classConfig.totalChapters;
        i++
    ) {

        const card =
            document.createElement("button");


        card.type =
            "button";


        /*
         * KEEP ORIGINAL CLASS
         */
        card.className =
            "chapter-card";


        /*
         * KEEP ORIGINAL DESIGN
         */
        card.innerHTML = `

            <div class="chapter-number">
                CHAPTER ${i}
            </div>

            <h3>
                Chapter ${i}
            </h3>

            <p>
                ${state.studentClass || "Beginner"} Chinese Test
            </p>

        `;


        card.addEventListener(
            "click",
            () => {

                loadChapter(i);

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

loginForm.addEventListener(
    "submit",
    async function(event) {

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
                    result.class ||
                    result.Class ||
                    result.studentClass ||
                    "Beginner";


                welcomeUsername.textContent =
                    state.username;


                /*
                 * Generate the correct number
                 * of chapters AFTER login.
                 */
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


        } catch(error) {

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
);


/* =========================================================
   LOGIN ERROR
========================================================= */

function showLoginError(message) {

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
     * Development mode
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
                "Development mode - answers:",
                data
            );


            return {

                success: true

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
     * Google Apps Script Web App
     *
     * GET is used because Apps Script
     * can redirect POST requests.
     */

    const params =
        new URLSearchParams();


    params.append(
        "action",
        action
    );


    Object.keys(data)
        .forEach(
            key => {

                let value =
                    data[key];


                if (
                    value !== null &&
                    typeof value === "object"
                ) {

                    value =
                        JSON.stringify(value);

                }


                params.append(
                    key,
                    String(value)
                );

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


        if (!response.ok) {

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


    } catch(error) {

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

    try {

        const classConfig =
            getCurrentClassConfig();


        const folder =
            classConfig.folder;


        const fileName =
            `Chapter${chapterNumber}.json`;


        const chapterPath =
            `./${folder}/${fileName}`;


        const response =
            await fetch(
                chapterPath
            );


        if (!response.ok) {

            throw new Error(
                `Could not load ${chapterPath}`
            );

        }


        const data =
            await response.json();


        state.currentChapter =
            chapterNumber;


        state.chapterData =
            data.chapter ||
            data;


        /*
         * Reset test
         */
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


        state.randomOrders = {

            part1: {},
            part2: {},
            part3: {}

        };


        state.answerRecordsSaved =
            false;


        updatePartTabs();


        showScreen(
            testScreen
        );


        renderQuestion();


    } catch(error) {

        console.error(
            "Chapter loading error:",
            error
        );


        alert(

            `Unable to load Chapter ${chapterNumber}.\n\n` +

            `Class: ${state.studentClass}\n` +

            `Expected file: ${
                getCurrentClassConfig().folder
            }/Chapter${chapterNumber}.json`

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


    /*
     * Protect against invalid index.
     */

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


    /*
     * Header
     */

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
        `${
            state.currentQuestionIndex + 1
        } / ${
            questions.length
        }`;


    /*
     * Progress
     */

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


    /*
     * Question text
     */

    questionText.textContent =
        question.question ||
        "Arrange the words correctly.";


    /*
     * Answer area
     */

    renderSelectedWords(
        question
    );


    /*
     * Word bank
     */

    renderWordBank(
        question
    );


    /*
     * Previous
     */

    previousButton.disabled =
        state.currentPart === "part1" &&
        state.currentQuestionIndex === 0;


    /*
     * Next
     */

    nextButton.disabled =
        false;


    if (
        state.currentQuestionIndex ===
        questions.length - 1
    ) {

        if (
            state.currentPart === "part3"
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
   ANSWER AREA
   ---------------------------------------------------------
   IMPORTANT FIX:
   The selected words now use the SAME
   "word-button" class as the word bank.

   This means the existing word-button design
   is automatically applied to both.

   We also keep "word-chip" as a secondary class
   for compatibility.
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


            /*
             * KEY FIX:
             *
             * word-button = same design as word bank
             *
             * word-chip = compatibility class
             */
            chip.className =
                "word-button word-chip";


            chip.textContent =
                word;


            /*
             * Clicking the selected
             * word removes it.
             */
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


    const answer =
        getCurrentAnswer();


    const part =
        state.currentPart;


    const questionIndex =
        state.currentQuestionIndex;


    /*
     * Create random order once.
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
                question.words ||
                []
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
            question.words || [],
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
        let i = shuffled.length - 1;
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
            shuffled[randomIndex];


        shuffled[randomIndex] =
            temporary;

    }


    return shuffled;

}


/* =========================================================
   FIND USED WORD INDEXES
========================================================= */

function getUsedWordIndexes(
    words,
    answer
) {

    const used =
        [];


    const availableIndexes =
        words.map(
            (
                word,
                index
            ) => index
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
        ] =
            [];

    }


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


    state.answers[
        part
    ][
        questionIndex
    ].splice(
        index,
        1
    );


    renderQuestion();

}


/* =========================================================
   CLEAR ANSWER
========================================================= */

clearAnswer.addEventListener(
    "click",
    () => {

        const part =
            state.currentPart;


        const questionIndex =
            state.currentQuestionIndex;


        state.answers[
            part
        ][
            questionIndex
        ] =
            [];


        renderQuestion();

    }
);


/* =========================================================
   NEXT BUTTON
========================================================= */

nextButton.addEventListener(
    "click",
    () => {

        const questions =
            getCurrentQuestions();


        if (
            state.currentQuestionIndex <
            questions.length - 1
        ) {

            state.currentQuestionIndex++;


            renderQuestion();


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
);


/* =========================================================
   PREVIOUS BUTTON
========================================================= */

previousButton.addEventListener(
    "click",
    () => {

        if (
            state.currentQuestionIndex > 0
        ) {

            state.currentQuestionIndex--;


            renderQuestion();


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
);


/* =========================================================
   PART TABS
========================================================= */

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


/* =========================================================
   SWITCH PART
========================================================= */

function switchPart(
    part,
    goToLastQuestion = false
) {

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


    await saveScore();


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
        ]?.questions || [];


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
                ][index] || [];


            const correctAnswers =
                question.answers || [];


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
   DISPLAY RESULTS
========================================================= */

function displayResults() {

    const p1Questions =
        state.chapterData
            .part1
            ?.questions
            ?.length || 0;


    const p2Questions =
        state.chapterData
            .part2
            ?.questions
            ?.length || 0;


    const p3Questions =
        state.chapterData
            .part3
            ?.questions
            ?.length || 0;


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

    if (saveStatus) {

        saveStatus.textContent =
            "Saving your score...";

    }


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
            state.scores.part1 +
            state.scores.part2 +
            state.scores.part3

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

            if (saveStatus) {

                saveStatus.textContent =
                    "✓ Score saved successfully.";

            }

        } else {

            if (saveStatus) {

                saveStatus.textContent =
                    result?.message ||
                    "Score could not be saved.";

            }

        }


    } catch(error) {

        console.error(
            error
        );


        if (saveStatus) {

            saveStatus.textContent =
                "Score could not be saved. Please try again later.";

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


    const records =
        [];


    const parts = [

        {
            key: "part1",
            name: "Part 1 - Translation"
        },

        {
            key: "part2",
            name: "Part 2 - Answer the Question"
        },

        {
            key: "part3",
            name: "Part 3 - Scramble"
        }

    ];


    parts.forEach(
        part => {

            const questions =
                state.chapterData[
                    part.key
                ]?.questions || [];


            questions.forEach(
                (
                    question,
                    index
                ) => {

                    const studentAnswer =
                        state.answers[
                            part.key
                        ][index] || [];


                    records.push({

                        question:
                            `${part.name} - ${
                                question.question ||
                                "Question"
                            }`,

                        answer:
                            studentAnswer.join(" ")

                    });

                }
            );

        }
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

        }


    } catch(error) {

        console.error(
            "Answer records could not be saved:",
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

        return "Part 1 - Translation";

    }


    if (
        part === "part2"
    ) {

        return "Part 2 - Answer the Question";

    }


    if (
        part === "part3"
    ) {

        return "Part 3 - Scramble";

    }


    return part;

}


/* =========================================================
   SCORE HISTORY
========================================================= */

async function loadHistory() {

    if (!historyScreen) {

        return;

    }


    showScreen(
        historyScreen
    );


    if (historyStudent) {

        historyStudent.textContent =
            state.username;

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


        if (historyLoading) {

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
                    "Unable to load score history.";

            }

            return;

        }


        const records =
            result.records ||
            [];


        if (
            records.length === 0
        ) {

            if (historyEmpty) {

                historyEmpty.style.display =
                    "block";

                historyEmpty.textContent =
                    "No score history yet.";

            }

            return;

        }


        renderHistory(
            records
        );


    } catch(error) {

        console.error(
            "History error:",
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
   ---------------------------------------------------------
   DESIGN FIX:
   Instead of plain text, every result is a complete
   highlighted card.

   No CSS file changes are required.
========================================================= */

function renderHistory(
    records
) {

    if (!historyList) {

        return;

    }


    historyList.innerHTML =
        "";


    records.forEach(
        record => {

            const card =
                document.createElement(
                    "div"
                );


            /*
             * Keep a normal semantic class too,
             * so existing CSS can still apply.
             */
            card.className =
                "history-card";


            /*
             * Card styling is intentionally
             * generated here because the user
             * requested this fix in app.js only.
             */
            card.style.background =
                "#ffffff";

            card.style.border =
                "1px solid #e4e4e4";

            card.style.borderRadius =
                "16px";

            card.style.padding =
                "18px";

            card.style.marginBottom =
                "14px";

            card.style.boxShadow =
                "0 4px 14px rgba(0,0,0,0.07)";


            const chapter =
                record.chapter ||
                "Chapter";


            const date =
                record.date ||
                record.Date ||
                "";


            const p1 =
                record.part1 ??
                record["Part 1 Score"] ??
                0;


            const p2 =
                record.part2 ??
                record["Part 2 Score"] ??
                0;


            const p3 =
                record.part3 ??
                record["Part 3 Score"] ??
                0;


            const total =
                record.total ??
                record.Total ??
                0;


            const maximum =
                record.maximum ??
                record.Maximum ??
                (
                    Number(p1) +
                    Number(p2) +
                    Number(p3)
                );


            let percentage =
                record.percentage ??
                record.Percentage;


            if (
                percentage === undefined ||
                percentage === null ||
                percentage === ""
            ) {

                percentage =
                    maximum > 0

                        ? Math.round(
                            (
                                Number(total) /
                                Number(maximum)
                            ) * 100
                        )

                        : 0;

            }


            /*
             * HISTORY CARD HTML
             */

            card.innerHTML = `

                <div
                    class="history-card-header"
                    style="
                        display:flex;
                        justify-content:space-between;
                        align-items:center;
                        gap:12px;
                        margin-bottom:16px;
                    "
                >

                    <div>

                        <div
                            class="history-chapter"
                            style="
                                font-size:19px;
                                font-weight:800;
                                color:#222;
                                margin-bottom:5px;
                            "
                        >
                            ${escapeHTML(
                                String(chapter)
                            )}
                        </div>

                        <div
                            class="history-date"
                            style="
                                font-size:12px;
                                color:#888;
                            "
                        >
                            ${escapeHTML(
                                String(date)
                            )}
                        </div>

                    </div>


                    <div
                        class="history-percentage"
                        style="
                            min-width:72px;
                            text-align:center;
                            padding:9px 10px;
                            border-radius:12px;
                            background:#f3f3f3;
                            font-size:20px;
                            font-weight:800;
                            color:#222;
                        "
                    >
                        ${escapeHTML(
                            String(percentage)
                        )}%
                    </div>

                </div>


                <div
                    class="history-total-box"
                    style="
                        display:flex;
                        justify-content:space-between;
                        align-items:center;
                        gap:12px;
                        padding:13px 14px;
                        border-radius:12px;
                        background:#f7f7f7;
                        margin-bottom:13px;
                    "
                >

                    <span
                        style="
                            font-size:13px;
                            font-weight:600;
                            color:#777;
                        "
                    >
                        Total Score
                    </span>

                    <strong
                        style="
                            font-size:20px;
                            font-weight:800;
                            color:#222;
                        "
                    >
                        ${escapeHTML(
                            String(total)
                        )}
                        /
                        ${escapeHTML(
                            String(maximum)
                        )}
                    </strong>

                </div>


                <div
                    class="history-parts"
                    style="
                        display:grid;
                        grid-template-columns:
                            repeat(3, 1fr);
                        gap:8px;
                    "
                >

                    <div
                        class="history-part"
                        style="
                            text-align:center;
                            padding:10px 6px;
                            border-radius:10px;
                            background:#fafafa;
                            border:1px solid #eeeeee;
                        "
                    >

                        <div
                            style="
                                font-size:11px;
                                color:#888;
                                margin-bottom:4px;
                                font-weight:600;
                            "
                        >
                            Part 1
                        </div>

                        <strong
                            style="
                                font-size:15px;
                                color:#222;
                            "
                        >
                            ${escapeHTML(
                                String(p1)
                            )}
                        </strong>

                    </div>


                    <div
                        class="history-part"
                        style="
                            text-align:center;
                            padding:10px 6px;
                            border-radius:10px;
                            background:#fafafa;
                            border:1px solid #eeeeee;
                        "
                    >

                        <div
                            style="
                                font-size:11px;
                                color:#888;
                                margin-bottom:4px;
                                font-weight:600;
                            "
                        >
                            Part 2
                        </div>

                        <strong
                            style="
                                font-size:15px;
                                color:#222;
                            "
                        >
                            ${escapeHTML(
                                String(p2)
                            )}
                        </strong>

                    </div>


                    <div
                        class="history-part"
                        style="
                            text-align:center;
                            padding:10px 6px;
                            border-radius:10px;
                            background:#fafafa;
                            border:1px solid #eeeeee;
                        "
                    >

                        <div
                            style="
                                font-size:11px;
                                color:#888;
                                margin-bottom:4px;
                                font-weight:600;
                            "
                        >
                            Part 3
                        </div>

                        <strong
                            style="
                                font-size:15px;
                                color:#222;
                            "
                        >
                            ${escapeHTML(
                                String(p3)
                            )}
                        </strong>

                    </div>

                </div>

            `;


            historyList.appendChild(
                card
            );

        }
    );

}


/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeHTML(
    value
) {

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


/* =========================================================
   HISTORY BUTTONS
========================================================= */

if (
    chapterHistoryButton
) {

    chapterHistoryButton.addEventListener(
        "click",
        () => {

            loadHistory();

        }
    );

}


if (
    scoreHistoryButton
) {

    scoreHistoryButton.addEventListener(
        "click",
        () => {

            loadHistory();

        }
    );

}


/* =========================================================
   BACK FROM HISTORY
========================================================= */

if (
    backFromHistory
) {

    backFromHistory.addEventListener(
        "click",
        () => {

            showScreen(
                chapterScreen
            );

        }
    );

}


/* =========================================================
   BACK TO CHAPTERS
========================================================= */

backToChapters.addEventListener(
    "click",
    () => {

        showScreen(
            chapterScreen
        );

    }
);


backToChapterButton.addEventListener(
    "click",
    () => {

        showScreen(
            chapterScreen
        );

    }
);


/* =========================================================
   LOGOUT
========================================================= */

logoutButton.addEventListener(
    "click",
    () => {

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
            part3: 0

        };


        state.randomOrders = {

            part1: {},
            part2: {},
            part3: {}

        };


        state.answerRecordsSaved =
            false;


        usernameInput.value =
            "";


        passwordInput.value =
            "";


        loginMessage.textContent =
            "";


        showScreen(
            loginScreen
        );

    }
);
