export default class LeaderboardSystem{

constructor(){

this.key="pipe_rescue_leaderboard";

this.data=this.load();

}

load(){

try{

const raw=localStorage.getItem(this.key);

if(!raw){

return [];

}

return JSON.parse(raw);

}catch{

return [];

}

}

save(){

localStorage.setItem(

this.key,

JSON.stringify(this.data)

);

}

add(level,moves,time,stars){

this.data.push({

level,

moves,

time,

stars,

date:Date.now()

});

this.data.sort((a,b)=>{

if(a.level!==b.level){

return a.level-b.level;

}

if(a.stars!==b.stars){

return b.stars-a.stars;

}

if(a.moves!==b.moves){

return a.moves-b.moves;

}

return a.time-b.time;

});

const best=[];

const map=new Map();

for(const row of this.data){

const key=row.level;

if(!map.has(key)){

map.set(key,[]);

}

const arr=map.get(key);

if(arr.length<10){

arr.push(row);

}

}

for(const arr of map.values()){

best.push(...arr);

}

this.data=best;

this.save();

}

top(level){

return this.data.filter(

v=>v.level===level

);

}

clear(){

this.data=[];

this.save();

}

}
