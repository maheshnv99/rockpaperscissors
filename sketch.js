console.log(ml5.version);
let video;
let classifier;
let score;
let modelurl='./mymodel/';
let label="waiting";
let rock,scissor,paper,img;
// let wins={"rock":"scissor","paper":"rock","scissor":"paper"};
function preload(){
	classifier= ml5.imageClassifier(modelurl + 'model.json');
	rock=loadImage('rock.png');
	scissor=loadImage('scissor.png');
	paper=loadImage('paper.png');

}
function classifyvideo(){

	classifier.classify(video,gotresults);

}

function setup() {
	createCanvas(windowWidth, windowHeight);
	// createCanvas(600,600);
	video=createCapture(VIDEO);
	video.hide();
	classifyvideo();
	img=rock;

}

function draw() {
	background(0);
	image(video, 0, 0,width/3,height/2);
	image(img,width-width/3,0,width/3,height/2);
	textSize(32);
	textAlign(CENTER,CENTER);
	fill(255);
	text(label,width/3,height/2);
	if((score==="rock" && label==="paper")||(score==="paper" && label==="scissor") || (score==="scissor" && label==="rock")){
		textSize(32);
	textAlign(CENTER,CENTER);
	fill(0,255,0);
	text("you wins",width/2,3*height/4);

	}
	else if((label==="rock" && score==="paper")||(label==="paper" && score==="scissor") || (label==="scissor" && score==="rock")){
		
			textSize(32);
		textAlign(CENTER,CENTER);
		fill(255,0,0);
		text("computer wins",width/2,3*height/4);
	
		
	
	}
	else if(score===label){
		textSize(32);
		textAlign(CENTER,CENTER);
		fill(255);
		text("Draw",width/2,3*height/4);

	}

}

function gotresults(error,result){
 let a=[[rock,scissor,paper],['rock','scissor','paper']];
if(error){
	console.log("error boy",error);
	return
}
 if(label!==result[0].label){
 	k=Math.floor(random(3));
 	score=a[1][k];
 	img=a[0][k];

	
 }
label=result[0].label;

classifyvideo();



}