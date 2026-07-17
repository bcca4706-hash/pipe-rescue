export default class CurrencySystem{

constructor(){

this.key="pipe_rescue_currency";

this.data=this.load();

}

defaultData(){

return{

coins:0,

gems:0,

tickets:0

};

}

load(){

try{

const raw=localStorage.getItem(this.key);

if(!raw){

return this.defaultData();

}

return JSON.parse(raw);

}catch{

return this.defaultData();

}

}

save(){

localStorage.setItem(

this.key,

JSON.stringify(this.data)

);

}

coins(){

return this.data.coins;

}

gems(){

return this.data.gems;

}

addCoins(value){

this.data.coins+=value;

this.save();

}

addGems(value){

this.data.gems+=value;

this.save();

}

spendCoins(value){

if(this.data.coins<value){

return false;

}

this.data.coins-=value;

this.save();

return true;

}

spendGems(value){

if(this.data.gems<value){

return false;

}

this.data.gems-=value;

this.save();

return true;

}

reward(level,stars){

let coins=25;

coins+=stars*20;

coins+=level*3;

this.addCoins(co
cat > src/game/CurrencySystem.js <<'EOF'
export default class CurrencySystem{

constructor(){

this.key="pipe_rescue_currency";

this.data=this.load();

}

defaultData(){

return{

coins:0,

gems:0,

tickets:0

};

}

load(){

try{

const raw=localStorage.getItem(this.key);

if(!raw){

return this.defaultData();

}

return JSON.parse(raw);

}catch{

return this.defaultData();

}

}

save(){

localStorage.setItem(

this.key,

JSON.stringify(this.data)

);

}

coins(){

return this.data.coins;

}

gems(){

return this.data.gems;

}

addCoins(value){

this.data.coins+=value;

this.save();

}

addGems(value){

this.data.gems+=value;

this.save();

}

spendCoins(value){

if(this.data.coins<value){

return false;

}

this.data.coins-=value;

this.save();

return true;

}

spendGems(value){

if(this.data.gems<value){

return false;

}

this.data.gems-=value;

this.save();

return true;

}

reward(level,stars){

let coins=25;

coins+=stars*20;

coins+=level*3;

this.addCoins(coins);

if(stars===3){

this.addGems(1);

}

return{

coins,

gems:stars===3?1:0

};

}

reset(){

this.data=this.defaultData();

this.save();

}

}
