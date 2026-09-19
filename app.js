/* =========================================================
   CHINESE DAILY TEST
   app.js

   IMPORTANT:
   When we create Google Apps Script later,
   you ONLY need to change API_URL below.

   Do NOT change the login or score functions.
========================================================= */


/* =========================================================
   CONFIGURATION
========================================================= */

const CONFIG = {

    // =====================================================
    // GOOGLE APPS SCRIPT API
    // Replace ONLY this URL later.
    // =====================================================

    API_URL: "https://script.google.com/macros/s/AKfycbwS3UyHA-h6D9nsJ7fO1cm7zPFna8DyGJnKuwdwQPw39WSVSFKaYlVh-qt05qK7S6Bl/exec",

    // =====================================================
    // JSON FILE LOCATION
    // =====================================================

    CHAPTER_PATH: "./chapters/",

    // =====================================================
    // TOTAL CHAPTERS
    // =====================================================

    TOTAL_CHAPTERS: 15

};


/* =========================================================
   APPLICATION STATE
========================================================= */

const state = {

    username: null,

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

    }

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
   SCREEN MANAGEMENT
========================================================= */

function showScreen(screen) {

    document
        .querySelectorAll(".screen")
        .forEach(item => {
            item.classList.remove("active");
        });

    screen.classList.add("active");

}


/* =========================================================
   INITIALIZATION
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    generateChapterButtons();

});


/* =========================================================
   GENERATE CHAPTER BUTTONS
========================================================= */

function generateChapterButtons() {

    chapterGrid.innerHTML = "";

    for (
        let i = 1;
        i <= CONFIG.TOTAL_CHAPTERS;
        i++
    ) {

        const card =
            document.createElement("button");

        card.className = "chapter-card";

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
            () => loadChapter(i)
        );

        chapterGrid.appendChild(card);

    }

}


/* =========================================================
   LOGIN
========================================================= */

