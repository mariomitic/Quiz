
var myVariables = {
    quizData: {},
    clickCounter: clickCounter = -1,
    correctAnswers: 0,
   // numberOfCorrectAnswers: numberOfCorrectAnswers = 0,
    timerInterval: () => {setInterval(countDown, 1000)},
    timerCountdown: timerCountdown = 6 //match stroke in scc (animation: dash 5s linear)
}


function startQuiz() {
    myVariables.correctAnswers = 0;
    document.getElementById('correctAnswers').innerHTML = `Tacnih: ${myVariables.correctAnswers} odgovora!`;
    answersArr = [];
    clickCounter = -1;
    document.getElementById("border").classList.remove("border_start");
    document.getElementById("border").classList.add("border");
    document.getElementById("quiz_picture").classList.remove("quiz_pictureHidden");
    document.getElementById("start").classList.add("startHidden");
    document.getElementById("title").innerHTML = "Koje je ovo mesto?"
    document.getElementById("timer").classList.remove("timerHidden");
    document.getElementById("currentScore").classList.remove("currentScoreHidden");
    document.getElementById("answerButtons").classList.remove("answerButtonsHidden");
    document.getElementById("nextButton").classList.remove("nextButtonHidden");
    document.getElementById("checkSign").classList.add("checkSignHidden");
    document.getElementById("xSign").classList.add("xSignHidden");
    

    timerInterval = setInterval(countDown, 1000);
    clickCounter++
    getData()
    
        
}


 const getData = async () => {
    const settings = {
        method: 'GET',
        headers: {
            'accept': 'application/json',
             'X-API-KEY': 'zQLFkxoUcdRdzVEfdxAqdkmQPYVuEY',
        },
      }
    const response = await fetch('https://planinarske-akcije.com/quiz/quiz?quiz_id=1', settings);
    if (!response.ok) {
    const message = `Doslo je do greske, pokusaj kasnije: error ${response.status}`;
    throw new Error(message);
      }
      else{
    quizdata = await response.json();
    quizquestions = quizdata.quiz.questions;
    myVariables.quizData = quizquestions;
    useFetchedData(quizquestions)
    //console.log(myVariables.quizData)
      }
     }


getData().catch(error => {
    error.message;
    document.getElementById("title").innerHTML = error.message;
    document.getElementById("start").classList.add("startHidden");
})



function countDown() {
    //if(clickCounter > myVariables.quizData.length){return null}
    correctAnswer = myVariables.quizData[clickCounter].correct_answer;
      timerCountdown--;
    document.getElementById("countDown").innerHTML = timerCountdown;
    if(timerCountdown === 5){
        document.getElementById("dash").classList.add("circle");
    }
    if(timerCountdown === 0){
        clearInterval(timerInterval);
        document.getElementById("countDown").classList.add("timerHidden");//hides timer countDown
        document.getElementById("countDown").innerHTML = "";
        document.getElementById("dash").classList.remove("circle");
        document.getElementById("nextButton").classList.remove("nextButtonDisabled");
        document.getElementById("A").classList.add("turnPale");
        document.getElementById("B").classList.add("turnPale");
        document.getElementById("C").classList.add("turnPale");
        document.getElementById(`${correctAnswer}`).classList.remove("turnPale");
        document.getElementById(`${correctAnswer}`).classList.add("turnGreenCorrectAnswer");
        document.getElementById("xSign").classList.add("xSignHidden");
    }
}


function nextQuestion() {
  
   timerCountdown = 6;
   timerInterval = setInterval(countDown, 1000);
   document.getElementById("dash").classList.remove("stoppedAnimation");
   clickCounter++
   document.getElementById("nextButton").classList.add("nextButtonDisabled");
   getData();
  
    document.getElementById("A").classList.add("btn");
    document.getElementById("A").classList.remove("turnRedWrongAnswer", "turnGreenCorrectAnswer");
    document.getElementById("B").classList.add("btn");
    document.getElementById("B").classList.remove("turnRedWrongAnswer", "turnGreenCorrectAnswer");
    document.getElementById("C").classList.add("btn");
    document.getElementById("C").classList.remove("turnRedWrongAnswer", "turnGreenCorrectAnswer");
    document.getElementById("dash").classList.remove("timerHidden");

    document.getElementById("A").classList.remove("turnPale");
    document.getElementById("B").classList.remove("turnPale");
    document.getElementById("C").classList.remove("turnPale");

    document.getElementById("countDown").classList.remove("timerHidden");
    document.getElementById("checkSign").classList.add("checkSignHidden");
    document.getElementById("xSign").classList.add("xSignHidden");

    //console.log(myVariables.quizData.length)

    if(clickCounter === myVariables.quizData.length){
        clearInterval(timerInterval);
        showResults()
    }
    
    
}
   



