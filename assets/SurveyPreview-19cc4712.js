import{r as i,j as e}from"./index-fd9a55c3.js";import{M as s}from"./SuccessAlertModal-ea37d6bd.js";import{A as a}from"./AnswerSurveyForm-8b20d9a6.js";const h=({survey:t})=>{const[o,r]=i.useState(!1),n=()=>r(!0),l=()=>r(!1);return e.jsxs(e.Fragment,{children:[e.jsx("button",{type:"button",onClick:n,children:"Esikatsele"}),e.jsxs(s,{show:o,onHide:l,size:"lg",scrollable:!0,children:[e.jsx(s.Header,{closeButton:!0,children:e.jsx(s.Title,{children:"Kyselyn esikatselu"})}),e.jsx(s.Body,{children:e.jsx(a,{survey:t,isPreview:!0})})]})]})};export{h as S};