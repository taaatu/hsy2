import{r as s,u as a,j as t}from"./index-3f9fbaf7.js";import{A as y}from"./AnswerSurveyForm-c8d325bd.js";import{u as n}from"./SurveyHook-459b1abf.js";import"./SuccessAlertModal-b2e6a8d1.js";import"./ThemeProvider-ce2567eb.js";import"./Fade-7afac57e.js";import"./divWithClassName-b4ab7837.js";import"./index.esm-8878fbb5.js";import"./iconBase-f096ba74.js";import"./ButtonLoading-e86491c1.js";import"./DoFetch-1e9456b0.js";const w=({isPreview:o})=>{const[e,i]=s.useState(),{surveyid:r}=a(),{getSurveyByKey:u}=n();return s.useEffect(()=>{(async()=>{if(!r)return;const m=await u(r);i(m)})()},[]),e?t.jsx("main",{style:{maxWidth:"75ch",margin:"auto"},children:t.jsx(y,{survey:e,isPreview:o,surveyKey:r})}):t.jsx("h1",{children:"Kyselyä ei löytynyt"})};export{w as default};
