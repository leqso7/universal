import{d as o,m as q,r as n,u as we,a as be,j as e,H as je}from"./index-Bzi6B85o.js";import{z as Ie,s as ve,l as Ce,d as ye,m as Se,i as ke,t as ze,k as $e,f as Ae,a as Fe,c as Me,e as qe,b as Ge,g as Te,q as Ee,o as Ne,r as Oe,h as Ye,j as Be,n as De,p as Pe,u as Re,v as Le,w as Ze,x as He,y as Ue,A as Je,B as Ke,C as Qe,D as Ve,E as We,F as Xe,G as _e,H as ea,I as aa,J as ta,K as sa,L as na}from"./არწივი-B6yRfamE.js";const ra=o.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0.5rem;
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
  background-size: 400% 400%;
  animation: gradientBG 15s ease infinite;
  overflow: ${a=>a.isSetup?"auto":"hidden"};

  * {
    max-width: 100vw;
    box-sizing: border-box;
  }
`;o.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;const U=o.div`
  width: 100%;
  max-width: 500px;
  margin: 20px auto;
  background: rgba(255, 255, 255, 0.9);
  padding: 25px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(10px);
  animation: fadeIn 0.5s ease-out;

  @media (max-width: 768px) {
    padding: 20px;
    margin: 15px auto;
  }

  @media (max-width: 480px) {
    padding: 15px;
    margin: 10px auto;
  }

  h1 {
    color: #2c3e50;
    font-size: 2em;
    margin-bottom: 20px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  }

  h2 {
    color: #34495e;
    font-size: 1.3em;
    margin-bottom: 15px;
    font-weight: 500;
  }

  .select-group {
    margin: 12px 0;
    
    h3 {
      color: #34495e;
      font-size: 1.1em;
      margin-bottom: 8px;
      font-weight: 500;
    }
  }
`,J=o.select`
  padding: 10px 20px;
  margin: 8px;
  font-size: 16px;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  background-color: white;
  cursor: pointer;
  outline: none;
  transition: all 0.3s ease;
  width: 80%;
  max-width: 280px;
  color: #2c3e50;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 15px center;
  background-size: 15px;

  &:hover {
    border-color: #4CAF50;
    box-shadow: 0 2px 8px rgba(76, 175, 80, 0.2);
  }

  &:focus {
    border-color: #4CAF50;
    box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.2);
  }
