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
        part3: 0,
        total: 0

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
         * Chapters are generated after login.
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


    chapterGrid.innerHTML =
        "";


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

if (loginForm) {

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

}


/* =========================================================
   LOGIN ERROR
========================================================= */

function showLoginError(message) {

    if (!loginMessage) {

        return;

    }


    loginMessage.textContent =
        message;


    loginMessage.className =
        "message error";

}


/* =========================================================
   GOOGLE APPS SCRIPT API
   IMPORTANT:
   This is POST, not GET.
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


    Object.keys(data).forEach(
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


    if (
        !response.ok
    ) {

        throw new Error(
            `Server returned ${response.status}.`
        );

    }


    const text =
        await response.text();


    let result;


    try {

        result =
            JSON.parse(text);

    } catch(error) {

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

    try {

        const classConfig =
            getCurrentClassConfig();


        const fileName =
            `Chapter${chapterNumber}.json`;


        const chapterPath =
            `./${classConfig.folder}/${fileName}`;


        const response =
            await fetch(
                chapterPath
            );


        if (
            !response.ok
        ) {

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

            `Make sure this file exists:\n` +

            `${getCurrentClassConfig().folder}/Chapter${chapterNumber}.json`

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

        if (questionText) {

            questionText.textContent =
                "No questions available.";

        }


        if (questionCounter) {

            questionCounter.textContent =
                "0 / 0";

        }


        if (progressBar) {

            progressBar.style.width =
                "0%";

        }


        if (selectedWords) {

            selectedWords.innerHTML =
                "";

        }


        if (wordBank) {

            wordBank.innerHTML =
                "";

        }


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


    if (testChapter) {

        testChapter.textContent =
            `Chapter ${state.currentChapter}`;

    }


    if (partTitle) {

        partTitle.textContent =
            state.chapterData[
                state.currentPart
            ]?.title ||
            "Test";

    }


    if (questionType) {

        questionType.textContent =
            state.chapterData[
                state.currentPart
            ]?.title ||
            "Question";

    }


    if (questionCounter) {

        questionCounter.textContent =
            `${
                state.currentQuestionIndex + 1
            } / ${
                questions.length
            }`;

    }


    if (progressBar) {

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

    }


    if (questionText) {

        questionText.textContent =
            question.question ||
            "Arrange the words correctly.";

    }


    renderSelectedWords(
        question
    );


    renderWordBank(
        question
    );


    if (previousButton) {

        previousButton.disabled =
            state.currentPart === "part1" &&
            state.currentQuestionIndex === 0;

    }


    if (nextButton) {

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
   FIX:
   Uses word-button + selected-word
========================================================= */

