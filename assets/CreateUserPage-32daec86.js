import{r as x,j as s}from"./index-afedb39a.js";import{P as h,C as S}from"./DoFetch-9e97aa9b.js";import{u as k}from"./UserHook-9bbde312.js";import{B as f}from"./ButtonLoading-f20425ef.js";import{u as v,F as e}from"./FormFieldError-c9901bc0.js";import{S as y}from"./SuccessAlertModal-b151164a.js";import"./ThemeProvider-1a5ebb11.js";import"./iconBase-0f7aa8ed.js";import"./Fade-fe8caa8d.js";import"./divWithClassName-7e795543.js";import"./index.esm-eae2c087.js";const M=()=>{var i,t;const{addUser:l}=k(),[m,c]=x.useState(!1),{register:a,handleSubmit:u,setError:p,formState:{errors:r}}=v(),d=async o=>{console.log("data: ",o);const n=await l(o);if(n instanceof S){const j=n.status===409?"Sähköposti on jo käytössä":"Palvelinvirhe";p("root.serverError",{message:j});return}c(!0)};return s.jsxs("main",{className:"centered-container column",children:[s.jsx(y,{show:m,message:"Isännöitsijä lisätty onnistuneesti",navRoute:"/admin/managers"}),s.jsx("h1",{children:"Lisää isännöitsijä"}),s.jsxs("form",{className:"color3 column",onSubmit:u(d),children:[s.jsxs("label",{children:["Isännöitsijän nimi",s.jsx("input",{type:"text",className:"line",...a("full_name",{required:"Nimi vaaditaan"})}),s.jsx(e,{error:r.full_name})]}),s.jsxs("label",{children:["Yrityksen nimi",s.jsx("input",{className:"line",...a("company",{required:"Yrityksen nimi vaaditaan"})}),s.jsx(e,{error:r.company})]}),s.jsxs("label",{children:["Sähköposti",s.jsx("input",{type:"email",className:"line",...a("email",{required:"Sähköposti vaaditaan"})}),s.jsx(e,{error:r.email})]}),s.jsxs("label",{children:["Salasana",s.jsx("input",{className:"line",type:"password",...a("password",{required:"Salasana vaaditaan",pattern:{value:h,message:"Salasanan tulee olla vähintään 8 merkkiä pitkä ja sisältää vähintään yksi numero, yksi erikoismerkki ja yksi iso kirjain"}})}),s.jsx(e,{error:r.password})]}),((i=r.root)==null?void 0:i.serverError)&&s.jsx(e,{error:(t=r.root)==null?void 0:t.serverError}),s.jsx(f,{text:"Lisää isännöitsijä"})]})]})};export{M as default};
