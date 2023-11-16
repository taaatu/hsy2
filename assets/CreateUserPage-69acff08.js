import{r as x,j as s}from"./index-fd9a55c3.js";import{P as h,C as S}from"./DoFetch-47bf4739.js";import{u as k}from"./UserHook-5320e6da.js";import{B as y}from"./ButtonLoading-da7847ae.js";import{u as f,F as e}from"./FormFieldError-2e0532e1.js";import{S as v}from"./SuccessAlertModal-ea37d6bd.js";import"./ThemeProvider-d9536db2.js";import"./iconBase-bc1823de.js";import"./Fade-ecdcd8a1.js";import"./divWithClassName-0f0c772e.js";import"./index.esm-66687265.js";const M=()=>{var i,t;const{addUser:l}=k(),[m,c]=x.useState(!1),{register:a,handleSubmit:u,setError:d,formState:{errors:r}}=f(),p=async o=>{console.log("data: ",o);const n=await l(o);if(n instanceof S){const j=n.status===409?"Sähköposti on jo käytössä":"Palvelinvirhe";d("root.serverError",{message:j});return}c(!0)};return s.jsxs("main",{className:"centered-container column",children:[s.jsx(v,{show:m,message:"Isännöitsijä lisätty onnistuneesti",navRoute:"/admin/managers"}),s.jsxs("form",{className:"color3 column",style:{width:"50%",minWidth:"350px"},onSubmit:u(p),children:[s.jsx("h4",{children:"Lisää isännöitsijä"}),s.jsxs("label",{children:["Isännöitsijän nimi",s.jsx("input",{type:"text",className:"line",...a("full_name",{required:"Nimi vaaditaan"})}),s.jsx(e,{error:r.full_name})]}),s.jsxs("label",{children:["Yrityksen nimi",s.jsx("input",{className:"line",...a("company",{required:"Yrityksen nimi vaaditaan"})}),s.jsx(e,{error:r.company})]}),s.jsxs("label",{children:["Sähköposti",s.jsx("input",{type:"email",className:"line",...a("email",{required:"Sähköposti vaaditaan"})}),s.jsx(e,{error:r.email})]}),s.jsxs("label",{children:["Salasana",s.jsx("input",{className:"line",type:"password",...a("password",{required:"Salasana vaaditaan",pattern:{value:h,message:"Salasanan tulee olla vähintään 8 merkkiä pitkä ja sisältää vähintään yksi numero, yksi erikoismerkki ja yksi iso kirjain"}})}),s.jsx(e,{error:r.password})]}),((i=r.root)==null?void 0:i.serverError)&&s.jsx(e,{error:(t=r.root)==null?void 0:t.serverError}),s.jsx("div",{style:{margin:"auto"},children:s.jsx(y,{text:"Lisää isännöitsijä"})})]})]})};export{M as default};