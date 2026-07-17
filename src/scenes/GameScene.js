import Phaser from "phaser";
import Board from "../game/Board.js";
import WaterFlow from "../game/WaterFlow.js";
import WaterAnimation from "../game/WaterAnimation.js";
import PipeRenderer from "../game/PipeRenderer.js";
import Level1 from "../levels/Level1.js";

export default class GameScene extends Phaser.Scene{

constructor(){

super("Game");

}

create(){

this.cameras.main.setBackgroundColor("#0f172a");

this.board=new Board();
this.board.load(Level1);

this.flow=new WaterFlow(this.board);

this.tileSize=96;
this.offsetX=120;
this.offsetY=220;

this.tiles=[];

this.drawGrid();
this.drawPipes();

this.anim=new WaterAnimation(
this,
this.board,
this.tiles,
this.tileSize
);

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
"Rotate pipes",
{
fontSize:"22px",
color:"#93c5fd"
}
);

this.refresh();

}

drawGrid(){

for(let y=0;y<this.board.height;y++){

this.tiles[y]=[];

for(let x=0;x<this.board.width;x++){

const bg=this.add.rectangle(

this.offsetX+x*this.tileSize,

this.offsetY+y*this.tileSize,

82,

82,

0x1e293b

);

bg.setStrokeStyle(
3,
0x334155
);

bg.setInteractive();

bg.on("pointerdown",()=>{

this.board.rotate(x,y);

this.refresh();

});

this.tiles[y][x]={

background:bg,

pipe:null

};

}

}

}

drawPipes(){

for(let y=0;y<this.board.height;y++){

for(let x=0;x<this.board.width;x++){

const tile=this.tiles[y][x];

if(tile.pipe)
tile.pipe.destroy();

tile.pipe=PipeRenderer.draw(

this,

this.board.get(x,y),

this.offsetX+x*this.tileSize,

this.offsetY+y*this.tileSize,

64

);

}

}

}

refresh(){

const solved=this.flow.start();

this.drawPipes();

this.anim.play();

for(let y=0;y<this.board.height;y++){

for(let x=0;x<this.board.width;x++){

const pipe=this.board.get(x,y);

this.tiles[y][x].background.setFillStyle(

pipe.powered

?0x0ea5e9

:0x1e293b

);

}

}

if(solved){

this.info.setText("LEVEL COMPLETED");

this.info.setColor("#22c55e");

}else{

this.info.setText("Rotate pipes");

this.info.setColor("#93c5fd");

}

}

}
