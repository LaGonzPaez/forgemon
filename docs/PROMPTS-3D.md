# Prompts — passage de Forgemon en 3D style console double écran

Le jeu passe d'une carte 2D (Phaser) à une **3D low-poly façon console portable double écran** (années 2005-2010) :
monde en 3D vu de haut et de biais, déplacement case par case, petite résolution affichée en gros pixels nets.
Le moteur de règles (`src/engine/`) et ses 14 tests **ne bougent pas** : seul l'affichage change.

**Mode d'emploi** : un prompt = une session Claude Code = une branche = une PR. Colle le prompt tel quel,
valide le plan qu'il te propose, teste sur l'iPhone, puis passe au suivant. Ne saute pas le prompt 0.

---

## Bible visuelle (rappelée dans chaque prompt)

- **Deux écrans en portrait** : écran du haut = monde 3D (résolution interne 256×192) ; écran du bas = tactile
  (croix, A/B, menus, équipe, carte) en pixel art 2D, 256×192. Bande sombre entre les deux, comme une console pliante.
- **Rendu basse résolution** : la 3D est calculée en 256×192 puis agrandie en `NEAREST` (gros pixels nets, pas de flou).
- **Low-poly** : 300 à 800 triangles par personnage ou créature, décors en blocs de 1 case = 1 mètre.
- **Textures minuscules** : 16×16 à 64×64, filtrage `NEAREST`, pas de mipmaps. Ou couleurs par sommet tirées des palettes de `data/creatures.json`.
- **Lumière simple** : une lumière directionnelle + une ambiante, ombrage en 2 ou 3 tons. Pas d'ombres temps réel : un disque sombre sous les persos.
- **Caméra** : fixe, inclinée ~50°, suit le joueur. Léger brouillard au loin.
- **100 % original** : aucune créature, aucun perso, aucun lieu, aucun son d'une franchise existante. Assets externes en CC0 uniquement, notés dans `public/assets/CREDITS.md`.
- **Cible** : iPhone en PWA (Safari), 60 images/s visées, 30 minimum. Peu d'appels de dessin : géométrie statique fusionnée, instanciation pour les herbes.

---

## Prompt 0 — Pivot technique : coquille 3D double écran

```text
Lis CLAUDE.md, docs/GDD.md, docs/ROADMAP.md et docs/PROMPTS-3D.md (la bible visuelle).
On abandonne la carte 2D Phaser : Forgemon devient un jeu en 3D low-poly façon console portable
double écran (voir la bible). Les règles du jeu et src/engine/ ne changent pas.

Branche : lot-3d-0-coquille. Avant de coder, propose-moi un plan court et attends mon OK.

À faire :
1. Remplace Phaser par Three.js (version exacte épinglée dans package.json, comme les autres dépendances).
   Garde Vite, la PWA (manifest, service worker) et le déploiement GitHub Pages.
2. Mise en page portrait en deux écrans 256×192 (haut : canvas 3D ; bas : canvas 2D pixel art pour l'interface),
   mise à l'échelle entière quand c'est possible, centrée, respect des zones sûres de l'iPhone (encoche, barre du bas).
3. Pipeline de rendu basse résolution : la scène 3D est rendue dans une cible 256×192 puis affichée en NEAREST.
4. Écran titre : un cube ou une petite forge low-poly qui tourne en haut, « FORGEMON » et « TOUCHE POUR JOUER » en bas.
5. Robustesse iPhone : perte de contexte WebGL quand l'appli passe en arrière-plan, pas de zoom au double tap,
   son débloqué au premier toucher.
6. Mets à jour CLAUDE.md (section Stack, conventions : src/scenes devient src/render ou équivalent, à toi de proposer)
   et réécris docs/ROADMAP.md : lots 1 et 2 en 3D, en reprenant le contenu des lots actuels.
7. npm test doit rester vert. Explique-moi comment tester sur l'iPhone en Wi-Fi (npm run dev -- --host), une commande à la fois.
```

## Prompt 1 — Monde 3D : la Route de la Forge

```text
Lis CLAUDE.md, docs/ROADMAP.md et la bible visuelle de docs/PROMPTS-3D.md.
Branche : lot-3d-1-monde. Propose-moi un plan court et attends mon OK.

Objectif : une première zone 3D jouable, la « Route de la Forge ».
1. Format de carte : je veux continuer à dessiner les cartes dans Tiled (gratuit). Chaque tuile Tiled devient un bloc 3D
   (sol, chemin, hautes herbes, eau, arbre, rocher, mur, maison, porte d'arène, panneau). Un calque « hauteur » permet
   des marches et des falaises. Exporte en JSON dans public/assets/maps/.
2. Conversion Tiled → grille de jeu dans une fonction pure, testée (cases franchissables, herbes, portes, panneaux).
3. Décors : kit low-poly CC0 (Kenney, Quaternius ou équivalent, vérifie la licence) ou blocs faits en code.
   Note chaque source dans public/assets/CREDITS.md.
4. Carte de la Route de la Forge : herbes hautes, chemins, l'Abri, la porte de l'arène, 2 ou 3 panneaux, un peu de relief.
5. Herbes hautes animées (légère ondulation), instanciées pour rester fluides sur iPhone.
6. Caméra fixe inclinée qui suit un cube provisoire déplacé case par case au clavier (le vrai perso arrive au prompt 2).
Ajoute des tests pour la grille et les collisions. npm test vert.
```

