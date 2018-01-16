var PlaneProgram;
var SPHEREObjProgram;
var model1;
var CLOUDObjProgram;
var model2;
var BOWIEObjProgram;
var model3;

var clocklastTime = Date.now();

/****************************************Collision Detection Usage****************************************/
var origin = new Vector4([0, 0, 0, 1]);
var TestV1 = new Float32Array([
	-1.112440 * 0.3, 0.364238 * 0.3, 1.923810 * 0.3,
	0.887560 * 0.3, 2.364238 * 0.3, -0.076190 * 0.3
]);
var TestN1 = new Float32Array([
	0.0000, 0.0000, 1.0000,
	-1.0000, 0.0000, 0.0000,
	0.0000, -1.0000, 0.0000
]);
var TestV2 = new Float32Array([
	1.579052 * 0.3, 0.199960 * 0.3, -0.683089 * 0.3,
	-1.579052 * 0.3, -0.199960 * 0.3, 0.683089 * 0.3
]);
var TestN2 = new Float32Array([
	0.7698, 0.4542, 0.4485,
	0.6046, -0.7441, -0.2842,
	0.2047, 0.4899, -0.8474
]);
var tv1 = new Vector4([TestV1[0], TestV1[1], TestV1[2], 1]);
var tv2 = new Vector4([TestV1[3], TestV1[4], TestV1[5], 1]);
var tv3 = new Vector4([TestV2[0], TestV2[1], TestV2[2], 1]);
var tv4 = new Vector4([TestV2[3], TestV2[4], TestV2[5], 1]);
var tn1 = new Vector4([TestN1[0], TestN1[1], TestN1[2], 1]);
var tn2 = new Vector4([TestN1[3], TestN1[4], TestN1[5], 1]);
var tn3 = new Vector4([TestN1[6], TestN1[7], TestN1[8], 1]);
var tn4 = new Vector4([TestN2[0], TestN2[1], TestN2[2], 1]);
var tn5 = new Vector4([TestN2[3], TestN2[4], TestN2[5], 1]);
var tn6 = new Vector4([TestN2[6], TestN2[7], TestN2[8], 1]);
var SPHERERadius = 0.392600;
var BOWIEwid = 0.439800;
var BOWIElen = 0.758384;
var BOWIEhei = 0.638112;
/****************************************Collision Detection Usage****************************************/

var SkyProgram;//skybox program
var imgs;//load texture image
var imgs1;//other image
var flag = 1;//switch maps

var texture0;
var texture1;

var vertexSkyBuffer;
var indexSkyboxBuffer;

var cube_white;
var cube_red;
var cube_black;

var viewmatrix = new Matrix4();
var skyviewmatrix = new Matrix4();
var modelmatrix = new Matrix4();
var projmatrix = new Matrix4();
var mvpmatrix = new Matrix4();
var viewProjMatrix = new Matrix4();

var game = {
        status: "playing",
        energy: 100
    };
var gl;
var canvas;
var replayMessage,fieldDistance;

var FlyDis = 0;
var angle = 0;
var time_last = Date.now();
var floorAngel = 0;

var g_modelMatrix = new Matrix4();
var g_mvpMatrix = new Matrix4();
var g_normalMatrix = new Matrix4();


var ObjPostion = new Array(20);
ObjPostion[0] = new Float32Array([2,7,12]);
ObjPostion[1] = new Float32Array([11,-3,-8]);
ObjPostion[2] = new Float32Array([29,-5, -12]);
ObjPostion[3] = new Float32Array([36,1,-4]);
ObjPostion[4] = new Float32Array([60,-2, 8]);
ObjPostion[5] = new Float32Array([70,8,0]);

ObjPostion[6] = new Float32Array([6,0,-10]);
ObjPostion[7] = new Float32Array([17,-5,6]);
ObjPostion[8] = new Float32Array([34,1,-1]);
ObjPostion[9] = new Float32Array([46,0,9]);
ObjPostion[10] = new Float32Array([55,-5,-5]);
ObjPostion[11] = new Float32Array([74,1,2]);

ObjPostion[12] = new Float32Array([-6,-4,11]);
ObjPostion[13] = new Float32Array([23,-3,15]);
ObjPostion[14] = new Float32Array([41,4,3]);
ObjPostion[15] = new Float32Array([51,-4,6]);
ObjPostion[16] = new Float32Array([72,-3,-13]);
ObjPostion[17] = new Float32Array([80,2,0]);

var transformx = 0.0;
var transformy = 0.0;
var transformz = 0.0;

var locatex = 0.0;
var locatey = 0.0;
var locatez = 0.0;

var PlaneAngle = 0.0;
var FlySpeed = 0.1;

var light_color = new Float32Array([1, 1, 1]);
var light_location = new Float32Array([-5.5, 5, 10]);
var light_ambient = new Float32Array([0.2, 0.2, 0.2]);
var lightDirX = 1;
var lightDirZ = 1;

var gnear = 0, gfar = 10;
var eyex = 0, eyey = 0, eyez = 4;
var isTPP = true;

var scaleRatio = new Array(12);
//the airplane
scaleRatio[0] = new Float32Array([0.6, 0.5, 0.5]);
scaleRatio[1] = new Float32Array([0.4, 0.1, 0.4]);
scaleRatio[2] = new Float32Array([0.4, 0.1, 0.4]);
scaleRatio[3] = new Float32Array([0.15, 0.5, 0.5]);
scaleRatio[4] = new Float32Array([0.15, 0.2, 0.2]);
scaleRatio[5] = new Float32Array([0.075, 0.1, 0.1]);
scaleRatio[6] = new Float32Array([0.025, 0.85, 0.1]);
scaleRatio[7] = new Float32Array([0.025, 0.1, 0.85]);



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
    '../../resources/cloud/rt.jpg',
    '../../resources/cloud/lf.jpg',
    '../../resources/cloud/up.jpg',
    '../../resources/cloud/dn.jpg',
    '../../resources/cloud/bk.jpg',
    '../../resources/cloud/ft.jpg'
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