`,oa=o.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin: 15px 0;
  padding: 4px;
  background: #f5f5f5;
  border-radius: 12px;
  width: 90%;
  max-width: 380px;
  margin-left: auto;
  margin-right: auto;
`,K=o.button`
  padding: 8px 16px;
  background-color: ${a=>a.active?"#4CAF50":"transparent"};
  color: ${a=>a.active?"white":"#666"};
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 15px;
  font-weight: 500;
  transition: all 0.3s ease;
  flex: 1;

  &:hover {
    background-color: ${a=>a.active?"#45a049":"#e0e0e0"};
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(1px);
  }
`,ia=o.button`
  padding: 12px 30px;
  margin: 15px;
  font-size: 18px;
  background: linear-gradient(45deg, #4CAF50, #45a049);
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(76, 175, 80, 0.3);
  width: 80%;
  max-width: 280px;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;

  &:hover {
    background: linear-gradient(45deg, #45a049, #4CAF50);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(76, 175, 80, 0.4);
  }

  &:active {
    transform: translateY(1px);
    box-shadow: 0 2px 10px rgba(76, 175, 80, 0.3);
  }
`,Q=o.h1`
  font-size: 2.2em;
  color: #2c3e50;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  font-weight: 700;
  letter-spacing: -1px;
  
  span {
    color: #4CAF50;
  }
`,M=o.div`
  display: grid;
  grid-template-columns: ${a=>a.imageCount<=3?"repeat(3, 1fr)":a.imageCount===4?"repeat(4, 1fr)":"repeat(5, 1fr)"};
  gap: 6px;
  width: 100%;
  max-width: ${a=>a.imageCount<=3?"700px":a.imageCount===4?"850px":"1000px"};
  justify-items: center;
  align-items: center;
  padding: 6px;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: ${a=>a.imageCount<=3?"repeat(3, 1fr)":"repeat(auto-fit, minmax(140px, 1fr))"};
    gap: 5px;
    padding: 5px;
  }

  @media (max-width: 480px) {
    grid-template-columns: ${a=>a.imageCount<=3?"repeat(3, 1fr)":"repeat(auto-fit, minmax(110px, 1fr))"};
    gap: 4px;
    padding: 3px;
  }
`,la=q`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
`,da=q`
  0% {
    transform: translateY(20px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`,X=q`
  0% {
    transform: scale(1);
  }
  20% {
    transform: scale(1.1);
  }
  40% {
    transform: scale(1.1) translateY(-20px);
  }
  100% {
    transform: scale(1) translateY(0);
  }
`,I=o.div`
  border: 2px solid ${a=>a.isSelected?"#4CAF50":"#ddd"};
  border-radius: 10px;
  padding: 6px;
  cursor: ${a=>a.isPlayable?"pointer":"not-allowed"};
  transition: all 0.3s ease;
  position: relative;
  width: 100%;
  max-width: ${a=>a.imageCount<=3?"200px":a.imageCount===4?"180px":"160px"};
  min-width: 110px;
  height: auto;
  aspect-ratio: 3/4;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  animation: ${a=>a.showSuccessAnimation?la:a.isReordering?X:"none"} 0.5s ease;
  animation-delay: ${a=>a.$reorderDelay}s;
  animation-fill-mode: forwards;

  @media (max-width: 768px) {
    max-width: 160px;
    padding: 5px;
  }

  @media (max-width: 480px) {
    max-width: 130px;
    padding: 4px;
  }

  img {
    width: 100%;
    height: auto;
    max-height: 75%;
    object-fit: contain;
    margin-bottom: 4px;
  }

  p {
    margin: 3px 0;
    font-size: 14px;
    text-align: center;
    
    @media (max-width: 480px) {
      font-size: 12px;
    }
  }

  .order-number {
    position: absolute;
    top: -15px;
    right: -15px;
    width: 35px;
    height: 35px;
    background-color: #4CAF50;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 18px;
    border: 2px solid white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    animation: ${da} 0.5s ease forwards;
  }
`,V=o.div`
  font-size: 32px;
  margin: 30px;
  color: #333;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;

  .hourglass {
    font-size: 36px;
    animation: rotate 2s infinite linear;
  }

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`,f=o.div`
  font-size: 24px;
  margin: 20px 10px;
  color: #333;
  font-weight: bold;
  text-align: center;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
  opacity: ${a=>a.show?1:0};
  transition: opacity 0.3s ease;

  @media (max-width: 768px) {
    font-size: 20px;
    margin: 15px 8px;
  }

  @media (max-width: 480px) {
    font-size: 16px;
    margin: 10px 5px;
  }
`,_=o.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(76, 175, 80, 0.9);
  color: white;
  padding: 20px 40px;
  border-radius: 10px;
  font-size: 24px;
  font-weight: bold;
  opacity: ${a=>a.show?1:0};
  transition: opacity 0.3s ease;
  pointer-events: none;
  z-index: 1000;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`,ma=o(_)`
  background-color: rgba(244, 67, 54, 0.9);
`,ca=o(I)`
  cursor: pointer;
  opacity: ${a=>a.disabled?.5:1};
  transform: ${a=>a.selected?"scale(1.02)":"none"};
  border-color: ${a=>a.selected?"#4CAF50":"#ddd"};
  margin: 0;
  min-width: unset;
  width: 100%;
  max-width: 160px;
  flex: 1;
  transition: all 0.2s ease;

  &:hover {
    transform: ${a=>a.disabled?"none":"scale(1.02)"};
    border-color: #4CAF50;
  }

  img {
    height: 200px;
    object-fit: contain;
  }

  p {
    margin: 8px 0;
    font-size: 18px;
  }

  @media (max-width: 768px) {
    max-width: 140px;
  }

  @media (max-width: 480px) {
    max-width: 120px;
  }
