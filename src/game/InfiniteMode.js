import LevelGenerator from "./LevelGenerator.js";

export default class InfiniteMode{

constructor(){

this.generator=new LevelGenerator();

this.level=1;

this.seed=Date.now();

}

next(){

const board=this.generator.generateDaily(

this.seed+this.level

);

return{

level:this.level++,

board

};

}

restart(){

this.level=1;

}

jump(level){

this.level=level;

}

difficulty(){

if(this.level<20){

return{

size:6,

locks:0,

portals:0

};

}

if(this.level<50){

return{

size:7,

locks:2,

portals:0

};

}

if(this.level<100){

return{

size:8,

locks:4,

portals:2

};

}

return{

size:9,

locks:6,

portals:4

};

}

score(stars,moves,time){

return(

stars*1000+

Math.max(0,500-moves*5)+

Math.max(0,600-time)

);

}

}
