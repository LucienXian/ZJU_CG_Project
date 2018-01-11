function animate() {
    var time_now = Date.now();
    var offset = time_now - time_last;
    time_last = time_now;
    angel += offset * 20 / 100;
    angel = angel % 360;
    floorAngel += offset * 10 / 100;
    floorAngel = floorAngel % 360;
    /*for (var i=0; i<16; i++) {
      if (i == 10 || i == 11) continue;
      ObjPostion[i][0] -= FlySpeed;
      if (ObjPostion[i][0] < -40)
        ObjPostion[i][0] = Math.random() * 30 + 30;
    }*/

    FlyDis += FlySpeed;

    //paint the motion of the plane
    if (isTPP) {
      var disx = locatex  - transformx;
      var disy = locatey - transformy;
      transformx += disx / 8;
      transformy += disy / 8;
      PlaneAngel = disy * 20;
    } else {
      var disx = locatex - transformx;
      var disy = locatey - transformy;
      transformx += disx / 8;
      transformy += disy / 8;
      //PlaneAngel = disy * 20;
    }
    //change the light
    if (lightDirX == 1) 
      light_location[0] += 0.05;
    else if (lightDirX == -1)
      light_location[0] -= 0.05;

    if (lightDirZ == 1 && lightDirX == 0)
      light_location[2] += 0.1;
    else if (lightDirZ == -1 && lightDirX == 0)
      light_location[2] -= 0.1;

    if (light_location[0] >= 10)
      lightDirX = -1;
    else if (light_location[0] <= -5.5 && lightDirX != 0 ) {
      lightDirX = 0;
      lightDirZ = 0 - lightDirZ;
    }
    else if (light_location[2] <= -10  && lightDirX == 0) {
      lightDirZ = 0 - lightDirZ;
    }
    else if (light_location[2] >= 10  && lightDirX == 0) {
      lightDirX = 1;
    }
    
    //console.log(light_location[0] + "    " + light_location[2] + "    " + lightDirX + "   " + lightDirZ)

}

var redraw = function() 
{
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    animate();
    gl.flush();

    if (isTPP == 1) {
        viewmatrix.setLookAt(FlyDis , 0, 10, FlyDis, 0, 0, 0, 1, 0);
        //projmatrix.setOrtho(-20, 20, -10, 10, -10, 20);
        projmatrix.setPerspective(60.0, canvas.width/canvas.height, 1.0, 100.0);

        viewProjMatrix.setPerspective(60.0, canvas.width/canvas.height, 1.0, 100.0);
        //viewProjMatrix.setOrtho(-20, 20, -10, 10, -10, 20);
        viewProjMatrix.lookAt(FlyDis , 0.0, 10.0, FlyDis, 0.0, 0.0, 0.0, 1.0, 0.0);
        
    }
    else {
        viewmatrix.setLookAt(-0.5, (transformy+1) * 10, transformx * 10, 1, transformy+1, transformx, 0, 1, 0);
        projmatrix.setPerspective(60.0, canvas.width/canvas.height, 1.0, 100.0);

        viewProjMatrix.setPerspective(60.0, canvas.width/canvas.height, 1.0, 100.0);
        viewProjMatrix.lookAt(-0.5, (transformy+1) * 10, transformx * 10, 1, transformy+1, transformx, 0, 1, 0);
    }
    
    //cloud
    for (var i=0; i<=5; i++)
      drawObj(gl, CLOUDObjProgram, viewProjMatrix, model2, g_objDoc_CLOUD, g_drawingInfo_CLOUD, i);

    for (var i=6; i<=9; i++)
      drawObj(gl, SPHEREObjProgram, viewProjMatrix, model1, g_objDoc_SPHERE, g_drawingInfo_SPHERE, i);

    for (var i=12; i<=15; i++)
      drawObj(gl, BOWIEObjProgram, viewProjMatrix, model3, g_objDoc_BOWIE, g_drawingInfo_BOWIE, i);
    
    drawPlaneCube(gl, PlaneProgram, cube_red, 0, viewmatrix, modelmatrix, projmatrix, mvpmatrix, PlaneProgram.u_MvpMatrix , PlaneProgram.u_NormalMatrix);
    drawPlaneCube(gl, PlaneProgram, cube_red, 1, viewmatrix, modelmatrix, projmatrix, mvpmatrix, PlaneProgram.u_MvpMatrix , PlaneProgram.u_NormalMatrix);
    drawPlaneCube(gl, PlaneProgram, cube_red, 2, viewmatrix, modelmatrix, projmatrix, mvpmatrix, PlaneProgram.u_MvpMatrix , PlaneProgram.u_NormalMatrix);
    drawPlaneCube(gl, PlaneProgram, cube_white, 3, viewmatrix, modelmatrix, projmatrix, mvpmatrix, PlaneProgram.u_MvpMatrix , PlaneProgram.u_NormalMatrix);
    drawPlaneCube(gl, PlaneProgram, cube_red, 4, viewmatrix, modelmatrix, projmatrix, mvpmatrix, PlaneProgram.u_MvpMatrix , PlaneProgram.u_NormalMatrix);
    drawPlaneCube(gl, PlaneProgram, cube_black, 5, viewmatrix, modelmatrix, projmatrix, mvpmatrix, PlaneProgram.u_MvpMatrix , PlaneProgram.u_NormalMatrix);
    drawPlaneCube(gl, PlaneProgram, cube_black, 6, viewmatrix, modelmatrix, projmatrix, mvpmatrix, PlaneProgram.u_MvpMatrix , PlaneProgram.u_NormalMatrix);
    drawPlaneCube(gl, PlaneProgram, cube_black, 7, viewmatrix, modelmatrix, projmatrix, mvpmatrix, PlaneProgram.u_MvpMatrix , PlaneProgram.u_NormalMatrix);

    if (flag > 0)
      drawSkybox(gl, SkyProgram, projmatrix, viewmatrix, imgs);
    else
      drawSkybox(gl, SkyProgram, projmatrix, viewmatrix, imgs1);

    requestAnimationFrame(redraw, canvas);
 }
 

