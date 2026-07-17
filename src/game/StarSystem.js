export default class StarSystem{

constructor(){

this.moves=0;
this.time=0;

this.rules={

three:{
moves:15,
time:60
},

two:{
moves:30,
time:120
}

};

}

begin(){

this.moves=0;
this.time=Date.now();

}

move(){

this.moves++;

}

finish(){

const seconds=Math.floor(

(Date.now()-this.time)/1000

);

let stars=1;

if(

this.moves<=this.rules.three.moves&&
seconds<=this.rules.three.time

){

stars=3;

}else if(

this.moves<=this.rules.two.moves&&
seconds<=this.rules.two.time

){

stars=2;

}

return{

stars,

moves:this.moves,

seconds

};

}

grade(result){

switch(result.stars){

case 3:
return "Perfect";

case 2:
return "Great";

default:
return "Clear";

}

}

reset(){

this.moves=0;
this.time=0;

}

}
