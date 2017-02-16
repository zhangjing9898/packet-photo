var canvasWidth=480;
var canvasHeight=360;
var timer=null;

var canvas=document.getElementById("canvas");
var context=canvas.getContext("2d");

canvas.width=canvasWidth;
canvas.height=canvasHeight;

var image=new Image();
var radius=45;
var clippingRegion={x:-1,y:-1,r:radius};
image.src="img/10.jpg";
image.onload=function(e){
	
	$("#blur-box").css({
		'width':canvasWidth+'px',
		'height':canvasHeight+'px'
	});
	$("#blur-img").css({
		'width':image.width+'px',
		'height':image.height+'px'
	})
	initCanvas();
}

function initCanvas(){
	clearInterval(timer);
	clippingRegion={x:Math.random()*(canvas.width-2*radius)+radius,y:Math.random()*(canvas.height-2*radius)+radius,r:radius};
	draw(image,clippingRegion);
}

function setClippingRegion(clippingRegion){
	context.beginPath();
	context.arc(clippingRegion.x,clippingRegion.y,clippingRegion.r,0,Math.PI*2,false);
	context.clip();
}

function draw(image,clippingRegion){
	context.clearRect(0,0,canvas.width,canvas.height);
	
	context.save();
	setClippingRegion(clippingRegion);
	context.drawImage(image,0,0);
	context.restore();
}

function reset(){
	clearInterval(timer);
	initCanvas();
}

function show(){
	
	timer=setInterval(
		function(){
			clippingRegion.r+=20;
			if(clippingRegion.r>2*Math.max(canvas.width,canvas.height))
			{
				clearInterval(timer);
			}
			draw(image,clippingRegion);
		},30
	)
}
