// Dessins vectoriels originaux de la v1 (6 lignées). Référence de style pour le pixel art du lot 2.
/* =================== ART DES CRÉATURES (vectoriel) =================== */
let gid=0;
const rg=(id,a,b)=>`<radialGradient id="${id}" cx="38%" cy="30%" r="78%"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></radialGradient>`;
function eye(cx,cy,r,s,iris,side){
  if(s===1)return `<ellipse cx="${cx}" cy="${cy}" rx="${r}" ry="${r*1.18}" fill="#1B1B22"/><circle cx="${cx-r*.3}" cy="${cy-r*.42}" r="${r*.36}" fill="#fff"/><circle cx="${cx+r*.3}" cy="${cy+r*.35}" r="${r*.16}" fill="#fff" opacity=".7"/>`;
  if(s===2)return `<ellipse cx="${cx}" cy="${cy}" rx="${r}" ry="${r*1.05}" fill="#fff" stroke="#1B1B22" stroke-width="1.2"/><circle cx="${cx+side*r*.15}" cy="${cy+r*.1}" r="${r*.62}" fill="${iris}"/><circle cx="${cx+side*r*.15}" cy="${cy+r*.1}" r="${r*.32}" fill="#111"/><circle cx="${cx-r*.15}" cy="${cy-r*.25}" r="${r*.2}" fill="#fff"/>`;
  return `<path d="M${cx-r} ${cy} Q${cx} ${cy-r*1.15} ${cx+r} ${cy} Q${cx} ${cy+r*.75} ${cx-r} ${cy}Z" fill="#fff" stroke="#1B1B22" stroke-width="1.2"/><circle cx="${cx+side*r*.12}" cy="${cy}" r="${r*.48}" fill="${iris}"/><circle cx="${cx+side*r*.12}" cy="${cy}" r="${r*.22}" fill="#111"/><path d="M${cx-side*r*1.2} ${cy-r*1.25} L${cx+side*r*.9} ${cy-r*.6}" stroke="#1B1B22" stroke-width="${r*.42}" stroke-linecap="round"/>`;
}
const ART={
  braisillon(s,u){
    const d=rg('b'+u,'#4a4a56','#1f1f26')+rg('g'+u,'#FFE08A','#FF7A1A');
    let a='';
    if(s===1){
      a+=`<path d="M70 132 Q46 150 52 168 Q62 156 76 150Z" fill="#2B2B33"/>`;
      a+=`<path d="M64 112 L46 96 L54 120Z M136 112 L154 96 L146 120Z" fill="#7A2E1D" stroke="#1f1f26" stroke-width="2"/>`;
      a+=`<ellipse cx="100" cy="134" rx="44" ry="42" fill="url(#b${u})"/>`;
      a+=`<ellipse cx="100" cy="148" rx="26" ry="20" fill="#55555f"/>`;
      a+=`<path d="M82 146 h36 M84 154 h32" stroke="#6a6a75" stroke-width="2"/>`;
      a+=`<path d="M74 92 L126 92 L120 104 L80 104Z" fill="#6E6E7A" stroke="#1f1f26" stroke-width="2"/><circle cx="100" cy="97" r="4" fill="url(#g${u})"/>`;
      a+=`<path d="M66 128 l8 6 l-3 8 M134 128 l-8 6 l3 8" stroke="url(#g${u})" stroke-width="2.5" fill="none" stroke-linecap="round"/>`;
      a+=eye(86,122,8,1)+eye(114,122,8,1);
      a+=`<path d="M93 138 Q100 143 107 138" stroke="#111" stroke-width="2" fill="none"/>`;
      a+=`<ellipse cx="80" cy="174" rx="12" ry="7" fill="#1f1f26"/><ellipse cx="120" cy="174" rx="12" ry="7" fill="#1f1f26"/>`;
    }else if(s===2){
      a+=`<path d="M76 150 Q30 150 26 120 Q22 108 34 104 Q34 128 74 136Z" fill="#2B2B33"/><path d="M26 104 l-8 -6 l12 0Z" fill="#8a96a8"/>`;
      a+=`<path d="M78 118 L28 70 L40 104 L18 110 L50 124 L40 140Z" fill="#7A2E1D" stroke="#1f1f26" stroke-width="2.5"/>`;
      a+=`<path d="M122 118 L172 70 L160 104 L182 110 L150 124 L160 140Z" fill="#7A2E1D" stroke="#1f1f26" stroke-width="2.5"/>`;
      a+=`<ellipse cx="100" cy="146" rx="38" ry="34" fill="url(#b${u})"/>`;
      a+=`<ellipse cx="100" cy="152" rx="22" ry="22" fill="#55555f"/><path d="M84 140 h32 M84 150 h32 M86 160 h28" stroke="url(#g${u})" stroke-width="2.5"/>`;
      a+=`<rect x="90" y="104" width="20" height="20" fill="#2B2B33"/>`;
      a+=`<path d="M76 86 L66 62 L84 78Z M124 86 L134 62 L116 78Z" fill="#8a96a8" stroke="#1f1f26" stroke-width="2"/>`;
      a+=`<ellipse cx="100" cy="96" rx="30" ry="25" fill="url(#b${u})"/>`;
      a+=`<path d="M78 76 L122 76 L116 86 L84 86Z" fill="#6E6E7A" stroke="#1f1f26" stroke-width="2"/>`;
      a+=`<path d="M72 100 l10 4 M128 100 l-10 4 M94 114 l6 -4 l6 4" stroke="url(#g${u})" stroke-width="2.5" fill="none"/>`;
      a+=eye(88,96,7,2,'#FF8C1A',1)+eye(112,96,7,2,'#FF8C1A',-1);
      a+=`<path d="M92 108 Q100 112 108 108" stroke="#111" stroke-width="2" fill="none"/>`;
      a+=`<path d="M78 176 l-6 6 M84 176 l0 7 M122 176 l0 7 M128 176 l6 6" stroke="#ddd" stroke-width="2.5"/><ellipse cx="82" cy="174" rx="14" ry="8" fill="#1f1f26"/><ellipse cx="118" cy="174" rx="14" ry="8" fill="#1f1f26"/>`;
    }else{
      a+=`<circle cx="100" cy="110" r="88" fill="#FF7A1A" opacity=".12"/>`;
      a+=`<path d="M70 156 Q18 168 12 128 Q10 112 24 104 Q22 140 70 140Z" fill="#2B2B33"/><path d="M24 104 l-10 -10 l18 2Z M12 128 l-10 0 l8 -8Z" fill="#8a96a8"/>`;
      a+=`<path d="M80 108 L14 24 L28 78 L2 70 L30 100 L6 112 L48 122 L36 146Z" fill="#7A2E1D" stroke="#1f1f26" stroke-width="3"/><path d="M80 108 L14 24 M60 110 L28 78 M52 116 L30 100" stroke="#3a1a12" stroke-width="2.5"/>`;
      a+=`<path d="M120 108 L186 24 L172 78 L198 70 L170 100 L194 112 L152 122 L164 146Z" fill="#7A2E1D" stroke="#1f1f26" stroke-width="3"/><path d="M120 108 L186 24 M140 110 L172 78 M148 116 L170 100" stroke="#3a1a12" stroke-width="2.5"/>`;
      a+=`<ellipse cx="100" cy="142" rx="48" ry="42" fill="url(#b${u})"/>`;
      a+=`<rect x="80" y="122" width="40" height="38" rx="6" fill="#3a3a44" stroke="#8a96a8" stroke-width="3"/><rect x="84" y="126" width="32" height="30" rx="4" fill="url(#g${u})"/><path d="M92 126 v30 M100 126 v30 M108 126 v30" stroke="#3a3a44" stroke-width="3"/>`;
      a+=`<path d="M58 132 l12 8 l-4 10 M142 132 l-12 8 l4 10" stroke="url(#g${u})" stroke-width="3" fill="none"/>`;
      a+=`<rect x="88" y="86" width="24" height="26" fill="#2B2B33"/>`;
      a+=`<path d="M78 66 L54 36 L84 56Z M122 66 L146 36 L116 56Z M86 60 L80 40 L94 54Z M114 60 L120 40 L106 54Z" fill="#8a96a8" stroke="#1f1f26" stroke-width="2"/>`;
      a+=`<ellipse cx="100" cy="76" rx="28" ry="22" fill="url(#b${u})"/><ellipse cx="100" cy="88" rx="16" ry="10" fill="#3a3a44"/>`;
      a+=`<path d="M78 58 L122 58 L116 66 L84 66Z" fill="#6E6E7A" stroke="#1f1f26" stroke-width="2"/>`;
      a+=eye(88,74,7,3,'#FFB21A',1)+eye(112,74,7,3,'#FFB21A',-1);
      a+=`<circle cx="94" cy="88" r="2" fill="#FF7A1A"/><circle cx="106" cy="88" r="2" fill="#FF7A1A"/><path d="M90 94 l4 4 l4 -3 l4 3 l4 -3 l4 3" stroke="#eee" stroke-width="1.5" fill="none"/>`;
      a+=`<path d="M70 180 l-8 6 M78 182 l-2 8 M122 182 l2 8 M130 180 l8 6" stroke="#ddd" stroke-width="3"/><ellipse cx="78" cy="178" rx="18" ry="9" fill="#1f1f26"/><ellipse cx="122" cy="178" rx="18" ry="9" fill="#1f1f26"/>`;
    }
    return [d,a];
  },
  papilune(s,u){
    const W=[0,54,76,94][s],cy=[0,122,114,104][s];
    const d=rg('b'+u,'#3E6BB5','#1A2F5C')+`<linearGradient id="g${u}" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#9FF3FF"/><stop offset="1" stop-color="#46C6E0"/></linearGradient>`;
    let a='';
    if(s>=2)a+=`<path d="M100 ${cy+36} Q106 ${cy+58} 96 ${cy+76}" stroke="#16294F" stroke-width="${s===3?5:4}" fill="none" stroke-linecap="round"/>`;
    if(s===3)a+=`<path d="M96 ${cy+76} l-6 8 l10 -2Z" fill="url(#g${u})"/>`;
    a+=`<path d="M100 ${cy-38} C${100+W*.45} ${cy-36} ${100+W} ${cy-14} ${100+W} ${cy+4} C${100+W*.6} ${cy+10} 118 ${cy+24} 100 ${cy+40} C82 ${cy+24} ${100-W*.6} ${cy+10} ${100-W} ${cy+4} C${100-W} ${cy-14} ${100-W*.45} ${cy-36} 100 ${cy-38}Z" fill="url(#b${u})" stroke="#132447" stroke-width="2"/>`;
    a+=`<ellipse cx="100" cy="${cy+8}" rx="${W*.32}" ry="${s===1?20:24}" fill="#D6ECF8" opacity=".92"/>`;
    if(s>=2){a+=`<path d="M86 ${cy-34} q-14 -4 -12 -20 q8 6 16 14Z M114 ${cy-34} q14 -4 12 -20 q-8 6 -16 14Z" fill="#2A4D8F" stroke="#132447" stroke-width="1.5"/>`;
      a+=`<circle cx="${100-W*.6}" cy="${cy-2}" r="4" fill="url(#g${u})"/><circle cx="${100+W*.6}" cy="${cy-2}" r="4" fill="url(#g${u})"/><circle cx="${100-W*.4}" cy="${cy-14}" r="3" fill="url(#g${u})"/><circle cx="${100+W*.4}" cy="${cy-14}" r="3" fill="url(#g${u})"/>`}
    if(s===3)a+=`<path d="M${100-W*.9} ${cy+2} Q${100-W*.45} ${cy-22} 100 ${cy-26} Q${100+W*.45} ${cy-22} ${100+W*.9} ${cy+2}" stroke="url(#g${u})" stroke-width="2.5" fill="none"/>`;
    a+=eye(86,cy-14,s===1?7:6,s,'#46C6E0',1)+eye(114,cy-14,s===1?7:6,s,'#46C6E0',-1);
    a+=`<path d="M94 ${cy+2} Q100 ${cy+7} 106 ${cy+2}" stroke="#132447" stroke-width="2" fill="none"/>`;
    return [d,a];
  },
  bisonneau(s,u){
    const k=[0,.82,1,1.12][s];const X=v=>100+v*k;
    const d=rg('b'+u,'#8B5A2E','#4A2C14')+rg('m'+u,'#4A3020','#24160C');
    let a='';
    a+=`<rect x="${X(-44)}" y="146" width="${14*k}" height="34" rx="5" fill="#3B2414"/><rect x="${X(30)}" y="146" width="${14*k}" height="34" rx="5" fill="#3B2414"/>`;
    a+=`<ellipse cx="100" cy="142" rx="${58*k}" ry="${36*k}" fill="url(#b${u})"/>`;
    a+=`<rect x="${X(-24)}" y="156" width="${15*k}" height="28" rx="5" fill="#4A2C14"/><rect x="${X(10)}" y="156" width="${15*k}" height="28" rx="5" fill="#4A2C14"/>`;
    a+=`<rect x="${X(-24)}" y="178" width="${15*k}" height="7" rx="2" fill="#1a1a1a"/><rect x="${X(10)}" y="178" width="${15*k}" height="7" rx="2" fill="#1a1a1a"/>`;
    if(s>=2)a+=`<ellipse cx="100" cy="${118-(s-2)*6}" rx="${52*k}" ry="${34*k}" fill="url(#m${u})"/>`;
    if(s===3)a+=`<path d="M${X(-30)} ${92} l10 -16 l12 12Z M${X(-4)} 86 l8 -18 l10 16Z M${X(20)} 92 l12 -14 l8 16Z" fill="#8C8F99" stroke="#4d4f57" stroke-width="2"/>`;
    const hy=s===1?122:126;
    if(s===1)a+=`<circle cx="100" cy="${hy-30}" r="10" fill="url(#m${u})"/>`;
    if(s===1)a+=`<path d="M${X(-22)} ${hy-18} l-8 -10 l12 4Z M${X(22)} ${hy-18} l8 -10 l-12 4Z" fill="#EDE3CF"/>`;
    else a+=`<path d="M${X(-22)} ${hy-14} Q${X(-50)} ${hy-14} ${X(-48)} ${hy-(s===3?46:34)}" stroke="#EDE3CF" stroke-width="${s===3?10:7}" fill="none" stroke-linecap="round"/><path d="M${X(22)} ${hy-14} Q${X(50)} ${hy-14} ${X(48)} ${hy-(s===3?46:34)}" stroke="#EDE3CF" stroke-width="${s===3?10:7}" fill="none" stroke-linecap="round"/>`;
    a+=`<ellipse cx="100" cy="${hy}" rx="${30*k}" ry="${28*k}" fill="url(#b${u})"/>`;
    a+=`<ellipse cx="100" cy="${hy+16*k}" rx="${18*k}" ry="${12*k}" fill="#C9A27E"/><ellipse cx="${X(-6)}" cy="${hy+16*k}" rx="3" ry="4" fill="#3B2414"/><ellipse cx="${X(6)}" cy="${hy+16*k}" rx="3" ry="4" fill="#3B2414"/>`;
    if(s===3)a+=`<path d="M${X(-12)} ${hy+26} L100 ${hy+48} L${X(12)} ${hy+26}Z" fill="#24160C"/>`;
    a+=eye(X(-13),hy-6,s===1?6.5:5.5,s,'#F2B544',1)+eye(X(13),hy-6,s===1?6.5:5.5,s,'#F2B544',-1);
    return [d,a];
  },
  pincelet(s,u){
    const k=[0,.85,1,1.1][s];const X=v=>100+v*k;
    const steel=s>=2;const pr=[0,15,21,30][s];const py=[0,116,104,86][s];
    const d=rg('b'+u,'#E07A55','#8A3420')+rg('m'+u,'#D8E0EA','#6C7888');
    let a='';
    for(let i=0;i<3;i++){a+=`<path d="M${X(-34)} ${140+i*8} L${X(-58-i*4)} ${158+i*8} L${X(-62-i*4)} ${176}" stroke="#7A2E1D" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M${X(34)} ${140+i*8} L${X(58+i*4)} ${158+i*8} L${X(62+i*4)} 176" stroke="#7A2E1D" stroke-width="5" fill="none" stroke-linecap="round"/>`}
    [-1,1].forEach(sd=>{const cx=X(sd*68),cy=py;
      a+=`<path d="M${X(sd*40)} 132 Q${X(sd*62)} 130 ${cx} ${cy+pr*.6}" stroke="${steel?'#6C7888':'#A8432A'}" stroke-width="${8*k}" fill="none" stroke-linecap="round"/>`;
      a+=`<ellipse cx="${cx}" cy="${cy}" rx="${pr}" ry="${pr*.85}" fill="url(#${steel?'m':'b'}${u})" stroke="#3a1a12" stroke-width="2"/>`;
      a+=`<path d="M${cx} ${cy} L${cx+sd*pr*1.05} ${cy-pr*.35} L${cx+sd*pr*1.05} ${cy+pr*.15}Z" fill="#3a1a12"/>`;
      if(s===3)a+=`<path d="M${cx-pr*.5} ${cy-pr*.5} l${pr*.3} ${pr*.2} M${cx-pr*.2} ${cy+pr*.4} l${pr*.3} -${pr*.1}" stroke="#fff" stroke-width="2" opacity=".6"/>`;});
    a+=`<ellipse cx="100" cy="136" rx="${48*k}" ry="${30*k}" fill="url(#b${u})" stroke="#5e2416" stroke-width="2"/>`;
    if(s===3){for(let i=-2;i<=2;i++)a+=`<rect x="${X(i*17-6)}" y="${108-Math.abs(i)*3}" width="12" height="12" fill="url(#m${u})" stroke="#4d5866" stroke-width="1.5"/>`}
    if(s===2)a+=`<path d="M${X(-30)} 118 Q100 104 ${X(30)} 118" stroke="#D8E0EA" stroke-width="4" fill="none"/>`;
    a+=`<ellipse cx="100" cy="148" rx="${30*k}" ry="${12*k}" fill="#F2C9A8" opacity=".9"/>`;
    a+=`<path d="M${X(-12)} 114 L${X(-15)} ${s===1?100:94}" stroke="#7A2E1D" stroke-width="4"/><path d="M${X(12)} 114 L${X(15)} ${s===1?100:94}" stroke="#7A2E1D" stroke-width="4"/>`;
    a+=eye(X(-15),s===1?96:90,s===1?7:6,s,'#2F8F9D',1)+eye(X(15),s===1?96:90,s===1?7:6,s,'#2F8F9D',-1);
    a+=`<path d="M94 132 Q100 136 106 132" stroke="#3a1a12" stroke-width="2" fill="none"/>`;
    return [d,a];
  },
  gorillot(s,u){
    const k=[0,.8,1,1.12][s];const X=v=>100+v*k;
    const d=rg('b'+u,'#55555F','#24242B')+rg('c'+u,'#9A97A6','#5F5A6B');
    let a='';
    a+=`<ellipse cx="${X(-20)}" cy="174" rx="${16*k}" ry="${11*k}" fill="#24242B"/><ellipse cx="${X(20)}" cy="174" rx="${16*k}" ry="${11*k}" fill="#24242B"/>`;
    a+=`<ellipse cx="100" cy="136" rx="${46*k}" ry="${42*k}" fill="url(#b${u})"/>`;
    if(s===3)a+=`<path d="M${X(-40)} 112 Q100 84 ${X(40)} 112" stroke="#C9CDD6" stroke-width="10" fill="none" opacity=".85" stroke-linecap="round"/>`;
    a+=`<ellipse cx="100" cy="142" rx="${28*k}" ry="${26*k}" fill="url(#c${u})"/>`;
    if(s>=2)a+=`<path d="M${X(-16)} 132 Q100 140 ${X(16)} 132 M100 140 v18" stroke="#4a4652" stroke-width="2" fill="none"/>`;
    [-1,1].forEach(sd=>{a+=`<ellipse cx="${X(sd*52)}" cy="140" rx="${17*k}" ry="${36*k}" fill="url(#b${u})" transform="rotate(${sd*-10} ${X(sd*52)} 140)"/>`;
      a+=`<circle cx="${X(sd*58)}" cy="${172}" r="${15*k}" fill="#3a3a44" stroke="#1a1a20" stroke-width="2"/>`;
      if(s===3)a+=`<rect x="${X(sd*58)-14*k}" y="${154}" width="${28*k}" height="7" rx="2" fill="#C2410C"/>`;});
    const hy=[0,98,92,84][s];
    a+=`<circle cx="100" cy="${hy}" r="${27*k}" fill="url(#b${u})"/>`;
    a+=`<ellipse cx="100" cy="${hy+6}" rx="${19*k}" ry="${16*k}" fill="#6F6878"/>`;
    a+=`<path d="M${X(-18)} ${hy-6} Q100 ${hy-14} ${X(18)} ${hy-6}" stroke="#1a1a20" stroke-width="${s===3?6:4}" fill="none" stroke-linecap="round"/>`;
    a+=eye(X(-8),hy,s===1?5.5:4.5,s,'#C77B2E',1)+eye(X(8),hy,s===1?5.5:4.5,s,'#C77B2E',-1);
    a+=`<ellipse cx="${X(-4)}" cy="${hy+10}" rx="2.4" ry="2" fill="#1a1a20"/><ellipse cx="${X(4)}" cy="${hy+10}" rx="2.4" ry="2" fill="#1a1a20"/><path d="M${X(-7)} ${hy+16} Q100 ${hy+19} ${X(7)} ${hy+16}" stroke="#1a1a20" stroke-width="2" fill="none"/>`;
    return [d,a];
  },
  varanou(s,u){
    const k=[0,.8,1,1.12][s];const X=v=>100+v*k;
    const d=rg('b'+u,'#CDA86A','#7A5A2E');
    let a='';
    const tl=[0,40,58,74][s];
    a+=`<path d="M${X(-30)} 132 Q${X(-30-tl)} 128 ${X(-34-tl)} 160 Q${X(-24-tl*.6)} 150 ${X(-26)} 156Z" fill="url(#b${u})" stroke="#5E4422" stroke-width="2"/>`;
    a+=`<rect x="${X(-28)}" y="150" width="${12*k}" height="28" rx="5" fill="#5E4422"/><rect x="${X(20)}" y="150" width="${12*k}" height="28" rx="5" fill="#5E4422"/>`;
    a+=`<ellipse cx="100" cy="144" rx="${44*k}" ry="${22*k}" fill="url(#b${u})" stroke="#5E4422" stroke-width="2"/>`;
    if(s>=2){for(let i=-1;i<=1;i++)a+=`<path d="M${X(i*18-4)} ${126} q4 10 0 34" stroke="#6E5530" stroke-width="5" fill="none" opacity=".8"/>`;
      for(let i=-2;i<=2;i++)a+=`<path d="M${X(i*14-5)} ${124} l5 -${s===3?14:9} l5 ${s===3?14:9}Z" fill="#7A4B2A"/>`}
    if(s===3)for(let i=0;i<6;i++)a+=`<circle cx="${X(-30+i*12)}" cy="${148+(i%2)*6}" r="3" fill="#E3CFA3" opacity=".7"/>`;
    a+=`<ellipse cx="100" cy="154" rx="${30*k}" ry="${8*k}" fill="#E3CFA3" opacity=".9"/>`;
    a+=`<rect x="${X(-40)}" y="156" width="${13*k}" height="26" rx="5" fill="#7A5A2E"/><rect x="${X(30)}" y="156" width="${13*k}" height="26" rx="5" fill="#7A5A2E"/>`;
    const hx=X(46),hy=s===1?122:118;
    a+=`<path d="M${X(30)} 136 Q${X(38)} ${hy+6} ${hx} ${hy+4}" stroke="#A8844B" stroke-width="${18*k}" fill="none" stroke-linecap="round"/>`;
    a+=`<ellipse cx="${hx+6}" cy="${hy}" rx="${24*k}" ry="${14*k}" fill="url(#b${u})" stroke="#5E4422" stroke-width="2"/>`;
    a+=`<path d="M${hx+26*k} ${hy+4} l14 0 l5 -4 M${hx+26*k+14} ${hy+4} l5 4" stroke="#D94A5A" stroke-width="2.5" fill="none" stroke-linecap="round"/>`;
    a+=`<path d="M${hx+4} ${hy+7} L${hx+26*k} ${hy+5}" stroke="#5E4422" stroke-width="2"/>`;
    a+=eye(hx+2,hy-4,s===1?6:5,s,'#E0A100',-1);
    return [d,a];
  },
};
function creatureSVG(sp,stage,label){
  const u=++gid;const [defs,art]=ART[sp](stage,u);
  return `<svg viewBox="0 0 200 200" role="img" aria-label="${label||sp}"><defs>${defs}</defs><ellipse cx="100" cy="186" rx="56" ry="8" fill="#000" opacity=".22"/>${art}</svg>`;
}


if (typeof module !== "undefined") module.exports = { ART, creatureSVG };
