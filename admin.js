/* =========================================================
   ADMIN DASHBOARD
   JAVASCRIPT
========================================================= */


/* =========================================================
   CONFIGURATION
========================================================= */

const ADMIN_CONFIG = {

    API_URL:
        "https://script.google.com/macros/s/AKfycbwS3UyHA-H6D9nsJ7fO1cm7zPFna8DyGJnKuwdwQPw39WSVSFKaYlVh-qt05qK7S6Bl/exec"

};


/* =========================================================
   STATE
========================================================= */

const adminState = {

    username: null,

    class: null,

    users: [],

    scores: [],

    answers: [],

    editingUsername: null,

    currentSection: "users"

};


/* =========================================================
   DOM
========================================================= */

let adminLoginScreen;
let adminDashboardScreen;

let adminLoginForm;
let adminUsername;
let adminPassword;
let adminLoginButton;
let adminLoginMessage;

let adminWelcome;
let adminLogoutButton;

let studentCount;
let scoreCount;
let answerCount;

let adminTabs;

let usersSection;
let scoresSection;
let answersSection;

let userClassFilter;
let userUsernameFilter;
let clearUserFilters;

let scoreClassFilter;
let scoreUsernameFilter;
let clearScoreFilters;

let answerClassFilter;
let answerUsernameFilter;
let clearAnswerFilters;

let usersLoading;
let scoresLoading;
let answersLoading;

let usersTableContainer;
let scoresTableContainer;
let answersTableContainer;

let addUserButton;

let userModal;
let userModalTitle;
let closeUserModal;

let userForm;
let editingUsername;
let userFormUsername;
let userFormPassword;
let userFormClass;
let userFormMessage;

let cancelUserButton;
let saveUserButton;


/* =========================================================
   INITIALIZATION
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    initializeAdmin
);


function initializeAdmin() {

    cacheAdminDOM();

    setupAdminEvents();

}


/* =========================================================
   CACHE DOM
========================================================= */

function cacheAdminDOM() {

    adminLoginScreen =
        document.getElementById(
            "adminLoginScreen"
        );

    adminDashboardScreen =
        document.getElementById(
            "adminDashboardScreen"
        );


    adminLoginForm =
        document.getElementById(
            "adminLoginForm"
        );

    adminUsername =
        document.getElementById(
            "adminUsername"
        );

    adminPassword =
        document.getElementById(
            "adminPassword"
        );

    adminLoginButton =
        document.getElementById(
            "adminLoginButton"
        );

    adminLoginMessage =
        document.getElementById(
            "adminLoginMessage"
        );


    adminWelcome =
        document.getElementById(
            "adminWelcome"
        );

    adminLogoutButton =
        document.getElementById(
            "adminLogoutButton"
        );


    studentCount =
        document.getElementById(
            "studentCount"
        );

    scoreCount =
        document.getElementById(
            "scoreCount"
        );

    answerCount =
        document.getElementById(
            "answerCount"
        );


    adminTabs =
        document.querySelectorAll(
            ".admin-tab"
        );


    usersSection =
        document.getElementById(
            "usersSection"
        );

    scoresSection =
        document.getElementById(
            "scoresSection"
        );

    answersSection =
        document.getElementById(
            "answersSection"
        );


    userClassFilter =
        document.getElementById(
            "userClassFilter"
        );

    userUsernameFilter =
        document.getElementById(
            "userUsernameFilter"
        );

    clearUserFilters =
        document.getElementById(
            "clearUserFilters"
        );


    scoreClassFilter =
        document.getElementById(
            "scoreClassFilter"
        );

    scoreUsernameFilter =
        document.getElementById(
            "scoreUsernameFilter"
        );

    clearScoreFilters =
        document.getElementById(
            "clearScoreFilters"
        );


    answerClassFilter =
        document.getElementById(
            "answerClassFilter"
        );

    answerUsernameFilter =
        document.getElementById(
            "answerUsernameFilter"
        );

    clearAnswerFilters =
        document.getElementById(
            "clearAnswerFilters"
        );


    usersLoading =
        document.getElementById(
            "usersLoading"
        );

    scoresLoading =
        document.getElementById(
            "scoresLoading"
        );

    answersLoading =
        document.getElementById(
            "answersLoading"
        );


    usersTableContainer =
        document.getElementById(
            "usersTableContainer"
        );

    scoresTableContainer =
        document.getElementById(
            "scoresTableContainer"
        );

    answersTableContainer =
        document.getElementById(
            "answersTableContainer"
        );


    addUserButton =
        document.getElementById(
            "addUserButton"
        );


    userModal =
        document.getElementById(
            "userModal"
        );

    userModalTitle =
        document.getElementById(
            "userModalTitle"
        );

    closeUserModal =
        document.getElementById(
            "closeUserModal"
        );


    userForm =
        document.getElementById(
            "userForm"
        );

    editingUsername =
        document.getElementById(
            "editingUsername"
        );

    userFormUsername =
        document.getElementById(
            "userFormUsername"
        );

    userFormPassword =
        document.getElementById(
            "userFormPassword"
        );

    userFormClass =
        document.getElementById(
            "userFormClass"
        );

    userFormMessage =
        document.getElementById(
            "userFormMessage"
        );


    cancelUserButton =
        document.getElementById(
            "cancelUserButton"
        );

    saveUserButton =
        document.getElementById(
            "saveUserButton"
        );

}


