if(!self.define){let e,s={};const i=(i,l)=>(i=new URL(i+".js",l).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(l,r)=>{const n=e||("document"in self?document.currentScript.src:"")||location.href;if(s[n])return;let t={};const u=e=>i(e,n),o={module:{uri:n},exports:t,require:u};s[n]=Promise.all(l.map((e=>o[e]||u(e)))).then((e=>(r(...e),t)))}}define(["./workbox-5ffe50d4"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"404.html",revision:"4ac6d267829a75550195cae9ce7cbcef"},{url:"assets/AttentionGame-2mUu41MT.js",revision:null},{url:"assets/HomePage-D0xM1A43.js",revision:null},{url:"assets/index-BaJReJW6.css",revision:null},{url:"assets/index-CQ3ulkL0.js",revision:null},{url:"assets/LabyrinthGame-B-AUANOC.js",revision:null},{url:"assets/MemoryGame-BnL6SXn9.js",revision:null},{url:"assets/NameModal-BI5IL0PQ.js",revision:null},{url:"assets/PerceptionGame-Cep1Ikll.js",revision:null},{url:"assets/PuzzleGame-DMcQflzB.js",revision:null},{url:"assets/ScrambleGame-CUF82Bfc.css",revision:null},{url:"assets/ScrambleGame-D0DMNOx9.js",revision:null},{url:"assets/Tasks-C6BLiJCw.js",revision:null},{url:"assets/არწივი-B6yRfamE.js",revision:null},{url:"index.html",revision:"0c1d9adfff1a20247c73cc89aa8db3df"},{url:"registerSW.js",revision:"37e4d01c9c511e123cf53f336db62510"},{url:"service-worker.js",revision:"a74dee8a1c3b01c3e1acbd1af733014f"},{url:"manifest.webmanifest",revision:"9eeb9b530593a2dd359407d0e0041067"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
