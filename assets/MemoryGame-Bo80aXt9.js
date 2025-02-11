import{d as o,m as M,r,u as ue,a as fe,j as e,H as he}from"./index-DLCZSHJr.js";import{z as we,s as be,l as Ie,d as je,m as ve,i as Ce,t as ye,k as Se,f as ke,a as ze,c as $e,e as Ae,b as Fe,g as Me,q as qe,o as Ge,r as Ee,h as Te,j as Oe,n as Ye,p as Be,u as De,v as Ne,w as Pe,x as Re,y as Le,A as Ze,B as He,C as Ue,D as Je,E as Ke,F as Qe,G as Ve,H as We,I as Xe,J as _e,K as ea,L as aa}from"./არწივი-B6yRfamE.js";const ta=o.div`
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
`;const H=o.div`
  width: 100%;
  max-width: 500px;
  margin: 40px auto;
  background: rgba(255, 255, 255, 0.9);
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(10px);
  animation: fadeIn 0.5s ease-out;

  @media (max-width: 768px) {
    padding: 30px;
    margin: 20px auto;
  }

  @media (max-width: 480px) {
    padding: 20px;
    margin: 10px auto;
  }

  h1 {
    color: #2c3e50;
    font-size: 2.5em;
    margin-bottom: 30px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  }

  h2 {
    color: #34495e;
    font-size: 1.5em;
    margin-bottom: 25px;
    font-weight: 500;
  }
`,sa=o.select`
  padding: 15px 25px;
  margin: 20px;
  font-size: 18px;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  background-color: white;
  cursor: pointer;
  outline: none;
  transition: all 0.3s ease;
  width: 80%;
  max-width: 300px;
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
`,na=o.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  margin: 30px 0;
  padding: 5px;
  background: #f5f5f5;
  border-radius: 15px;
  width: 90%;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
