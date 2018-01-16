//关于游戏结束页面更新

function resetGame() {
    game.status = "playing";
	game.energy = 100;
	transformx = 0.0;
	transformy = 0.0;
	transformz = 0.0;

	locatex = 0.0;
	locatey = 0.0;
	locatez = 0.0;

	PlaneAngle = 0.0;
	FlySpeed = 0.1;
	FlyDis = 0;
	angle = 0;
	time_last = Date.now();
    floorAngel = 0;
	lightDirX = 1;
	lightDirZ = 1;
	gnear = 0, gfar = 10;
	eyex = 0;
	eyey = 0;
	eyez = 4;
	isTPP = true;
	ObjPostion[0] = [2,7,12];
	ObjPostion[1] = [11,-3,-8];
	ObjPostion[2] = [29,-5, -12];
	ObjPostion[3] = [36,1,-4];
	ObjPostion[4] = [60,-2, 8];
	ObjPostion[5] = [70,8,0];

	ObjPostion[6] = [6,0,-10];
	ObjPostion[7] = [17,-5,6];
	ObjPostion[8] = [34,1,-1];
	ObjPostion[9] = [46,0,9];
	ObjPostion[10] = [55,-5,-5];
	ObjPostion[11] = [74,1,2];

	ObjPostion[12] = [-6,-4,11];
	ObjPostion[13] = [23,-3,15];
	ObjPostion[14] = [41,4,3];
	ObjPostion[15] = [51,-4,6];
	ObjPostion[16] = [72,-3,-13];
	ObjPostion[17] = [80,2,0];
	
	redraw();
}
function handleMouseUp(event){
    if (game.status == "waitingReplay"){
        resetGame();
        replayMessage.style.display="none";
    }
}


function handleTouchEnd(event){
    if (game.status == "waitingReplay") {
        resetGame();
        replayMessage.style.display = "none";
    }
}
function updateEnergy(){
    game.energy=game.energy-1;
    //game.distance += game.speed*deltaTime*game.ratioSpeedDistance;
    fieldDistance.innerHTML =game.energy;
    if (game.energy <1){
        game.status = "gameover";
    }
}

function loop() {

    if (game.status == "playing") {

		
    } else if (game.status == "gameover") {

        replayMessage.style.display="block";
        game.status = "waitingReplay";

    } else if (game.status == "waitingReplay") {

    }
    requestAnimationFrame(loop);
}


function initEventHandlers(canvas, pilotAngle) {

	  canvas.onmousemove = function(ev) { // Mouse is moved
      var x = ev.clientX, y = ev.clientY;
      var rect = ev.target.getBoundingClientRect() ;

      if (isTPP) {
          locatex = ((x - rect.left) - canvas.width/2)/(canvas.width/2) * 20;
          locatey = (canvas.height/2 - (y - rect.top))/(canvas.height/2) * 10;
      } else {
          locatez = ((x - rect.left) - canvas.width/2)/(canvas.width/2) * 15;
          locatey = (canvas.height/2 - (y - rect.top))/(canvas.height/2) * 10;
      }
      
	};
	
	document.onkeydown = function(ev) {keydown(ev);};
	replayMessage = document.getElementById("replayMessage");
    fieldDistance = document.getElementById("distValue");
	document.addEventListener('mouseup', handleMouseUp, false);
    document.addEventListener('touchend', handleTouchEnd, false);
	
	var saveButton = document.getElementById("saveImageBtn");
    bindButtonEvent(saveButton, "click", saveImageInfo);
    var dlButton = document.getElementById("downloadImageBtn");
    bindButtonEvent(dlButton, "click", saveAsLocalImage);
}

function keydown(ev) {
    if (ev.keyCode == 13) {	//enter
      isTPP = !isTPP;
    }
    if (ev.keyCode == 39) {	//right
      eyex += 0.1;
    }
    if (ev.keyCode == 37) {	//left
      eyex -= 0.1;
    }
    if (ev.keyCode == 87) {  //w
      locatez -= 0.5;
    }
    if (ev.keyCode == 83) {   //s
      locatez += 0.5;
    }
    if (ev.keyCode == 38) {    //up
       FlySpeed += 0.05;
       console.log("speed" + FlySpeed);
    }
    if (ev.keyCode == 40) {   //down
       FlySpeed -= 0.05;
       if (FlySpeed <= 0)
          FlySpeed = 0;
       console.log("speed" + FlySpeed);
    }
    if (ev.keyCode == 84) {
       flag = -flag;
       console.log("switch")
    }

  //draw(gl, n, index, viewmatrix, modelmatrix, projmatrix, mvpmatrix, u_MvpMatrix , u_NormalMatrix);
}

function bindButtonEvent(element, type, handler)
{
    if(element.addEventListener) {
        element.addEventListener(type, handler, false);
    } else {
        element.attachEvent('on'+type, handler);
    }
}

function saveImageInfo ()
{
    var myCanvas = document.getElementById("webgl");
    // here is the most important part because if you dont replace you will get a DOM 18 exception.
    // var image = myCanvas.toDataURL("image/png").replace("image/png", "image/octet-stream;Content-Disposition: attachment;filename=foobar.png");
    var image = myCanvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    window.location.href=image; // it will save locally


}

function saveAsLocalImage () {

    html2canvas(document.body, {
        allowTaint: true,
        taintTest: false,
        onrendered: function(canvas) {
            canvas.id = "mycanvas";
            //document.body.appendChild(canvas);
            //生成base64图片数据
           var  dataUrl = canvas.toDataURL();
            var newImg = document.createElement("img");
            newImg.src =  dataUrl;
            document.body.appendChild(newImg);
            document.querySelector(".down").setAttribute('href',canvas.toDataURL());
        }



    });

}