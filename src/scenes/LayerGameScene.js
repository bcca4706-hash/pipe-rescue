import Phaser from "phaser";

import LayerBoard from "../game/LayerBoard.js";
import LayerRenderer from "../game/LayerRenderer.js";
import LayerWaterFlow from "../game/LayerWaterFlow.js";

export default class LayerGameScene extends Phaser.Scene{

constructor(){

super("LayerGame");

}

create(){

this.cameras.main.setBackgroundColor("#081018");

this.board=new LayerBoard(6,6,3);

this.flow=new LayerWaterFlow(this.board);

this.tileSize=96;
this.offsetX=120;
this.offsetY=220;

this.tiles=[];

this.add.text(

40,
40,
"PIPE RESCUE",

{

fontSize:"42px",
fontStyle:"bold",
color:"#ffffff"

}

);

this.add.text(

40,
96,
"Tap = Rotate   Hold = Next Layer",

{

fontSize:"22px",
color:"#94a3b8"

}

);

this.createGrid();

this.renderBoard();

}

createGrid(){

for(let y=0;y<this.board.height;y++){

this.tiles[y]=[];

for(let x=0;x<this.board.width;x++){

const bg=this.add.rectangle(

this.offsetX+x*this.tileSize,

this.offsetY+y*this.tileSize,

84,

84,

0x18212f

);

bg.setStrokeStyle(

3,

0x314155

);

bg.setInteractive();

bg.on("pointerdown",()=>{

this.board.rotate(x,y);

this.refreshCell(x,y);

});

bg.on("pointerup",()=>{});

bg.on("pointerover",()=>{});

bg.on("pointerout",()=>{});

bg.on("pointermove",()=>{});

bg.on("pointerdown",(pointer)=>{

this.pressTime=this.time.now;

});

bg.on("pointerup",(pointer)=>{

if(this.time.now-this.pressTime>350){

this.board.nextLayer(x,y);

}

this.refreshCell(x,y);

});

this.tiles[y][x]={

bg,

pipe:null

};

}

}

}

renderBoard(){

for(let y=0;y<this.board.height;y++){

for(let x=0;x<this.board.width;x++){

this.refreshCell(x,y);

}

}

}

refreshCell(x,y){

const tile=this.tiles[y][x];

if(tile.pipe){

tile.pipe.destroy();

}

tile.pipe=LayerRenderer.draw(

this,

this.board.get(x,y),

this.offsetX+x*this.tileSize,

this.offsetY+y*this.tileSize,

64

);

LayerRenderer.pulse(

this,

tile.pipe

);

}

update(){

}

}
