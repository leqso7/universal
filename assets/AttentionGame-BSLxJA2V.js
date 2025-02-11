import{d,r as l,u as J,a as K,j as s,H as Q}from"./index-DLJnbg7W.js";const U=d.div`
  position: fixed;
  inset: 0;
  margin: 0;
  padding: 1rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(-45deg, 
    rgba(100, 204, 240, 0.8), 
    rgba(128, 208, 199, 0.8), 
    rgba(86, 188, 189, 0.8), 
    rgba(82, 182, 154, 0.8)
  );
  background-size: 200% 200%;
  animation: gradientBG 10s linear infinite;
  overflow-y: auto;
  overflow-x: hidden;
  opacity: 1;
  visibility: visible;
  transition: opacity 0.3s ease, visibility 0.3s ease;

  &.loading {
    opacity: 0;
    visibility: hidden;
  }

  @media (max-height: 800px) {
    padding: 0.5rem;
  }

  @keyframes gradientBG {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
`,V=d.h2`
  font-size: clamp(1.2rem, 3vw, 1.5rem);
  color: #fff;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  margin: 0;
  text-align: center;
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  flex-wrap: wrap;

  span {
    font-size: clamp(2rem, 5vw, 2.5rem);
    display: inline-flex;
    align-items: center;
    vertical-align: middle;
  }
`,X=d.div`
  font-size: clamp(1.1rem, 2.8vw, 1.4rem);
  color: #fff;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  margin: 0;
  text-align: center;
  font-weight: 500;
`,Y=d.div`
  width: 100%;
  max-width: min(95vw, 600px);
  margin: 0 auto;
  padding: 10px;
  transform: scale(${e=>e.scale});
  transform-origin: center top;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 1.5vh;
  opacity: 1;
  visibility: visible;
  transition: all 0.3s ease;

  &.loading {
    opacity: 0;
    visibility: hidden;
  }

  @media (min-width: 1200px) {
    max-width: 550px;
    gap: 2vh;
  }

  @media (max-width: 768px) {
    padding: 5px;
    gap: 1vh;
  }

  @media (max-height: 800px) {
    gap: 1vh;
  }

  @media (max-height: 600px) {
    gap: 0.5vh;
  }
`;d.h1`
  font-size: clamp(1.2rem, 3vw, 1.8rem);
  color: #fff;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  margin: 0;
  text-align: center;
  padding-top: 1vh;
`;const _=d.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 3px;
  background: rgba(255, 255, 255, 0.9);
  padding: 8px;
  border-radius: 15px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  width: 95%;
  max-width: min(95vw, 500px);
  aspect-ratio: 1;
  margin: 1vh auto;

  @media (min-width: 1200px) {
    max-width: 480px;
    gap: 4px;
    padding: 10px;
  }

  @media (max-width: 768px) {
    gap: 2px;
    padding: 6px;
    width: 98%;
  }

  @media (max-width: 480px) {
    gap: 1px;
    padding: 4px;
    width: 100%;
  }

  @media (max-height: 800px) {
    max-width: min(95vw, 450px);
    padding: 6px;
  }

  @media (max-height: 600px) {
    max-width: min(95vw, 400px);
    padding: 4px;
    gap: 1px;
  }
`,tt=d.div`
  font-size: clamp(1rem, 2vw, 1.3rem);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 2px;
  border-radius: 6px;
  transition: all 0.2s ease;
  background-color: ${e=>e.isFound?"rgba(76, 175, 80, 0.2)":e.$isWrong?"rgba(244, 67, 54, 0.2)":"transparent"};
  aspect-ratio: 1;
  opacity: ${e=>e.$loading?"0":"1"};
  transform: scale(${e=>e.$loading?"0.95":"1"});
  transition: opacity 0.3s ease, transform 0.3s ease, background-color 0.2s ease;

  &:hover {
    background: ${e=>e.isFound?"rgba(76, 175, 80, 0.3)":e.$isWrong?"rgba(244, 67, 54, 0.3)":"rgba(0, 0, 0, 0.1)"};
    transform: scale(1.05);
  }

  @media (min-width: 1200px) {
    font-size: 1.2rem;
    padding: 3px;
  }

  @media (max-width: 768px) {
    font-size: clamp(0.8rem, 1.8vw, 1.1rem);
    padding: 1px;
  }

  @media (max-height: 800px) {
    font-size: clamp(0.9rem, 1.8vw, 1.1rem);
    padding: 1px;
  }

  @media (max-height: 600px) {
    font-size: clamp(0.7rem, 1.5vw, 0.9rem);
    padding: 0;
  }
`,et=d.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(76, 175, 80, 0.9);
  color: white;
  padding: clamp(15px, 4vw, 20px) clamp(20px, 6vw, 40px);
  border-radius: 10px;
  font-size: clamp(1.2rem, 4vw, 24px);
  font-weight: bold;
  z-index: 1000;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  text-align: center;
  white-space: nowrap;
`,at=d.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: flex;
  gap: 10px;
  z-index: 1000;
