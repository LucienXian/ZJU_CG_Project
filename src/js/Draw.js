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

var redraw = function() 
{
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
    requestAnimationFrame(redraw, canvas);
 }
 
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