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

var SKY_VERTEX_SHADER=
  "attribute vec4 a_Position;\n" + 
  "varying vec3 v_SkyCoord;\n" +
  "uniform mat4 u_ViewMatrix;\n" +
  "uniform mat4 u_ProjMatrix;\n" +
  "void main()\n" +
  '{\n' +
  " vec4 p = u_ProjMatrix*mat4(mat3(u_ViewMatrix))*vec4(a_Position.xyz, 1.0);\n"+
  " gl_Position = p.xyww;\n"+
  " v_SkyCoord = a_Position.xyz;\n"+
  "}\n";

var SKY_FRAGMENT_SHADER = 
  "precision mediump float;\n"+
  "uniform samplerCube u_SkyTexMap;\n"+
  "varying vec3 v_SkyCoord;\n"+
  "void main()\n"+
  "{\n"+
  " gl_FragColor = textureCube(u_SkyTexMap, v_SkyCoord);\n"+
  "}\n";