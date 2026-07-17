import PipeRenderer from "./PipeRenderer.js";

export default class LayerRenderer{

static draw(scene,layerPipe,x,y,size){

const container=scene.add.container(x,y);

const total=layerPipe.count();

for(let i=0;i<total;i++){

const pipe=layerPipe.get(i);

const g=PipeRenderer.draw(

scene,

pipe,

0,

0,

size-(i*12)

);

g.alpha=i===layerPipe.active?1:0.25;

g.scale=1-(i*0.08);

g.rotation=pipe.rotation*Math.PI/2;

container.add(g);

}

container.setDepth(10);

return container;

}

static refresh(container,scene,layerPipe,size){

const x=container.x;
const y=container.y;

container.destroy();

return LayerRenderer.draw(

scene,

layerPipe,

x,

y,

size

);

}

static highlight(container,index){

container.iterate(child=>{

child.alpha=0.25;

});

if(container.list[index]){

container.list[index].alpha=1;

}

}

static pulse(scene,container){

scene.tweens.add({

targets:container,

scale:1.06,

duration:180,

yoyo:true

});

}

}
