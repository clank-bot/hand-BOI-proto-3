prediction = "";

Webcam.set({
    width: 350,
    height:350,
    image_format: 'png',
    png_quality:90
});
camera = document.getElementById("camera");
Webcam.attach('#camera');

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="capture_image" src="'+data_uri+'">';
    });
}

console.log("ml5 version ",ml5.version );
classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/_-NrCJfrh/model.json',modelLoaded);

function modelLoaded(){
    console.log('model loaded');
}

function speak()
{
    var synth= window.speechSynthesis;
    speak_data1 = "the first prediction is "+prediction;
    var UtterThis = new SpeechSynthesisUtterance(speak_data1);
    UtterThis.rate = 1.0;
    synth.speak(UtterThis);
}

function check(){
    img = document.getElementById('capture_image');
    classifier.classify(img, gotResult);
}

function gotResult(error, results) {
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("result_jester_name").innerHTML = results[0].label;
        prediction = results[0].label;
        speak();
        if(results[0].label == "ok")
        {
            document.getElementById("update_emoji").innerHTML = "&#128076;"
        }
        if(results[0].label == "good")
        {
            document.getElementById("update_emoji").innerHTML = "&#128077;"
        }
        if(results[0].label == "peace")
        {
            document.getElementById("update_emoji").innerHTML = "&#9996;"
        }
        if(results[0].label == "awsome")
        {
            document.getElementById("update_emoji").innerHTML = "&#9994;"
        }
        if(results[0].label == "claps")
        {
            document.getElementById("update_emoji").innerHTML = "&#128079;"
        }
        if(results[0].label == "OP")
        {
            document.getElementById("update_emoji").innerHTML = "&#129304;"
        }
    }
}