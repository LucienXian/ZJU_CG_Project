function CollisionDetection()
{
	for(var i = 0; i < 8; i++)
	{
		setCubeModelMatrix(i);
		for(var j = 0; j < 18; j++)
		{
			if(j >= 0 && j < 6)
			{
				if(isCollideToCLOUD(j))
				{
					game.status = "Crash";
					return;
				}
				else
					continue;
			}
			else if(j >= 6 && j < 12)
			{
				if(isCollideToSphere(j))
				{
					game.status = "add";
					return;
				}
				else
					continue;
			}
			else if(j >= 12 && j < 18)
			{
				if(isCollideToBOWIE(j))
				{	
					game.status = "Crash";
					return;
				}
				else
					continue;
			}
		}
	}
}

function isCollideToSphere(Spherej)
{
/********************************* Spherej **************************************************/	
	var TempPos = ObjPostion[Spherej];

	var g = new Vector3([TempPos[0], TempPos[1], TempPos[2]]);
	for(var i = 0; i < 8; i++)
	{
		var v = new Vector4([(i >> 2) & 1, (i >> 1) & 1, i & 1, 1]);
		var v_t = modelmatrix.multiplyVector4(v);
		var r = Math.sqrt((v_t.elements[0] - g.elements[0]) *  (v_t.elements[0] - g.elements[0]) + (v_t.elements[1] - g.elements[1]) *  (v_t.elements[1] - g.elements[1]) + (v_t.elements[2] - g.elements[2]) *  (v_t.elements[2] - g.elements[2]));
		if(r < SPHERERadius)
		{
			return true;
		}
	}
	return false;
}

function isCollideToBOWIE(Bowiej)
{
/********************************* Spherej **************************************************/	
	var TempPos = ObjPostion[Bowiej];

	var g = new Vector3([TempPos[0], TempPos[1], TempPos[2]]);
	for(var i = 0; i < 8; i++)
	{
		var v = new Vector4([(i >> 2) & 1, (i >> 1) & 1, i & 1, 1]);
		var v_t = modelmatrix.multiplyVector4(v);
		if((v_t.elements[0] >= g.elements[0] - BOWIElen) && (v_t.elements[0] <= g.elements[0] + BOWIElen))
		{
			if((v_t.elements[1] >= g.elements[1] - BOWIEwid) && (v_t.elements[1] <= g.elements[1] + BOWIEwid))
			{
				if((v_t.elements[2] >= g.elements[2] - BOWIEhei) && (v_t.elements[2] <= g.elements[2] + BOWIEhei))
					return true;
			}
		}
	}
	return false;
}

