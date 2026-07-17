import Phaser from "phaser";

export default class SplashScene extends Phaser.Scene{

constructor(){

super("Splash");

}

preload(){

this.load.image("logo","assets/logo.png");

}

create(){

const w=this.scale.width;
const h=this.scale.height;

this.cameras.main.setBackgroundColor("#050b16");

const glow=this.add.circle(

w/2,

h/2,

180,

0x38bdf8,

0.18

);

this.tweens.add({

targets:glow,

scale:1.6,

alpha:0.05,

duration:1800,

repeat:-1,

yoyo:true

});

const logo=this.add.image(

w/2,

h/2-60,

"logo"

);

logo.setScale(0);

this.tweens.add({

targets:logo,

scale:1,

duration:900,

ease:"Back.Out"

});

const title=this.add.text(

w/2,

h/2+130,

"PIPE RESCUE",

{

fontSize:"56px",

fontStyle:"bold",

color:"#ffffff",

stroke:"#38bdf8",

strokeThickness:6

}

).setOrigin(.5);

title.alpha=0;

this.tweens.add({

targets:title,

alpha:1,

duration:800,

delay:500

});

const loading=this.add.text(

w/2,

h-140,

"Loading...",

{

fontSize:"24px",

color:"#94a3b8"

}

).setOrigin(.5);

this.time.delayedCall(2500,()=>{

this.scene.start("Menu");

});

}

}
