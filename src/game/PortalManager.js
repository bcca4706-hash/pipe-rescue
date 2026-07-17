import {PipeType} from "./PipeType.js";

export default class PortalManager{

constructor(board){

this.board=board;
this.portals=[];

this.scan();

}

scan(){

this.portals=[];

for(let y=0;y<this.board.height;y++){

for(let x=0;x<this.board.width;x++){

const p=this.board.get(x,y);

if(p.type===PipeType.PORTAL){

this.portals.push({

x,
y

});

}

}

}

}

findPair(x,y){

if(this.portals.length<2)
return null;

for(const p of this.portals){

if(p.x!==x||p.y!==y){

return p;

}

}

return null;

}

teleport(x,y){

const pair=this.findPair(x,y);

if(!pair){

return{

x,
y

};

}

return{

x:pair.x,

y:pair.y

};

}

add(x,y){

this.board.get(x,y).type=PipeType.PORTAL;

this.scan();

}

remove(x,y){

const pipe=this.board.get(x,y);

if(pipe.type===PipeType.PORTAL){

pipe.type=PipeType.EMPTY;

}

this.scan();

}

count(){

return this.portals.length;

}

}
