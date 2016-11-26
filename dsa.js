var randomSum = 64;
function diamond(map,x,y,n){
	//console.log(x,y,n);
	var r = Math.random()*(randomSum * n)*2 - (randomSum * n);
	//var r = (Math.random()*(randomSum))*2 - (randomSum);
	map[x][y] = (map[x+n][y+n] + map[x+n][y-n] + map[x-n][y+n] + map[x-n][y-n])/4 + r;
	return map[x][y];
}

function square(map,x,y,n){
	//console.log(x,y,n);
	var r = Math.random()*(randomSum + n)*2 - (randomSum + n);
	//var r = (Math.random()*(randomSum))*2 - (randomSum);
	if(map[x+n] == undefined){
		map[x][y] = ((map[x][y-n] + map[x][y+n] + map[x-n][y])/3 + r);
		return map[x][y];
	}
	if(map[x-n] == undefined){
		map[x][y] = ((map[x+n][y] + map[x][y+n] + map[x][y-n])/3 + r);
		return map[x][y];
	}
	if(map[x][y+n] == undefined){
		map[x][y] = ((map[x+n][y] + map[x-n][y] + map[x][y-n])/3 + r);
		return map[x][y];
	}
	if(map[x][y-n] == undefined){
		map[x][y] = ((map[x-n][y] + map[x+n][y] + map[x][y+n])/3 + r);
		return map[x][y];
	}
	map[x][y] = ((map[x][y-n] + map[x][y+n] + map[x-n][y] + map[x+n][y])/4 + r);
	return map[x][y];
}

var timer = 0;
/*
var queue = [];
function dsa(map,x,y,u,v){

	var date = new Date();
	timer = date.getTime();

	queue.push([x,y,u,v]);
	while(queue.length>0){

		var q = queue[0];
		queue.shift();
		x=q[0];
		y=q[1];
		u=q[2];
		v=q[3];

		var c = (u-x)/2;
		var a = x+c;
		var b = y+c;
		square(map,x,b,c);
		square(map,a,y,c);
		square(map,u,b,c);
		square(map,a,v,c);
		if(c%2==0){
			diamond(map,a+c/2,b+c/2,c/2);
			diamond(map,a+c/2,b-c/2,c/2);
			diamond(map,a-c/2,b+c/2,c/2);
			diamond(map,a-c/2,b-c/2,c/2);
			queue.push([x,y,a,b]);
			queue.push([a,b,u,v]);
			queue.push([x,b,a,v]);
			queue.push([a,y,u,b]);

		}
	}

	date = new Date();
	timer = date.getTime() - timer;
}
*/

var queue = [];

function dsa(map,_x,_y,_u,_v){

	queue = [_x,_y,_u,_v];

	var date = new Date();
	timer = date.getTime();

	var x,y,u,v,a,b,c;

	var queueShift = 0;
	while(queue.length - queueShift>0){
		x = queue[0 + queueShift];
		y = queue[1 + queueShift];
		u = queue[2 + queueShift];
		v = queue[3 + queueShift];
		c = (u-x)/2;
		a = x+c;
		b = y+c;
		square(map,x,b,c);
		square(map,a,y,c);
		square(map,u,b,c);
		square(map,a,v,c);
		if(c%2==0){
			diamond(map,a+c/2,b+c/2,c/2);
			diamond(map,a+c/2,b-c/2,c/2);
			diamond(map,a-c/2,b+c/2,c/2);
			diamond(map,a-c/2,b-c/2,c/2);
			queue.push(x);queue.push(y);queue.push(a);queue.push(b);
			queue.push(a);queue.push(b);queue.push(u);queue.push(v);
			queue.push(x);queue.push(b);queue.push(a);queue.push(v);
			queue.push(a);queue.push(y);queue.push(u);queue.push(b);

		}

		queueShift += 4;

	}

	date = new Date();
	timer = date.getTime() - timer;

}


function createMapDSA(mapSizeN){
	var mapSize=Math.pow(2,mapSizeN)+1;
	var map = [];
	for(var i = 0; i < mapSize; i++){
		map[i] = [];
		for(var j = 0; j < mapSize; j++){
			map[i][j] = -1;
		}
	}
	map[0][0] = 					(Math.random()*(randomSum))*8 - (randomSum)*4;
	map[mapSize-1][0] = 			(Math.random()*(randomSum))*8 - (randomSum)*4;
	map[0][mapSize-1] = 			(Math.random()*(randomSum))*8 - (randomSum)*4;
	map[mapSize-1][mapSize-1] =		(Math.random()*(randomSum))*8 - (randomSum)*4;
	map[(mapSize-1)/2][(mapSize-1)/2] = (map[0][0]+map[mapSize-1][0]+map[0][mapSize-1]+map[mapSize-1][mapSize-1]);
	/*map[0][0] = 					0;
	map[mapSize-1][0] = 			0;
	map[0][mapSize-1] = 			0;
	map[mapSize-1][mapSize-1] =		0;
	map[(mapSize-1)/2][(mapSize-1)/2] = 500;*/
	dsa(map,0,0,mapSize-1,mapSize-1);
	return map;
}
