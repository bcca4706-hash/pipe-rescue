import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {

appId: 'com.piperescue.game',

appName: 'Pipe Rescue',

webDir: 'dist',

bundledWebRuntime: false,

android: {

allowMixedContent: false,

captureInput: true,

webContentsDebuggingEnabled: false

},

plugins: {

SplashScreen: {

launchShowDuration: 1800,

backgroundColor: "#081018",

androidSplashResourceName: "splash",

showSpinner: false

},

StatusBar: {

style: "DARK",

backgroundColor: "#081018"

},

Keyboard: {

resize: "body"

},

App: {

launchUrl: ""

}

},

server: {

cleartext: false

}

};

export default config;