/* =========================================================
   EVENT LISTENERS
========================================================= */

function setupAdminEvents() {

    if (adminLoginForm) {

        adminLoginForm.addEventListener(
            "submit",
            handleAdminLogin
        );

    }


    if (adminLogoutButton) {

        adminLogoutButton.addEventListener(
            "click",
            logoutAdmin
        );

    }


    adminTabs.forEach(
        tab => {

            tab.addEventListener(
                "click",
                () => {

                    switchAdminSection(
                        tab.dataset.section
                    );

                }
            );

        }
    );


    if (userClassFilter) {

        userClassFilter.addEventListener(
            "change",
            renderUsers
        );

    }


    if (userUsernameFilter) {

        userUsernameFilter.addEventListener(
            "input",
            renderUsers
        );

    }


    if (clearUserFilters) {

        clearUserFilters.addEventListener(
            "click",
            () => {

                userClassFilter.value =
                    "";

                userUsernameFilter.value =
                    "";

                renderUsers();

            }
        );

    }


    if (scoreClassFilter) {

        scoreClassFilter.addEventListener(
            "change",
            renderScores
        );

    }


    if (scoreUsernameFilter) {

        scoreUsernameFilter.addEventListener(
            "input",
            renderScores
        );

    }


    if (clearScoreFilters) {

        clearScoreFilters.addEventListener(
            "click",
            () => {

                scoreClassFilter.value =
                    "";

                scoreUsernameFilter.value =
                    "";

                renderScores();

            }
        );

    }


    if (answerClassFilter) {

        answerClassFilter.addEventListener(
            "change",
            renderAnswers
        );

    }


    if (answerUsernameFilter) {

        answerUsernameFilter.addEventListener(
            "input",
            renderAnswers
        );

    }


    if (clearAnswerFilters) {

        clearAnswerFilters.addEventListener(
            "click",
            () => {

                answerClassFilter.value =
                    "";

                answerUsernameFilter.value =
                    "";

                renderAnswers();

            }
        );

    }


    if (addUserButton) {

        addUserButton.addEventListener(
            "click",
            openAddUserModal
        );

    }


    if (closeUserModal) {

        closeUserModal.addEventListener(
            "click",
            closeUserModalWindow
        );

    }


    if (cancelUserButton) {

        cancelUserButton.addEventListener(
            "click",
            closeUserModalWindow
        );

    }


    if (userForm) {

        userForm.addEventListener(
            "submit",
            saveUser
        );

    }


    if (userModal) {

        userModal.addEventListener(
            "click",
            event => {

                if (
                    event.target ===
                    userModal
                ) {

                    closeUserModalWindow();

                }

            }
        );

    }

}


