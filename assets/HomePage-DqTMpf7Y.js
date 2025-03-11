import{d as n,r as i,j as e,m as b,L as E}from"./index-DbIYvZCS.js";let a=null;const u=()=>!!(window.matchMedia("(display-mode: standalone)").matches||navigator.standalone||window.navigator.userAgent.match(/iPhone|iPad|iPod/)&&!window.navigator.userAgent.match(/Safari/)),h=()=>{if(a)return!0;const t=/Chrome/.test(navigator.userAgent)&&/Google Inc/.test(navigator.vendor),c=/Edg/.test(navigator.userAgent),g=/SamsungBrowser/.test(navigator.userAgent),o=/Firefox/.test(navigator.userAgent),d=/OPR/.test(navigator.userAgent),w=window.location.protocol==="https:",v="serviceWorker"in navigator,m=document.querySelectorAll('link[rel="manifest"]').length>0;return(t||c||g||o||d)&&w&&v&&m};window.addEventListener("beforeinstallprompt",t=>{t.preventDefault(),console.log("🟢 beforeinstallprompt fired and captured globally"),a=t});const L=async()=>{if(a)try{return console.log("Manually triggering install prompt"),await a.prompt(),(await a.userChoice).outcome==="accepted"?(console.log("User accepted the install prompt"),a=null,!0):(console.log("User dismissed the install prompt"),!1)}catch(t){return console.error("Error triggering install prompt:",t),!1}else return console.log("No deferred prompt available"),!1},A=n.button`
  background: #4CAF50;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 18px;
  font-weight: bold;
  transition: all 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  position: relative;
  margin: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: pulse 2s infinite;

  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 rgba(76, 175, 80, 0.7);
    }
    70% {
      box-shadow: 0 0 0 10px rgba(76, 175, 80, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(76, 175, 80, 0);
    }
  }

  &:before {
    content: "📱";
    margin-right: 10px;
    font-size: 24px;
  }

  &:hover {
    background: #45a049;
    transform: translateY(-3px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);

    &:after {
      content: "თუ ამ ღილაკს დააჭერთ თქვენ შეძლებთ დააინსტალიროთ ვებსაიტი და დადოთ დესკტოპზე და გამოიყენოთ ინტერნეტის გარეშე";
      position: absolute;
      bottom: 100%;
      left: 0;
      background: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 12px;
      border-radius: 8px;
      font-size: 16px;
      width: max-content;
      max-width: 300px;
      margin-bottom: 10px;
      white-space: normal;
      line-height: 1.4;
      z-index: 1000;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    }
  }

  @media (max-width: 768px) {
    padding: 10px 18px;
    font-size: 16px;
  }
`,C=n.button`
  background: #ff9800;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  margin-top: 5px;
  display: block;
`,D=n.div`
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 10px;
  border-radius: 8px;
  font-size: 14px;
  margin-top: 5px;
  max-width: 300px;
  word-break: break-word;
`;n(A)`
  background: #2196F3;

  &:hover {
    background: #0b7dda;
  }
`;const Y=()=>{const[t,c]=i.useState(!1),[g,o]=i.useState("დეტექტირება..."),[d,w]=i.useState(!1),[v,m]=i.useState(""),[V,$]=i.useState(!1),[P,f]=i.useState(!1);i.useEffect(()=>{console.log("InstallPWA component mounted"),u()?(console.log("App is already installed"),c(!0),o("აპლიკაცია უკვე დაინსტალირებულია")):(console.log("App is not installed yet"),o("არ არის დაინსტალირებული, ველოდებით beforeinstallprompt ივენთს"),h()?(console.log("App is installable"),f(!0)):(console.log("App is not installable yet"),f(!0)));const x=navigator.userAgent;console.log("Browser details:",x),m(`
      Browser: ${x}
      Protocol: ${window.location.protocol}
      Hostname: ${window.location.hostname}
      Path: ${window.location.pathname}
      Hash: ${window.location.hash}
      Service Worker: ${"serviceWorker"in navigator?"Supported":"Not Supported"}
      Display Mode: ${window.matchMedia("(display-mode: standalone)").matches?"Standalone":"Browser"}
      Icons: ${Array.from(document.querySelectorAll('link[rel="icon"], link[rel="apple-touch-icon"]')).map(r=>r.href).join(", ")}
      Global Prompt Available: ${a?"Yes":"No"}
      Is Installed: ${u()?"Yes":"No"}
      Is Installable: ${h()?"Yes":"No"}
    `),window.addEventListener("appinstalled",()=>{c(!0),a=null,console.log("PWA was installed"),o("PWA დაინსტალირდა წარმატებით"),f(!1)});const I=setInterval(()=>{a&&!t&&(console.log("Global deferred prompt is now available"),m(r=>r+`
Global Prompt Available: Yes`),f(!0)),u()&&(console.log("App is now installed"),c(!0),f(!1),clearInterval(I))},2e3);return(async()=>{try{window.location.protocol!=="https:"&&(console.log("⚠️ Not using HTTPS"),o("PWA requires HTTPS"));const r=document.querySelectorAll('link[rel="manifest"]');if(r.length===0)console.log("⚠️ No manifest found"),o("მანიფესტი ვერ მოიძებნა");else{console.log("✅ Manifest found");try{const s=r[0],l=await fetch(s.href);if(l.ok){const p=await l.json();console.log("Manifest content:",p)}else console.log("⚠️ Manifest fetch failed:",l.status)}catch(s){console.error("Error fetching manifest:",s)}}if("serviceWorker"in navigator){const s=await navigator.serviceWorker.getRegistrations();s.length===0?(console.log("⚠️ No service worker registered"),o("სერვის ვორკერი არ არის რეგისტრირებული")):console.log("✅ Service worker registered:",s)}const W=Array.from(document.querySelectorAll('link[rel="icon"], link[rel="apple-touch-icon"]'));for(const s of W){const l=s;try{const p=await fetch(l.href);p.ok?console.log(`✅ Icon at ${l.href} loaded successfully`):console.log(`⚠️ Icon at ${l.href} failed to load: ${p.status}`)}catch(p){console.error(`Error fetching icon at ${l.href}:`,p)}}}catch(r){console.error("Error checking installability:",r)}})(),()=>{clearInterval(I)}},[]);const S=async()=>{$(!0),h()?await L()?o("მომხმარებელმა დაადასტურა ინსტალაცია"):(console.log("⚠️ Installation failed or was dismissed"),o("ინსტალაცია ვერ მოხერხდა ან უარყოფილ იქნა"),k()):(console.log("⚠️ PWA is not installable"),o("PWA არ არის დაინსტალირებადი"),k())},z=()=>{console.log("Navigator details:",{standalone:window.matchMedia("(display-mode: standalone)").matches,serviceWorker:"serviceWorker"in navigator,userAgent:navigator.userAgent,globalPromptAvailable:a?"Yes":"No",isInstalled:u(),isInstallable:h()}),w(!d),o(d?"დეტალების ჩვენება":"დეტალების დამალვა")},k=()=>{alert(`
      PWA-ს დასაინსტალირებლად:
      
      1. Chrome-ში: დააჭირეთ მისამართის ველის მარჯვენა მხარეს ინსტალაციის ღილაკს ან მენიუს ღილაკს (სამი წერტილი) და აირჩიეთ 'დააინსტალირე აპლიკაცია'
      2. Safari-ში (iOS): დააჭირეთ 'გაზიარება' ღილაკს და აირჩიეთ 'დაამატე მთავარ ეკრანზე'
      3. Edge-ში: დააჭირეთ მენიუს ღილაკს (სამი წერტილი) და აირჩიეთ 'დააინსტალირე'
    `)};return t?null:e.jsxs("div",{children:[P&&e.jsx(A,{onClick:S,children:"დააინსტალირეთ აპლიკაცია"}),e.jsx(C,{onClick:z,children:g}),d&&e.jsx(D,{children:v})]})};b`
  from { 
    opacity: 0;
    transform: translateY(10px);
  }
  to { 
    opacity: 1;
    transform: translateY(0);
  }
`;const j=b`
  0% { background-position: 0% 50%; }
  100% { background-position: 100% 50%; }
`,G=b`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.2); }
`,M=b`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`,N=n.div`
  position: fixed;
  inset: 0;
  background: linear-gradient(-45deg, #64ccf0, #80d0c7, #56bcbd, #52b69a);
  background-size: 200% 200%;
  animation: ${j} 10s linear infinite;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  contain: content;
`,B=n.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  background: rgba(255, 255, 255, 0.1);
  padding: 40px;
  border-radius: 20px;
  backdrop-filter: blur(8px);
  contain: content;
