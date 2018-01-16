var ShotMovx = 0.0;
var ShotMovy = 0.0;
var Shakex = 0.0;
var Shakey = 0.0;
var Shakez = 0.0;
var Factor = 10;
var CrashRotate = 0.0;
var ShotPullBackFrames = 0;
var Process = {
	status: "Enter"
};

function doCrash()
{
	if(Process.status == "Enter")
	{
		isTPP = false;
		Process.status = "ShotPullBack";
		ShotPullBack();
	}
}

function ShotPullBack()
{
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	gl.flush();
	viewmatrix.setLookAt(-0.5 + FlyDis + transformx - ShotMovx + Shakex, transformy+1.1 + ShotMovy + Shakey, transformz + Shakez, FlyDis + transformx, transformy+1.1, transformz, 0, 1, 0);
    projmatrix.setPerspective(60.0, canvas.width/canvas.height, 1.0, 100.0);

    viewProjMatrix.setPerspective(60.0, canvas.width/canvas.height, 1.0, 100.0);
    viewProjMatrix.lookAt(-0.5 + FlyDis + transformx - ShotMovx + Shakex, transformy+ 1.1 + ShotMovy + Shakey, transformz + Shakez, FlyDis + transformx, transformy+1.1, transformz, 0, 1, 0);

    skyviewmatrix.setLookAt(-500 + FlyDis , transformy+1.1, transformx, FlyDis, 0, 0, 0, 1, 0);
	//cloud
    for (var i=0; i<6; i++)
      drawObj(gl, CLOUDObjProgram, viewProjMatrix, model2, g_objDoc_CLOUD, g_drawingInfo_CLOUD, i);

    for (var i=6; i<12; i++)
      drawObj(gl, SPHEREObjProgram, viewProjMatrix, model1, g_objDoc_SPHERE, g_drawingInfo_SPHERE, i);

    for (var i=12; i<18; i++)
      drawObj(gl, BOWIEObjProgram, viewProjMatrix, model3, g_objDoc_BOWIE, g_drawingInfo_BOWIE, i);
    
    drawPlaneCube(gl, PlaneProgram, cube_red, 0, viewmatrix, modelmatrix, projmatrix, mvpmatrix, PlaneProgram.u_MvpMatrix , PlaneProgram.u_NormalMatrix, CrashRotate);
    drawPlaneCube(gl, PlaneProgram, cube_red, 1, viewmatrix, modelmatrix, projmatrix, mvpmatrix, PlaneProgram.u_MvpMatrix , PlaneProgram.u_NormalMatrix, CrashRotate);
    drawPlaneCube(gl, PlaneProgram, cube_red, 2, viewmatrix, modelmatrix, projmatrix, mvpmatrix, PlaneProgram.u_MvpMatrix , PlaneProgram.u_NormalMatrix, CrashRotate);
    drawPlaneCube(gl, PlaneProgram, cube_white, 3, viewmatrix, modelmatrix, projmatrix, mvpmatrix, PlaneProgram.u_MvpMatrix , PlaneProgram.u_NormalMatrix, CrashRotate);
    drawPlaneCube(gl, PlaneProgram, cube_red, 4, viewmatrix, modelmatrix, projmatrix, mvpmatrix, PlaneProgram.u_MvpMatrix , PlaneProgram.u_NormalMatrix, CrashRotate);
    drawPlaneCube(gl, PlaneProgram, cube_black, 5, viewmatrix, modelmatrix, projmatrix, mvpmatrix, PlaneProgram.u_MvpMatrix , PlaneProgram.u_NormalMatrix, CrashRotate);
    drawPlaneCube(gl, PlaneProgram, cube_black, 6, viewmatrix, modelmatrix, projmatrix, mvpmatrix, PlaneProgram.u_MvpMatrix , PlaneProgram.u_NormalMatrix, CrashRotate);
    drawPlaneCube(gl, PlaneProgram, cube_black, 7, viewmatrix, modelmatrix, projmatrix, mvpmatrix, PlaneProgram.u_MvpMatrix , PlaneProgram.u_NormalMatrix, CrashRotate);

    if (flag > 0)
      drawSkybox(gl, SkyProgram, projmatrix, viewmatrix, texture0, 0);
    else
      drawSkybox(gl, SkyProgram, projmatrix, viewmatrix, texture1, 1);
  
	ShotMovx = ShotMovx + 0.05;
	ShotMovy = ShotMovy + 0.03;
	Shakex = Math.random()/Factor;
	Shakey = Math.random()/Factor;
	Shakez = Math.random()/Factor;
	Factor = Factor + 0.5;
	CrashRotate = CrashRotate + 10;
	transformy = transformy - 0.05;
	
	if(ShotPullBackFrames < 200)
	{
		requestAnimationFrame(ShotPullBack, canvas);
		ShotPullBackFrames = ShotPullBackFrames + 1;
	}
	else
	{
		ShotPullBackFrames = 0;
		ShotMovx = 0.0;
		ShotMovy = 0.0;
		Factor = 10;
		CrashRotate = 0.0;
		game.status = "gameover";
		Process.status = "Enter";
	}
}