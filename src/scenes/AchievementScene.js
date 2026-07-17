import Phaser from "phaser";
import AchievementSystem from "../game/AchievementSystem.js";

export default class AchievementScene extends Phaser.Scene{

constructor(){

super("Achievements");

}

create(){

this.cameras.main.setBackgroundColor("#0b1220");

const w=this.scale.width;

this.system=new AchievementSystem();

this.add.text(

w/2,
60,
"ACHIEVEMENTS",

{

fontSize:"42px",
fontStyle:"bold",
color:"#ffffff"

}

).setOrigin(.5);

const items=this.system.toJSON();

let y=150;

items.forEach(item=>{

const bg=this.add.rectangle(

w/2,

y,

560,

60,

item.unlocked?0x14532d:0x334155

);

bg.setStrokeStyle(

2,

item.unlocked?0x22c55e:0x64748b

);

this.add.text(

80,

y,

item.name,

{

fontSize:"24px",
color:"#ffffff"

}

).setOrigin(0,.5);

this.add.text(

w-80,

y,

item.unlocked?"✓":"🔒",

{

fontSize:"26px"

}

).setOrigin(.5);

y+=75;

});

const back=this.add.rectangle(

w/2,

1180,

260,

64,

0x2563eb

);

back.setStrokeStyle(

3,

0x60a5fa

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
