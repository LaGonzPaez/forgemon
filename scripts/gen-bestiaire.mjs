// Génère docs/BESTIAIRE.md et docs/bestiaire.html depuis data/*.json.
import { readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { creatureSVG, ART } = require('../tools/legacy-art.cjs');

const root = new URL('../', import.meta.url);
const CR = JSON.parse(readFileSync(new URL('data/creatures.json', root)));
const EX = JSON.parse(readFileSync(new URL('data/exercises.json', root)));
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const zoneOf = (l) => l.special === 'starter' ? 'speciales' : l.special === 'hippocampe' ? 'speciales' : l.special === 'legendaire' ? 'speciales'
  : EX.groups.find((g) => g.id === l.group).zone;
const groupLabel = (l) => l.special === 'starter' ? 'Toutes tes activités réelles' : l.special === 'hippocampe' ? 'Natation / plongée'
  : l.special === 'legendaire' ? 'Finale : poids cible + 6 badges' : EX.groups.find((g) => g.id === l.group).label;
const ZONES = [{ id: 'speciales', name: 'Spéciales' }, ...EX.zones.filter((z) => z.id !== 'lagon')];

// ---------- Markdown ----------
let md = `# Bestiaire Forgemon\n\nGénéré par \`npm run data\`. ${CR.lines.length} lignées, ${CR.lines.reduce((n, l) => n + l.stages.length, 0)} créatures, toutes originales.\n`;
for (const z of ZONES) {
  md += `\n## ${z.name}\n\n| Exercice | Opt. | Type | Stade 1 | Stade 2 | Stade 3 |\n|---|---|---|---|---|---|\n`;
  for (const l of CR.lines.filter((x) => zoneOf(x) === z.id)) {
    md += `| ${groupLabel(l)} | ${l.option} | ${l.type} | ${l.stages.map((s) => s.name).join(' | ')}${' | —'.repeat(3 - l.stages.length)} |\n`;
  }
}
writeFileSync(new URL('docs/BESTIAIRE.md', root), md);

// ---------- HTML ----------
const egg = (pal, stage) => {
  const s = [0.62, 0.8, 1][stage - 1];
  return `<svg viewBox="0 0 200 200" role="img" aria-label="Sprite à venir"><g transform="translate(100 112) scale(${s}) translate(-100 -112)">
  <ellipse cx="100" cy="186" rx="50" ry="8" fill="#000" opacity=".18"/>
  <path d="M100 30 C150 30 168 110 160 140 C152 172 128 184 100 184 C72 184 48 172 40 140 C32 110 50 30 100 30Z" fill="${pal[1]}" stroke="${pal[0]}" stroke-width="5"/>
  <circle cx="78" cy="88" r="13" fill="${pal[2]}"/><circle cx="124" cy="120" r="17" fill="${pal[2]}"/><circle cx="86" cy="146" r="9" fill="${pal[3]}"/>
  <path d="M60 112 l14 -10 l12 12 l14 -12 l14 12 l12 -12 l14 10" stroke="${pal[0]}" stroke-width="4" fill="none" opacity=".55"/></g></svg>`;
};
const TYPE_COL = { Feu: '#E8590C', Eau: '#1C7ED6', Plante: '#2F9E44', Air: '#4DABF7', Roc: '#8D7B68', Terre: '#B08850', Acier: '#868E96',
  Choc: '#C92A2A', Ombre: '#5F3DC4', Insecte: '#74B816', Glace: '#3BC9DB', Poison: '#9C36B5', Normal: '#ADB5BD' };

const card = (l) => {
  const drawn = !!ART[l.id];
  const stages = l.stages.map((s) => `
    <figure class="st">
      <div class="art${drawn ? '' : ' todo'}">${drawn ? creatureSVG(l.id, s.stage, s.name) : egg(l.palette, s.stage)}</div>
      <figcaption><b>${esc(s.name)}</b><span class="no">${l.stages.length > 1 ? 'Stade ' + s.stage : 'Unique'}</span></figcaption>
      <p class="dex">${esc(s.dex)}</p>
      <details><summary>Brief d'art</summary><p>${esc(s.brief)}</p></details>
    </figure>`).join('<div class="arrow" aria-hidden="true">›</div>');
  return `<article class="line" data-zone="${zoneOf(l)}">
    <header><div><h3>${esc(l.stages.map((s) => s.name).filter((v, i, a) => a.indexOf(v) === i).join(' → '))}</h3>
      <p class="ex">${esc(groupLabel(l))}${l.option !== '-' ? ` · option ${l.option}` : ''}</p></div>
      <span class="type" style="--tc:${TYPE_COL[l.type]}">${l.type}</span></header>
    <div class="stages">${stages}</div>
    <div class="pal" aria-label="Palette">${l.palette.map((c) => `<i style="background:${c}"></i>`).join('')}${drawn ? '<span>dessin v1</span>' : '<span>sprite au lot 2</span>'}</div>
  </article>`;
};

const nbLines = CR.lines.length, nbCr = CR.lines.reduce((n, l) => n + l.stages.length, 0);
const html = `<title>Bestiaire Forgemon</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Silkscreen&family=Barlow:wght@400;600;700&display=swap">
<style>
/* Catalogue : en-tête, onglets de zone, cartes de lignée (3 stades côte à côte, empilés sur téléphone). */
:root{
  --bg:#F3EFE4;--surface:#FFFDF7;--ink:#1D1B22;--muted:#6A6574;--line:#DDD5C3;--accent:#C2410C;--chip:#EBE4D3;
  --f-pix:"Silkscreen","Courier New",monospace;--f-body:"Barlow","Helvetica Neue",Arial,sans-serif;
}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]){--bg:#15161F;--surface:#1E2030;--ink:#ECEAF2;--muted:#A3A0B3;--line:#30334A;--accent:#F97316;--chip:#2A2D42;color-scheme:dark}}
:root[data-theme="dark"]{--bg:#15161F;--surface:#1E2030;--ink:#ECEAF2;--muted:#A3A0B3;--line:#30334A;--accent:#F97316;--chip:#2A2D42;color-scheme:dark}
*{box-sizing:border-box}
body{background:var(--bg);color:var(--ink);font:16px/1.45 var(--f-body)}
.wrap{max-width:1080px;margin:0 auto;padding-inline:16px;padding-block:24px 64px;display:flex;flex-direction:column;gap:20px}
h1{font:400 clamp(28px,6vw,44px)/1 var(--f-pix);margin:0;letter-spacing:.02em;text-wrap:balance}
.lead{max-width:62ch;color:var(--muted);margin:6px 0 0}
.stats{display:flex;gap:18px;flex-wrap:wrap;font:400 13px var(--f-pix);color:var(--accent)}
nav{display:flex;gap:6px;flex-wrap:wrap;position:sticky;top:env(safe-area-inset-top,0px);background:var(--bg);padding-block:8px;z-index:2}
nav button{font:600 14px var(--f-body);border:1px solid var(--line);background:var(--surface);color:var(--ink);border-radius:999px;padding:7px 14px;cursor:pointer}
nav button[aria-pressed="true"]{background:var(--ink);color:var(--bg);border-color:var(--ink)}
.grid{display:flex;flex-direction:column;gap:14px}
.line{background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:14px;display:flex;flex-direction:column;gap:10px}
.line header{display:flex;justify-content:space-between;gap:12px;align-items:flex-start}
.line header>div{min-width:0}
h3{font:700 18px var(--f-body);margin:0;text-wrap:balance}
.ex{margin:2px 0 0;color:var(--muted);font-size:14px}
.type{font:400 11px var(--f-pix);color:#fff;background:var(--tc);border-radius:6px;padding:5px 8px;white-space:nowrap}
.stages{display:grid;grid-template-columns:1fr auto 1fr auto 1fr;gap:8px;align-items:start}
.arrow{align-self:center;font:400 22px var(--f-pix);color:var(--muted);padding-top:20px}
.st{margin:0;min-width:0;display:flex;flex-direction:column;gap:4px}
.art{aspect-ratio:1;background:radial-gradient(circle at 50% 60%,var(--surface),var(--chip));border-radius:10px;display:grid;place-items:center;overflow:hidden}
.art svg{width:86%;height:86%}
.art.todo{opacity:.92}
figcaption{display:flex;justify-content:space-between;gap:6px;align-items:baseline}
figcaption b{font:700 15px var(--f-body)}
.no{font:400 10px var(--f-pix);color:var(--muted)}
.dex{margin:0;font-size:14px;color:var(--ink)}
details{font-size:13px;color:var(--muted)}
details summary{cursor:pointer;font-weight:600}
details p{margin:4px 0 0}
.pal{display:flex;gap:4px;align-items:center}
.pal i{width:18px;height:10px;border-radius:2px;border:1px solid var(--line)}
.pal span{margin-left:6px;font:400 10px var(--f-pix);color:var(--muted)}
.single .stages{grid-template-columns:minmax(0,320px)}
button:focus-visible,summary:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
@media (max-width:640px){.stages{grid-template-columns:1fr}.arrow{transform:rotate(90deg);padding:0;justify-self:center}}
</style>
<div class="wrap">
  <header>
    <h1>BESTIAIRE FORGEMON</h1>
    <p class="lead">Une lignée par exercice du carnet, deux options par exercice : tu choisis en les croisant dans les herbes. Elles prennent de la force en combat, mais n'évoluent qu'avec tes vrais paliers et le feu vert du coach.</p>
  </header>
  <div class="stats"><span>${nbLines} LIGNÉES</span><span>${nbCr} CRÉATURES</span><span>${EX.groups.length} EXERCICES</span><span>13 TYPES</span></div>
  <nav aria-label="Zones">${[{ id: 'all', name: 'Tout' }, ...ZONES].map((z, i) => `<button type="button" data-z="${z.id}" aria-pressed="${i === 0}">${z.name}</button>`).join('')}</nav>
  <div class="grid">${CR.lines.map((l) => card(l).replace('<article class="line"', `<article class="line${l.stages.length === 1 ? ' single' : ''}"`)).join('')}</div>
</div>
<script>
const btns=[...document.querySelectorAll('nav button')],cards=[...document.querySelectorAll('.line')];
function show(z){btns.forEach(b=>b.setAttribute('aria-pressed',b.dataset.z===z));cards.forEach(c=>c.hidden=z!=='all'&&c.dataset.zone!==z);try{localStorage.setItem('zone',z)}catch(e){}}
btns.forEach(b=>b.onclick=()=>show(b.dataset.z));
try{const z=localStorage.getItem('zone');if(z&&btns.some(b=>b.dataset.z===z))show(z)}catch(e){}
</script>
`;
writeFileSync(new URL('docs/bestiaire.html', root), html);
console.log('docs/BESTIAIRE.md + docs/bestiaire.html générés', nbLines, nbCr);
