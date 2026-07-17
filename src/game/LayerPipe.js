import Pipe from "./Pipe.js";

export default class LayerPipe{

constructor(layerCount=2){

this.layers=[];

this.active=0;

for(let i=0;i<layerCount;i++){

this.layers.push(new Pipe());

}

}

get current(){

return this.layers[this.active];

}

setLayer(index){

if(index<0) return;

if(index>=this.layers.length) return;

this.active=index;

}

nextLayer(){

this.active++;

if(this.active>=this.layers.length){

this.active=0;

}

return this.current;

}

previousLayer(){

this.active--;

if(this.active<0){

this.active=this.layers.length-1;

}

return this.current;

}

rotate(){

this.current.rotate();

}

replace(pipe){

this.layers[this.active]=pipe;

}

get(index){

return this.layers[index];

}

set(index,pipe){

this.layers[index]=pipe;

}

count(){

return this.layers.length;

}

clone(){

const lp=new LayerPipe(this.layers.length);

lp.active=this.active;

for(let i=0;i<this.layers.length;i++){

lp.layers[i]=this.layers[i].clone();

}

return lp;

}

toJSON(){

return{

active:this.active,

layers:this.layers.map(p=>p.toJSON())

};

}

static fromJSON(data){

const lp=new LayerPipe(data.layers.length);

lp.active=data.active;

for(let i=0;i<data.layers.length;i++){

lp.layers[i]=Pipe.fromJSON(data.layers[i]);

}

return lp;

}

}
