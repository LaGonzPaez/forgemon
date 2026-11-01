import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { parseCarnet, lastWeight, matchGroup, weightAvg7 } from '../src/engine/carnet.js';
import * as P from '../src/engine/progression.js';

const EX = JSON.parse(readFileSync(new URL('../data/exercises.json', import.meta.url)));
const MV = JSON.parse(readFileSync(new URL('../data/moves.json', import.meta.url)));
const CR = JSON.parse(readFileSync(new URL('../data/creatures.json', import.meta.url)));
const G = EX.groups;
const g = (id) => G.find((x) => x.id === id);

test('chaque exercice réel du carnet trouve son groupe', () => {
  const noms = ['Ecarté machine ', 'Chest press', 'Développé incliné barre', 'Dips machine ', 'Curl marteau haltère',
    'Extension triceps overaed unilatéral ', 'Curl unilatéal dos à la poulie', 'Crunch poulie haute ', 'Rear delt ',
    'Pendle chest row bar', 'Tirage vertcial épaisseur dos', 'Tirage horizontal unilatéral', 'Elevation latérale ',
    'Elevation latérale poulis', 'Relevé de jambes ', 'Adducteur', 'Leg extension ', 'Pendulum', 'Press vertical pieds bas ',
    'Leg curl allongé ', 'Extension mollets press assise ', 'Développé incliné cadre guidé', 'Ecarté Gym 80',
    'Extension triceps unilatéral de profil', 'Barre au front ', 'Curl pupitre machine ', 'Tractions lestees',
    'Tirage vertcial supination', 'Curl banc incliné ', 'Haltère au front ', 'Leg curl assis ', 'RDL barre ',
    'Presse circulaire ', 'Extension mollets assis machine '];
  const attendu = ['ecartes', 'chest_press', 'incline', 'dips', 'curl_marteau', 'triceps_ext', 'curl_poulie', 'crunch_poulie',
    'rear_delt', 'pendle_row', 'tirage_vertical', 'tirage_horizontal', 'elevations', 'elevations', 'releve_jambes',
    'adducteurs', 'leg_extension', 'pendulum', 'presse', 'leg_curl', 'mollets', 'incline', 'ecartes', 'triceps_ext',
    'au_front', 'curl_pupitre', 'tractions', 'tirage_vertical', 'curl_incline', 'au_front', 'leg_curl', 'rdl', 'presse', 'mollets'];
  noms.forEach((n, i) => assert.equal(matchGroup(n, G)?.id, attendu[i], n));
});

test('chaque groupe a exactement deux lignées A/B', () => {
  for (const grp of G) {
    const opts = CR.lines.filter((l) => l.group === grp.id).map((l) => l.option).sort();
    assert.deepEqual(opts, ['A', 'B'], grp.id);
  }
});

const H = ['', 'SÉANCE 1 : Pec Bras ', '', '', '', '', '', '', 'Semaine 1', '', 'BF', '', 'Semaine 2', '', '', '', 'Semaine 3'];
const ROWS = [[], H, ['', 'Ordre', 'Exercices'],
  ['', '1', 'Chest press', '', '3110', '', '9-12', '', '10', '100', 'bien', '', '8', '100', '', '', '9', '105'],
  ['', '', '', '', '', '', '9-12', '', '9', '100', '', '', '8', '90', '', '', '8', '100'],
  ['', '', '', '', '', '', '12-15', '', '75', '9', '', '', '7', '90', '', '', '7', '95'], [],
  ['', '2', 'Tractions lestees', '', '2011', '', '6-9', '', '9', '20', '', '', '', '', '', '', '10', '20'],
  ['', '', '', '', '', '', '6-9', '', '6', '', '', '', '', '', '', '', '7', '20'], []];

