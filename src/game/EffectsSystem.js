export default class EffectsSystem{

constructor(scene){

this.scene=scene;

}

shake(intensity=0.006,duration=120){

this.scene.cameras.main.shake(

duration,

intensity

);

}

flash(color=0xffffff,duration=120){

const w=this.scene.scale.width;
const h=this.scene.scale.height;

const rect=this.scene.add.rectangle(

w/2,

h/2,

w,

h,

color,

0.25

);

this.scene.tweens.add({

targets:rect,

alpha:0,

duration,

onComplete:()=>rect.destroy()

});

}

success(){

this.shake(0.003,150);
this.flash(0x22c55e,220);

}

error(){

this.shake(0.010,180);
this.flash(0xef4444,160);

}

portal(){

this.flash(0xec4899,180);

}

water(){

this.flash(0x38bdf8,80);

}

zoomIn(){

this.scene.tweens.add({

targets:this.scene.cameras.main,

zoom:1.05,

duration:120,

yoyo:true

});

}

}
