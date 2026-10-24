// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyCoAxT3SB7JiI60uReG2UfmiSvvMavTv2M",
    authDomain: "todoapp-with-firebase-da-40ea7.firebaseapp.com",
    databaseURL: "https://todoapp-with-firebase-da-40ea7-default-rtdb.firebaseio.com",
    projectId: "todoapp-with-firebase-da-40ea7",
    storageBucket: "todoapp-with-firebase-da-40ea7.firebasestorage.app",
    messagingSenderId: "590385634938",
    appId: "1:590385634938:web:0291742d858c4284b765c3"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const scoresRef = database.ref('quiz_scores');

// Expanded Quiz Questions (HTML, CSS, JavaScript)
const quizData = [
    {
        question: "What does HTML stand for?",
        options: ["Hyper Text Markup Language", "Hyperlinks Text Management Language", "Home Tool Markup Language", "Hyper Tool Multi Language"],
        answer: 0
    },
    {
        question: "Which HTML tag is used to create a hyperlink?",
        options: ["<link>", "<a>", "<href>", "<url>"],
        answer: 1
    },
    {
        question: "Which HTML tag is used for the largest heading?",
        options: ["<h6>", "<head>", "<h1>", "<heading>"],
        answer: 2
    },
    {
        question: "What is the correct HTML tag for inserting a line break?",
        options: ["<br>", "<lb>", "<break>", "<hr>"],
        answer: 0
    },
    {
        question: "Which attribute is used to provide an image path in HTML?",
        options: ["link", "src", "href", "path"],
        answer: 1
    },
    {
        question: "What does CSS stand for?",
        options: ["Creative Style Sheets", "Computer Style Sheets", "Cascading Style Sheets", "Colorful Style Sheets"],
        answer: 2
    },
    {
        question: "Which CSS property is used to change the background color?",
        options: ["color", "bg-color", "background-color", "bgcolor"],
        answer: 2
    },
    {
        question: "How do you write a comment in CSS?",
        options: ["// this is a comment", "/* this is a comment */", "<!-- this is a comment -->", "' this is a comment"],
        answer: 1
    },
    {
        question: "Which CSS property controls the text size?",
        options: ["font-style", "text-size", "font-size", "text-style"],
        answer: 2
    },
    {
        question: "Which CSS property is used to change text color?",
        options: ["text-color", "color", "font-color", "foreground"],
        answer: 1
    },
    {
        question: "Inside which HTML element do we put JavaScript?",
        options: ["<javascript>", "<script>", "<js>", "<code>"],
        answer: 1
    },
    {
        question: "How do you write 'Hello World' in an alert box?",
        options: ["msg('Hello World');", "alertBox('Hello World');", "alert('Hello World');", "msgBox('Hello World');"],
        answer: 2
    },
    {
        question: "How do you create a function in JavaScript?",
        options: ["function myFunction()", "function:myFunction()", "create function myFunction()", "function = myFunction()"],
        answer: 0
    },
    {
        question: "How do you call a function named 'myFunction'?",
        options: ["call myFunction()", "myFunction()", "run myFunction()", "execute.myFunction()"],
        answer: 1
    },
    {
        question: "How to write an IF statement in JavaScript?",
        options: ["if i = 5 then", "if (i == 5)", "if i == 5 then", "if i = 5"],
        answer: 1
    }
];

let currentQuestion = 0;
let score = 0;
let playerName = "";

function startQuiz() {
    const nameInput = document.getElementById("username").value;
    if (nameInput.trim() === "") {
        alert("Please enter your name first!");
        return;
    }
    playerName = nameInput;
    document.getElementById("start-box").style.display = "none";
    document.getElementById("quiz-box").style.display = "block";
    loadQuestion();
}

function loadQuestion() {
    if (currentQuestion < quizData.length) {
        let q = quizData[currentQuestion];
        
        // Show current question number and title
        document.getElementById("question-number").innerText = `Question ${currentQuestion + 1} of ${quizData.length}`;
        document.getElementById("question-title").innerText = q.question;
        
        let optionsContainer = document.getElementById("options-container");
        optionsContainer.innerHTML = ""; // Purane buttons clear karein
        
        q.options.forEach((opt, index) => {
            let btn = document.createElement("button");
            btn.className = "btn option-btn";
            btn.textContent = opt; // textContent ki wajah se HTML tags text ban kar show honge
            btn.onclick = function() {
                checkAnswer(index);
            };
            optionsContainer.appendChild(btn);
        });
    } else {
        showScore();
    }
}
function checkAnswer(selectedOption) {
    let q = quizData[currentQuestion];
    if (selectedOption === q.answer) {
        score += 10;
    }
    currentQuestion++;
    loadQuestion();
}

function showScore() {
    document.getElementById("quiz-box").style.display = "none";
    document.getElementById("score-container").style.display = "block";
    
    // Yahan * ka sign lagana hai total score ke liye
    document.getElementById("final-score").innerText = `${playerName}, Your Score is: ${score} / ${quizData.length * 10}`;

    // Save name and score to Firebase Database
    scoresRef.push({
        name: playerName,
        score: score
    });
}