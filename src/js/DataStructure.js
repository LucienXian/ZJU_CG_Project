var PlaneProgram;
var SPHEREObjProgram;
var model1;
var CLOUDObjProgram;
var model2;
var BOWIEObjProgram;
var model3;


var SkyProgram;//skybox program
var imgs;//load texture image
var imgs1;//other image
var flag = 1;//switch maps

var cube_white;
var cube_red;
var cube_black;

var viewmatrix = new Matrix4();
var modelmatrix = new Matrix4();
var projmatrix = new Matrix4();
var mvpmatrix = new Matrix4();
var viewProjMatrix = new Matrix4();

var game;
var gl;
var canvas;
var replayMessage,fieldDistance;

var FlyDis = 0;
var angel = 0;
var time_last = Date.now();
var floorAngel = 0;

var g_modelMatrix = new Matrix4();
var g_mvpMatrix = new Matrix4();
var g_normalMatrix = new Matrix4();


var ObjPostion = new Array(20);
ObjPostion[0] = new Float32Array([6,7,6]);
ObjPostion[1] = new Float32Array([20,-3,-4]);
ObjPostion[2] = new Float32Array([30,5,-2]);
ObjPostion[3] = new Float32Array([44,-5, -6]);
ObjPostion[4] = new Float32Array([60,-2, 4]);
ObjPostion[5] = new Float32Array([70,8,0]);

ObjPostion[6] = new Float32Array([10,0,-5]);
ObjPostion[7] = new Float32Array([26,-5,3]);
ObjPostion[8] = new Float32Array([40,8,-4]);
ObjPostion[9] = new Float32Array([66,1,-1]);

ObjPostion[12] = new Float32Array([-6,-4,5]);
ObjPostion[13] = new Float32Array([24,6,-4]);
ObjPostion[14] = new Float32Array([54,-3,4]);
ObjPostion[15] = new Float32Array([74,4,2]);

var transformx = 0.0;
var transformy = 0.0;
var locatex = 0.0;
var locatey = 0.0;
var PlaneAngle = 0.0;
var FlySpeed = 0.1;

var light_color = new Float32Array([1, 1, 1]);
var light_location = new Float32Array([-5.5, 5, 10]);
var light_ambient = new Float32Array([0.2, 0.2, 0.2]);
var lightDirX = 1;
var lightDirZ = 1;

var gnear = 0, gfar = 10;
var eyex = 0, eyey = 0, eyez = 4;
var isTPP = 1;

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
 
var g_objDoc_CLOUD = null;      // The information of OBJ file
var g_drawingInfo_CLOUD = null; // The information for drawing 3D model

var g_objDoc_SPHERE = null;      // The information of OBJ file
var g_drawingInfo_SPHERE = null; // The information for drawing 3D model

var g_objDoc_BOWIE = null;      // The information of OBJ file
var g_drawingInfo_BOWIE = null; // The information for drawing 3D model




var urls = [
    '../../resources/mp_vr/rt.jpg',
    '../../resources/mp_vr/lf.jpg',
    '../../resources/mp_vr/up.jpg',
    '../../resources/mp_vr/dn.jpg',
    '../../resources/mp_vr/bk.jpg',
    '../../resources/mp_vr/ft.jpg'
  ];


var urls1 = [
    '../../resources/ame_nebula/rt.jpg',
    '../../resources/ame_nebula/lf.jpg',
    '../../resources/ame_nebula/up.jpg',
    '../../resources/ame_nebula/dn.jpg',
    '../../resources/ame_nebula/bk.jpg',
    '../../resources/ame_nebula/ft.jpg'
  ];

var targets;

  // Create a cube
  //    v6----- v5
  //   /|      /|
  //  v1------v0|
  //  | |     | |
  //  | |v7---|-|v4
  //  |/      |/
  //  v2------v3
var vertexSkybox = new Float32Array([
      // Vertex coordinates and color
       1.0,  1.0,  1.0,  // v0
      -1.0,  1.0,  1.0,  // v1
      -1.0, -1.0,  1.0,  // v2
       1.0, -1.0,  1.0,  // v3
       1.0, -1.0, -1.0,  // v4
       1.0,  1.0, -1.0,  // v5
      -1.0,  1.0, -1.0,  // v6
      -1.0, -1.0, -1.0,  // v7
    ]);

// Indices of the vertices
var skyboxIndex = new Uint16Array([
      0, 3, 4,   0, 4, 5,    // right
      1, 6, 7,   1, 7, 2,    // left
      0, 5, 6,   0, 6, 1,    // up
      7, 4, 3,   7, 3, 2,    // down
      4, 7, 6,   4, 6, 5,    // back
      0, 1, 2,   0, 2, 3     // front
  ]);