`,xa=o.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 6px;
  width: 100%;
  max-width: 90%;
  background: rgba(255, 255, 255, 0.9);
  padding: 6px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  justify-items: center;
  margin: 6px auto;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    gap: 5px;
    padding: 5px;
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(auto-fit, minmax(90px, 1fr));
    gap: 4px;
    padding: 4px;
    max-width: 95%;
  }
`,ga=o(I)`
  animation: ${X} 0.5s ease forwards;
`,pa=o.div`
  width: 100%;
  max-width: min(1000px, 98vw);
  margin: 0 auto;
  padding: 5px;
  transform: scale(${a=>a.scale});
  transform-origin: center top;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    padding: 5px;
    max-width: 98vw;
  }
`,ua=o.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: flex;
  gap: 10px;
  z-index: 1000;
`,W=o.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.9);
  color: #333;
  font-size: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  
  &:hover {
    background: rgba(255, 255, 255, 1);
    transform: scale(1.1);
  }
`;o.div`
  font-size: 1.5rem;
  color: white;
  text-align: center;
  margin: 2rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
`;const ha=()=>[{name:"ზებრა",url:Ie,loaded:!1},{name:"სპილო",url:ve,loaded:!1},{name:"ლომი",url:Ce,loaded:!1},{name:"დათვი",url:ye,loaded:!1},{name:"მგელი",url:Se,loaded:!1},{name:"ირემი",url:ke,loaded:!1},{name:"თხა",url:ze,loaded:!1},{name:"კურდღელი",url:$e,loaded:!1},{name:"ფლამინგო",url:Ae,loaded:!1},{name:"სელაპი",url:Fe,loaded:!1},{name:"ციყვი",url:Me,loaded:!1},{name:"ენოტი",url:qe,loaded:!1},{name:"ზარმაცა",url:Ge,loaded:!1},{name:"ზღარბი",url:Te,loaded:!1},{name:"ქამელეონი",url:Ee,loaded:!1},{name:"ოპოსუმი",url:Ne,loaded:!1},{name:"რვაფეხა",url:Oe,loaded:!1},{name:"თახვი",url:Ye,loaded:!1},{name:"ბეგემოტი",url:Be,loaded:!1},{name:"ლამა",url:De,loaded:!1},{name:"ჟირაფი",url:Pe,loaded:!1},{name:"კენგურუ",url:Re,loaded:!1},{name:"ბუ",url:Le,loaded:!1},{name:"პანდა",url:Ze,loaded:!1},{name:"მელია",url:He,loaded:!1},{name:"დელფინი",url:Ue,loaded:!1},{name:"კოალა",url:Je,loaded:!1},{name:"პინგვინი",url:Ke,loaded:!1},{name:"კიბორჩხალა",url:Qe,loaded:!1},{name:"ობობა",url:Ve,loaded:!1},{name:"გველი",url:We,loaded:!1},{name:"ხვლიკი",url:Xe,loaded:!1},{name:"ზვიგენი",url:_e,loaded:!1},{name:"ფარშევანგი",url:ea,loaded:!1},{name:"კოდალა",url:aa,loaded:!1},{name:"აქლემი",url:ta,loaded:!1},{name:"პეპელა",url:sa,loaded:!1},{name:"არწივი",url:na,loaded:!1}].slice(0,10),ba=()=>{const[a,v]=n.useState("setup"),[l,ee]=n.useState(3),[u,ae]=n.useState([]),[G,T]=n.useState([]),[h,E]=n.useState(5),[$,te]=n.useState(5),[x,A]=n.useState([]),[se,C]=n.useState(!1),[ne,y]=n.useState(!1),[c,N]=n.useState("sequence"),[F,re]=n.useState(null),[g,S]=n.useState(null),[oe,ie]=n.useState([]),{updateGameProgress:k}=we();be();const[le,O]=n.useState(!1),[p,Y]=n.useState(!1),[de,B]=n.useState([]),[D,P]=n.useState(!1),[me,R]=n.useState(1),[L,ce]=n.useState([]),[xe,w]=n.useState(!0),z=n.useCallback(async()=>{w(!0);try{const s=ha().map(m=>new Promise((j,i)=>{const d=new Image;d.onload=()=>j({...m,loaded:!0}),d.onerror=()=>i(new Error(`Failed to load image: ${m.name}`)),d.src=m.url})),r=await Promise.all(s);return ce(r),w(!1),r}catch(t){return console.error("Error loading images:",t),w(!1),[]}},[]),b=n.useCallback(t=>{const s=[...t];let r=0;const m=10;do{for(let i=s.length-1;i>0;i--){const d=Math.floor(Math.random()*(i+1));[s[i],s[d]]=[s[d],s[i]]}if(s.some((i,d)=>i!==t[d]))return s;r++}while(r<m);return s},[]),Z=n.useCallback(async()=>{let t=L;if(t.length===0&&(t=await z()),t.length===0){console.error("Failed to load images");return}const s=b(t),r=s.slice(0,l);if(ae(r),T([...r]),c==="missing"){const m=s.slice(l,l+3),j=Math.floor(Math.random()*r.length),i=r[j];re(i);const d=b([...m,i]);ie(d)}},[l,c,L,z,b]),ge=n.useCallback(async()=>{w(!0);try{await Z(),v("showing"),E($),S(null)}catch(t){console.error("Error starting game:",t)}finally{w(!1)}},[Z,$]),pe=n.useCallback((t,s)=>{a==="playing"&&c==="sequence"&&A(r=>{const m=[...r,{image:t,index:s}];return m.length===u.length&&(u.every((i,d)=>m[d].image.name===i.name)?(O(!0),k("memory",Date.now(),{score:100}),C(!0),Y(!0),B([...u]),setTimeout(()=>{C(!1),O(!1),Y(!1),v("setup"),A([]),B([])},7e3)):(y(!0),setTimeout(()=>{y(!1),A([])},2e3))),m})},[a,c,u,k]),ue=n.useCallback(t=>{if(a!=="playing")return;S(t),t.name===F.name?(k("memory",Date.now(),{score:100}),C(!0),P(!0),setTimeout(()=>{C(!1),P(!1),v("setup"),S(null)},5e3)):(y(!0),setTimeout(()=>{y(!1),S(null)},2e3))},[a,F,k]),H=n.useCallback(()=>{T(t=>{const s=b(t);return console.log("Original order:",t.map(r=>r.name)),console.log("Shuffled order:",s.map(r=>r.name)),s}),v("playing")},[b]);n.useEffect(()=>{z()},[z]),n.useEffect(()=>{let t;return a==="showing"&&h>0?t=setInterval(()=>{E(s=>s-1)},1e3):h===0&&a==="showing"&&H(),()=>{t&&clearInterval(t)}},[h,a,H]);const he=()=>{R(t=>Math.min(t+.1,1.5))},fe=()=>{R(t=>Math.max(t-.1,.5))};return e.jsx(e.Fragment,{children:e.jsxs(ra,{isSetup:a==="setup",children:[e.jsx(je,{}),e.jsxs(pa,{scale:me,children:[xe?e.jsxs(U,{children:[e.jsxs(Q,{children:["მეხსიერების სავარჯიშო ",e.jsx("span",{children:"🧠"})]}),e.jsx("h2",{children:"სურათები იტვირთება..."})]}):a==="setup"&&e.jsxs(U,{children:[e.jsxs(Q,{children:["მეხსიერების სავარჯიშო ",e.jsx("span",{children:"🧠"})]}),e.jsxs("div",{className:"select-group",children:[e.jsx("h3",{children:"აირჩიე რამდენი სურათი გინდა დაიმახსოვრო:"}),e.jsxs(J,{value:l,onChange:t=>ee(Number(t.target.value)),children:[e.jsx("option",{value:3,children:"3 სურათი"}),e.jsx("option",{value:4,children:"4 სურათი"}),e.jsx("option",{value:5,children:"5 სურათი"})]})]}),e.jsxs("div",{className:"select-group",children:[e.jsx("h3",{children:"აირჩიე დროის ხანგრძლივობა:"}),e.jsxs(J,{value:$,onChange:t=>te(Number(t.target.value)),children:[e.jsx("option",{value:5,children:"5 წამი"}),e.jsx("option",{value:10,children:"10 წამი"})]})]}),e.jsxs(oa,{children:[e.jsx(K,{active:c==="sequence",onClick:()=>N("sequence"),children:"თანმიმდევრობა"}),e.jsx(K,{active:c==="missing",onClick:()=>N("missing"),children:"ფოტოს ამოკლება"})]}),e.jsx(ia,{onClick:ge,children:"დაწყება"})]}),se&&e.jsxs(_,{show:!0,children:["გილოცავ! ",c==="sequence"?"სწორად გაიხსენე თანმიმდევრობა!":"სწორად გამოიცანი რომელი ფოტო აკლდა!"," 🎉"]}),ne&&e.jsxs(ma,{show:!0,children:["სამწუხაროდ ",c==="sequence"?"თანმიმდევრობა არასწორია":"ვერ გამოიცანი რომელი ფოტო აკლდა",". სცადე თავიდან! 🤔"]}),a==="showing"&&e.jsxs(e.Fragment,{children:[e.jsxs(V,{children:[e.jsx("span",{className:"hourglass",children:"⌛"}),h," წამი"]}),e.jsx(f,{show:!0,children:"დაიმახსოვრე სურათები!"}),e.jsx(M,{imageCount:l,children:u.map((t,s)=>e.jsxs(I,{imageCount:l,children:[e.jsx("img",{src:t.url,alt:t.name}),e.jsx("p",{children:t.name})]},s))})]}),a==="memorizing"&&e.jsxs(e.Fragment,{children:[e.jsxs(V,{children:[e.jsx("span",{className:"hourglass",children:"⌛"}),h," წამი"]}),e.jsxs(f,{show:!0,children:["დახუჭე თვალები! ",h," წამი დარჩა"]})]}),a==="playing"&&c==="sequence"&&e.jsxs(e.Fragment,{children:[e.jsx(f,{show:!0,children:"აღადგინე სურათების თანმიმდევრობა!"}),e.jsx(M,{imageCount:l,children:(p?de:G).map((t,s)=>e.jsxs(I,{imageCount:l,isSelected:x.some(r=>r.index===s),isPlayable:!x.some(r=>r.index===s)&&!p,onClick:()=>!x.some(r=>r.index===s)&&!p&&pe(t,s),showSuccessAnimation:le&&x.some(r=>r.index===s),isReordering:p,$reorderDelay:s*.2,children:[e.jsx("img",{src:t.url,alt:t.name}),e.jsx("p",{children:t.name}),(x.findIndex(r=>r.index===s)>-1||p)&&e.jsx("div",{className:"order-number",children:p?s+1:x.findIndex(r=>r.index===s)+1})]},s))}),e.jsx(f,{show:!0,children:!p&&(x.length<u.length?`აირჩიე ${x.length+1}-ე სურათი`:"ყველა სურათი არჩეულია")})]}),a==="playing"&&c==="missing"&&e.jsxs(e.Fragment,{children:[e.jsx(f,{show:!0,children:"რომელი ფოტო აკლია?"}),e.jsxs(M,{imageCount:l,children:[G.filter(t=>t.name!==F.name).map((t,s)=>e.jsxs(I,{imageCount:l,children:[e.jsx("img",{src:t.url,alt:t.name}),e.jsx("p",{children:t.name})]},s)),D&&g&&e.jsxs(ga,{imageCount:l,children:[e.jsx("img",{src:g.url,alt:g.name}),e.jsx("p",{children:g.name})]})]}),e.jsx(f,{show:!0,children:"აირჩიე სწორი პასუხი:"}),e.jsx(xa,{children:oe.map((t,s)=>e.jsxs(ca,{selected:(g==null?void 0:g.name)===t.name,onClick:()=>ue(t),disabled:D,children:[e.jsx("img",{src:t.url,alt:t.name}),e.jsx("p",{children:t.name})]},s))})]})]}),e.jsxs(ua,{children:[e.jsx(W,{onClick:fe,children:"-"}),e.jsx(W,{onClick:he,children:"+"})]})]})})};export{ba as default};