/* =========================================================
   ADMIN LOGIN
========================================================= */

async function handleAdminLogin(
    event
) {

    event.preventDefault();


    const username =
        String(
            adminUsername?.value ||
            ""
        ).trim();


    const password =
        String(
            adminPassword?.value ||
            ""
        );


    hideAdminLoginMessage();


    if (
        !username ||
        !password
    ) {

        showAdminLoginMessage(
            "Please enter username and password."
        );

        return;

    }


    setAdminLoginLoading(
        true
    );


    try {

        /*
         * The backend must verify:
         *
         * username
         * password
         * Class = Admin
         *
         * using the existing Login sheet.
         */

        const result =
            await adminAPI(
                "adminLogin",
                {

                    username:
                        username,

                    password:
                        password

                }
            );


        console.log(
            "ADMIN LOGIN RESPONSE:",
            result
        );


        if (
            !result ||
            result.success !== true
        ) {

            showAdminLoginMessage(
                result?.message ||
                "Invalid administrator account."
            );

            return;

        }


        const returnedClass =
            String(
                result.class ||
                ""
            ).trim();


        /*
         * Additional frontend protection.
         */

        if (
            returnedClass.toLowerCase() !==
            "admin"
        ) {

            showAdminLoginMessage(
                "This account does not have administrator access."
            );

            return;

        }


        adminState.username =
            result.username ||
            username;


        adminState.class =
            returnedClass;


        if (adminWelcome) {

            adminWelcome.textContent =
                `Administrator: ${adminState.username}`;

        }


        showAdminDashboard();


        await loadDashboardData();


    } catch (error) {

        console.error(
            "ADMIN LOGIN ERROR:",
            error
        );


        showAdminLoginMessage(
            error.message ||
            "Unable to connect to the server."
        );


    } finally {

        setAdminLoginLoading(
            false
        );

    }

}


/* =========================================================
   SHOW DASHBOARD
========================================================= */

function showAdminDashboard() {

    adminLoginScreen.classList.remove(
        "active"
    );

    adminDashboardScreen.classList.add(
        "active"
    );

}


/* =========================================================
   ADMIN LOGIN MESSAGE
========================================================= */

function showAdminLoginMessage(
    message
) {

    if (!adminLoginMessage) {

        return;

    }


    adminLoginMessage.textContent =
        message;


    adminLoginMessage.classList.add(
        "show"
    );

}


function hideAdminLoginMessage() {

    if (!adminLoginMessage) {

        return;

    }


    adminLoginMessage.textContent =
        "";

    adminLoginMessage.classList.remove(
        "show"
    );

}


function setAdminLoginLoading(
    loading
) {

    if (!adminLoginButton) {

        return;

    }


    adminLoginButton.disabled =
        loading;


    adminLoginButton.textContent =
        loading
            ? "Checking..."
            : "Login";

}


/* =========================================================
   API
========================================================= */

async function adminAPI(
    action,
    data = {}
) {

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
                typeof value ===
                "object"
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


    const response =
        await fetch(
            ADMIN_CONFIG.API_URL,
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
        `API ${action}:`,
        text
    );


    let result;


    try {

        result =
            JSON.parse(
                text
            );

    } catch (error) {

        throw new Error(
            "The server returned an invalid response."
        );

    }


    return result;

}


/* =========================================================
   LOAD DASHBOARD DATA
========================================================= */

async function loadDashboardData() {

    await Promise.all(
        [

            loadUsers(),

            loadScores(),

            loadAnswers()

        ]
    );


    updateStatistics();

}


/* =========================================================
   LOAD USERS
========================================================= */

