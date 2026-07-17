import {
initializeApp
} from "firebase/app";

import {
getAnalytics,
logEvent
} from "firebase/analytics";

export default class FirebaseAnalyticsSystem{

constructor(config){

this.app=initializeApp(config);

this.analytics=getAnalytics(this.app);

}

event(name,data={}){

logEvent(

this.analytics,

name,

data

);

}

levelStart(level){

this.event(

"level_start",

{

level

}

);

}

levelComplete(level,moves,time,stars){

this.event(

"level_complete",

{

level,

moves,

time,

stars

}

);

}

levelFail(level){

this.event(

"level_fail",

{

level

}

);

}

hint(){

this.event(

"hint_used"

);

}

undo(){

this.event(

"undo_used"

);

}

purchase(item,currency,value){

this.event(

"purchase",

{

item_name:item,

currency,

value

}

);

}

rewardAd(type){

this.event(

"reward_ad",

{

reward:type

}

);

}

theme(name){

this.event(

"theme_change",

{

theme:name

}

);

}

profile(level){

this.event(

"profile_level",

{

level

}

);

}

achievement(id){

this.event(

"achievement_unlock",

{

id

}

);

}

}
