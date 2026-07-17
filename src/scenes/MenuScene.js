import Phaser from "phaser";

export default class MenuScene extends Phaser.Scene{

constructor(){

super("Menu");

}

create(){

const w=this.scale.width;
const h=this.scale.height;

this.cameras.main.setBackgroundColor("#081018");

this.add.text(

w/2,
90,

"PIPE RESCUE",

{

fontSize:"56px",
fontStyle:"bold",
color:"#ffffff"

}

).setOrigin(.5);

this.add.text(

w/2,
150,

"Premium Puzzle",

{

fontSize:"24px",
color:"#7dd3fc"

}

).setOrigin(.5);

this.createButton(

w/2,

300,

"PLAY",

()=>{

this.scene.start("Game");

}

);

this.createButton(

w/2,

390,

"WORLD MAP",

()=>{

if(this.scene.get("WorldMap")){

this.scene.start("WorldMap");

}

}

);

this.createButton(

w/2,

480,

"SETTINGS",

()=>{

}

);

this.createButton(

w/2,

570,

"ACHIEVEMENTS",

()=>{

}

);

this.version=this.add.text(

20,

h-30,

"v0.1",

{

fontSize:"18px",

color:"#64748b"

}

);

}

createButton(x,y,label,callback){

const bg=this.add.rectangle(

x,

y,

320,

72,

0x1e40af

);

bg.setStrokeStyle(

3,

0x60a5fa

);

bg.setInteractive({useHandCursor:true});

const text=this.add.text(

x,

y,

label,

{

fontSize:"28px",

fontStyle:"bold",

color:"#ffffff"

}

).setOrigin(.5);

bg.on("pointerover",()=>{

bg.setFillStyle(0x2563eb);

});

bg.on("pointerout",()=>{

bg.setFillStyle(0x1e40af);

});

bg.on("pointerdown",()=>{

this.tweens.add({

targets:bg,

scaleX:.95,

scaleY:.95,

duration:80,

yoyo:true

});

});

bg.on("pointerup",()=>{

callback();

});

}

}
