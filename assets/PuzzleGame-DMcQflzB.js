import{d as s,m as v,r as n,j as t,u as _,a as ee,H as te}from"./index-CQ3ulkL0.js";import"./NameModal-BI5IL0PQ.js";const re=s.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-height: calc(100vh - 200px);
`,se=s.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
`,ne=s.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 100%;
`;s.div`
  display: flex;
  justify-content: center;
`;const G=s.div`
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border-radius: 1rem;
  padding: 1rem;
  height: fit-content;
`,W=s.h3`
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #2196F3;
`,oe=s(G)`
  flex: 1;
  display: flex;
  flex-direction: column;
`,ae=s.div`
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
`,ie=s.div`
  width: 100%;
  height: 100%;
  background-image: url(${e=>e.image});
  background-size: ${e=>e.isExpanded?"cover":`${e.size*100}% ${e.size*100}%`};
  background-position: center;
  background-repeat: no-repeat;
  transition: all 0.3s ease;
`,V=s.div`
  display: grid;
  grid-template-columns: repeat(${e=>e.size}, 1fr);
  gap: 2px;
  background-color: ${e=>e.isTarget?"rgba(245, 245, 245, 0.5)":"transparent"};
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: 2px dashed ${e=>e.isTarget?"rgba(33, 150, 243, 0.2)":"transparent"};
  aspect-ratio: 1;
