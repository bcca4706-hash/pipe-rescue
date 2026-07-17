export default class LevelShareSystem{

constructor(){

this.prefix="PR";

}

encode(board){

const json=JSON.stringify(board);

return this.prefix+"-"+btoa(

encodeURIComponent(json)

);

}

decode(code){

try{

if(!code.startsWith(this.prefix+"-")){

return null;

}

const raw=code.substring(

this.prefix.length+1

);

return JSON.parse(

decodeURIComponent(

atob(raw)

)

);

}catch{

return null;

}

}

randomCode(length=10){

const chars=

"ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

let out="";

for(let i=0;i<length;i++){

out+=chars[

Math.floor(

Math.random()*chars.length

)

];

}

return(

this.prefix+

"-"+

out.substring(0,4)+

"-"+

out.substring(4,8)+

"-"+

out.substring(8)

);

}

export(board){

return{

code:this.randomCode(),

data:this.encode(board)

};

}

import(text){

return this.decode(text);

}

copy(board){

const value=this.encode(board);

navigator.clipboard.writeText(value);

return value;

}

async paste(){

const text=

await navigator.clipboard.readText();

return this.import(text);

}

}
