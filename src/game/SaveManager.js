export default class SaveManager{

constructor(key="pipe_rescue_save"){

this.key=key;

}

defaultData(){

return{

version:1,

lastLevel:1,

stars:{},

achievements:[],

statistics:{

games:0,
wins:0,
moves:0,
playTime:0

},

settings:{

sound:true,
music:true,
vibration:true

}

};

}

load(){

try{

const raw=localStorage.getItem(this.key);

if(!raw){

return this.defaultData();

}

return JSON.parse(raw);

}catch(e){

return this.defaultData();

}

}

save(data){

localStorage.setItem(

this.key,

JSON.stringify(data)

);

}

unlockLevel(level){

const data=this.load();

if(level>data.lastLevel){

data.lastLevel=level;

this.save(data);

}

}

setStars(level,stars){

const data=this.load();

const old=data.stars[level]||0;

if(stars>old){

data.stars[level]=stars;

this.save(data);

}

}

addAchievement(id){

const data=this.load();

if(!data.achievements.includes(id)){

data.achievements.push(id);

this.save(data);

}

}

addMoves(count=1){

const data=this.load();

data.statistics.moves+=count;

this.save(data);

}

addWin(){

const data=this.load();

data.statistics.games++;

data.statistics.wins++;

this.save(data);

}

addLose(){

const data=this.load();

data.statistics.games++;

this.save(data);

}

addPlayTime(seconds){

const data=this.load();

data.statistics.playTime+=seconds;

this.save(data);

}

toggleSound(){

const data=this.load();

data.settings.sound=!data.settings.sound;

this.save(data);

}

toggleMusic(){

const data=this.load();

data.settings.music=!data.settings.music;

this.save(data);

}

toggleVibration(){

const data=this.load();

data.settings.vibration=!data.settings.vibration;

this.save(data);

}

reset(){

localStorage.removeItem(this.key);

}

}
