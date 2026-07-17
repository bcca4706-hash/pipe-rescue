export default class AdMobSystem{

constructor(){

this.ready=false;

}

async initialize(){

if(!window.Capacitor){

console.warn("Capacitor not found");

return false;

}

try{

const {AdMob}=window.Capacitor.Plugins;

await AdMob.initialize();

this.ready=true;

return true;

}catch(e){

console.error(e);

return false;

}

}

async showBanner(adUnitId){

if(!this.ready)
return;

const {AdMob}=window.Capacitor.Plugins;

await AdMob.showBanner({

adId:adUnitId,

position:"BOTTOM_CENTER",

size:"BANNER"

});

}

async hideBanner(){

if(!this.ready)
return;

const {AdMob}=window.Capacitor.Plugins;

await AdMob.hideBanner();

}

async showInterstitial(adUnitId){

if(!this.ready)
return false;

const {AdMob}=window.Capacitor.Plugins;

await AdMob.prepareInterstitial({

adId:adUnitId

});

await AdMob.showInterstitial();

return true;

}

async showRewarded(adUnitId){

if(!this.ready)
return false;

const {AdMob}=window.Capacitor.Plugins;

await AdMob.prepareRewardVideoAd({

adId:adUnitId

});

const result=

await AdMob.showRewardVideoAd();

return result;

}

async showAppOpen(adUnitId){

if(!this.ready)
return;

const {AdMob}=window.Capacitor.Plugins;

await AdMob.prepareAppOpen({

adId:adUnitId

});

await AdMob.showAppOpen();

}

}
