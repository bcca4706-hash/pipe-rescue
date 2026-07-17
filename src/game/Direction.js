export const UP=0;
export const RIGHT=1;
export const DOWN=2;
export const LEFT=3;

export const DX=[
0,
1,
0,
-1
];

export const DY=[
-1,
0,
1,
0
];

export function opposite(dir){

return(dir+2)%4;

}

export function rotate(dir,rotation){

return(dir+rotation)%4;

}

export function inside(x,y,w,h){

return x>=0&&y>=0&&x<w&&y<h;

}

export function move(x,y,dir){

return{

x:x+DX[dir],

y:y+DY[dir]

};

}