function isCollideToCLOUD(Cloudj)
{
/********************************* Spherej **************************************************/	
	var TempPos = ObjPostion[Cloudj];
	g_modelMatrix.setTranslate(TempPos[0], TempPos[1], TempPos[2]);
    if (Cloudj>=6 && Cloudj <= 9)
      g_modelMatrix.rotate(angle, 0.0, 1.0, 0.0); 
	g_modelMatrix.rotate(90, 0,0,1);
	
	var v1_t = g_modelMatrix.multiplyVector4(tv1);
	var v2_t = g_modelMatrix.multiplyVector4(tv2);
	var v3_t = g_modelMatrix.multiplyVector4(tv3);
	var v4_t = g_modelMatrix.multiplyVector4(tv4);
	var n1_t = g_modelMatrix.multiplyVector4(tn1);
	var n2_t = g_modelMatrix.multiplyVector4(tn2);
	var n3_t = g_modelMatrix.multiplyVector4(tn3);
	var n4_t = g_modelMatrix.multiplyVector4(tn4);
	var n5_t = g_modelMatrix.multiplyVector4(tn5);
	var n6_t = g_modelMatrix.multiplyVector4(tn6);
	var zero_t = g_modelMatrix.multiplyVector4(origin);
	n1_t.elements[0] = n1_t.elements[0] - zero_t.elements[0];
	n1_t.elements[1] = n1_t.elements[1] - zero_t.elements[1];
	n1_t.elements[2] = n1_t.elements[2] - zero_t.elements[2];
	
	n2_t.elements[0] = n2_t.elements[0] - zero_t.elements[0];
	n2_t.elements[1] = n2_t.elements[1] - zero_t.elements[1];
	n2_t.elements[2] = n2_t.elements[2] - zero_t.elements[2];
	
	n3_t.elements[0] = n3_t.elements[0] - zero_t.elements[0];
	n3_t.elements[1] = n3_t.elements[1] - zero_t.elements[1];
	n3_t.elements[2] = n3_t.elements[2] - zero_t.elements[2];

	n4_t.elements[0] = n4_t.elements[0] - zero_t.elements[0];
	n4_t.elements[1] = n4_t.elements[1] - zero_t.elements[1];
	n4_t.elements[2] = n4_t.elements[2] - zero_t.elements[2];

	n5_t.elements[0] = n5_t.elements[0] - zero_t.elements[0];
	n5_t.elements[1] = n5_t.elements[1] - zero_t.elements[1];
	n5_t.elements[2] = n5_t.elements[2] - zero_t.elements[2];

	n6_t.elements[0] = n6_t.elements[0] - zero_t.elements[0];
	n6_t.elements[1] = n6_t.elements[1] - zero_t.elements[1];
	n6_t.elements[2] = n6_t.elements[2] - zero_t.elements[2];

	var r1 = new Vector3();
	var r2 = new Vector3();
	var r3 = new Vector3();
	var r4 = new Vector3();
	for(var i = 0; i < 8; i++)
	{
		var v = new Vector4([(i >> 2) & 1, (i >> 1) & 1, i & 1, 1]);
		var v_t = modelmatrix.multiplyVector4(v);
		r1.elements[0] = v1_t.elements[0] - v_t.elements[0];
		r1.elements[1] = v1_t.elements[1] - v_t.elements[1];
		r1.elements[2] = v1_t.elements[2] - v_t.elements[2];
		r2.elements[0] = v2_t.elements[0] - v_t.elements[0];
		r2.elements[1] = v2_t.elements[1] - v_t.elements[1];
		r2.elements[2] = v2_t.elements[2] - v_t.elements[2];
		r3.elements[0] = v3_t.elements[0] - v_t.elements[0];
		r3.elements[1] = v3_t.elements[1] - v_t.elements[1];
		r3.elements[2] = v3_t.elements[2] - v_t.elements[2];
		r4.elements[0] = v4_t.elements[0] - v_t.elements[0];
		r4.elements[1] = v4_t.elements[1] - v_t.elements[1];
		r4.elements[2] = v4_t.elements[2] - v_t.elements[2];
		if((r1.elements[0] * n1_t.elements[0] + r1.elements[1] * n1_t.elements[1] + r1.elements[2] * n1_t.elements[2]) >= 0)
		{
			if((r1.elements[0] * n2_t.elements[0] + r1.elements[1] * n2_t.elements[1] + r1.elements[2] * n2_t.elements[2]) >= 0)
			{
				if((r1.elements[0] * n3_t.elements[0] + r1.elements[1] * n3_t.elements[1] + r1.elements[2] * n3_t.elements[2]) >= 0)
				{
					if((r2.elements[0] * -(n1_t.elements[0]) + r2.elements[1] * -(n1_t.elements[1]) + r2.elements[2] * -(n1_t.elements[2])) >= 0)
					{
						if((r2.elements[0] * -(n2_t.elements[0]) + r2.elements[1] * -(n2_t.elements[1]) + r2.elements[2] * -(n2_t.elements[2])) >= 0)
						{
							if((r2.elements[0] * -(n3_t.elements[0]) + r2.elements[1] * -(n3_t.elements[1]) + r2.elements[2] * -(n3_t.elements[2])) >= 0)
							{
								return true;
							}
						}
					}
				}
			}
		}
		if((r3.elements[0] * n4_t.elements[0] + r3.elements[1] * n4_t.elements[1] + r3.elements[2] * n4_t.elements[2]) >= 0)
		{
			if((r3.elements[0] * n5_t.elements[0] + r3.elements[1] * n5_t.elements[1] + r3.elements[2] * n5_t.elements[2]) >= 0)
			{
				if((r3.elements[0] * n6_t.elements[0] + r3.elements[1] * n6_t.elements[1] + r3.elements[2] * n6_t.elements[2]) >= 0)
				{
					if((r4.elements[0] * -(n4_t.elements[0]) + r4.elements[1] * -(n4_t.elements[1]) + r4.elements[2] * -(n4_t.elements[2])) >= 0)
					{
						if((r4.elements[0] * -(n5_t.elements[0]) + r4.elements[1] * -(n5_t.elements[1]) + r4.elements[2] * -(n5_t.elements[2])) >= 0)
						{
							if((r4.elements[0] * -(n6_t.elements[0]) + r4.elements[1] * -(n6_t.elements[1]) + r4.elements[2] * -(n6_t.elements[2])) >= 0)
							{
								return true;
							}
						}
					}
				}
			}
		}
	}
	return false;
}

function setCubeModelMatrix(i)
{
	var TempTransfer = translateDis[i];
  

	if (isTPP) {
		modelmatrix.setTranslate(transformx + FlyDis, transformy, transformz);
		modelmatrix.rotate(PlaneAngel, 0, 0, 1);
		modelmatrix.translate(TempTransfer[0]  , TempTransfer[1] , TempTransfer[2]);
	}
	else  {
		modelmatrix.setTranslate(FlyDis + transformx, transformy, transformz);
		modelmatrix.rotate(PlaneAngel, 0, 0, 1);
		modelmatrix.translate(TempTransfer[0] , TempTransfer[1] , TempTransfer[2]);
	}
  
  
	if (i == 6 || i == 7) {
		modelmatrix.rotate(angle, 1, 0, 0);
	}

	var TempScaleRatio = scaleRatio[i];
	modelmatrix.scale(TempScaleRatio[0], TempScaleRatio[1], TempScaleRatio[2]);
}