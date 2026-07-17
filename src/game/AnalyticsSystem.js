export default class AnalyticsSystem{

constructor(){

this.key="pipe_rescue_analytics";

this.events=this.load();

}

load(){

try{

const raw=localStorage.getItem(this.key);

return raw?JSON.parse(raw):[];

}catch{

return[];

}

}

save(){

localStorage.setItem(

this.key,

JSON.stringify(this.events)

);

}

track(name,data={}){

this.events.push({

name,

data,

time:Date.now()

});

if(this.events.length>1000){

this.events.shift();

}

this.save();

}

levelStart(level){

this.track("level_start",{

level

});

}

levelComplete(level,moves,time,stars){

this.track("level_complete",{

level,

moves,

time,

stars

});

}

levelFail(level){

this.track("level_fail",{

level

});

}

purchase(item,price,currency){

this.track("purchase",{

item,

price,

currency

});

}

adReward(type){

this.track("ad_reward",{

type

});

}

hintUsed(){

this.track("hint_used");

}

undoUsed(){

this.track("undo_used");

}

themeChanged(theme){

this.track("theme_changed",{

theme

});

}

profileUpdated(){

this.track("profile_updated");

}

export(){

return JSON.stringify(

this.events,

null,

2

);

}

clear(){

this.events=[];

this.save();

}

}
