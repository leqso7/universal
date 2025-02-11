import{r as c,u as Y,j as a,H as D,m as R,d as r}from"./index-CoYF6bli.js";import{z as J,s as K,l as L,d as O,m as Q,i as U,t as V,k as W,f as X,a as _,c as ee,e as se,b as ie,g as ae,q as te,o as ne,r as oe,h as re,j as ce,n as de,p as me,u as le,v as ge,w as pe,x as he,y as xe,A as ue,B as be,C as fe,D as Ie,E as ve,F as ke,G as je,H as we,I as Se,J as Be,K as Ce,L as $e}from"./არწივი-B6yRfamE.js";const ye=[{id:1,src:"⭕",name:"წრე"},{id:2,src:"⬛",name:"კვადრატი"},{id:3,src:"🔺",name:"სამკუთხედი"},{id:4,src:"🔷",name:"ექვსკუთხედი"},{id:5,src:"⭐",name:"ვარსკვლავი"},{id:6,src:"💠",name:"რომბი"},{id:7,src:"🟥",name:"წითელი კვადრატი"},{id:8,src:"🟦",name:"ლურჯი კვადრატი"},{id:9,src:"🟨",name:"ყვითელი კვადრატი"},{id:10,src:"🟩",name:"მწვანე კვადრატი"},{id:11,src:"🟧",name:"ნარინჯისფერი კვადრატი"},{id:12,src:"🟪",name:"იისფერი კვადრატი"},{id:13,src:"⬜",name:"თეთრი კვადრატი"},{id:14,src:"🔶",name:"ნარინჯისფერი რომბი"},{id:15,src:"🔸",name:"პატარა რომბი"},{id:16,src:"🔹",name:"პატარა ლურჯი რომბი"},{id:17,src:"🔻",name:"წითელი სამკუთხედი"},{id:18,src:"🔲",name:"შავი კვადრატი თეთრი ჩარჩოთი"},{id:19,src:"🔳",name:"თეთრი კვადრატი შავი ჩარჩოთი"},{id:20,src:"✡️",name:"ექვსქიმიანი ვარსკვლავი"},{id:21,src:"✴️",name:"რვაქიმიანი ვარსკვლავი"},{id:22,src:"✳️",name:"რვაქიმიანი ვარსკვლავი 2"},{id:23,src:"❇️",name:"მბზინავი ვარსკვლავი"},{id:24,src:"⚜️",name:"ჰერალდიკური შროშანი"},{id:25,src:"⚫",name:"შავი წრე"},{id:26,src:"⚪",name:"თეთრი წრე"},{id:27,src:"🔴",name:"წითელი წრე"},{id:28,src:"🔵",name:"ლურჯი წრე"},{id:29,src:"⭕",name:"წითელი წრიული ჩარჩო"},{id:30,src:"➕",name:"პლუსი"},{id:31,src:"➖",name:"მინუსი"},{id:32,src:"✖️",name:"გამრავლება"},{id:33,src:"➗",name:"გაყოფა"},{id:34,src:"〰️",name:"ტალღოვანი ხაზი"},{id:35,src:"⬆️",name:"ზემოთ ისარი"},{id:36,src:"➡️",name:"მარჯვნივ ისარი"},{id:37,src:"⬇️",name:"ქვემოთ ისარი"},{id:38,src:"⬅️",name:"მარცხნივ ისარი"},{id:39,src:"↗️",name:"დიაგონალური ისარი ზემოთ"},{id:40,src:"↘️",name:"დიაგონალური ისარი ქვემოთ"},{id:41,src:"🎯",name:"სამიზნე"},{id:42,src:"🔆",name:"მზის სიმბოლო"},{id:43,src:"✨",name:"ნაპერწკლები"},{id:44,src:"💫",name:"მბრუნავი ვარსკვლავი"},{id:45,src:"🌟",name:"მბზინავი ვარსკვლავი"},{id:46,src:"🎨",name:"პალიტრა"},{id:47,src:"🎭",name:"თეატრის ნიღბები"},{id:48,src:"🎪",name:"ცირკის კარავი"},{id:49,src:"🎡",name:"ბორბალი"},{id:50,src:"🎢",name:"ამერიკული მთები"}],Me=()=>[{id:1,src:J},{id:2,src:K},{id:3,src:L},{id:4,src:O},{id:5,src:Q},{id:6,src:U},{id:7,src:V},{id:8,src:W},{id:9,src:X},{id:10,src:_},{id:11,src:ee},{id:12,src:se},{id:13,src:ie},{id:14,src:ae},{id:15,src:te},{id:16,src:ne},{id:17,src:oe},{id:18,src:re},{id:19,src:ce},{id:20,src:de},{id:21,src:me},{id:22,src:le},{id:23,src:ge},{id:24,src:pe},{id:25,src:he},{id:26,src:xe},{id:27,src:ue},{id:28,src:be},{id:29,src:fe},{id:30,src:Ie},{id:31,src:ve},{id:32,src:ke},{id:33,src:je},{id:34,src:we},{id:35,src:Se},{id:36,src:Be},{id:37,src:Ce},{id:38,src:$e}],Re=()=>{const[s,u]=c.useState([]),[b,f]=c.useState([]),[l,p]=c.useState(null),[I,h]=c.useState(null),[m,v]=c.useState([]),[T,k]=c.useState([]),[j,A]=c.useState(0),[H,F]=c.useState(0),[G,w]=c.useState(1),[d,S]=c.useState(!1);c.useState(!1);const{currentPlayer:x,updateGameProgress:E}=Y(),g=()=>{if(d){const t=[...ye],e=[];for(;e.length<4;){const i=Math.floor(Math.random()*t.length),n=t[i];e.push({id:n.id,name:n.name,src:n.src}),t.splice(i,1)}u(e);const o=[...e];for(let i=0;i<o.length;i++)if(o[i].id===e[i].id){const n=(i+Math.floor(o.length/2))%o.length;[o[i],o[n]]=[o[n],o[i]]}f(o)}else{const t=Me(),e=[];for(;e.length<4;){const n=Math.floor(Math.random()*t.length);e.includes(n)||e.push(n)}const o=e.map(n=>t[n]);u(o);const i=[...o];for(let n=0;n<i.length;n++)if(i[n]===o[n]){const B=(n+Math.floor(i.length/2))%i.length;[i[n],i[B]]=[i[B],i[n]]}f(i)}p(null),h(null),v([]),k([])};c.useEffect(()=>{g()},[]),c.useEffect(()=>{g()},[d]);const P=t=>{m.includes(t)||p(t)},Z=t=>{if(l===null)return;h(t),F(o=>o+1);const e=b[t].id===s[l].id;if(e){const o=j+1;A(o),v(i=>[...i,l]),k(i=>[...i,t]),E("perception",Date.now(),{score:o,totalAttempts:H+1,mode:d?"shapes":"animals"})}setTimeout(()=>{p(null),h(null),m.length+(e?1:0)===s.length&&setTimeout(g,1e3)},1e3)},q=()=>{w(t=>Math.min(t+.1,1.5))},N=()=>{w(t=>Math.max(t-.1,.5))};return a.jsxs(Te,{children:[a.jsx(D,{}),a.jsxs(a.Fragment,{children:[a.jsx(Ae,{children:"აღქმის განსავითარებელი სავარჯიშოები"}),a.jsxs(Ne,{children:["მოსწავლე: ",(x==null?void 0:x.name)||"უცნობი"]}),a.jsxs("div",{children:[a.jsx(z,{onClick:()=>{S(!1),g()},className:d?"":"active",children:"ცხოველები"}),a.jsx(z,{onClick:()=>{S(!0),g()},className:d?"active":"",children:"ფიგურები"})]}),a.jsxs(He,{children:["ნაპოვნია: ",j," / 50"]}),a.jsxs(Fe,{scale:G,children:[a.jsx(Ge,{children:a.jsx(Pe,{children:s.map((t,e)=>a.jsx(C,{isClickable:!m.includes(e),onClick:()=>P(e),isMatched:m.includes(e),style:{border:l===e?"3px solid #4CAF50":"none"},children:d?a.jsx(y,{isBottom:!1,isMatched:m.includes(e),children:t.src}):a.jsx($,{id:`top-${e}`,src:t.src,alt:`Top half ${e+1}`,isBottom:!1,isMatched:m.includes(e)})},`top-${e}`))})}),a.jsx(Ee,{children:a.jsx(Ze,{children:b.map((t,e)=>a.jsx(C,{isClickable:l!==null,onClick:()=>Z(e),isHidden:T.includes(e),style:{border:I===e?"3px solid #4CAF50":"none"},children:d?a.jsx(y,{isBottom:!0,isMatched:!1,children:t.src}):a.jsx($,{id:`bottom-${e}`,src:t.src,alt:`Bottom half ${e+1}`,isBottom:!0,isSelected:I===e})},`bottom-${e}`))})})]}),a.jsxs(qe,{children:[a.jsx(M,{onClick:N,children:"-"}),a.jsx(M,{onClick:q,children:"+"})]})]})]})},ze=R`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`,Te=r.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(-45deg, #64ccf0cc, #80d0c7cc, #56bcbdcc, #52b69acc);
  background-size: 400% 400%;
  animation: ${ze} 10s linear infinite;
  overflow: auto;
`,Ae=r.h1`
  color: white;
  text-align: center;
  margin: 20px 0;
  font-size: 2.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
`,He=r.div`
  color: white;
  text-align: center;
  font-size: 1.5rem;
  margin: 10px 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
`,Fe=r.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 800px;
  margin: 0 auto;
  padding: 20px;
  transform: scale(${s=>s.scale});
  transform-origin: center top;
`,Ge=r.div`
  background: rgba(255, 255, 255, 0.9);
  padding: 10px;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  min-height: 180px;
  display: flex;
  align-items: center;
`,Ee=r.div`
  background: rgba(255, 255, 255, 0.9);
  padding: 10px;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  min-height: 180px;
  display: flex;
  align-items: center;
`,Pe=r.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  width: 100%;
`,Ze=r.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  width: 100%;
`,C=r.div`
  position: relative;
  cursor: ${s=>s.isClickable?"pointer":"default"};
  transition: all 0.3s ease;
  overflow: hidden;
  aspect-ratio: 1;
  height: 140px;
  border-radius: 10px;
  box-shadow: ${s=>s.isSelected?"0 0 0 3px #4CAF50":"none"};
  opacity: ${s=>s.isHidden?"0":"1"};
  visibility: ${s=>s.isHidden?"hidden":"visible"};

  &:hover {
    transform: ${s=>s.isClickable?"scale(1.05)":"none"};
  }
`,$=r.img`
  width: 100%;
  height: 200%;
  object-fit: cover;
  border-radius: 8px;
  object-position: center;
  clip-path: ${s=>s.isBottom?"inset(50% 0 0 0)":"inset(0 0 50% 0)"};
  transform: ${s=>s.isBottom?"translateY(-50%)":"none"};
  transition: all 0.3s ease;
  ${s=>s.isMatched&&`
    clip-path: none;
    height: 100%;
    object-position: center;
  `}
`,y=r.div`
  width: 100%;
  height: 200%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 8rem;
  clip-path: ${s=>s.isBottom?"inset(50% 0 0 0)":"inset(0 0 50% 0)"};
  transform: ${s=>s.isBottom?"translateY(-100%)":"none"};
  transition: all 0.3s ease;
  position: absolute;
  top: ${s=>s.isBottom?"100%":"0"};
  ${s=>s.isMatched&&`
    clip-path: none;
    height: 100%;
    position: relative;
    transform: none;
    top: 0;
  `}
`,qe=r.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: flex;
  gap: 10px;
`,M=r.button`
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
`,z=r.button`
  padding: 10px 20px;
  margin: 10px;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    background: rgba(255, 255, 255, 1);
    transform: translateY(-2px);
  }

  &.active {
    background: #4CAF50;
    color: white;
  }
`,Ne=r.div`
  color: white;
  text-align: center;
  font-size: 1.2rem;
  margin: 10px 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  background: rgba(255, 255, 255, 0.1);
  padding: 8px 16px;
  border-radius: 8px;
  backdrop-filter: blur(4px);
`;export{Re as default};
