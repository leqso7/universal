import{d as m,m as le,r as h,R as it,j as l,g as lt,b as ct,c as ut,u as dt,a as ft,H as pt}from"./index-DbIYvZCS.js";import"./NameModal-Bod3gzKy.js";const mt=m.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-height: calc(100vh - 200px);
`,ht=m.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
`,vt=m.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 100%;
`;m.div`
  display: flex;
  justify-content: center;
`;const Ee=m.div`
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border-radius: 1rem;
  padding: 1rem;
  height: fit-content;
`,Se=m.h3`
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #2196F3;
`,gt=m(Ee)`
  flex: 1;
  display: flex;
  flex-direction: column;
`,bt=m.div`
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
`,yt=m.div`
  width: 100%;
  height: 100%;
  background-image: url(${e=>e.image});
  background-size: ${e=>e.isExpanded?"cover":`${e.size*100}% ${e.size*100}%`};
  background-position: center;
  background-repeat: no-repeat;
  transition: all 0.3s ease;
`,ke=m.div`
  display: grid;
  grid-template-columns: repeat(${e=>e.size}, 1fr);
  gap: 2px;
  background-color: ${e=>e.isTarget?"rgba(245, 245, 245, 0.5)":"transparent"};
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: 2px dashed ${e=>e.isTarget?"rgba(33, 150, 243, 0.2)":"transparent"};
  aspect-ratio: 1;