async function loadUsers() {

    showLoading(
        usersLoading,
        true
    );


    try {

        const result =
            await adminAPI(
                "getUsers",
                {

                    adminUsername:
                        adminState.username

                }
            );


        console.log(
            "USERS:",
            result
        );


        if (
            !result ||
            result.success !== true
        ) {

            throw new Error(
                result?.message ||
                "Unable to load users."
            );

        }


        adminState.users =
            Array.isArray(
                result.users
            )
                ? result.users
                : [];


        renderUsers();


    } catch (error) {

        console.error(
            "LOAD USERS ERROR:",
            error
        );


        showTableError(
            usersTableContainer,
            error.message
        );

    } finally {

        showLoading(
            usersLoading,
            false
        );

    }

}


/* =========================================================
   LOAD SCORES
========================================================= */

async function loadScores() {

    showLoading(
        scoresLoading,
        true
    );


    try {

        const result =
            await adminAPI(
                "getAllScores",
                {

                    adminUsername:
                        adminState.username

                }
            );


        console.log(
            "SCORES:",
            result
        );


        if (
            !result ||
            result.success !== true
        ) {

            throw new Error(
                result?.message ||
                "Unable to load scores."
            );

        }


        adminState.scores =
            Array.isArray(
                result.records
            )
                ? result.records
                : [];


        renderScores();


    } catch (error) {

        console.error(
            "LOAD SCORES ERROR:",
            error
        );


        showTableError(
            scoresTableContainer,
            error.message
        );

    } finally {

        showLoading(
            scoresLoading,
            false
        );

    }

}


/* =========================================================
   LOAD ANSWERS
========================================================= */

async function loadAnswers() {

    showLoading(
        answersLoading,
        true
    );


    try {

        const result =
            await adminAPI(
                "getAllAnswers",
                {

                    adminUsername:
                        adminState.username

                }
            );


        console.log(
            "ANSWERS:",
            result
        );


        if (
            !result ||
            result.success !== true
        ) {

            throw new Error(
                result?.message ||
                "Unable to load answers."
            );

        }


        adminState.answers =
            Array.isArray(
                result.records
            )
                ? result.records
                : [];


        renderAnswers();


    } catch (error) {

        console.error(
            "LOAD ANSWERS ERROR:",
            error
        );


        showTableError(
            answersTableContainer,
            error.message
        );

    } finally {

        showLoading(
            answersLoading,
            false
        );

    }

}


/* =========================================================
   UPDATE STATISTICS
========================================================= */

function updateStatistics() {

    const students =
        adminState.users.filter(
            user =>
                String(
                    user.class ||
                    ""
                ).toLowerCase() !==
                "admin"
        );


    if (studentCount) {

        studentCount.textContent =
            students.length;

    }


    if (scoreCount) {

        scoreCount.textContent =
            adminState.scores.length;

    }


    if (answerCount) {

        answerCount.textContent =
            adminState.answers.length;

    }

}


/* =========================================================
   SWITCH ADMIN SECTION
========================================================= */

function switchAdminSection(
    section
) {

    adminState.currentSection =
        section;


    adminTabs.forEach(
        tab => {

            tab.classList.toggle(
                "active",
                tab.dataset.section ===
                section
            );

        }
    );


    usersSection.classList.toggle(
        "active",
        section === "users"
    );


    scoresSection.classList.toggle(
        "active",
        section === "scores"
    );


    answersSection.classList.toggle(
        "active",
        section === "answers"
    );

}


/* =========================================================
   FILTER USERS
========================================================= */

