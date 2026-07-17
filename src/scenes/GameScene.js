import Phaser from "phaser";

import Board from "../game/Board.js";
import Pipe from "../game/Pipe.js";
import WaterFlow from "../game/WaterFlow.js";

import Level1 from "../levels/Level1.js";

export default class GameScene extends Phaser.Scene{

constructor(){

super("Game");

}

create(){

this.board=new Board();

this.board.load(Level1);

this.flow=new WaterFlow(this.board);

this.tileSize=92;

this.offsetX=84;

this.offsetY=180;

this.tiles=[];

this.drawBoard();

this.drawHUD();

this.refresh();

}

drawHUD(){

this.title=this.add.text(

40,
50,
"PIPE RESCUE",

{

fontSize:"42px",
fontFamily:"Arial",
color:"#ffffff"

}

);

this.info=this.add.text(

40,
105,
"Tap pipes to rotate",

{

fontSize:"22px",
fontFamily:"Arial",
color:"#93c5fd"

}

);

}

drawBoard(){

for(let y=0;y<this.board.height;y++){

this.tiles[y]=[];

for(let x=0;x<this.board.width;x++){

const rect=this.add.rectangle(

this.offsetX+x*this.tileSize,

this.offsetY+y*this.tileSize,

80,

80,

0x1f2937

);

rect.setStrokeStyle(

4,

0x475569

);

rect.setInteractive();

rect.xIndex=x;

rect.yIndex=y;

rect.on(

"pointerdown",

()=>{

this.rotatePipe(

rect.xIndex,

rect.yIndex

);

}

);

this.tiles[y][x]=rect;

}

}

}

rotatePipe(x,y){

this.board.rotate(x,y);

this.refresh();

}

refresh(){

const solved=this.flow.start();

for(let y=0;y<this.board.height;y++){

for(let x=0;x<this.board.width;x++){

const pipe=this.board.get(x,y);

const tile=this.tiles[y][x];

tile.rotation=pipe.rotation*Math.PI/2;

if(pipe.powered){

tile.fillColor=0x38bdf8;

}else{

tile.fillColor=0x1f2937;

}

}

}

if(solved){

this.info.setText("LEVEL COMPLETED");

this.info.setColor("#22c55e");

}else{

this.info.setText("Tap pipes to rotate");

this.info.setColor("#93c5fd");

}

}

}
