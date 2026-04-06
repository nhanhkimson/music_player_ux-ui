"use client";

import { useEffect, useRef } from "react";

const uiMarkup = `
<div class="wrap">

<div>
<div class="lbl">Now Playing</div>
<div class="phone">
<div class="screen">
<div class="island"></div>
<div class="blob" style="width:200px;height:200px;background:#6d28d9;top:-50px;left:-30px;"></div>
<div class="blob" style="width:140px;height:140px;background:#7c3aed;top:120px;right:-20px;opacity:.18;"></div>
<div class="content">
  <div class="topbar">
    <div class="topbtn"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.65)" stroke-width="2" stroke-linecap="round"><polyline points="6 9 12 15 18 9"></polyline></svg></div>
    <div class="toplabel"><div class="tlsub">Now Playing</div><div class="tlmain" id="sourcelbl">My Library</div></div>
    <div class="topbtn"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.65)" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg></div>
  </div>

  <div class="artarea">
    <label for="fimp" style="cursor:pointer;">
      <div class="art" id="artbox">
        <div class="art-ph" id="artph">
          <div class="art-ring"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.45)" stroke-width="1.5" stroke-linecap="round"><path d="M12 5v14M5 12l7 7 7-7"></path></svg></div>
          <div class="art-txt">Tap to import<br>a music file</div>
        </div>
        <svg id="artsvg" viewBox="0 0 216 216" width="216" height="216" style="display:none;position:absolute;top:0;left:0;">
          <defs><linearGradient id="ag" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#1e1b4b"></stop><stop offset="50%" style="stop-color:#4c1d95"></stop><stop offset="100%" style="stop-color:#6d28d9"></stop></linearGradient></defs>
          <rect width="216" height="216" fill="url(#ag)"></rect>
          <circle cx="108" cy="90" r="34" fill="rgba(255,255,255,.07)" stroke="rgba(255,255,255,.14)" stroke-width="1"></circle>
          <polygon points="100,82 124,90 100,98" fill="rgba(255,255,255,.45)"></polygon>
          <rect x="36" y="138" width="144" height="2" rx="1" fill="rgba(255,255,255,.07)"></rect>
          <rect x="36" y="150" width="90" height="2" rx="1" fill="rgba(255,255,255,.04)"></rect>
        </svg>
      </div>
    </label>
    <input type="file" id="fimp" accept="audio/*,.mp3,.m4a,.wav,.flac,.aac">
  </div>

  <div class="trackinfo">
    <div>
      <div class="ttitle" id="ttitle">Import a Song</div>
      <div class="tartist" id="tartist">Tap the artwork above</div>
    </div>
    <div class="favbtn" id="favbtn">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.28)" stroke-width="1.5" stroke-linecap="round" id="heartsvg"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
    </div>
  </div>

  <div class="wfarea" id="wfarea">
    <div class="wfbars" id="wfbars"></div>
  </div>
  <div class="timerow">
    <span class="timetxt" id="curtime">0:00</span>
    <span class="timetxt" id="durtime">0:00</span>
  </div>

  <div class="controls">
    <div class="cbtn" id="shufflebtn"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.38)" stroke-width="1.5" stroke-linecap="round"><polyline points="16 3 21 3 21 8"></polyline><line x1="4" y1="20" x2="21" y2="3"></line><polyline points="21 16 21 21 16 21"></polyline><line x1="4" y1="4" x2="9" y2="9"></line></svg></div>
    <div class="cbtn" id="prevbtn"><svg width="26" height="26" viewBox="0 0 24 24" fill="rgba(255,255,255,.75)" stroke="none"><path d="M19 20L9 12l10-8v16zM5 4h2v16H5z"></path></svg></div>
    <div class="playbtn" id="playbtn">
      <svg id="pico" width="26" height="26" viewBox="0 0 24 24" fill="#000"><polygon points="5,3 19,12 5,21"></polygon></svg>
      <svg id="pausico" width="26" height="26" viewBox="0 0 24 24" fill="#000" style="display:none"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
    </div>
    <div class="cbtn" id="nextbtn"><svg width="26" height="26" viewBox="0 0 24 24" fill="rgba(255,255,255,.75)" stroke="none"><path d="M5 4l10 8-10 8V4zM19 4h2v16h-2z"></path></svg></div>
    <div class="cbtn" id="repeatbtn"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.38)" stroke-width="1.5" stroke-linecap="round"><polyline points="17 1 21 5 17 9"></polyline><path d="M3 11V9a4 4 0 0 1 4-4h14"></path><polyline points="7 23 3 19 7 15"></polyline><path d="M21 13v2a4 4 0 0 1-4 4H3"></path></svg></div>
  </div>

  <div class="volarea">
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.32)" stroke-width="1.5" stroke-linecap="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon></svg>
    <div class="voltrack" id="voltrack"><div class="volfill" id="volfill" style="width:65%;"></div><div class="volthumb" id="volthumb" style="right:35%;"></div></div>
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.32)" stroke-width="1.5" stroke-linecap="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path></svg>
  </div>

  <div class="botrow" style="margin-top:12px;">
    <div class="ibtn"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.4)" stroke-width="1.5" stroke-linecap="round"><path d="M3 6h18M3 12h12M3 18h8"></path></svg></div>
    <div class="ibtn"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.4)" stroke-width="1.5" stroke-linecap="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg></div>
    <div class="ibtn"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.4)" stroke-width="1.5" stroke-linecap="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect></svg></div>
  </div>
</div>
<div class="hi"></div>
</div>
</div>
</div>

<div>
<div class="lbl">Library</div>
<div class="phone">
<div class="screen">
<div class="island"></div>
<div class="blob" style="width:150px;height:150px;background:#1e3a5f;top:-30px;right:-10px;opacity:.45;"></div>
<div class="libscreen">
  <div class="libhdr">
    <div><div class="libtitle">Library</div><div class="libcount" id="libcount">0 songs</div></div>
    <label for="fimp2" style="cursor:pointer;"><div class="addbtn"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" stroke-width="2" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg></div></label>
    <input type="file" id="fimp2" accept="audio/*,.mp3,.m4a,.wav,.flac,.aac" multiple>
  </div>

  <div class="srch">
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.28)" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
    <div class="srchph">Search songs...</div>
  </div>

  <label for="fimp3" style="cursor:pointer;display:block;">
    <div class="impbar">
      <div class="impico"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" stroke-width="1.5" stroke-linecap="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg></div>
      <div class="imptxt"><div class="imptitle">Import music files</div><div class="impsub">MP3 · M4A · WAV · FLAC · AAC</div></div>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.18)" stroke-width="2" stroke-linecap="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
    </div>
  </label>
  <input type="file" id="fimp3" accept="audio/*,.mp3,.m4a,.wav,.flac,.aac" multiple>

  <div class="qlist" id="qlist">
    <div class="emptystate" id="emptystate">
      <div class="emptyico"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.22)" stroke-width="1.2" stroke-linecap="round"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg></div>
      <div class="emptytitle">No music yet</div>
      <div class="emptysub">Import files above to start listening</div>
    </div>
  </div>

  <div class="miniplayer" id="miniplayer" style="display:none;">
    <div class="miniart"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.45)" stroke-width="1.5"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg></div>
    <div class="miniinfo"><div class="minititle" id="minititle">—</div><div class="miniartist" id="miniartist">—</div></div>
    <div class="minicontrols">
      <div class="minibtn" id="miniplay"><svg id="mpico" width="16" height="16" viewBox="0 0 24 24" fill="rgba(255,255,255,.8)"><polygon points="5,3 19,12 5,21"></polygon></svg><svg id="mpausico" width="16" height="16" viewBox="0 0 24 24" fill="rgba(255,255,255,.8)" style="display:none"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg></div>
      <div class="minibtn" id="miniclose"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.45)" stroke-width="1.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></div>
    </div>
  </div>

  <div class="tabbar">
    <div class="tabitem"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.35)" stroke-width="1.5" stroke-linecap="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg><span class="tlab" style="color:rgba(255,255,255,.3);">Home</span></div>
    <div class="tabitem active"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" stroke-width="1.5" stroke-linecap="round"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg><div class="tabdot"></div><span class="tlab" style="color:#a78bfa;">Library</span></div>
    <div class="tabitem"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.35)" stroke-width="1.5" stroke-linecap="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg><span class="tlab" style="color:rgba(255,255,255,.3);">Search</span></div>
    <div class="tabitem"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.35)" stroke-width="1.5" stroke-linecap="round"><circle cx="12" cy="8" r="4"></circle><path d="M6 20v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"></path></svg><span class="tlab" style="color:rgba(255,255,255,.3);">Profile</span></div>
  </div>
</div>
</div>
</div>
</div>

</div>
`;