function getFilteredUsers() {

    const classValue =
        String(
            userClassFilter?.value ||
            ""
        ).trim().toLowerCase();


    const usernameValue =
        String(
            userUsernameFilter?.value ||
            ""
        ).trim().toLowerCase();


    return adminState.users.filter(
        user => {

            const userClass =
                String(
                    user.class ||
                    ""
                ).trim().toLowerCase();


            const username =
                String(
                    user.username ||
                    ""
                ).trim().toLowerCase();


            const classMatches =
                !classValue ||
                userClass ===
                classValue;


            const usernameMatches =
                !usernameValue ||
                username.includes(
                    usernameValue
                );


            /*
             * AND filtering:
             *
             * Class AND Username
             */

            return (
                classMatches &&
                usernameMatches
            );

        }
    );

}


/* =========================================================
   RENDER USERS
========================================================= */

function renderUsers() {

    if (!usersTableContainer) {

        return;

    }


    const users =
        getFilteredUsers();


    if (
        users.length === 0
    ) {

        usersTableContainer.innerHTML = `
            <div class="empty-message">
                No users found.
            </div>
        `;

        return;

    }


    let rows =
        "";


    users.forEach(
        user => {

            const username =
                user.username ??
                user.Username ??
                "";


            const password =
                user.password ??
                user.Password ??
                "";


            const studentClass =
                user.class ??
                user.Class ??
                "";


            const isAdmin =
                String(
                    studentClass
                ).toLowerCase() ===
                "admin";


            rows += `

                <tr>

                    <td class="username-cell">
                        ${escapeAdminHTML(
                            username
                        )}
                    </td>

                    <td class="password-cell">
                        ${escapeAdminHTML(
                            password
                        )}
                    </td>

                    <td>

                        <span
                            class="class-badge ${
                                isAdmin
                                    ? "admin"
                                    : ""
                            }"
                        >
                            ${escapeAdminHTML(
                                studentClass
                            )}
                        </span>

                    </td>

                    <td>

                        <div class="action-group">

                            <button
                                class="table-action"
                                data-action="edit"
                                data-username="${escapeAttribute(
                                    username
                                )}"
                            >
                                Edit
                            </button>


                            <button
                                class="table-action delete"
                                data-action="delete"
                                data-username="${escapeAttribute(
                                    username
                                )}"
                            >
                                Delete
                            </button>

                        </div>

                    </td>

                </tr>

            `;

        }
    );


    usersTableContainer.innerHTML = `

        <table class="admin-table">

            <thead>

                <tr>

                    <th>
                        Username
                    </th>

                    <th>
                        Password
                    </th>

                    <th>
                        Class
                    </th>

                    <th>
                        Actions
                    </th>

                </tr>

            </thead>

            <tbody>

                ${rows}

            </tbody>

        </table>

    `;


    usersTableContainer
        .querySelectorAll(
            "[data-action='edit']"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        editUser(
                            button.dataset.username
                        );

                    }
                );

            }
        );


    usersTableContainer
        .querySelectorAll(
            "[data-action='delete']"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        deleteUser(
                            button.dataset.username
                        );

                    }
                );

            }
        );

}


/* =========================================================
   FILTER SCORES
========================================================= */

function getFilteredScores() {

    const classValue =
        String(
            scoreClassFilter?.value ||
            ""
        ).trim().toLowerCase();


    const usernameValue =
        String(
            scoreUsernameFilter?.value ||
            ""
        ).trim().toLowerCase();


    return adminState.scores.filter(
        record => {

            const recordClass =
                String(
                    record.class ??
                    record.Class ??
                    ""
                ).trim().toLowerCase();


            const username =
                String(
                    record.username ??
                    record.Username ??
                    ""
                ).trim().toLowerCase();


            return (
                (
                    !classValue ||
                    recordClass ===
                    classValue
                ) &&
                (
                    !usernameValue ||
                    username.includes(
                        usernameValue
                    )
                )
            );

        }
    );

}


/* =========================================================
   RENDER SCORES
========================================================= */

