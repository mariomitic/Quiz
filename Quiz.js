//import { clickNext, clickPrevious } from '/clicking';


var myVariables = {

    clickCounter: clickCounter = -1,
    answersArr: answersArr = [],
    numberOfCorrectAnswers: numberOfCorrectAnswers = 0,

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
    
     }

getData().catch(error => {
    error.message;
    document.getElementById("title").innerHTML = error.message;
    document.getElementById("start").classList.add("startHidden");
})


function startQuiz() {
    answersArr = [];
    clickCounter = -1;
    nextQuestion()
    setInterval(nextQuestion, 2000)
}

function nextQuestion(e) {
    if (e && e.preventDefault) { e.preventDefault();}
    clickNext()
    if(clickCounter === 3){
        showResults()

    }else{
    document.getElementById("title").innerHTML = quizdata.questions[clickCounter].question;
    document.getElementById("start").classList.add("startHidden");
    document.getElementById("quiz_picture").classList.remove("quiz_pictureHidden")
    document.getElementById("quiz_picture").src = quizdata.questions[clickCounter].picture.picture_url;
    document.getElementById("form").classList.remove("formHidden");
    document.getElementById("answer0").innerHTML = quizdata.questions[clickCounter].first_option;
    document.getElementById("answer1").innerHTML = quizdata.questions[clickCounter].second_option;
    document.getElementById("answer2").innerHTML = quizdata.questions[clickCounter].third_option;
    document.getElementById("previous").disabled = true;
    evaluateAsnwers()
}
   if(clickCounter > 0){
    document.getElementById("previous").disabled = false;
   }
}


const previousQuestion = (e) =>{
    if (e && e.preventDefault) { e.preventDefault();}
   clickPrevious()
   goOneQuestionBack()
   if(clickCounter === -1){return}
   document.getElementById("title").innerHTML = quizdata.questions[clickCounter].question;
   document.getElementById("quiz_picture").src = quizdata.questions[clickCounter].picture.picture_url;
   document.getElementById("answer0").innerHTML = quizdata.questions[clickCounter].first_option;
   document.getElementById("answer1").innerHTML = quizdata.questions[clickCounter].second_option;
   document.getElementById("answer2").innerHTML = quizdata.questions[clickCounter].third_option;
   if(clickCounter < 1){
    document.getElementById("previous").disabled = true;
   }
   document.getElementById("next").disabled = false;
}

function evaluateAsnwers() {
    if(clickCounter < 1){return}
    for (let i = 0; i<3; i++ ){
    if(document.getElementById(`radio${[i]}`).checked == true && document.getElementById(`answer${[i]}`).innerHTML === quizdata.questions[clickCounter-1].correct_answer){
        answersArr.push("C")
    }
    if(document.getElementById(`radio${[i]}`).checked == true && document.getElementById(`answer${[i]}`).innerHTML !== quizdata.questions[clickCounter-1].correct_answer){
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


 function goOneQuestionBack() {
    if(clickCounter === 0){answersArr = []}
    else{answersArr.pop()}
     }

 const showResults = () => {
    evaluateAsnwers()
    countCorrectAnswers()
    document.getElementById("quiz_picture").classList.add("quiz_pictureHidden")
    document.getElementById("form").classList.add("formHidden");
    document.getElementById("tryagain").classList.remove("tryagainHidden");
    document.getElementById("title").innerHTML = `Tacno si ogovrio na ${numberOfCorrectAnswers} pitanja!`;
 
    }


    