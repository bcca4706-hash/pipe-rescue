export default class CloudSaveSystem{

constructor(){

this.key="pipe_rescue_cloud";

}

export(data){

return JSON.stringify({

version:1,

date:Date.now(),

save:data

});

}

import(json){

try{

const parsed=JSON.parse(json);

if(!parsed.save){

return null;

}

return parsed.save;

}catch{

return null;

}

}

download(data){

const blob=new Blob(

[this.export(data)],

{type:"application/json"}

);

const url=URL.createObjectURL(blob);

const a=document.createElement("a");

a.href=url;

a.download="pipe_rescue_save.json";

a.click();

URL.revokeObjectURL(url);

}

upload(file){

return new Promise((resolve,reject)=>{

const reader=new FileReader();

reader.onload=e=>{

const save=this.import(e.target.result);

if(save){

resolve(save);

}else{

reject("Invalid save");

}

};

reader.onerror=()=>reject("Read error");

reader.readAsText(file);

});

}

copy(data){

navigator.clipboard.writeText(

this.export(data)

);

}

paste(){

return navigator.clipboard.readText()

.then(text=>this.import(text));

}

}
