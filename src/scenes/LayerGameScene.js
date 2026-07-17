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

this.moves=0;

this.pressStart=0;

this.title=this.add.text(
40,
40,
"PIPE RESCUE",
{
fontSize:"42px",
fontStyle:"bold",
color:"#ffffff"
}
);

this.info=this.add.text(
40,
96,
"Moves : 0",
{
fontSize:"22px",
color:"#8ecdf7"
}
);

this.createGrid();

this.renderBoard();

this.flow.start(0,0,0);

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

bg.setStrokeStyle(3,0x314155);

bg.setInteractive();

bg.on("pointerdown",()=>{

this.pressStart=this.time.now;

});

bg.on("pointerup",()=>{

const held=this.time.now-this.pressStart;

if(held>350){

this.board.nextLayer(x,y);

}else{

this.board.rotate(x,y);

this.moves++;

this.info.setText("Moves : "+this.moves);

}

this.refreshCell(x,y);

this.flow.start(0,0,0);

this.updatePowered();

});

this.tiles[y][x]={

background:bg,

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

}

updatePowered(){

const cells=this.flow.poweredCells();

for(let y=0;y<this.board.height;y++){

for(let x=0;x<this.board.width;x++){

this.tiles[y][x].background.setFillStyle(
0x18212f
);

}

}

cells.forEach(c=>{

this.tiles[c.y][c.x].background.setFillStyle(
0x0ea5e9
);

});

}

update(){

}

}
