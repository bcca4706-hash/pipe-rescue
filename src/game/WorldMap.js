export default class WorldMap{

constructor(save){

this.save=save;

this.levels=[];

for(let i=1;i<=200;i++){

this.levels.push({

id:i,

stars:0,

locked:i!==1

});

}

this.load();

}

load(){

const data=this.save.load();

for(const level of this.levels){

level.locked=level.id>data.lastLevel;

level.stars=data.stars[level.id]||0;

}

}

unlock(level){

const l=this.levels.find(v=>v.id===level);

if(!l) return;

l.locked=false;

}

complete(level,stars){

const l=this.levels.find(v=>v.id===level);

if(!l) return;

if(stars>l.stars){

l.stars=stars;

}

const next=this.levels.find(v=>v.id===level+1);

if(next){

next.locked=false;

}

this.save.setStars(level,stars);

this.save.unlockLevel(level+1);

}

totalStars(){

let total=0;

for(const l of this.levels){

total+=l.stars;

}

return total;

}

available(){

return this.levels.filter(v=>!v.locked);

}

locked(){

return this.levels.filter(v=>v.locked);

}

completed(){

return this.levels.filter(v=>v.stars>0);

}

completion(){

return Math.round(

(this.completed().length/
this.levels.length)*100

);

}

get(level){

return this.levels.find(v=>v.id===level);

}

}
