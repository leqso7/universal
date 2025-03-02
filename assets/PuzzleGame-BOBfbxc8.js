import{d as r,m as j,r as s,R as oe,j as t,u as ae,a as ie,H as le}from"./index-DyQsfCfe.js";import"./NameModal-C7dWMAxC.js";const de=r.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-height: calc(100vh - 200px);
`,ce=r.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
`,pe=r.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 100%;
`;r.div`
  display: flex;
  justify-content: center;
`;const X=r.div`
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border-radius: 1rem;
  padding: 1rem;
  height: fit-content;
`,G=r.h3`
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #2196F3;
`,ge=r(X)`
  flex: 1;
  display: flex;
  flex-direction: column;
`,me=r.div`
  position: relative;
  width: calc((100% - ${e=>(e.size-1)*2}px) / ${e=>e.size});
  aspect-ratio: 1;
  border-radius: 0.5rem;
  overflow: hidden;
  border: 2px solid rgba(33, 150, 243, 0.2);
  margin: 0 auto;
  cursor: pointer;
  transition: all 0.3s ease;
  
  ${e=>e.isExpanded&&`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
    border: none;
    border-radius: 0;
  `}
`,ue=r.div`
  width: 100%;
  height: 100%;
  background-image: url(${e=>e.image});
  background-size: ${e=>e.isExpanded?"cover":`${e.size*100}% ${e.size*100}%`};
  background-position: center;
  background-repeat: no-repeat;
  transition: all 0.3s ease;
`,J=r.div`
  display: grid;
  grid-template-columns: repeat(${e=>e.size}, 1fr);
  gap: 2px;
  background-color: ${e=>e.isTarget?"rgba(245, 245, 245, 0.5)":"transparent"};
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: 2px dashed ${e=>e.isTarget?"rgba(33, 150, 243, 0.2)":"transparent"};
  aspect-ratio: 1;
`,K=r.div`
  width: 100%;
  height: 100%;
  background-image: ${e=>e.image?`url(${e.image})`:"none"};
  background-size: ${e=>e.size*100}% ${e=>e.size*100}%;
  background-position: ${e=>e.bgPosition};
  border: 2px solid ${e=>e.isWrongAttempt?"#ff4444":e.isTarget?"transparent":"#e0e0e0"};
  cursor: ${e=>e.isPlaced?"default":"pointer"};
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${e=>e.isWrongAttempt?"rgba(255, 68, 68, 0.1)":e.isTarget?"rgba(245, 245, 245, 0.5)":"transparent"};
  background-repeat: no-repeat;
  position: relative;
  opacity: ${e=>e.isDragging?0:1};
  transform: scale(${e=>e.isDragging?.8:1});
  border-radius: 0.25rem;
  
  &:hover {
    transform: ${e=>e.isPlaced||e.isDragging?"none":"scale(1.05)"};
    z-index: 1;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`,xe=r.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
  justify-content: center;
`,Q=r.button`
  background-color: ${e=>e.variant==="primary"?"#2196F3":"#4CAF50"};
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    background-color: ${e=>e.variant==="primary"?"#1976D2":"#388E3C"};
  }

  &:active {
    transform: translateY(0);
  }
`,fe=r.div`
  color: #666;
  font-size: 14px;
  text-align: center;
`,be=r.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(33, 150, 243, 0.9);
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 14px;
  pointer-events: none;
  z-index: 2;
`,he=r.div`
  position: fixed;
  pointer-events: none;
  z-index: 1000;
  width: calc((min(600px, 100vw) - 28px) / ${e=>e.size});
  height: calc((min(600px, 100vw) - 28px) / ${e=>e.size});
  background-image: url(${e=>e.image});
  background-size: ${e=>e.size*100}% ${e=>e.size*100}%;
  background-position: ${e=>e.bgPosition};
  transform: translate3d(-50%, -50%, 0);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  opacity: 0.9;
  border: 2px solid rgba(255, 255, 255, 0.9);
  background-color: rgba(255, 255, 255, 0.8);
  transition: none;
  will-change: transform;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
`;r.div`
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.8);
  border: 2px solid rgba(255, 255, 255, 0.9);
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.1);
`;r.div`
  width: 100%;
  max-width: 600px;
  aspect-ratio: 1;
  display: grid;
  grid-template-columns: repeat(${e=>e.difficulty}, 1fr);
  gap: 4px;
  padding: 10px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  margin: 0 auto;
`;const we=j`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`,Z=r.div`
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #2196F3;
  border-radius: 50%;
  animation: ${we} 1s linear infinite;
  margin: 0 auto;
