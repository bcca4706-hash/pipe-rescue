import Phaser from "phaser";
import ProfileSystem from "../game/ProfileSystem.js";

export default class ProfileEditorScene extends Phaser.Scene{

constructor(){

super("ProfileEditor");

}

create(){

this.profile=new ProfileSystem();

this.cameras.main.setBackgroundColor("#081018");

const w=this.scale.width;

this.add.text(

w/2,
60,
"EDIT PROFILE",

{

fontSize:"42px",
fontStyle:"bold",
color:"#ffffff"

}

).setOrigin(.5);

this.name=this.profile.data.name;
this.avatar=this.profile.data.avatar;

this.preview=this.add.circle(

w/2,

180,

60,

0x2563eb

);

this.avatarText=this.add.text(

w/2,

180,

String(this.avatar),

{

fontSize:"36px",
fontStyle:"bold",
color:"#ffffff"

}

).setOrigin(.5);

this.nameText=this.add.text(

w/2,

290,

this.name,

{

fontSize:"30px",
fontStyle:"bold",
color:"#ffffff"

}

).setOrigin(.5);

this.button(

w/2,

420,

"CHANGE AVATAR",

()=>{

this.avatar++;

if(this.avatar>9)
this.avatar=0;

this.avatarText.setText(this.avatar);

}

);

this.button(

w/2,

520,

"RANDOM NAME",

()=>{

const names=[

"PipeHero",
"FlowMaster",
"WaterFox",
"PuzzleKing",
"BlueNode",
"ValveX",
"MazeMind",
"AquaCore"

];

this.name=

names[
Math.floor(Math.random()*names.length)
];

this.nameText.setText(this.name);

}

);

this.button(

w/2,

640,

"SAVE",

()=>{

this.profile.setName(this.name);
this.profile.setAvatar(this.avatar);

this.scene.start("Profile");

}

);

this.button(

w/2,

740,

"BACK",

()=>{

this.scene.start("Profile");

}

);

}

button(x,y,text,cb){

const bg=this.add.rectangle(

x,

y,

340,

64,

0x2563eb

);

bg.setStrokeStyle(

3,

0x60a5fa

);

bg.setInteractive();

this.add.text(

x,

y,

text,

{

fontSize:"24px",
fontStyle:"bold",
color:"#ffffff"

}

).setOrigin(.5);

bg.on("pointerdown",cb);

}

}
