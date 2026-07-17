export default class AudioSystem{

constructor(scene){

this.scene=scene;

this.enabled=true;

this.musicEnabled=true;

this.sounds={};

this.music=null;

}

load(key,path){

this.scene.load.audio(key,path);

}

register(key){

this.sounds[key]=this.scene.sound.add(key);

}

play(key){

if(!this.enabled)
return;

const s=this.sounds[key];

if(s){

s.play();

}

}

loop(key){

if(!this.musicEnabled)
return;

if(this.music){

this.music.stop();

}

this.music=this.scene.sound.add(key,{

loop:true,

volume:0.5

});

this.music.play();

}

stopMusic(){

if(this.music){

this.music.stop();

this.music=null;

}

}

setSound(value){

this.enabled=value;

}

setMusic(value){

this.musicEnabled=value;

if(!value){

this.stopMusic();

}

}

toggleSound(){

this.enabled=!this.enabled;

}

toggleMusic(){

this.musicEnabled=!this.musicEnabled;

if(!this.musicEnabled){

this.stopMusic();

}

}

}
