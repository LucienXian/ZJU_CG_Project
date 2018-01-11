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
		console.log('gl init fail');
		return;
	}

	gl.clearColor(0, 0, 0, 1);
	gl.enable(gl.DEPTH_TEST);

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

	document.onkeydown = function(ev) {keydown(ev);};
	redraw();

    replayMessage = document.getElementById("replayMessage");
    fieldDistance = document.getElementById("distValue");
    document.addEventListener('mouseup', handleMouseUp, false);
    document.addEventListener('touchend', handleTouchEnd, false);

    resetGame();
    //控制游戏结束
    loop();


    var saveButton = document.getElementById("saveImageBtn");
    bindButtonEvent(saveButton, "click", saveImageInfo);
    var dlButton = document.getElementById("downloadImageBtn");
    bindButtonEvent(dlButton, "click", saveAsLocalImage);

}
function bindButtonEvent(element, type, handler)
{
    if(element.addEventListener) {
        element.addEventListener(type, handler, false);
    } else {
        element.attachEvent('on'+type, handler);
    }
}

function saveImageInfo ()
{
    var myCanvas = document.getElementById("webgl");
    // here is the most important part because if you dont replace you will get a DOM 18 exception.
    // var image = myCanvas.toDataURL("image/png").replace("image/png", "image/octet-stream;Content-Disposition: attachment;filename=foobar.png");
    var image = myCanvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    window.location.href=image; // it will save locally


}

function saveAsLocalImage () {

    html2canvas(document.body, {
        allowTaint: true,
        taintTest: false,
        onrendered: function(canvas) {
            canvas.id = "mycanvas";
            //document.body.appendChild(canvas);
            //生成base64图片数据
           var  dataUrl = canvas.toDataURL();
            var newImg = document.createElement("img");
            newImg.src =  dataUrl;
            document.body.appendChild(newImg);
            document.querySelector(".down").setAttribute('href',canvas.toDataURL());
        }



    });

}