`,Ne=m.div`
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
`,xt=m.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
  justify-content: center;
`,Fe=m.button`
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
`,wt=m.div`
  color: #666;
  font-size: 14px;
  text-align: center;
`,Ot=m.div`
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
`,Ct=m.div`
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
`;m.div`
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
`;m.div`
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
`;const St=le`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`,$e=m.div`
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #2196F3;
  border-radius: 50%;
  animation: ${St} 1s linear infinite;
  margin: 0 auto;
`,je=m.div`
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
`,Et=le`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`,_t=le`
  from { opacity: 1; transform: translateY(0); }
  to { opacity: 0; transform: translateY(-20px); }
`;m.div`
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
  animation: ${e=>e.isClosing?_t:Et} 0.5s ease forwards;
  backdrop-filter: blur(10px);
`;const Pt=({image:e,difficulty:t,onProgress:o,onComplete:a,onBackToMenu:i,onImageChange:g,onError:E})=>{const[r,S]=h.useState([]),[y,w]=h.useState(null),[v,b]=h.useState([]),[x,M]=h.useState(new Set),[k,j]=h.useState(!1),[F,J]=h.useState(new Set),[H,Q]=h.useState(0),[R,q]=h.useState(null),[Y,re]=h.useState({x:0,y:0}),[Z,B]=h.useState(!1),[ae,K]=h.useState(!1);h.useState(!1),h.useState(!1);const[ee,u]=h.useState({x:0,y:0}),[d,C]=h.useState({x:0,y:0}),n=it.useRef(),c=h.useRef(!1),P=h.useMemo(()=>{const s=[];for(let p=0;p<t;p++)for(let O=0;O<t;O++)s.push({id:p*t+O,bgPosition:`${O*(100/(t-1))}% ${p*(100/(t-1))}%`,correctIndex:p*t+O});return s},[t]);h.useEffect(()=>{(async()=>{B(!0);try{const p=t*t;if(!t||t<=0){console.error("Invalid difficulty value:",t);return}await new Promise(X=>setTimeout(X,500));const O=[...P].sort(()=>Math.random()-.5).map((X,be)=>({...X,currentPos:be})),A=Array(p).fill(null);S(O),b(A),M(new Set),w(null),J(new Set),q(null),c.current=!1}catch(p){console.error("Error initializing puzzle pieces:",p)}finally{B(!1)}})()},[e,t,P]),h.useEffect(()=>{j(!1)},[t]);const T=()=>{R!==null&&(re(d),u(d),n.current=requestAnimationFrame(T))};h.useEffect(()=>{const s=p=>{R!==null&&(C({x:p.clientX,y:p.clientY}),n.current||(n.current=requestAnimationFrame(T)))};return document.addEventListener("mousemove",s),()=>{document.removeEventListener("mousemove",s),n.current&&(cancelAnimationFrame(n.current),n.current=null)}},[R,d]);const _=async s=>{var p;s.preventDefault(),B(!0);try{const O=(p=s.clipboardData)==null?void 0:p.items;if(!O)return;for(let A=0;A<O.length;A++)if(O[A].type.indexOf("image")!==-1){const X=O[A].getAsFile(),be=new FileReader;be.onload=st=>{g(st.target.result),B(!1)},be.readAsDataURL(X);return}B(!1)}catch(O){console.error("Error handling paste:",O),B(!1)}},N=s=>{if(s<0||s>=r.length||!r[s]){console.error("Invalid piece index:",s);return}if(R===s)q(null),n.current&&(cancelAnimationFrame(n.current),n.current=null);else{const p={x:ee.x||Y.x,y:ee.y||Y.y};q(s),re(p),u(p),C(p),J(new Set)}w(s)},L=s=>{if(R===null||s<0||s>=v.length||v[s]!==null)return;const p=r[R];if(!p){console.error("Selected piece data is invalid");return}if(parseInt(p.id)===s){const O=[...v];O[s]=p,b(O);const A=[...r];A[R]=null,S(A);const X=new Set(x);X.add(s),M(X)}else{const O=new Set(F);O.add(s),J(O),Q(A=>A+1),E()}q(null),w(null)},V=()=>{j(!k)},de=()=>{K(!ae)};return h.useEffect(()=>{const s=x.size/(t*t)*100;o(Math.round(s)),x.size===t*t&&x.size===t*t&&!c.current&&(c.current=!0,a(H))},[x,t,a,H,o]),h.useEffect(()=>(window.addEventListener("paste",_),()=>window.removeEventListener("paste",_)),[]),l.jsxs(mt,{children:[l.jsxs(ht,{children:[l.jsxs(Ee,{children:[l.jsxs(Se,{children:[l.jsx("span",{children:"🎮"}),"აქ ააწყვე პაზლი"]}),l.jsxs("div",{style:{position:"relative"},children:[Z&&l.jsx(je,{children:l.jsx($e,{})}),l.jsx(ke,{size:t,isTarget:!0,children:v.map((s,p)=>l.jsx(Ne,{image:s?e:null,size:t,bgPosition:s?s.bgPosition:"",isTarget:!s,isPlaced:s!==null,isWrongAttempt:F.has(p),onClick:()=>L(p),children:!s&&k&&l.jsx(wt,{children:p+1})},p))})]})]}),l.jsxs(vt,{children:[l.jsxs(Ee,{children:[l.jsxs(Se,{children:[l.jsx("span",{children:"🧩"}),"პაზლის ნაწილები"]}),l.jsxs("div",{style:{position:"relative"},children:[Z&&l.jsx(je,{children:l.jsx($e,{})}),l.jsx(ke,{size:t,isTarget:!1,children:r.map((s,p)=>s&&l.jsx(Ne,{image:e,size:t,bgPosition:s.bgPosition,onClick:()=>N(p),isDragging:R===p,children:k&&l.jsx(Ot,{children:parseInt(s.id)+1})},s.id))})]})]}),l.jsxs(gt,{children:[l.jsxs(Se,{children:[l.jsx("span",{children:"🖼️"}),"ორიგინალი სურათი",l.jsx("span",{style:{marginLeft:"auto",fontSize:"0.8em",opacity:.7},children:"(დააჭირე გასადიდებლად)"})]}),l.jsx(bt,{size:t,isExpanded:ae,onClick:de,children:l.jsx(yt,{image:e,size:t,isExpanded:ae})}),l.jsxs(xt,{children:[l.jsx(Fe,{variant:"primary",onClick:V,children:k?"🔍 დამალე მინიშნებები":"💡 მაჩვენე მინიშნებები"}),l.jsx(Fe,{onClick:i,children:"🏠 მთავარ მენიუში დაბრუნება"})]})]})]})]}),R!==null&&r[R]&&l.jsx(Ct,{image:e,size:t,bgPosition:r[R].bgPosition,style:{left:`${Y.x}px`,top:`${Y.y}px`,transform:"translate(-50%, -50%)"}})]})};m.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;m.h2`
  color: #2196F3;
  margin-bottom: 15px;
`;m.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
`;m.button`
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
`;var _e={exports:{}},oe={},Ke={exports:{}},Mt="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED",Tt=Mt,Rt=Tt;function Ve(){}function Xe(){}Xe.resetWarningCache=Ve;var At=function(){function e(a,i,g,E,r,S){if(S!==Rt){var y=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw y.name="Invariant Violation",y}}e.isRequired=e;function t(){return e}var o={array:e,bigint:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,elementType:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t,checkPropTypes:Xe,resetWarningCache:Ve};return o.PropTypes=o,o};Ke.exports=At();var Ge=Ke.exports,Pe={exports:{}},U={},Me={exports:{}};(function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.default=w;/*!
 * Adapted from jQuery UI core
 *
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/category/ui-core/
 */var o="none",a="contents",i=/^(input|select|textarea|button|object|iframe)$/;function g(v,b){return b.getPropertyValue("overflow")!=="visible"||v.scrollWidth<=0&&v.scrollHeight<=0}function E(v){var b=v.offsetWidth<=0&&v.offsetHeight<=0;if(b&&!v.innerHTML)return!0;try{var x=window.getComputedStyle(v),M=x.getPropertyValue("display");return b?M!==a&&g(v,x):M===o}catch{return console.warn("Failed to inspect element style"),!1}}function r(v){for(var b=v,x=v.getRootNode&&v.getRootNode();b&&b!==document.body;){if(x&&b===x&&(b=x.host.parentNode),E(b))return!1;b=b.parentNode}return!0}function S(v,b){var x=v.nodeName.toLowerCase(),M=i.test(x)&&!v.disabled||x==="a"&&v.href||b;return M&&r(v)}function y(v){var b=v.getAttribute("tabindex");b===null&&(b=void 0);var x=isNaN(b);return(x||b>=0)&&S(v,!x)}function w(v){var b=[].slice.call(v.querySelectorAll("*"),0).reduce(function(x,M){return x.concat(M.shadowRoot?w(M.shadowRoot):[M])},[]);return b.filter(y)}e.exports=t.default})(Me,Me.exports);var Je=Me.exports;Object.defineProperty(U,"__esModule",{value:!0});U.resetState=Ft;U.log=$t;U.handleBlur=me;U.handleFocus=he;U.markForFocusLater=jt;U.returnFocus=Lt;U.popWithoutFocus=It;U.setupScopedFocus=zt;U.teardownScopedFocus=Ut;var Dt=Je,kt=Nt(Dt);function Nt(e){return e&&e.__esModule?e:{default:e}}var ie=[],se=null,Te=!1;function Ft(){ie=[]}function $t(){}function me(){Te=!0}function he(){if(Te){if(Te=!1,!se)return;setTimeout(function(){if(!se.contains(document.activeElement)){var e=(0,kt.default)(se)[0]||se;e.focus()}},0)}}function jt(){ie.push(document.activeElement)}function Lt(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:!1,t=null;try{ie.length!==0&&(t=ie.pop(),t.focus({preventScroll:e}));return}catch{console.warn(["You tried to return focus to",t,"but it is not in the DOM anymore"].join(" "))}}function It(){ie.length>0&&ie.pop()}function zt(e){se=e,window.addEventListener?(window.addEventListener("blur",me,!1),document.addEventListener("focus",he,!0)):(window.attachEvent("onBlur",me),document.attachEvent("onFocus",he))}function Ut(){se=null,window.addEventListener?(window.removeEventListener("blur",me),document.removeEventListener("focus",he)):(window.detachEvent("onBlur",me),document.detachEvent("onFocus",he))}var Re={exports:{}};(function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.default=E;var o=Je,a=i(o);function i(r){return r&&r.__esModule?r:{default:r}}function g(){var r=arguments.length>0&&arguments[0]!==void 0?arguments[0]:document;return r.activeElement.shadowRoot?g(r.activeElement.shadowRoot):r.activeElement}function E(r,S){var y=(0,a.default)(r);if(!y.length){S.preventDefault();return}var w=void 0,v=S.shiftKey,b=y[0],x=y[y.length-1],M=g();if(r===M){if(!v)return;w=x}if(x===M&&!v&&(w=b),b===M&&v&&(w=x),w){S.preventDefault(),w.focus();return}var k=/(\bChrome\b|\bSafari\b)\//.exec(navigator.userAgent),j=k!=null&&k[1]!="Chrome"&&/\biPod\b|\biPad\b/g.exec(navigator.userAgent)==null;if(j){var F=y.indexOf(M);if(F>-1&&(F+=v?-1:1),w=y[F],typeof w>"u"){S.preventDefault(),w=v?x:b,w.focus();return}S.preventDefault(),w.focus()}}e.exports=t.default})(Re,Re.exports);var Wt=Re.exports,W={},Ht=function(){},Bt=Ht,z={},Qe={exports:{}};/*!
  Copyright (c) 2015 Jed Watson.
  Based on code that is Copyright 2013-2015, Facebook, Inc.
  All rights reserved.
*/(function(e){(function(){var t=!!(typeof window<"u"&&window.document&&window.document.createElement),o={canUseDOM:t,canUseWorkers:typeof Worker<"u",canUseEventListeners:t&&!!(window.addEventListener||window.attachEvent),canUseViewport:t&&!!window.screen};e.exports?e.exports=o:window.ExecutionEnvironment=o})()})(Qe);var qt=Qe.exports;Object.defineProperty(z,"__esModule",{value:!0});z.canUseDOM=z.SafeNodeList=z.SafeHTMLCollection=void 0;var Yt=qt,Kt=Vt(Yt);function Vt(e){return e&&e.__esModule?e:{default:e}}var Ce=Kt.default,Xt=Ce.canUseDOM?window.HTMLElement:{};z.SafeHTMLCollection=Ce.canUseDOM?window.HTMLCollection:{};z.SafeNodeList=Ce.canUseDOM?window.NodeList:{};z.canUseDOM=Ce.canUseDOM;z.default=Xt;Object.defineProperty(W,"__esModule",{value:!0});W.resetState=en;W.log=tn;W.assertNodeList=Ze;W.setElement=nn;W.validateElement=Ae;W.hide=on;W.show=rn;W.documentNotReadyOrSSRTesting=an;var Gt=Bt,Jt=Zt(Gt),Qt=z;function Zt(e){return e&&e.__esModule?e:{default:e}}var $=null;function en(){$&&($.removeAttribute?$.removeAttribute("aria-hidden"):$.length!=null?$.forEach(function(e){return e.removeAttribute("aria-hidden")}):document.querySelectorAll($).forEach(function(e){return e.removeAttribute("aria-hidden")})),$=null}function tn(){}function Ze(e,t){if(!e||!e.length)throw new Error("react-modal: No elements were found for selector "+t+".")}function nn(e){var t=e;if(typeof t=="string"&&Qt.canUseDOM){var o=document.querySelectorAll(t);Ze(o,t),t=o}return $=t||$,$}function Ae(e){var t=e||$;return t?Array.isArray(t)||t instanceof HTMLCollection||t instanceof NodeList?t:[t]:((0,Jt.default)(!1,["react-modal: App element is not defined.","Please use `Modal.setAppElement(el)` or set `appElement={el}`.","This is needed so screen readers don't see main content","when modal is opened. It is not recommended, but you can opt-out","by setting `ariaHideApp={false}`."].join(" ")),[])}function on(e){var t=!0,o=!1,a=void 0;try{for(var i=Ae(e)[Symbol.iterator](),g;!(t=(g=i.next()).done);t=!0){var E=g.value;E.setAttribute("aria-hidden","true")}}catch(r){o=!0,a=r}finally{try{!t&&i.return&&i.return()}finally{if(o)throw a}}}function rn(e){var t=!0,o=!1,a=void 0;try{for(var i=Ae(e)[Symbol.iterator](),g;!(t=(g=i.next()).done);t=!0){var E=g.value;E.removeAttribute("aria-hidden")}}catch(r){o=!0,a=r}finally{try{!t&&i.return&&i.return()}finally{if(o)throw a}}}function an(){$=null}var ce={};Object.defineProperty(ce,"__esModule",{value:!0});ce.resetState=sn;ce.log=ln;var fe={},pe={};function Le(e,t){e.classList.remove(t)}function sn(){var e=document.getElementsByTagName("html")[0];for(var t in fe)Le(e,fe[t]);var o=document.body;for(var a in pe)Le(o,pe[a]);fe={},pe={}}function ln(){}var cn=function(t,o){return t[o]||(t[o]=0),t[o]+=1,o},un=function(t,o){return t[o]&&(t[o]-=1),o},dn=function(t,o,a){a.forEach(function(i){cn(o,i),t.add(i)})},fn=function(t,o,a){a.forEach(function(i){un(o,i),o[i]===0&&t.remove(i)})};ce.add=function(t,o){return dn(t.classList,t.nodeName.toLowerCase()=="html"?fe:pe,o.split(" "))};ce.remove=function(t,o){return fn(t.classList,t.nodeName.toLowerCase()=="html"?fe:pe,o.split(" "))};var ue={};Object.defineProperty(ue,"__esModule",{value:!0});ue.log=mn;ue.resetState=hn;function pn(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var et=function e(){var t=this;pn(this,e),this.register=function(o){t.openInstances.indexOf(o)===-1&&(t.openInstances.push(o),t.emit("register"))},this.deregister=function(o){var a=t.openInstances.indexOf(o);a!==-1&&(t.openInstances.splice(a,1),t.emit("deregister"))},this.subscribe=function(o){t.subscribers.push(o)},this.emit=function(o){t.subscribers.forEach(function(a){return a(o,t.openInstances.slice())})},this.openInstances=[],this.subscribers=[]},xe=new et;function mn(){console.log("portalOpenInstances ----------"),console.log(xe.openInstances.length),xe.openInstances.forEach(function(e){return console.log(e)}),console.log("end portalOpenInstances ----------")}function hn(){xe=new et}ue.default=xe;var De={};Object.defineProperty(De,"__esModule",{value:!0});De.resetState=yn;De.log=xn;var vn=ue,gn=bn(vn);function bn(e){return e&&e.__esModule?e:{default:e}}var D=void 0,I=void 0,ne=[];function yn(){for(var e=[D,I],t=0;t<e.length;t++){var o=e[t];o&&o.parentNode&&o.parentNode.removeChild(o)}D=I=null,ne=[]}function xn(){console.log("bodyTrap ----------"),console.log(ne.length);for(var e=[D,I],t=0;t<e.length;t++){var o=e[t],a=o||{};console.log(a.nodeName,a.className,a.id)}console.log("edn bodyTrap ----------")}function Ie(){ne.length!==0&&ne[ne.length-1].focusContent()}function wn(e,t){!D&&!I&&(D=document.createElement("div"),D.setAttribute("data-react-modal-body-trap",""),D.style.position="absolute",D.style.opacity="0",D.setAttribute("tabindex","0"),D.addEventListener("focus",Ie),I=D.cloneNode(),I.addEventListener("focus",Ie)),ne=t,ne.length>0?(document.body.firstChild!==D&&document.body.insertBefore(D,document.body.firstChild),document.body.lastChild!==I&&document.body.appendChild(I)):(D.parentElement&&D.parentElement.removeChild(D),I.parentElement&&I.parentElement.removeChild(I))}gn.default.subscribe(wn);(function(e,t){Object.defineProperty(t,"__esModule",{value:!0});var o=Object.assign||function(u){for(var d=1;d<arguments.length;d++){var C=arguments[d];for(var n in C)Object.prototype.hasOwnProperty.call(C,n)&&(u[n]=C[n])}return u},a=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(u){return typeof u}:function(u){return u&&typeof Symbol=="function"&&u.constructor===Symbol&&u!==Symbol.prototype?"symbol":typeof u},i=function(){function u(d,C){for(var n=0;n<C.length;n++){var c=C[n];c.enumerable=c.enumerable||!1,c.configurable=!0,"value"in c&&(c.writable=!0),Object.defineProperty(d,c.key,c)}}return function(d,C,n){return C&&u(d.prototype,C),n&&u(d,n),d}}(),g=h,E=Ge,r=R(E),S=U,y=Q(S),w=Wt,v=R(w),b=W,x=Q(b),M=ce,k=Q(M),j=z,F=R(j),J=ue,H=R(J);function Q(u){if(u&&u.__esModule)return u;var d={};if(u!=null)for(var C in u)Object.prototype.hasOwnProperty.call(u,C)&&(d[C]=u[C]);return d.default=u,d}function R(u){return u&&u.__esModule?u:{default:u}}function q(u,d){if(!(u instanceof d))throw new TypeError("Cannot call a class as a function")}function Y(u,d){if(!u)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return d&&(typeof d=="object"||typeof d=="function")?d:u}function re(u,d){if(typeof d!="function"&&d!==null)throw new TypeError("Super expression must either be null or a function, not "+typeof d);u.prototype=Object.create(d&&d.prototype,{constructor:{value:u,enumerable:!1,writable:!0,configurable:!0}}),d&&(Object.setPrototypeOf?Object.setPrototypeOf(u,d):u.__proto__=d)}var Z={overlay:"ReactModal__Overlay",content:"ReactModal__Content"},B=function(d){return d.code==="Tab"||d.keyCode===9},ae=function(d){return d.code==="Escape"||d.keyCode===27},K=0,ee=function(u){re(d,u);function d(C){q(this,d);var n=Y(this,(d.__proto__||Object.getPrototypeOf(d)).call(this,C));return n.setOverlayRef=function(c){n.overlay=c,n.props.overlayRef&&n.props.overlayRef(c)},n.setContentRef=function(c){n.content=c,n.props.contentRef&&n.props.contentRef(c)},n.afterClose=function(){var c=n.props,P=c.appElement,T=c.ariaHideApp,_=c.htmlOpenClassName,N=c.bodyOpenClassName,L=c.parentSelector,V=L&&L().ownerDocument||document;N&&k.remove(V.body,N),_&&k.remove(V.getElementsByTagName("html")[0],_),T&&K>0&&(K-=1,K===0&&x.show(P)),n.props.shouldFocusAfterRender&&(n.props.shouldReturnFocusAfterClose?(y.returnFocus(n.props.preventScroll),y.teardownScopedFocus()):y.popWithoutFocus()),n.props.onAfterClose&&n.props.onAfterClose(),H.default.deregister(n)},n.open=function(){n.beforeOpen(),n.state.afterOpen&&n.state.beforeClose?(clearTimeout(n.closeTimer),n.setState({beforeClose:!1})):(n.props.shouldFocusAfterRender&&(y.setupScopedFocus(n.node),y.markForFocusLater()),n.setState({isOpen:!0},function(){n.openAnimationFrame=requestAnimationFrame(function(){n.setState({afterOpen:!0}),n.props.isOpen&&n.props.onAfterOpen&&n.props.onAfterOpen({overlayEl:n.overlay,contentEl:n.content})})}))},n.close=function(){n.props.closeTimeoutMS>0?n.closeWithTimeout():n.closeWithoutTimeout()},n.focusContent=function(){return n.content&&!n.contentHasFocus()&&n.content.focus({preventScroll:!0})},n.closeWithTimeout=function(){var c=Date.now()+n.props.closeTimeoutMS;n.setState({beforeClose:!0,closesAt:c},function(){n.closeTimer=setTimeout(n.closeWithoutTimeout,n.state.closesAt-Date.now())})},n.closeWithoutTimeout=function(){n.setState({beforeClose:!1,isOpen:!1,afterOpen:!1,closesAt:null},n.afterClose)},n.handleKeyDown=function(c){B(c)&&(0,v.default)(n.content,c),n.props.shouldCloseOnEsc&&ae(c)&&(c.stopPropagation(),n.requestClose(c))},n.handleOverlayOnClick=function(c){n.shouldClose===null&&(n.shouldClose=!0),n.shouldClose&&n.props.shouldCloseOnOverlayClick&&(n.ownerHandlesClose()?n.requestClose(c):n.focusContent()),n.shouldClose=null},n.handleContentOnMouseUp=function(){n.shouldClose=!1},n.handleOverlayOnMouseDown=function(c){!n.props.shouldCloseOnOverlayClick&&c.target==n.overlay&&c.preventDefault()},n.handleContentOnClick=function(){n.shouldClose=!1},n.handleContentOnMouseDown=function(){n.shouldClose=!1},n.requestClose=function(c){return n.ownerHandlesClose()&&n.props.onRequestClose(c)},n.ownerHandlesClose=function(){return n.props.onRequestClose},n.shouldBeClosed=function(){return!n.state.isOpen&&!n.state.beforeClose},n.contentHasFocus=function(){return document.activeElement===n.content||n.content.contains(document.activeElement)},n.buildClassName=function(c,P){var T=(typeof P>"u"?"undefined":a(P))==="object"?P:{base:Z[c],afterOpen:Z[c]+"--after-open",beforeClose:Z[c]+"--before-close"},_=T.base;return n.state.afterOpen&&(_=_+" "+T.afterOpen),n.state.beforeClose&&(_=_+" "+T.beforeClose),typeof P=="string"&&P?_+" "+P:_},n.attributesFromObject=function(c,P){return Object.keys(P).reduce(function(T,_){return T[c+"-"+_]=P[_],T},{})},n.state={afterOpen:!1,beforeClose:!1},n.shouldClose=null,n.moveFromContentToOverlay=null,n}return i(d,[{key:"componentDidMount",value:function(){this.props.isOpen&&this.open()}},{key:"componentDidUpdate",value:function(n,c){this.props.isOpen&&!n.isOpen?this.open():!this.props.isOpen&&n.isOpen&&this.close(),this.props.shouldFocusAfterRender&&this.state.isOpen&&!c.isOpen&&this.focusContent()}},{key:"componentWillUnmount",value:function(){this.state.isOpen&&this.afterClose(),clearTimeout(this.closeTimer),cancelAnimationFrame(this.openAnimationFrame)}},{key:"beforeOpen",value:function(){var n=this.props,c=n.appElement,P=n.ariaHideApp,T=n.htmlOpenClassName,_=n.bodyOpenClassName,N=n.parentSelector,L=N&&N().ownerDocument||document;_&&k.add(L.body,_),T&&k.add(L.getElementsByTagName("html")[0],T),P&&(K+=1,x.hide(c)),H.default.register(this)}},{key:"render",value:function(){var n=this.props,c=n.id,P=n.className,T=n.overlayClassName,_=n.defaultStyles,N=n.children,L=P?{}:_.content,V=T?{}:_.overlay;if(this.shouldBeClosed())return null;var de={ref:this.setOverlayRef,className:this.buildClassName("overlay",T),style:o({},V,this.props.style.overlay),onClick:this.handleOverlayOnClick,onMouseDown:this.handleOverlayOnMouseDown},s=o({id:c,ref:this.setContentRef,style:o({},L,this.props.style.content),className:this.buildClassName("content",P),tabIndex:"-1",onKeyDown:this.handleKeyDown,onMouseDown:this.handleContentOnMouseDown,onMouseUp:this.handleContentOnMouseUp,onClick:this.handleContentOnClick,role:this.props.role,"aria-label":this.props.contentLabel},this.attributesFromObject("aria",o({modal:!0},this.props.aria)),this.attributesFromObject("data",this.props.data||{}),{"data-testid":this.props.testId}),p=this.props.contentElement(s,N);return this.props.overlayElement(de,p)}}]),d}(g.Component);ee.defaultProps={style:{overlay:{},content:{}},defaultStyles:{}},ee.propTypes={isOpen:r.default.bool.isRequired,defaultStyles:r.default.shape({content:r.default.object,overlay:r.default.object}),style:r.default.shape({content:r.default.object,overlay:r.default.object}),className:r.default.oneOfType([r.default.string,r.default.object]),overlayClassName:r.default.oneOfType([r.default.string,r.default.object]),parentSelector:r.default.func,bodyOpenClassName:r.default.string,htmlOpenClassName:r.default.string,ariaHideApp:r.default.bool,appElement:r.default.oneOfType([r.default.instanceOf(F.default),r.default.instanceOf(j.SafeHTMLCollection),r.default.instanceOf(j.SafeNodeList),r.default.arrayOf(r.default.instanceOf(F.default))]),onAfterOpen:r.default.func,onAfterClose:r.default.func,onRequestClose:r.default.func,closeTimeoutMS:r.default.number,shouldFocusAfterRender:r.default.bool,shouldCloseOnOverlayClick:r.default.bool,shouldReturnFocusAfterClose:r.default.bool,preventScroll:r.default.bool,role:r.default.string,contentLabel:r.default.string,aria:r.default.object,data:r.default.object,children:r.default.node,shouldCloseOnEsc:r.default.bool,overlayRef:r.default.func,contentRef:r.default.func,id:r.default.string,overlayElement:r.default.func,contentElement:r.default.func,testId:r.default.string},t.default=ee,e.exports=t.default})(Pe,Pe.exports);var On=Pe.exports;function tt(){var e=this.constructor.getDerivedStateFromProps(this.props,this.state);e!=null&&this.setState(e)}function nt(e){function t(o){var a=this.constructor.getDerivedStateFromProps(e,o);return a??null}this.setState(t.bind(this))}function ot(e,t){try{var o=this.props,a=this.state;this.props=e,this.state=t,this.__reactInternalSnapshotFlag=!0,this.__reactInternalSnapshot=this.getSnapshotBeforeUpdate(o,a)}finally{this.props=o,this.state=a}}tt.__suppressDeprecationWarning=!0;nt.__suppressDeprecationWarning=!0;ot.__suppressDeprecationWarning=!0;function Cn(e){var t=e.prototype;if(!t||!t.isReactComponent)throw new Error("Can only polyfill class components");if(typeof e.getDerivedStateFromProps!="function"&&typeof t.getSnapshotBeforeUpdate!="function")return e;var o=null,a=null,i=null;if(typeof t.componentWillMount=="function"?o="componentWillMount":typeof t.UNSAFE_componentWillMount=="function"&&(o="UNSAFE_componentWillMount"),typeof t.componentWillReceiveProps=="function"?a="componentWillReceiveProps":typeof t.UNSAFE_componentWillReceiveProps=="function"&&(a="UNSAFE_componentWillReceiveProps"),typeof t.componentWillUpdate=="function"?i="componentWillUpdate":typeof t.UNSAFE_componentWillUpdate=="function"&&(i="UNSAFE_componentWillUpdate"),o!==null||a!==null||i!==null){var g=e.displayName||e.name,E=typeof e.getDerivedStateFromProps=="function"?"getDerivedStateFromProps()":"getSnapshotBeforeUpdate()";throw Error(`Unsafe legacy lifecycles will not be called for components using new component APIs.