`,U=o.button`
  padding: 12px 24px;
  background-color: ${a=>a.active?"#4CAF50":"transparent"};
  color: ${a=>a.active?"white":"#666"};
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-size: 16px;
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
`,ra=o.button`
  padding: 16px 40px;
  margin: 30px;
  font-size: 20px;
  background: linear-gradient(45deg, #4CAF50, #45a049);
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(76, 175, 80, 0.3);
  width: 80%;
  max-width: 300px;
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
`,J=o.h1`
  font-size: 3em;
  color: #2c3e50;
  margin-bottom: 40px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  font-weight: 700;
  letter-spacing: -1px;
  
  span {
    color: #4CAF50;
  }
`,F=o.div`
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
`,oa=M`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
`,ia=M`
  0% {
    transform: translateY(20px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`,V=M`
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
`,j=o.div`
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
  animation: ${a=>a.showSuccessAnimation?oa:a.isReordering?V:"none"} 0.5s ease;
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
    animation: ${ia} 0.5s ease forwards;
  }
`,K=o.div`
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
`,h=o.div`
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
`,W=o.div`
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
`,la=o(W)`
  background-color: rgba(244, 67, 54, 0.9);
`,da=o(j)`
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
`,ma=o.div`
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
`,ca=o(j)`
  animation: ${V} 0.5s ease forwards;
`,xa=o.div`
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
`,ga=o.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: flex;
  gap: 10px;
  z-index: 1000;
`,Q=o.button`
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
`;const pa=()=>[{name:"ზებრა",url:we,loaded:!1},{name:"სპილო",url:be,loaded:!1},{name:"ლომი",url:Ie,loaded:!1},{name:"დათვი",url:je,loaded:!1},{name:"მგელი",url:ve,loaded:!1},{name:"ირემი",url:Ce,loaded:!1},{name:"თხა",url:ye,loaded:!1},{name:"კურდღელი",url:Se,loaded:!1},{name:"ფლამინგო",url:ke,loaded:!1},{name:"სელაპი",url:ze,loaded:!1},{name:"ციყვი",url:$e,loaded:!1},{name:"ენოტი",url:Ae,loaded:!1},{name:"ზარმაცა",url:Fe,loaded:!1},{name:"ზღარბი",url:Me,loaded:!1},{name:"ქამელეონი",url:qe,loaded:!1},{name:"ოპოსუმი",url:Ge,loaded:!1},{name:"რვაფეხა",url:Ee,loaded:!1},{name:"თახვი",url:Te,loaded:!1},{name:"ბეგემოტი",url:Oe,loaded:!1},{name:"ლამა",url:Ye,loaded:!1},{name:"ჟირაფი",url:Be,loaded:!1},{name:"კენგურუ",url:De,loaded:!1},{name:"ბუ",url:Ne,loaded:!1},{name:"პანდა",url:Pe,loaded:!1},{name:"მელია",url:Re,loaded:!1},{name:"დელფინი",url:Le,loaded:!1},{name:"კოალა",url:Ze,loaded:!1},{name:"პინგვინი",url:He,loaded:!1},{name:"კიბორჩხალა",url:Ue,loaded:!1},{name:"ობობა",url:Je,loaded:!1},{name:"გველი",url:Ke,loaded:!1},{name:"ხვლიკი",url:Qe,loaded:!1},{name:"ზვიგენი",url:Ve,loaded:!1},{name:"ფარშევანგი",url:We,loaded:!1},{name:"კოდალა",url:Xe,loaded:!1},{name:"აქლემი",url:_e,loaded:!1},{name:"პეპელა",url:ea,loaded:!1},{name:"არწივი",url:aa,loaded:!1}].slice(0,10),ha=()=>{const[a,v]=r.useState("setup"),[l,X]=r.useState(3),[u,_]=r.useState([]),[q,G]=r.useState([]),[f,E]=r.useState(5),[x,$]=r.useState([]),[ee,C]=r.useState(!1),[ae,y]=r.useState(!1),[c,T]=r.useState("sequence"),[A,te]=r.useState(null),[g,S]=r.useState(null),[se,ne]=r.useState([]),{updateGameProgress:k}=ue();fe();const[re,O]=r.useState(!1),[p,Y]=r.useState(!1),[oe,B]=r.useState([]),[D,N]=r.useState(!1),[ie,P]=r.useState(1),[R,le]=r.useState([]),[de,w]=r.useState(!0),z=r.useCallback(async()=>{w(!0);try{const s=pa().map(m=>new Promise((I,i)=>{const d=new Image;d.onload=()=>I({...m,loaded:!0}),d.onerror=()=>i(new Error(`Failed to load image: ${m.name}`)),d.src=m.url})),n=await Promise.all(s);return le(n),w(!1),n}catch(t){return console.error("Error loading images:",t),w(!1),[]}},[]),b=r.useCallback(t=>{const s=[...t];let n=0;const m=10;do{for(let i=s.length-1;i>0;i--){const d=Math.floor(Math.random()*(i+1));[s[i],s[d]]=[s[d],s[i]]}if(s.some((i,d)=>i!==t[d]))return s;n++}while(n<m);return s},[]),L=r.useCallback(async()=>{let t=R;if(t.length===0&&(t=await z()),t.length===0){console.error("Failed to load images");return}const s=b(t),n=s.slice(0,l);if(_(n),G([...n]),c==="missing"){const m=s.slice(l,l+3),I=Math.floor(Math.random()*n.length),i=n[I];te(i);const d=b([...m,i]);ne(d)}},[l,c,R,z,b]),me=r.useCallback(async()=>{w(!0);try{await L(),v("showing"),E(5),S(null)}catch(t){console.error("Error starting game:",t)}finally{w(!1)}},[L]),ce=r.useCallback((t,s)=>{a==="playing"&&c==="sequence"&&$(n=>{const m=[...n,{image:t,index:s}];return m.length===u.length&&(u.every((i,d)=>m[d].image.name===i.name)?(O(!0),k("memory",Date.now(),{score:100}),C(!0),Y(!0),B([...u]),setTimeout(()=>{C(!1),O(!1),Y(!1),v("setup"),$([]),B([])},7e3)):(y(!0),setTimeout(()=>{y(!1),$([])},2e3))),m})},[a,c,u,k]),xe=r.useCallback(t=>{if(a!=="playing")return;S(t),t.name===A.name?(k("memory",Date.now(),{score:100}),C(!0),N(!0),setTimeout(()=>{C(!1),N(!1),v("setup"),S(null)},5e3)):(y(!0),setTimeout(()=>{y(!1),S(null)},2e3))},[a,A,k]),Z=r.useCallback(()=>{G(t=>{const s=b(t);return console.log("Original order:",t.map(n=>n.name)),console.log("Shuffled order:",s.map(n=>n.name)),s}),v("playing")},[b]);r.useEffect(()=>{z()},[z]),r.useEffect(()=>{let t;return a==="showing"&&f>0?t=setInterval(()=>{E(s=>s-1)},1e3):f===0&&a==="showing"&&Z(),()=>{t&&clearInterval(t)}},[f,a,Z]);const ge=()=>{P(t=>Math.min(t+.1,1.5))},pe=()=>{P(t=>Math.max(t-.1,.5))};return e.jsx(e.Fragment,{children:e.jsxs(ta,{isSetup:a==="setup",children:[e.jsx(he,{}),e.jsxs(xa,{scale:ie,children:[de?e.jsxs(H,{children:[e.jsxs(J,{children:["მეხსიერების სავარჯიშო ",e.jsx("span",{children:"🧠"})]}),e.jsx("h2",{children:"სურათები იტვირთება..."})]}):a==="setup"&&e.jsxs(H,{children:[e.jsxs(J,{children:["მეხსიერების სავარჯიშო ",e.jsx("span",{children:"🧠"})]}),e.jsx("h2",{children:"აირჩიე რამდენი სურათი გინდა დაიმახსოვრო:"}),e.jsxs(sa,{value:l,onChange:t=>X(Number(t.target.value)),children:[e.jsx("option",{value:3,children:"3 სურათი"}),e.jsx("option",{value:4,children:"4 სურათი"}),e.jsx("option",{value:5,children:"5 სურათი"})]}),e.jsxs(na,{children:[e.jsx(U,{active:c==="sequence",onClick:()=>T("sequence"),children:"თანმიმდევრობა"}),e.jsx(U,{active:c==="missing",onClick:()=>T("missing"),children:"ფოტოს ამოკლება"})]}),e.jsx(ra,{onClick:me,children:"დაწყება"})]}),ee&&e.jsxs(W,{show:!0,children:["გილოცავ! ",c==="sequence"?"სწორად გაიხსენე თანმიმდევრობა!":"სწორად გამოიცანი რომელი ფოტო აკლდა!"," 🎉"]}),ae&&e.jsxs(la,{show:!0,children:["სამწუხაროდ ",c==="sequence"?"თანმიმდევრობა არასწორია":"ვერ გამოიცანი რომელი ფოტო აკლდა",". სცადე თავიდან! 🤔"]}),a==="showing"&&e.jsxs(e.Fragment,{children:[e.jsxs(K,{children:[e.jsx("span",{className:"hourglass",children:"⌛"}),f," წამი"]}),e.jsx(h,{show:!0,children:"დაიმახსოვრე სურათები!"}),e.jsx(F,{imageCount:l,children:u.map((t,s)=>e.jsxs(j,{imageCount:l,children:[e.jsx("img",{src:t.url,alt:t.name}),e.jsx("p",{children:t.name})]},s))})]}),a==="memorizing"&&e.jsxs(e.Fragment,{children:[e.jsxs(K,{children:[e.jsx("span",{className:"hourglass",children:"⌛"}),f," წამი"]}),e.jsxs(h,{show:!0,children:["დახუჭე თვალები! ",f," წამი დარჩა"]})]}),a==="playing"&&c==="sequence"&&e.jsxs(e.Fragment,{children:[e.jsx(h,{show:!0,children:"აღადგინე სურათების თანმიმდევრობა!"}),e.jsx(F,{imageCount:l,children:(p?oe:q).map((t,s)=>e.jsxs(j,{imageCount:l,isSelected:x.some(n=>n.index===s),isPlayable:!x.some(n=>n.index===s)&&!p,onClick:()=>!x.some(n=>n.index===s)&&!p&&ce(t,s),showSuccessAnimation:re&&x.some(n=>n.index===s),isReordering:p,$reorderDelay:s*.2,children:[e.jsx("img",{src:t.url,alt:t.name}),e.jsx("p",{children:t.name}),(x.findIndex(n=>n.index===s)>-1||p)&&e.jsx("div",{className:"order-number",children:p?s+1:x.findIndex(n=>n.index===s)+1})]},s))}),e.jsx(h,{show:!0,children:!p&&(x.length<u.length?`აირჩიე ${x.length+1}-ე სურათი`:"ყველა სურათი არჩეულია")})]}),a==="playing"&&c==="missing"&&e.jsxs(e.Fragment,{children:[e.jsx(h,{show:!0,children:"რომელი ფოტო აკლია?"}),e.jsxs(F,{imageCount:l,children:[q.filter(t=>t.name!==A.name).map((t,s)=>e.jsxs(j,{imageCount:l,children:[e.jsx("img",{src:t.url,alt:t.name}),e.jsx("p",{children:t.name})]},s)),D&&g&&e.jsxs(ca,{imageCount:l,children:[e.jsx("img",{src:g.url,alt:g.name}),e.jsx("p",{children:g.name})]})]}),e.jsx(h,{show:!0,children:"აირჩიე სწორი პასუხი:"}),e.jsx(ma,{children:se.map((t,s)=>e.jsxs(da,{selected:(g==null?void 0:g.name)===t.name,onClick:()=>xe(t),disabled:D,children:[e.jsx("img",{src:t.url,alt:t.name}),e.jsx("p",{children:t.name})]},s))})]})]}),e.jsxs(ga,{children:[e.jsx(Q,{onClick:pe,children:"-"}),e.jsx(Q,{onClick:ge,children:"+"})]})]})})};export{ha as default};
