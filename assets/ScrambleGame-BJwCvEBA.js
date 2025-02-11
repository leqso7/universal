import{m as v,d as m,u as na,r,j as i,H as ia}from"./index-BDG3-fuF.js";import{N as sa}from"./NameModal-CvvKyf5G.js";import{z as ra,s as oa,l as ma,d as la,m as pa,i as ca,t as da,k as ga,f as xa,a as ha,c as fa,e as ua,b as ba,g as wa,q as va,o as Ia,r as ja,h as ya,j as ka,n as Sa,p as za,u as Ma,v as Ca,w as Ta,x as Aa,y as La,A as Na,B as Da,C as Ga,D as Pa,E as Ea,F as $a,G as Ba,H as Ya,I as Oa,J as Ra,K as Za,L as qa}from"./არწივი-B6yRfamE.js";const p=[{name:"ზებრა",image:ra},{name:"სპილო",image:oa},{name:"ლომი",image:ma},{name:"დათვი",image:la},{name:"მგელი",image:pa},{name:"ირემი",image:ca},{name:"თხა",image:da},{name:"კურდღელი",image:ga},{name:"ფლამინგო",image:xa},{name:"სელაპი",image:ha},{name:"ციყვი",image:fa},{name:"ენოტი",image:ua},{name:"ზარმაცა",image:ba},{name:"ზღარბი",image:wa},{name:"ქამელეონი",image:va},{name:"ოპოსუმი",image:Ia},{name:"რვაფეხა",image:ja},{name:"თახვი",image:ya},{name:"ბეგემოტი",image:ka},{name:"ლამა",image:Sa},{name:"ჟირაფი",image:za},{name:"კენგურუ",image:Ma},{name:"ბუ",image:Ca},{name:"პანდა",image:Ta},{name:"მელია",image:Aa},{name:"დელფინი",image:La},{name:"კოალა",image:Na},{name:"პინგვინი",image:Da},{name:"კიბორჩხალა",image:Ga},{name:"ობობა",image:Pa},{name:"გველი",image:Ea},{name:"ხვლიკი",image:$a},{name:"ზვიგენი",image:Ba},{name:"ფარშევანგი",image:Ya},{name:"კოდალა",image:Oa},{name:"აქლემი",image:Ra},{name:"პეპელა",image:Za},{name:"არწივი",image:qa}],Ha=v`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`,Fa=v`
  from { opacity: 1; transform: translateY(0); }
  to { opacity: 0; transform: translateY(-20px); }
`,Wa=v`
  0% {
    transform: translate(-50%, -50%) scale(0.3);
    opacity: 0;
  }
  50% {
    transform: translate(-50%, -50%) scale(1.1);
    opacity: 0.8;
  }
  70% {
    transform: translate(-50%, -50%) scale(0.9);
    opacity: 0.9;
  }
  100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }
`,Ja=m.div`
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(76, 175, 80, 0.9);
  color: white;
  padding: 1rem 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  z-index: 1000;
  animation: ${l=>l.isClosing?Fa:Ha} 0.5s ease forwards;
  backdrop-filter: blur(10px);
`;m.div`
  position: relative;
`;const Ka=m.div`
  position: fixed;
  top: 50vh;
  left: 50vw;
  transform: translate(-50%, -50%);
  background: rgba(76, 175, 80, 0.95);
  color: white;
  padding: 3rem 4rem;
  border-radius: 1.5rem;
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  z-index: 1000;
  animation: ${Wa} 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
  backdrop-filter: blur(10px);
  min-width: 400px;
  max-width: 90vw;

  span {
    display: block;
    font-size: 4rem;
    margin-top: 1.5rem;
    animation: bounce 1s ease infinite;
  }

  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }

  @media (max-width: 768px) {
    font-size: 1.5rem;
    padding: 2rem 3rem;
    min-width: 300px;

    span {
      font-size: 3rem;
    }
  }
`,Xa=m.div`
  position: fixed;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(-45deg, 
    rgba(100, 204, 240, 0.8), 
    rgba(128, 208, 199, 0.8), 
    rgba(86, 188, 189, 0.8), 
    rgba(82, 182, 154, 0.8)
  );
  background-size: 400% 400%;
  animation: gradientBG 15s ease infinite;
  overflow-y: auto;
  overflow-x: hidden;
  padding-bottom: calc(env(safe-area-inset-bottom) + 60px);

  @media (max-height: 800px) {
    padding-bottom: calc(env(safe-area-inset-bottom) + 70px);
  }

  @media (max-height: 700px) {
    padding-bottom: calc(env(safe-area-inset-bottom) + 80px);
  }

  @media (max-height: 600px) {
    padding-bottom: calc(env(safe-area-inset-bottom) + 90px);
  }
`,_a=m.div`
  width: 100%;
  max-width: min(600px, 90vw);
  background: rgba(255, 255, 255, 0.9);
  border-radius: clamp(10px, 3vw, 20px);
  padding: clamp(8px, 2vw, 15px);
  display: flex;
  flex-direction: column;
  gap: clamp(8px, 2vw, 15px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 0 auto;

  @media (max-width: 480px) {
    padding: 8px;
    gap: 8px;
    max-width: 95vw;
  }
`,Qa=m.div`
  width: 100%;
  max-width: 400px;
  margin: 20px auto;
  padding: 10px;
  background: white;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  img {
    width: 100%;
    height: auto;
    border-radius: 10px;
    max-height: calc(100vh - 400px);
    object-fit: contain;
  }

  @media (max-height: 700px) {
    margin: 10px auto;
    padding: 8px;
  }

  @media (max-height: 600px) {
    margin: 5px auto;
    padding: 5px;
  }
`,Ua=m.div`
  width: 100%;
  max-width: min(800px, 95vw);
  margin: 0 auto;
  padding: 10px;
  transform: scale(${l=>l.scale});
  transform-origin: center top;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: calc(100vh - 120px);
  justify-content: flex-start;
  
  @media (max-height: 800px) {
    min-height: calc(100vh - 140px);
  }

  @media (max-height: 700px) {
    min-height: calc(100vh - 160px);
  }

  @media (max-height: 600px) {
    min-height: calc(100vh - 180px);
  }

  .progress-container {
    margin-bottom: clamp(3px, 1vw, 5px);
    font-size: clamp(14px, 3vw, 16px);
  }

  .game-title {
    margin: 5px 0;
    font-size: clamp(1.2em, 4vw, 1.8em);
    text-align: center;
  }

  .game-instructions {
    margin: 0;
    font-size: clamp(0.8em, 3vw, 1em);
    text-align: center;
  }

  @media (max-width: 480px) {
    padding: 5px;
    gap: 8px;
  }
`,Va=m.div`
  display: flex;
  flex-wrap: wrap;
  gap: clamp(4px, 1.5vw, 8px);
  justify-content: center;
  margin: clamp(5px, 1.5vw, 10px) auto;
  width: 100%;
  padding: clamp(8px, 2vw, 15px);
  background: rgba(135, 206, 235, 0.3);
  border-radius: clamp(8px, 2vw, 15px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  .letter {
    width: clamp(30px, 7vw, 40px);
    height: clamp(30px, 7vw, 40px);
    font-size: clamp(16px, 4vw, 22px);
    background: white;
    border: 2px solid #87CEEB;
    border-radius: clamp(4px, 1vw, 8px);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 480px) {
    gap: 4px;
    padding: 8px;
    
    .letter {
      width: clamp(28px, 6vw, 35px);
      height: clamp(28px, 6vw, 35px);
      font-size: clamp(14px, 3.5vw, 20px);
    }
  }
`,ae=m.div`
  display: flex;
  gap: clamp(4px, 1vw, 8px);
  justify-content: center;
  margin: clamp(5px, 1.5vw, 10px) auto;
  padding: clamp(8px, 2vw, 15px);
  background: rgba(135, 206, 235, 0.3);
  border-radius: clamp(8px, 2vw, 15px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  flex-wrap: wrap;

  .letter-slot {
    width: clamp(30px, 7vw, 40px);
    height: clamp(30px, 7vw, 40px);
    font-size: clamp(16px, 4vw, 22px);
    background: white;
    border: 2px dashed #87CEEB;
    border-radius: clamp(4px, 1vw, 8px);
    display: flex;
    align-items: center;
    justify-content: center;
    
    &.filled {
      border-style: solid;
    }
    
    &.correct {
      border-color: #4CAF50;
      background: rgba(76, 175, 80, 0.1);
    }
    
    &.wrong {
      border-color: #f44336;
      background: rgba(244, 67, 54, 0.1);
    }
  }

  @media (max-width: 480px) {
    gap: 4px;
    padding: 8px;
    
    .letter-slot {
      width: clamp(28px, 6vw, 35px);
      height: clamp(28px, 6vw, 35px);
      font-size: clamp(14px, 3.5vw, 20px);
    }
  }
`,ee=m.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: flex;
  gap: clamp(5px, 1.5vw, 10px);
  z-index: 1000;
