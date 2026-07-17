export default class StatisticsSystem{

constructor(){

this.key="pipe_rescue_stats";

this.data=this.load();

}

defaults(){

return{

games:0,

wins:0,

losses:0,

moves:0,

rotations:0,

hints:0,

undos:0,

playTime:0,

bestTime:{},

bestMoves:{}

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

gameStart(){

this.startTime=Date.now();

this.data.games++;

this.save();

}

gameWin(level,moves){

this.data.wins++;

const seconds=Math.floor(

(Date.now()-this.startTime)/1000

);

if(

!this.data.bestTime[level]||

seconds<this.data.bestTime[level]

){

this.data.bestTime[level]=seconds;

}

if(

!this.data.bestMoves[level]||

moves<this.data.bestMoves[level]

){

this.data.bestMoves[level]=moves;

}

this.save();

}

gameLose(){

this.data.losses++;

this.save();

}

addRotation(){

this.data.rotations++;

this.save();

}

addMove(){

this.data.moves++;

this.save();

}

addHint(){

this.data.hints++;

this.save();

}

addUndo(){

this.data.undos++;

this.save();

}

addPlayTime(seconds){

this.data.playTime+=seconds;

this.save();

}

reset(){

this.data=this.defaults();

this.save();

}

}
