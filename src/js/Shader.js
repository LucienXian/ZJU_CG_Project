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