`,_=r.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
`,ve=j`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`,ye=j`
  from { opacity: 1; transform: translateY(0); }
  to { opacity: 0; transform: translateY(-20px); }
`;r.div`
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
  animation: ${e=>e.isClosing?ye:ve} 0.5s ease forwards;
  backdrop-filter: blur(10px);
`;const je=({image:e,difficulty:i,onProgress:$,onComplete:D,onBackToMenu:q,onImageChange:U,onError:z})=>{const[g,H]=s.useState([]),[N,k]=s.useState(null),[u,I]=s.useState([]),[h,M]=s.useState(new Set),[x,S]=s.useState(!1),[P,C]=s.useState(new Set),[T,W]=s.useState(0),[c,w]=s.useState(null),[v,L]=s.useState({x:0,y:0}),[B,m]=s.useState(!1),[E,F]=s.useState(!1);s.useState(!1),s.useState(!1);const[Y,R]=s.useState({x:0,y:0}),[A,a]=s.useState({x:0,y:0}),d=oe.useRef(),b=s.useMemo(()=>{const n=[];for(let o=0;o<i;o++)for(let l=0;l<i;l++)n.push({id:o*i+l,bgPosition:`${l*(100/(i-1))}% ${o*(100/(i-1))}%`,correctIndex:o*i+l});return n},[i]);s.useEffect(()=>{(async()=>{m(!0);try{const o=i*i;if(!i||i<=0){console.error("Invalid difficulty value:",i);return}await new Promise(f=>setTimeout(f,500));const l=[...b].sort(()=>Math.random()-.5).map((f,O)=>({...f,currentPos:O})),p=Array(o).fill(null);H(l),I(p),M(new Set),k(null),C(new Set),w(null)}catch(o){console.error("Error initializing puzzle pieces:",o)}finally{m(!1)}})()},[e,i,b]),s.useEffect(()=>{S(!1)},[i]);const y=()=>{c!==null&&(L(A),R(A),d.current=requestAnimationFrame(y))};s.useEffect(()=>{const n=o=>{c!==null&&(a({x:o.clientX,y:o.clientY}),d.current||(d.current=requestAnimationFrame(y)))};return document.addEventListener("mousemove",n),()=>{document.removeEventListener("mousemove",n),d.current&&(cancelAnimationFrame(d.current),d.current=null)}},[c,A]);const V=async n=>{var o;n.preventDefault(),m(!0);try{const l=(o=n.clipboardData)==null?void 0:o.items;if(!l)return;for(let p=0;p<l.length;p++)if(l[p].type.indexOf("image")!==-1){const f=l[p].getAsFile(),O=new FileReader;O.onload=se=>{U(se.target.result),m(!1)},O.readAsDataURL(f);return}m(!1)}catch(l){console.error("Error handling paste:",l),m(!1)}},ee=n=>{if(n<0||n>=g.length||!g[n]){console.error("Invalid piece index:",n);return}if(c===n)w(null),d.current&&(cancelAnimationFrame(d.current),d.current=null);else{const o={x:Y.x||v.x,y:Y.y||v.y};w(n),L(o),R(o),a(o),C(new Set)}k(n)},te=n=>{if(c===null||n<0||n>=u.length||u[n]!==null)return;const o=g[c];if(!o){console.error("Selected piece data is invalid");return}if(parseInt(o.id)===n){const l=[...u];l[n]=o,I(l);const p=[...g];p[c]=null,H(p);const f=new Set(h);f.add(n),M(f)}else{const l=new Set(P);l.add(n),C(l),W(p=>p+1),z()}w(null),k(null)},re=()=>{S(!x)},ne=()=>{F(!E)};return s.useEffect(()=>{const n=h.size/(i*i)*100;$(Math.round(n)),h.size===i*i&&D(T)},[h,i,D,T,$]),s.useEffect(()=>(window.addEventListener("paste",V),()=>window.removeEventListener("paste",V)),[]),t.jsxs(de,{children:[t.jsxs(ce,{children:[t.jsxs(X,{children:[t.jsxs(G,{children:[t.jsx("span",{children:"🎮"}),"აქ ააწყვე პაზლი"]}),t.jsxs("div",{style:{position:"relative"},children:[B&&t.jsx(_,{children:t.jsx(Z,{})}),t.jsx(J,{size:i,isTarget:!0,children:u.map((n,o)=>t.jsx(K,{image:n?e:null,size:i,bgPosition:n?n.bgPosition:"",isTarget:!n,isPlaced:n!==null,isWrongAttempt:P.has(o),onClick:()=>te(o),children:!n&&x&&t.jsx(fe,{children:o+1})},o))})]})]}),t.jsxs(pe,{children:[t.jsxs(X,{children:[t.jsxs(G,{children:[t.jsx("span",{children:"🧩"}),"პაზლის ნაწილები"]}),t.jsxs("div",{style:{position:"relative"},children:[B&&t.jsx(_,{children:t.jsx(Z,{})}),t.jsx(J,{size:i,isTarget:!1,children:g.map((n,o)=>n&&t.jsx(K,{image:e,size:i,bgPosition:n.bgPosition,onClick:()=>ee(o),isDragging:c===o,children:x&&t.jsx(be,{children:parseInt(n.id)+1})},n.id))})]})]}),t.jsxs(ge,{children:[t.jsxs(G,{children:[t.jsx("span",{children:"🖼️"}),"ორიგინალი სურათი",t.jsx("span",{style:{marginLeft:"auto",fontSize:"0.8em",opacity:.7},children:"(დააჭირე გასადიდებლად)"})]}),t.jsx(me,{size:i,isExpanded:E,onClick:ne,children:t.jsx(ue,{image:e,size:i,isExpanded:E})}),t.jsxs(xe,{children:[t.jsx(Q,{variant:"primary",onClick:re,children:x?"🔍 დამალე მინიშნებები":"💡 მაჩვენე მინიშნებები"}),t.jsx(Q,{onClick:q,children:"🏠 მთავარ მენიუში დაბრუნება"})]})]})]})]}),c!==null&&g[c]&&t.jsx(he,{image:e,size:i,bgPosition:g[c].bgPosition,style:{left:`${v.x}px`,top:`${v.y}px`,transform:"translate(-50%, -50%)"}})]})};r.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;r.h2`
  color: #2196F3;
  margin-bottom: 15px;
`;r.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
`;r.button`
  background-color: ${e=>e.active?"#2196F3":"#4CAF50"};
  padding: 10px 20px;
  border-radius: 8px;
  border: none;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;const $e=r.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  background: #98D8AA;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  overflow-y: auto;
  z-index: 1;
  margin: 0;
  box-sizing: border-box;

  * {
    box-sizing: border-box;
  }