loginForm.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();

        const username =
            usernameInput.value.trim();

        const password =
            passwordInput.value;

        if (!username || !password) {

            showLoginError(
                "Please enter username and password."
            );

            return;

        }

        loginButton.disabled = true;

        loginButton.textContent =
            "Logging in...";

        loginMessage.textContent = "";

        try {

            /*
             * API FORMAT
             *
             * Code.gs receives:
             *
             * action=login
             * username=...
             * password=...
             */

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
                    result.username || username;

                welcomeUsername.textContent =
                    state.username;

                showScreen(chapterScreen);

            } else {

                showLoginError(
                    result?.message ||
                    "Invalid username or password."
                );

            }

        } catch (error) {

            console.error(error);

            showLoginError(
                "Unable to connect to the server."
            );

        } finally {

            loginButton.disabled = false;

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
   API FUNCTION
========================================================= */

/*
 * This is the ONLY function that communicates
 * with Google Apps Script.
 *
 * IMPORTANT:
 * We use GET parameters here instead of POST.
 *
 * This avoids the Google Apps Script redirect
 * problem that was causing the 404 error.
 */

async function callAPI(action, data = {}) {

    /*
     * Development mode
     */

    if (
        !CONFIG.API_URL ||
        CONFIG.API_URL ===
        "YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL"
    ) {

        /*
         * Temporary development mode.
         */

        if (action === "login") {

            return {

                success: true,

                username:
                    data.username

            };

        }

        if (action === "saveScore") {

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

        return {

            success: true

        };

    }


    /*
     * Create URL parameters
     */

    const params =
        new URLSearchParams();

    params.append(
        "action",
        action
    );


    /*
     * Add all data
     */

    Object.keys(data).forEach(
        key => {

            let value =
                data[key];

            /*
             * Convert objects / arrays
             * into JSON strings.
             */

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


    /*
     * Build GET URL
     */

    const url =
        `${CONFIG.API_URL}?${params.toString()}`;


    console.log(
        "API Request:",
        url
    );


    try {

        /*
         * Send GET request
         */

        const response =
            await fetch(
                url,
                {
                    method: "GET",
                    cache: "no-store"
                }
            );


        /*
         * Check HTTP status
         */

        if (!response.ok) {

            throw new Error(
                `API Error: ${response.status}`
            );

        }


        /*
         * Convert response to JSON
         */

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

async function loadChapter(chapterNumber) {

    try {

        const fileName =
            `Chapter${chapterNumber}.json`;

        const response =
            await fetch(
                `${CONFIG.CHAPTER_PATH}${fileName}`
            );

        if (!response.ok) {

            throw new Error(
                `Could not load ${fileName}`
            );

        }

        const data =
            await response.json();


        state.currentChapter =
            chapterNumber;

        state.chapterData =
            data.chapter || data;


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


        updatePartTabs();

        showScreen(testScreen);

        renderQuestion();

    } catch (error) {

        console.error(error);

        alert(
            `Unable to load Chapter ${chapterNumber}.\n\n` +
            `Make sure chapters/Chapter${chapterNumber}.json exists.`
        );

    }

}


/* =========================================================
   GET CURRENT QUESTIONS
========================================================= */

function getCurrentQuestions() {

    if (!state.chapterData) {

        return [];

    }

    return (
        state.chapterData[
            state.currentPart
        ]?.questions || []
    );

}


/* =========================================================
   RENDER QUESTION
========================================================= */

function renderQuestion() {

    const questions =
        getCurrentQuestions();

    if (!questions.length) {

        questionText.textContent =
            "No questions available.";

        wordBank.innerHTML = "";

        return;

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
        `${state.currentQuestionIndex + 1} / ${questions.length}`;


    /*
     * Progress
     */

    const progress =
        (
            (state.currentQuestionIndex + 1)
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
     * Render answer
     */

    renderSelectedWords(question);


    /*
     * Render word bank
     */

    renderWordBank(question);


    /*
     * Buttons
     */

    previousButton.disabled =
        state.currentQuestionIndex === 0;


    if (
        state.currentQuestionIndex ===
        questions.length - 1
    ) {

        nextButton.textContent =
            "Finish Part →";

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
        ][index] || []
    );

}


/* =========================================================
   RENDER SELECTED WORDS
========================================================= */

function renderSelectedWords(question) {

    selectedWords.innerHTML = "";

    const answer =
        getCurrentAnswer();


    if (!answer.length) {

        selectedWords.innerHTML = `
            <span class="empty-answer">
                Tap the words below
            </span>
        `;

        return;

    }


    answer.forEach(
        (word, index) => {

            const chip =
                document.createElement("button");

            chip.className =
                "word-chip";

            chip.textContent =
                word;


            /*
             * Clicking selected word
             * removes it.
             */

            chip.addEventListener(
                "click",
                () => {

                    removeWord(index);

                }
            );

            selectedWords.appendChild(chip);

        }
    );

}


/* =========================================================
   RENDER WORD BANK
========================================================= */

function renderWordBank(question) {

    wordBank.innerHTML = "";

    const answer =
        getCurrentAnswer();


    /*
     * We need to support duplicate words.
     * Each word gets an index.
     */

    const usedIndexes =
        getUsedWordIndexes(
            question.words,
            answer
        );


    question.words.forEach(
        (word, index) => {

            const button =
                document.createElement("button");

            button.className =
                "word-button";

            button.textContent =
                word;


            if (
                usedIndexes.includes(index)
            ) {

                button.classList.add(
                    "selected"
                );

            }


            button.addEventListener(
                "click",
                () => {

                    if (
                        usedIndexes.includes(index)
                    ) {

                        return;

                    }

                    addWord(
                        word,
                        index
                    );

                }
            );


            wordBank.appendChild(button);

        }
    );

}


/* =========================================================
   FIND USED WORD INDEXES
========================================================= */

function getUsedWordIndexes(
    words,
    answer
) {

    const used = [];

    const remaining =
        [...words];


    answer.forEach(
        word => {

            const index =
                remaining.indexOf(word);

            if (index !== -1) {

                const originalIndex =
                    words.findIndex(
                        (item, i) =>
                            item === word &&
                            !used.includes(i)
                    );

                if (
                    originalIndex !== -1
                ) {

                    used.push(
                        originalIndex
                    );

                }

                remaining.splice(
                    index,
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
        !state.answers[part][questionIndex]
    ) {

        state.answers[part][questionIndex] =
            [];

    }


    state.answers[
        part
    ][
        questionIndex
    ].push(word);


    renderQuestion();

}


/* =========================================================
   REMOVE WORD
========================================================= */

function removeWord(index) {

    const part =
        state.currentPart;

    const questionIndex =
        state.currentQuestionIndex;


    state.answers[
        part
    ][
        questionIndex
    ].splice(index, 1);


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
        ] = [];


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


        /*
         * Current part finished.
         */

        if (
            state.currentPart === "part1"
        ) {

            switchPart("part2");

            return;

        }


        if (
            state.currentPart === "part2"
        ) {

            switchPart("part3");

            return;

        }


        /*
         * Part 3 finished.
         */

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


        /*
         * If at beginning of a part,
         * move to previous part.
         */

        if (
            state.currentPart === "part2"
        ) {

            switchPart(
                "part1",
                true
            );

        } else if (
            state.currentPart === "part3"
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


                /*
                 * Students can navigate
                 * directly between parts.
                 */

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


    if (goToLastQuestion) {

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

    showScreen(resultScreen);

    await saveScore();

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

function calculatePartScore(part) {

    const questions =
        state.chapterData[
            part
        ]?.questions || [];


    let score = 0;


    questions.forEach(
        (question, index) => {

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


            if (isCorrect) {

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
        (value, index) =>
            value === second[index]
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
                (total / totalQuestions) * 100
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


    const data = {

        username:
            state.username,

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

            saveStatus.textContent =
                "✓ Score saved successfully.";

        } else {

            saveStatus.textContent =
                result?.message ||
                "Score could not be saved.";

        }

    } catch (error) {

        console.error(error);

        saveStatus.textContent =
            "Score could not be saved. Please try again later.";

    }

}


/* =========================================================
   BACK TO CHAPTERS
========================================================= */

backToChapters.addEventListener(
    "click",
    () => {

        showScreen(chapterScreen);

    }
);


backToChapterButton.addEventListener(
    "click",
    () => {

        showScreen(chapterScreen);

    }
);


/* =========================================================
   LOGOUT
========================================================= */

logoutButton.addEventListener(
    "click",
    () => {

        state.username = null;

        state.currentChapter = null;

        state.chapterData = null;


        usernameInput.value = "";

        passwordInput.value = "";

        loginMessage.textContent = "";


        showScreen(loginScreen);

    }
);
