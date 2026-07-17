import Phaser from "phaser";
import ProfileSystem from "../game/ProfileSystem.js";

export default class ProfileScene extends Phaser.Scene{

constructor(){

super("Profile");

}

create(){

this.profile=new ProfileSystem();

this.cameras.main.setBackgroundColor("#0b1220");

const w=this.scale.width;

this.add.text(

w/2,
60,
"PROFILE",

{

fontSize:"44px",
fontStyle:"bold",
color:"#ffffff"

}

).setOrigin(.5);

const p=this.profile.data;

this.add.circle(

w/2,

180,

60,

0x2563eb

);

this.add.text(

w/2,

180,

String(p.avatar),

{

fontSize:"36px",

fontStyle:"bold",

color:"#ffffff"

}

).setOrigin(.5);

this.add.text(

w/2,

280,

p.name,

{

fontSize:"34px",

fontStyle:"bold",

color:"#ffffff"

}

).setOrigin(.5);

this.add.text(

w/2,

330,

p.selectedTitle,

{

fontSize:"22px",

color:"#facc15"

}

).setOrigin(.5);

this.stat("Level",p.level,430);
this.stat("XP",`${p.xp}/${this.profile.needXP()}`,490);
this.stat("Coins",p.coinsEarned,550);
this.stat("Gems",p.gemsEarned,610);

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

stat(name,value,y){

this.add.text(

80,

y,

name,

{

fontSize:"26px",

color:"#94a3b8"

}

);

this.add.text(

640,

y,

String(value),

{

fontSize:"26px",

fontStyle:"bold",

color:"#ffffff"

}

).setOrigin(1,0);

}

}
