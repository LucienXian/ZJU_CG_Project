function main(){
	canvas = document.getElementById('webgl');
	//get canvas element
	if(!canvas){
		console.log('Failed to retrieve the <canvas> element');
		return;
	}
	
	gl = getWebGLContext(canvas);
	if (!gl) {
		console.log('gl init fail');
		return;
	}

	gl.clearColor(0, 0, 0, 1);
	gl.enable(gl.DEPTH_TEST);

	PlaneInit();
	SPHEREObjInit();
	CLOUDObjInit();
	BOWIEObjInit();

	cube_white = initWhiteCubeVertexBuffers(gl);
	cube_red = initRedCubeVertexBuffers(gl);
	cube_black = initBlackCubeVertexBuffers(gl);
	if (!cube_white || !cube_black || !cube_red) {
		console.log('Failed to set the vertex information');
		return;
	}

	//motion part
	var pilotAngle = 0.0; // Current rotation angle ([x-axis, y-axis] degrees)
	initEventHandlers(canvas, pilotAngle);

	document.onkeydown = function(ev) {keydown(ev);};
	redraw();

    replayMessage = document.getElementById("replayMessage");
    fieldDistance = document.getElementById("distValue");
    document.addEventListener('mouseup', handleMouseUp, false);
    document.addEventListener('touchend', handleTouchEnd, false);

    resetGame();
    //控制游戏结束
    loop();
}