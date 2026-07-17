import {PipeType} from "./PipeType.js";

export default class LockSystem{

constructor(board){

this.board=board;

}

lock(x,y){

const p=this.board.get(x,y);

if(!p) return;

p.locked=true;

}

unlock(x,y){

const p=this.board.get(x,y);

if(!p) return;

p.locked=false;

}

toggle(x,y){

const p=this.board.get(x,y);

if(!p) return;

p.locked=!p.locked;

}

isLocked(x,y){

const p=this.board.get(x,y);

if(!p) return false;

return p.locked;

}

rotate(x,y){

const p=this.board.get(x,y);

if(!p) return false;

if(p.locked)
return false;

p.rotate();

return true;

}

lockAll(type=PipeType.LOCKED){

for(let y=0;y<this.board.height;y++){

for(let x=0;x<this.board.width;x++){

const p=this.board.get(x,y);

if(p.type===type){

p.locked=true;

}

}

}

}

unlockAll(){

for(let y=0;y<this.board.height;y++){

for(let x=0;x<this.board.width;x++){

this.board.get(x,y).locked=false;

}

}

}

count(){

let total=0;

for(let y=0;y<this.board.height;y++){

for(let x=0;x<this.board.width;x++){

if(this.board.get(x,y).locked)
total++;

}

}

return total;

}

}
