import{d as t,r as a,j as e,m as d,L as k}from"./index-BEG99lLj.js";const j=t.button`
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
`,z=t.button`
  background: #ff9800;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  margin-top: 5px;
  display: block;
`,I=t.div`
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 10px;
  border-radius: 8px;
  font-size: 14px;
  margin-top: 5px;
  max-width: 300px;
  word-break: break-word;
`,$=()=>{const[o,s]=a.useState(null),[c,i]=a.useState(!1),[p,n]=a.useState("დეტექტირება..."),[m,u]=a.useState(!1),[b,w]=a.useState("");a.useEffect(()=>{console.log("InstallPWA component mounted"),window.matchMedia("(display-mode: standalone)").matches?(console.log("App is already installed"),i(!0),n("აპლიკაცია უკვე დაინსტალირებულია")):(console.log("App is not installed yet"),n("არ არის დაინსტალირებული, ველოდებით beforeinstallprompt ივენთს"));const r=l=>{l.preventDefault(),console.log("🟢 beforeinstallprompt fired successfully"),s(l),n("ინსტალაციის მზადყოფნა")};window.addEventListener("beforeinstallprompt",r);const g=navigator.userAgent;return console.log("Browser details:",g),w(`
      Browser: ${g}
      Protocol: ${window.location.protocol}
      Hostname: ${window.location.hostname}
      Path: ${window.location.pathname}
      Hash: ${window.location.hash}
      Service Worker: ${"serviceWorker"in navigator?"Supported":"Not Supported"}
      Display Mode: ${window.matchMedia("(display-mode: standalone)").matches?"Standalone":"Browser"}
    `),window.addEventListener("appinstalled",()=>{i(!0),s(null),console.log("PWA was installed"),n("PWA დაინსტალირდა წარმატებით")}),(async()=>{try{if(window.location.protocol!=="https:"&&(console.log("⚠️ Not using HTTPS"),n("PWA requires HTTPS")),document.querySelectorAll('link[rel="manifest"]').length===0?(console.log("⚠️ No manifest found"),n("მანიფესტი ვერ მოიძებნა")):console.log("✅ Manifest found"),"serviceWorker"in navigator){const f=await navigator.serviceWorker.getRegistrations();f.length===0?(console.log("⚠️ No service worker registered"),n("სერვის ვორკერი არ არის რეგისტრირებული")):console.log("✅ Service worker registered:",f)}}catch(l){console.error("Error checking installability:",l)}})(),()=>{window.removeEventListener("beforeinstallprompt",r)}},[]);const y=async()=>{if(!o){console.log("⚠️ No installation prompt available"),n("ინსტალაციის პრომპტი არ არის ხელმისაწვდომი");return}try{console.log("Triggering install prompt"),n("ინსტალაციის პროცესი დაიწყო"),await o.prompt(),(await o.userChoice).outcome==="accepted"?(console.log("User accepted the install prompt"),n("მომხმარებელმა დაადასტურა ინსტალაცია")):(console.log("User dismissed the install prompt"),n("მომხმარებელმა უარყო ინსტალაცია")),s(null)}catch(r){console.error("Error installing PWA:",r),n(`შეცდომა: ${r}`)}},v=()=>{console.log("Navigator details:",{standalone:window.matchMedia("(display-mode: standalone)").matches,serviceWorker:"serviceWorker"in navigator,userAgent:navigator.userAgent}),u(!m),n(m?"დეტალების ჩვენება":"დეტალების დამალვა")};return e.jsxs("div",{children:[o&&!c&&e.jsx(j,{onClick:y,children:"დააინსტალირეთ აპლიკაცია"}),e.jsx(z,{onClick:v,children:p}),m&&e.jsx(I,{children:b})]})};d`
  from { 
    opacity: 0;
    transform: translateY(10px);
  }
  to { 
    opacity: 1;
    transform: translateY(0);
  }
`;const h=d`
  0% { background-position: 0% 50%; }
  100% { background-position: 100% 50%; }
`,A=d`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.2); }
`,P=d`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`,S=t.div`
  position: fixed;
  inset: 0;
  background: linear-gradient(-45deg, #64ccf0, #80d0c7, #56bcbd, #52b69a);
  background-size: 200% 200%;
  animation: ${h} 10s linear infinite;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  contain: content;
`,W=t.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  background: rgba(255, 255, 255, 0.1);
  padding: 40px;
  border-radius: 20px;
  backdrop-filter: blur(8px);
  contain: content;
`,L=t.div`
  font-size: 4rem;
  margin-bottom: 20px;
`,D=t.div`
  color: white;
  font-size: 1.5rem;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  margin-bottom: 20px;
  transform: translateZ(0);
  will-change: transform;
  backface-visibility: hidden;
  -webkit-font-smoothing: antialiased;
`,E=t.div`
  display: flex;
  gap: 12px;
  padding: 10px;
`,x=t.div`
  width: 12px;
  height: 12px;
  background: linear-gradient(145deg, #ffffff, #f3f3f3);
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1),
              inset 2px 2px 4px rgba(255, 255, 255, 0.5),
              inset -2px -2px 4px rgba(0, 0, 0, 0.05);
  animation: ${P} 1.5s ease-in-out infinite,
             ${A} 1.5s ease-in-out infinite;
  animation-delay: ${o=>o.$delay}s;
  transform-origin: center;
  will-change: transform;

  &:nth-child(2) {
    animation-delay: ${o=>o.$delay+.2}s;
  }

  &:nth-child(3) {
    animation-delay: ${o=>o.$delay+.4}s;
  }
`,T=t.div`
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
  animation: ${h} 10s linear infinite;
  overflow: auto;
`,C=t.div`
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
`,B=t.h1`
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
`,G=t.div`
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
`,N=t(k)`
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
`,Y=t.span`
  font-size: 2.5rem;
  margin-bottom: 10px;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`,H=t.h3`
  font-size: 1rem;
  text-align: center;
  font-weight: 500;
  margin: 0;
  padding: 0 5px;
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`,M=t.div`
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
`,F=()=>{const[o,s]=a.useState(!0),c=[{path:"tasks",title:"სახალისო ამოცანები",icon:"🎯"},{path:"puzzle",title:"ფაზლი",icon:"🧩"},{path:"scramble",title:"აზროვნების სავარჯიშო",icon:"🔤"},{path:"memory",title:"მეხსიერების სავარჯიშო",icon:"🧠"},{path:"labyrinth",title:"ლაბირინთი",icon:"🎮"},{path:"attention",title:"ყურადღების განვითარების სავარჯიშო",icon:"👀"},{path:"perception",title:"აღქმის სავარჯიშო",icon:"🖼️"}];return a.useEffect(()=>{const i=setTimeout(()=>{s(!1)},480);return()=>clearTimeout(i)},[]),o?e.jsx(S,{children:e.jsxs(W,{children:[e.jsx(L,{children:"🎮"}),e.jsx(D,{children:"იტვირთება"}),e.jsxs(E,{children:[e.jsx(x,{$delay:0}),e.jsx(x,{$delay:.2}),e.jsx(x,{$delay:.4})]})]})}):e.jsxs(T,{children:[e.jsxs(C,{children:[e.jsx(B,{children:"შემეცნებითი უნარების სავარჯიშოები"}),e.jsx(G,{children:c.map((i,p)=>e.jsxs(N,{to:i.path,children:[e.jsx(Y,{children:i.icon}),e.jsx(H,{children:i.title})]},p))})]}),e.jsx(M,{children:e.jsx($,{})})]})};export{F as default};