const useFetchedData = (fetchedData) => {
    if(clickCounter < 0 || clickCounter === fetchedData.length) {return}
    else{
    document.getElementById("quiz_picture").src = (fetchedData[clickCounter].picture.picture_url);
    countAnswers(fetchedData)
    document.getElementById("A").innerHTML = fetchedData[clickCounter].first_option;
    document.getElementById("B").innerHTML = fetchedData[clickCounter].second_option;
    document.getElementById("C").innerHTML = fetchedData[clickCounter].third_option;
    //console.log(fetchedData[clickCounter])
}
    
}



 function evaluateAsnwers(elementsId) {

    correctAnswer = myVariables.quizData[clickCounter].correct_answer;

    //console.log(myVariables.quizData)
    if (elementsId === correctAnswer){
        document.getElementById("A").classList.add("turnPale");
        document.getElementById("B").classList.add("turnPale");
        document.getElementById("C").classList.add("turnPale");
        document.getElementById(`${elementsId}`).classList.remove("turnPale");
     document.getElementById(`${elementsId}`).classList.add("turnGreenCorrectAnswer");
     //document.getElementById(`${elementsId}`).classList.remove("btn");
     myVariables.correctAnswers++;
     document.getElementById('correctAnswers').innerHTML = `Tacnih: ${myVariables.correctAnswers} odgovora!`;
     timerCountdown = 5;
     //document.getElementById("countDown").innerHTML = timerCountdown;
     document.getElementById("dash").classList.add("stoppedAnimation");
     clearInterval(timerInterval);
     document.getElementById("nextButton").classList.remove("nextButtonDisabled");
     //stroke is not stopped, it is independent of interval

     document.getElementById("countDown").classList.add("timerHidden");//hides timer countDown
     document.getElementById("countDown").innerHTML = "";
     document.getElementById("dash").classList.remove("circle");
     document.getElementById("checkSign").classList.remove("checkSignHidden");

    }else{

     clearInterval(timerInterval);

     document.getElementById("A").classList.add("turnPale");
     document.getElementById("B").classList.add("turnPale");
     document.getElementById("C").classList.add("turnPale");
     document.getElementById(`${elementsId}`).classList.remove("turnPale");
     document.getElementById(`${elementsId}`).classList.add("turnRedWrongAnswer");
     //document.getElementById(`${elementsId}`).classList.remove("btn");
     document.getElementById("nextButton").classList.remove("nextButtonDisabled");

     document.getElementById(`${correctAnswer}`).classList.remove("turnPale");
     document.getElementById(`${correctAnswer}`).classList.add("turnGreenCorrectAnswer");

     document.getElementById("countDown").classList.add("timerHidden");//hides timer countDown
     document.getElementById("countDown").innerHTML = "";
     document.getElementById("dash").classList.remove("circle");
     document.getElementById("xSign").classList.remove("xSignHidden");
    }
    }



function countAnswers(fetchedData) {
        document.getElementById('questionCount').innerHTML = `${clickCounter + 1} od ${fetchedData.length} pitanja`;
        
    }



  const showResults = () => {
    document.getElementById("border").classList.add("border_start");
    document.getElementById("border").classList.remove("border");
    document.getElementById("quiz_picture").classList.add("quiz_pictureHidden");
    document.getElementById("start").classList.remove("startHidden");
    document.getElementById("title").innerHTML = `Tacno si ogovrio na ${myVariables.correctAnswers} pitanja!`;
    document.getElementById("timer").classList.add("timerHidden");
    document.getElementById("currentScore").classList.add("currentScoreHidden");
    document.getElementById("answerButtons").classList.add("answerButtonsHidden");
    document.getElementById("nextButton").classList.add("nextButtonHidden");
    //document.getElementById("title").innerHTML = `Tacno si ogovrio na ${numberOfCorrectAnswers} pitanja!`;
 
     }


    