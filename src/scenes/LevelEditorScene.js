import Phaser from "phaser";
import Board from "../game/Board.js";
import Pipe from "../game/Pipe.js";
import { PipeType } from "../game/PipeType.js";

export default class LevelEditorScene extends Phaser.Scene{

constructor(){

super("LevelEditor");

}

create(){

this.cameras.main.setBackgroundColor("#081018");

this.board=new Board(6,6);

this.tileSize=90;
this.offsetX=120;
this.offsetY=170;

this.selected=PipeType.STRAIGHT;

this.tiles=[];

this.add.text(

360,

60,

"LEVEL EDITOR",

{

fontSize:"42px",

fontStyle:"bold",

color:"#ffffff"

}

).setOrigin(.5);

this.drawToolbar();

this.drawGrid();

this.createButtons();

}

drawToolbar(){

const types=[

PipeType.EMPTY,
PipeType.START,
PipeType.END,
PipeType.STRAIGHT,
PipeType.CORNER,
PipeType.TEE,
PipeType.CROSS,
PipeType.PORTAL

];

let x=70;

types.forEach(type=>{

const btn=this.add.rectangle(

x,

110,

58,

58,

0x334155

);

btn.setStrokeStyle(2,0xffffff);

btn.setInteractive();

this.add.text(

x,

110,

String(type),

{

fontSize:"16px",

color:"#ffffff"

}

).setOrigin(.5);

btn.on("pointerdown",()=>{

this.selected=type;

});

x+=82;

});

}

drawGrid(){

for(let y=0;y<6;y++){

this.tiles[y]=[];

for(let x=0;x<6;x++){

const cell=this.add.rectangle(

this.offsetX+x*this.tileSize,

this.offsetY+y*this.tileSize,

80,

80,

0x1e293b

);

cell.setStrokeStyle(2,0x64748b);

cell.setInteractive();

const label=this.add.text(

cell.x,

cell.y,

".",

{

fontSize:"18px",

color:"#ffffff"

}

).setOrigin(.5);

cell.on("pointerdown",()=>{

const pipe=new Pipe(this.selected,0);

this.board.set(x,y,pipe);

label.setText(String(this.selected));

});

cell.on("pointerup",()=>{

const pipe=this.board.get(x,y);

if(pipe){

pipe.rotate();

label.setRotation(pipe.rotation*Math.PI/2);

}

});

this.tiles[y][x]={

cell,

label

};

}

}

}

createButtons(){

this.button(

120,

760,

"EXPORT",

()=>{

console.log(

JSON.stringify(this.board)

);

}

);

this.button(

360,

760,

"CLEAR",

()=>{

this.scene.restart();

}

);

this.button(

600,

760,

"BACK",

()=>{

this.scene.start("Menu");

}

);

}

button(x,y,text,cb){

const bg=this.add.rectangle(

x,

y,

180,

56,

0x2563eb

);

bg.setInteractive();

this.add.text(

x,

y,

text,

{

fontSize:"24px",

fontStyle:"bold",

color:"#ffffff"

}

).setOrigin(.5);

bg.on("pointerdown",cb);

}

}
