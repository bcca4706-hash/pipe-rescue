import {Direction} from "./PipeType.js";
import {opposite} from "./Direction.js";

export default class WaterFlow{

constructor(board){

this.board=board;

}

reset(){

for(let y=0;y<this.board.height;y++){

for(let x=0;x<this.board.width;x++){

const p=this.board.get(x,y);

p.powered=false;
p.visited=false;

}

}

}

start(){

this.reset();

const start=this.board.findStart();

if(!start)
return false;

this.visit(start.x,start.y);

return this.board.completed();

}

visit(x,y){

const pipe=this.board.get(x,y);

if(!pipe)
return;

if(pipe.visited)
return;

pipe.visited=true;
pipe.powered=true;

const exits=pipe.connections();

for(const dir of exits){

let nx=x;
let ny=y;

switch(dir){

case Direction.UP:
ny--;
break;

case Direction.RIGHT:
nx++;
break;

case Direction.DOWN:
ny++;
break;

case Direction.LEFT:
nx--;
break;

}

const next=this.board.get(nx,ny);

if(!next)
continue;

if(next.accepts(opposite(dir))){

this.visit(nx,ny);

}

}

}

trace(){

const cells=[];

for(let y=0;y<this.board.height;y++){

for(let x=0;x<this.board.width;x++){

const p=this.board.get(x,y);

if(p.powered){

cells.push({

x,
y,
type:p.type

});

}

}

}

return cells;

}

isSolved(){

return this.board.completed();

}

}
