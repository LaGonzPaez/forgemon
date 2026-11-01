import Phaser from 'phaser';
import creatures from '../data/creatures.json';
import exercises from '../data/exercises.json';
import { TitleScene } from './scenes/TitleScene.js';

// Résolution logique façon console portable, mise à l'échelle entière (pixel art net).
const W = 240, H = 400;

const game = new Phaser.Game({
  type: Phaser.AUTO,
  parent: 'game',
  width: W,
  height: H,
  pixelArt: true,
  backgroundColor: '#161927',
  scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH },
  scene: [TitleScene],
});
game.registry.set('creatures', creatures);
game.registry.set('exercises', exercises);

if ('serviceWorker' in navigator && import.meta.env.PROD) {
  navigator.serviceWorker.register('./sw.js').catch(() => {});
}
