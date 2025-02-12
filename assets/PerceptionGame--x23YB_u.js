import{m as A,d as o,r as c,u as R,j as a,H as D}from"./index-DRceNf5D.js";import{z as J,s as K,l as L,d as O,m as W,i as Q,t as U,k as V,f as _,a as ss,c as es,e as as,b as ts,g as is,q as ns,o as rs,r as os,h as cs,j as ds,n as ms,p as ls,u as gs,v as ps,w as hs,x as us,y as xs,A as bs,B as fs,C as Is,D as vs,E as ks,F as js,G as ws,H as Bs,I as Ss,J as Ms,K as ys,L as Cs}from"./არწივი-B6yRfamE.js";const $s=[{id:1,src:"⭕",name:"წრე"},{id:2,src:"⬛",name:"კვადრატი"},{id:3,src:"🔺",name:"სამკუთხედი"},{id:4,src:"🔷",name:"ექვსკუთხედი"},{id:5,src:"⭐",name:"ვარსკვლავი"},{id:6,src:"💠",name:"რომბი"},{id:7,src:"🟥",name:"წითელი კვადრატი"},{id:8,src:"🟦",name:"ლურჯი კვადრატი"},{id:9,src:"🟨",name:"ყვითელი კვადრატი"},{id:10,src:"🟩",name:"მწვანე კვადრატი"},{id:11,src:"🟧",name:"ნარინჯისფერი კვადრატი"},{id:12,src:"🟪",name:"იისფერი კვადრატი"},{id:13,src:"⬜",name:"თეთრი კვადრატი"},{id:14,src:"🔶",name:"ნარინჯისფერი რომბი"},{id:15,src:"🔸",name:"პატარა რომბი"},{id:16,src:"🔹",name:"პატარა ლურჯი რომბი"},{id:17,src:"🔻",name:"წითელი სამკუთხედი"},{id:18,src:"🔲",name:"შავი კვადრატი თეთრი ჩარჩოთი"},{id:19,src:"🔳",name:"თეთრი კვადრატი შავი ჩარჩოთი"},{id:20,src:"✡️",name:"ექვსქიმიანი ვარსკვლავი"},{id:21,src:"✴️",name:"რვაქიმიანი ვარსკვლავი"},{id:22,src:"✳️",name:"რვაქიმიანი ვარსკვლავი 2"},{id:23,src:"❇️",name:"მბზინავი ვარსკვლავი"},{id:24,src:"⚜️",name:"ჰერალდიკური შროშანი"},{id:25,src:"⚫",name:"შავი წრე"},{id:26,src:"⚪",name:"თეთრი წრე"},{id:27,src:"🔴",name:"წითელი წრე"},{id:28,src:"🔵",name:"ლურჯი წრე"},{id:29,src:"⭕",name:"წითელი წრიული ჩარჩო"},{id:30,src:"➕",name:"პლუსი"},{id:31,src:"➖",name:"მინუსი"},{id:32,src:"✖️",name:"გამრავლება"},{id:33,src:"➗",name:"გაყოფა"},{id:34,src:"〰️",name:"ტალღოვანი ხაზი"},{id:35,src:"⬆️",name:"ზემოთ ისარი"},{id:36,src:"➡️",name:"მარჯვნივ ისარი"},{id:37,src:"⬇️",name:"ქვემოთ ისარი"},{id:38,src:"⬅️",name:"მარცხნივ ისარი"},{id:39,src:"↗️",name:"დიაგონალური ისარი ზემოთ"},{id:40,src:"↘️",name:"დიაგონალური ისარი ქვემოთ"},{id:41,src:"🎯",name:"სამიზნე"},{id:42,src:"🔆",name:"მზის სიმბოლო"},{id:43,src:"✨",name:"ნაპერწკლები"},{id:44,src:"💫",name:"მბრუნავი ვარსკვლავი"},{id:45,src:"🌟",name:"მბზინავი ვარსკვლავი"},{id:46,src:"🎨",name:"პალიტრა"},{id:47,src:"🎭",name:"თეატრის ნიღბები"},{id:48,src:"🎪",name:"ცირკის კარავი"},{id:49,src:"🎡",name:"ბორბალი"},{id:50,src:"🎢",name:"ამერიკული მთები"}],zs=()=>[{id:1,src:J},{id:2,src:K},{id:3,src:L},{id:4,src:O},{id:5,src:W},{id:6,src:Q},{id:7,src:U},{id:8,src:V},{id:9,src:_},{id:10,src:ss},{id:11,src:es},{id:12,src:as},{id:13,src:ts},{id:14,src:is},{id:15,src:ns},{id:16,src:rs},{id:17,src:os},{id:18,src:cs},{id:19,src:ds},{id:20,src:ms},{id:21,src:ls},{id:22,src:gs},{id:23,src:ps},{id:24,src:hs},{id:25,src:us},{id:26,src:xs},{id:27,src:bs},{id:28,src:fs},{id:29,src:Is},{id:30,src:vs},{id:31,src:ks},{id:32,src:js},{id:33,src:ws},{id:34,src:Bs},{id:35,src:Ss},{id:36,src:Ms},{id:37,src:ys},{id:38,src:Cs}],Ts=A`
  0% { transform: translateX(0); background-color: rgba(255, 0, 0, 0.3); }
  25% { transform: translateX(-5px); }
  50% { transform: translateX(5px); }
  75% { transform: translateX(-5px); }
  100% { transform: translateX(0); background-color: transparent; }
`,y=o.div`
  position: relative;
  cursor: pointer;
  overflow: hidden;
  border-radius: 8px;
  aspect-ratio: 1;
  &.wrong {
    animation: ${Ts} 0.5s ease-in-out;
  }
`,Rs=()=>{const[n,f]=c.useState([]),[x,I]=c.useState([]),[d,h]=c.useState(null),[v,u]=c.useState(null),[l,k]=c.useState([]),[b,j]=c.useState([]),[G,E]=c.useState(0),[F,H]=c.useState(0),[N,w]=c.useState(1),[m,B]=c.useState(!1),[g,S]=c.useState(null),{updateGameProgress:X}=R();c.useEffect(()=>{p()},[]);const p=()=>{if(m){const e=[...$s],s=[];for(;s.length<4;){const i=Math.floor(Math.random()*e.length),r=e[i];s.push({id:r.id,name:r.name,src:r.src}),e.splice(i,1)}f(s);const t=[...s];for(let i=0;i<t.length;i++)if(t[i].id===s[i].id){const r=(i+Math.floor(t.length/2))%t.length;[t[i],t[r]]=[t[r],t[i]]}I(t)}else{const e=zs(),s=[];for(;s.length<4;){const r=Math.floor(Math.random()*e.length);s.includes(r)||s.push(r)}const t=s.map(r=>e[r]);f(t);const i=[...t];for(let r=0;r<i.length;r++)if(i[r]===t[r]){const M=(r+Math.floor(i.length/2))%i.length;[i[r],i[M]]=[i[M],i[r]]}I(i)}h(null),u(null),k([]),j([])};c.useEffect(()=>{p()},[m]);const Z=e=>{l.includes(e)||h(e)},q=e=>{if(d===null||b.includes(e))return;u(e),H(t=>t+1),x[e].id===n[d].id?(k(t=>[...t,d]),j(t=>[...t,e]),E(t=>t+1),h(null),u(null),l.length+1===n.length&&setTimeout(()=>{X("perception",G+1,F+1),p()},1e3)):(S({top:d,bottom:e}),setTimeout(()=>{h(null),u(null),S(null)},1e3))},P=()=>{w(e=>Math.min(e+.1,1.5))},Y=()=>{w(e=>Math.max(e-.1,.5))};return a.jsxs(Gs,{children:[a.jsx(D,{}),a.jsxs(a.Fragment,{children:[a.jsx(Es,{children:"აღქმის განსავითარებელი სავარჯიშოები"}),a.jsxs("div",{children:[a.jsx(T,{onClick:()=>{B(!1),p()},className:m?"":"active",children:"ცხოველები"}),a.jsx(T,{onClick:()=>{B(!0),p()},className:m?"active":"",children:"ფიგურები"})]}),a.jsxs(Fs,{scale:N,children:[a.jsx(Hs,{children:a.jsx(Xs,{children:n.map((e,s)=>a.jsx(y,{isClickable:!l.includes(s),onClick:()=>Z(s),isMatched:l.includes(s),className:(g==null?void 0:g.top)===s?"wrong":"",style:{border:d===s?"3px solid #4CAF50":"none",padding:"5px",opacity:d===s?.7:1},children:m?a.jsx($,{isBottom:!1,isMatched:l.includes(s),children:e.src}):a.jsx(C,{id:`top-${s}`,src:e.src,alt:`Top half ${s+1}`,isBottom:!1,isMatched:l.includes(s)})},`top-${s}`))})}),a.jsx(Ns,{children:a.jsx(Zs,{children:x.map((e,s)=>a.jsx(y,{isClickable:d!==null,onClick:()=>q(s),isHidden:b.includes(s),className:(g==null?void 0:g.bottom)===s?"wrong":"",style:{border:v===s?"3px solid #4CAF50":"none",padding:"5px",opacity:b.includes(s)?0:1},children:m?a.jsx($,{isBottom:!0,isMatched:!1,children:e.src}):a.jsx(C,{id:`bottom-${s}`,src:e.src,alt:`Bottom half ${s+1}`,isBottom:!0,isSelected:v===s})},`bottom-${s}`))})})]}),a.jsxs(qs,{children:[a.jsx(z,{onClick:Y,children:"-"}),a.jsx(z,{onClick:P,children:"+"})]})]})]})},As=A`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`,Gs=o.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(-45deg, #64ccf0cc, #80d0c7cc, #56bcbdcc, #52b69acc);
  background-size: 400% 400%;
  animation: ${As} 10s linear infinite;
  overflow: auto;
`,Es=o.h1`
  color: white;
  text-align: center;
  margin: 20px 0;
  font-size: 2.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
`;o.div`
  color: white;
  text-align: center;
  font-size: 1.5rem;
  margin: 10px 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
`;const Fs=o.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 800px;
  margin: 0 auto;
  padding: 20px;
  transform: scale(${n=>n.scale});
  transform-origin: center top;
`,Hs=o.div`
  background: rgba(255, 255, 255, 0.9);
  padding: 10px;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  min-height: 180px;
  display: flex;
  align-items: center;
`,Ns=o.div`
  background: rgba(255, 255, 255, 0.9);
  padding: 10px;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  min-height: 180px;
  display: flex;
  align-items: center;
`,Xs=o.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  width: 100%;
`,Zs=o.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  width: 100%;
`,C=o.img`
  width: 100%;
  height: 200%;
  object-fit: cover;
  border-radius: 8px;
  object-position: center;
  clip-path: ${n=>n.isBottom?"inset(50% 0 0 0)":"inset(0 0 50% 0)"};
  transform: ${n=>n.isBottom?"translateY(-50%)":"none"};
  transition: all 0.3s ease;
  ${n=>n.isMatched&&`
    clip-path: none;
    height: 100%;
    transform: none;
    object-position: center;
  `}
`,$=o.div`
  width: 100%;
  height: 200%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 8rem;
  clip-path: ${n=>n.isBottom?"inset(50% 0 0 0)":"inset(0 0 50% 0)"};
  transform: ${n=>n.isBottom?"translateY(-50%)":"none"};
  transition: all 0.3s ease;
  position: absolute;
  top: 0;
  ${n=>n.isMatched&&`
    clip-path: none;
    height: 100%;
    position: relative;
    transform: none;
  `}
`,qs=o.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: flex;
  gap: 10px;
`,z=o.button`
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
`,T=o.button`
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
`;o.div`
  color: white;
  text-align: center;
  font-size: 1.2rem;
  margin: 10px 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  background: rgba(255, 255, 255, 0.1);
  padding: 8px 16px;
  border-radius: 8px;
  backdrop-filter: blur(4px);
`;export{Rs as default};