`,T=n.div`
  font-size: 4rem;
  margin-bottom: 20px;
`,H=n.div`
  color: white;
  font-size: 1.5rem;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  margin-bottom: 20px;
  transform: translateZ(0);
  will-change: transform;
  backface-visibility: hidden;
  -webkit-font-smoothing: antialiased;
`,q=n.div`
  display: flex;
  gap: 12px;
  padding: 10px;
`,y=n.div`
  width: 12px;
  height: 12px;
  background: linear-gradient(145deg, #ffffff, #f3f3f3);
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1),
              inset 2px 2px 4px rgba(255, 255, 255, 0.5),
              inset -2px -2px 4px rgba(0, 0, 0, 0.05);
  animation: ${M} 1.5s ease-in-out infinite,
             ${G} 1.5s ease-in-out infinite;
  animation-delay: ${t=>t.$delay}s;
  transform-origin: center;
  will-change: transform;

  &:nth-child(2) {
    animation-delay: ${t=>t.$delay+.2}s;
  }

  &:nth-child(3) {
    animation-delay: ${t=>t.$delay+.4}s;
  }
`,F=n.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(-45deg, #64ccf0cc, #80d0c7cc, #56bcbdcc, #52b69acc);
  background-size: 400% 400%;
  animation: ${j} 10s linear infinite;
  overflow: auto;
`,R=n.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 2rem;
  background: transparent;
  overflow-y: auto;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`,O=n.h1`
  font-size: 2.5rem;
  color: #fff;
  margin: 2rem 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  text-align: center;
  width: 100%;
  
  @media (max-width: 768px) {
    font-size: 1.8rem;
    margin: 1rem 0;
  }
