# Roadmap Forgemon

Chaque lot est jouable sur l'iPhone à la fin. Un lot = une branche + une PR + `npm test` vert.

## ✅ Lot 0 — Fondations (fait)
- Bestiaire complet : 53 lignées, 157 créatures, briefs d'art, palettes (`data/creatures.json`).
- 25 groupes d'exercices calés sur le carnet réel, paliers de force (`data/exercises.json`).
- Attaques et table des types (`data/moves.json`).
- Moteur de règles + 14 tests : lecture du carnet, paliers, évolution, plafond d'XP, parchemins, arène, finale.
- Coquille Phaser/Vite + PWA (manifest, service worker, icône), pont Apps Script, déploiement GitHub Pages.

## Lot 1 — Moteur de carte
- [ ] Tileset CC0 16×16 (Kenney « Tiny Town » ou équivalent CC0) + crédits.
- [ ] Map « Route de la Forge » dans Tiled : herbes, chemins, Abri, porte d'arène, panneaux.
- [ ] Perso joueur animé 4 directions (sprite original), déplacement case par case, collisions.
- [ ] Commandes tactiles (croix + A/B) en surimpression, clavier sur PC.
- [ ] Dialogues façon boîte rétro, PNJ qui parlent.
- [ ] Test : installation sur l'écran d'accueil de l'iPhone, plein écran OK.

## Lot 2 — Combats et captures
- [ ] Sprites des créatures de la Forge des Pecs + Braisillon (3 stades) en pixel art 64×64, depuis les briefs.
- [ ] Scène de combat : entrée animée, barres de PV, menu, attaques, efficacité, K.O.
- [ ] Capsules, soins, Abri, équipe de 6, bestiaire (vu / capturé).
- [ ] Animation d'évolution (clignotement blanc qui accélère, flash, révélation).
- [ ] Musique et bruitages originaux (chiptune ; ex. outils gratuits type BeepBox/jsfxr).

## Lot 3 — Branchement du carnet
- [ ] Installer `apps-script/Code.gs` sur le tableau du coach (guide pas à pas pour Gonzague).
- [ ] Réglages : URL Apps Script + clé, bouton « Lire le carnet ».
- [ ] Application des règles du moteur : XP, paliers, pièces, valeurs écartées affichées.
- [ ] Bouton « Le coach a validé » sur la fiche quand l'évolution est possible.
- [ ] Cases du jour : Hyrox, natation, vélo, marche, cours (→ parchemin).

## Lot 4 — Falaises du Dos + arène du samedi
- [ ] Map, sprites des 10 lignées du dos, arène Capitaine Rafale.
- [ ] Arène de la Forge (Maîtresse Fonte), règle samedi + Hyrox.

## Lot 5 — Épaules, Bras, Jambes, Abdos, Lagon
- [ ] Une map + une arène par zone, sprites des lignées, Ondulin au Lagon.

## Lot 6 — Finale et finitions
- [ ] Sommet de la Balance, Titanox, générique de fin.
- [ ] Pesée et Hyrox avec photo de preuve.
- [ ] Export / import de sauvegarde, écran de stats (records, paliers, historique).
