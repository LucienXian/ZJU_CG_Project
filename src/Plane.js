var VSHADER_SOURCE = 
  'attribute vec4 a_Position;\n' +
  'attribute vec4 a_Normal;\n' +       
  'attribute vec4 a_Color;\n' +
  'uniform vec3 u_LightColor;\n' +     
  'uniform vec3 u_LightDirection;\n' + 
  'uniform vec3 u_AmbientLight;\n' +
  'uniform vec3 u_LightPosition;\n' +
  'uniform mat4 u_MvpMatrix;\n' +
  'uniform mat4 u_ModelMatrix;\n' +
  'uniform mat4 u_NormalMatrix;\n' +
  'varying vec4 v_Color;\n' +
  'void main() {\n' +
  '   gl_Position = u_MvpMatrix * a_Position;\n' +
  '   vec3 normal = normalize(vec3(u_NormalMatrix * a_Normal));\n' +
  '   vec4 vertexPosition = u_ModelMatrix * a_Position;\n' +
  '   vec3 lightDirection = normalize(u_LightPosition - vec3(vertexPosition));\n' +
  '   float nDotL = max(dot(lightDirection, normal), 0.0);\n' +
  '   vec3 diffuse = u_LightColor * a_Color.rgb * nDotL;\n' +
  '   vec3 ambient = u_AmbientLight *a_Color.rgb;\n' +
  '   v_Color = vec4(diffuse + ambient, a_Color.a);\n' +
  '}\n';

var FSHADER_SOURCE = 
  '#ifdef GL_ES\n' +
  'precision mediump float;\n' +
  '#endif\n' +
  'varying vec4 v_Color;\n' +
  'void main(){\n' +
  '   gl_FragColor = v_Color;\n' +
  '}\n' ;


