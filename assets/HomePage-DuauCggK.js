import{d as e,r as s,j as t,m as l,L as h}from"./index-tGxMpH2D.js";let a=null;window.addEventListener("beforeinstallprompt",n=>{n.preventDefault(),console.log("🟢 beforeinstallprompt ივენთი დაფიქსირდა და შენახულია"),a=n});const m=e.button`
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
`;e.button`
  background: #ff9800;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  margin-top: 5px;
  display: block;
`;e.div`
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 10px;
  border-radius: 8px;
  font-size: 14px;
  margin-top: 5px;
  max-width: 300px;
  word-break: break-word;
`;e(m)`
  background: #2196F3;

  &:hover {
    background: #0b7dda;
  }
`;const b=()=>{const[n,o]=s.useState(!1),[r,i]=s.useState(!1);s.useEffect(()=>{if(window.matchMedia("(display-mode: standalone)").matches){console.log("აპლიკაცია უკვე დაინსტალირებულია"),i(!0);return}a&&o(!0),window.addEventListener("appinstalled",()=>{console.log("აპლიკაცია დაინსტალირდა"),i(!0),o(!1),a=null});const d=x=>{x.preventDefault(),console.log("beforeinstallprompt ივენთი დაფიქსირდა კომპონენტში"),a=x,o(!0)};window.addEventListener("beforeinstallprompt",d);const g=setInterval(()=>{a&&!r&&o(!0)},2e3);return()=>{window.removeEventListener("beforeinstallprompt",d),clearInterval(g)}},[r]);const p=async()=>{if(!a){console.log("დაინსტალირების პრომპტი არ არის ხელმისაწვდომი");return}a.prompt();const{outcome:d}=await a.userChoice;console.log(`მომხმარებელმა აირჩია: ${d}`),a=null,o(!1)};return r||!n?null:t.jsx(m,{onClick:p,children:"დააინსტალირეთ აპლიკაცია"})};l`
  from { 
    opacity: 0;
    transform: translateY(10px);
  }
  to { 
    opacity: 1;
    transform: translateY(0);
  }
`;const f=l`
  0% { background-position: 0% 50%; }
  100% { background-position: 100% 50%; }
`,u=l`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.2); }
`,w=l`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`,v=e.div`
  position: fixed;
  inset: 0;
  background: linear-gradient(-45deg, #64ccf0, #80d0c7, #56bcbd, #52b69a);
  background-size: 200% 200%;
  animation: ${f} 10s linear infinite;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  contain: content;
`,y=e.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  background: rgba(255, 255, 255, 0.1);
  padding: 40px;
  border-radius: 20px;
  backdrop-filter: blur(8px);
  contain: content;
`,k=e.div`
  font-size: 4rem;
  margin-bottom: 20px;
`,j=e.div`
  color: white;
  font-size: 1.5rem;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  margin-bottom: 20px;
  transform: translateZ(0);
  will-change: transform;
  backface-visibility: hidden;
  -webkit-font-smoothing: antialiased;
`,z=e.div`
  display: flex;
  gap: 12px;
  padding: 10px;
`,c=e.div`
  width: 12px;
  height: 12px;
  background: linear-gradient(145deg, #ffffff, #f3f3f3);
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1),
              inset 2px 2px 4px rgba(255, 255, 255, 0.5),
              inset -2px -2px 4px rgba(0, 0, 0, 0.05);
  animation: ${w} 1.5s ease-in-out infinite,
             ${u} 1.5s ease-in-out infinite;
  animation-delay: ${n=>n.$delay}s;
  transform-origin: center;
  will-change: transform;

  &:nth-child(2) {
    animation-delay: ${n=>n.$delay+.2}s;
  }

  &:nth-child(3) {
    animation-delay: ${n=>n.$delay+.4}s;
  }
`,I=e.div`
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
  animation: ${f} 10s linear infinite;
  overflow: auto;
`,$=e.div`
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
`,L=e.h1`
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
`,C=e.div`
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
`,E=e(h)`
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
`,P=e.span`
  font-size: 2.5rem;
  margin-bottom: 10px;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`,G=e.h3`
  font-size: 1rem;
  text-align: center;
  font-weight: 500;
  margin: 0;
  padding: 0 5px;
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`,Y=e.div`
  position: fixed;
  left: 20px;
  bottom: 20px;
  z-index: 1000;
  filter: drop-shadow(0 0 10px rgba(76, 175, 80, 0.7));
  transform: scale(1.1);
`,T=()=>{const[n,o]=s.useState(!0),r=[{path:"tasks",title:"სახალისო ამოცანები",icon:"🎯"},{path:"puzzle",title:"ფაზლი",icon:"🧩"},{path:"scramble",title:"აზროვნების სავარჯიშო",icon:"🔤"},{path:"memory",title:"მეხსიერების სავარჯიშო",icon:"🧠"},{path:"labyrinth",title:"ლაბირინთი",icon:"🎮"},{path:"attention",title:"ყურადღების განვითარების სავარჯიშო",icon:"👀"},{path:"perception",title:"აღქმის სავარჯიშო",icon:"🖼️"}];return s.useEffect(()=>{const i=setTimeout(()=>{o(!1)},480);return()=>clearTimeout(i)},[]),n?t.jsx(v,{children:t.jsxs(y,{children:[t.jsx(k,{children:"🎮"}),t.jsx(j,{children:"იტვირთება"}),t.jsxs(z,{children:[t.jsx(c,{$delay:0}),t.jsx(c,{$delay:.2}),t.jsx(c,{$delay:.4})]})]})}):t.jsxs(I,{children:[t.jsxs($,{children:[t.jsx(L,{children:"შემეცნებითი უნარების სავარჯიშოები"}),t.jsx(C,{children:r.map((i,p)=>t.jsxs(E,{to:i.path,children:[t.jsx(P,{children:i.icon}),t.jsx(G,{children:i.title})]},p))})]}),t.jsx(Y,{children:t.jsx(b,{})})]})};export{T as default};