const styles = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Mono&display=swap');
*{box-sizing:border-box;margin:0;padding:0;}
.wrap{display:flex;justify-content:center;gap:2rem;padding:2rem 1rem 3rem;flex-wrap:wrap;font-family:'DM Sans',sans-serif;}
.phone{width:310px;background:#0A0A0F;border-radius:44px;border:1px solid #2a2a35;overflow:hidden;box-shadow:0 0 0 8px #111118,0 0 0 9px #222230;position:relative;}
.screen{min-height:660px;display:flex;flex-direction:column;position:relative;overflow:hidden;}
.island{width:110px;height:32px;background:#000;border-radius:20px;position:absolute;top:10px;left:50%;transform:translateX(-50%);z-index:10;border:1px solid #1a1a22;}
.blob{position:absolute;border-radius:50%;filter:blur(55px);opacity:.3;pointer-events:none;}
.content{position:relative;z-index:2;display:flex;flex-direction:column;flex:1;padding-bottom:20px;}
.lbl{font-size:10px;text-align:center;color:rgba(255,255,255,.22);padding:10px 0 4px;letter-spacing:.08em;text-transform:uppercase;font-weight:500;}
.topbar{display:flex;justify-content:space-between;align-items:center;padding:52px 22px 0;margin-bottom:16px;}
.topbtn{width:34px;height:34px;border-radius:50%;background:rgba(255,255,255,.07);display:flex;align-items:center;justify-content:center;cursor:pointer;border:.5px solid rgba(255,255,255,.1);}
.toplabel{text-align:center;}
.tlsub{font-size:11px;color:rgba(255,255,255,.38);text-transform:uppercase;letter-spacing:.07em;font-weight:500;}
.tlmain{font-size:13px;color:rgba(255,255,255,.8);font-weight:500;margin-top:2px;}
.artarea{display:flex;justify-content:center;margin-bottom:20px;}
.art{width:216px;height:216px;border-radius:22px;position:relative;overflow:hidden;box-shadow:0 20px 50px rgba(0,0,0,.65);cursor:pointer;}
.art-ph{width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;border:.5px dashed rgba(255,255,255,.18);border-radius:22px;transition:opacity .2s;}
.art-ph:hover{opacity:.8;}
.art-ring{width:48px;height:48px;border-radius:50%;background:rgba(255,255,255,.06);border:1.5px dashed rgba(255,255,255,.22);display:flex;align-items:center;justify-content:center;}
.art-txt{font-size:11px;color:rgba(255,255,255,.35);text-align:center;line-height:1.4;}
.trackinfo{padding:0 26px;display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:16px;}
.ttitle{font-size:17px;font-weight:600;color:#fff;letter-spacing:-.01em;line-height:1.2;margin-bottom:2px;}
.tartist{font-size:12px;color:rgba(255,255,255,.4);}
.favbtn{width:30px;height:30px;display:flex;align-items:center;justify-content:center;cursor:pointer;flex-shrink:0;margin-top:2px;}
.wfarea{padding:0 26px;margin-bottom:10px;cursor:pointer;}
.wfbars{display:flex;align-items:center;gap:1.5px;height:38px;}
.timerow{display:flex;justify-content:space-between;padding:0 26px;margin-bottom:20px;}
.timetxt{font-size:10px;font-family:'DM Mono',monospace;color:rgba(255,255,255,.3);}
.controls{display:flex;align-items:center;justify-content:center;padding:0 18px;margin-bottom:20px;}
.cbtn{display:flex;align-items:center;justify-content:center;cursor:pointer;flex:1;border-radius:50%;transition:opacity .15s,transform .1s;}
.cbtn:hover{opacity:.7;}
.cbtn:active{transform:scale(.93);}
.playbtn{width:64px;height:64px;background:#fff;border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:transform .15s;flex:none;box-shadow:0 6px 28px rgba(255,255,255,.12);}
.playbtn:hover{transform:scale(1.04);}
.playbtn:active{transform:scale(.96);}
.volarea{padding:0 26px;display:flex;align-items:center;gap:8px;margin-bottom:14px;}
.voltrack{flex:1;height:3px;background:rgba(255,255,255,.1);border-radius:2px;position:relative;cursor:pointer;}
.volfill{height:100%;background:rgba(255,255,255,.45);border-radius:2px;}
.volthumb{width:11px;height:11px;background:#fff;border-radius:50%;position:absolute;top:50%;transform:translate(50%,-50%);}
.botrow{display:flex;align-items:center;justify-content:space-between;padding:0 26px;}
.ibtn{width:34px;height:34px;display:flex;align-items:center;justify-content:center;cursor:pointer;border-radius:50%;transition:background .15s;}
.ibtn:hover{background:rgba(255,255,255,.06);}
.hi{width:130px;height:4px;background:rgba(255,255,255,.22);border-radius:2px;margin:12px auto 8px;}
.libscreen{position:relative;z-index:2;display:flex;flex-direction:column;flex:1;}
.libhdr{padding:52px 22px 0;margin-bottom:14px;display:flex;justify-content:space-between;align-items:flex-start;}
.libtitle{font-size:21px;font-weight:600;color:#fff;letter-spacing:-.02em;}
.libcount{font-size:11px;color:rgba(255,255,255,.32);margin-top:2px;}
.addbtn{width:32px;height:32px;border-radius:50%;background:rgba(167,139,250,.15);border:.5px solid rgba(167,139,250,.3);display:flex;align-items:center;justify-content:center;cursor:pointer;margin-top:4px;}
.srch{margin:0 22px 12px;display:flex;align-items:center;gap:8px;background:rgba(255,255,255,.05);border-radius:12px;padding:9px 13px;border:.5px solid rgba(255,255,255,.07);}
.srchph{font-size:12px;color:rgba(255,255,255,.3);}
.impbar{margin:0 22px 14px;border:1px dashed rgba(255,255,255,.13);border-radius:13px;padding:12px 14px;display:flex;align-items:center;gap:10px;cursor:pointer;background:rgba(255,255,255,.02);transition:background .2s,border-color .2s;}
.impbar:hover{background:rgba(255,255,255,.05);border-color:rgba(255,255,255,.22);}
.impico{width:34px;height:34px;border-radius:9px;background:rgba(167,139,250,.13);display:flex;align-items:center;justify-content:center;flex-shrink:0;}
.imptxt{flex:1;}
.imptitle{font-size:12px;font-weight:500;color:rgba(255,255,255,.8);}
.impsub{font-size:10px;color:rgba(255,255,255,.32);margin-top:1px;}
.qlist{padding:4px 18px 8px;display:flex;flex-direction:column;gap:1px;flex:1;overflow:hidden;}
.qitem{display:flex;align-items:center;gap:10px;padding:9px 6px;border-radius:11px;cursor:pointer;transition:background .15s;}
.qitem:hover{background:rgba(255,255,255,.05);}
.qitem.active{background:rgba(255,255,255,.07);}
.qart{width:40px;height:40px;border-radius:8px;flex-shrink:0;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#1e1b4b,#4c1d95);}
.qinfo{flex:1;min-width:0;}
.qtitle{font-size:12px;font-weight:500;color:#fff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.qartist{font-size:10px;color:rgba(255,255,255,.35);margin-top:1px;}
.qdur{font-size:10px;font-family:'DM Mono',monospace;color:rgba(255,255,255,.28);}
.eqanim{display:flex;align-items:center;gap:1.5px;height:13px;}
.eqbar{width:2.5px;border-radius:1px;background:#a78bfa;animation:eq .7s ease-in-out infinite alternate;}
.eqbar:nth-child(2){animation-delay:.2s;}
.eqbar:nth-child(3){animation-delay:.4s;}
@keyframes eq{from{height:3px;}to{height:12px;}}
.emptystate{display:flex;flex-direction:column;align-items:center;justify-content:center;flex:1;gap:8px;padding:24px;}
.emptyico{width:60px;height:60px;border-radius:16px;background:rgba(255,255,255,.04);border:.5px solid rgba(255,255,255,.07);display:flex;align-items:center;justify-content:center;margin-bottom:2px;}
.emptytitle{font-size:14px;font-weight:500;color:rgba(255,255,255,.6);}
.emptysub{font-size:11px;color:rgba(255,255,255,.27);text-align:center;line-height:1.5;max-width:170px;}
.miniplayer{background:rgba(255,255,255,.06);border-top:.5px solid rgba(255,255,255,.08);padding:9px 18px;display:flex;align-items:center;gap:10px;}
.miniart{width:34px;height:34px;border-radius:7px;background:linear-gradient(135deg,#1e1b4b,#312e81);flex-shrink:0;display:flex;align-items:center;justify-content:center;}
.miniinfo{flex:1;min-width:0;}
.minititle{font-size:12px;font-weight:500;color:#fff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.miniartist{font-size:10px;color:rgba(255,255,255,.38);}
.minicontrols{display:flex;gap:4px;align-items:center;}
.minibtn{width:28px;height:28px;display:flex;align-items:center;justify-content:center;cursor:pointer;border-radius:50%;transition:background .15s;}
.minibtn:hover{background:rgba(255,255,255,.08);}
.tabbar{display:flex;border-top:.5px solid rgba(255,255,255,.08);background:rgba(10,10,15,.97);padding:9px 0 14px;}
.tabitem{flex:1;display:flex;flex-direction:column;align-items:center;gap:3px;cursor:pointer;opacity:.35;transition:opacity .15s;}
.tabitem.active{opacity:1;}
.tabitem:hover{opacity:.65;}
.tabdot{width:3px;height:3px;border-radius:50%;background:#a78bfa;margin-top:1px;}
.tlab{font-size:9px;font-weight:500;color:#fff;}
input[type=file]{display:none;}
`;

function emptyStateMarkup() {
  return `
    <div class="emptystate" id="emptystate">
      <div class="emptyico"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.22)" stroke-width="1.2" stroke-linecap="round"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg></div>
      <div class="emptytitle">No music yet</div>
      <div class="emptysub">Import files above to start listening</div>
    </div>
  `;
}

export default function Page() {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const byId = (id) => root.querySelector(`#${id}`);
    const wfbars = byId("wfbars");
    if (!wfbars) return undefined;

    const WFC = 46;
    for (let i = 0; i < WFC; i += 1) {
      const h = 6 + Math.random() * 28;
      const b = document.createElement("div");
      b.className = "wf-bar";
      b.style.cssText = `height:${h}px;flex:1;border-radius:2px;min-width:2px;background:rgba(255,255,255,.1);`;
      wfbars.appendChild(b);
    }

    let playing = false;
    let fav = false;
    let dur = 0;
    let audio = null;
    let tracks = [];
    let idx = -1;
    let vol = 0.65;

    const fmt = (s) => {
      if (Number.isNaN(s) || s < 0) return "0:00";
      const m = Math.floor(s / 60);
      const sec = Math.floor(s % 60);
      return `${m}:${sec < 10 ? "0" : ""}${sec}`;
    };

    const updateWF = (p) => {
      const bars = wfbars.querySelectorAll(".wf-bar");
      const th = Math.floor(p * WFC);
      bars.forEach((bar, i) => {
        if (i < th) bar.style.background = "#a78bfa";
        else if (i === th) bar.style.background = "rgba(167,139,250,.45)";
        else bar.style.background = "rgba(255,255,255,.1)";
      });
    };

    const setPlaying = (v) => {
      playing = v;
      byId("pico").style.display = v ? "none" : "";
      byId("pausico").style.display = v ? "" : "none";
      byId("mpico").style.display = v ? "none" : "";
      byId("mpausico").style.display = v ? "" : "none";
    };

    const renderLib = () => {
      const list = byId("qlist");
      if (!list) return;
      list.innerHTML = "";

      if (!tracks.length) {
        list.innerHTML = emptyStateMarkup();
        return;
      }

      tracks.forEach((t, i) => {
        const d = document.createElement("div");
        d.className = `qitem${i === idx ? " active" : ""}`;
        d.innerHTML = `<div class="qart">${
          i === idx
            ? '<div class="eqanim"><div class="eqbar"></div><div class="eqbar"></div><div class="eqbar"></div></div>'
            : '<svg width="12" height="12" viewBox="0 0 24 24" fill="rgba(255,255,255,.4)"><polygon points="5,3 19,12 5,21"></polygon></svg>'
        }</div><div class="qinfo"><div class="qtitle">${t.name}</div><div class="qartist">${t.ext}</div></div><div class="qdur">—</div>`;
        d.addEventListener("click", () => loadTrack(i));
        list.appendChild(d);
      });
    };

    const loadTrack = (i) => {
      if (i < 0 || i >= tracks.length) return;
      idx = i;
      const t = tracks[i];

      if (audio) {
        audio.pause();
        audio.src = "";
      }

      audio = new Audio(t.url);
      audio.volume = vol;
      audio.addEventListener("loadedmetadata", () => {
        dur = audio.duration;
        byId("durtime").textContent = fmt(dur);
      });
      audio.addEventListener("timeupdate", () => {
        const ct = audio.currentTime;
        updateWF(dur ? ct / dur : 0);
        byId("curtime").textContent = fmt(ct);
      });
      audio.addEventListener("play", () => setPlaying(true));
      audio.addEventListener("pause", () => setPlaying(false));
      audio.addEventListener("ended", () => {
        if (idx < tracks.length - 1) loadTrack(idx + 1);
        else setPlaying(false);
      });

      byId("ttitle").textContent = t.name;
      byId("tartist").textContent = `${t.ext} • Local File`;
      byId("artph").style.display = "none";
      byId("artsvg").style.display = "";
      byId("minititle").textContent = t.name;
      byId("miniartist").textContent = t.ext;
      byId("miniplayer").style.display = "flex";
      renderLib();
      audio.play().catch(() => {});
    };

    const importFiles = (files) => {
      if (!files || !files.length) return;
      const start = tracks.length;

      Array.from(files).forEach((f) => {
        const parts = f.name.split(".");
        const ext = (parts[parts.length - 1] || "").toUpperCase();
        tracks.push({
          name: f.name.replace(/\.[^.]+$/, ""),
          url: URL.createObjectURL(f),
          ext,
        });
      });

      byId("libcount").textContent = `${tracks.length}${tracks.length === 1 ? " song" : " songs"}`;
      renderLib();
      if (idx < 0) loadTrack(start);
    };

    const handlers = [];
    const on = (id, event, fn) => {
      const el = byId(id);
      if (!el) return;
      el.addEventListener(event, fn);
      handlers.push(() => el.removeEventListener(event, fn));
    };

    on("playbtn", "click", () => {
      if (!audio) return;
      if (playing) audio.pause();
      else audio.play().catch(() => {});
    });

    on("prevbtn", "click", () => {
      if (audio && audio.currentTime > 3) {
        audio.currentTime = 0;
        return;
      }
      if (idx > 0) loadTrack(idx - 1);
    });

    on("nextbtn", "click", () => {
      if (idx < tracks.length - 1) loadTrack(idx + 1);
    });

    on("favbtn", "click", () => {
      fav = !fav;
      const h = byId("heartsvg");
      h.setAttribute("fill", fav ? "#f472b6" : "none");
      h.setAttribute("stroke", fav ? "#f472b6" : "rgba(255,255,255,.28)");
    });

    on("wfarea", "click", (e) => {
      if (!audio || !dur) return;
      const r = e.currentTarget.getBoundingClientRect();
      audio.currentTime = Math.max(0, Math.min(1, (e.clientX - r.left) / r.width)) * dur;
    });

    on("voltrack", "click", (e) => {
      const r = e.currentTarget.getBoundingClientRect();
      vol = Math.max(0, Math.min(1, (e.clientX - r.left) / r.width));
      if (audio) audio.volume = vol;
      const pct = `${(vol * 100).toFixed(0)}%`;
      byId("volfill").style.width = pct;
      byId("volthumb").style.right = `${(100 - vol * 100).toFixed(0)}%`;
    });

    on("miniplay", "click", () => {
      if (!audio) return;
      if (playing) audio.pause();
      else audio.play().catch(() => {});
    });

    on("miniclose", "click", () => {
      if (audio) audio.pause();
      byId("miniplayer").style.display = "none";
    });

    ["fimp", "fimp2", "fimp3"].forEach((id) => {
      on(id, "change", (e) => importFiles(e.target.files));
    });

    updateWF(0);
    renderLib();

    return () => {
      handlers.forEach((off) => off());
      if (audio) {
        audio.pause();
        audio.src = "";
      }
      tracks.forEach((t) => {
        try {
          URL.revokeObjectURL(t.url);
        } catch {
          // ignore URL cleanup errors
        }
      });
      tracks = [];
    };
  }, []);

  return (
    <>
      <style jsx global>
        {styles}
      </style>
      <div ref={rootRef} dangerouslySetInnerHTML={{ __html: uiMarkup }} />
    </>
  );
}