function main(){
  var canvas = document.getElementById('webgl');
  //var nf = document.getElementById('nearFar');

  var gl = getWebGLContext(canvas);
   
  if (!gl) {
    console.log('gl init fail');
    return;
  }

  var PlaneProgram = createProgram(gl, VSHADER_SOURCE, FSHADER_SOURCE);
  var SPHEREObjProgram = createProgram(gl, VSHADER_SOURCE, FSHADER_SOURCE)
  var CLOUDObjProgram = createProgram(gl, VSHADER_SOURCE, FSHADER_SOURCE)
  var BOWIEObjProgram = createProgram(gl, VSHADER_SOURCE, FSHADER_SOURCE)
  if (!PlaneProgram || !SPHEREObjProgram || !CLOUDObjProgram || !BOWIEObjProgram) {
      console.log('Failed to intialize shaders.');
      return;
  }
  //255,235,205
  //gl.clearColor(1,235.0/255, 205.0/255, 1);
  gl.clearColor(0,0,0, 1);

  //gl.clearColor(0,0,0, 1);
  gl.enable(gl.DEPTH_TEST);

  PlaneProgram.a_Position = gl.getAttribLocation(PlaneProgram, 'a_Position');
  PlaneProgram.a_Normal = gl.getAttribLocation(PlaneProgram, 'a_Normal');
  PlaneProgram.a_Color = gl.getAttribLocation(PlaneProgram, 'a_Color');
  PlaneProgram.u_MvpMatrix = gl.getUniformLocation(PlaneProgram, 'u_MvpMatrix');
  PlaneProgram.u_NormalMatrix = gl.getUniformLocation(PlaneProgram, 'u_NormalMatrix');

  if (PlaneProgram.a_Position < 0 ||  PlaneProgram.a_Normal < 0 || PlaneProgram.a_Color < 0 ||
        !PlaneProgram.u_MvpMatrix || !PlaneProgram.u_NormalMatrix) {
      console.log('attribute, uniform storage failed'); 
      return;
    }

  PlaneProgram.u_LightColor = gl.getUniformLocation(PlaneProgram, 'u_LightColor');
  PlaneProgram.u_LightPosition = gl.getUniformLocation(PlaneProgram, 'u_LightPosition');
  //var u_LightDirection = gl.getUniformLocation(gl.program, 'u_LightDirection');
  PlaneProgram.u_AmbientLight = gl.getUniformLocation(PlaneProgram, 'u_AmbientLight');

  if (!PlaneProgram.u_LightColor || !PlaneProgram.u_LightPosition || !PlaneProgram.u_AmbientLight) { 
      console.log('Failed to get the light storage location');
      return;
  }

  SPHEREObjProgram.a_Position = gl.getAttribLocation(SPHEREObjProgram, 'a_Position');
  SPHEREObjProgram.a_Normal = gl.getAttribLocation(SPHEREObjProgram, 'a_Normal');
  SPHEREObjProgram.a_Color = gl.getAttribLocation(SPHEREObjProgram, 'a_Color');
  SPHEREObjProgram.u_MvpMatrix = gl.getUniformLocation(SPHEREObjProgram, 'u_MvpMatrix');
  SPHEREObjProgram.u_NormalMatrix = gl.getUniformLocation(SPHEREObjProgram, 'u_NormalMatrix');

  if (SPHEREObjProgram.a_Position < 0 ||  SPHEREObjProgram.a_Normal < 0 || SPHEREObjProgram.a_Color < 0 ||
        !SPHEREObjProgram.u_MvpMatrix || !SPHEREObjProgram.u_NormalMatrix) {
      console.log('attribute, uniform storage failed'); 
      return;
  }

  SPHEREObjProgram.u_LightColor = gl.getUniformLocation(SPHEREObjProgram, 'u_LightColor');
  SPHEREObjProgram.u_LightPosition = gl.getUniformLocation(SPHEREObjProgram, 'u_LightPosition');
  //var u_LightDirection = gl.getUniformLocation(gl.program, 'u_LightDirection');
  SPHEREObjProgram.u_AmbientLight = gl.getUniformLocation(SPHEREObjProgram, 'u_AmbientLight');

  if (!SPHEREObjProgram.u_LightColor || !SPHEREObjProgram.u_LightPosition || !SPHEREObjProgram.u_AmbientLight) { 
      console.log('Failed to get the light storage location');
      return;
  }

  CLOUDObjProgram.a_Position = gl.getAttribLocation(CLOUDObjProgram, 'a_Position');
  CLOUDObjProgram.a_Normal = gl.getAttribLocation(CLOUDObjProgram, 'a_Normal');
  CLOUDObjProgram.a_Color = gl.getAttribLocation(CLOUDObjProgram, 'a_Color');
  CLOUDObjProgram.u_MvpMatrix = gl.getUniformLocation(CLOUDObjProgram, 'u_MvpMatrix');
  CLOUDObjProgram.u_NormalMatrix = gl.getUniformLocation(CLOUDObjProgram, 'u_NormalMatrix');

  if (CLOUDObjProgram.a_Position < 0 ||  CLOUDObjProgram.a_Normal < 0 || CLOUDObjProgram.a_Color < 0 ||
        !CLOUDObjProgram.u_MvpMatrix || !CLOUDObjProgram.u_NormalMatrix) {
      console.log('attribute, uniform storage failed'); 
      return;
  }

  CLOUDObjProgram.u_LightColor = gl.getUniformLocation(CLOUDObjProgram, 'u_LightColor');
  CLOUDObjProgram.u_LightPosition = gl.getUniformLocation(CLOUDObjProgram, 'u_LightPosition');
  //var u_LightDirection = gl.getUniformLocation(gl.program, 'u_LightDirection');
  CLOUDObjProgram.u_AmbientLight = gl.getUniformLocation(CLOUDObjProgram, 'u_AmbientLight');

  if (!CLOUDObjProgram.u_LightColor || !CLOUDObjProgram.u_LightPosition || !CLOUDObjProgram.u_AmbientLight) { 
      console.log('Failed to get the light storage location');
      return;
  }

  BOWIEObjProgram.a_Position = gl.getAttribLocation(BOWIEObjProgram, 'a_Position');
  BOWIEObjProgram.a_Normal = gl.getAttribLocation(BOWIEObjProgram, 'a_Normal');
  BOWIEObjProgram.a_Color = gl.getAttribLocation(BOWIEObjProgram, 'a_Color');
  BOWIEObjProgram.u_MvpMatrix = gl.getUniformLocation(BOWIEObjProgram, 'u_MvpMatrix');
  BOWIEObjProgram.u_NormalMatrix = gl.getUniformLocation(BOWIEObjProgram, 'u_NormalMatrix');

  if (BOWIEObjProgram.a_Position < 0 ||  BOWIEObjProgram.a_Normal < 0 || BOWIEObjProgram.a_Color < 0 ||
        !BOWIEObjProgram.u_MvpMatrix || !BOWIEObjProgram.u_NormalMatrix) {
      console.log('attribute, uniform storage failed'); 
      return;
  }

  BOWIEObjProgram.u_LightColor = gl.getUniformLocation(BOWIEObjProgram, 'u_LightColor');
  BOWIEObjProgram.u_LightPosition = gl.getUniformLocation(BOWIEObjProgram, 'u_LightPosition');
  //var u_LightDirection = gl.getUniformLocation(gl.program, 'u_LightDirection');
  BOWIEObjProgram.u_AmbientLight = gl.getUniformLocation(BOWIEObjProgram, 'u_AmbientLight');

  if (!BOWIEObjProgram.u_LightColor || !BOWIEObjProgram.u_LightPosition || !BOWIEObjProgram.u_AmbientLight) { 
      console.log('Failed to get the light storage location');
      return;
  }

    // Set the light color (white)
  var viewmatrix = new Matrix4();
  var modelmatrix = new Matrix4();
  var projmatrix = new Matrix4();
  var mvpmatrix = new Matrix4();


  var cube_white = initWhiteCubeVertexBuffers(gl);
  var cube_red = initRedCubeVertexBuffers(gl);
  var cube_black = initBlackCubeVertexBuffers(gl);
  if (!cube_white || !cube_black || !cube_red) {
      console.log('Failed to set the vertex information');
      return;
  }

  var model1 = initObjVertexBuffers(gl, SPHEREObjProgram);
  var model2 = initObjVertexBuffers(gl, CLOUDObjProgram);
  var model3 = initObjVertexBuffers(gl, BOWIEObjProgram);

  if (!model1 || !model2 || !model3) {
      console.log('Failed to set the vertex information');
      return;
  }

  readSPHEREOBJFile('../resources/2.obj', gl, model1, 0.2, true);
  readCLOUDOBJFile('../resources/t11.obj', gl, model2, 0.3, true);
  readBOWIEOBJFile('../resources/tong.obj', gl, model3, 0.3, true);


  var viewProjMatrix = new Matrix4();

  //motion part
  var pilotAngle = 0.0; // Current rotation angle ([x-axis, y-axis] degrees)
  initEventHandlers(canvas, pilotAngle);

  document.onkeydown = function(ev) {keydown(ev);};
  var tick = function() {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    animate();
    gl.flush();

    if (isTPP == 1) {
        viewmatrix.setLookAt(3, 0, 10, 0, 0, -1, 0, 1, 0);
        projmatrix.setOrtho(-20, 20, -10, 10, -10, 20);

        viewProjMatrix.setOrtho(-20, 20, -10, 10, -10, 20);
        viewProjMatrix.lookAt(3.0, 0.0, 10.0, 0.0, 0.0, -1.0, 0.0, 1.0, 0.0);
        
    }
    else {
        viewmatrix.setLookAt(-3, 1, 0, 1, 0, 0, 0, 1, 0);
        projmatrix.setPerspective(60.0, canvas.width/canvas.height, 1.0, 100.0);

        viewProjMatrix.setPerspective(60.0, canvas.width/canvas.height, 1.0, 100.0);
        viewProjMatrix.lookAt(-3, 1, 0, 1, 0, 0, 0, 1, 0);
    }
    
    //cloud
    drawObj(gl, CLOUDObjProgram, viewProjMatrix, model2, g_objDoc_CLOUD, g_drawingInfo_CLOUD, 0);
    drawObj(gl, CLOUDObjProgram, viewProjMatrix, model2, g_objDoc_CLOUD, g_drawingInfo_CLOUD, 1);
    drawObj(gl, CLOUDObjProgram, viewProjMatrix, model2, g_objDoc_CLOUD, g_drawingInfo_CLOUD, 2);
    drawObj(gl, CLOUDObjProgram, viewProjMatrix, model2, g_objDoc_CLOUD, g_drawingInfo_CLOUD, 3);
    drawObj(gl, CLOUDObjProgram, viewProjMatrix, model2, g_objDoc_CLOUD, g_drawingInfo_CLOUD, 4);
    drawObj(gl, CLOUDObjProgram, viewProjMatrix, model2, g_objDoc_CLOUD, g_drawingInfo_CLOUD, 5);

    drawObj(gl, SPHEREObjProgram, viewProjMatrix, model1, g_objDoc_SPHERE, g_drawingInfo_SPHERE, 6);
    drawObj(gl, SPHEREObjProgram, viewProjMatrix, model1, g_objDoc_SPHERE, g_drawingInfo_SPHERE, 7);
    drawObj(gl, SPHEREObjProgram, viewProjMatrix, model1, g_objDoc_SPHERE, g_drawingInfo_SPHERE, 8);
    drawObj(gl, SPHEREObjProgram, viewProjMatrix, model1, g_objDoc_SPHERE, g_drawingInfo_SPHERE, 9);
    drawObj(gl, SPHEREObjProgram, viewProjMatrix, model1, g_objDoc_SPHERE, g_drawingInfo_SPHERE, 10);
    drawObj(gl, SPHEREObjProgram, viewProjMatrix, model1, g_objDoc_SPHERE, g_drawingInfo_SPHERE, 11);
    
    drawObj(gl, BOWIEObjProgram, viewProjMatrix, model3, g_objDoc_BOWIE, g_drawingInfo_BOWIE, 12);
    drawObj(gl, BOWIEObjProgram, viewProjMatrix, model3, g_objDoc_BOWIE, g_drawingInfo_BOWIE, 13);
    drawObj(gl, BOWIEObjProgram, viewProjMatrix, model3, g_objDoc_BOWIE, g_drawingInfo_BOWIE, 14);
    drawObj(gl, BOWIEObjProgram, viewProjMatrix, model3, g_objDoc_BOWIE, g_drawingInfo_BOWIE, 15);
    
    drawPlaneCube(gl, PlaneProgram, cube_red, 0, viewmatrix, modelmatrix, projmatrix, mvpmatrix, PlaneProgram.u_MvpMatrix , PlaneProgram.u_NormalMatrix);
    drawPlaneCube(gl, PlaneProgram, cube_red, 1, viewmatrix, modelmatrix, projmatrix, mvpmatrix, PlaneProgram.u_MvpMatrix , PlaneProgram.u_NormalMatrix);
    drawPlaneCube(gl, PlaneProgram, cube_red, 2, viewmatrix, modelmatrix, projmatrix, mvpmatrix, PlaneProgram.u_MvpMatrix , PlaneProgram.u_NormalMatrix);
    drawPlaneCube(gl, PlaneProgram, cube_white, 3, viewmatrix, modelmatrix, projmatrix, mvpmatrix, PlaneProgram.u_MvpMatrix , PlaneProgram.u_NormalMatrix);
    drawPlaneCube(gl, PlaneProgram, cube_red, 4, viewmatrix, modelmatrix, projmatrix, mvpmatrix, PlaneProgram.u_MvpMatrix , PlaneProgram.u_NormalMatrix);
    drawPlaneCube(gl, PlaneProgram, cube_black, 5, viewmatrix, modelmatrix, projmatrix, mvpmatrix, PlaneProgram.u_MvpMatrix , PlaneProgram.u_NormalMatrix);
    drawPlaneCube(gl, PlaneProgram, cube_black, 6, viewmatrix, modelmatrix, projmatrix, mvpmatrix, PlaneProgram.u_MvpMatrix , PlaneProgram.u_NormalMatrix);
    drawPlaneCube(gl, PlaneProgram, cube_black, 7, viewmatrix, modelmatrix, projmatrix, mvpmatrix, PlaneProgram.u_MvpMatrix , PlaneProgram.u_NormalMatrix);

    //
    //
    requestAnimationFrame(tick, canvas);
  }
  tick();
}

