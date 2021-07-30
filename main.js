Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
});

camera=document.getElementById("camera");
Webcam.attach('#camera');
function take_snapshot(){
Webcam.snap(function(data_uri){
    //uri=uniform resource identifier
    document.getElementById("results").innerHTML='<img id="capture_image" src="'+data_uri+'"/>';

});
}

console.log('ml5version',ml5.version)
classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/v_sl95BzE/model.json',modelloaded);

function modelloaded(){
    console.log('ml5modelloaded');
}

function check(){
     img=document.getElementById('capture_image');
     classifier.classify(img, gotresults);   
}

function gotresults(error,results){
if (error){
    console.error(error);
}
else{console.log(results);
   document.getElementById("result_object_name").innerHTML=results[0].label; 
  number=results[0].confidence.toFixed(3);
   document.getElementById("result_object_accuracy").innerHTML=(number*100).toFixed(2)+"%";
   var synth=window.speechSynthesis;
   speak_data="This Is "+results[0].label;
   var utterthis=new SpeechSynthesisUtterance(speak_data);
   synth.speak(utterthis);
}

}