function renderSelectedWords(
    question
) {

    if (!selectedWords) {

        return;

    }


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

            const button =
                document.createElement(
                    "button"
                );


            button.type =
                "button";


            /*
             * SAME DESIGN AS WORD BANK
             */
            button.className =
                "word-button selected-word";


            button.textContent =
                word;


            button.addEventListener(
                "click",
                () => {

                    removeWord(
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


    const answer =
        getCurrentAnswer();


    const part =
        state.currentPart;


    const questionIndex =
        state.currentQuestionIndex;


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
            question.words ||
            [],
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
   GET USED WORD INDEXES
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

if (clearAnswer) {

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


    /*
     * Last question of current part.
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
     * Last question of Part 3.
     */

    finishTest();

}


/* =========================================================
   FINISH TEST
========================================================= */

async function finishTest() {

    /*
     * Prevent double submission.
     */

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


    /*
     * Save score automatically.
     */

    await saveScore();

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
   ANSWER NORMALIZATION
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


    /*
     * If there is no answer key,
     * do not automatically mark it.
     */

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


        if (
            historyLoading
        ) {

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
         * Code.gs returns the history
         * inside "records".
         *
         * Keep "history" as a fallback
         * so the frontend also works with
         * older API responses.
         */

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
   NORMALIZE HISTORY RECORD
========================================================= */

function normalizeHistoryRecord(
    item
) {

    if (
        !item ||
        typeof item !== "object"
    ) {

        return {

            chapter:
                "Chapter",

            part1: 0,

            part2: 0,

            part3: 0,

            total: 0,

            maximum: 0,

            date: ""

        };

    }


    return {

        chapter:
            item.chapter ??
            item.Chapter ??
            "Chapter",

        part1:
            Number(
                item.part1 ??
                item["Part 1 Score"] ??
                0
            ) || 0,

        part2:
            Number(
                item.part2 ??
                item["Part 2 Score"] ??
                0
            ) || 0,

        part3:
            Number(
                item.part3 ??
                item["Part 3 Score"] ??
                0
            ) || 0,

        total:
            Number(
                item.total ??
                item.Total ??
                0
            ) || 0,

        maximum:
            Number(
                item.maximum ??
                item.Maximum ??
                0
            ) || 0,

        percentage:
            item.percentage ??
            item.Percentage ??
            "",

        date:
            item.date ??
            item.Date ??
            ""

    };

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


    const normalizedHistory =
        history.map(
            normalizeHistoryRecord
        );


    historyList.innerHTML =
        normalizedHistory.map(
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
                            box-shadow:0 5px 18px rgba(0,0,0,0.07);
                            overflow:hidden;
                            box-sizing:border-box;
                            width:100%;
                        "
                    >

                        <div
                            class="history-card-top"
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
                                    class="history-number"
                                    style="
                                        font-size:11px;
                                        font-weight:700;
                                        letter-spacing:1px;
                                        color:#8a8f98;
                                        margin-bottom:5px;
                                    "
                                >
                                    TEST ${normalizedHistory.length - index}
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
                                        String(
                                            item.chapter ||
                                            "Chapter"
                                        )
                                    )}
                                </h3>

                            </div>


                            <div
                                class="history-total"
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
                                ${escapeHTML(
                                    String(
                                        item.total
                                    )
                                )}
                            </div>

                        </div>


                        <div
                            class="history-details"
                            style="
                                display:grid;
                                grid-template-columns:repeat(3,minmax(0,1fr));
                                gap:8px;
                                width:100%;
                                box-sizing:border-box;
                            "
                        >

                            <div
                                class="history-part"
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
                                    Part 1
                                </span>

                                <strong
                                    style="
                                        display:block;
                                        font-size:16px;
                                        color:#222;
                                    "
                                >
                                    ${escapeHTML(
                                        String(
                                            item.part1
                                        )
                                    )}
                                </strong>

                            </div>


                            <div
                                class="history-part"
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
                                    Part 2
                                </span>

                                <strong
                                    style="
                                        display:block;
                                        font-size:16px;
                                        color:#222;
                                    "
                                >
                                    ${escapeHTML(
                                        String(
                                            item.part2
                                        )
                                    )}
                                </strong>

                            </div>


                            <div
                                class="history-part"
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
                                    Part 3
                                </span>

                                <strong
                                    style="
                                        display:block;
                                        font-size:16px;
                                        color:#222;
                                    "
                                >
                                    ${escapeHTML(
                                        String(
                                            item.part3
                                        )
                                    )}
                                </strong>

                            </div>

                        </div>


                        <div
                            class="history-bottom"
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
                                ${percentage}%
                            </strong>

                        </div>

                    </div>
                `;

            }
        )
        .join("");

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


    /*
     * If the API has maximum score,
     * use it.
     */

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


    /*
     * If the API already provides
     * percentage, use that value.
     */

    const apiPercentage =
        Number(
            item?.percentage ??
            item?.Percentage
        );


    if (
        !Number.isNaN(
            apiPercentage
        ) &&
        apiPercentage >= 0
    ) {

        return Math.round(
            apiPercentage
        );

    }


    /*
     * Current Score sheet does not
     * necessarily return maximum.
     *
     * If this is the current chapter,
     * we can calculate the exact maximum.
     */

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


    return 0;

}


/* =========================================================
   GET KNOWN MAXIMUM FOR HISTORY
========================================================= */

function getKnownMaximumForHistoryItem(
    item
) {

    const chapterNumber =
        extractChapterNumber(
            item?.chapter ??
            item?.Chapter
        );


    if (
        !chapterNumber
    ) {

        return 0;

    }


    /*
     * If this is the currently loaded
     * chapter, we know its exact total.
     */

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
            year: "numeric",
            month: "short",
            day: "numeric"
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
