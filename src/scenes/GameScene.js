import Phaser from "phaser";
import Board from "../game/Board.js";
import WaterFlow from "../game/WaterFlow.js";
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
this.createHUD();

this.updateBoard();

}

createHUD(){

this.title=this.add.text(
40,
40,
"PIPE RESCUE",
{
fontSize:"40px",
color:"#ffffff",
fontStyle:"bold"
}
);

this.status=this.add.text(
40,
95,
"Connect Start → End",
{
fontSize:"22px",
color:"#94a3b8"
}
);

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

this.updateBoard();

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

if(tile.pipe){

tile.pipe.destroy();

}

const pipe=this.board.get(x,y);

tile.pipe=PipeRenderer.draw(

this,
pipe,
this.offsetX+x*this.tileSize,
this.offsetY+y*this.tileSize,
64

);

}

}

}

updateBoard(){

const solved=this.flow.start();

for(let y=0;y<this.board.height;y++){

for(let x=0;x<this.board.width;x++){

const tile=this.tiles[y][x];

if(tile.pipe){

tile.pipe.destroy();

}

const pipe=this.board.get(x,y);

tile.pipe=PipeRenderer.draw(

this,
pipe,
this.offsetX+x*this.tileSize,
this.offsetY+y*this.tileSize,
64

);

if(pipe.powered){

tile.background.setFillStyle(
0x0ea5e9
);

}else{

tile.background.setFillStyle(
0x1e293b
);

}

}

}

if(solved){

this.status.setText("LEVEL COMPLETED");

this.status.setColor("#22c55e");

}else{

this.status.setText("Connect Start → End");

this.status.setColor("#94a3b8");

}

}

}