`+g+" uses "+E+" but also contains the following legacy lifecycles:"+(o!==null?`
  `+o:"")+(a!==null?`
  `+a:"")+(i!==null?`
  `+i:"")+`

The above lifecycles should be removed. Learn more about this warning here:
https://fb.me/react-async-component-lifecycle-hooks`)}if(typeof e.getDerivedStateFromProps=="function"&&(t.componentWillMount=tt,t.componentWillReceiveProps=nt),typeof t.getSnapshotBeforeUpdate=="function"){if(typeof t.componentDidUpdate!="function")throw new Error("Cannot polyfill getSnapshotBeforeUpdate() for components that do not define componentDidUpdate() on the prototype");t.componentWillUpdate=ot;var r=t.componentDidUpdate;t.componentDidUpdate=function(y,w,v){var b=this.__reactInternalSnapshotFlag?this.__reactInternalSnapshot:v;r.call(this,y,w,b)}}return e}const Sn=Object.freeze(Object.defineProperty({__proto__:null,polyfill:Cn},Symbol.toStringTag,{value:"Module"})),En=lt(Sn);Object.defineProperty(oe,"__esModule",{value:!0});oe.bodyOpenClassName=oe.portalClassName=void 0;var ze=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var o=arguments[t];for(var a in o)Object.prototype.hasOwnProperty.call(o,a)&&(e[a]=o[a])}return e},_n=function(){function e(t,o){for(var a=0;a<o.length;a++){var i=o[a];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(t,o,a){return o&&e(t.prototype,o),a&&e(t,a),t}}(),rt=h,we=ve(rt),Pn=ct,Oe=ve(Pn),Mn=Ge,f=ve(Mn),Tn=On,Ue=ve(Tn),Rn=W,An=kn(Rn),G=z,We=ve(G),Dn=En;function kn(e){if(e&&e.__esModule)return e;var t={};if(e!=null)for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t.default=e,t}function ve(e){return e&&e.__esModule?e:{default:e}}function Nn(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function He(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t&&(typeof t=="object"||typeof t=="function")?t:e}function Fn(e,t){if(typeof t!="function"&&t!==null)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var $n=oe.portalClassName="ReactModalPortal",jn=oe.bodyOpenClassName="ReactModal__Body--open",te=G.canUseDOM&&Oe.default.createPortal!==void 0,Be=function(t){return document.createElement(t)},qe=function(){return te?Oe.default.createPortal:Oe.default.unstable_renderSubtreeIntoContainer};function ye(e){return e()}var ge=function(e){Fn(t,e);function t(){var o,a,i,g;Nn(this,t);for(var E=arguments.length,r=Array(E),S=0;S<E;S++)r[S]=arguments[S];return g=(a=(i=He(this,(o=t.__proto__||Object.getPrototypeOf(t)).call.apply(o,[this].concat(r))),i),i.removePortal=function(){!te&&Oe.default.unmountComponentAtNode(i.node);var y=ye(i.props.parentSelector);y&&y.contains(i.node)?y.removeChild(i.node):console.warn('React-Modal: "parentSelector" prop did not returned any DOM element. Make sure that the parent element is unmounted to avoid any memory leaks.')},i.portalRef=function(y){i.portal=y},i.renderPortal=function(y){var w=qe(),v=w(i,we.default.createElement(Ue.default,ze({defaultStyles:t.defaultStyles},y)),i.node);i.portalRef(v)},a),He(i,g)}return _n(t,[{key:"componentDidMount",value:function(){if(G.canUseDOM){te||(this.node=Be("div")),this.node.className=this.props.portalClassName;var a=ye(this.props.parentSelector);a.appendChild(this.node),!te&&this.renderPortal(this.props)}}},{key:"getSnapshotBeforeUpdate",value:function(a){var i=ye(a.parentSelector),g=ye(this.props.parentSelector);return{prevParent:i,nextParent:g}}},{key:"componentDidUpdate",value:function(a,i,g){if(G.canUseDOM){var E=this.props,r=E.isOpen,S=E.portalClassName;a.portalClassName!==S&&(this.node.className=S);var y=g.prevParent,w=g.nextParent;w!==y&&(y.removeChild(this.node),w.appendChild(this.node)),!(!a.isOpen&&!r)&&!te&&this.renderPortal(this.props)}}},{key:"componentWillUnmount",value:function(){if(!(!G.canUseDOM||!this.node||!this.portal)){var a=this.portal.state,i=Date.now(),g=a.isOpen&&this.props.closeTimeoutMS&&(a.closesAt||i+this.props.closeTimeoutMS);g?(a.beforeClose||this.portal.closeWithTimeout(),setTimeout(this.removePortal,g-i)):this.removePortal()}}},{key:"render",value:function(){if(!G.canUseDOM||!te)return null;!this.node&&te&&(this.node=Be("div"));var a=qe();return a(we.default.createElement(Ue.default,ze({ref:this.portalRef,defaultStyles:t.defaultStyles},this.props)),this.node)}}],[{key:"setAppElement",value:function(a){An.setElement(a)}}]),t}(rt.Component);ge.propTypes={isOpen:f.default.bool.isRequired,style:f.default.shape({content:f.default.object,overlay:f.default.object}),portalClassName:f.default.string,bodyOpenClassName:f.default.string,htmlOpenClassName:f.default.string,className:f.default.oneOfType([f.default.string,f.default.shape({base:f.default.string.isRequired,afterOpen:f.default.string.isRequired,beforeClose:f.default.string.isRequired})]),overlayClassName:f.default.oneOfType([f.default.string,f.default.shape({base:f.default.string.isRequired,afterOpen:f.default.string.isRequired,beforeClose:f.default.string.isRequired})]),appElement:f.default.oneOfType([f.default.instanceOf(We.default),f.default.instanceOf(G.SafeHTMLCollection),f.default.instanceOf(G.SafeNodeList),f.default.arrayOf(f.default.instanceOf(We.default))]),onAfterOpen:f.default.func,onRequestClose:f.default.func,closeTimeoutMS:f.default.number,ariaHideApp:f.default.bool,shouldFocusAfterRender:f.default.bool,shouldCloseOnOverlayClick:f.default.bool,shouldReturnFocusAfterClose:f.default.bool,preventScroll:f.default.bool,parentSelector:f.default.func,aria:f.default.object,data:f.default.object,role:f.default.string,contentLabel:f.default.string,shouldCloseOnEsc:f.default.bool,overlayRef:f.default.func,contentRef:f.default.func,id:f.default.string,overlayElement:f.default.func,contentElement:f.default.func};ge.defaultProps={isOpen:!1,portalClassName:$n,bodyOpenClassName:jn,role:"dialog",ariaHideApp:!0,closeTimeoutMS:0,shouldFocusAfterRender:!0,shouldCloseOnEsc:!0,shouldCloseOnOverlayClick:!0,shouldReturnFocusAfterClose:!0,preventScroll:!1,parentSelector:function(){return document.body},overlayElement:function(t,o){return we.default.createElement("div",t,o)},contentElement:function(t,o){return we.default.createElement("div",t,o)}};ge.defaultStyles={overlay:{position:"fixed",top:0,left:0,right:0,bottom:0,backgroundColor:"rgba(255, 255, 255, 0.75)"},content:{position:"absolute",top:"40px",left:"40px",right:"40px",bottom:"40px",border:"1px solid #ccc",background:"#fff",overflow:"auto",WebkitOverflowScrolling:"touch",borderRadius:"4px",outline:"none",padding:"20px"}};(0,Dn.polyfill)(ge);oe.default=ge;(function(e,t){Object.defineProperty(t,"__esModule",{value:!0});var o=oe,a=i(o);function i(g){return g&&g.__esModule?g:{default:g}}t.default=a.default,e.exports=t.default})(_e,_e.exports);var Ln=_e.exports;const at=ut(Ln),In=m.div`
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(76, 175, 80, 0.9);
  color: white;
  padding: 1rem 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  animation: slideDown 0.5s ease forwards;

  @keyframes slideDown {
    from {
      transform: translate(-50%, -100%);
      opacity: 0;
    }
    to {
      transform: translate(-50%, 0);
      opacity: 1;
    }
  }