function renderScores() {

    if (!scoresTableContainer) {

        return;

    }


    const records =
        getFilteredScores();


    if (
        records.length === 0
    ) {

        scoresTableContainer.innerHTML = `
            <div class="empty-message">
                No score records found.
            </div>
        `;

        return;

    }


    let rows =
        "";


    records.forEach(
        record => {

            rows += `

                <tr>

                    <td class="username-cell">
                        ${escapeAdminHTML(
                            record.username ??
                            record.Username ??
                            ""
                        )}
                    </td>

                    <td>
                        ${escapeAdminHTML(
                            record.class ??
                            record.Class ??
                            ""
                        )}
                    </td>

                    <td>
                        ${escapeAdminHTML(
                            record.chapter ??
                            record.Chapter ??
                            ""
                        )}
                    </td>

                    <td>
                        ${escapeAdminHTML(
                            record.part1 ??
                            record["Part 1 Score"] ??
                            0
                        )}
                    </td>

                    <td>
                        ${escapeAdminHTML(
                            record.part2 ??
                            record["Part 2 Score"] ??
                            0
                        )}
                    </td>

                    <td>
                        ${escapeAdminHTML(
                            record.part3 ??
                            record["Part 3 Score"] ??
                            0
                        )}
                    </td>

                    <td>
                        <strong>
                            ${escapeAdminHTML(
                                record.total ??
                                record.Total ??
                                0
                            )}
                        </strong>
                    </td>

                    <td>
                        ${escapeAdminHTML(
                            record.maximum ??
                            record.Maximum ??
                            0
                        )}
                    </td>

                    <td>
                        ${escapeAdminHTML(
                            record.percentage ??
                            record.Percentage ??
                            ""
                        )}
                    </td>

                    <td>
                        ${escapeAdminHTML(
                            record.date ??
                            record.Date ??
                            ""
                        )}
                    </td>

                </tr>

            `;

        }
    );


    scoresTableContainer.innerHTML = `

        <table class="admin-table">

            <thead>

                <tr>

                    <th>
                        Username
                    </th>

                    <th>
                        Class
                    </th>

                    <th>
                        Chapter
                    </th>

                    <th>
                        Part 1
                    </th>

                    <th>
                        Part 2
                    </th>

                    <th>
                        Part 3
                    </th>

                    <th>
                        Total
                    </th>

                    <th>
                        Maximum
                    </th>

                    <th>
                        Percentage
                    </th>

                    <th>
                        Date
                    </th>

                </tr>

            </thead>

            <tbody>

                ${rows}

            </tbody>

        </table>

    `;

}


/* =========================================================
   FILTER ANSWERS
========================================================= */

function getFilteredAnswers() {

    const classValue =
        String(
            answerClassFilter?.value ||
            ""
        ).trim().toLowerCase();


    const usernameValue =
        String(
            answerUsernameFilter?.value ||
            ""
        ).trim().toLowerCase();


    return adminState.answers.filter(
        record => {

            const recordClass =
                String(
                    record.class ??
                    record.Class ??
                    ""
                ).trim().toLowerCase();


            const username =
                String(
                    record.username ??
                    record.Username ??
                    ""
                ).trim().toLowerCase();


            return (
                (
                    !classValue ||
                    recordClass ===
                    classValue
                ) &&
                (
                    !usernameValue ||
                    username.includes(
                        usernameValue
                    )
                )
            );

        }
    );

}


/* =========================================================
   RENDER ANSWERS
========================================================= */