## Prompt 2 — Le joueur et les commandes tactiles

```text
Lis CLAUDE.md et la bible visuelle de docs/PROMPTS-3D.md. Branche : lot-3d-2-joueur.
Propose-moi un plan court et attends mon OK.

1. Perso joueur low-poly ORIGINAL (silhouette sportive, tenue de salle, couleurs de Forgemon), fait en code ou
   modélisé simplement. Animations : repos, marche, course, tourner dans les 4 directions.
2. Déplacement case par case fluide (interpolation), collisions avec la grille du prompt 1, maintien = marche continue.
3. Écran du bas : croix directionnelle + boutons A et B en pixel art, multi-touch, réactifs (pas de délai de 300 ms).
   Clavier sur PC : flèches/ZQSD, Entrée = A, Échap = B.
4. A devant un panneau ou une porte : déclenche une action (affiche juste un message pour l'instant).
5. Sauvegarde de la position dans localStorage (clé forgemon-save-v1, garde le format extensible).
Teste la logique de déplacement (fonctions pures). npm test vert.
```

## Prompt 3 — Dialogues, PNJ et panneaux

```text
Lis CLAUDE.md et la bible visuelle de docs/PROMPTS-3D.md. Branche : lot-3d-3-dialogues.
Propose-moi un plan court et attends mon OK.

1. Boîte de dialogue rétro sur l'écran du bas : texte qui défile lettre par lettre, A pour accélérer puis continuer,
   flèche qui clignote, police bitmap pixel lisible avec les accents français.
2. Dialogues dans un fichier de données (data/dialogues.json), pas en dur dans le code.
3. 3 PNJ originaux low-poly sur la Route de la Forge (un ancien forgeron, une coach, un enfant), qui se tournent vers
   le joueur quand il leur parle. Panneaux lisibles.
4. Le PNJ de l'Abri explique la règle d'or : « Les combats rendent plus fort, mais seul ton vrai entraînement fait évoluer. »
Tests pour le découpage du texte en pages. npm test vert.
```

## Prompt 4 — Fabrique de créatures low-poly

```text
Lis CLAUDE.md, la bible visuelle de docs/PROMPTS-3D.md et data/creatures.json (champs brief et palette).
Branche : lot-3d-4-creatures. Propose-moi un plan court et attends mon OK.

157 créatures, c'est trop pour tout modéliser à la main. On fait une fabrique :
1. Un générateur de créatures low-poly à partir de « recettes » (corps, tête, pattes, queue, ailes, cornes, plaques,
   yeux…) avec les 4 couleurs de la palette de chaque lignée. Les recettes vivent dans les données, générées par
   tools/build_creatures.py (le bestiaire se modifie toujours là, puis npm run data).
2. Écris les recettes de Braisillon, Fondragon, Pyrarque et des lignées de la Forge des Pecs, fidèles aux briefs.
   Chaque stade doit être plus grand et plus impressionnant que le précédent, en gardant un air de famille.
3. Animations simples par code : respiration au repos, attaque, coup reçu, K.O.
4. Une page de test (visionneuse) pour faire tourner chaque créature et comparer les stades, lancée par npm run dev.
5. Créatures 100 % originales : si une recette ressemble trop à une créature connue, change-la.
Tests : chaque lignée a une recette valide pour chacun de ses stades. npm test vert.
```

## Prompt 5 — Combat 3D

```text
Lis CLAUDE.md, docs/GDD.md (section Combats) et la bible visuelle de docs/PROMPTS-3D.md.
Branche : lot-3d-5-combat. Propose-moi un plan court et attends mon OK.

1. Dans les hautes herbes : rencontre aléatoire (taux dans les données), transition rétro (flash + volet).
2. Écran du haut : arène 3D, deux socles, la créature sauvage apparaît, caméra qui balaie puis se cale derrière ta créature.
3. Écran du bas : barres de PV, niveau, menu Attaque / Équipe / Capsule / Fuite, les 4 attaques avec leur type.
4. Calculs via src/engine/ uniquement (dégâts, efficacité, plafond +1 niveau par jour). Aucun combat ne fait évoluer.
5. Effets d'attaque low-poly par type (particules simples), secousse au coup critique, K.O.
6. Capture avec capsule (50 ₣), ajout à l'équipe ou à l'Abri.
Tests pour la logique de tour de combat. npm test vert.
```

## Prompt 6 — Recette sur l'iPhone

```text
Lis CLAUDE.md. Branche : lot-3d-6-recette. Je vais tester le jeu installé sur l'écran d'accueil de mon iPhone.
Guide-moi pas à pas : ce que je dois vérifier (plein écran, encoche, fluidité, son, reprise après mise en veille,
sauvegarde après fermeture), puis corrige ce que je te remonte. Ajoute un compteur d'images/s caché
(appui long sur le titre) pour mesurer la fluidité.
```
