export default class SeasonPassSystem{

constructor(){

this.key="pipe_rescue_season_pass";

this.data=this.load();

}

seasonId(){

const d=new Date();

return d.getFullYear()+"-S"+(Math.floor(d.getMonth()/3)+1);

}

defaults(){

return{

season:this.seasonId(),

xp:0,

level:1,

premium:false,

claimedFree:[],

claimedPremium:[]

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

if(data.season!==this.seasonId()){

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

xpNeeded(level=this.data.level){

return level*250;

}

addXP(value){

this.data.xp+=value;

while(

this.data.xp>=this.xpNeeded()

){

this.data.xp-=this.xpNeeded();

this.data.level++;

}

this.save();

}

unlockPremium(){

this.data.premium=true;

this.save();

}

claim(level,premium=false){

const target=premium

?this.data.claimedPremium

:this.data.claimedFree;

if(level>this.data.level)

return false;

if(target.includes(level))

return false;

target.push(level);

this.save();

return true;

}

reward(level,premium=false){

return{

coins:premium?250+level*20:100+level*10,

gems:premium?2:0,

theme:premium&&level%10===0

};

}

progress(){

return{

level:this.data.level,

xp:this.data.xp,

next:this.xpNeeded(),

premium:this.data.premium

};

}

reset(){

this.data=this.defaults();

this.save();

}

}
