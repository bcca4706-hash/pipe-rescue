import Phaser from "phaser";

import SplashScene from "./scenes/SplashScene.js";
import MenuScene from "./scenes/MenuScene.js";
import WorldMapScene from "./scenes/WorldMapScene.js";
import GameScene from "./scenes/GameScene.js";
import LayerGameScene from "./scenes/LayerGameScene.js";
import ShopScene from "./scenes/ShopScene.js";
import ThemeScene from "./scenes/ThemeScene.js";
import SettingsScene from "./scenes/SettingsScene.js";
import ProfileScene from "./scenes/ProfileScene.js";
import ProfileEditorScene from "./scenes/ProfileEditorScene.js";
import AchievementScene from "./scenes/AchievementScene.js";
import LevelEditorScene from "./scenes/LevelEditorScene.js";

const config = {
  type: Phaser.AUTO,

  parent: "game",

  width: 720,
  height: 1280,

  backgroundColor: "#0f172a",

  scene: [
    SplashScene,
    MenuScene,
    WorldMapScene,
    GameScene,
    LayerGameScene,
    ShopScene,
    ThemeScene,
    SettingsScene,
    ProfileScene,
    ProfileEditorScene,
    AchievementScene,
    LevelEditorScene
  ],

  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },

  render: {
    pixelArt: false,
    antialias: true
  },

  physics: {
    default: "arcade",
    arcade: {
      debug: false
    }
  }
};

new Phaser.Game(config);
