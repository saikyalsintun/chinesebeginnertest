/* =========================================================
   CHINESE DAILY TEST
   app.js

   DESIGN-SAFE VERSION
   ---------------------------------------------------------
   This version keeps the original frontend behavior/design.

   Added only:
   1. Beginner / Speaking class support
   2. Dynamic chapter folder loading
   3. Score saving with Class
   4. AnswerRecords saving
========================================================= */


/* =========================================================
   CONFIGURATION
========================================================= */

const CONFIG = {
    API_URL:
        "https://script.google.com/macros/s/AKfycbwS3UyHA-h6D9nsJ7fO1cm7zPFna8DyGJnKuwdwQPw39WSVSFKaYlVh-qt05qK7S6Bl/exec",

    CHAPTER_PATH: "./chapters/",

    TOTAL_CHAPTERS: 15
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

        if (chapterGrid) {
            chapterGrid.innerHTML = "";
        }

    }
);


/* =========================================================
   GET CLASS CONFIG
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

        card.type = "button";

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
                ${state.studentClass || "Beginner"} Chinese Test
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

                state.studentClass =
                    result.class ||
                    result.Class ||
                    result.studentClass ||
                    "Beginner";

                welcomeUsername.textContent =
                    state.username;

                generateChapterButtons();

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

async function callAPI(
    action,
    data = {}
) {

    if (
        !CONFIG.API_URL ||
        CONFIG.API_URL ===
        "YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL"
    ) {

        if (action === "login") {

            return {
                success: true,
                username: data.username,
                class: "Beginner"
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

        if (action === "saveAnswerRecords") {

            console.log(
                "Development mode - answers:",
                data
            );

            return {
                success: true
            };
        }

        return {
            success: true
        };
    }


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
            data.chapter || data;


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

        showScreen(testScreen);

        renderQuestion();

    } catch (error) {

        console.error(
            "Chapter loading error:",
            error
        );

        alert(
            `Unable to load Chapter ${chapterNumber}.\n\n` +
            `Class: ${state.studentClass}\n` +
            `Expected file: ${state.studentClass === "Speaking"
                ? "speaking"
                : "chapters"
            }/Chapter${chapterNumber}.json`
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
            ) /
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
        ][index] || []
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
                    removeWord(index);
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


    if (
        !state.randomOrders[
            state.currentPart
        ][state.currentQuestionIndex]
    ) {

        state.randomOrders[
            state.currentPart
        ][state.currentQuestionIndex] =
            shuffleWords(
                question.words || []
            );
    }


    const randomizedWords =
        state.randomOrders[
            state.currentPart
        ][state.currentQuestionIndex];


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
            ) => ({
                word: word,
                originalIndex: index
            })
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

        [
            shuffled[i],
            shuffled[randomIndex]
        ] = [
            shuffled[randomIndex],
            shuffled[i]
        ];
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

    const used = [];

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
        ][questionIndex]
    ) {

        state.answers[
            part
        ][questionIndex] =
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


        if (
            state.currentPart === "part1"
        ) {

            switchPart(
                "part2"
            );

            return;
        }


        if (
            state.currentPart === "part2"
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
   SAVE ANSWER RECORDS
========================================================= */

async function saveAnswerRecords() {

    if (
        state.answerRecordsSaved
    ) {

        return;
    }


    const records = [];


    const parts = [
        {
            key: "part1",
            name: "Part 1"
        },
        {
            key: "part2",
            name: "Part 2"
        },
        {
            key: "part3",
            name: "Part 3"
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
                                question.question || ""
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

            console.log(
                "Answer records saved."
            );

        } else {

            console.error(
                "Answer records could not be saved.",
                result
            );
        }

    } catch (error) {

        console.error(
            "Answer record saving error:",
            error
        );
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
   HISTORY BUTTON
========================================================= */

if (chapterHistoryButton) {

    chapterHistoryButton.addEventListener(
        "click",
        () => {

            loadHistory();

        }
    );
}


if (scoreHistoryButton) {

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


/* =========================================================
   LOAD HISTORY
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


        const records =
            result?.records || [];


        if (!records.length) {

            if (historyEmpty) {

                historyEmpty.style.display =
                    "block";
            }

            return;
        }


        renderHistory(
            records
        );

    } catch (error) {

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
                "Unable to load history.";
        }
    }
}


/* =========================================================
   RENDER HISTORY
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

            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "history-item";


            const chapter =
                record.chapter ||
                "Chapter";


            const total =
                record.total ??
                0;


            const maximum =
                record.maximum ??
                0;


            const percentage =
                record.percentage ??
                0;


            const date =
                record.date ||
                "";


            item.innerHTML = `
                <div class="history-item-header">
                    <strong>
                        ${escapeHTML(
                            String(chapter)
                        )}
                    </strong>

                    <span>
                        ${escapeHTML(
                            String(date)
                        )}
                    </span>
                </div>

                <div class="history-score">
                    ${escapeHTML(
                        String(total)
                    )}
                    /
                    ${escapeHTML(
                        String(maximum)
                    )}
                </div>

                <div class="history-percentage">
                    ${escapeHTML(
                        String(percentage)
                    )}%
                </div>
            `;


            historyList.appendChild(
                item
            );
        }
    );
}


/* =========================================================
   HTML ESCAPE
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
