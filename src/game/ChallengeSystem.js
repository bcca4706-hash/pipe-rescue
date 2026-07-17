export default class ChallengeSystem{

constructor(){

this.key="pipe_rescue_challenges";

this.data=this.load();

}

defaults(){

return{

date:this.today(),

completed:[],

active:this.generate()

};

}

today(){

const d=new Date();

return d.getFullYear()+"-"+

String(d.getMonth()+1).padStart(2,"0")+"-"+

String(d.getDate()).padStart(2,"0");

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

generate(){

const pool=[

{

id:"speed",

title:"Finish in under 45 seconds",

reward:150

},

{

id:"moves",

title:"Finish with less than 15 moves",

reward:200

},

{

id:"nohint",

title:"Don't use Hint",

reward:120

},

{

id:"noundo",

title:"Don't use Undo",

reward:120

},

{

id:"perfect",

title:"Earn 3 Stars",

reward:250

}

];

return pool.sort(()=>Math.random()-0.5).slice(0,3);

}

complete(id){

if(this.data.completed.includes(id))
return false;

this.data.completed.push(id);

this.save();

return true;

}

isCompleted(id){

return this.data.completed.includes(id);

}

progress(){

return{

done:this.data.completed.length,

total:this.data.active.length

};

}

reset(){

this.data=this.defaults();

this.save();

}

}
