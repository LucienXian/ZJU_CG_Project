function main(){
	canvas = document.getElementById('webgl');

	//get canvas element
	if(!canvas){
		console.log('Failed to retrieve the <canvas> element');
		return;
	}
	
	//gl = getWebGLContext(canvas);
    gl = canvas.getContext("experimental-webgl", {preserveDrawingBuffer: true});
	if (!gl) {
		console.log('gl init failed');
		return;
	}


    targets = [
        gl.TEXTURE_CUBE_MAP_POSITIVE_X,
        gl.TEXTURE_CUBE_MAP_NEGATIVE_X, 
        gl.TEXTURE_CUBE_MAP_POSITIVE_Y,
        gl.TEXTURE_CUBE_MAP_NEGATIVE_Y,
        gl.TEXTURE_CUBE_MAP_POSITIVE_Z,
        gl.TEXTURE_CUBE_MAP_NEGATIVE_Z
    ];

	gl.clearColor(0, 0, 0, 1);
	gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);

    initSkybox();
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
	
	resetGame();
    //控制游戏结束
    loop();
}