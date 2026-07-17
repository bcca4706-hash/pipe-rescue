import Phaser from "phaser";
import CurrencySystem from "../game/CurrencySystem.js";

export default class ShopScene extends Phaser.Scene{

constructor(){

super("Shop");

}

create(){

this.wallet=new CurrencySystem();

this.cameras.main.setBackgroundColor("#081018");

const w=this.scale.width;

this.add.text(

w/2,
60,
"SHOP",

{

fontSize:"44px",
fontStyle:"bold",
color:"#ffffff"

}

).setOrigin(.5);

this.coinText=this.add.text(

40,
120,
"",
{

fontSize:"28px",
color:"#facc15"

}

);

this.gemText=this.add.text(

40,
160,
"",
{

fontSize:"28px",
color:"#38bdf8"

}

);

this.refresh();

this.item(

"Hint",

100,

250,

()=>{

if(this.wallet.spendCoins(100)){

this.refresh();

}

}

);

this.item(

"Undo Pack",

250,

380,

()=>{

if(this.wallet.spendCoins(250)){

this.refresh();

}

}

);

this.item(

"Premium Theme",

10,

510,

()=>{

if(this.wallet.spendGems(10)){

this.refresh();

}

},

true

);

this.button(

w/2,

1180,

"BACK",

()=>{

this.scene.start("Menu");

}

);

}

refresh(){

this.coinText.setText(

"Coins : "+this.wallet.coins()

);

this.gemText.setText(

"Gems : "+this.wallet.gems()

);

}

item(name,price,y,buy,gems=false){

const w=this.scale.width;

const bg=this.add.rectangle(

w/2,

y,

560,

90,

0x1e293b

);

bg.setStrokeStyle(

3,

0x475569

);

const label=gems?

price+" 💎":

price+" 🪙";

this.add.text(

80,

y,

name,

{

fontSize:"28px",

color:"#ffffff"

}

).setOrigin(0,.5);

const btn=this.add.rectangle(

w-110,

y,

120,

46,

0x2563eb

);

btn.setInteractive();

this.add.text(

btn.x,

btn.y,

label,

{

fontSize:"18px",

fontStyle:"bold",

color:"#ffffff"

}

).setOrigin(.5);

btn.on("pointerdown",buy);

}

button(x,y,text,cb){

const r=this.add.rectangle(

x,

y,

260,

64,

0x2563eb

);

r.setInteractive();

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

r.on("pointerdown",cb);

}

}
