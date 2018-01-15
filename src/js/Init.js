function PlaneInit()
{
	PlaneProgram = createProgram(gl, VSHADER_SOURCE, FSHADER_SOURCE);
	if (!PlaneProgram)
	{
		console.log('Failed to intialize shaders.');
		return;
	}
	
	PlaneProgram.a_Position = gl.getAttribLocation(PlaneProgram, 'a_Position');
	PlaneProgram.a_Normal = gl.getAttribLocation(PlaneProgram, 'a_Normal');
	PlaneProgram.a_Color = gl.getAttribLocation(PlaneProgram, 'a_Color');
	PlaneProgram.u_MvpMatrix = gl.getUniformLocation(PlaneProgram, 'u_MvpMatrix');
	PlaneProgram.u_NormalMatrix = gl.getUniformLocation(PlaneProgram, 'u_NormalMatrix');
	PlaneProgram.u_LightColor = gl.getUniformLocation(PlaneProgram, 'u_LightColor');
	PlaneProgram.u_LightPosition = gl.getUniformLocation(PlaneProgram, 'u_LightPosition');
	PlaneProgram.u_AmbientLight = gl.getUniformLocation(PlaneProgram, 'u_AmbientLight');
	if (PlaneProgram.a_Position < 0 ||  PlaneProgram.a_Normal < 0 || PlaneProgram.a_Color < 0 ||
        !PlaneProgram.u_MvpMatrix || !PlaneProgram.u_NormalMatrix || !PlaneProgram.u_LightColor ||
		!PlaneProgram.u_LightPosition || !PlaneProgram.u_AmbientLight) 
	{
		console.log('attribute, uniform storage failed'); 
		return;
    }
	
	
}

function SPHEREObjInit()
{
	SPHEREObjProgram = createProgram(gl, VSHADER_SOURCE, FSHADER_SOURCE);
	if (!SPHEREObjProgram) 
	{
		console.log('Failed to intialize shaders.');
		return;
	}
	
	SPHEREObjProgram.a_Position = gl.getAttribLocation(SPHEREObjProgram, 'a_Position');
	SPHEREObjProgram.a_Normal = gl.getAttribLocation(SPHEREObjProgram, 'a_Normal');
	SPHEREObjProgram.a_Color = gl.getAttribLocation(SPHEREObjProgram, 'a_Color');
	SPHEREObjProgram.u_MvpMatrix = gl.getUniformLocation(SPHEREObjProgram, 'u_MvpMatrix');
	SPHEREObjProgram.u_NormalMatrix = gl.getUniformLocation(SPHEREObjProgram, 'u_NormalMatrix');
	SPHEREObjProgram.u_LightColor = gl.getUniformLocation(SPHEREObjProgram, 'u_LightColor');
	SPHEREObjProgram.u_LightPosition = gl.getUniformLocation(SPHEREObjProgram, 'u_LightPosition');
	SPHEREObjProgram.u_AmbientLight = gl.getUniformLocation(SPHEREObjProgram, 'u_AmbientLight');
	if (SPHEREObjProgram.a_Position < 0 ||  SPHEREObjProgram.a_Normal < 0 || SPHEREObjProgram.a_Color < 0 ||
        !SPHEREObjProgram.u_MvpMatrix || !SPHEREObjProgram.u_NormalMatrix || !SPHEREObjProgram.u_LightColor ||
		!SPHEREObjProgram.u_LightPosition || !SPHEREObjProgram.u_AmbientLight) 
	{
		console.log('attribute, uniform storage failed'); 
		return;
	}
	
	model1 = initObjVertexBuffers(gl, SPHEREObjProgram);
	if (!model1) 
	{
      console.log('Failed to set the vertex information');
      return;
	}
	readSPHEREOBJFile('../../resources/2.obj', gl, model1, 0.13, true);
}

function CLOUDObjInit()
{
	CLOUDObjProgram = createProgram(gl, VSHADER_SOURCE, FSHADER_SOURCE);
	if (!CLOUDObjProgram) 
	{
		console.log('Failed to intialize shaders.');
		return;
	}
	
	CLOUDObjProgram.a_Position = gl.getAttribLocation(CLOUDObjProgram, 'a_Position');
	CLOUDObjProgram.a_Normal = gl.getAttribLocation(CLOUDObjProgram, 'a_Normal');
	CLOUDObjProgram.a_Color = gl.getAttribLocation(CLOUDObjProgram, 'a_Color');
	CLOUDObjProgram.u_MvpMatrix = gl.getUniformLocation(CLOUDObjProgram, 'u_MvpMatrix');
	CLOUDObjProgram.u_NormalMatrix = gl.getUniformLocation(CLOUDObjProgram, 'u_NormalMatrix');
	CLOUDObjProgram.u_LightColor = gl.getUniformLocation(CLOUDObjProgram, 'u_LightColor');
	CLOUDObjProgram.u_LightPosition = gl.getUniformLocation(CLOUDObjProgram, 'u_LightPosition');
	CLOUDObjProgram.u_AmbientLight = gl.getUniformLocation(CLOUDObjProgram, 'u_AmbientLight');
	if (CLOUDObjProgram.a_Position < 0 ||  CLOUDObjProgram.a_Normal < 0 || CLOUDObjProgram.a_Color < 0 ||
        !CLOUDObjProgram.u_MvpMatrix || !CLOUDObjProgram.u_NormalMatrix || !CLOUDObjProgram.u_LightColor ||
		!CLOUDObjProgram.u_LightPosition || !CLOUDObjProgram.u_AmbientLight) 
	{
		console.log('attribute, uniform storage failed'); 
		return;
	}
	
	model2 = initObjVertexBuffers(gl, CLOUDObjProgram);
	if (!model2) 
	{
      console.log('Failed to set the vertex information');
      return;
	}
	readCLOUDOBJFile('../../resources/t11.obj', gl, model2, 0.3, true);
}

