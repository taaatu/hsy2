import{r as o,j as r}from"./index-fdb54680.js";import{u as m}from"./UserHook-96b5e8ec.js";import{M as n}from"./ModifyUserForm-94c957bc.js";import"./DoFetch-44b224c4.js";import"./FormFieldError-c2d8c63e.js";import"./iconBase-ee127de4.js";import"./ButtonLoading-5c14b6da.js";import"./ThemeProvider-52d28998.js";import"./SuccessAlertModal-5fd775de.js";import"./Fade-70f01c49.js";import"./divWithClassName-6209a725.js";import"./index.esm-30964094.js";const U=()=>{const[t,s]=o.useState(null),{getUserByToken:i}=m();if(o.useEffect(()=>{(async()=>{const e=await i();console.log("checkToken: ",e),s(e||null)})()},[]),t)return r.jsx("div",{style:{padding:"1em"},children:r.jsx("main",{children:r.jsx(r.Fragment,{children:r.jsx(n,{user:t})})})})};export{U as default};
