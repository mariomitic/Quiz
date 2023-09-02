
var myVariables = {
    quizData: {},
    clickCounter: clickCounter = -1,
    correctAnswers: 0,
    timerInterval: () => {setInterval(countDown, 1000)},
    timerCountdown: timerCountdown = 31 //match stroke in sec (animation: dash 30s linear)
}


function startQuiz() {
    myVariables.correctAnswers = 0;
    document.getElementById('correctAnswers').innerHTML = `Tacnih: ${myVariables.correctAnswers} odgovora!`;
    clickCounter = -1;

    //hides elements
    document.getElementById("border").classList.remove("border_start");
    document.getElementById("start").classList.add("startHidden");
    document.getElementById("checkSignA").classList.add("checkSignHidden");
    document.getElementById("xSignA").classList.add("xSignHidden");
    document.getElementById("checkSignB").classList.add("checkSignHidden");
    document.getElementById("xSignB").classList.add("xSignHidden");
    document.getElementById("checkSignC").classList.add("checkSignHidden");
    document.getElementById("xSignC").classList.add("xSignHidden");

    //shows elements
    document.getElementById("border").classList.add("border");
    document.getElementById("quiz_picture").classList.remove("quiz_pictureHidden");
    document.getElementById("timer").classList.remove("timerHidden");
    document.getElementById("currentScore").classList.remove("currentScoreHidden");
    document.getElementById("answerButtons").classList.remove("answerButtonsHidden");
    document.getElementById("nextButton").classList.remove("nextButtonHidden");

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
    
      }
     }


getData().catch(error => {
    error.message;
    document.getElementById("quiztitle").innerHTML = error.message;
    document.getElementById("start").classList.add("startHidden");
})



function countDown() {
    //counter to change color
    correctAnswer = myVariables.quizData[clickCounter].correct_answer;
      timerCountdown--;
    document.getElementById("countDown").innerHTML = timerCountdown;
    if(timerCountdown === 30){
        document.getElementById("dash").classList.add("circle");
    }
    if(timerCountdown === 20){
        document.getElementById("timerStyle").style = "--clr:#e0de56;";
    }
    if(timerCountdown === 10){
        document.getElementById("timerStyle").style = "--clr:#e05656;";
    }
    if(timerCountdown === 0){
        clearInterval(timerInterval);
        //when time is up hides timer countDown and shows result
        document.getElementById("countDown").classList.add("timerHidden");
        document.getElementById("timerStyle").style = "--clr:#6de056;";
        document.getElementById("countDown").innerHTML = "";
        document.getElementById("dash").classList.remove("circle");
        document.getElementById("nextButton").classList.remove("nextButtonDisabled");
        document.getElementById("A").classList.add("turnPale");
        document.getElementById("B").classList.add("turnPale");
        document.getElementById("C").classList.add("turnPale");
        document.getElementById("xSignA").classList.add("xSignHidden");

        if(document.getElementById("A").innerHTML === correctAnswer){
            document.getElementById("A").classList.remove("turnPale");
            document.getElementById("A").classList.add("turnGreenCorrectAnswer");
        }
        if(document.getElementById("B").innerHTML === correctAnswer){
            document.getElementById("B").classList.remove("turnPale");
            document.getElementById("B").classList.add("turnGreenCorrectAnswer");
        }
        if(document.getElementById("C").innerHTML === correctAnswer){
            document.getElementById("C").classList.remove("turnPale");
            document.getElementById("C").classList.add("turnGreenCorrectAnswer");
        }
    }
}


