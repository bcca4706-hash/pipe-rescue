import Phaser from "phaser";
import GameScene from "./scenes/GameScene.js";

const config={

type:Phaser.AUTO,

parent:"game",

width:720,

height:1280,

backgroundColor:"#0f172a",

scene:[
GameScene
],

scale:{

mode:Phaser.Scale.FIT,

autoCenter:Phaser.Scale.CENTER_BOTH

},

render:{

pixelArt:false,

antialias:true

}

};

new Phaser.Game(config);
