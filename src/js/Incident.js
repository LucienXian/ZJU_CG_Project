//关于游戏结束页面更新

function resetGame() {
    game = {
        status: "playing",
        energy:100,
    };
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
    console.log(game.energy);
    //game.distance += game.speed*deltaTime*game.ratioSpeedDistance;
    fieldDistance.innerHTML =game.energy;
    if (game.energy <1){
        game.status = "gameover";
    }
}

function loop() {

    if (game.status == "playing") {
        updateEnergy();

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
}

function keydown(ev) {
    if (ev.keyCode == 13) {
      isTPP = 1 - isTPP;
    }
    if (ev.keyCode == 39) {
      eyex += 0.1;
    }
    if (ev.keyCode == 37) {
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