function renderAnswers() {

    if (!answersTableContainer) {

        return;

    }


    const records =
        getFilteredAnswers();


    if (
        records.length === 0
    ) {

        answersTableContainer.innerHTML = `
            <div class="empty-message">
                No answer records found.
            </div>
        `;

        return;

    }


    let rows =
        "";


    records.forEach(
        record => {

            rows += `

                <tr>

                    <td class="username-cell">
                        ${escapeAdminHTML(
                            record.username ??
                            record.Username ??
                            ""
                        )}
                    </td>

                    <td>
                        ${escapeAdminHTML(
                            record.class ??
                            record.Class ??
                            ""
                        )}
                    </td>

                    <td>
                        ${escapeAdminHTML(
                            record.question ??
                            record.Question ??
                            ""
                        )}
                    </td>

                    <td>
                        ${escapeAdminHTML(
                            record.answer ??
                            record.Answer ??
                            ""
                        )}
                    </td>

                </tr>

            `;

        }
    );


    answersTableContainer.innerHTML = `

        <table class="admin-table">

            <thead>

                <tr>

                    <th>
                        Username
                    </th>

                    <th>
                        Class
                    </th>

                    <th>
                        Question
                    </th>

                    <th>
                        Answer
                    </th>

                </tr>

            </thead>

            <tbody>

                ${rows}

            </tbody>

        </table>

    `;

}


/* =========================================================
   OPEN ADD USER
========================================================= */

function openAddUserModal() {

    adminState.editingUsername =
        null;


    if (userModalTitle) {

        userModalTitle.textContent =
            "Add User";

    }


    if (editingUsername) {

        editingUsername.value =
            "";

    }


    if (userFormUsername) {

        userFormUsername.value =
            "";

        userFormUsername.disabled =
            false;

    }


    if (userFormPassword) {

        userFormPassword.value =
            "";

    }


    if (userFormClass) {

        userFormClass.value =
            "Beginner";

    }


    hideUserFormMessage();


    userModal.classList.add(
        "active"
    );

}


/* =========================================================
   EDIT USER
========================================================= */

function editUser(
    username
) {

    const user =
        adminState.users.find(
            item =>
                String(
                    item.username ??
                    item.Username ??
                    ""
                ) ===
                String(
                    username
                )
        );


    if (!user) {

        alert(
            "User not found."
        );

        return;

    }


    adminState.editingUsername =
        username;


    if (userModalTitle) {

        userModalTitle.textContent =
            "Edit User";

    }


    if (editingUsername) {

        editingUsername.value =
            username;

    }


    if (userFormUsername) {

        userFormUsername.value =
            username;

        /*
         * Username is kept fixed when editing.
         *
         * To change username, delete/create
         * the account or add a dedicated
         * backend rename action.
         */

        userFormUsername.disabled =
            true;

    }


    if (userFormPassword) {

        userFormPassword.value =
            user.password ??
            user.Password ??
            "";

    }


    if (userFormClass) {

        userFormClass.value =
            user.class ??
            user.Class ??
            "Beginner";

    }


    hideUserFormMessage();


    userModal.classList.add(
        "active"
    );

}


/* =========================================================
   SAVE USER
========================================================= */

async function saveUser(
    event
) {

    event.preventDefault();


    const username =
        String(
            userFormUsername?.value ||
            ""
        ).trim();


    const password =
        String(
            userFormPassword?.value ||
            ""
        );


    const studentClass =
        String(
            userFormClass?.value ||
            ""
        ).trim();


    if (
        !username ||
        !password ||
        !studentClass
    ) {

        showUserFormMessage(
            "Please complete all fields."
        );

        return;

    }


    setSaveUserLoading(
        true
    );


    try {

        let result;


        if (
            adminState.editingUsername
        ) {

            /*
             * UPDATE EXISTING USER
             */

            result =
                await adminAPI(
                    "updateUser",
                    {

                        adminUsername:
                            adminState.username,

                        username:
                            adminState.editingUsername,

                        password:
                            password,

                        class:
                            studentClass

                    }
                );

        } else {

            /*
             * CREATE NEW USER
             */

            result =
                await adminAPI(
                    "createUser",
                    {

                        adminUsername:
                            adminState.username,

                        username:
                            username,

                        password:
                            password,

                        class:
                            studentClass

                    }
                );

        }


        console.log(
            "SAVE USER RESPONSE:",
            result
        );


        if (
            !result ||
            result.success !== true
        ) {

            showUserFormMessage(
                result?.message ||
                "Unable to save user."
            );

            return;

        }


        closeUserModalWindow();


        await loadUsers();


        updateStatistics();


    } catch (error) {

        console.error(
            "SAVE USER ERROR:",
            error
        );


        showUserFormMessage(
            error.message ||
            "Unable to save user."
        );

    } finally {

        setSaveUserLoading(
            false
        );

    }

}


