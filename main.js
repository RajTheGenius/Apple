x = 0;
y = 0;
let screen_width = 0;
let screen_height = 0;
let apple = "";
let speak_data = "";
let to_number = "";

draw_apple = "";

var SpeechRecognition = window.webkitSpeechRecognition;
  
var recognition = new SpeechRecognition();

function start()
{
  document.getElementById("status").innerHTML = "System is listening please speak";  
  recognition.start();
} 

function preload() {
  apple = loadImage("apple.png");
}

recognition.onresult = function(event) {

  console.log(event);
  content = event.results[0][0].transcript;
  document.getElementById("status").innerHTML = "The speech has been recognized: " + content;

  to_number = Number(content);

  if (Number.isInteger(to_number)) {
    document.getElementById("status").innerHTML = "Started drawing apple";
    draw_apple = "set";
  } else {
    document.getElementById("status").innerHTML = "The speech has not recognized a number";
  }

}

function setup() {
  screen_width = window.innerWidth;
  screen_height = window.innerHeight;

  createCanvas(screen_width, screen_height - 150);
  canvas.position(0, 150);
}

function draw() {
  if (draw_apple == "set") {
    document.getElementById("status").innerHTML = to_number + " Apples drawn";
    for (let i = 1; i <= to_number; i++) {
      let x = Math.floor(Math.random() * 700); // Adjust the values as needed
      let y = Math.floor(Math.random() * 400); // Adjust the values as needed
      image(apple, x, y, apple.width, apple.height);
    }
    speak_data = to_number + " Apples drawn";
    speak();
    draw_apple = "";
  }
}

function speak(){
    var synth = window.speechSynthesis;

    var utterThis = new SpeechSynthesisUtterance(speak_data);

    synth.speak(utterThis);

    speak_data = "";
}
