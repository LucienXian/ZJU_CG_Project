function isCollision()
{
	for(var i = 0; i < 8; i++)
	{
		for(var j = 0; j < 18; j++)
		{
			if(j >= 6 && j < 12)
				if(isCollideToSphere(i, j))
					return true;
		}
	}
	return false;
}

function isCollideToSphere(Cubei, Spherej)
{
/********************************* Cubei **************************************************/
 	var TempTransfer = translateDis[Cubei];
  

	if (isTPP) {
		modelmatrix.setTranslate(transformx +FlyDis, transformy, transformz);
		modelmatrix.rotate(PlaneAngel, 0, 0, 1);
		modelmatrix.translate(TempTransfer[0]  , TempTransfer[1] , TempTransfer[2] )
	}
	else  {
		modelmatrix.setTranslate(FlyDis + transformx, transformy, transformz);
		modelmatrix.rotate(PlaneAngel, 0, 0, 1);
		modelmatrix.translate(TempTransfer[0] , TempTransfer[1] , TempTransfer[2] )
	}
  
  
	if (Cubei == 6 || Cubei == 7) {
		modelmatrix.rotate(angle, 1, 0, 0);
	}

	var TempScaleRatio = scaleRatio[Cubei];
	modelmatrix.scale(TempScaleRatio[0], TempScaleRatio[1], TempScaleRatio[2]);

/********************************* Spherej **************************************************/	
	var TempPos = ObjPostion[Spherej];

   // g_modelMatrix.setTranslate(TempPos[0], TempPos[1], TempPos[2]);
    //if (Spherej >=6 && Spherej <= 9)
     // g_modelMatrix.rotate(angle, 0.0, 1.0, 0.0); 
    //g_modelMatrix.rotate(90, 0,0,1);
	
	//var g0 = new Vector3([0, 0, 0]);
	var g = new Vector3([TempPos[0], TempPos[1], TempPos[2]]);
	console.log("g"+g.elements);
	for(var i = 0; i < 6; i++)
	{
		var v1 = new Vector3([vertices[12 * i], vertices[12 * i + 1], vertices[12 * i + 2]]);
		var v2 = new Vector3([vertices[12 * i + 3], vertices[12 * i + 4], vertices[12 * i + 5]]);
		var v3 = new Vector3([vertices[12 * i + 6], vertices[12 * i + 7], vertices[12 * i + 8]]);
		var v4 = new Vector3([vertices[12 * i + 9], vertices[12 * i + 10], vertices[12 * i + 11]]);
		var v1_t = modelmatrix.multiplyVector3(v1);
		var v2_t = modelmatrix.multiplyVector3(v2);
		var v3_t = modelmatrix.multiplyVector3(v3);
		var v4_t = modelmatrix.multiplyVector3(v4);
		var r1 = Math.sqrt((v1_t.elements[0] - g.elements[0]) *  (v1_t.elements[0] - g.elements[0]) + (v1_t.elements[1] - g.elements[1]) *  (v1_t.elements[1] - g.elements[1]) + (v1_t.elements[2] - g.elements[2]) *  (v1_t.elements[2] - g.elements[2]));
		console.log("r1"+r1);
		if(r1 < SPHERERadius)
		{
			console.log("SPHERE"+Spherej);
			console.log("r1"+r1);
			console.log("g"+g.elements);
			console.log("x"+(TempTransfer[0]+transformx +FlyDis));
			return true;
		}
		else
		{
			var r2 = Math.sqrt((v2_t.elements[0] - g.elements[0]) *  (v2_t.elements[0] - g.elements[0]) + (v2_t.elements[1] - g.elements[1]) *  (v2_t.elements[1] - g.elements[1]) + (v2_t.elements[2] - g.elements[2]) *  (v2_t.elements[2] - g.elements[2]));
			console.log("r2"+r2);
			if(r2 < SPHERERadius)
			{
				console.log("SPHERE"+Spherej);
				console.log("r2"+r2);
				console.log("x"+(TempTransfer[0]+transformx +FlyDis));
				return true;
			}
			else
			{
				var r3 = Math.sqrt((v3_t.elements[0] - g.elements[0]) *  (v3_t.elements[0] - g.elements[0]) + (v3_t.elements[1] - g.elements[1]) *  (v3_t.elements[1] - g.elements[1]) + (v3_t.elements[2] - g.elements[2]) *  (v3_t.elements[2] - g.elements[2]));
				console.log("r3"+r3);
				if(r3 < SPHERERadius)
				{
					console.log("SPHERE"+Spherej);
					console.log("r3"+r3);
					console.log("x"+(TempTransfer[0]+transformx +FlyDis));
					return true;
				}
				else
				{
					var r4 = Math.sqrt((v4_t.elements[0] - g.elements[0]) *  (v4_t.elements[0] - g.elements[0]) + (v4_t.elements[1] - g.elements[1]) * (v4_t.elements[1] - g.elements[1]) + (v4_t.elements[2] - g.elements[2]) * (v4_t.elements[2] - g.elements[2]));
					console.log("r4"+r4);
					if(r4 < SPHERERadius)
					{
						console.log("SPHERE"+Spherej);
						console.log("r4"+r4);
						console.log("x"+(TempTransfer[0]+transformx +FlyDis));
						return true;
					}
				}
			}
		}
	}
	return false;
}