import{u as p,r as o,j as r}from"./index-afedb39a.js";import{u as a}from"./UserHook-9bbde312.js";import{M as u}from"./ModifyUserForm-2901b0ce.js";import{s as c}from"./Managers.module-29c6d44b.js";import{B as d}from"./BuildingList-0d004a40.js";import"./DoFetch-9e97aa9b.js";import"./FormFieldError-c9901bc0.js";import"./iconBase-0f7aa8ed.js";import"./ButtonLoading-f20425ef.js";import"./ThemeProvider-1a5ebb11.js";import"./SuccessAlertModal-b151164a.js";import"./Fade-fe8caa8d.js";import"./divWithClassName-7e795543.js";import"./index.esm-eae2c087.js";import"./Lists.module-d5aca742.js";import"./LoadingList-c905a2a1.js";import"./Button-dfa6a498.js";import"./Button-33af2190.js";import"./SearchBar-e13aa9d1.js";import"./BuildingHook-9894e231.js";const R=()=>{const{userid:i}=p(),{getUserById:e}=a(),[t,m]=o.useState(),n=async()=>{if(!i)return;const s=await e(i);s&&(m(s),console.log("User: ",s))};return o.useEffect(()=>{n()},[]),t?r.jsxs("div",{className:c.container,children:[r.jsx("h1",{children:"Isännöitsijän tiedot"}),r.jsx(u,{user:t,isAdmin:!0}),r.jsx("h4",{children:"Taloyhtiöt"}),r.jsx(d,{userid:t.user_id})]}):r.jsx("div",{children:"Ei käyttäjää"})};export{R as default};
