import Phaser from 'phaser';

// Écran titre provisoire. Le lot 1 (voir docs/ROADMAP.md) le remplace par le vrai titre
// puis la scène de carte (tilemap Tiled + perso animé).
export class TitleScene extends Phaser.Scene {
  constructor() { super('Title'); }

  create() {
    const { width: w, height: h } = this.scale;
    const lines = this.registry.get('creatures').lines;
    const total = lines.reduce((n, l) => n + l.stages.length, 0);

    this.add.text(w / 2, h * 0.3, 'FORGEMON', { fontFamily: 'monospace', fontSize: '28px', color: '#F2B544' }).setOrigin(0.5);
    this.add.text(w / 2, h * 0.3 + 30, 'Tes muscles. Tes créatures.', { fontFamily: 'monospace', fontSize: '11px', color: '#9AA3BF' }).setOrigin(0.5);
    this.add.text(w / 2, h * 0.55, `${lines.length} lignées · ${total} créatures`, { fontFamily: 'monospace', fontSize: '11px', color: '#ECEEF5' }).setOrigin(0.5);

    const prompt = this.add.text(w / 2, h * 0.75, 'TOUCHE POUR JOUER', { fontFamily: 'monospace', fontSize: '12px', color: '#F97316' }).setOrigin(0.5);
    this.tweens.add({ targets: prompt, alpha: 0.2, duration: 600, yoyo: true, repeat: -1 });
    this.input.once('pointerdown', () => this.cameras.main.flash(300, 255, 255, 255));
  }
}
