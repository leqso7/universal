import{d as t,r as s,j as e,m as d,L as m}from"./index-CX7x3X3E.js";let a=null;window.addEventListener("beforeinstallprompt",o=>{o.preventDefault(),console.log("🟢 beforeinstallprompt ივენთი დაფიქსირდა და შენახულია"),a=o});const p=t.button`
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
      content: "დააინსტალირეთ აპლიკაცია და გამოიყენეთ ინტერნეტის გარეშე";
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
`;t.button`
  background: #ff9800;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  margin-top: 5px;
  display: block;
`;t.div`
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 10px;
  border-radius: 8px;
  font-size: 14px;
  margin-top: 5px;
  max-width: 300px;
  word-break: break-word;
`;t(p)`
  background: #2196F3;

  &:hover {
    background: #0b7dda;
  }
`;const g=()=>{const[o,i]=s.useState(!1);s.useEffect(()=>{if(window.matchMedia("(display-mode: standalone)").matches){console.log("აპლიკაცია უკვე დაინსტალირებულია"),i(!0);return}window.addEventListener("appinstalled",()=>{console.log("აპლიკაცია დაინსტალირდა"),i(!0),a=null});const n=r=>{r.preventDefault(),console.log("beforeinstallprompt ივენთი დაფიქსირდა კომპონენტში"),a=r};window.addEventListener("beforeinstallprompt",n);try{window.chrome&&window.chrome.webstore&&(console.log("ვცდილობთ ხელით გამოვიწვიოთ ბრაუზერის ჩაშენებული ღილაკი"),window.chrome.webstore.install())}catch(r){console.error("შეცდომა ბრაუზერის ჩაშენებული ღილაკის გამოწვევისას:",r)}return()=>{window.removeEventListener("beforeinstallprompt",n)}},[]);const l=async()=>{if(a){console.log("გამოვიყენებთ შენახულ deferredPrompt-ს");try{a.prompt();const{outcome:n}=await a.userChoice;console.log(`მომხმარებელმა აირჩია: ${n}`),a=null}catch(n){console.error("შეცდომა deferredPrompt-ის გამოყენებისას:",n)}}else{console.log("deferredPrompt არ არის ხელმისაწვდომი, ვცდილობთ ხელით გამოვიწვიოთ ბრაუზერის ჩაშენებული ღილაკი");try{window.chrome&&window.chrome.webstore?window.chrome.webstore.install():alert(`
            PWA-ს დასაინსტალირებლად:
            
            1. Chrome-ში: დააჭირეთ მისამართის ველის მარჯვენა მხარეს ინსტალაციის ღილაკს ან მენიუს ღილაკს (სამი წერტილი) და აირჩიეთ 'დააინსტალირე აპლიკაცია'
            2. Safari-ში (iOS): დააჭირეთ 'გაზიარება' ღილაკს და აირჩიეთ 'დაამატე მთავარ ეკრანზე'
            3. Edge-ში: დააჭირეთ მენიუს ღილაკს (სამი წერტილი) და აირჩიეთ 'დააინსტალირე'
          `)}catch(n){console.error("შეცდომა ბრაუზერის ჩაშენებული ღილაკის გამოწვევისას:",n),alert(`
          PWA-ს დასაინსტალირებლად:
          
          1. Chrome-ში: დააჭირეთ მისამართის ველის მარჯვენა მხარეს ინსტალაციის ღილაკს ან მენიუს ღილაკს (სამი წერტილი) და აირჩიეთ 'დააინსტალირე აპლიკაცია'
          2. Safari-ში (iOS): დააჭირეთ 'გაზიარება' ღილაკს და აირჩიეთ 'დაამატე მთავარ ეკრანზე'
          3. Edge-ში: დააჭირეთ მენიუს ღილაკს (სამი წერტილი) და აირჩიეთ 'დააინსტალირე'
        `)}}};return o?null:e.jsx(p,{className:"pwa-install-button",onClick:l,children:"დააინსტალირეთ აპლიკაცია"})};d`
  from { 
    opacity: 0;
    transform: translateY(10px);
  }
  to { 
    opacity: 1;
    transform: translateY(0);
  }
`;const x=d`
  0% { background-position: 0% 50%; }
  100% { background-position: 100% 50%; }
`,f=d`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.2); }
`,h=d`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`,b=t.div`
  position: fixed;
  inset: 0;
  background: linear-gradient(-45deg, #64ccf0, #80d0c7, #56bcbd, #52b69a);
  background-size: 200% 200%;
  animation: ${x} 10s linear infinite;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  contain: content;
`,u=t.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  background: rgba(255, 255, 255, 0.1);
  padding: 40px;
  border-radius: 20px;
  backdrop-filter: blur(8px);
  contain: content;