test('lecture du carnet : semaines, séries, inversion reps/charge corrigée', () => {
  const { sessions, sessionKeys } = parseCarnet(ROWS, G);
  const cp = sessions.filter((s) => s.group === 'chest_press');
  assert.equal(cp.length, 3);
  assert.deepEqual(cp[0].sets[2], { reps: 9, w: 75 });
  assert.equal(cp[0].fixed.length, 1);
  assert.equal(cp[0].feedback, 'bien');
  const tr = sessions.filter((s) => s.group === 'tractions');
  assert.equal(tr.length, 2); // semaine 2 vide
  assert.deepEqual(tr[0].sets[1], { reps: 6, w: 0 }); // traction sans lest = poids de corps
  assert.equal(sessionKeys.size, 3);
});

test('analyse : record, palier, cible suivante', () => {
  const { sessions } = parseCarnet(ROWS, G);
  const a = P.analyseGroup(sessions.filter((s) => s.group === 'chest_press'), g('chest_press'), 80);
  assert.equal(a.records.length, 1);
  assert.ok(a.best > 135 && a.best < 140);
  assert.equal(a.tier, 2); // ≈ 1,71 × poids de corps ≥ 1,4
  // palier Élite = 1,8 × 80 kg = 144 kg de 1RM → 144 / (1 + 8/30) ≈ 113,7 → arrondi à 115 kg × 8
  assert.deepEqual(a.nextTarget, { kg: 115, reps: 8 });
  const t = P.analyseGroup(sessions.filter((s) => s.group === 'tractions'), g('tractions'), 80);
  // (80 + 20 kg de lest) × (1 + 10/30) ÷ 80 ≈ 1,67 → Intermédiaire
  assert.ok(t.value > 1.6 && t.value < 1.75);
  assert.equal(t.tier, 1);
  assert.equal(t.nextTarget.reps, 8);
});

test('valeurs aberrantes écartées et signalées', () => {
  const mk = (w, week) => ({ group: 'leg_extension', block: 0, week, sets: [{ reps: 10, w }] });
  const a = P.analyseGroup([mk(80, 1), mk(85, 2), mk(85, 3), mk(900, 4), mk(90, 5)], g('leg_extension'), 80);
  assert.equal(a.suspect.length, 1);
  assert.equal(a.suspect[0].week, 4);
});

test('combats : plafond de +1 niveau par jour', () => {
  let c = { xp: P.xpForLevel(10) };
  let r = P.applyCombatXp(c, 100000, '2026-11-01');
  assert.equal(P.levelFromXp(r.creature.xp), 11);
  assert.ok(r.capped);
  r = P.applyCombatXp(r.creature, 500, '2026-11-01');
  assert.equal(r.gained, 0);
  r = P.applyCombatXp(r.creature, 100000, '2026-11-02');
  assert.equal(P.levelFromXp(r.creature.xp), 12);
});

test('évolution : jamais par les combats seuls', () => {
  const line = CR.lines.find((l) => l.id === 'bisonneau');
  const ctx = { evoLevels: CR.evolution_levels, analysis: { tier: 0 }, coachOk: true };
  const strong = { stage: 1, xp: P.xpForLevel(50) };
  assert.equal(P.evolutionCheck(strong, line, ctx).ok, false); // niveau OK, palier non
  assert.equal(P.evolutionCheck(strong, line, { ...ctx, analysis: { tier: 1 }, coachOk: false }).ok, false);
  assert.equal(P.evolutionCheck(strong, line, { ...ctx, analysis: { tier: 1 } }).ok, true);
  assert.equal(P.evolutionCheck({ stage: 2, xp: P.xpForLevel(50) }, line, { ...ctx, analysis: { tier: 1 } }).ok, false);
});

