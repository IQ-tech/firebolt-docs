import{r}from"./chunks/chunk.6158a2a2.js";import{j as n,a as o}from"./chunks/chunk.83ca79c6.js";function a(){const[e,s]=r.exports.useState(!1);return r.exports.useEffect(()=>{const t=document.getElementsByTagName("body")[0];e?t.classList.add("mobile-sidebar-toggle"):t.classList.remove("mobile-sidebar-toggle")},[e]),{sidebarShown:e,setSidebarShown:s}}const l=()=>{const{sidebarShown:e,setSidebarShown:s}=a();return n("button",{type:"button","aria-pressed":e?"true":"false",id:"menu-toggle",onClick:()=>s(!e),children:[o("svg",{xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:o("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M4 6h16M4 12h16M4 18h16"})}),o("span",{className:"sr-only",children:"Toggle sidebar"})]})};export{l as default};