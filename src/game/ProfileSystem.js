export default class ProfileSystem{

constructor(){

this.key="pipe_rescue_profile";

this.data=this.load();

}

defaults(){

return{

name:"Player",

avatar:0,

xp:0,

level:1,

coinsEarned:0,

gemsEarned:0,

titles:["Beginner"],

selectedTitle:"Beginner"

};

}

load(){

try{

const raw=localStorage.getItem(this.key);

if(!raw){

return this.defaults();

}

return JSON.parse(raw);

}catch{

return this.defaults();

}

}

save(){

localStorage.setItem(

this.key,

JSON.stringify(this.data)

);

}

addXP(value){

this.data.xp+=value;

while(this.data.xp>=this.needXP()){

this.data.xp-=this.needXP();

this.data.level++;

}

this.save();

}

needXP(){

return this.data.level*100;

}

addCoins(value){

this.data.coinsEarned+=value;

this.save();

}

addGems(value){

this.data.gemsEarned+=value;

this.save();

}

setName(name){

this.data.name=name;

this.save();

}

setAvatar(index){

this.data.avatar=index;

this.save();

}

unlockTitle(title){

if(!this.data.titles.includes(title)){

this.data.titles.push(title);

this.save();

}

}

selectTitle(title){

if(this.data.titles.includes(title)){

this.data.selectedTitle=title;

this.save();

}

}

reset(){

this.data=this.defaults();

this.save();

}

}
