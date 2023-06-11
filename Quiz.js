
var myVariables = {

    clickCounter: clickCounter = -1,
    answersArr: answersArr = [],
    numberOfCorrectAnswers: numberOfCorrectAnswers = 0,
    timerCountdown: timerCountdown = 61
}


function clickNext(){

    if(clickCounter === 3){return}
    clickCounter++;
    
    return clickCounter
}

function clickPrevious(){
    if(clickCounter === 0){return}
    clickCounter--;
 
    return clickCounter
    }

async function getData() {
  
    const response = await fetch('https://planinarske-akcije.com/quiz?quiz_id=1');
    if (!response.ok) {
    const message = `Doslo je do greske, pokusaj kasnije: error ${response.status}`;
    throw new Error(message);
      }
    quizdata = await response.json();
   
    quizquestions = quizdata.quiz.questions;
     }
 

 

getData().catch(error => {
    error.message;
    document.getElementById("title").innerHTML = error.message;
    document.getElementById("start").classList.add("startHidden");
})


function startQuiz(quizdata) {
    answersArr = [];
    clickCounter = -1;
    nextQuestion(quizdata)
    setInterval(countDown, 1000)
}

function countDown() {
    timerCountdown--;
    document.getElementById("timer").innerHTML = timerCountdown;
    if(timerCountdown === 1){
        timerCountdown = 61;
        nextQuestion()
    }
    if(clickCounter === 3){
        document.getElementById("timer").classList.add("timerHidden")
        return
    }
}

function nextQuestion(e) {
    if (e && e.preventDefault) { e.preventDefault();}
    timerCountdown = 61;
    clickNext()
    if(clickCounter === 3){
        document.getElementById("timer").classList.add("timerHidden")
        showResults()

    }else{
    document.getElementById("title").innerHTML = quizquestions[clickCounter].question;

    document.getElementById("start").classList.add("startHidden");
    document.getElementById("quiz_picture").classList.remove("quiz_pictureHidden")
    document.getElementById("quiz_picture").src = quizquestions[clickCounter].picture.picture_url;
    document.getElementById("form").classList.remove("formHidden");
    document.getElementById("answer0").innerHTML = quizquestions[clickCounter].first_option;
    document.getElementById("answer1").innerHTML = quizquestions[clickCounter].second_option;
    document.getElementById("answer2").innerHTML = quizquestions[clickCounter].third_option;
     evaluateAsnwers()
}
   
}


function evaluateAsnwers() {
    if(clickCounter < 1){return}
    for (let i = 0; i<3; i++ ){
    if(document.getElementById(`radio${[i]}`).checked == true && document.getElementById(`answer${[i]}`).innerHTML === quizquestions[clickCounter-1].correct_answer){
        answersArr.push("C")
    }
    if(document.getElementById(`radio${[i]}`).checked == true && document.getElementById(`answer${[i]}`).innerHTML !== quizquestions[clickCounter-1].correct_answer){
        answersArr.push("N")
            }
         }
      }

function countCorrectAnswers() {
    for(let i=0; i<answersArr.length; i++){
        if(answersArr[i] === "C"){
            numberOfCorrectAnswers++
             }
        }
    }



 const showResults = () => {
    evaluateAsnwers()
    countCorrectAnswers()
    document.getElementById("quiz_picture").classList.add("quiz_pictureHidden")
    document.getElementById("form").classList.add("formHidden");
    document.getElementById("tryagain").classList.remove("tryagainHidden");
    document.getElementById("title").innerHTML = `Tacno si ogovrio na ${numberOfCorrectAnswers} pitanja!`;
 
    }


    