var FlyDis = 0;
var angel = 0;
var time_last = Date.now();
var floorAngel = 0;
function animate() {
    var time_now = Date.now();
    var offset = time_now - time_last;
    time_last = time_now;
    angel += offset * 20 / 100;
    angel = angel % 360;
    floorAngel += offset * 10 / 100;
    floorAngel = floorAngel % 360;
    FlyDis += 0.1;
}

var g_modelMatrix = new Matrix4();
var g_mvpMatrix = new Matrix4();
var g_normalMatrix = new Matrix4();


var ObjPostion = new Array(20);
ObjPostion[0] = new Float32Array([6,7,6]);
ObjPostion[1] = new Float32Array([20,-3,-4]);
ObjPostion[2] = new Float32Array([30,5,-2]);
ObjPostion[3] = new Float32Array([44,-5,2]);
ObjPostion[4] = new Float32Array([60,-2,4]);
ObjPostion[5] = new Float32Array([70,8,0]);

ObjPostion[6] = new Float32Array([10,0,2]);
ObjPostion[7] = new Float32Array([18,3,6]);
ObjPostion[8] = new Float32Array([26,-5,-2]);
ObjPostion[9] = new Float32Array([40,8,-4]);
ObjPostion[10] = new Float32Array([50,-1,4]);
ObjPostion[11] = new Float32Array([66,1,-8]);

ObjPostion[12] = new Float32Array([-6,-4,0]);
ObjPostion[13] = new Float32Array([24,6,-4]);
ObjPostion[14] = new Float32Array([54,-3,4]);
ObjPostion[15] = new Float32Array([74,4,2]);


// 描画関数
function drawObj(gl, program, viewProjMatrix, model, objDoc, drawingInfo, index) {
    gl.useProgram(program);

    gl.uniform3f(program.u_LightColor, 1.0, 1.0, 1.0);
    //gl.uniform3f(program.u_LightPosition, 3.5, 0, 10);
    gl.uniform3f(program.u_LightPosition, -5.5, 0, 10);
    gl.uniform3f(program.u_AmbientLight, 0.2, 0.2, 0.2);

    if (objDoc != null && objDoc.isMTLComplete()){ // OBJ and all MTLs are available
        drawingInfo = onReadComplete(gl, model, objDoc);
        objDoc = null;
    }
    if (!drawingInfo) return;   // モデルを読み込み済みか判定

    initAttributeVariable(gl, program.a_Position, model.vertexBuffer); 
    initAttributeVariable(gl, program.a_Normal, model.normalBuffer);  
    initAttributeVariable(gl, program.a_Color, model.colorBuffer); 
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, model.indexBuffer);  

    var TempPos = ObjPostion[index]
    var PosX = TempPos[0] - FlyDis
    while (PosX < -40) {
      PosX += 80
    }
    if (PosX < -20)
        return;
    g_modelMatrix.setTranslate(PosX, TempPos[1], TempPos[2]);
    if (index == 6 || index == 7)
      g_modelMatrix.rotate(angel, 0.0, 1.0, 0.0); // 適当に回転
    g_modelMatrix.rotate(90, 0,0,1);
    

    // Calculate the normal transformation matrix and pass it to u_NormalMatrix
    g_normalMatrix.setInverseOf(g_modelMatrix);
    g_normalMatrix.transpose();
    gl.uniformMatrix4fv(program.u_NormalMatrix, false, g_normalMatrix.elements);

    // Calculate the model view project matrix and pass it to u_MvpMatrix
    g_mvpMatrix.set(viewProjMatrix);
    g_mvpMatrix.multiply(g_modelMatrix);
    gl.uniformMatrix4fv(program.u_MvpMatrix, false, g_mvpMatrix.elements);

    // Draw
    gl.drawElements(gl.TRIANGLES, drawingInfo.indices.length, gl.UNSIGNED_SHORT, 0);
}

function drawPlaneCube(gl, program, o, i, viewmatrix, modelmatrix, projmatrix, mvpmatrix, u_MvpMatrix , u_NormalMatrix) {
    gl.useProgram(program);   

    gl.uniform3f(program.u_LightColor, 1.0, 1.0, 1.0);
    //gl.uniform3f(program.u_LightPosition, 3.5, 0, 10);
    gl.uniform3f(program.u_LightPosition, -5.5, 0, 10);

    gl.uniform3f(program.u_AmbientLight, 0.2, 0.2, 0.2);
    
    initAttributeVariable(gl, program.a_Position, o.vertexBuffer); 
    initAttributeVariable(gl, program.a_Normal, o.normalBuffer);   
    initAttributeVariable(gl, program.a_Color, o.colorBuffer); 
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, o.indexBuffer);  

    drawCube(gl, program, o, i, viewmatrix, modelmatrix, projmatrix, mvpmatrix, u_MvpMatrix ,u_NormalMatrix);
}

var transformx = 0.0;
var transformy = 0.0;

