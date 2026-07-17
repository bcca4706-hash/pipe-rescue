export default class ThemeSystem{

constructor(){

this.key="pipe_rescue_theme";

this.themes={

classic:{
id:"classic",
name:"Classic",
background:"#081018",
board:"#1e293b",
pipe:"#cbd5e1",
water:"#38bdf8"
},

neon:{
id:"neon",
name:"Neon",
background:"#050816",
board:"#111827",
pipe:"#22d3ee",
water:"#06b6d4"
},

lava:{
id:"lava",
name:"Lava",
background:"#1c0b08",
board:"#451a03",
pipe:"#fb923c",
water:"#ef4444"
},

forest:{
id:"forest",
name:"Forest",
background:"#08130c",
board:"#14532d",
pipe:"#86efac",
water:"#22c55e"
}

};

}

current(){

const id=localStorage.getItem(this.key);

if(id&&this.themes[id]){

return this.themes[id];

}

return this.themes.classic;

}

set(id){

if(this.themes[id]){

localStorage.setItem(

this.key,

id

);

}

}

list(){

return Object.values(this.themes);

}

next(){

const list=this.list();

const current=this.current();

let index=list.findIndex(

v=>v.id===current.id

);

index++;

if(index>=list.length){

index=0;

}

this.set(

list[index].id

);

return list[index];

}

reset(){

localStorage.removeItem(

this.key

);

}

}