function nextQuestion() {
  //reset buttons and timer
   timerCountdown = 31;
   document.getElementById("timerStyle").style = "--clr:#6de056;";
   timerInterval = setInterval(countDown, 1000);
   document.getElementById("dash").classList.remove("stoppedAnimation");
   clickCounter++
   document.getElementById("nextButton").classList.add("nextButtonDisabled");
   getData();
  
    document.getElementById("A").classList.add("answerBtn");
    document.getElementById("A").classList.remove("turnRedWrongAnswer", "turnGreenCorrectAnswer");
    document.getElementById("B").classList.add("answerBtn");
    document.getElementById("B").classList.remove("turnRedWrongAnswer", "turnGreenCorrectAnswer");
    document.getElementById("C").classList.add("answerBtn");
    document.getElementById("C").classList.remove("turnRedWrongAnswer", "turnGreenCorrectAnswer");
    document.getElementById("dash").classList.remove("timerHidden");

    document.getElementById("A").classList.remove("turnPale");
    document.getElementById("B").classList.remove("turnPale");
    document.getElementById("C").classList.remove("turnPale");

    document.getElementById("countDown").classList.remove("timerHidden");
    document.getElementById("checkSignA").classList.add("checkSignHidden");
    document.getElementById("xSignA").classList.add("xSignHidden");
    document.getElementById("checkSignB").classList.add("checkSignHidden");
    document.getElementById("xSignB").classList.add("xSignHidden");
    document.getElementById("checkSignC").classList.add("checkSignHidden");
    document.getElementById("xSignC").classList.add("xSignHidden");

   
    //end of quiz
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
    document.getElementById("quiztitle").innerHTML = fetchedData[clickCounter].question;
    document.getElementById("A").innerHTML = fetchedData[clickCounter].first_option;
    document.getElementById("B").innerHTML = fetchedData[clickCounter].second_option;
    document.getElementById("C").innerHTML = fetchedData[clickCounter].third_option;
    
}
    
}



 function evaluateAsnwers(elementsId) {
    //click event on HTML button
    correctAnswer = myVariables.quizData[clickCounter].correct_answer;
    let clickedAnswer = document.getElementById(`${elementsId}`).innerHTML;
    if (clickedAnswer === correctAnswer){
        document.getElementById("A").classList.add("turnPale");
        document.getElementById("B").classList.add("turnPale");
        document.getElementById("C").classList.add("turnPale");
        document.getElementById(`${elementsId}`).classList.remove("turnPale");
     document.getElementById(`${elementsId}`).classList.add("turnGreenCorrectAnswer");
     myVariables.correctAnswers++;
     document.getElementById('correctAnswers').innerHTML = `Tacnih: ${myVariables.correctAnswers} odgovora!`;
     timerCountdown = 5;
     document.getElementById("dash").classList.add("stoppedAnimation");
     clearInterval(timerInterval); //stroke is independent of interval
     document.getElementById("nextButton").classList.remove("nextButtonDisabled");
     document.getElementById("countDown").classList.add("timerHidden");
     document.getElementById("countDown").innerHTML = "";
     document.getElementById("dash").classList.remove("circle");

     document.getElementById(`checkSign${elementsId}`).classList.remove("checkSignHidden");

    }else{

     clearInterval(timerInterval);

     document.getElementById("A").classList.add("turnRedWrongAnswer");
     document.getElementById("B").classList.add("turnRedWrongAnswer");
     document.getElementById("C").classList.add("turnRedWrongAnswer");

        if(document.getElementById("A").innerHTML === correctAnswer){
            document.getElementById("A").classList.add("turnGreenCorrectAnswer");
        }
        if(document.getElementById("B").innerHTML === correctAnswer){
            document.getElementById("B").classList.add("turnGreenCorrectAnswer");
        }
        if(document.getElementById("C").innerHTML === correctAnswer){
            document.getElementById("C").classList.add("turnGreenCorrectAnswer");
        }


     document.getElementById(`${elementsId}`).classList.remove("turnPale");
     document.getElementById(`${elementsId}`).classList.add("turnRedWrongAnswer");
     document.getElementById("nextButton").classList.remove("nextButtonDisabled");
     document.getElementById("countDown").classList.add("timerHidden");
     document.getElementById("countDown").innerHTML = "";
     document.getElementById("dash").classList.remove("circle");
     document.getElementById(`xSign${elementsId}`).classList.remove("xSignHidden");
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
    document.getElementById("quiztitle").innerHTML = `Tacno si odgovorio na ${myVariables.correctAnswers} pitanja!`;
    document.getElementById("timer").classList.add("timerHidden");
    document.getElementById("currentScore").classList.add("currentScoreHidden");
    document.getElementById("answerButtons").classList.add("answerButtonsHidden");
    document.getElementById("nextButton").classList.add("nextButtonHidden");
    
 
     }


    