function initEventHandlers(canvas, pilotAngle) {

    canvas.onmousemove = function(ev) { // Mouse is moved
      var x = ev.clientX, y = ev.clientY;
      var rect = ev.target.getBoundingClientRect() ;

      transformx = ((x - rect.left) - canvas.width/2)/(canvas.width/2) * 10;
      transformy = (canvas.height/2 - (y - rect.top))/(canvas.height/2) * 10;
    };
}

var gnear = 0, gfar = 10;
var eyex = 0, eyey = 0, eyez = 4;
var isTPP = 1;
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
    if (ev.keyCode == 65) {
      gnear -= 0.1;
    }
    if (ev.keyCode == 68) {
      gnear += 0.1;
    }
    if (ev.keyCode == 87) {
      gfar += 0.1;
    }
    if (ev.keyCode == 83) {
      gfar -= 0.1;
    }

  //draw(gl, n, index, viewmatrix, modelmatrix, projmatrix, mvpmatrix, u_MvpMatrix , u_NormalMatrix);
}

var scaleRatio = new Array(12);
//the airplane
scaleRatio[0] = new Float32Array([0.6, 0.5, 0.5]);
scaleRatio[1] = new Float32Array([0.4, 0.1, 0.4]);
scaleRatio[2] = new Float32Array([0.4, 0.1, 0.4]);
scaleRatio[3] = new Float32Array([0.15, 0.5, 0.5]);
scaleRatio[4] = new Float32Array([0.15, 0.2, 0.2]);
scaleRatio[5] = new Float32Array([0.075, 0.1, 0.1]);
scaleRatio[6] = new Float32Array([0.025, 0.7, 0.1]);
scaleRatio[7] = new Float32Array([0.025, 0.1, 0.7]);



var translateDis = new Array(12);
translateDis[0] = new Float32Array([0, 0, 0]);
translateDis[1] = new Float32Array([0, 0, 0.7]);
translateDis[2] = new Float32Array([0, 0, -0.7]);
translateDis[3] = new Float32Array([0.75, 0, 0]);
translateDis[4] = new Float32Array([-0.775, 0.5, 0]);
translateDis[5] = new Float32Array([0.975, 0, 0]);
translateDis[6] = new Float32Array([1.075, 0, 0]);
translateDis[7] = new Float32Array([1.075, 0, 0]);


var color = new Array(12);
color[0] = new Float32Array([242.0/255,83.0/255,70.0/255]);
color[1] = new Float32Array([216.0/255,208.0/255,209.0/255]);
color[2] = new Float32Array([216.0/255,208.0/255,209.0/255]);
color[3] = new Float32Array([216.0/255,208.0/255,209.0/255]);
color[4] = new Float32Array([216.0/255,208.0/255,209.0/255]);
color[5] = new Float32Array([35.0/255,25.0/255,15.0/255]);
color[6] = new Float32Array([35.0/255,25.0/255,15.0/255]);
color[7] = new Float32Array([35.0/255,25.0/255,15.0/255]);

function drawCube(gl, program, o, index, viewmatrix, modelmatrix, projmatrix, mvpmatrix, u_MvpMatrix , u_NormalMatrix) {

  var a_Color = gl.getAttribLocation(program, 'a_Color');
  if (a_Color < 0) {
    console.log('a_Color storage failed');
    return;
  }
  //gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, FSIZE * 6, FSIZE * 3);
  //gl.enableVertexAttribArray(a_Color)

  //modelmatrix.setRotate(270, 0, 1, 0);
  var TempTransfer = translateDis[index];
  if (index > 7) {
    modelmatrix.setTranslate(TempTransfer[0], TempTransfer[1], TempTransfer[2]); 
    modelmatrix.rotate(floorAngel, 0, 0, 1);
    modelmatrix.translate(-TempTransfer[0], -TempTransfer[1], -TempTransfer[2]); 
  }
  else {
    if (isTPP) {
        modelmatrix.setTranslate(TempTransfer[0] + transformx, TempTransfer[1] + transformy, TempTransfer[2] );
    }
    else  {
        modelmatrix.setTranslate(TempTransfer[0], TempTransfer[1] + transformy, TempTransfer[2] + transformx);
    }
    if (index == 6 || index == 7)
    modelmatrix.rotate(angel, 1, 0, 0);
  }

  var TempScaleRatio = scaleRatio[index];
  modelmatrix.scale(TempScaleRatio[0], TempScaleRatio[1], TempScaleRatio[2]);
    
  mvpmatrix.set(projmatrix).multiply(viewmatrix).multiply(modelmatrix)

  var normalmatrix = new Matrix4();
  normalmatrix.setInverseOf(modelmatrix);
  normalmatrix.transpose();
  gl.uniformMatrix4fv(u_NormalMatrix, false, normalmatrix.elements);

  var u_ModelMatrix = gl.getUniformLocation(program, 'u_ModelMatrix');
  if (!u_ModelMatrix) {
    console.log('model matrix storage get failed');
    return; 
  }
  gl.uniformMatrix4fv(u_ModelMatrix, false, modelmatrix.elements);

  //nf.innerHTML = 'near: ' + Math.round(gnear * 100)/100 + ', far: ' + Math.round(gfar*100)/100;
  gl.uniformMatrix4fv(u_MvpMatrix, false, mvpmatrix.elements);
  
  gl.drawElements(gl.TRIANGLES, o.numIndices, gl.UNSIGNED_BYTE, 0);
}

var vertices = new Float32Array([
       1.0, 1.0, 1.0,  -1.0, 1.0, 1.0,  -1.0,-1.0, 1.0,   1.0,-1.0, 1.0, // v0-v1-v2-v3 front
       1.0, 1.0, 1.0,   1.0,-1.0, 1.0,   1.0,-1.0,-1.0,   1.0, 1.0,-1.0, // v0-v3-v4-v5 right
       1.0, 1.0, 1.0,   1.0, 1.0,-1.0,  -1.0, 1.0,-1.0,  -1.0, 1.0, 1.0, // v0-v5-v6-v1 up
      -1.0, 1.0, 1.0,  -1.0, 1.0,-1.0,  -1.0,-1.0,-1.0,  -1.0,-1.0, 1.0, // v1-v6-v7-v2 left
      -1.0,-1.0,-1.0,   1.0,-1.0,-1.0,   1.0,-1.0, 1.0,  -1.0,-1.0, 1.0, // v7-v4-v3-v2 down
       1.0,-1.0,-1.0,  -1.0,-1.0,-1.0,  -1.0, 1.0,-1.0,   1.0, 1.0,-1.0  // v4-v7-v6-v5 back
    ]);

  // Indices of the vertices
var indices = new Uint8Array([
      0, 1, 2,   0, 2, 3,    // front
      4, 5, 6,   4, 6, 7,    // right
      8, 9,10,   8,10,11,    // up
      12,13,14,  12,14,15,    // left
      16,17,18,  16,18,19,    // down
      20,21,22,  20,22,23     // back
   ]);

