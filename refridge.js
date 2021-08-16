img= "";
objects = [];
status = "";

function preload() {
    img= loadImage("refridge.jpg");
}

function setup() {
    canvas = createCanvas(800, 600);
    canvas.center();

    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status = Detecting Objects";
}

function modelLoaded() {
    console.log("Model Loaded");
    status = true;
    objectDetector.detect(img, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    }
    else {
        console.log(results);
        objects = results;
    }
}


function draw() {
    image(img, 0, 0, 800, 600);
    if (status != "") {
        for (i = 0; i < objects.length; i++) {
           
            document.getElementById("status").innerHTML = "Status: Objects Detected";
            document.getElementById("objects").innerHTML = "There is 1 big object in the photo and cocossd has detected " + "1" + " object (which is a " + objects[0].label + ")";
            fill("red");
            noFill();
            stroke("red");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);

            rect(objects[i].x - 600, objects[i].y - 50, objects[i].width - 2000, objects[i].height - 2500);
        }
    }

}