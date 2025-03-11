import{d as t,r as i,j as e,m as g,L as P}from"./index-Bk4ltbmF.js";const u=t.button`
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
`,W=t.button`
  background: #ff9800;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  margin-top: 5px;
  display: block;
`,E=t.div`
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 10px;
  border-radius: 8px;
  font-size: 14px;
  margin-top: 5px;
  max-width: 300px;
  word-break: break-word;
`,L=t(u)`
  background: #2196F3;

  &:hover {
    background: #0b7dda;
  }
`,C=()=>{const[o,p]=i.useState(null),[m,r]=i.useState(!1),[f,n]=i.useState("დეტექტირება..."),[x,v]=i.useState(!1),[j,I]=i.useState(""),[b,$]=i.useState(!1);i.useEffect(()=>{console.log("InstallPWA component mounted"),window.matchMedia("(display-mode: standalone)").matches?(console.log("App is already installed"),r(!0),n("აპლიკაცია უკვე დაინსტალირებულია")):(console.log("App is not installed yet"),n("არ არის დაინსტალირებული, ველოდებით beforeinstallprompt ივენთს"));const c=a=>{a.preventDefault(),console.log("🟢 beforeinstallprompt fired successfully"),p(a),n("ინსტალაციის მზადყოფნა")};window.addEventListener("beforeinstallprompt",c);const k=navigator.userAgent;return console.log("Browser details:",k),I(`
      Browser: ${k}
      Protocol: ${window.location.protocol}
      Hostname: ${window.location.hostname}
      Path: ${window.location.pathname}
      Hash: ${window.location.hash}
      Service Worker: ${"serviceWorker"in navigator?"Supported":"Not Supported"}
      Display Mode: ${window.matchMedia("(display-mode: standalone)").matches?"Standalone":"Browser"}
      Icons: ${Array.from(document.querySelectorAll('link[rel="icon"], link[rel="apple-touch-icon"]')).map(a=>a.href).join(", ")}
    `),window.addEventListener("appinstalled",()=>{r(!0),p(null),console.log("PWA was installed"),n("PWA დაინსტალირდა წარმატებით")}),(async()=>{try{window.location.protocol!=="https:"&&(console.log("⚠️ Not using HTTPS"),n("PWA requires HTTPS"));const a=document.querySelectorAll('link[rel="manifest"]');if(a.length===0)console.log("⚠️ No manifest found"),n("მანიფესტი ვერ მოიძებნა");else{console.log("✅ Manifest found");try{const s=a[0],l=await fetch(s.href);if(l.ok){const d=await l.json();console.log("Manifest content:",d)}else console.log("⚠️ Manifest fetch failed:",l.status)}catch(s){console.error("Error fetching manifest:",s)}}if("serviceWorker"in navigator){const s=await navigator.serviceWorker.getRegistrations();s.length===0?(console.log("⚠️ No service worker registered"),n("სერვის ვორკერი არ არის რეგისტრირებული")):console.log("✅ Service worker registered:",s)}const S=Array.from(document.querySelectorAll('link[rel="icon"], link[rel="apple-touch-icon"]'));for(const s of S){const l=s;try{const d=await fetch(l.href);d.ok?console.log(`✅ Icon at ${l.href} loaded successfully`):console.log(`⚠️ Icon at ${l.href} failed to load: ${d.status}`)}catch(d){console.error(`Error fetching icon at ${l.href}:`,d)}}}catch(a){console.error("Error checking installability:",a)}})(),()=>{window.removeEventListener("beforeinstallprompt",c)}},[]);const w=async()=>{if($(!0),!o){console.log("⚠️ No installation prompt available"),n("ინსტალაციის პრომპტი არ არის ხელმისაწვდომი");return}try{console.log("Triggering install prompt"),n("ინსტალაციის პროცესი დაიწყო"),await o.prompt(),(await o.userChoice).outcome==="accepted"?(console.log("User accepted the install prompt"),n("მომხმარებელმა დაადასტურა ინსტალაცია")):(console.log("User dismissed the install prompt"),n("მომხმარებელმა უარყო ინსტალაცია")),p(null)}catch(c){console.error("Error installing PWA:",c),n(`შეცდომა: ${c}`)}},A=()=>{console.log("Navigator details:",{standalone:window.matchMedia("(display-mode: standalone)").matches,serviceWorker:"serviceWorker"in navigator,userAgent:navigator.userAgent}),v(!x),n(x?"დეტალების ჩვენება":"დეტალების დამალვა")},z=()=>{alert(`
      PWA-ს დასაინსტალირებლად:
      
      1. Chrome-ში: დააჭირეთ მენიუს ღილაკს (სამი წერტილი) და აირჩიეთ 'დააინსტალირე აპლიკაცია'
      2. Safari-ში (iOS): დააჭირეთ 'გაზიარება' ღილაკს და აირჩიეთ 'დაამატე მთავარ ეკრანზე'
      3. Edge-ში: დააჭირეთ მენიუს ღილაკს (სამი წერტილი) და აირჩიეთ 'დააინსტალირე'
    `)};return e.jsxs("div",{children:[o&&!m&&e.jsx(u,{onClick:w,children:"დააინსტალირეთ აპლიკაცია"}),!o&&!m&&b&&e.jsx(L,{onClick:z,children:"მიიღეთ დაინსტალირების ინსტრუქცია"}),!m&&!b&&e.jsx(u,{onClick:w,children:"დააინსტალირეთ აპლიკაცია"}),e.jsx(W,{onClick:A,children:f}),x&&e.jsx(E,{children:j})]})};g`
  from { 
    opacity: 0;
    transform: translateY(10px);
  }
  to { 
    opacity: 1;
    transform: translateY(0);
  }
`;const y=g`
  0% { background-position: 0% 50%; }
  100% { background-position: 100% 50%; }
`,D=g`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.2); }
`,T=g`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`,M=t.div`
  position: fixed;
  inset: 0;
  background: linear-gradient(-45deg, #64ccf0, #80d0c7, #56bcbd, #52b69a);
  background-size: 200% 200%;
  animation: ${y} 10s linear infinite;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  contain: content;
`,B=t.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  background: rgba(255, 255, 255, 0.1);
  padding: 40px;
  border-radius: 20px;
  backdrop-filter: blur(8px);
  contain: content;
