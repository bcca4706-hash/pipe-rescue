export default class GooglePlayGamesSystem{

constructor(){

this.ready=false;
this.player=null;

}

async initialize(){

if(!window.PlayGamesSdk){

console.warn("Google Play Games SDK not found");

return false;

}

try{

await window.PlayGamesSdk.initialize();

this.ready=true;

return true;

}catch(e){

console.error(e);

return false;

}

}

async signIn(){

if(!this.ready)

return false;

try{

this.player=

await window.PlayGamesSdk.signIn();

return this.player;

}catch(e){

console.error(e);

return null;

}

}

async unlockAchievement(id){

if(!this.ready)

return;

try{

await window.PlayGamesSdk.unlockAchievement({

achievementId:id

});

}catch(e){

console.error(e);

}

}

async incrementAchievement(id,steps){

if(!this.ready)

return;

try{

await window.PlayGamesSdk.incrementAchievement({

achievementId:id,

steps

});

}catch(e){

console.error(e);

}

}

async submitScore(leaderboardId,score){

if(!this.ready)

return;

try{

await window.PlayGamesSdk.submitScore({

leaderboardId,

score

});

}catch(e){

console.error(e);

}

}

async showLeaderboard(id){

if(!this.ready)

return;

try{

await window.PlayGamesSdk.showLeaderboard({

leaderboardId:id

});

}catch(e){

console.error(e);

}

}

async showAchievements(){

if(!this.ready)

return;

try{

await window.PlayGamesSdk.showAchievements();

}catch(e){

console.error(e);

}

}

async saveSnapshot(name,data){

if(!this.ready)

return;

try{

await window.PlayGamesSdk.saveSnapshot({

name,

data:JSON.stringify(data)

});

}catch(e){

console.error(e);

}

}

async loadSnapshot(name){

if(!this.ready)

return null;

try{

const result=

await window.PlayGamesSdk.loadSnapshot({

name

});

return JSON.parse(result.data);

}catch(e){

console.error(e);

return null;

}

}

signOut(){

if(window.PlayGamesSdk){

window.PlayGamesSdk.signOut();

}

this.player=null;

}

}
