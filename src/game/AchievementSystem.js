export default class AchievementSystem{

constructor(){

this.items=new Map();

this.unlock("FIRST_STEP","First Rotation",false);
this.unlock("FIRST_WIN","First Victory",false);
this.unlock("NO_HINT","No Hint",false);
this.unlock("UNDER_20","Finish <20 Moves",false);
this.unlock("MASTER","Pipe Master",false);

}

unlock(id,name,state=false){

if(!this.items.has(id)){

this.items.set(id,{
id,
name,
unlocked:state,
time:null
});

}

}

grant(id){

const item=this.items.get(id);

if(!item)
return false;

if(item.unlocked)
return false;

item.unlocked=true;
item.time=Date.now();

return true;

}

isUnlocked(id){

const item=this.items.get(id);

return item?item.unlocked:false;

}

progress(){

let total=0;
let unlocked=0;

for(const a of this.items.values()){

total++;

if(a.unlocked)
unlocked++;

}

return{

total,
unlocked,
percent:Math.round(
(unlocked/total)*100
)

};

}

toJSON(){

return Array.from(
this.items.values()
);

}

load(data){

this.items.clear();

for(const item of data){

this.items.set(
item.id,
item
);

}

}

reset(){

for(const item of this.items.values()){

item.unlocked=false;
item.time=null;

}

}

}
