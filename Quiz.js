let clickCount = -1;
let correctAnswers = 0;
document.getElementById("previous").disabled = true;


async function nextQuestion() {
    clickCount = clickCount + 1;
    event.preventDefault();

    const response = await fetch('https://planinarske-akcije.com/quiz');
    const places = await response.json();
    let current = places[clickCount];
     
    let last = places[clickCount - 1]
    //console.log("Last Id: " + last.id)

     console.log(current.mountainOnPicture)
    // console.log(typeof(clickCount))
   
    if(clickCount === 10){
        if(document.getElementById('radio1').checked && last.options.option1.correct) {
            correctAnswers = correctAnswers + 1}
            else if(document.getElementById('radio2').checked && last.options.option2.correct) {
                correctAnswers = correctAnswers + 1}
                else if(document.getElementById('radio3').checked && last.options.option3.correct) {
                    correctAnswers = correctAnswers + 1}

        document.getElementById("next").disabled = true;
        document.getElementById("result").disabled = false;
      

        var resultViz = document.getElementById("result");
        resultViz.classList.remove("result");
        clickCount = clickCount - 1;

        return}


    
    document.getElementById("picture").src = current.picture;
    document.getElementById("title").innerHTML = current.mountainOnPicture;
    document.getElementById("options1").innerHTML = current.options.option1.picture;
    document.getElementById("options2").innerHTML = current.options.option2.picture;
    document.getElementById("options3").innerHTML = current.options.option3.picture;

    if(document.getElementById('radio1').checked && current.options.option1.correct) {
        correctAnswers = correctAnswers + 1}
        else if(document.getElementById('radio2').checked && current.options.option2.correct) {
            correctAnswers = correctAnswers + 1}
            else if(document.getElementById('radio3').checked && current.options.option3.correct) {
                correctAnswers = correctAnswers + 1}
   // console.log(correctAnswers)
   
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


   
    let current = places[clickCount];
    document.getElementById("next").disabled = false;
    document.getElementById("picture").src = current.picture;
    document.getElementById("title").innerHTML = current.title;
    document.getElementById("options1").innerHTML = current.options.option1.picture;
    document.getElementById("options2").innerHTML = current.options.option2.picture;
    document.getElementById("options3").innerHTML = current.options.option3.picture;

    if(document.getElementById('radio1').checked && current.options.option1.correct) {
        correctAnswers = correctAnswers - 1}
        else if(document.getElementById('radio2').checked && current.options.option2.correct) {
            correctAnswers = correctAnswers - 1}
            else if(document.getElementById('radio3').checked && current.options.option3.correct) {
                correctAnswers = correctAnswers - 1}
    //console.log(correctAnswers)


    //console.log(clickCount)
    if(clickCount === 0){
        document.getElementById("previous").disabled = true;
        return}
}
function startQuiz() {
    var startBtn = document.getElementById("start");
    startBtn.classList.add("start");
    var pictureViz = document.getElementById("picture");
    pictureViz.classList.remove("picture");
    var formViz = document.getElementById("form");
    formViz.classList.remove("form");
    nextQuestion()

   
    // fetch('https://planinarske-akcije.com/api/v1/docs/gateway#/Fun/get_quiz_quiz_get').
    // then(resp => {return resp.json();}).
    // then(data => {console.log(data)}).catch(err => console.log(err));
}

function showResults() {
document.getElementById("title").innerHTML = "Tacno ste odgovorili na " + correctAnswers + " pitanja!";
var resultViz = document.getElementById("result");
        resultViz.classList.add("result");
var pictureViz = document.getElementById("picture");
pictureViz.classList.add("picture");
var formViz = document.getElementById("form");
formViz.classList.add("form");
}


document.getElementById('next').addEventListener('click', nextQuestion, false);
document.getElementById('previous').addEventListener('click', prevQuestion, false);
document.getElementById('start').addEventListener('click', startQuiz, false);
document.getElementById('result').addEventListener('click', showResults, false);

