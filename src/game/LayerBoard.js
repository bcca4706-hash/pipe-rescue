import LayerPipe from "./LayerPipe.js";

export default class LayerBoard{

constructor(width=6,height=6,layers=2){

this.width=width;
this.height=height;
this.layerCount=layers;

this.grid=[];

for(let y=0;y<height;y++){

this.grid[y]=[];

for(let x=0;x<width;x++){

this.grid[y][x]=new LayerPipe(layers);

}

}

}

inside(x,y){

return(
x>=0&&
y>=0&&
x<this.width&&
y<this.height
);

}

get(x,y){

if(!this.inside(x,y))
return null;

return this.grid[y][x];

}

current(x,y){

const cell=this.get(x,y);

if(!cell)
return null;

return cell.current;

}

rotate(x,y){

const cell=this.get(x,y);

if(!cell)
return false;

cell.rotate();

return true;

}

nextLayer(x,y){

const cell=this.get(x,y);

if(!cell)
return;

cell.nextLayer();

}

previousLayer(x,y){

const cell=this.get(x,y);

if(!cell)
return;

cell.previousLayer();

}

setLayer(x,y,index){

const cell=this.get(x,y);

if(!cell)
return;

cell.setLayer(index);

}

forEach(callback){

for(let y=0;y<this.height;y++){

for(let x=0;x<this.width;x++){

callback(

this.grid[y][x],

x,

y

);

}

}

}

clone(){

const board=new LayerBoard(

this.width,

this.height,

this.layerCount

);

this.forEach((cell,x,y)=>{

board.grid[y][x]=cell.clone();

});

return board;

}

clearPower(){

this.forEach(cell=>{

for(let i=0;i<cell.count();i++){

const pipe=cell.get(i);

pipe.powered=false;
pipe.visited=false;

}

});

}

toJSON(){

const json={

width:this.width,

height:this.height,

layers:this.layerCount,

cells:[]

};

for(let y=0;y<this.height;y++){

json.cells[y]=[];

for(let x=0;x<this.width;x++){

json.cells[y][x]=

this.grid[y][x].toJSON();

}

}

return json;

}

static fromJSON(data){

const board=new LayerBoard(

data.width,

data.height,

data.layers

);

for(let y=0;y<data.height;y++){

for(let x=0;x<data.width;x++){

board.grid[y][x]=

LayerPipe.fromJSON(

data.cells[y][x]

);

}

}

return board;

}

}
