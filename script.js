let questions = null;
let currentQuestion = 0;
let score = 0;

function loadQuestions(callback) {
    let xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'questions.json', true);
    xobj.onreadystatechange = function () {
      if (xobj.readyState == 4 && xobj.status == "200") {
        callback(xobj.responseText);
      }
    };
    xobj.send(null);
  }
  
  function init() {
    loadQuestions(function(response) {
      questions = JSON.parse(response);
      displayQuestion();
    });
  }

function displayQuestion() {
    const question = questions[currentQuestion];
    document.getElementById("question").innerHTML = question.question;
    const choices = document.getElementById("choices");
    choices.innerHTML = "";
    for (let i = 0; i < question.choices.length; i++) {
        const choice = question.choices[i];
        const li = document.createElement("li");
        li.innerHTML = choice;
        li.onclick = () => {
            if (choice === question.answer) {
                score++;
                document.getElementById("score").innerHTML = "Score: " + score;
            }
        }
        choices.appendChild(li);
    }
}

function checkAnswer() {
    currentQuestion++;
    if (currentQuestion >= questions.length) {
        document.getElementById("question").innerHTML = "You finished the quiz!";
        document.getElementById("choices").innerHTML = "";
        document.getElementById("score").innerHTML = "Final score: " + score;
    } else {
        displayQuestion();
    }
}

init();