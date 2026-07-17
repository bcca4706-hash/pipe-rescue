export default class ReplaySystem{

constructor(){

this.moves=[];
this.recording=false;
this.index=0;

}

start(){

this.moves=[];
this.recording=true;
this.index=0;

}

stop(){

this.recording=false;

}

record(x,y,rotation,layer=0){

if(!this.recording)
return;

this.moves.push({

x,
y,
rotation,
layer,
time:Date.now()

});

}

export(){

return JSON.stringify({

version:1,

moves:this.moves

});

}

import(data){

try{

const json=JSON.parse(data);

this.moves=json.moves||[];

}catch{

this.moves=[];

}

}

reset(){

this.index=0;

}

next(){

if(this.index>=this.moves.length)
return null;

return this.moves[this.index++];

}

hasNext(){

return this.index<this.moves.length;

}

play(scene,board,onFinish){

this.reset();

scene.time.addEvent({

delay:250,

loop:true,

callback:()=>{

const move=this.next();

if(!move){

if(onFinish)
onFinish();

return;

}

const pipe=board.get(

move.x,

move.y

);

if(pipe){

pipe.rotation=move.rotation;

}

}

});

}

length(){

return this.moves.length;

}

}