`,U=n.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 1rem;
  
  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }
  
  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`,Z=n(E)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  text-decoration: none;
  color: #333;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  aspect-ratio: 3/2;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  }
`,J=n.span`
  font-size: 2.5rem;
  margin-bottom: 10px;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`,K=n.h3`
  font-size: 1rem;
  text-align: center;
  font-weight: 500;
  margin: 0;
  padding: 0 5px;
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`,Q=n.div`
  position: fixed;
  left: 20px;
  bottom: 20px;
  z-index: 1000;
  filter: drop-shadow(0 0 10px rgba(76, 175, 80, 0.7));
`,ee=()=>{const[t,c]=i.useState(!0),g=[{path:"tasks",title:"სახალისო ამოცანები",icon:"🎯"},{path:"puzzle",title:"ფაზლი",icon:"🧩"},{path:"scramble",title:"აზროვნების სავარჯიშო",icon:"🔤"},{path:"memory",title:"მეხსიერების სავარჯიშო",icon:"🧠"},{path:"labyrinth",title:"ლაბირინთი",icon:"🎮"},{path:"attention",title:"ყურადღების განვითარების სავარჯიშო",icon:"👀"},{path:"perception",title:"აღქმის სავარჯიშო",icon:"🖼️"}];return i.useEffect(()=>{const o=setTimeout(()=>{c(!1)},480);return()=>clearTimeout(o)},[]),t?e.jsx(N,{children:e.jsxs(B,{children:[e.jsx(T,{children:"🎮"}),e.jsx(H,{children:"იტვირთება"}),e.jsxs(q,{children:[e.jsx(y,{$delay:0}),e.jsx(y,{$delay:.2}),e.jsx(y,{$delay:.4})]})]})}):e.jsxs(F,{children:[e.jsxs(R,{children:[e.jsx(O,{children:"შემეცნებითი უნარების სავარჯიშოები"}),e.jsx(U,{children:g.map((o,d)=>e.jsxs(Z,{to:o.path,children:[e.jsx(J,{children:o.icon}),e.jsx(K,{children:o.title})]},d))})]}),e.jsx(Q,{children:e.jsx(Y,{})})]})};export{ee as default};