`,G=t.div`
  font-size: 4rem;
  margin-bottom: 20px;
`,N=t.div`
  color: white;
  font-size: 1.5rem;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  margin-bottom: 20px;
  transform: translateZ(0);
  will-change: transform;
  backface-visibility: hidden;
  -webkit-font-smoothing: antialiased;
`,Y=t.div`
  display: flex;
  gap: 12px;
  padding: 10px;
`,h=t.div`
  width: 12px;
  height: 12px;
  background: linear-gradient(145deg, #ffffff, #f3f3f3);
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1),
              inset 2px 2px 4px rgba(255, 255, 255, 0.5),
              inset -2px -2px 4px rgba(0, 0, 0, 0.05);
  animation: ${T} 1.5s ease-in-out infinite,
             ${D} 1.5s ease-in-out infinite;
  animation-delay: ${o=>o.$delay}s;
  transform-origin: center;
  will-change: transform;

  &:nth-child(2) {
    animation-delay: ${o=>o.$delay+.2}s;
  }

  &:nth-child(3) {
    animation-delay: ${o=>o.$delay+.4}s;
  }
`,H=t.div`
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
  animation: ${y} 10s linear infinite;
  overflow: auto;
`,q=t.div`
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
`,R=t.h1`
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
`,F=t.div`
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
`,U=t(P)`
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
`,O=t.span`
  font-size: 2.5rem;
  margin-bottom: 10px;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`,Z=t.h3`
  font-size: 1rem;
  text-align: center;
  font-weight: 500;
  margin: 0;
  padding: 0 5px;
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`,J=t.div`
  position: fixed;
  left: 20px;
  bottom: 20px;
  z-index: 1000;
  animation: pulse 2s infinite;
  
  @keyframes pulse {
    0% {
      transform: scale(1);
      box-shadow: 0 0 0 0 rgba(76, 175, 80, 0.4);
    }
    70% {
      transform: scale(1.05);
      box-shadow: 0 0 0 10px rgba(76, 175, 80, 0);
    }
    100% {
      transform: scale(1);
      box-shadow: 0 0 0 0 rgba(76, 175, 80, 0);
    }
  }
`,V=()=>{const[o,p]=i.useState(!0),m=[{path:"tasks",title:"სახალისო ამოცანები",icon:"🎯"},{path:"puzzle",title:"ფაზლი",icon:"🧩"},{path:"scramble",title:"აზროვნების სავარჯიშო",icon:"🔤"},{path:"memory",title:"მეხსიერების სავარჯიშო",icon:"🧠"},{path:"labyrinth",title:"ლაბირინთი",icon:"🎮"},{path:"attention",title:"ყურადღების განვითარების სავარჯიშო",icon:"👀"},{path:"perception",title:"აღქმის სავარჯიშო",icon:"🖼️"}];return i.useEffect(()=>{const r=setTimeout(()=>{p(!1)},480);return()=>clearTimeout(r)},[]),o?e.jsx(M,{children:e.jsxs(B,{children:[e.jsx(G,{children:"🎮"}),e.jsx(N,{children:"იტვირთება"}),e.jsxs(Y,{children:[e.jsx(h,{$delay:0}),e.jsx(h,{$delay:.2}),e.jsx(h,{$delay:.4})]})]})}):e.jsxs(H,{children:[e.jsxs(q,{children:[e.jsx(R,{children:"შემეცნებითი უნარების სავარჯიშოები"}),e.jsx(F,{children:m.map((r,f)=>e.jsxs(U,{to:r.path,children:[e.jsx(O,{children:r.icon}),e.jsx(Z,{children:r.title})]},f))})]}),e.jsx(J,{children:e.jsx(C,{})})]})};export{V as default};
