endlessCanvas = true;


var mapSizePow2 = 9;
var map = createMapDSA(mapSizePow2);
var breakPoint = 0;
var zoom = 1;
var offsetX=0, offsetY=0;

/*function drawMap(map,mapSizePow2N,scale = 1){
	var mapSizePow2=Math.pow(2,mapSizePow2N)+1;
	for(var i = 0; i < mapSizePow2; i++){
		for(var j = 0; j < mapSizePow2; j++){
								context.fillStyle = RGB(0,0,0);
			if(map[i][j]>64)	context.fillStyle = RGB(map[i][j]-64,0,0);
			if(map[i][j]>128)	context.fillStyle = RGB(map[i][j]-64,map[i][j]-128,0);
			if(map[i][j]>192)	context.fillStyle = RGB(map[i][j]-64,map[i][j]-128,map[i][j]-192);
			context.fillRect(i*scale, j*scale, scale, scale);
		}
	}
}*/

/***/

/*var x = [Math.pow(2,mapSizePow2)/2];
var y = [Math.pow(2,mapSizePow2)/2];

var mapBFS = bfs(map,x,y);

function bfs(map,qx,qy){
	console.log("h1");
	var map2 = [];
	for(var i = 0; i < map.length; i++){
		map2[i] = [];
		for(var j = 0; j < map.length; j++){
			map2[i][j] = 2;
		}
	}
	console.log("h2");
	while(qx.length>0){
		if(map2[qx[0]][qy[0]]!=1){
			map2[qx[0]][qy[0]] = 1;
			if(map[qx[0]+1]!=undefined&& map[qx[0]+1][qy[0]]>128){
				qx.push(qx[0]+1);
				qy.push(qy[0]);
			}
			if(map[qx[0]-1]!=undefined&& map[qx[0]-1][qy[0]]>128){
				qx.push(qx[0]-1);
				qy.push(qy[0]);
			}
			if(map[qx[0]][qy[0]+1]!= undefined&& map[qx[0]][qy[0]+1]>128){
				qx.push(qx[0]);
				qy.push(qy[0]+1);
			}
			if(map[qx[0]][qy[0]-1]!= undefined&& map[qx[0]][qy[0]-1]>128){
				qx.push(qx[0]);
				qy.push(qy[0]-1);
			}
		}
		qx.shift();
		qy.shift();
	}

	var map3 = [];
	for(var i = 0; i < map.length; i++){
		map3[i] = [];
		for(var j = 0; j < map.length; j++){
			map3[i][j] = 1;
		}
	}
	for(var n=0; n < map.length ;n++){
		qx.push(n);	qx.push(0);	qx.push(n);	qx.push(map.length-1);
		qy.push(0);	qy.push(n);	qy.push(map.length-1);	qy.push(n);
	}
	while(qx.length>0){
		if(map3[qx[0]][qy[0]]!=0){
			map3[qx[0]][qy[0]] = 0;
			if(map2[qx[0]+1]!=undefined && map2[qx[0]+1][qy[0]]==2){
				qx.push(qx[0]+1);
				qy.push(qy[0]);
			}
			if(map2[qx[0]-1]!=undefined && map2[qx[0]-1][qy[0]]==2){
				qx.push(qx[0]-1);
				qy.push(qy[0]);
			}
			if(map2[qx[0]][qy[0]+1]!= undefined && map2[qx[0]][qy[0]+1]==2){
				qx.push(qx[0]);
				qy.push(qy[0]+1);
			}
			if(map2[qx[0]][qy[0]-1]!= undefined && map2[qx[0]][qy[0]-1]==2){
				qx.push(qx[0]);
				qy.push(qy[0]-1);
			}
		}
		qx.shift();
		qy.shift();
	}
	return map3;
}

*/


/***/


function RGB(r,g,b){
	return "rgb("+Math.round(r)+","+Math.round(g)+","+Math.round(b)+")";
}


/*function drawBFSMap(mapSizePow2N,scale = 1,x,y){
	var mapSizePow2=Math.pow(2,mapSizePow2N)+1;
	for(var i = 0; i < mapSizePow2; i++){
		for(var j = 0; j < mapSizePow2; j++){
								context.fillStyle = RGB(192+map[i][j]/2,192+map[i][j]/4,255);
			if(map[i][j] > breakPoint)	context.fillStyle = RGB(map[i][j],map[i][j]/2+64,map[i][j]/4);
			//context.fillRect(i*scale-x*scale, j*scale-y*scale, scale, scale);
			context.fillRect(i*scale, j*scale, scale, scale);
		}
	}
}*/

function drawBFSMapOptimize(mapSizePow2N,scale = 1,offsetX=0,offsetY=0){
	var mapSizePow2=Math.pow(2,mapSizePow2N)+1;
	var mx,my;
	if((mapSizePow2-offsetX)*scale < canvas.width){
		mx = mapSizePow2 - offsetX;
	}else{
		mx = canvas.width/scale;
	}
	if((mapSizePow2-offsetY)*scale < canvas.height){
		my = mapSizePow2 - offsetY;
	}else{
		my = canvas.height/scale;
	}
	var units = 0;
	for(var i = offsetX; i < mx + offsetX; i+=1){
		for(var j = offsetY; j < my + offsetY; j+=1){
								context.fillStyle = RGB(128+map[i][j]/16,128+map[i][j]/16,255+map[i][j]/64);
			if(map[i][j] > breakPoint)	context.fillStyle = RGB(map[i][j]/8,map[i][j]/16+64,map[i][j]/32);
			context.fillRect((i-offsetX)*scale, (j-offsetY)*scale, scale, scale);
			units++;
		}
	}
	context.font = "18px Georgia";
	context.fillStyle = "black";
	context.fillText("Units: " + units, 20, 40);
	context.fillText("Timer: " + timer, 20, 80);
	context.fillText("Units/Timer: " + units/timer, 20, 120);
}


function update() {
	/*if(isKeyPressed[key_down]){
		offsetY++;
	}
	if(isKeyPressed[key_right]){
		offsetX++;
	}
	if(isKeyPressed[key_up] && offsetY > 0){
		offsetY--;
	}
	if(isKeyPressed[key_left] && offsetX > 0){
		offsetX--;
	}
	if(isKeyPressed[key_a] && zoom<25){
		zoom++;
	}
	if(isKeyPressed[key_z] && zoom>1){
		zoom--;
	}*/
}

function draw() {
	drawBFSMapOptimize(mapSizePow2,zoom,offsetX,offsetY);
}