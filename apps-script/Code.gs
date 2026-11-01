/**
 * Pont Forgemon ↔ tableau du coach (Google Apps Script, sur TON compte Google).
 * Lecture seule : ce script n'écrit jamais dans le tableau.
 *
 * Installation (5 min, une seule fois) :
 * 1. Ouvre le tableau du coach → Extensions → Apps Script → colle ce fichier.
 * 2. Paramètres du projet → Propriétés du script → ajoute :
 *      FORGEMON_KEY = une longue phrase secrète (ex. 6 mots au hasard)
 * 3. Déployer → Nouveau déploiement → Application Web
 *      Exécuter en tant que : moi · Qui a accès : tout le monde
 * 4. Copie l'URL /exec et colle-la dans le jeu (Réglages), avec ta clé.
 *
 * Sans la bonne clé, le script ne renvoie rien. La clé n'est jamais dans le dépôt GitHub.
 */
const SUIVI = 'SUIVI (2)';
const JOURNAL = '✍️ JOURNAL DE BORD';

function doGet(e) {
  const key = PropertiesService.getScriptProperties().getProperty('FORGEMON_KEY');
  if (!key || !e || !e.parameter || e.parameter.key !== key) {
    return json_({ ok: false, error: 'cle_invalide' });
  }
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const suivi = ss.getSheetByName(SUIVI).getRange('A1:DC456').getDisplayValues();
  const journalSheet = ss.getSheetByName(JOURNAL);
  const last = journalSheet.getLastRow();
  // C = date, E = poids, Q = workout, Y = cardio (C:Y → 23 colonnes)
  const journal = journalSheet.getRange(1, 3, last, 23).getDisplayValues()
    .map(function (r) { return [r[0], r[1], r[2], r[14], r[22]]; })
    .filter(function (r) { return /^\d{2}\/\d{2}\/\d{4}$/.test(r[0]); });
  return json_({ ok: true, at: new Date().toISOString(), suivi: suivi, journal: journal });
}

function json_(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}