var normals = new Float32Array([
      0.0, 0.0, 1.0,   0.0, 0.0, 1.0,   0.0, 0.0, 1.0,   0.0, 0.0, 1.0,  // v0-v1-v2-v3 front
      1.0, 0.0, 0.0,   1.0, 0.0, 0.0,   1.0, 0.0, 0.0,   1.0, 0.0, 0.0,  // v0-v3-v4-v5 right
      0.0, 1.0, 0.0,   0.0, 1.0, 0.0,   0.0, 1.0, 0.0,   0.0, 1.0, 0.0,  // v0-v5-v6-v1 up
        -1.0, 0.0, 0.0,  -1.0, 0.0, 0.0,  -1.0, 0.0, 0.0,  -1.0, 0.0, 0.0,  // v1-v6-v7-v2 left
      0.0,-1.0, 0.0,   0.0,-1.0, 0.0,   0.0,-1.0, 0.0,   0.0,-1.0, 0.0,  // v7-v4-v3-v2 down
      0.0, 0.0,-1.0,   0.0, 0.0,-1.0,   0.0, 0.0,-1.0,   0.0, 0.0,-1.0   // v4-v7-v6-v5 back
    ]);

var default_color = new Float32Array([
      0.0, 0.0, 0.0,   0.0, 0.0, 0.0,   0.0, 0.0, 0.0,   0.0, 0.0, 0.0,  
      0.0, 0.0, 0.0,   0.0, 0.0, 0.0,   0.0, 0.0, 0.0,   0.0, 0.0, 0.0, 
      0.0, 0.0, 0.0,   0.0, 0.0, 0.0,   0.0, 0.0, 0.0,   0.0, 0.0, 0.0, 
      0.0, 0.0, 0.0,   0.0, 0.0, 0.0,   0.0, 0.0, 0.0,   0.0, 0.0, 0.0, 
      0.0, 0.0, 0.0,   0.0, 0.0, 0.0,   0.0, 0.0, 0.0,   0.0, 0.0, 0.0, 
      0.0, 0.0, 0.0,   0.0, 0.0, 0.0,   0.0, 0.0, 0.0,   0.0, 0.0, 0.0,
    ]);



var color = new Array(12);
color[0] = new Float32Array([242.0/255,83.0/255,70.0/255]);
color[1] = new Float32Array([216.0/255,208.0/255,209.0/255]);
color[2] = new Float32Array([35.0/255,25.0/255,15.0/255]);

var color_now= color[0];
var colors_red = new Float32Array([
    color_now[0],color_now[1],color_now[2],   color_now[0],color_now[1],color_now[2], color_now[0],color_now[1],color_now[2],   color_now[0],color_now[1],color_now[2], 
    color_now[0],color_now[1],color_now[2],   color_now[0],color_now[1],color_now[2], color_now[0],color_now[1],color_now[2],   color_now[0],color_now[1],color_now[2], 
    color_now[0],color_now[1],color_now[2],   color_now[0],color_now[1],color_now[2], color_now[0],color_now[1],color_now[2],   color_now[0],color_now[1],color_now[2], 
    color_now[0],color_now[1],color_now[2],   color_now[0],color_now[1],color_now[2], color_now[0],color_now[1],color_now[2],   color_now[0],color_now[1],color_now[2], 
    color_now[0],color_now[1],color_now[2],   color_now[0],color_now[1],color_now[2], color_now[0],color_now[1],color_now[2],   color_now[0],color_now[1],color_now[2], 
    color_now[0],color_now[1],color_now[2],   color_now[0],color_now[1],color_now[2], color_now[0],color_now[1],color_now[2],   color_now[0],color_now[1],color_now[2], 
 ]);

color_now= color[1];
var colors_white = new Float32Array([
    color_now[0],color_now[1],color_now[2],   color_now[0],color_now[1],color_now[2], color_now[0],color_now[1],color_now[2],   color_now[0],color_now[1],color_now[2], 
    color_now[0],color_now[1],color_now[2],   color_now[0],color_now[1],color_now[2], color_now[0],color_now[1],color_now[2],   color_now[0],color_now[1],color_now[2], 
    color_now[0],color_now[1],color_now[2],   color_now[0],color_now[1],color_now[2], color_now[0],color_now[1],color_now[2],   color_now[0],color_now[1],color_now[2], 
    color_now[0],color_now[1],color_now[2],   color_now[0],color_now[1],color_now[2], color_now[0],color_now[1],color_now[2],   color_now[0],color_now[1],color_now[2], 
    color_now[0],color_now[1],color_now[2],   color_now[0],color_now[1],color_now[2], color_now[0],color_now[1],color_now[2],   color_now[0],color_now[1],color_now[2], 
    color_now[0],color_now[1],color_now[2],   color_now[0],color_now[1],color_now[2], color_now[0],color_now[1],color_now[2],   color_now[0],color_now[1],color_now[2], 
 ]);

color_now = color[2];
var colors_black = new Float32Array([
    color_now[0],color_now[1],color_now[2],   color_now[0],color_now[1],color_now[2], color_now[0],color_now[1],color_now[2],   color_now[0],color_now[1],color_now[2], 
    color_now[0],color_now[1],color_now[2],   color_now[0],color_now[1],color_now[2], color_now[0],color_now[1],color_now[2],   color_now[0],color_now[1],color_now[2], 
    color_now[0],color_now[1],color_now[2],   color_now[0],color_now[1],color_now[2], color_now[0],color_now[1],color_now[2],   color_now[0],color_now[1],color_now[2], 
    color_now[0],color_now[1],color_now[2],   color_now[0],color_now[1],color_now[2], color_now[0],color_now[1],color_now[2],   color_now[0],color_now[1],color_now[2], 
    color_now[0],color_now[1],color_now[2],   color_now[0],color_now[1],color_now[2], color_now[0],color_now[1],color_now[2],   color_now[0],color_now[1],color_now[2], 
    color_now[0],color_now[1],color_now[2],   color_now[0],color_now[1],color_now[2], color_now[0],color_now[1],color_now[2],   color_now[0],color_now[1],color_now[2], 
 ]);

function initWhiteCubeVertexBuffers(gl) {
    var o = new Object();
  
    o.vertexBuffer = initArrayBufferForLaterUse(gl, vertices, 3, gl.FLOAT);
    o.normalBuffer = initArrayBufferForLaterUse(gl, normals, 3, gl.FLOAT);
    o.colorBuffer = initArrayBufferForLaterUse(gl, colors_white, 3, gl.FLOAT);
    o.indexBuffer = initElementArrayBufferForLaterUse(gl, indices, gl.UNSIGNED_BYTE);
    if (!o.vertexBuffer || !o.normalBuffer || !o.indexBuffer) return null; 
  
    o.numIndices = indices.length;
      // Unbind the buffer object
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

    return o;
}

function initRedCubeVertexBuffers(gl) {
    var o = new Object();
  
    o.vertexBuffer = initArrayBufferForLaterUse(gl, vertices, 3, gl.FLOAT);
    o.normalBuffer = initArrayBufferForLaterUse(gl, normals, 3, gl.FLOAT);
    o.colorBuffer = initArrayBufferForLaterUse(gl, colors_red, 3, gl.FLOAT);
    o.indexBuffer = initElementArrayBufferForLaterUse(gl, indices, gl.UNSIGNED_BYTE);
    if (!o.vertexBuffer || !o.normalBuffer || !o.indexBuffer) return null; 
  
    o.numIndices = indices.length;
      // Unbind the buffer object
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

    return o;
}


