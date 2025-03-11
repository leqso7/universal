import{d as o,r as s,j as t}from"./index-tGxMpH2D.js";const d=o.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`,l=o.div`
  background-color: white;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 90%;
  max-width: 400px;
  text-align: center;
`,p=o.h2`
  color: #2196F3;
  margin-bottom: 20px;
`,x=o.input`
  width: 100%;
  padding: 12px;
  margin: 10px 0;
  border: 2px solid #2196F3;
  border-radius: 8px;
  font-size: 16px;
  outline: none;

  &:focus {
    box-shadow: 0 0 0 2px rgba(33, 150, 243, 0.2);
  }
`,c=o.button`
  background-color: #4CAF50;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 10px;

  &:hover {
    background-color: #388E3C;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`,u=({onSubmit:a})=>{const[e,n]=s.useState(""),i=r=>{r.preventDefault(),e.trim()&&(a(e.trim()),localStorage.setItem("playerName",e.trim()))};return t.jsx(d,{children:t.jsxs(l,{children:[t.jsx(p,{children:"გამარჯობა! 👋"}),t.jsxs("form",{onSubmit:i,children:[t.jsx(x,{type:"text",value:e,onChange:r=>n(r.target.value),placeholder:"შეიყვანე შენი სახელი",autoFocus:!0,id:"playerName",name:"playerName"}),t.jsx(c,{type:"submit",disabled:!e.trim(),children:"დაწყება 🎮"})]})]})})};export{u as N};