`,w=t.div`
  font-size: 4rem;
  margin-bottom: 20px;
`,y=t.div`
  color: white;
  font-size: 1.5rem;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  margin-bottom: 20px;
  transform: translateZ(0);
  will-change: transform;
  backface-visibility: hidden;
  -webkit-font-smoothing: antialiased;
`,v=t.div`
  display: flex;
  gap: 12px;
  padding: 10px;
`,c=t.div`
  width: 12px;
  height: 12px;
  background: linear-gradient(145deg, #ffffff, #f3f3f3);
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1),
              inset 2px 2px 4px rgba(255, 255, 255, 0.5),
              inset -2px -2px 4px rgba(0, 0, 0, 0.05);
  animation: ${h} 1.5s ease-in-out infinite,
             ${f} 1.5s ease-in-out infinite;
  animation-delay: ${o=>o.$delay}s;
  transform-origin: center;
  will-change: transform;

  &:nth-child(2) {
    animation-delay: ${o=>o.$delay+.2}s;
  }

  &:nth-child(3) {
    animation-delay: ${o=>o.$delay+.4}s;
  }
`,k=t.div`
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
  animation: ${x} 10s linear infinite;
  overflow: auto;
`,j=t.div`
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
`,z=t.h1`
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
`,$=t.div`
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
`,L=t(m)`
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
`,P=t.span`
  font-size: 2.5rem;
  margin-bottom: 10px;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`,I=t.h3`
  font-size: 1rem;
  text-align: center;
  font-weight: 500;
  margin: 0;
  padding: 0 5px;
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`,C=t.div`
  position: fixed;
  left: 20px;
  bottom: 20px;
  z-index: 1000;
  filter: drop-shadow(0 0 10px rgba(76, 175, 80, 0.7));
  transform: scale(1.1);
`,G=()=>{const[o,i]=s.useState(!0),l=[{path:"tasks",title:"სახალისო ამოცანები",icon:"🎯"},{path:"puzzle",title:"ფაზლი",icon:"🧩"},{path:"scramble",title:"აზროვნების სავარჯიშო",icon:"🔤"},{path:"memory",title:"მეხსიერების სავარჯიშო",icon:"🧠"},{path:"labyrinth",title:"ლაბირინთი",icon:"🎮"},{path:"attention",title:"ყურადღების განვითარების სავარჯიშო",icon:"👀"},{path:"perception",title:"აღქმის სავარჯიშო",icon:"🖼️"}];return s.useEffect(()=>{const n=setTimeout(()=>{i(!1)},480);return()=>clearTimeout(n)},[]),o?e.jsx(b,{children:e.jsxs(u,{children:[e.jsx(w,{children:"🎮"}),e.jsx(y,{children:"იტვირთება"}),e.jsxs(v,{children:[e.jsx(c,{$delay:0}),e.jsx(c,{$delay:.2}),e.jsx(c,{$delay:.4})]})]})}):e.jsxs(k,{children:[e.jsxs(j,{children:[e.jsx(z,{children:"შემეცნებითი უნარების სავარჯიშოები"}),e.jsx($,{children:l.map((n,r)=>e.jsxs(L,{to:n.path,children:[e.jsx(P,{children:n.icon}),e.jsx(I,{children:n.title})]},r))})]}),e.jsx(C,{children:e.jsx(g,{})})]})};export{G as default};
