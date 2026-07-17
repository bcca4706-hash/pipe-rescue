export default class DailyMissionSystem{

constructor(){

this.missions=[];

this.generate();

}

today(){

const d=new Date();

return(

d.getFullYear()+"-"+

(d.getMonth()+1)+"-"+

d.getDate()

);

}

generate(){

const key=this.today();

const saved=localStorage.getItem("dailyMission");

if(saved){

const json=JSON.parse(saved);

if(json.date===key){

this.missions=json.missions;

return;

}

}

this.missions=[

{

id:1,

title:"Complete 1 Level",

goal:1,

progress:0,

reward:50,

done:false

},

{

id:2,

title:"Rotate 40 Pipes",

goal:40,

progress:0,

reward:100,

done:false

},

{

id:3,

title:"Earn 3 Stars",

goal:3,

progress:0,

reward:150,

done:false

}

];

this.save();

}

save(){

localStorage.setItem(

"dailyMission",

JSON.stringify({

date:this.today(),

missions:this.missions

})

);

}

addProgress(id,value=1){

const m=this.missions.find(v=>v.id===id);

if(!m)return;

m.progress+=value;

if(m.progress>=m.goal){

m.progress=m.goal;

m.done=true;

}

this.save();

}

claimable(){

return this.missions.filter(

m=>m.done

);

}

allCompleted(){

return this.missions.every(

m=>m.done

);

}

reset(){

localStorage.removeItem(

"dailyMission"

);

this.generate();

}

}
