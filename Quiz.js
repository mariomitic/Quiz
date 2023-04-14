let clickCount = -1;
let correctAnswers = 0;
document.getElementById("previous").disabled = true;


async function nextQuestion() {
    clickCount = clickCount + 1;
    event.preventDefault();

    const response = await fetch('./Test.json');
    const mesta = await response.json();
    let current = mesta[clickCount];
    let last = mesta[clickCount - 1]
   
      
    if(clickCount === 9){
        if(document.getElementById('options1').checked && last.options.option1.correct) {
            correctAnswers = correctAnswers + 1}
            else if(document.getElementById('options2').checked && last.options.option2.correct) {
                correctAnswers = correctAnswers + 1}
                else if(document.getElementById('options3').checked && last.options.option3.correct) {
                    correctAnswers = correctAnswers + 1}

        document.getElementById("next").disabled = true;
        document.getElementById("result").disabled = false;
      

        var resultViz = document.getElementById("result");
        resultViz.classList.remove("result");
        clickCount = clickCount - 1;
        return}


    
    document.getElementById("picture").src = current.picture;
    document.getElementById("title").innerHTML = current.title;
    document.getElementById("options1").innerHTML = current.options.option1.picture;
    document.getElementById("options2").innerHTML = current.options.option2;
    document.getElementById("options3").innerHTML = current.options.option3;

    if(document.getElementById('options1').checked && current.options.option1.correct) {
        correctAnswers = correctAnswers + 1}
        else if(document.getElementById('options2').checked && current.options.option2.correct) {
            correctAnswers = correctAnswers + 1}
            else if(document.getElementById('options3').checked && current.options.option3.correct) {
                correctAnswers = correctAnswers + 1}
    console.log(correctAnswers)
   
    if(clickCount === 0){
        document.getElementById("previous").disabled = true;
       }else{document.getElementById("previous").disabled = false;}
  
}

async function prevQuestion() {
    clickCount = clickCount - 1;
    
    event.preventDefault();
    document.getElementById("result").disabled = true;
    const response = await fetch('./Test.json');
    const mesta = await response.json();


   
    let current = mesta[clickCount];
    document.getElementById("next").disabled = false;
    document.getElementById("picture").src = current.picture;
    document.getElementById("title").innerHTML = current.title;
    document.getElementById("options1").innerHTML = current.options.option1;
    document.getElementById("options2").innerHTML = current.options.option2;
    document.getElementById("options3").innerHTML = current.options.option3;

    if(document.getElementById('options1').checked && current.options.option1.correct) {
        correctAnswers = correctAnswers - 1}
        else if(document.getElementById('options2').checked && current.options.option2.correct) {
            correctAnswers = correctAnswers - 1}
            else if(document.getElementById('options3').checked && current.options.option3.correct) {
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


