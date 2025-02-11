import{d as g,a as U,r as a,j as l,H as F}from"./index-DLCZSHJr.js";const u=[[[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,0,0,0,0,0,1,0,0,0,0,0,0,0,1],[1,1,1,1,1,0,1,0,1,1,1,1,1,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,1,0,1],[1,0,1,1,1,1,1,1,1,1,1,0,1,0,1],[1,0,0,0,0,0,0,0,0,0,1,0,0,0,1],[1,1,1,1,1,1,1,1,1,0,1,1,1,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]],[[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,0,0,0,1,0,0,0,0,0,0,0,0,0,1],[1,1,1,0,1,0,1,1,1,1,1,1,1,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,1,0,1],[1,0,1,1,1,1,1,1,1,1,1,0,1,0,1],[1,0,0,0,0,0,1,0,0,0,0,0,0,0,1],[1,1,1,1,1,0,1,0,1,1,1,1,1,1,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,1,1,1,1,1,1,1,1,1,0,1,0,1],[1,0,0,0,0,0,0,0,0,0,1,0,0,0,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]],[[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,0,0,0,0,0,0,0,0,0,1,0,0,0,1],[1,0,1,1,1,1,1,1,1,0,1,0,1,0,1],[1,0,0,0,0,0,0,0,1,0,0,0,1,0,1],[1,1,1,1,1,1,1,0,1,1,1,1,1,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,1,1,1,1,1,1,1,1,1,1,1,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,1,0,1],[1,0,1,1,1,1,1,1,1,1,1,0,1,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]]],K=[{char1:"🐱",char2:"🐶",target1:"🐟",target2:"🦴",description:"კატა ეძებს თევზს, ძაღლი - ძვალს"},{char1:"🐭",char2:"🐰",target1:"🧀",target2:"🥕",description:"თაგვი ეძებს ყველს, კურდღელი - სტაფილოს"},{char1:"🦊",char2:"🐻",target1:"🍗",target2:"🍯",description:"მელია ეძებს ქათამს, დათვი - თაფლს"}],N=g.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  background: linear-gradient(-45deg, #64ccf0cc, #80d0c7cc, #56bcbdcc, #52b69acc);
`,X=g.div`
  display: grid;
  grid-template-columns: repeat(15, 30px);
  gap: 1px;
  background: rgba(255, 255, 255, 0.1);
  padding: 10px;
  border-radius: 10px;
  margin: 20px 0;
`,Y=g.div`
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  background-color: ${b=>b.isWall?"#4a90e2":"white"};
  border-radius: 4px;
`,q=g.h1`
  color: white;
  text-align: center;
  margin: 20px 0;
  font-size: 2rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
`,I=g.div`
  display: flex;
  gap: 10px;
  margin: 10px 0;
`,B=g.button`
  padding: 10px 20px;
  font-size: 1.2rem;
  background: ${b=>b.isSelected?"rgba(255, 255, 255, 0.9)":"rgba(255, 255, 255, 0.5)"};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.7);
  }
`,$=g.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(255, 255, 255, 0.9);
  padding: 20px 40px;
  border-radius: 10px;
  font-size: 1.5rem;
  color: #333;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  text-align: center;
`;g.button`
  padding: 10px 20px;
  font-size: 1.2rem;
  background: rgba(100, 100, 255, 0.7);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 20px;

  &:hover {
    background: rgba(100, 100, 255, 0.9);
  }
`;const O=()=>{const b=U(),[s,G]=a.useState(0),[d,z]=a.useState(null),[h,M]=a.useState(null),[x,P]=a.useState("char1"),[p,A]=a.useState(null),[f,T]=a.useState(null),[w,E]=a.useState(!1),[C,v]=a.useState(!1),[R,D]=a.useState(!1),m=K[s],y=a.useCallback((n=[],e=0)=>{const r=[],t=u[s],c=(o,i)=>Math.abs(o.x-i.x)+Math.abs(o.y-i.y);for(let o=0;o<t.length;o++)for(let i=0;i<t[o].length;i++)if(t[o][i]===0){const j={x:i,y:o},W=n.some(k=>k&&k.x===i&&k.y===o),H=n.every(k=>!k||c(j,k)>=e);!W&&H&&r.push(j)}if(r.length===0)return e>1?y(n,e-1):null;const L={x:7,y:5};return r.sort((o,i)=>{const j=c(o,L);return c(i,L)-j}),r[Math.floor(Math.random()*Math.min(3,r.length))]},[s]);a.useEffect(()=>{(()=>{const e=y([],0);if(!e)return;z(e);const r=y([e],3);if(!r)return;M(r);const t=y([e,r],4);if(!t)return;A(t);const c=y([e,r,t],4);c&&T(c)})()},[s,y]);const S=a.useCallback((n,e)=>{const r=x==="char1"?d:h;if(x==="char1"&&w||x==="char2"&&C)return;const t=r.x+n,c=r.y+e;t>=0&&t<u[s][0].length&&c>=0&&c<u[s].length&&u[s][c][t]===0&&(x==="char1"?z({x:t,y:c}):M({x:t,y:c}))},[x,d,h,w,C,s]);return a.useEffect(()=>{const n=e=>{switch((e.key==="ArrowUp"||e.key==="w"||e.key==="ArrowDown"||e.key==="s"||e.key==="ArrowLeft"||e.key==="a"||e.key==="ArrowRight"||e.key==="d")&&e.preventDefault(),e.key){case"ArrowUp":case"w":S(0,-1);break;case"ArrowDown":case"s":S(0,1);break;case"ArrowLeft":case"a":S(-1,0);break;case"ArrowRight":case"d":S(1,0);break}};return window.addEventListener("keydown",n),()=>window.removeEventListener("keydown",n)},[S]),a.useEffect(()=>{d&&p&&d.x===p.x&&d.y===p.y&&E(!0),h&&f&&h.x===f.x&&h.y===f.y&&v(!0),w&&C&&(D(!0),s<u.length-1?setTimeout(()=>{G(n=>n+1),z(null),M(null),A(null),T(null),E(!1),v(!1),D(!1)},1e3):setTimeout(()=>{b("/")},1500))},[d,h,p,f,s,b,w,C]),l.jsxs(N,{children:[l.jsx(F,{}),l.jsx(q,{children:"ლაბირინთი"}),R&&s===u.length-1&&l.jsx($,{children:"გილოცავთ! თქვენ გაიარეთ ყველა დონე! 🎉"}),R&&s<u.length-1&&l.jsx($,{children:"გილოცავთ! გადადიხართ შემდეგ დონეზე! 🎮"}),l.jsxs(I,{children:[l.jsx(B,{isSelected:x==="char1",onClick:()=>P("char1"),children:m.char1}),l.jsx(B,{isSelected:x==="char2",onClick:()=>P("char2"),children:m.char2})]}),l.jsx(X,{children:u[s].map((n,e)=>n.map((r,t)=>l.jsx(Y,{isWall:r===1,children:d&&d.x===t&&d.y===e?m.char1:h&&h.x===t&&h.y===e?m.char2:p&&p.x===t&&p.y===e&&!w?m.target1:f&&f.x===t&&f.y===e&&!C?m.target2:""},`${t}-${e}`)))})]})};export{O as default};
