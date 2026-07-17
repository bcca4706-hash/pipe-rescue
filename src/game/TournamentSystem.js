export default class TournamentSystem{

constructor(){

this.key="pipe_rescue_tournament";

this.data=this.load();

}

defaults(){

return{

season:this.currentSeason(),

score:0,

wins:0,

played:0,

rank:"Bronze",

rewardsClaimed:[]

};

}

currentSeason(){

const now=new Date();

const year=now.getFullYear();

const week=Math.ceil(

(((now-new Date(year,0,1))/86400000)+1)/7

);

return year+"-W"+week;

}

load(){

try{

const raw=localStorage.getItem(this.key);

if(!raw){

const data=this.defaults();

this.save(data);

return data;

}

const data=JSON.parse(raw);

if(data.season!==this.currentSeason()){

const fresh=this.defaults();

this.save(fresh);

return fresh;

}

return data;

}catch{

const data=this.defaults();

this.save(data);

return data;

}

}

save(data=this.data){

localStorage.setItem(

this.key,

JSON.stringify(data)

);

}

addMatch(win,stars=1){

this.data.played++;

if(win){

this.data.wins++;

this.data.score+=100+(stars*50);

}else{

this.data.score=Math.max(

0,

this.data.score-20

);

}

this.updateRank();

this.save();

}

updateRank(){

const s=this.data.score;

if(s>=5000)

this.data.rank="Master";

else if(s>=3000)

this.data.rank="Diamond";

else if(s>=1800)

this.data.rank="Gold";

else if(s>=800)

this.data.rank="Silver";

else

this.data.rank="Bronze";

}

claimReward(rank){

if(

this.data.rewardsClaimed.includes(rank)

)

return false;

this.data.rewardsClaimed.push(rank);

this.save();

return true;

}

reset(){

this.data=this.defaults();

this.save();

}

}