function initBlackCubeVertexBuffers(gl) {
    var o = new Object();
  
    o.vertexBuffer = initArrayBufferForLaterUse(gl, vertices, 3, gl.FLOAT);
    o.normalBuffer = initArrayBufferForLaterUse(gl, normals, 3, gl.FLOAT);
    o.colorBuffer = initArrayBufferForLaterUse(gl, colors_black, 3, gl.FLOAT);
    o.indexBuffer = initElementArrayBufferForLaterUse(gl, indices, gl.UNSIGNED_BYTE);
    if (!o.vertexBuffer || !o.normalBuffer || !o.indexBuffer) return null; 
  
    o.numIndices = indices.length;
      // Unbind the buffer object
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

    return o;
}

function initObjVertexBuffers(gl, program) {
    var o = new Object(); // Utilize Object object to return multiple buffer objects
    o.vertexBuffer = createEmptyArrayBuffer(gl, program.a_Position, 3, gl.FLOAT); 
    o.normalBuffer = createEmptyArrayBuffer(gl, program.a_Normal, 3, gl.FLOAT);
    o.colorBuffer = createEmptyArrayBuffer(gl, program.a_Color, 4, gl.FLOAT);
    o.indexBuffer = gl.createBuffer();
    if (!o.vertexBuffer || !o.normalBuffer || !o.colorBuffer || !o.indexBuffer) { return null; }

    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

    return o;
}


// OBJ File has been read compreatly
function onReadComplete(gl, model, objDoc) {
  // Acquire the vertex coordinates and colors from OBJ file
  var drawingInfo = objDoc.getDrawingInfo();

  // Write date into the buffer object
  gl.bindBuffer(gl.ARRAY_BUFFER, model.vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, drawingInfo.vertices, gl.STATIC_DRAW);

  gl.bindBuffer(gl.ARRAY_BUFFER, model.normalBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, drawingInfo.normals, gl.STATIC_DRAW);
  
  gl.bindBuffer(gl.ARRAY_BUFFER, model.colorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, drawingInfo.colors, gl.STATIC_DRAW);
  
  // Write the indices to the buffer object
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, model.indexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, drawingInfo.indices, gl.STATIC_DRAW);

  gl.bindBuffer(gl.ARRAY_BUFFER, null);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

  return drawingInfo;
}

function createEmptyArrayBuffer(gl, a_attribute, num, type) {
  var buffer =  gl.createBuffer();  // Create a buffer object
  if (!buffer) {
    console.log('Failed to create the buffer object');
    return null;
  }
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  //gl.bufferData(gl.ARRAY_BUFFER, a_attribute, gl.STATIC_DRAW);
  

  gl.vertexAttribPointer(a_attribute, num, type, false, 0, 0);  // Assign the buffer object to the attribute variable
  //gl.enableVertexAttribArray(a_attribute);  // Enable the assignment

  buffer.num = num;
  buffer.type = type;

  return buffer;
}


function initArrayBufferForLaterUse(gl, data, num, type) {
    var buffer = gl.createBuffer();  
    if (!buffer) {
      console.log('Failed to create the buffer object');
      return null;
    }
    
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);

  buffer.num = num;
    buffer.type = type;

    return buffer;
}

function initElementArrayBufferForLaterUse(gl, data, type) {
  var buffer = gl.createBuffer();　 
  if (!buffer) {
    console.log('Failed to create the buffer object');
    return null;
  }

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, data, gl.STATIC_DRAW);

  buffer.type = type;

  return buffer;
}

function initAttributeVariable(gl, a_attribute, buffer) {
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.vertexAttribPointer(a_attribute, buffer.num, buffer.type, false, 0, 0);
  gl.enableVertexAttribArray(a_attribute);
}


// Read a file
function readSPHEREOBJFile(fileName, gl, model, scale, reverse) {
  var request = new XMLHttpRequest();

  request.onreadystatechange = function() {
    if (request.readyState === 4 && request.status !== 404) {
      onReadSPHEREOBJFile(request.responseText, fileName, gl, model, scale, reverse);
    }
  }
  request.open('GET', fileName, true); // Create a request to acquire the file
  request.send();                      // Send the request
}

// Read a file
function readCLOUDOBJFile(fileName, gl, model, scale, reverse) {
  var request = new XMLHttpRequest();

  request.onreadystatechange = function() {
    if (request.readyState === 4 && request.status !== 404) {
      onReadCLOUDOBJFile(request.responseText, fileName, gl, model, scale, reverse);
    }
  }
  request.open('GET', fileName, true); // Create a request to acquire the file
  request.send();                      // Send the request
}

function readBOWIEOBJFile(fileName, gl, model, scale, reverse) {
  var request = new XMLHttpRequest();

  request.onreadystatechange = function() {
    if (request.readyState === 4 && request.status !== 404) {
      onReadBOWIEOBJFile(request.responseText, fileName, gl, model, scale, reverse);
    }
  }
  request.open('GET', fileName, true); // Create a request to acquire the file
  request.send();                      // Send the request
}

var g_objDoc_CLOUD = null;      // The information of OBJ file
var g_drawingInfo_CLOUD = null; // The information for drawing 3D model

// OBJ File has been read
function onReadCLOUDOBJFile(fileString, fileName, gl, o, scale, reverse) {
  var objDoc = new OBJDoc(fileName);  // Create a OBJDoc object
  var result = objDoc.parse(fileString, scale, reverse); // Parse the file
  if (!result) {
    g_objDoc_CLOUD = null; g_drawingInfo_CLOUD = null;
    console.log("OBJ file parsing error.");
    return;
  }
  g_objDoc_CLOUD = objDoc;
}

var g_objDoc_SPHERE = null;      // The information of OBJ file
var g_drawingInfo_SPHERE = null; // The information for drawing 3D model

function onReadSPHEREOBJFile(fileString, fileName, gl, o, scale, reverse) {
  var objDoc = new OBJDoc(fileName);  // Create a OBJDoc object
  var result = objDoc.parse(fileString, scale, reverse); // Parse the file
  if (!result) {
    g_objDoc_SPHERE = null; g_drawingInfo_SPHERE = null;
    console.log("OBJ file parsing error.");
    return;
  }
  g_objDoc_SPHERE = objDoc;
}

var g_objDoc_BOWIE = null;      // The information of OBJ file
var g_drawingInfo_BOWIE = null; // The information for drawing 3D model

function onReadBOWIEOBJFile(fileString, fileName, gl, o, scale, reverse) {
  var objDoc = new OBJDoc(fileName);  // Create a OBJDoc object
  var result = objDoc.parse(fileString, scale, reverse); // Parse the file
  if (!result) {
    g_objDoc_BOWIE = null; g_drawingInfo_BOWIE = null;
    console.log("OBJ file parsing error.");
    return;
  }
  g_objDoc_BOWIE = objDoc;
}


//------------------------------------------------------------------------------
// OBJParser
//------------------------------------------------------------------------------

// OBJDoc object
// Constructor
var OBJDoc = function(fileName) {
  this.fileName = fileName;
  this.mtls = new Array(0);      // Initialize the property for MTL
  this.objects = new Array(0);   // Initialize the property for Object
  this.vertices = new Array(0);  // Initialize the property for Vertex
  this.normals = new Array(0);   // Initialize the property for Normal
}

