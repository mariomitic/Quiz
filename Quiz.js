/// PROBLEM - clik on button NEXT runs parts of function without fetching data first so click count is increased 
/// migth need sinc fetch function instead


//fetched data is iterated by index that will match clickCount
let clickCount = -1;
let correctAnswers = 0;
let results = [' N ']
document.getElementById("previous").disabled = true;



async function nextQuestion() {
    clickCount = clickCount + 1;

    
   event.preventDefault();
    const response = await fetch('https://planinarske-akcije.com/quiz');
    const places = await response.json();
    
    let currentQuestion = places[clickCount];
    document.getElementById("next").disabled = false;

    //Used for previous question evaluation
    let previousQuestion = places[clickCount - 1]

    if(clickCount === 10){
        document.getElementById("next").disabled = true;
        document.getElementById("result").disabled = false;

        //after last question automaticaly shows results
        showResults()//Last answer is evaluated here
        var resultVisible = document.getElementById("result");
        resultVisible.classList.remove("result");
    return}

  
    //when passing to next question evaluates previous for correctness nad adds to correct answers
    if(clickCount > 0){
      for (let i=0; i<previousQuestion.options.length; i++){
            if(document.getElementById(`radio${[i]}`).checked == true && document.getElementById(`options${[i]}`).innerHTML === previousQuestion.mountainOnPicture) {
                results.push(' C ');
            }else if(document.getElementById(`radio${[i]}`).checked == true && document.getElementById(`options${[i]}`).innerHTML !== previousQuestion.mountainOnPicture) {
                results.push(' N ')
            }
        }
    } 

    document.getElementById("picture").src = currentQuestion.picture;
    document.getElementById("options0").innerHTML = currentQuestion.options[0];
    document.getElementById("options1").innerHTML = currentQuestion.options[1];
    document.getElementById("options2").innerHTML = currentQuestion.options[2];

   
    if(clickCount === 0){
        document.getElementById("previous").disabled = true;
       }else{document.getElementById("previous").disabled = false;}
  
}

async function prevQuestion() {
    clickCount = clickCount - 1;
    event.preventDefault();
    document.getElementById("result").disabled = true;
    const response = await fetch('https://planinarske-akcije.com/quiz');
    const places = await response.json();

    let currentQuestion = places[clickCount];
    results.pop();

    document.getElementById("next").disabled = false;
    document.getElementById("picture").src = currentQuestion.picture;
    document.getElementById("options0").innerHTML = currentQuestion.options[0];
    document.getElementById("options1").innerHTML = currentQuestion.options[1];
    document.getElementById("options2").innerHTML = currentQuestion.options[2];


    if(clickCount === 0){
        document.getElementById("previous").disabled = true;
        return}
}
function startQuiz() {
    results = [' N '];
    clickCount = -1;
    correctAnswers = 0;
    document.getElementById("title").innerHTML = "Koje je ovo mesto?";
    nextQuestion()
    var startBtn = document.getElementById("start");
    startBtn.classList.add("start");
    var pictureVisible = document.getElementById("picture");
    pictureVisible.classList.remove("picture");
    var formVisible = document.getElementById("form");
    formVisible.classList.remove("form");
 }

async function showResults() {
    const response = await fetch('https://planinarske-akcije.com/quiz');
    const places = await response.json();
    let previousQuestion = places[clickCount - 1]

    //calculates last answer
    if(clickCount === 10){
        for (let i=0; i<previousQuestion.options.length; i++){
            if(document.getElementById(`radio${[i]}`).checked == true && document.getElementById(`options${[i]}`).innerHTML === previousQuestion.mountainOnPicture) {
                results.push(' C ');
            }else if(document.getElementById(`radio${[i]}`).checked == true && document.getElementById(`options${[i]}`).innerHTML !== previousQuestion.mountainOnPicture) {
                results.push(' N ')
            }
        }
    } 
    for (let i=0; i<results.length; i++) {
        if(results[i] === ' C '){
            correctAnswers = correctAnswers + 1
        }
    }

document.getElementById("title").innerHTML = "Tacno ste odgovorili na " + correctAnswers + " pitanja!";
var startBtn = document.getElementById("start");
document.getElementById("start").innerHTML = 'Pokusaj ponovo';
startBtn.classList.remove("start");
var resultVisible = document.getElementById("result");
        resultVisible.classList.add("result");
var pictureVisible = document.getElementById("picture");
pictureVisible.classList.add("picture");
var formVisible = document.getElementById("form");
formVisible.classList.add("form");
}


document.getElementById('next').addEventListener('click', nextQuestion, false);
document.getElementById('previous').addEventListener('click', prevQuestion, false);
document.getElementById('start').addEventListener('click', startQuiz, false);
document.getElementById('result').addEventListener('click', showResults, false);
document.getElementById('quit').addEventListener('click', window.location.reload, false)