`,zn=({message:e})=>l.jsx(In,{children:e});at.setAppElement("#root");const Un=m.div`
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
`,Wn=m.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  max-width: 64rem;
  margin-left: auto;
  margin-right: auto;
  padding: 0 1rem;
  gap: 1rem;
`,Hn=m.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`,Bn=m.h1`
  font-size: 1.5rem;
  font-weight: bold;
  color: #2196F3;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  @media (min-width: 640px) {
    font-size: 1.875rem;
  }
`,qn=m.span`
  font-size: 1.5rem;
  
  @media (min-width: 640px) {
    font-size: 2rem;
  }
`,Yn=m.main`
  max-width: 64rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0 1rem;
  padding-bottom: 2rem;
`,Kn=m.div`
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border-radius: 1rem;
  padding: 1rem;
`,Vn=m(Kn)`
  text-align: center;
`,Xn=m.h2`
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`,Gn=m.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
`,Jn=m.button`
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
`,Qn=m.label`
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
`,Zn=m.button`
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
`,eo=le`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`,to=m.div`
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #2196F3;
  border-radius: 50%;
  animation: ${eo} 1s linear infinite;
  margin: 0 auto;
`,no=m.div`
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
`,oo=le`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`,ro=le`
  from { opacity: 1; transform: translateY(0); }
  to { opacity: 0; transform: translateY(-20px); }
`,ao=m.div`
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
  animation: ${e=>e.isClosing?ro:oo} 0.5s ease forwards;
  backdrop-filter: blur(10px);
`,so=m.div`
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
`,Ye=3e3,co=()=>{const{playerName:e}=dt(),t=ft(),[o,a]=h.useState(3),[i,g]=h.useState(0),[E,r]=h.useState(null),[S,y]=h.useState(0),[w,v]=h.useState(!1),[b,x]=h.useState(""),[M,k]=h.useState(!1),[j,F]=h.useState(!1),[J,H]=h.useState(!1),[Q,R]=h.useState(""),[q,Y]=h.useState(!1),[re,Z]=h.useState(""),[B,ae]=h.useState(!1),[K,ee]=h.useState(""),[u,d]=h.useState(null);h.useEffect(()=>()=>{u&&clearTimeout(u)},[u]);const C=()=>{const s=[`ყოჩაღ ${e}! შენ ეს შეძელი! 🎉`,`საოცარი ხარ ${e}! გააგრძელე ასე! 🌟`,`ბრავო ${e}! შესანიშნავად გაართვი თავი! 👏`,`არაჩვეულებრივია ${e}! შენ ნამდვილი გენიოსი ხარ! 🎯`,`გილოცავ ${e}! კიდევ ერთი ამოცანა გადალახე! 🏆`,`${e}, შენ მართლაც ნიჭიერი ხარ! 🌈`,`დიდებულია ${e}! ასე განაგრძე! ⭐`,`${e}, შენ ნამდვილი გმირი ხარ! 🦸‍♂️`];return s[Math.floor(Math.random()*s.length)]},n=s=>{const O=`გილოცავთ ${e||"მოთამაშე"}! თქვენ წარმატებით დაასრულეთ პაზლი ${s||0} შეცდომით! 🎉`;R(O),H(!0),u&&clearTimeout(u);const A=setTimeout(()=>{H(!1),d(null)},Ye);d(A)},c=()=>{Y(!1)},P=()=>{y(s=>s+1)},T=s=>{r(s),y(0)},_=()=>{t("/")},N=async()=>{try{const s=await navigator.clipboard.read();for(const p of s)if(p.types.includes("image/png")){const O=await p.getType("image/png"),A=URL.createObjectURL(O);T(A);break}}catch(s){console.error("Error handling pasted image:",s)}},L=async s=>{F(!0),await new Promise(p=>setTimeout(p,500)),a(s),F(!1)},V=s=>{const p=s.target.files[0];if(p){const O=new FileReader;O.onload=A=>{r(A.target.result)},O.readAsDataURL(p)}},de=()=>{H(!0),R(C()),u&&clearTimeout(u);const s=setTimeout(()=>{H(!1),d(null)},Ye);d(s)};return h.useEffect(()=>(window.addEventListener("paste",N),()=>window.removeEventListener("paste",N)),[]),l.jsxs(Un,{children:[l.jsx(pt,{}),l.jsxs(at,{isOpen:q,onRequestClose:c,children:[l.jsx("h2",{children:re}),l.jsx("button",{onClick:c,children:"OK"})]}),B&&l.jsx(zn,{message:K}),w&&l.jsx(ao,{isClosing:M,children:b}),J&&l.jsx(so,{children:Q}),l.jsxs(Wn,{children:[l.jsxs(Bn,{children:[l.jsx(qn,{children:"🎮"}),"გამარჯობა, ",e,"! 👋"]}),l.jsxs(Hn,{children:[l.jsxs(Zn,{onClick:N,children:[l.jsx("span",{children:"📋"}),"ჩასმა (Ctrl+V)"]}),l.jsxs(Qn,{children:[l.jsx("span",{children:"📤"}),"სურათის ატვირთვა",l.jsx("input",{type:"file",accept:"image/*",onChange:V,id:"imageUpload",name:"imageUpload"})]})]})]}),l.jsxs(Yn,{children:[l.jsxs(Vn,{children:[l.jsx(Xn,{children:"აირჩიე სირთულის დონე"}),l.jsx(Gn,{children:[2,3,4,5].map(s=>l.jsxs(Jn,{isSelected:o===s,onClick:()=>L(s),disabled:j,children:[s,"x",s]},s))})]}),l.jsxs("div",{style:{position:"relative"},children:[j&&l.jsx(no,{children:l.jsx(to,{})}),E&&l.jsx(Pt,{image:E,difficulty:o,onProgress:g,onComplete:s=>n(s),onBackToMenu:_,onImageChange:T,onError:P,onCorrectAnswer:de})]})]})]})};export{co as default};