// Parsing the OBJ file
OBJDoc.prototype.parse = function(fileString, scale, reverse) {
  var lines = fileString.split('\n');  // Break up into lines and store them as array
  lines.push(null); // Append null
  var index = 0;    // Initialize index of line

  var currentObject = null;
  var currentMaterialName = "";
  
  // Parse line by line
  var line;         // A string in the line to be parsed
  var sp = new StringParser();  // Create StringParser
  while ((line = lines[index++]) != null) {
    sp.init(line);                  // init StringParser
  var command = sp.getWord();     // Get command
  if(command == null)  continue;  // check null command

    switch(command){
    case '#':
      continue;  // Skip comments
    case 'mtllib':     // Read Material chunk
      var path = this.parseMtllib(sp, this.fileName);
      var mtl = new MTLDoc();   // Create MTL instance
      this.mtls.push(mtl);
      var request = new XMLHttpRequest();
      request.onreadystatechange = function() {
        if (request.readyState == 4) {
          if (request.status != 404) {
            onReadMTLFile(request.responseText, mtl);
          }else{
            mtl.complete = true;
          }
        }
      }
      request.open('GET', path, true);  // Create a request to acquire the file
      request.send();                   // Send the request
      continue; // Go to the next line
    case 'o':
    case 'g':   // Read Object name
      var object = this.parseObjectName(sp);
      this.objects.push(object);
      currentObject = object;
      continue; // Go to the next line
    case 'v':   // Read vertex
      var vertex = this.parseVertex(sp, scale);
      this.vertices.push(vertex); 
      continue; // Go to the next line
    case 'vn':   // Read normal
      var normal = this.parseNormal(sp);
      this.normals.push(normal); 
      continue; // Go to the next line
    case 'usemtl': // Read Material name
      currentMaterialName = this.parseUsemtl(sp);
      continue; // Go to the next line
    case 'f': // Read face
      var face = this.parseFace(sp, currentMaterialName, this.vertices, reverse);
      currentObject.addFace(face);
      continue; // Go to the next line
    }
  }

  return true;
}

OBJDoc.prototype.parseMtllib = function(sp, fileName) {
  // Get directory path
  var i = fileName.lastIndexOf("/");
  var dirPath = "";
  if(i > 0) dirPath = fileName.substr(0, i+1);

  return dirPath + sp.getWord();   // Get path
}

OBJDoc.prototype.parseObjectName = function(sp) {
  var name = sp.getWord();
  return (new OBJObject(name));
}

OBJDoc.prototype.parseVertex = function(sp, scale) {
  var x = sp.getFloat() * scale;
  var y = sp.getFloat() * scale;
  var z = sp.getFloat() * scale;
  return (new Vertex(x, y, z));
}

OBJDoc.prototype.parseNormal = function(sp) {
  var x = sp.getFloat();
  var y = sp.getFloat();
  var z = sp.getFloat();
  return (new Normal(x, y, z));
}

OBJDoc.prototype.parseUsemtl = function(sp) {
  return sp.getWord();
}

OBJDoc.prototype.parseFace = function(sp, materialName, vertices, reverse) {  
  var face = new Face(materialName);
  // get indices
  for(;;){
    var word = sp.getWord();
    if(word == null) break;
    var subWords = word.split('/');
    if(subWords.length >= 1){
      var vi = parseInt(subWords[0]) - 1;
      face.vIndices.push(vi);
    }
    if(subWords.length >= 3){
      var ni = parseInt(subWords[2]) - 1;
      face.nIndices.push(ni);
    }else{
      face.nIndices.push(-1);
    }
  }

  // calc normal
  var v0 = [
    vertices[face.vIndices[0]].x,
    vertices[face.vIndices[0]].y,
    vertices[face.vIndices[0]].z];
  var v1 = [
    vertices[face.vIndices[1]].x,
    vertices[face.vIndices[1]].y,
    vertices[face.vIndices[1]].z];
  var v2 = [
    vertices[face.vIndices[2]].x,
    vertices[face.vIndices[2]].y,
    vertices[face.vIndices[2]].z];

  // 面の法線を計算してnormalに設定
  var normal = calcNormal(v0, v1, v2);
  // 法線が正しく求められたか調べる
  if (normal == null) {
    if (face.vIndices.length >= 4) { // 面が四角形なら別の3点の組み合わせで法線計算
      var v3 = [
        vertices[face.vIndices[3]].x,
        vertices[face.vIndices[3]].y,
        vertices[face.vIndices[3]].z];
      normal = calcNormal(v1, v2, v3);
    }
    if(normal == null){         // 法線が求められなかったのでY軸方向の法線とする
      normal = [0.0, 1.0, 0.0];
    }
  }
  if(reverse){
    normal[0] = -normal[0];
    normal[1] = -normal[1];
    normal[2] = -normal[2];
  }
  face.normal = new Normal(normal[0], normal[1], normal[2]);

  // Devide to triangles if face contains over 3 points.
  if(face.vIndices.length > 3){
    var n = face.vIndices.length - 2;
    var newVIndices = new Array(n * 3);
    var newNIndices = new Array(n * 3);
    for(var i=0; i<n; i++){
      newVIndices[i * 3 + 0] = face.vIndices[0];
      newVIndices[i * 3 + 1] = face.vIndices[i + 1];
      newVIndices[i * 3 + 2] = face.vIndices[i + 2];
      newNIndices[i * 3 + 0] = face.nIndices[0];
      newNIndices[i * 3 + 1] = face.nIndices[i + 1];
      newNIndices[i * 3 + 2] = face.nIndices[i + 2];
    }
    face.vIndices = newVIndices;
    face.nIndices = newNIndices;
  }
  face.numIndices = face.vIndices.length;

  return face;
}

// Analyze the material file
function onReadMTLFile(fileString, mtl) {
  var lines = fileString.split('\n');  // Break up into lines and store them as array
  lines.push(null);           // Append null
  var index = 0;              // Initialize index of line

  // Parse line by line
  var line;      // A string in the line to be parsed
  var name = ""; // Material name
  var sp = new StringParser();  // Create StringParser
  while ((line = lines[index++]) != null) {
    sp.init(line);                  // init StringParser
    var command = sp.getWord();     // Get command
    if(command == null)  continue;  // check null command

    switch(command){
    case '#':
      continue;    // Skip comments
    case 'newmtl': // Read Material chunk
      name = mtl.parseNewmtl(sp);    // Get name
      continue; // Go to the next line
    case 'Kd':   // Read normal
      if(name == "") continue; // Go to the next line because of Error
      var material = mtl.parseRGB(sp, name);
      mtl.materials.push(material);
      name = "";
      continue; // Go to the next line
    }
  }
  mtl.complete = true;
}

// Check Materials
OBJDoc.prototype.isMTLComplete = function() {
  if(this.mtls.length == 0) return true;
  for(var i = 0; i < this.mtls.length; i++){
    if(!this.mtls[i].complete) return false;
  }
  return true;
}

