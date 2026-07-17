export default class ParticleSystem{

constructor(scene){

this.scene=scene;

}

burst(x,y,color=0x38bdf8,count=18){

for(let i=0;i<count;i++){

const p=this.scene.add.circle(

x,

y,

2+Math.random()*4,

color

);

const angle=Math.random()*Math.PI*2;

const speed=60+Math.random()*180;

this.scene.tweens.add({

targets:p,

x:x+Math.cos(angle)*speed,

y:y+Math.sin(angle)*speed,

alpha:0,

scale:0,

duration:450+Math.random()*250,

onComplete:()=>p.destroy()

});

}

}

success(x,y){

this.burst(x,y,0x22c55e,35);

}

water(x,y){

this.burst(x,y,0x38bdf8,14);

}

portal(x,y){

this.burst(x,y,0xec4899,28);

}

locked(x,y){

this.burst(x,y,0xf59e0b,18);

}

}
