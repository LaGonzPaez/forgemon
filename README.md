# Forgemon

Jeu de créatures rétro pour iPhone (PWA) : tes créatures évoluent avec tes vrais entraînements.
Toutes les créatures, noms et designs sont originaux.

## Démarrer sur ton PC Windows (une seule fois)
1. Installe **Node.js 22 LTS** (nodejs.org) et **Git** (git-scm.com).
2. Crée le dépôt sur GitHub : nom `forgemon`, **public** (nécessaire pour GitHub Pages gratuit), sans README.
3. Dans un terminal, dans ce dossier :
   ```
   git init -b main
   git add .
   git commit -m "Lot 0 : fondations Forgemon"
   git remote add origin https://github.com/<ton-compte>/forgemon.git
   git push -u origin main
   npm install
   npm test
   ```
4. Sur GitHub : Settings → Pages → Source : **GitHub Actions**. Le jeu sera publié à chaque push sur `main`.
5. Lance Claude Code dans ce dossier : `claude`. Il lit `CLAUDE.md` tout seul. Première demande conseillée :
   « Lis docs/ROADMAP.md et attaque le lot 1. »

## Jouer sur l'iPhone
Ouvre l'adresse GitHub Pages dans **Safari** → Partager → **Sur l'écran d'accueil**. Le jeu s'ouvre en plein écran.
Pendant le développement : `npm run dev -- --host`, puis ouvre l'adresse « Network » sur l'iPhone (même Wi-Fi).

## Contenu
- `data/` : bestiaire (53 lignées, 157 créatures), exercices et paliers, attaques et types.
- `src/engine/` : règles du jeu (testées). `src/scenes/` : écrans Phaser.
- `apps-script/Code.gs` : pont en lecture seule vers le tableau du coach.
- `docs/` : GDD, roadmap, bestiaire (`bestiaire.html` s'ouvre dans un navigateur).
