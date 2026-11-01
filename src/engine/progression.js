// Règles de progression de Forgemon. Fonctions pures, testées dans tests/.
//
// Principe fondateur (non négociable, voulu par le joueur) :
//   - Les COMBATS rendent plus fort (niveau, stats), plafonnés à +1 niveau par jour et par créature.
//   - L'ÉVOLUTION ne vient QUE du réel : palier de force lu dans le carnet + niveau + validation du coach.
//   - Une NOUVELLE ATTAQUE ne s'apprend QUE si un cours a été fait (1 cours = 1 parchemin).
//   - Les attaques montent de rang en combat, à l'usage.

export const epley = (load, reps) => load * (1 + Math.min(reps, 15) / 30);

// ---------- Niveaux ----------
export const xpForLevel = (L) => Math.round(L ** 3);
export function levelFromXp(xp) {
  let L = 1;
  while (L < 100 && xp >= xpForLevel(L + 1)) L++;
  return L;
}
export const XP = { perSet: 40, perRecord: 300, perStarterActivity: 120, perNatation: 150 };
export const combatXp = (foeLevel) => Math.round(18 + foeLevel * 4);

/**
 * Applique l'XP d'un combat avec le plafond quotidien.
 * c : {xp, combatDay, combatDayStartLevel}. Retourne une copie modifiée + l'XP réellement gagnée.
 */
export function applyCombatXp(c, gained, today) {
  const n = { ...c };
  if (n.combatDay !== today) { n.combatDay = today; n.combatDayStartLevel = levelFromXp(n.xp); }
  const capXp = xpForLevel(Math.min(100, n.combatDayStartLevel + 1));
  const room = Math.max(0, capXp - n.xp);
  const real = Math.min(gained, room);
  n.xp += real;
  return { creature: n, gained: real, capped: real < gained };
}

// ---------- Analyse d'un exercice ----------
/**
 * sessions : sessions du carnet pour ce groupe ; group : entrée de exercises.json ; bw : poids de corps (kg).
 * Écarte les valeurs aberrantes (> 1,4× ou < 0,4× la médiane, à partir de 4 séances) et les signale.
 */
export function analyseGroup(sessions, group, bw) {
  const scored = sessions
    .map((s) => {
      let best = 0, vol = 0, bestReps = 0;
      for (const x of s.sets) {
        const load = x.w + (group.metric === 'ratio_bw_plus' ? bw : 0);
        vol += load * x.reps;
        best = Math.max(best, epley(load, x.reps));
        bestReps = Math.max(bestReps, x.reps);
      }
      return { ...s, best: group.metric === 'reps' ? bestReps : best, vol };
    })
    .sort((a, b) => a.week - b.week || a.block - b.block);
  let suspect = [];
  let kept = scored;
  if (scored.length >= 4) {
    const sorted = scored.map((s) => s.best).sort((a, b) => a - b);
    const med = sorted[Math.floor(sorted.length / 2)];
    suspect = scored.filter((s) => s.best > med * 1.4 || s.best < med * 0.4);
    kept = scored.filter((s) => !suspect.includes(s));
  }
  let max = 0;
  const records = [];
  kept.forEach((s, i) => { if (i > 0 && s.best > max + 0.01) records.push(s); max = Math.max(max, s.best); });
  const value = group.metric === 'reps' ? max : bw ? max / bw : 0;
  let tier = 0;
  group.tiers.forEach((t, i) => { if (value >= t) tier = i + 1; });
  const sets = kept.reduce((a, s) => a + s.sets.length, 0);
  return { group: group.id, sessions: kept, suspect, records, best: max, value, tier, sets,
    xp: sets * XP.perSet + records.length * XP.perRecord, nextTarget: nextTarget(group, tier, bw) };
}

/** Charge à viser pour 8 reps propres afin d'atteindre le palier suivant. */
export function nextTarget(group, tier, bw) {
  if (tier >= group.tiers.length) return null;
  const t = group.tiers[tier];
  if (group.metric === 'reps') return { reps: t };
  if (!bw) return null;
  let load = (t * bw) / (1 + 8 / 30);
  if (group.metric === 'ratio_bw_plus') load -= bw;
  return { kg: Math.max(0, Math.ceil(load / 2.5) * 2.5), reps: 8 };
}

// ---------- Évolution ----------
export const TIER_NAMES = ['Débutant', 'Intermédiaire', 'Avancé', 'Élite'];

/**
 * Peut-elle évoluer ? Retourne {ok, needs:[…]} — needs liste ce qui manque, en clair.
 * creature: {stage, xp}, line: entrée creatures.json, ctx: {analysis, activities, natation, coachOk, evoLevels}
 */
export function evolutionCheck(creature, line, ctx) {
  const stage = creature.stage;
  if (stage >= line.stages.length) return { ok: false, needs: ['Stade final atteint.'] };
  const target = stage + 1;
  const needs = [];
  if (line.special === 'starter' || line.special === 'hippocampe') {
    const ev = line.evolution;
    const count = line.special === 'starter' ? ctx.activities ?? 0 : ctx.natation ?? 0;
    const req = ev[`stage${target}`];
    if (count < req) needs.push(`${req - count} ${line.special === 'starter' ? 'activité(s) réelle(s)' : 'séance(s) de natation'} de plus (${count}/${req}).`);
    return { ok: needs.length === 0, needs };
  }
  const L = levelFromXp(creature.xp);
  const reqL = ctx.evoLevels[`stage${target}`];
  if (L < reqL) needs.push(`Niveau ${reqL} (actuel ${L}).`);
  const tierReq = target - 1; // stade 2 → Intermédiaire, stade 3 → Avancé
  const tier = ctx.analysis?.tier ?? 0;
  if (tier < tierReq) needs.push(`Palier ${TIER_NAMES[tierReq]} au carnet (actuel ${TIER_NAMES[tier]}).`);
  if (!ctx.coachOk) needs.push('Feu vert du coach sur l’exécution.');
  return { ok: needs.length === 0, needs };
}