/* =========================================================
   DELETE USER
========================================================= */

async function deleteUser(
    username
) {

    if (
        username ===
        adminState.username
    ) {

        alert(
            "You cannot delete the administrator account while logged in."
        );

        return;

    }


    const confirmed =
        window.confirm(
            `Delete user "${username}"?`
        );


    if (!confirmed) {

        return;

    }


    try {

        const result =
            await adminAPI(
                "deleteUser",
                {

                    adminUsername:
                        adminState.username,

                    username:
                        username

                }
            );


        console.log(
            "DELETE USER RESPONSE:",
            result
        );


        if (
            !result ||
            result.success !== true
        ) {

            alert(
                result?.message ||
                "Unable to delete user."
            );

            return;

        }


        await loadUsers();


        updateStatistics();


    } catch (error) {

        console.error(
            "DELETE USER ERROR:",
            error
        );


        alert(
            error.message ||
            "Unable to delete user."
        );

    }

}


/* =========================================================
   CLOSE MODAL
========================================================= */

function closeUserModalWindow() {

    if (!userModal) {

        return;

    }


    userModal.classList.remove(
        "active"
    );


    adminState.editingUsername =
        null;


    if (userForm) {

        userForm.reset();

    }


    if (userFormUsername) {

        userFormUsername.disabled =
            false;

    }


    hideUserFormMessage();

}


/* =========================================================
   USER FORM MESSAGE
========================================================= */

function showUserFormMessage(
    message
) {

    if (!userFormMessage) {

        return;

    }


    userFormMessage.textContent =
        message;


    userFormMessage.classList.add(
        "show"
    );

}


function hideUserFormMessage() {

    if (!userFormMessage) {

        return;

    }


    userFormMessage.textContent =
        "";

    userFormMessage.classList.remove(
        "show"
    );

}


/* =========================================================
   SAVE USER LOADING
========================================================= */

function setSaveUserLoading(
    loading
) {

    if (!saveUserButton) {

        return;

    }


    saveUserButton.disabled =
        loading;


    saveUserButton.textContent =
        loading
            ? "Saving..."
            : "Save User";

}


/* =========================================================
   LOADING
========================================================= */

function showLoading(
    element,
    show
) {

    if (!element) {

        return;

    }


    element.style.display =
        show
            ? "block"
            : "none";

}


/* =========================================================
   TABLE ERROR
========================================================= */

function showTableError(
    container,
    message
) {

    if (!container) {

        return;

    }


    container.innerHTML = `

        <div class="empty-message">

            ${escapeAdminHTML(
                message ||
                "Unable to load data."
            )}

        </div>

    `;

}


/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeAdminHTML(
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
   ESCAPE ATTRIBUTE
========================================================= */

function escapeAttribute(
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
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        );

}


/* =========================================================
   LOGOUT
========================================================= */

function logoutAdmin() {

    const confirmed =
        window.confirm(
            "Are you sure you want to logout?"
        );


    if (!confirmed) {

        return;

    }


    adminState.username =
        null;


    adminState.class =
        null;


    adminState.users =
        [];


    adminState.scores =
        [];


    adminState.answers =
        [];


    adminState.editingUsername =
        null;


    adminLoginScreen.classList.add(
        "active"
    );


    adminDashboardScreen.classList.remove(
        "active"
    );


    if (adminUsername) {

        adminUsername.value =
            "";

    }


    if (adminPassword) {

        adminPassword.value =
            "";

    }


    hideAdminLoginMessage();

}


/* =========================================================
   END ADMIN.JS
========================================================= */