// Find color by material name
OBJDoc.prototype.findColor = function(name){
  for(var i = 0; i < this.mtls.length; i++){
    for(var j = 0; j < this.mtls[i].materials.length; j++){
      if(this.mtls[i].materials[j].name == name){
        return(this.mtls[i].materials[j].color)
      }
    }
  }
  return(new Color(0.8, 0.8, 0.8, 1));
}

//------------------------------------------------------------------------------
// Retrieve the information for drawing 3D model
OBJDoc.prototype.getDrawingInfo = function() {
  // Create an arrays for vertex coordinates, normals, colors, and indices
  var numIndices = 0;
  for(var i = 0; i < this.objects.length; i++){
    numIndices += this.objects[i].numIndices;
  }
  var numVertices = numIndices;
  var vertices = new Float32Array(numVertices * 3);
  var normals = new Float32Array(numVertices * 3);
  var colors = new Float32Array(numVertices * 4);
  var indices = new Uint16Array(numIndices);

  // Set vertex, normal and color
  var index_indices = 0;
  for(var i = 0; i < this.objects.length; i++){
    var object = this.objects[i];
    for(var j = 0; j < object.faces.length; j++){
      var face = object.faces[j];
      var color = this.findColor(face.materialName);
      var faceNormal = face.normal;
      for(var k = 0; k < face.vIndices.length; k++){
        // Set index
        indices[index_indices] = index_indices;
        // Copy vertex
        var vIdx = face.vIndices[k];
        var vertex = this.vertices[vIdx];
        vertices[index_indices * 3 + 0] = vertex.x;
        vertices[index_indices * 3 + 1] = vertex.y;
        vertices[index_indices * 3 + 2] = vertex.z;
        // Copy color
        colors[index_indices * 4 + 0] = color.r;
        colors[index_indices * 4 + 1] = color.g;
        colors[index_indices * 4 + 2] = color.b;
        colors[index_indices * 4 + 3] = color.a;
        // Copy normal
        var nIdx = face.nIndices[k];
        if(nIdx >= 0){
          var normal = this.normals[nIdx];
          normals[index_indices * 3 + 0] = normal.x;
          normals[index_indices * 3 + 1] = normal.y;
          normals[index_indices * 3 + 2] = normal.z;
        }else{
          normals[index_indices * 3 + 0] = faceNormal.x;
          normals[index_indices * 3 + 1] = faceNormal.y;
          normals[index_indices * 3 + 2] = faceNormal.z;
        }
        index_indices ++;
      }
    }
  }

  return new DrawingInfo(vertices, normals, colors, indices);
}

//------------------------------------------------------------------------------
// MTLDoc Object
//------------------------------------------------------------------------------
var MTLDoc = function() {
  this.complete = false; // MTL is configured correctly
  this.materials = new Array(0);
}

MTLDoc.prototype.parseNewmtl = function(sp) {
  return sp.getWord();         // Get name
}

MTLDoc.prototype.parseRGB = function(sp, name) {
  var r = sp.getFloat();
  var g = sp.getFloat();
  var b = sp.getFloat();
  return (new Material(name, r, g, b, 1));
}

//------------------------------------------------------------------------------
// Material Object
//------------------------------------------------------------------------------
var Material = function(name, r, g, b, a) {
  this.name = name;
  this.color = new Color(r, g, b, a);
}

//------------------------------------------------------------------------------
// Vertex Object
//------------------------------------------------------------------------------
var Vertex = function(x, y, z) {
  this.x = x;
  this.y = y;
  this.z = z;
}

//------------------------------------------------------------------------------
// Normal Object
//------------------------------------------------------------------------------
var Normal = function(x, y, z) {
  this.x = x;
  this.y = y;
  this.z = z;
}

//------------------------------------------------------------------------------
// Color Object
//------------------------------------------------------------------------------
var Color = function(r, g, b, a) {
  this.r = r;
  this.g = g;
  this.b = b;
  this.a = a;
}

//------------------------------------------------------------------------------
// OBJObject Object
//------------------------------------------------------------------------------
var OBJObject = function(name) {
  this.name = name;
  this.faces = new Array(0);
  this.numIndices = 0;
}

OBJObject.prototype.addFace = function(face) {
  this.faces.push(face);
  this.numIndices += face.numIndices;
}

//------------------------------------------------------------------------------
// Face Object
//------------------------------------------------------------------------------
var Face = function(materialName) {
  this.materialName = materialName;
  if(materialName == null)  this.materialName = "";
  this.vIndices = new Array(0);
  this.nIndices = new Array(0);
}

//------------------------------------------------------------------------------
// DrawInfo Object
//------------------------------------------------------------------------------
var DrawingInfo = function(vertices, normals, colors, indices) {
  this.vertices = vertices;
  this.normals = normals;
  this.colors = colors;
  this.indices = indices;
}

//------------------------------------------------------------------------------
// Constructor
var StringParser = function(str) {
  this.str;   // Store the string specified by the argument
  this.index; // Position in the string to be processed
  this.init(str);
}
// Initialize StringParser object
StringParser.prototype.init = function(str){
  this.str = str;
  this.index = 0;
}

// Skip delimiters
StringParser.prototype.skipDelimiters = function()  {
  for(var i = this.index, len = this.str.length; i < len; i++){
    var c = this.str.charAt(i);
    // Skip TAB, Space, '(', ')
    if (c == '\t'|| c == ' ' || c == '(' || c == ')' || c == '"') continue;
    break;
  }
  this.index = i;
}

// Skip to the next word
StringParser.prototype.skipToNextWord = function() {
  this.skipDelimiters();
  var n = getWordLength(this.str, this.index);
  this.index += (n + 1);
}

// Get word
StringParser.prototype.getWord = function() {
  this.skipDelimiters();
  var n = getWordLength(this.str, this.index);
  if (n == 0) return null;
  var word = this.str.substr(this.index, n);
  this.index += (n + 1);

  return word;
}

// Get integer
StringParser.prototype.getInt = function() {
  return parseInt(this.getWord());
}

// Get floating number
StringParser.prototype.getFloat = function() {
  return parseFloat(this.getWord());
}

// Get the length of word
function getWordLength(str, start) {
  var n = 0;
  for(var i = start, len = str.length; i < len; i++){
    var c = str.charAt(i);
    if (c == '\t'|| c == ' ' || c == '(' || c == ')' || c == '"') 
  break;
  }
  return i - start;
}

//------------------------------------------------------------------------------
// Common function
//------------------------------------------------------------------------------
function calcNormal(p0, p1, p2) {
  // v0: a vector from p1 to p0, v1; a vector from p1 to p2
  var v0 = new Float32Array(3);
  var v1 = new Float32Array(3);
  for (var i = 0; i < 3; i++){
    v0[i] = p0[i] - p1[i];
    v1[i] = p2[i] - p1[i];
  }

  // The cross product of v0 and v1
  var c = new Float32Array(3);
  c[0] = v0[1] * v1[2] - v0[2] * v1[1];
  c[1] = v0[2] * v1[0] - v0[0] * v1[2];
  c[2] = v0[0] * v1[1] - v0[1] * v1[0];

  // Normalize the result
  var v = new Vector3(c);
  v.normalize();
  return v.elements;
}



