import{u as p,r as o,j as r}from"./index-e95d5965.js";import{u as a}from"./UserHook-f1ad03fc.js";import{M as u}from"./ModifyUserForm-8b601a66.js";import{s as c}from"./Managers.module-29c6d44b.js";import{B as d}from"./BuildingList-dd81aab8.js";import"./DoFetch-a9cf7fe3.js";import"./FormFieldError-a4819356.js";import"./iconBase-de053acb.js";import"./ButtonLoading-dae6692b.js";import"./ThemeProvider-f75a7bb0.js";import"./SuccessAlertModal-9760b608.js";import"./Fade-1ec5f89e.js";import"./divWithClassName-ed702d6a.js";import"./index.esm-1f466b1a.js";import"./Lists.module-d5aca742.js";import"./LoadingList-52dc23f3.js";import"./Button-0cd090e0.js";import"./Button-520bd067.js";import"./SearchBar-4c65a054.js";import"./BuildingHook-2615143d.js";const R=()=>{const{userid:i}=p(),{getUserById:e}=a(),[t,m]=o.useState(),n=async()=>{if(!i)return;const s=await e(i);s&&(m(s),console.log("User: ",s))};return o.useEffect(()=>{n()},[]),t?r.jsxs("div",{className:c.container,children:[r.jsx("h1",{children:"Isännöitsijän tiedot"}),r.jsx(u,{user:t,isAdmin:!0}),r.jsx("h4",{children:"Taloyhtiöt"}),r.jsx(d,{userid:t.user_id})]}):r.jsx("div",{children:"Ei käyttäjää"})};export{R as default};