`,q=s.div`
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
`,le=s.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
  justify-content: center;
`,J=s.button`
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
`,de=s.div`
  color: #666;
  font-size: 14px;
  text-align: center;
`,ce=s.div`
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
`,ge=s.div`
  position: fixed;
  pointer-events: none;
  z-index: 1000;
  width: calc((min(600px, 100vw) - 28px) / ${e=>e.size});
  height: calc((min(600px, 100vw) - 28px) / ${e=>e.size});
  background-image: url(${e=>e.image});
  background-size: ${e=>e.size*100}% ${e=>e.size*100}%;
  background-position: ${e=>e.bgPosition};
  transform: translate(-50%, -50%);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  opacity: 0.9;
  border: 2px solid rgba(255, 255, 255, 0.9);
  background-color: rgba(255, 255, 255, 0.8);
`;s.div`
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
`;s.div`
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
`;const pe=v`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`,K=s.div`
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #2196F3;
  border-radius: 50%;
  animation: ${pe} 1s linear infinite;
  margin: 0 auto;
`,Q=s.div`
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
`,me=v`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`,ue=v`
  from { opacity: 1; transform: translateY(0); }
  to { opacity: 0; transform: translateY(-20px); }
`;s.div`
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
  animation: ${e=>e.isClosing?ue:me} 0.5s ease forwards;
  backdrop-filter: blur(10px);
`;const xe=({image:e,difficulty:o,onProgress:y,onComplete:E,onBackToMenu:X,onImageChange:Y,onError:j})=>{const[g,O]=n.useState([]),[R,$]=n.useState(null),[u,D]=n.useState([]),[f,F]=n.useState(new Set),[x,z]=n.useState(!1),[S,k]=n.useState(new Set),[P,U]=n.useState(0),[d,h]=n.useState(null),[I,H]=n.useState({x:0,y:0}),[A,m]=n.useState(!1),[C,T]=n.useState(!1);n.useState(!1),n.useState(!1);const L=n.useMemo(()=>{const r=[];for(let i=0;i<o;i++)for(let l=0;l<o;l++)r.push({id:i*o+l,bgPosition:`${l*(100/(o-1))}% ${i*(100/(o-1))}%`,correctIndex:i*o+l});return r},[o]);n.useEffect(()=>{(async()=>{m(!0);try{const i=o*o;if(!o||o<=0){console.error("Invalid difficulty value:",o);return}await new Promise(b=>setTimeout(b,500));const l=[...L].sort(()=>Math.random()-.5).map((b,B)=>({...b,currentPos:B})),c=Array(i).fill(null);O(l),D(c),F(new Set),$(null),k(new Set),h(null)}catch(i){console.error("Error initializing puzzle pieces:",i)}finally{m(!1)}})()},[e,o,L]),n.useEffect(()=>{z(!1)},[o]),n.useEffect(()=>{const r=i=>{d!==null&&H({x:i.clientX,y:i.clientY})};return document.addEventListener("mousemove",r),()=>document.removeEventListener("mousemove",r)},[d]);const M=async r=>{var i;r.preventDefault(),m(!0);try{const l=(i=r.clipboardData)==null?void 0:i.items;if(!l)return;for(let c=0;c<l.length;c++)if(l[c].type.indexOf("image")!==-1){const b=l[c].getAsFile(),B=new FileReader;B.onload=Z=>{Y(Z.target.result),m(!1)},B.readAsDataURL(b);return}m(!1)}catch(l){console.error("Error handling paste:",l),m(!1)}},N=r=>{if(r<0||r>=g.length||!g[r]){console.error("Invalid piece index:",r);return}d===r?h(null):(h(r),k(new Set)),$(r)},a=r=>{if(d===null||r<0||r>=u.length||u[r]!==null)return;const i=g[d];if(!i){console.error("Selected piece data is invalid");return}if(parseInt(i.id)===r){const l=[...u];l[r]=i,D(l);const c=[...g];c[d]=null,O(c);const b=new Set(f);b.add(r),F(b)}else{const l=new Set(S);l.add(r),k(l),U(c=>c+1),j()}h(null),$(null)},p=()=>{z(!x)},w=()=>{T(!C)};return n.useEffect(()=>{const r=f.size/(o*o)*100;y(Math.round(r)),f.size===o*o&&E(P)},[f,o,E,P,y]),n.useEffect(()=>(window.addEventListener("paste",M),()=>window.removeEventListener("paste",M)),[]),t.jsxs(re,{children:[t.jsxs(se,{children:[t.jsxs(G,{children:[t.jsxs(W,{children:[t.jsx("span",{children:"🎮"}),"აქ ააწყვე პაზლი"]}),t.jsxs("div",{style:{position:"relative"},children:[A&&t.jsx(Q,{children:t.jsx(K,{})}),t.jsx(V,{size:o,isTarget:!0,children:u.map((r,i)=>t.jsx(q,{image:r?e:null,size:o,bgPosition:r?r.bgPosition:"",isTarget:!r,isPlaced:r!==null,isWrongAttempt:S.has(i),onClick:()=>a(i),children:!r&&x&&t.jsx(de,{children:i+1})},i))})]})]}),t.jsxs(ne,{children:[t.jsxs(G,{children:[t.jsxs(W,{children:[t.jsx("span",{children:"🧩"}),"პაზლის ნაწილები"]}),t.jsxs("div",{style:{position:"relative"},children:[A&&t.jsx(Q,{children:t.jsx(K,{})}),t.jsx(V,{size:o,isTarget:!1,children:g.map((r,i)=>r&&t.jsx(q,{image:e,size:o,bgPosition:r.bgPosition,onClick:()=>N(i),isDragging:d===i,children:x&&t.jsx(ce,{children:parseInt(r.id)+1})},r.id))})]})]}),t.jsxs(oe,{children:[t.jsxs(W,{children:[t.jsx("span",{children:"🖼️"}),"ორიგინალი სურათი",t.jsx("span",{style:{marginLeft:"auto",fontSize:"0.8em",opacity:.7},children:"(დააჭირე გასადიდებლად)"})]}),t.jsx(ae,{size:o,isExpanded:C,onClick:w,children:t.jsx(ie,{image:e,size:o,isExpanded:C})}),t.jsxs(le,{children:[t.jsx(J,{variant:"primary",onClick:p,children:x?"🔍 დამალე მინიშნებები":"💡 მაჩვენე მინიშნებები"}),t.jsx(J,{onClick:X,children:"🏠 მთავარ მენიუში დაბრუნება"})]})]})]})]}),d!==null&&g[d]&&t.jsx(ge,{image:e,size:o,bgPosition:g[d].bgPosition,style:{left:I.x,top:I.y}})]})};s.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;s.h2`
  color: #2196F3;
  margin-bottom: 15px;
`;s.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
`;s.button`
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
`;const be=s.div`
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
`,fe=s.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  max-width: 64rem;
  margin-left: auto;
  margin-right: auto;
  padding: 0 1rem;
  gap: 1rem;
`,he=s.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`,we=s.h1`
  font-size: 1.5rem;
  font-weight: bold;
  color: #2196F3;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  @media (min-width: 640px) {
    font-size: 1.875rem;
  }
`,ve=s.span`
  font-size: 1.5rem;
  
  @media (min-width: 640px) {
    font-size: 2rem;
  }
`,ye=s.main`
  max-width: 64rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0 1rem;
  padding-bottom: 2rem;
`,je=s.div`
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border-radius: 1rem;
  padding: 1rem;
`,$e=s(je)`
  text-align: center;
