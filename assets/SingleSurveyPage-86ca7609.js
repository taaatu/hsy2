import{u as m,r as s,a as l,j as e}from"./index-afedb39a.js";import{u as v}from"./SurveyHook-16c57945.js";import{S as d}from"./SurveyPreview-8fe49589.js";import"./DoFetch-9e97aa9b.js";import"./SuccessAlertModal-b151164a.js";import"./ThemeProvider-1a5ebb11.js";import"./Fade-fe8caa8d.js";import"./divWithClassName-7e795543.js";import"./index.esm-eae2c087.js";import"./iconBase-0f7aa8ed.js";import"./AnswerSurveyForm-263a2aed.js";import"./ButtonLoading-f20425ef.js";const N=()=>{const{surveyid:r}=m(),{getSurveyById:i,deleteSurvey:a}=v(),[t,o]=s.useState(),u=l(),n=async()=>{r&&confirm("Haluatko varmasti poistaa kyselyn?")&&await a(r)},c=async()=>{if(!r)return;const y=await i(r);o(y)};return s.useEffect(()=>{c()},[]),t?e.jsxs("div",{children:[e.jsx("h1",{children:t.survey_header.survey_title}),e.jsx(d,{survey:t}),e.jsx("button",{className:"delete",onClick:n,children:"Poista kysely"}),e.jsx("button",{className:"colored",onClick:()=>u("/admin/surveys/create/"+t.survey_header.survey_id),children:"Luo kopio"})]}):e.jsx("h1",{children:"Ei kyselyä"})};export{N as default};