`,ze=r.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  max-width: 64rem;
  margin-left: auto;
  margin-right: auto;
  padding: 0 1rem;
  gap: 1rem;
`,ke=r.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`,Se=r.h1`
  font-size: 1.5rem;
  font-weight: bold;
  color: #2196F3;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  @media (min-width: 640px) {
    font-size: 1.875rem;
  }
`,Pe=r.span`
  font-size: 1.5rem;
  
  @media (min-width: 640px) {
    font-size: 2rem;
  }
`,Ce=r.main`
  max-width: 64rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0 1rem;
  padding-bottom: 2rem;
`,Te=r.div`
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border-radius: 1rem;
  padding: 1rem;
`,Ee=r(Te)`
  text-align: center;
`,Fe=r.h2`
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`,Ae=r.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
`,De=r.button`
  height: 2.5rem;
  width: 4rem;
  font-size: 1rem;
  border-radius: 0.75rem;
  transition: transform 0.2s;
  background: ${e=>e.isSelected?"#2196F3":"transparent"};
  color: ${e=>e.isSelected?"white":"#2196F3"};
  border: 2px solid ${e=>e.isSelected?"transparent":"#2196F3"};
  cursor: ${e=>e.disabled?"not-allowed":"pointer"};
  opacity: ${e=>e.disabled?.7:1};

  &:hover {
    transform: ${e=>e.disabled?"none":"scale(1.05)"};
  }

  &:disabled {
    background: ${e=>e.isSelected?"#90CAF9":"rgba(33, 150, 243, 0.1)"};
    border-color: ${e=>e.isSelected?"transparent":"#90CAF9"};
    color: ${e=>e.isSelected?"white":"#90CAF9"};
  }
`,Ie=r.label`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: #2196F3;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0.75rem;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 1rem;
  margin-left: auto;

  &:hover {
    background: #1976D2;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }

  input {
    display: none;
  }
`,Me=r.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: #2196F3;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0.75rem;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 1rem;

  &:hover {
    background: #1976D2;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`,Le=j`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`,Be=r.div`
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #2196F3;
  border-radius: 50%;
  animation: ${Le} 1s linear infinite;
  margin: 0 auto;
`,Ye=r.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
`,Re=j`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`,Oe=j`
  from { opacity: 1; transform: translateY(0); }
  to { opacity: 0; transform: translateY(-20px); }
`,Ue=r.div`
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
  animation: ${e=>e.isClosing?Oe:Re} 0.5s ease forwards;
  backdrop-filter: blur(10px);
`,He=r.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(255, 255, 255, 0.95);
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  text-align: center;
  font-size: 1.5rem;
  color: #2196F3;
  z-index: 1000;
  animation: popIn 0.5s ease-out;

  @keyframes popIn {
    0% {
      transform: translate(-50%, -50%) scale(0.5);
      opacity: 0;
    }
    100% {
      transform: translate(-50%, -50%) scale(1);
      opacity: 1;
    }
  }
`,Ge=()=>{const{playerName:e}=ae(),i=ie(),[$,D]=s.useState(3),[q,U]=s.useState(0),[z,g]=s.useState(null),[H,N]=s.useState(0),[k,u]=s.useState(!1),[I,h]=s.useState(""),[M,x]=s.useState(!1),[S,P]=s.useState(!1),[C,T]=s.useState(!1),[W,c]=s.useState(""),w=()=>{const a=[`ყოჩაღ ${e}! შენ ეს შეძელი! 🎉`,`საოცარი ხარ ${e}! გააგრძელე ასე! 🌟`,`ბრავო ${e}! შესანიშნავად გაართვი თავი! 👏`,`არაჩვეულებრივია ${e}! შენ ნამდვილი გენიოსი ხარ! 🎯`,`გილოცავ ${e}! კიდევ ერთი ამოცანა გადალახე! 🏆`,`${e}, შენ მართლაც ნიჭიერი ხარ! 🌈`,`დიდებულია ${e}! ასე განაგრძე! ⭐`,`${e}, შენ ნამდვილი გმირი ხარ! 🦸‍♂️`];return a[Math.floor(Math.random()*a.length)]},v=a=>{h(a),u(!0),setTimeout(()=>{x(!0),setTimeout(()=>{u(!1),x(!1)},500)},3e3)},L=a=>{new Date().toISOString(),v(`გილოცავთ ${e||"მოთამაშე"}! თქვენ წარმატებით დაასრულეთ პაზლი ${a||0} შეცდომით! 🎉`),setTimeout(()=>{u(!1),x(!1),i("/")},3500)},B=()=>{N(a=>a+1)},m=a=>{g(a),N(0)},E=()=>{i("/")},F=async()=>{try{const a=await navigator.clipboard.read();for(const d of a)if(d.types.includes("image/png")){const b=await d.getType("image/png"),y=URL.createObjectURL(b);m(y);break}}catch(a){console.error("Error handling pasted image:",a)}},Y=async a=>{P(!0),await new Promise(d=>setTimeout(d,500)),D(a),P(!1)},R=a=>{const d=a.target.files[0];if(d){const b=new FileReader;b.onload=y=>{g(y.target.result)},b.readAsDataURL(d)}},A=()=>{T(!0),c(w()),setTimeout(()=>{T(!1)},3e3)};return s.useEffect(()=>(window.addEventListener("paste",F),()=>window.removeEventListener("paste",F)),[]),t.jsxs($e,{children:[t.jsx(le,{}),k&&t.jsx(Ue,{isClosing:M,children:I}),C&&t.jsx(He,{children:W}),t.jsxs(ze,{children:[t.jsxs(Se,{children:[t.jsx(Pe,{children:"🎮"}),"გამარჯობა, ",e,"! 👋"]}),t.jsxs(ke,{children:[t.jsxs(Me,{onClick:F,children:[t.jsx("span",{children:"📋"}),"ჩასმა (Ctrl+V)"]}),t.jsxs(Ie,{children:[t.jsx("span",{children:"📤"}),"სურათის ატვირთვა",t.jsx("input",{type:"file",accept:"image/*",onChange:R,id:"imageUpload",name:"imageUpload"})]})]})]}),t.jsxs(Ce,{children:[t.jsxs(Ee,{children:[t.jsx(Fe,{children:"აირჩიე სირთულის დონე"}),t.jsx(Ae,{children:[3,4,5].map(a=>t.jsxs(De,{isSelected:$===a,onClick:()=>Y(a),disabled:S,children:[a,"x",a]},a))})]}),t.jsxs("div",{style:{position:"relative"},children:[S&&t.jsx(Ye,{children:t.jsx(Be,{})}),z&&t.jsx(je,{image:z,difficulty:$,onProgress:U,onComplete:a=>L(a),onBackToMenu:E,onImageChange:m,onError:B,onCorrectAnswer:A})]})]})]})};export{Ge as default};
