# Forgemon — document de game design

## Pitch
Un jeu de créatures à l'ancienne, vu de dessus, sur iPhone. Chaque exercice de ton programme a ses créatures.
Tu les croises dans les hautes herbes, tu les captures, tu combats. **Mais elles n'évoluent que si toi tu progresses vraiment à la salle.**

## Boucle de jeu
1. Tu t'entraînes, tu remplis le carnet du coach (comme aujourd'hui).
2. À l'ouverture, le jeu lit le carnet : XP, records, paliers de force, pièces.
3. Tu explores, tu combats, tu captures : tes créatures prennent des niveaux (plafonnés).
4. Tu fais un cours : tu gagnes un parchemin, ta créature apprend une attaque.
5. Le mercredi, le coach valide ta technique : tu appuies sur « Le coach a validé » et ta créature évolue (si niveau et palier sont atteints).
6. Le samedi matin, après l'Hyrox : arène.
7. Fin du jeu : 6 badges + poids cible tenu sur 7 jours, sans avoir perdu de force → Titanox.

## Créatures
- **53 lignées, 157 créatures** : `data/creatures.json` (source : `tools/build_creatures.py`, lecture : `docs/BESTIAIRE.md`).
- **25 groupes d'exercices** (tout le carnet du coach), **2 lignées par groupe (A et B)**. Les deux vivent dans la zone du groupe : tu choisis en les croisant. Tu peux avoir les deux.
- **Starter** : Braisillon → Fondragon → Pyrarque (Feu). Il évolue avec **tout ce que tu fais** : séances, Hyrox, natation, vélo, marche, cours. Stade 2 à 30 activités réelles, stade 3 à 100.
- **Hippocampe** : Ondulin → Hippondule → Maréquestre (Eau). Évolue avec la **natation / plongée** : 8 puis 24 séances. Vit au Lagon des Brasses.
- **Légendaire** : Titanox, uniquement en finale.

## Progression
| Quoi | Vient de | Règle |
|---|---|---|
| Niveau (force au combat) | Carnet + combats | Carnet : 40 XP par série notée, 300 XP par record. Combats : plafond +1 niveau / jour / créature. Courbe : XP = niveau³. |
| Palier de force | Carnet uniquement | 1RM estimé (Epley) ÷ poids de corps, comparé aux paliers du groupe (`data/exercises.json`). Débutant → Intermédiaire → Avancé → Élite. |
| Évolution stade 2 | Réel | Niveau 16 + palier Intermédiaire + feu vert du coach. |
| Évolution stade 3 | Réel | Niveau 36 + palier Avancé + feu vert du coach. |
| Nouvelle attaque | Cours fait | 1 cours = 1 parchemin = 1 attaque apprise (4 max, oublier pour remplacer). |
| Rang d'attaque | Combats | Rang II après 25 utilisations, rang III après 75 (+15 % de puissance par rang). |
| Pièces | Carnet + combats | 2 par série, 25 par record, 100 par évolution, 200 par badge, 15 par combat sauvage gagné. |

Valeurs aberrantes du carnet (> 1,4× ou < 0,4× la médiane de l'exo) : écartées du calcul et **affichées** au joueur pour qu'il corrige à la source. Reps et charge inversées (« 75 | 9 ») : corrigées automatiquement.

## Monde
| Zone | Groupes | Arène | Badge |
|---|---|---|---|
| Forge des Pecs | écartés, chest press, incliné, dips | Maîtresse Fonte | Enclume |
| Falaises du Dos | tractions, tirages, pendle row, RDL | Capitaine Rafale | Aile |
| Pics des Épaules | élévations, rear delt | Guide Altaïr | Sommet |
| Mine des Bras | curls, triceps, au front | Contremaître Brunel | Marteau |
| Vallée des Jambes | leg ext., leg curl, pendulum, presse, adducteurs, mollets | Doyenne Sylve | Racine |
| Temple des Abdos | crunch, relevé de jambes | Moine Axis | Noyau |
| Lagon des Brasses (bonus) | hippocampe | — | — |
| Sommet de la Balance | finale | Titanox | — |

Une zone s'ouvre quand au moins une lignée de la zone précédente atteint le palier Intermédiaire. Ordre suggéré : Pecs → Dos → Épaules → Bras → Jambes → Abdos.
Champion d'arène : équipe calée sur le **palier suivant** de la zone (on le bat en progressant pour de vrai).

## Combats
Tour par tour, 4 attaques max, 13 types (table dans `data/moves.json`), bonus de type identique ×1,25.
Capsules (50 ₣) pour capturer, soins (20 ₣). Abri pour soigner gratuitement. Pas de mort définitive.

## Activités hors carnet
Hyrox, natation, vélo, marche inclinée, cours : **cases à cocher dans le jeu** (une par jour et par activité). Une photo de preuve est prévue pour l'Hyrox et la pesée (lot 6).

## Questions ouvertes (à trancher avec Gonzague)
1. **« Cours »** : cours collectifs à la salle ? séances avec le coach ? cours d'UniLaSalle ? Par défaut dans le code : une case « cours fait » générique.
2. **Poids cible** : à saisir dans les réglages (valeur du coach).
3. **Paliers de force** : repères indicatifs, à faire relire par le coach (machines ≠ d'une salle à l'autre).
