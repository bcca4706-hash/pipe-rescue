import {Direction} from "./PipeType.js";
import {opposite} from "./Direction.js";

export default class LayerWaterFlow{

constructor(board){

this.board=board;

}

reset(){

this.board.clearPower();

}

start(startX,startY,layer=0){

this.reset();

this.visit(startX,startY,layer);

}

visit(x,y,layer){

const cell=this.board.get(x,y);

if(!cell)
return;

const pipe=cell.get(layer);

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

for(let l=0;l<next.count();l++){

const target=next.get(l);

if(!target)
continue;

if(target.accepts(opposite(dir))){

this.visit(nx,ny,l);

}

}

}

}

poweredCells(){

const result=[];

this.board.forEach((cell,x,y)=>{

for(let l=0;l<cell.count();l++){

const pipe=cell.get(l);

if(pipe.powered){

result.push({

x,
y,
layer:l

});

}

}

});

return result;

}

isSolved(endX,endY){

const cell=this.board.get(endX,endY);

if(!cell)
return false;

for(let i=0;i<cell.count();i++){

if(cell.get(i).powered){

return true;

}

}

return false;

}

}
