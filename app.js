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
    Intermediate will be added later.

    Example:

    Intermediate: {
        folder: "intermediate",
        totalChapters: 30
    }
    */

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
    },

    /*
     * Stores the randomized display order.
     *
     * Example:
     *
     * randomOrders.part1[0]
     *
     * contains the randomized word objects
     * for Part 1 Question 1.
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

document.addEventListener(
    "DOMContentLoaded",
    () => {

        generateChapterButtons();

    }
);


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


        if (
            !username ||
            !password
        ) {

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

                welcomeUsername.textContent =
                    state.username;

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
                    data.username

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


        return {
            success: true
        };

    }


    /*
     * Create GET parameters
     */

    const params =
        new URLSearchParams();


    params.append(
        "action",
        action
    );


    Object.keys(data).forEach(
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


    /*
     * Build URL
     */

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
            data.chapter ||
            data;


        /*
         * Reset test
         */

        state.currentPart =
            "part1";

        state.currentQuestionIndex =
            0;


        /*
         * Reset answers
         */

        state.answers = {

            part1: {},
            part2: {},
            part3: {}

        };


        /*
         * Reset scores
         */

        state.scores = {

            part1: 0,
            part2: 0,
            part3: 0

        };


        /*
         * IMPORTANT:
         * Reset randomized word order.
         *
         * Every time a student starts a chapter,
         * the word positions will be randomized again.
         */

        state.randomOrders = {

            part1: {},
            part2: {},
            part3: {}

        };


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
            `Make sure chapters/Chapter${chapterNumber}.json exists.`
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
        ]?.questions || []
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
     * Selected answer
     */

    renderSelectedWords(
        question
    );


    /*
     * Randomized word bank
     */

    renderWordBank(
        question
    );


    /*
     * Previous button
     */

    previousButton.disabled =
        state.currentQuestionIndex === 0;


    /*
     * Next button
     */

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

function renderSelectedWords(
    question
) {

    selectedWords.innerHTML = "";


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
   RANDOMIZED DISPLAY
========================================================= */

function renderWordBank(
    question
) {

    /*
     * Clear current buttons
     */

    wordBank.innerHTML = "";


    /*
     * Current part
     */

    const part =
        state.currentPart;


    /*
     * Current question number
     */

    const questionIndex =
        state.currentQuestionIndex;


    /*
     * Current student answer
     */

    const answer =
        getCurrentAnswer();


    /*
     * -----------------------------------------------------
     * CREATE RANDOM ORDER
     * -----------------------------------------------------
     *
     * This happens ONLY once for each question.
     *
     * Therefore:
     *
     * Question 1:
     *     random order is created
     *
     * Question 1 again:
     *     SAME random order is used
     *
     * New test:
     *     NEW random order
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
                question.words
            );

    }


    /*
     * Get randomized items
     */

    const randomizedWords =
        state.randomOrders[
            part
        ][
            questionIndex
        ];


    /*
     * Find selected words
     */

    const usedIndexes =
        getUsedWordIndexes(
            question.words,
            answer
        );


    /*
     * -----------------------------------------------------
     * DISPLAY RANDOMIZED WORDS
     * -----------------------------------------------------
     */

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


            /*
             * Display the actual word
             */

            button.textContent =
                item.word;


            /*
             * Selected state
             */

            if (
                usedIndexes.includes(
                    item.originalIndex
                )
            ) {

                button.classList.add(
                    "selected"
                );

            }


            /*
             * Click event
             */

            button.addEventListener(
                "click",
                () => {

                    /*
                     * Prevent selecting the
                     * same word again.
                     */

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


            /*
             * Add button to screen
             */

            wordBank.appendChild(
                button
            );

        }
    );

}


/* =========================================================
   SHUFFLE WORDS
========================================================= */

/*
 * IMPORTANT:
 *
 * This function does NOT modify question.words.
 *
 * It creates a completely separate array.
 *
 * Example:
 *
 * JSON:
 *
 * [
 *   "wǒ",
 *   "xǐhuān",
 *   "nǐ",
 *   "tā"
 * ]
 *
 * Could become:
 *
 * [
 *   {
 *      word: "tā",
 *      originalIndex: 3
 *   },
 *   {
 *      word: "nǐ",
 *      originalIndex: 2
 *   },
 *   {
 *      word: "wǒ",
 *      originalIndex: 0
 *   },
 *   {
 *      word: "xǐhuān",
 *      originalIndex: 1
 *   }
 * ]
 *
 */

function shuffleWords(
    words
) {

    /*
     * Create independent objects.
     */

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


    /*
     * Fisher-Yates shuffle
     */

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


    /*
     * DEBUG:
     * You can see the random order
     * in browser Console.
     */

    console.log(
        "Randomized words:",
        shuffled.map(
            item => item.word
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


    /*
     * Keep track of indexes that are available.
     */

    const availableIndexes =
        words.map(
            (
                word,
                index
            ) => index
        );


    /*
     * Find each selected word.
     *
     * This also supports duplicate words.
     */

    answer.forEach(
        word => {

            const matchingPosition =
                availableIndexes.findIndex(
                    index =>
                        words[index] === word
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


    /*
     * Add selected word to answer
     */

    state.answers[
        part
    ][
        questionIndex
    ].push(
        word
    );


    /*
     * Re-render.
     *
     * Random order is NOT regenerated because
     * randomOrders already contains this question.
     */

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


        /*
         * Next question
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
         * Part 3 → Finish
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

        /*
         * Previous question
         */

        if (
            state.currentQuestionIndex > 0
        ) {

            state.currentQuestionIndex--;


            renderQuestion();


            return;

        }


        /*
         * Part 2 → Part 1
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
         * Part 3 → Part 2
         */

        if (
            state.currentPart ===
            "part3"
        ) {

            switchPart(
                "part2",
                true
            );


            return;

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


    let score = 0;


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

        console.error(
            "Save score error:",
            error
        );


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
