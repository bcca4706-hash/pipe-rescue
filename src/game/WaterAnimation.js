export default class WaterAnimation{

constructor(scene,board,tiles,size){

this.scene=scene;
this.board=board;
this.tiles=tiles;
this.size=size;
this.effects=[];

}

clear(){

this.effects.forEach(e=>e.destroy());

this.effects=[];

}

play(){

this.clear();

for(let y=0;y<this.board.height;y++){

for(let x=0;x<this.board.width;x++){

const pipe=this.board.get(x,y);

if(!pipe.powered)
continue;

const glow=this.scene.add.circle(

this.tiles[y][x].background.x,
this.tiles[y][x].background.y,

10,

0x38bdf8,

0.95

);

this.scene.tweens.add({

targets:glow,

scale:2.8,

alpha:0,

duration:700,

repeat:-1,

ease:"Sine.easeOut"

});

this.effects.push(glow);

const stream=this.scene.add.rectangle(

this.tiles[y][x].background.x,
this.tiles[y][x].background.y,

this.size*0.55,

8,

0x60a5fa

);

stream.rotation=pipe.rotation*Math.PI/2;

this.scene.tweens.add({

targets:stream,

alpha:0.15,

duration:350,

yoyo:true,

repeat:-1

});

this.effects.push(stream);

}

}

}

stop(){

this.clear();

}

}
