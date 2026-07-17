import Phaser from "phaser";
import SaveManager from "../game/SaveManager.js";

export default class SettingsScene extends Phaser.Scene{

constructor(){

super("Settings");

}

create(){

this.save=new SaveManager();

this.data=this.save.load();

this.cameras.main.setBackgroundColor("#0b1220");

const w=this.scale.width;

this.add.text(

w/2,
70,
"SETTINGS",

{

fontSize:"44px",
fontStyle:"bold",
color:"#ffffff"

}

).setOrigin(.5);

this.sound=this.makeToggle(

"Sound",

this.data.settings.sound,

170

);

this.music=this.makeToggle(

"Music",

this.data.settings.music,

280

);

this.vibration=this.makeToggle(

"Vibration",

this.data.settings.vibration,

390

);

this.makeButton(

w/2,

560,

"SAVE",

()=>{

this.data.settings.sound=this.sound.value;
this.data.settings.music=this.music.value;
this.data.settings.vibration=this.vibration.value;

this.save.save(this.data);

this.scene.start("Menu");

}

);

this.makeButton(

w/2,

650,

"BACK",

()=>{

this.scene.start("Menu");

}

);

}

makeToggle(title,value,y){

const w=this.scale.width;

this.add.text(

80,

y,

title,

{

fontSize:"30px",
color:"#ffffff"

}

);

const box=this.add.rectangle(

w-120,

y+10,

80,

40,

value?0x22c55e:0xef4444

);

box.setInteractive();

const label=this.add.text(

box.x,

box.y,

value?"ON":"OFF",

{

fontSize:"20px",
fontStyle:"bold",
color:"#ffffff"

}

).setOrigin(.5);

const obj={

value,

box,

label

};

box.on("pointerdown",()=>{

obj.value=!obj.value;

obj.box.setFillStyle(

obj.value?0x22c55e:0xef4444

);

obj.label.setText(

obj.value?"ON":"OFF"

);

});

return obj;

}

makeButton(x,y,text,callback){

const bg=this.add.rectangle(

x,

y,

280,

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

fontSize:"28px",
fontStyle:"bold",
color:"#ffffff"

}

).setOrigin(.5);

bg.on("pointerdown",callback);

}

}