function BOWIEObjInit()
{
	BOWIEObjProgram = createProgram(gl, VSHADER_SOURCE, FSHADER_SOURCE);
	if (!BOWIEObjProgram) 
	{
		console.log('Failed to intialize shaders.');
		return;
	}
	
	BOWIEObjProgram.a_Position = gl.getAttribLocation(BOWIEObjProgram, 'a_Position');
	BOWIEObjProgram.a_Normal = gl.getAttribLocation(BOWIEObjProgram, 'a_Normal');
	BOWIEObjProgram.a_Color = gl.getAttribLocation(BOWIEObjProgram, 'a_Color');
	BOWIEObjProgram.u_MvpMatrix = gl.getUniformLocation(BOWIEObjProgram, 'u_MvpMatrix');
	BOWIEObjProgram.u_NormalMatrix = gl.getUniformLocation(BOWIEObjProgram, 'u_NormalMatrix');
	BOWIEObjProgram.u_LightColor = gl.getUniformLocation(BOWIEObjProgram, 'u_LightColor');
	BOWIEObjProgram.u_LightPosition = gl.getUniformLocation(BOWIEObjProgram, 'u_LightPosition');
	BOWIEObjProgram.u_AmbientLight = gl.getUniformLocation(BOWIEObjProgram, 'u_AmbientLight');
	if (BOWIEObjProgram.a_Position < 0 ||  BOWIEObjProgram.a_Normal < 0 || BOWIEObjProgram.a_Color < 0 ||
        !BOWIEObjProgram.u_MvpMatrix || !BOWIEObjProgram.u_NormalMatrix || !BOWIEObjProgram.u_LightColor ||
		!BOWIEObjProgram.u_LightPosition || !BOWIEObjProgram.u_AmbientLight) 
	{
		console.log('attribute, uniform storage failed'); 
		return;
	}
	
	model3 = initObjVertexBuffers(gl, BOWIEObjProgram);
	if (!model3) 
	{
      console.log('Failed to set the vertex information');
      return;
	}
	readBOWIEOBJFile('../../resources/tong.obj', gl, model3, 0.3, true);
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



//初始化天空盒
function initSkybox(){
  SkyProgram = createProgram(gl, SKY_VERTEX_SHADER, SKY_FRAGMENT_SHADER);
  if (!SkyProgram)
  {
    console.log('Failed to intialize skybox shaders.');
    return;
  }

  var nimgs = 0;
  imgs = new Array(6);
  imgs1 = new Array(6);
  for (var i = 0; i < 6; i++) {
    imgs[i] = new Image();
    imgs1[i] = new Image();
    imgs1[i].onload = function(){console.log("load texture")}
    imgs[i].onload = function(){
      nimgs++;
      if (nimgs==6){
        skyboxMapping();
      }
    }

    imgs[i].src = urls[i];
    imgs1[i].src = urls1[i];
  }
}

function skyboxMapping(){
  
  SkyProgram.a_Position = gl.getAttribLocation(SkyProgram, 
    "a_Position");
  SkyProgram.u_ViewMatrix = gl.getUniformLocation(SkyProgram, 
    "u_ViewMatrix");
  SkyProgram.u_ProjMatrix = gl.getUniformLocation(SkyProgram,
    "u_ProjMatrix");
  SkyProgram.u_SkyTexMap = gl.getUniformLocation(SkyProgram, 
    "u_SkyTexMap");

  if(SkyProgram.a_Position<0 || !SkyProgram.u_ViewMatrix || 
    !SkyProgram.u_ProjMatrix || !SkyProgram.u_SkyTexMap)
  {
    console.log("Failed to get store location from progrom");
    return;
  }
  vertexSkyBuffer = gl.createBuffer();
  if (!vertexSkyBuffer) {
    console.log('Failed to create the buffer object vertexSkyBuffer');
    return;
  }

  //索引属性
  indexSkyboxBuffer = gl.createBuffer();
  if (!indexSkyboxBuffer) {
    console.log('Failed to create the buffer object indexSkyboxBuffer');
    return;
  }

  createSkyboxTex(0);
  createSkyboxTex(1);
}

function createSkyboxTex(i){
  //gl.useProgram(SkyProgram);

  if (i==0){
    texture0 = gl.createTexture();
    //gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture0);

    //创建六张纹理
    for (var i = 0; i < 6; i++) {
      gl.texImage2D(targets[i], 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, imgs[i]);    
    }

    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    //gl.uniform1i(SkyProgram.u_SkyTexMap, 0);
  }
  else{
    texture1 = gl.createTexture();
    //gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture1);

    //创建六张纹理
    for (var i = 0; i < 6; i++) {
      gl.texImage2D(targets[i], 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, imgs1[i]);    
    }

    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    //gl.uniform1i(SkyProgram.u_SkyTexMap, 1);
  }

}