`,G=m.button`
  width: clamp(35px, 8vw, 40px);
  height: clamp(35px, 8vw, 40px);
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.9);
  color: #333;
  font-size: clamp(16px, 4vw, 20px);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  
  &:hover {
    background: rgba(255, 255, 255, 1);
    transform: scale(1.1);
  }

  @media (max-width: 480px) {
    width: 35px;
    height: 35px;
    font-size: 16px;
  }
`,P=l=>{const b=l.split("");let e=Array.from({length:l.length},(n,c)=>c);for(let n=0;n<l.length;n++)if(e[n]===n){for(let t=n+1;t<l.length;t++)if(e[t]!==n){[e[n],e[t]]=[e[t],e[n]];break}if(e[n]===n){for(let t=n-1;t>=0;t--)if(e[t]!==t){[e[n],e[t]]=[e[t],e[n]];break}}}return e.map((n,c)=>({id:`letter-${c}`,content:b[n],originalIndex:n}))},re=()=>{var D;const{playerName:l,showNameModal:b,gameProgress:e,updateGameProgress:n,updatePlayerName:c}=na(),[t,E]=r.useState(()=>{const a=p.filter(s=>{var o;return!((o=e==null?void 0:e.completedScrambleTasks)!=null&&o.includes(s.name))});return a.length>0?a[Math.floor(Math.random()*a.length)]:p[Math.floor(Math.random()*p.length)]}),[I,j]=r.useState(()=>t?P(t.name):[]),[y,k]=r.useState(()=>t?Array(t.name.length).fill(null):[]),[$,S]=r.useState([]),[B,z]=r.useState(null),[te,M]=r.useState(!1);r.useRef(null),r.useRef(null);const[x,Y]=r.useState(null),[O,C]=r.useState(!1),[R,Z]=r.useState(""),[q,T]=r.useState(!1),[H,A]=r.useState(!1),[L,F]=r.useState(""),[W,N]=r.useState(1),w=a=>{E(a),j(P(a.name)),k(Array(a.name.length).fill(null)),S([])},J=(a,s,o)=>{s&&(Y({letter:s,index:o}),a.target.classList.add("dragging"))},K=a=>{a.preventDefault()},X=()=>{const a=[{text:"ყოჩაღ! შესანიშნავად გაართვი თავი! 🌟",emoji:"🎉"},{text:"ბრავო! ძალიან კარგად შეასრულე! 🏆",emoji:"⭐"},{text:"არაჩვეულებრივია! გააგრძელე ასე! 🌈",emoji:"🌟"},{text:"საოცარი ხარ! კიდევ ერთი წარმატება! 🎯",emoji:"🏆"},{text:"შესანიშნავია! ნამდვილი გენიოსი ხარ! 🎨",emoji:"✨"}];return a[Math.floor(Math.random()*a.length)]},_=(a,s)=>{if(a.preventDefault(),!x)return;if(x.letter.content!==t.name[s]){z(s),setTimeout(()=>{z(null)},500);return}const o=[...y],h=[...I];o[s]=x.letter,h.splice(x.index,1),k(o),j(h);const d=[];if(o.forEach((g,f)=>{g&&g.content===t.name[f]&&d.push(f)}),S(d),d.length===t.name.length){const g=[...e.completedScrambleTasks,t.name];n("scramble",g,{...e.scrambleScores,[t.name]:3});const f=X();F(f),A(!0),setTimeout(()=>{if(A(!1),g.length===p.length){Q("გილოცავთ! თქვენ ყველა ამოცანა შეასრულეთ! 🎉"),n("scramble",[],{});const u=p[Math.floor(Math.random()*p.length)];w(u)}else{const u=p.filter(ta=>!g.includes(ta.name)),aa=Math.floor(Math.random()*u.length),ea=u[aa];w(ea)}},5e3)}},Q=a=>{Z(a),C(!0),setTimeout(()=>{T(!0),setTimeout(()=>{C(!1),T(!1)},500)},3e3)},U=()=>{N(a=>Math.min(a+.1,1.5))},V=()=>{N(a=>Math.max(a-.1,.5))};return r.useEffect(()=>{(()=>{const s=p.filter(h=>{var d;return!((d=e==null?void 0:e.completedScrambleTasks)!=null&&d.includes(h.name))});if(s.length===0){M(!1);return}const o=s[Math.floor(Math.random()*s.length)];w(o),M(!0)})()},[]),i.jsxs(Xa,{children:[i.jsx(ia,{}),i.jsxs(Ua,{scale:W,children:[i.jsx("div",{className:"progress-container",children:i.jsxs("span",{className:"progress-text",children:["შესრულებულია: ",((D=e==null?void 0:e.completedScrambleTasks)==null?void 0:D.length)||0," / 50"]})}),i.jsx("p",{className:"game-instructions",children:"გადმოიტანე ასოები და ჩასვი სწორ ადგილას"}),i.jsxs(_a,{children:[i.jsx(Qa,{children:i.jsx("img",{src:t.image,alt:t.name})}),i.jsx(ae,{children:y.map((a,s)=>i.jsx("div",{className:`letter-slot ${$.includes(s)?"correct":""} 
                          ${a?"filled":""} 
                          ${B===s?"wrong":""}`,onDragOver:K,onDrop:o=>_(o,s),children:a&&a.content},s))}),i.jsx(Va,{children:I.map((a,s)=>i.jsx("div",{"data-id":a.id,className:"letter",draggable:!0,onDragStart:o=>J(o,a,s),children:a.content},a.id))})]})]}),i.jsxs(ee,{children:[i.jsx(G,{onClick:V,children:"-"}),i.jsx(G,{onClick:U,children:"+"})]}),b&&i.jsx(sa,{onSubmit:c}),O&&i.jsx(Ja,{isClosing:q,children:R}),H&&i.jsxs(Ka,{children:[L.text,i.jsx("span",{children:L.emoji})]})]})};export{re as default};