function drawObj(gl, program, viewProjMatrix, model, objDoc, drawingInfo, index) {
    gl.useProgram(program);

    gl.uniform3f(program.u_LightColor, light_color[0], light_color[1], light_color[2]);
    //gl.uniform3f(program.u_LightPosition, 3.5, 0, 10);
    gl.uniform3f(program.u_LightPosition, light_location[0], light_location[1], light_location[2]);
    gl.uniform3f(program.u_AmbientLight, light_ambient[0], light_ambient[1], light_ambient[2]);

    if (objDoc != null && objDoc.isMTLComplete()){ // OBJ and all MTLs are available
        drawingInfo = onReadComplete(gl, model, objDoc);
        objDoc = null;
    }
    if (!drawingInfo) return;  

    initAttributeVariable(gl, program.a_Position, model.vertexBuffer); 
    initAttributeVariable(gl, program.a_Normal, model.normalBuffer);  
    initAttributeVariable(gl, program.a_Color, model.colorBuffer); 
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, model.indexBuffer);  

    var TempPos = ObjPostion[index]

    g_modelMatrix.setTranslate(TempPos[0], TempPos[1], TempPos[2]);
    if (index >=6 && index <= 9)
      g_modelMatrix.rotate(angel, 0.0, 1.0, 0.0); 
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

    gl.uniform3f(program.u_LightColor, light_color[0], light_color[1], light_color[2]);
    //gl.uniform3f(program.u_LightPosition, 3.5, 0, 10);
    gl.uniform3f(program.u_LightPosition, light_location[0], light_location[1], light_location[2]);
    gl.uniform3f(program.u_AmbientLight, light_ambient[0], light_ambient[1], light_ambient[2]);
    
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
  

  if (isTPP) {
      modelmatrix.setTranslate(transformx +FlyDis, transformy, 0);
      modelmatrix.rotate(PlaneAngel, 0, 0, 1);
      modelmatrix.translate(TempTransfer[0]  , TempTransfer[1] , TempTransfer[2] )
  }
  else  {
      modelmatrix.setTranslate(FlyDis, transformy, transformx);
      //modelmatrix.rotate(PlaneAngel, 0, 0, 1);
      modelmatrix.translate(TempTransfer[0] , TempTransfer[1] , TempTransfer[2] )
  }
  
  
  if (index == 6 || index == 7) {
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



function drawSkybox(gl, SkyProgram, projMatrix, viewmatrix, imgs){
  
  //传递参数
  gl.useProgram(SkyProgram);

  gl.uniformMatrix4fv(SkyProgram.u_ViewMatrix, false, viewmatrix.elements);
  gl.uniformMatrix4fv(SkyProgram.u_ProjMatrix, false, projMatrix.elements);

  var vertexSkyBuffer = gl.createBuffer();
  if (!vertexSkyBuffer) {
    console.log('Failed to create the buffer object vertexSkyBuffer');
    return;
  }

  //顶点属性
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexSkyBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, vertexSkybox, gl.STATIC_DRAW);
  var skybox_FSIZE = vertexSkybox.BYTES_PER_ELEMENT;
  gl.vertexAttribPointer(SkyProgram.a_Position, 3, gl.FLOAT, false, skybox_FSIZE*3, 0);
  gl.enableVertexAttribArray(SkyProgram.a_Position);

  //索引属性
  var indexSkyboxBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexSkyboxBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, skyboxIndex, gl.STATIC_DRAW);
  skybox_IINDEX = skyboxIndex.length;
  skybox_IFSIZE = skyboxIndex.BYTES_PER_ELEMENT;

  //纹理创建
  var texture = gl.createTexture();
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);

  //创建六张纹理
  for (var i = 0; i < 6; i++) {
    gl.texImage2D(targets[i], 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, imgs[i]);    
  }

  gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

  gl.uniform1i(SkyProgram.u_SkyTexMap, 0);
  gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);
  gl.activeTexture(gl.TEXTURE0);
  gl.drawElements(gl.TRIANGLES, skybox_IINDEX, gl.UNSIGNED_SHORT, skybox_IFSIZE * 0);
}