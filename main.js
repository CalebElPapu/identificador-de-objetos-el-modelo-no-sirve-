function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier = ml5.imageClassifier('MobileNet',modelLoaded);
}

function modelLoaded() {
  console.log('Model Loaded!');
}

function draw() {
  image(video, 0, 0, 300, 300);
  classifier.classify(video, gotResult);
}

var previous_results = '';

function gotResult(error, results) {
  if (error) {
    console.error(error);
  } 
  else if((results[0].confidence > 0.5) && (previous_results != results[0].label1))
  {
    console.log(results);
    previous_results = results[0].label1;
    var synth = window.speechSynthesis;
    speak_data = 'El objeto es : '+results[0].label;
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);

    document.getElementById("result1").innerHTML = results[0].label;
    document.getElementById("result2").innerHTML = results[0].confidence.toFixed(3);

}

}