// ---------- Attaques ----------
/** Attaques de départ : les 2 'base' du type + Charge. */
export function startingMoves(type, movesData) {
  const own = movesData.moves[type].filter((m) => m[2] === 'base').map((m) => m[0]);
  return [...new Set([...own, 'Charge'])].slice(0, 3).map((name) => ({ name, uses: 0 }));
}
/** Attaques apprenables avec un parchemin (type + Normal, pas encore connues), dans l'ordre. */
export function learnable(type, known, movesData) {
  const k = new Set(known.map((m) => m.name));
  return [...movesData.moves[type], ...movesData.moves.Normal].filter((m) => m[2] !== 'base' && !k.has(m[0])).map((m) => m[0]);
}
/** Apprend une attaque : nécessite un parchemin (= un cours fait). Max 4 attaques ; 'replace' si plein. */
export function learnMove(state, creatureId, moveName, replace = null) {
  if ((state.scrolls ?? 0) < 1) return { ok: false, reason: 'Aucun parchemin : fais un cours pour en gagner un.' };
  const c = state.creatures[creatureId];
  let moves = [...c.moves];
  if (moves.some((m) => m.name === moveName)) return { ok: false, reason: 'Attaque déjà connue.' };
  if (moves.length >= 4) {
    if (!replace) return { ok: false, reason: 'Déjà 4 attaques : choisis-en une à oublier.' };
    moves = moves.filter((m) => m.name !== replace);
  }
  moves.push({ name: moveName, uses: 0 });
  return { ok: true, state: { ...state, scrolls: state.scrolls - 1, creatures: { ...state.creatures, [creatureId]: { ...c, moves } } } };
}
export const moveRank = (uses, movesData) => (uses >= movesData.rank_uses[2] ? 3 : uses >= movesData.rank_uses[1] ? 2 : 1);
export const movePower = (base, rank, movesData) => Math.round(base * (1 + (rank - 1) * movesData.rank_power_bonus));

// ---------- Stats & dégâts ----------
export function stats(level, tier, stage) {
  const m = [1, 1, 1.15, 1.35][stage] ?? 1;
  return {
    hp: Math.floor((22 + level * 2.1 + tier * 8) * m),
    atk: Math.floor((9 + level * 0.9 + tier * 5) * m),
    def: Math.floor((9 + level * 0.85 + tier * 5) * m),
    spd: Math.floor((8 + level * 0.8 + tier * 3) * m),
  };
}
export function effectiveness(moveType, defType, movesData) {
  return movesData.chart[moveType]?.[defType] ?? 1;
}
export function damage({ level, atk, type: atkType }, { def, type: defType }, { power, type: moveType }, movesData, rand = Math.random) {
  if (!power) return { dmg: 0, eff: 1 };
  const eff = effectiveness(moveType, defType, movesData);
  const stab = moveType === atkType ? 1.25 : 1;
  const base = (((2 * level) / 5 + 2) * power * (atk / def)) / 50 + 2;
  return { dmg: eff === 0 ? 0 : Math.max(1, Math.floor(base * eff * stab * (0.85 + rand() * 0.15))), eff };
}

// ---------- Arènes & finale ----------
/** L'arène est ouverte le samedi avant 13 h si l'Hyrox du jour est coché. */
export function arenaOpen(now, hyroxDays) {
  const iso = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  if (now.getDay() !== 6) return { ok: false, reason: 'L’arène n’ouvre que le samedi matin.' };
  if (now.getHours() >= 13) return { ok: false, reason: 'L’arène a fermé à 13 h. Rendez-vous samedi prochain.' };
  if (!hyroxDays.includes(iso)) return { ok: false, reason: 'Hyrox d’abord : coche-le, puis reviens.' };
  return { ok: true };
}
/** Finale : 6 badges + poids cible atteint (moyenne 7 j) + aucun palier perdu. */
export function finaleCheck({ badges, avg7, targetWeight, tiersNow, tiersBest }) {
  const needs = [];
  if (badges.length < 6) needs.push(`${6 - badges.length} badge(s) manquant(s).`);
  if (!targetWeight) needs.push('Renseigne ton poids cible.');
  else if (avg7 == null) needs.push('Pèse-toi : aucune pesée sur les 7 derniers jours.');
  else if (avg7 > targetWeight) needs.push(`Moyenne 7 j : ${avg7.toFixed(1).replace('.', ',')} kg pour une cible de ${String(targetWeight).replace('.', ',')} kg.`);
  const lost = Object.keys(tiersBest).filter((g) => (tiersNow[g] ?? 0) < tiersBest[g]);
  if (lost.length) needs.push(`Palier de force perdu sur : ${lost.join(', ')}.`);
  return { ok: needs.length === 0, needs };
}

// ---------- Pièces ----------
export function coinsFromCarnet(analyses) {
  return analyses.reduce((c, a) => c + a.sets * 2 + a.records.length * 25, 0);
}