`,ze=s.h2`
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`,Se=s.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
`,ke=s.button`
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
`,Pe=s.label`
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
`,Ce=s.button`
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
`,Te=v`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`,Ee=s.div`
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #2196F3;
  border-radius: 50%;
  animation: ${Te} 1s linear infinite;
  margin: 0 auto;
`,De=s.div`
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
`,Fe=v`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`,Ie=v`
  from { opacity: 1; transform: translateY(0); }
  to { opacity: 0; transform: translateY(-20px); }
`,Ae=s.div`
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
  animation: ${e=>e.isClosing?Ie:Fe} 0.5s ease forwards;
  backdrop-filter: blur(10px);
`,Le=s.div`
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
`,Ye=()=>{const{playerName:e}=_(),o=ee(),[y,E]=n.useState(3),[X,Y]=n.useState(0),[j,g]=n.useState(null),[O,R]=n.useState(0),[$,u]=n.useState(!1),[D,f]=n.useState(""),[F,x]=n.useState(!1),[z,S]=n.useState(!1),[k,P]=n.useState(!1),[U,d]=n.useState(""),h=()=>{const a=[`ყოჩაღ ${e}! შენ ეს შეძელი! 🎉`,`საოცარი ხარ ${e}! გააგრძელე ასე! 🌟`,`ბრავო ${e}! შესანიშნავად გაართვი თავი! 👏`,`არაჩვეულებრივია ${e}! შენ ნამდვილი გენიოსი ხარ! 🎯`,`გილოცავ ${e}! კიდევ ერთი ამოცანა გადალახე! 🏆`,`${e}, შენ მართლაც ნიჭიერი ხარ! 🌈`,`დიდებულია ${e}! ასე განაგრძე! ⭐`,`${e}, შენ ნამდვილი გმირი ხარ! 🦸‍♂️`];return a[Math.floor(Math.random()*a.length)]},I=a=>{f(a),u(!0),setTimeout(()=>{x(!0),setTimeout(()=>{u(!1),x(!1)},500)},3e3)},H=a=>{new Date().toISOString(),I(`გილოცავთ ${e||"მოთამაშე"}! თქვენ წარმატებით დაასრულეთ პაზლი ${a||0} შეცდომით! 🎉`),setTimeout(()=>{u(!1),x(!1),o("/")},3500)},A=()=>{R(a=>a+1)},m=a=>{g(a),R(0)},C=()=>{o("/")},T=async()=>{try{const a=await navigator.clipboard.read();for(const p of a)if(p.types.includes("image/png")){const w=await p.getType("image/png"),r=URL.createObjectURL(w);m(r);break}}catch(a){console.error("Error handling pasted image:",a)}},L=async a=>{S(!0),await new Promise(p=>setTimeout(p,500)),E(a),S(!1)},M=a=>{const p=a.target.files[0];if(p){const w=new FileReader;w.onload=r=>{g(r.target.result)},w.readAsDataURL(p)}},N=()=>{P(!0),d(h()),setTimeout(()=>{P(!1)},3e3)};return n.useEffect(()=>(window.addEventListener("paste",T),()=>window.removeEventListener("paste",T)),[]),t.jsxs(be,{children:[t.jsx(te,{}),$&&t.jsx(Ae,{isClosing:F,children:D}),k&&t.jsx(Le,{children:U}),t.jsxs(fe,{children:[t.jsxs(we,{children:[t.jsx(ve,{children:"🎮"}),"გამარჯობა, ",e,"! 👋"]}),t.jsxs(he,{children:[t.jsxs(Ce,{onClick:T,children:[t.jsx("span",{children:"📋"}),"ჩასმა (Ctrl+V)"]}),t.jsxs(Pe,{children:[t.jsx("span",{children:"📤"}),"სურათის ატვირთვა",t.jsx("input",{type:"file",accept:"image/*",onChange:M,id:"imageUpload",name:"imageUpload"})]})]})]}),t.jsxs(ye,{children:[t.jsxs($e,{children:[t.jsx(ze,{children:"აირჩიე სირთულის დონე"}),t.jsx(Se,{children:[3,4,5].map(a=>t.jsxs(ke,{isSelected:y===a,onClick:()=>L(a),disabled:z,children:[a,"x",a]},a))})]}),t.jsxs("div",{style:{position:"relative"},children:[z&&t.jsx(De,{children:t.jsx(Ee,{})}),j&&t.jsx(xe,{image:j,difficulty:y,onProgress:Y,onComplete:a=>H(a),onBackToMenu:C,onImageChange:m,onError:A,onCorrectAnswer:N})]})]})]})};export{Ye as default};
