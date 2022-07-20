sound = "";
objects=[];
status="";
function preload(){
    sound = loadSound('FM9B3TC-alarm.mp3');
    img=loadImage("https://images.pexels.com/photos/35537/child-children-girl-happy.jpg");
}
function setup() {
    canvas = createCanvas(750,500);
    canvas.center();

    video = createCapture(VIDEO);
   video.hide();

    posenet = ml5.objectDetector('cocossd', model_loaded);
    document.getElementById("status").innerHTML="Objects are detecting";
}
function draw() {
    image(video, 0, 0,750,500);
    if (status!="") {
        for (i = 0; i < objects.length; i++) {
            posenet.detect(video, gotresults);
            document.getElementById("status").innerHTML="The Child is Detected";
                document.getElementById("objects_are_detecting").innerHTML="The Number of Children Detected are " +objects.length;
                percent = floor(objects[i].confidence*100);
                fill("crimson");
                stroke("white");
                noFill();
                object_name = objects[i].label;
                text(objects[i].label+" "+percent+ "%", objects[i].x+15, objects[i].y+15);
                rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
                if (object_name =="person" ) {
                    sound.stop();
                    document.getElementById("status").innerHTML="The Person is Detected";
                } else {
                    sound.play();
                    document.getElementById("status").innerHTML="The Person is not Detected";
                }
}
}
}
function model_loaded() {
    console.log("The model has been loaded");
    status=true;
}
function gotresults(error, results){
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects=results;
}