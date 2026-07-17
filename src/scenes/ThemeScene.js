import Phaser from "phaser";
import ThemeSystem from "../game/ThemeSystem.js";

export default class ThemeScene extends Phaser.Scene{

constructor(){

super("Themes");

}

create(){

this.theme=new ThemeSystem();

this.cameras.main.setBackgroundColor("#081018");

const w=this.scale.width;

this.add.text(

w/2,
60,
"THEMES",

{

fontSize:"44px",
fontStyle:"bold",
color:"#ffffff"

}

).setOrigin(.5);

const themes=this.theme.list();

let y=170;

themes.forEach(t=>{

const bg=this.add.rectangle(

w/2,

y,

560,

82,

Phaser.Display.Color.HexStringToColor(t.board).color

);

bg.setStrokeStyle(

3,

Phaser.Display.Color.HexStringToColor(t.pipe).color

);

bg.setInteractive();

this.add.text(

90,

y,

t.name,

{

fontSize:"28px",

color:"#ffffff"

}

).setOrigin(0,.5);

const preview=this.add.circle(

w-80,

y,

18,

Phaser.Display.Color.HexStringToColor(t.water).color

);

bg.on("pointerdown",()=>{

this.theme.set(t.id);

this.scene.restart();

});

if(this.theme.current().id===t.id){

this.add.text(

w-150,

y,

"ACTIVE",

{

fontSize:"18px",

fontStyle:"bold",

color:"#22c55e"

}

).setOrigin(.5);

}

y+=110;

});

const back=this.add.rectangle(

w/2,

1180,

260,

64,

0x2563eb

);

back.setInteractive();

this.add.text(

w/2,

1180,

"BACK",

{

fontSize:"28px",

fontStyle:"bold",

color:"#ffffff"

}

).setOrigin(.5);

back.on("pointerdown",()=>{

this.scene.start("Menu");

});

}

}
