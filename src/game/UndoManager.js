export default class UndoManager{

constructor(limit=100){

this.limit=limit;
this.stack=[];

}

push(board){

const state=[];

for(let y=0;y<board.height;y++){

state[y]=[];

for(let x=0;x<board.width;x++){

state[y][x]=board.get(x,y).clone();

}

}

this.stack.push(state);

if(this.stack.length>this.limit){

this.stack.shift();

}

}

undo(board){

if(this.stack.length===0)
return false;

const state=this.stack.pop();

for(let y=0;y<board.height;y++){

for(let x=0;x<board.width;x++){

board.set(
x,
y,
state[y][x]
);

}

}

return true;

}

clear(){

this.stack=[];

}

size(){

return this.stack.length;

}

}
