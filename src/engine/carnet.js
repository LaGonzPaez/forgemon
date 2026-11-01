// Lecture du carnet du coach (onglet « SUIVI (2) ») et du journal (poids).
// Fonctions pures : aucun accès réseau ici, on reçoit les valeurs brutes (tableau de lignes).

export const normalize = (s) =>
  String(s ?? '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/\s+/g, ' ').trim();

/** "12,5" → 12.5 ; vide ou texte → null */
export const num = (v) => {
  if (v == null || v === '') return null;
  const n = parseFloat(String(v).replace(/\s/g, '').replace(',', '.'));
  return Number.isFinite(n) ? n : null;
};

/** Trouve le groupe d'exercice d'un nom du carnet (premier groupe qui correspond). */
export function matchGroup(name, groups) {
  const n = normalize(name);
  return groups.find((g) => g.match.some((m) => n.includes(m))) ?? null;
}

/**
 * rows : valeurs de 'SUIVI (2)'!A1:DC456 (colonne A = index 0).
 * Structure du carnet : titre du bloc en B (« SÉANCE 1 : … », « Legs 2 … ») avec « Semaine N » sur la même ligne ;
 * chaque exercice : numéro d'ordre en B, nom en C, ses séries sur cette ligne et les suivantes ;
 * pour une semaine en colonne c : reps = c, charge = c+1, feedback = c+2.
 * Retourne { sessions: [{group, exo, block, week, sets:[{reps,w}], feedback, fixed:[…]}], sessionKeys:Set }
 */
export function parseCarnet(rows, groups) {
  const sessions = [];
  const sessionKeys = new Set();
  let weekCols = [];
  let block = -1;
  for (let r = 0; r < rows.length; r++) {
    const row = rows[r] || [];
    const b = String(row[1] ?? '').trim();
    if (/s[ée]ance|legs/i.test(b) && !/^\d+$/.test(b)) {
      weekCols = [];
      row.forEach((v, c) => {
        const m = String(v ?? '').match(/semaine\s*(\d+)/i);
        if (m) weekCols.push({ c, week: +m[1] });
      });
      if (weekCols.length) block++;
      continue;
    }
    if (!/^\d+$/.test(b) || !String(row[2] ?? '').trim() || !weekCols.length) continue;
    const name = String(row[2]).trim();
    const group = matchGroup(name, groups);
    // séries : cette ligne + suivantes tant qu'il y a une « reps range » (col G) et pas de nouvel exercice
    const setRows = [row];
    for (let k = r + 1; k < rows.length && k < r + 6; k++) {
      const rr = rows[k] || [];
      if (/^\d+$/.test(String(rr[1] ?? '').trim()) || !String(rr[6] ?? '').trim()) break;
      setRows.push(rr);
    }
    for (const { c, week } of weekCols) {
      const sets = [];
      const feedback = [];
      const fixed = [];
      for (const rr of setRows) {
        let reps = num(rr[c]);
        let w = num(rr[c + 1]);
        const f = String(rr[c + 2] ?? '').trim();
        if (f) feedback.push(f);
        if (reps == null) continue;
        sessionKeys.add(`${block}-${week}`);
        if (w == null) {
          if (group?.metric === 'ratio_bw_plus' || group?.metric === 'reps') w = 0;
          else continue;
        }
        // reps et charge inversées par erreur (ex. « 75 | 9 »)
        if (reps > 30 && w <= 30) { fixed.push({ reps, w }); [reps, w] = [w, reps]; }
        if (reps < 1 || reps > 30 || w < 0) continue;
        sets.push({ reps, w });
      }
      if (group && sets.length) sessions.push({ group: group.id, exo: name, block, week, sets, feedback: feedback.join(' · '), fixed });
    }
  }
  return { sessions, sessionKeys };
}

/** rows : valeurs de '✍️ JOURNAL DE BORD'!C:E → dernier poids saisi {date, w} */
export function lastWeight(rows) {
  let best = null;
  for (const r of rows || []) {
    const d = String(r?.[0] ?? '').match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
    const w = num(r?.[2]);
    if (!d || !w || w < 35 || w > 250) continue;
    const t = Date.UTC(+d[3], +d[2] - 1, +d[1]);
    if (!best || t > best.t) best = { t, w, date: r[0] };
  }
  return best;
}

/** Moyenne des poids des 7 derniers jours saisis (pour la finale). */
export function weightAvg7(rows, today = new Date()) {
  const end = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
  const vals = [];
  for (const r of rows || []) {
    const d = String(r?.[0] ?? '').match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
    const w = num(r?.[2]);
    if (!d || !w || w < 35 || w > 250) continue;
    const t = Date.UTC(+d[3], +d[2] - 1, +d[1]);
    if (t <= end && t > end - 7 * 864e5) vals.push(w);
  }
  return vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : null;
}