`,G=d.button`
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
`,ot=()=>{const[e,F]=l.useState([]),[n,A]=l.useState({first:"",second:""}),[T,k]=l.useState(!1),[h,$]=l.useState(new Set),[B,P]=l.useState(0),[W,z]=l.useState(1),{updateGameProgress:Z}=J();K();const[w,N]=l.useState(!0),[b,S]=l.useState(null),H=["🍎","🍐","🍊","🍋","🍌","🍉","🍇","🍓","🫐","🍒","🍑","🥭","🍍","🥥","🥝","🍅","🥑","🥦","🥬","🥒","🥕","🌽","🥗","🥔","🧄","🧅","🥜","🌶️","🫑","🥖","🥨","🥯","🐶","🐱","🐭","🐹","🐰","🦊","🐻","🐼","🐨","🐯","🦁","🐮","🐷","🐸","🐵","🐔","🦆","🦅","🦉","🦇","🐝","🦋","🐌","🐞","😀","😊","🥰","😎","🤓","🤠","🤡","👻","👾","🤖","👋","🖐️","⚽","🏀","🏈","⚾","🎾","🏐","🎱","🎮","🎲","🎨","🎭","🎪","🚗","🚕","🚙","🚌","🚎","🏎️","🚓","🚑","🚒","✈️","🚀","🛸","🌸","🌺","🌻","🌹","🌈","☀️","🌙","⭐","🌟","❄️","🌊","🌴","🍕","🍔","🌭","🥪","🌮","🌯","🥙","🍜","🍝","🍣","🍦","🍩","💎","🎈","🎁","🎪","🎡","🎢","🗽","🎭","🎨","🎯","🎳","🎸"],I=t=>{const a=[...t];for(let i=a.length-1;i>0;i--){const r=Math.floor(Math.random()*(i+1));[a[i],a[r]]=[a[r],a[i]]}return a},M=()=>{const t=I(H),a=t.slice(0,2),[i,r]=a;A({first:i,second:r});const c=new Array(64).fill(null),p=[];for(let o=0;o<8;o++)for(let g=0;g<7;g++)p.push(o*8+g);const x=[];let f=0;const u=100;for(;x.length<7&&f<u;){const o=p[Math.floor(Math.random()*p.length)],g=Math.floor(o/8),v=o%8;let j=!0;for(let m=Math.max(0,g-1);m<=Math.min(7,g+1);m++){for(let y=Math.max(0,v-1);y<=Math.min(7,v+2);y++){const q=m*8+y;if(c[q]!==null){j=!1;break}}if(!j)break}if(j&&v<7){c[o]=i,c[o+1]=r,x.push(o);const m=p.indexOf(o);m>-1&&(p.splice(m,1),m<p.length&&p.splice(m,1))}f++}if(x.length<7)return M();const C=t.slice(2);for(let o=0;o<64;o++)c[o]===null&&(c[o]=C[Math.floor(Math.random()*C.length)]);return c},E=()=>{const t=M();F(t),$(new Set),P(0)};l.useEffect(()=>{E();const t=setTimeout(()=>{N(!1)},300);return()=>clearTimeout(t)},[]);const L=t=>{const a=Math.floor(t/8),i=t%8;if(i<7){const r=`${a}-${i}`,c=`${a}-${i+1}`;if(!h.has(r)&&!h.has(c))if(e[t]===n.first&&e[t+1]===n.second||e[t]===n.second&&e[t+1]===n.first){const x=new Set(h);x.add(r),$(x),P(f=>{const u=f+1;return u===7&&(k(!0),Z("attention",Date.now(),{score:100}),setTimeout(()=>{k(!1),E()},2e3)),u})}else S({start:t,end:t+1}),setTimeout(()=>{S(null)},500)}},O=t=>{const a=Math.floor(t/8),i=t%8,r=`${a}-${i}`,c=`${a}-${i-1}`;return!!(h.has(r)||i>0&&h.has(c)&&(e[t-1]===n.first&&e[t]===n.second||e[t-1]===n.second&&e[t]===n.first))},D=()=>{z(t=>Math.min(t+.1,1.5))},R=()=>{z(t=>Math.max(t-.1,.5))};return s.jsxs(U,{className:w?"loading":"",children:[s.jsx(Q,{}),s.jsxs(Y,{scale:W,className:w?"loading":"",children:[s.jsxs(V,{children:["იპოვე ",s.jsx("span",{children:n.first})," და ",s.jsx("span",{children:n.second})," გვერდიგვერდ"]}),s.jsxs(X,{children:["ნაპოვნია: ",B,"/7 წყვილი"]}),s.jsx(_,{children:e.map((t,a)=>s.jsx(tt,{onClick:()=>L(a),isFound:O(a),$loading:w,$isWrong:b&&(a===b.start||a===b.end),children:t},a))})]}),s.jsxs(at,{children:[s.jsx(G,{onClick:R,children:"-"}),s.jsx(G,{onClick:D,children:"+"})]}),T&&s.jsx(et,{children:"გილოცავ! ყველა წყვილი იპოვე! 🎉"})]})};export{ot as default};
