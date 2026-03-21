import{a as p,b as g,r as c,j as e,L as r,O as u}from"./index-CWwUB-Ni.js";import{c as a}from"./createLucideIcon-BfPwYZNH.js";import{C as y}from"./calendar-DTa9lnEs.js";import{D as f}from"./dollar-sign-DbCSKsaP.js";/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const b=[["rect",{width:"8",height:"4",x:"8",y:"2",rx:"1",ry:"1",key:"tgr4d6"}],["path",{d:"M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2",key:"116196"}],["path",{d:"M12 11h4",key:"1jrz19"}],["path",{d:"M12 16h4",key:"n85exb"}],["path",{d:"M8 11h.01",key:"1dfujw"}],["path",{d:"M8 16h.01",key:"18s6g9"}]],w=a("clipboard-list",b);/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const v=[["path",{d:"M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8",key:"5wwlr5"}],["path",{d:"M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",key:"r6nss1"}]],k=a("house",v);/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const j=[["rect",{width:"7",height:"9",x:"3",y:"3",rx:"1",key:"10lvy0"}],["rect",{width:"7",height:"5",x:"14",y:"3",rx:"1",key:"16une8"}],["rect",{width:"7",height:"9",x:"14",y:"12",rx:"1",key:"1hutg5"}],["rect",{width:"7",height:"5",x:"3",y:"16",rx:"1",key:"ldoo1y"}]],N=a("layout-dashboard",j);/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const M=[["path",{d:"m16 17 5-5-5-5",key:"1bji2h"}],["path",{d:"M21 12H9",key:"dn1m92"}],["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}]],_=a("log-out",M);/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const L=[["path",{d:"M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915",key:"1i5ecw"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]],z=a("settings",L);/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const C=[["path",{d:"M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2",key:"cjf0a3"}],["path",{d:"M7 2v20",key:"1473qp"}],["path",{d:"M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7",key:"j28e5"}]],S=a("utensils",C),h=[{href:"/admin",label:"Dashboard",icon:N},{href:"/admin/calendar",label:"Calendar",icon:y},{href:"/admin/bookings",label:"Bookings",icon:w},{href:"/admin/finances",label:"Finances",icon:f},{href:"/admin/activities",label:"Activities",icon:S},{href:"/admin/settings",label:"Settings",icon:z}];function H(){const s=p(),i=g(),[l,d]=c.useState(!0);c.useEffect(()=>{fetch("/api/bookings?_check=1").then(t=>{t.status===401?i("/admin/login",{replace:!0}):d(!1)}).catch(()=>i("/admin/login",{replace:!0}))},[i]);const x=async()=>{await fetch("/api/auth/logout",{method:"POST"}),i("/admin/login")};return l?null:e.jsxs("div",{className:"min-h-screen flex bg-cream",children:[e.jsxs("aside",{className:"w-64 bg-dark text-warm-white shrink-0 flex flex-col max-lg:hidden",children:[e.jsxs("div",{className:"p-6 border-b border-white/10",children:[e.jsx("h2",{className:"font-[family-name:var(--font-display)] text-lg font-semibold",children:"Cretan Gea"}),e.jsx("p",{className:"text-xs text-white/50 mt-1",children:"Admin Dashboard"})]}),e.jsx("nav",{className:"flex-1 p-4 space-y-1",children:h.map(({href:t,label:n,icon:o})=>{const m=s.pathname===t||t!=="/admin"&&s.pathname.startsWith(t);return e.jsxs(r,{to:t,className:`flex items-center gap-3 px-4 py-2.5 rounded text-sm no-underline transition-colors ${m?"bg-earth text-warm-white":"text-white/60 hover:text-white hover:bg-white/5"}`,children:[e.jsx(o,{size:18}),n]},t)})}),e.jsxs("div",{className:"p-4 border-t border-white/10 space-y-1",children:[e.jsxs(r,{to:"/",className:"flex items-center gap-3 px-4 py-2.5 rounded text-sm text-white/60 no-underline hover:text-white hover:bg-white/5 transition-colors",children:[e.jsx(k,{size:18}),"View Site"]}),e.jsxs("button",{onClick:x,className:"flex items-center gap-3 px-4 py-2.5 rounded text-sm text-white/60 hover:text-white hover:bg-white/5 transition-colors w-full border-none bg-transparent cursor-pointer",children:[e.jsx(_,{size:18}),"Sign Out"]})]})]}),e.jsxs("div",{className:"lg:hidden fixed top-0 left-0 right-0 z-50 bg-dark text-warm-white flex items-center justify-between px-4 py-3",children:[e.jsx("h2",{className:"font-[family-name:var(--font-display)] text-base font-semibold",children:"Cretan Gea Admin"}),e.jsx("div",{className:"flex gap-2",children:h.map(({href:t,icon:n})=>{const o=s.pathname===t||t!=="/admin"&&s.pathname.startsWith(t);return e.jsx(r,{to:t,className:`p-2 rounded transition-colors ${o?"bg-earth text-white":"text-white/60 hover:text-white"}`,children:e.jsx(n,{size:16})},t)})})]}),e.jsx("main",{className:"flex-1 p-6 lg:p-8 overflow-auto max-lg:pt-16",children:e.jsx(u,{})})]})}export{H as default};
