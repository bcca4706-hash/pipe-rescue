import {PipeType} from "./PipeType.js";

export default class PipeRenderer{

static color(pipe){

switch(pipe.type){

case PipeType.START:
return 0x22c55e;

case PipeType.END:
return 0xef4444;

case PipeType.STRAIGHT:
return 0x94a3b8;

case PipeType.CORNER:
return 0xcbd5e1;

case PipeType.TEE:
return 0xf59e0b;

case PipeType.CROSS:
return 0x38bdf8;

case PipeType.LOCKED:
return 0x7c3aed;

case PipeType.PORTAL:
return 0xec4899;

case PipeType.BLOCK:
return 0x111827;

default:
return 0x334155;

}

}

static draw(scene,pipe,x,y,size){

const g=scene.add.graphics();

const c=this.color(pipe);

const w=size*0.18;

g.fillStyle(c,1);

switch(pipe.type){

case PipeType.STRAIGHT:

g.fillRect(
-size/2,
-w/2,
size,
w
);

break;

case PipeType.CORNER:

g.fillRect(
-size/2,
-w/2,
size/2+w/2,
w
);

g.fillRect(
-w/2,
-size/2,
w,
size/2+w/2
);

break;

case PipeType.TEE:

g.fillRect(
-size/2,
-w/2,
size,
w
);

g.fillRect(
-w/2,
-size/2,
w,
size/2
);

break;

case PipeType.CROSS:

g.fillRect(
-size/2,
-w/2,
size,
w
);

g.fillRect(
-w/2,
-size/2,
w,
size
);

break;

case PipeType.START:

g.fillCircle(0,0,size*0.22);

g.fillRect(
0,
-w/2,
size/2,
w
);

break;

case PipeType.END:

g.fillCircle(0,0,size*0.22);

g.fillRect(
-size/2,
-w/2,
size/2,
w
);

break;

case PipeType.PORTAL:

g.lineStyle(
6,
c
);

g.strokeCircle(
0,
0,
size*0.28
);

g.strokeCircle(
0,
0,
size*0.18
);

break;

default:

g.fillRect(
-size/3,
-size/3,
size*0.66,
size*0.66
);

}

g.x=x;
g.y=y;

g.rotation=pipe.rotation*Math.PI/2;

return g;

}

}
