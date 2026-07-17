import LevelGenerator from "./LevelGenerator.js";

export default class DailyRunSystem{

constructor(){

this.key="pipe_rescue_daily_run";

this.generator=new LevelGenerator();

this.data=this.load();

}

today(){

const d=new Date();

return d.getFullYear()+"-"+

String(d.getMonth()+1).padStart(2,"0")+"-"+

String(d.getDate()).padStart(2,"0");

}

seed(){

return Number(

this.today().replaceAll("-","")

);

}

defaults(){

return{

date:this.today(),

completed:false,

stars:0,

moves:0,

time:0,

score:0

};

}

load(){

try{

const raw=localStorage.getItem(this.key);

if(!raw){

const data=this.defaults();

this.save(data);

return data;

}

const data=JSON.parse(raw);

if(data.date!==this.today()){

const fresh=this.defaults();

this.save(fresh);

return fresh;

}

return data;

}catch{

const data=this.defaults();

this.save(data);

return data;

}

}

save(data=this.data){

localStorage.setItem(

this.key,

JSON.stringify(data)

);

}

board(){

return this.generator.generateDaily(

this.seed()

);

}

finish(stars,moves,time){

this.data.completed=true;

this.data.stars=stars;

this.data.moves=moves;

this.data.time=time;

this.data.score=

stars*1000+

Math.max(0,500-moves*4)+

Math.max(0,600-time);

this.save();

}

best(){

return this.data;

}

reset(){

this.data=this.defaults();

this.save();

}

}