test('starter et hippocampe évoluent par les activités réelles', () => {
  const st = CR.lines.find((l) => l.id === 'braisillon');
  assert.equal(P.evolutionCheck({ stage: 1, xp: 0 }, st, { activities: 29 }).ok, false);
  assert.equal(P.evolutionCheck({ stage: 1, xp: 0 }, st, { activities: 30 }).ok, true);
  const hp = CR.lines.find((l) => l.id === 'ondulin');
  assert.equal(P.evolutionCheck({ stage: 2, xp: 0 }, hp, { natation: 23 }).ok, false);
  assert.equal(P.evolutionCheck({ stage: 2, xp: 0 }, hp, { natation: 24 }).ok, true);
});

test('attaques : apprises seulement avec un parchemin, rang par usage', () => {
  const moves = P.startingMoves('Roc', MV);
  let state = { scrolls: 0, creatures: { a: { moves } } };
  const opt = P.learnable('Roc', moves, MV);
  assert.ok(opt.length > 0);
  assert.equal(P.learnMove(state, 'a', opt[0]).ok, false);
  state.scrolls = 1;
  const r = P.learnMove(state, 'a', opt[0]);
  assert.ok(r.ok);
  assert.equal(r.state.scrolls, 0);
  assert.equal(r.state.creatures.a.moves.length, moves.length + 1);
  assert.equal(P.moveRank(24, MV), 1);
  assert.equal(P.moveRank(25, MV), 2);
  assert.equal(P.moveRank(75, MV), 3);
  assert.equal(P.movePower(100, 3, MV), 130);
});

test('chaque type a ses attaques et une table cohérente', () => {
  for (const t of MV.types) {
    assert.ok(MV.moves[t]?.length >= 6, t);
    assert.equal(MV.moves[t].filter((m) => m[2] === 'base').length, 2, t);
  }
  for (const l of CR.lines) assert.ok(MV.types.includes(l.type), l.id);
});

test('dégâts : efficacité et immunité', () => {
  const a = { level: 20, atk: 30, type: 'Eau' };
  const d = { def: 25, type: 'Feu' };
  const r = P.damage(a, d, { power: 70, type: 'Eau' }, MV, () => 1);
  assert.equal(r.eff, 2);
  assert.ok(r.dmg > 0);
  assert.equal(P.damage(a, { def: 25, type: 'Air' }, { power: 70, type: 'Terre' }, MV).dmg, 0);
});

test('arène : samedi matin + Hyrox coché', () => {
  const sat = new Date(2026, 10, 7, 10, 0);
  assert.equal(P.arenaOpen(sat, []).ok, false);
  assert.equal(P.arenaOpen(sat, ['2026-11-07']).ok, true);
  assert.equal(P.arenaOpen(new Date(2026, 10, 7, 14, 0), ['2026-11-07']).ok, false);
  assert.equal(P.arenaOpen(new Date(2026, 10, 6, 10, 0), ['2026-11-06']).ok, false);
});

test('finale : badges + poids cible + aucun palier perdu', () => {
  const base = { badges: ['a', 'b', 'c', 'd', 'e', 'f'], avg7: 72, targetWeight: 72.5, tiersNow: { rdl: 2 }, tiersBest: { rdl: 2 } };
  assert.equal(P.finaleCheck(base).ok, true);
  assert.equal(P.finaleCheck({ ...base, avg7: 73 }).ok, false);
  assert.equal(P.finaleCheck({ ...base, tiersNow: { rdl: 1 } }).ok, false);
  assert.equal(P.finaleCheck({ ...base, badges: ['a'] }).ok, false);
});

test('poids : dernier relevé et moyenne 7 jours', () => {
  // valeurs fictives (dépôt public : jamais de vraies pesées ici)
  const rows = [['02/01/2026', '', '80,0'], ['09/01/2026', '', '79,5'], ['06/05/2024', '', '']];
  assert.equal(lastWeight(rows).w, 79.5);
  const avg = weightAvg7([['30/10/2026', '', '73'], ['31/10/2026', '', '72'], ['01/10/2026', '', '80']], new Date(2026, 10, 1));
  assert.equal(avg, 72.5);
});
