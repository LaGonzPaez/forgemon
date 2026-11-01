# Forgemon — instructions pour Claude Code

Jeu de créatures rétro (vue de dessus, hautes herbes, combats au tour par tour) pour **un seul joueur : Gonzague**.
Ses créatures progressent avec ses **vrais entraînements**, lus dans le tableau Google Sheets de son coach.
Lis `docs/GDD.md` (règles) et `docs/ROADMAP.md` (lots) avant toute modification.

## Comment travailler avec Gonzague
- Tutoiement, français, direct et motivant. Réponses courtes et structurées, orientées action.
- Il est automaticien (BTS électrotechnique, licence CSSA) : il comprend la logique, il n'est pas dev web. Explique les commandes à lancer, une par une.
- Quand il bloque, guide-le par des questions plutôt que de tout faire à sa place, sauf s'il demande la solution.
- Il joue sur **iPhone uniquement**, développe sur **PC Windows** (pas de Mac, pas de compte Apple Developer). Le jeu est une **PWA** installée depuis Safari (« Sur l'écran d'accueil »).

## Règles non négociables du jeu (voulues par le joueur)
1. **Les combats rendent plus fort** (XP, niveau), plafonnés à **+1 niveau par jour et par créature**.
2. **Les combats ne font JAMAIS évoluer.** Évolution = niveau + palier de force lu au carnet + feu vert du coach (bouton). Starter et hippocampe : évolution au nombre d'activités réelles.
3. **Une nouvelle attaque ne s'apprend que si un cours a été fait** (1 cours = 1 parchemin). Les attaques montent de rang à l'usage en combat.
4. **Arène** : le samedi avant 13 h, seulement si l'Hyrox du jour est coché.
5. **Finale** : 6 badges + poids cible atteint en moyenne sur 7 jours + aucun palier de force perdu.
Toute règle est codée dans `src/engine/progression.js` et couverte par `tests/`. Ne change pas une règle sans son accord explicite.

## Propriété intellectuelle (strict)
- **Uniquement des créatures, noms, sprites, musiques et maps ORIGINAUX.** Jamais un personnage, un nom, un sprite, un son ou un logo d'une franchise existante, même « en hommage », même modifié. Si Gonzague demande une créature d'une franchise connue, propose une créature originale à la place.
- Assets externes : seulement sous licence **CC0** (ex. Kenney.nl, OpenGameArt filtré CC0). Note la source et la licence dans `public/assets/CREDITS.md`.

## Données et vie privée
- Le dépôt est **public** (GitHub Pages gratuit). Il ne doit contenir **aucune donnée perso** : pas de poids, pas de séances, pas d'ID du tableau, pas d'URL Apps Script, pas de clé.
- Les données arrivent à l'exécution via `apps-script/Code.gs` (déployé sur le compte Google de Gonzague, protégé par une clé saisie une fois dans le jeu et gardée dans `localStorage` du téléphone).
- Le jeu **lit** le tableau, il n'y **écrit jamais**.
- Le tableau du coach a ses propres règles (voir le dépôt privé `muscu-nutrition`) : ne jamais le modifier depuis ce projet.

## Stack
- Phaser 3 (pixel art, `pixelArt: true`), Vite, JavaScript ES modules. Résolution logique 240×400, mise à l'échelle FIT.
- Maps : éditées dans **Tiled** (gratuit), exportées en JSON dans `public/assets/maps/`.
- Données de jeu : `data/*.json`. **Le bestiaire se modifie dans `tools/build_creatures.py`**, puis `npm run data`.
- Sauvegarde : `localStorage` (clé `forgemon-save-v1`), avec export/import manuel en JSON dans les réglages.

## Commandes
- `npm install` · `npm run dev` (ouvre sur le réseau local : `npm run dev -- --host` pour tester sur l'iPhone en Wi-Fi)
- `npm test` — doit rester vert avant chaque commit.
- `npm run build` · `npm run data` (régénère creatures.json + docs/BESTIAIRE.md)
- Déploiement : push sur `main` → GitHub Actions teste, build et publie sur Pages.

## Conventions
- Moteur (`src/engine/`) : fonctions pures, sans Phaser, testées. Scènes (`src/scenes/`) : affichage et entrées uniquement.
- Textes du jeu en français, nombres à la française (12,5 kg).
- Petits commits, message en français, un lot de la roadmap = une branche + une PR.
