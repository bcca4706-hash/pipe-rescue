import Phaser from "phaser";

export default class WorldMapScene extends Phaser.Scene{

constructor(){

super("WorldMap");

}

create(){

const w=this.scale.width;
const h=this.scale.height;

this.cameras.main.setBackgroundColor("#0b1220");

this.add.text(

w/2,
60,

"WORLD MAP",

{

fontSize:"46px",
fontStyle:"bold",
color:"#ffffff"

}

).setOrigin(.5);

this.page=0;

this.createLevels();

this.createBottomBar();

}

createLevels(){

const cols=4;
const rows=5;

const startX=110;
const startY=150;

const gapX=150;
const gapY=150;

let level=this.page*20+1;

for(let y=0;y<rows;y++){

for(let x=0;x<cols;x++){

const circle=this.add.circle(

startX+x*gapX,

startY+y*gapY,

42,

0x1d4ed8

);

circle.setStrokeStyle(

4,

0x93c5fd

);

circle.setInteractive();

const txt=this.add.text(

circle.x,

circle.y,

String(level),

{

fontSize:"24px",

fontStyle:"bold",

color:"#ffffff"

}

).setOrigin(.5);

circle.on("pointerdown",()=>{

this.scene.start("Game",{

level

});

});

level++;

}

}

}

createBottomBar(){

const y=this.scale.height-70;

this.makeButton(

80,

y,

"<",

()=>{

if(this.page>0){

this.page--;

this.scene.restart();

}

}

);

this.makeButton(

this.scale.width-80,

y,

">",

()=>{

this.page++;

this.scene.restart();

}

);

this.makeButton(

this.scale.width/2,

y,

"MENU",

()=>{

this.scene.start("Menu");

}

);

}

makeButton(x,y,label,callback){

const r=this.add.rectangle(

x,

y,

120,

54,

0x334155

);

r.setStrokeStyle(

2,

0x94a3b8

);

r.setInteractive();

const t=this.add.text(

x,

y,

label,

{

fontSize:"24px",

fontStyle:"bold",

color:"#ffffff"

}

).setOrigin(.5);

r.on("pointerdown",callback);

}

}
