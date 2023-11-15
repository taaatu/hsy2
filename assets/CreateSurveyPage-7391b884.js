import{r as i,j as e,u as V}from"./index-afedb39a.js";import{u as y,c as p}from"./ThemeProvider-1a5ebb11.js";import{C as Q}from"./Nav-dbd9a1fd.js";import{f as b}from"./divWithClassName-7e795543.js";import{d as J}from"./index.esm-eae2c087.js";import{a as z,F as c,u as G,b as P,C as X}from"./FormFieldError-c9901bc0.js";import{A as Y,a as Z,b as ee}from"./DoFetch-9e97aa9b.js";import{u as se}from"./SurveyHook-16c57945.js";import{S as ae}from"./SurveyPreview-8fe49589.js";import{B as te}from"./ButtonLoading-f20425ef.js";import{T as re,a as q}from"./Tabs-dddd0570.js";import{S as oe}from"./SuccessAlertModal-b151164a.js";import"./Fade-fe8caa8d.js";import"./Button-33af2190.js";import"./iconBase-0f7aa8ed.js";import"./AnswerSurveyForm-263a2aed.js";const ne="_container_1q2xj_1",ie="_dot_1q2xj_7",le="_selectWeight_1q2xj_23",de="_previewTop_1q2xj_33",ce="_form_1q2xj_49",ue="_optionInput_1q2xj_55",me="_createsurveybuttons_1q2xj_69",ye="_overlay_1q2xj_81",pe="_input_1q2xj_107",ve="_dates_1q2xj_123",he="_questionCard_1q2xj_135",je="_tabsBar_1q2xj_151",n={container:ne,dot:ie,selectWeight:le,previewTop:de,form:ce,optionInput:ue,createsurveybuttons:me,overlay:ye,input:pe,dates:ve,questionCard:he,tabsBar:je},k=i.forwardRef(({className:s,bsPrefix:a,as:t="div",...r},o)=>(a=y(a,"card-body"),e.jsx(t,{ref:o,className:p(s,a),...r})));k.displayName="CardBody";const K=k,F=i.forwardRef(({className:s,bsPrefix:a,as:t="div",...r},o)=>(a=y(a,"card-footer"),e.jsx(t,{ref:o,className:p(s,a),...r})));F.displayName="CardFooter";const xe=F,L=i.forwardRef(({bsPrefix:s,className:a,as:t="div",...r},o)=>{const d=y(s,"card-header"),m=i.useMemo(()=>({cardHeaderBsPrefix:d}),[d]);return e.jsx(Q.Provider,{value:m,children:e.jsx(t,{ref:o,...r,className:p(a,d)})})});L.displayName="CardHeader";const _e=L,R=i.forwardRef(({bsPrefix:s,className:a,variant:t,as:r="img",...o},d)=>{const m=y(s,"card-img");return e.jsx(r,{ref:d,className:p(t?`${m}-${t}`:m,a),...o})});R.displayName="CardImg";const Ne=R,T=i.forwardRef(({className:s,bsPrefix:a,as:t="div",...r},o)=>(a=y(a,"card-img-overlay"),e.jsx(t,{ref:o,className:p(s,a),...r})));T.displayName="CardImgOverlay";const fe=T,E=i.forwardRef(({className:s,bsPrefix:a,as:t="a",...r},o)=>(a=y(a,"card-link"),e.jsx(t,{ref:o,className:p(s,a),...r})));E.displayName="CardLink";const ge=E,qe=b("h6"),H=i.forwardRef(({className:s,bsPrefix:a,as:t=qe,...r},o)=>(a=y(a,"card-subtitle"),e.jsx(t,{ref:o,className:p(s,a),...r})));H.displayName="CardSubtitle";const Ce=H,A=i.forwardRef(({className:s,bsPrefix:a,as:t="p",...r},o)=>(a=y(a,"card-text"),e.jsx(t,{ref:o,className:p(s,a),...r})));A.displayName="CardText";const Se=A,$e=b("h5"),W=i.forwardRef(({className:s,bsPrefix:a,as:t=$e,...r},o)=>(a=y(a,"card-title"),e.jsx(t,{ref:o,className:p(s,a),...r})));W.displayName="CardTitle";const we=W,D=i.forwardRef(({bsPrefix:s,className:a,bg:t,text:r,border:o,body:d=!1,children:m,as:l="div",...v},h)=>{const j=y(s,"card");return e.jsx(l,{ref:h,...v,className:p(a,j,t&&`bg-${t}`,r&&`text-${r}`,o&&`border-${o}`),children:d?e.jsx(K,{children:m}):m})});D.displayName="Card";const f=Object.assign(D,{Img:Ne,Title:we,Subtitle:Ce,Body:K,Link:ge,Text:Se,Header:_e,Footer:xe,ImgOverlay:fe}),Ie=({index:s,register:a,control:t,remove:r})=>(z({name:"questions",control:t}),e.jsxs(f,{children:[e.jsxs(f.Header,{as:"h4",children:["Kysymys ",s+1]}),e.jsxs(f.Body,{children:[e.jsx("textarea",{placeholder:"Kysymys",className:n.input,...a(`questions.${s}.question`,{required:{value:!0,message:"Kysymys vaaditaan"}})}),e.jsxs("div",{className:"column",style:{gap:"0.5rem"},children:[e.jsxs("div",{className:"center-align",children:[e.jsx("span",{className:n.dot}),e.jsx("input",{className:`${n.optionInput} line`,type:"text",placeholder:"Vastaus 1",...a(`questions.${s}.option_1`,{required:{value:!0,message:"1. vastausvaihtoehto vaaditaan"}})}),e.jsx("div",{children:"+1"})]}),e.jsxs("div",{className:"center-align",children:[e.jsx("span",{className:n.dot}),e.jsx("input",{className:`${n.optionInput} line`,type:"text",placeholder:"Vastaus 2",...a(`questions.${s}.option_2`,{required:{value:!0,message:"2. vastausvaihtoehto vaaditaan"}})}),e.jsx("div",{children:"+0,5"})]}),e.jsxs("div",{className:"center-align",children:[e.jsx("span",{className:n.dot}),e.jsx("input",{className:`${n.optionInput} line`,type:"text",placeholder:"Vastaus 3",...a(`questions.${s}.option_3`,{required:{value:!0,message:"3. vastausvaihtoehto vaaditaan"}})}),e.jsx("div",{children:"0"})]})]})]}),e.jsx(f.Footer,{children:e.jsx("button",{onClick:()=>r(s),className:"delete",children:e.jsx(J,{})})})]}));var g=(s=>(s.PUBLISHED="published",s.UNPUBLISHED="unpublished",s))(g||{});const Be=({errors:s,questions:a})=>{var t,r,o,d;return e.jsxs(e.Fragment,{children:[e.jsx(c,{error:(t=s.survey_header)==null?void 0:t.survey_title}),e.jsx(c,{error:(r=s.survey_header)==null?void 0:r.start_time}),e.jsx(c,{error:(o=s.survey_header)==null?void 0:o.end_time}),e.jsx(c,{error:(d=s.survey_header)==null?void 0:d.description}),s.questions&&a.map((m,l)=>{var v,h,j,x;return e.jsxs(e.Fragment,{children:[e.jsxs("p",{className:"error",children:["Kysymys ",l+1]}),e.jsx(c,{error:(v=s.questions[l])==null?void 0:v.question}),e.jsx(c,{error:(h=s.questions[l])==null?void 0:h.option_1}),e.jsx(c,{error:(j=s.questions[l])==null?void 0:j.option_2}),e.jsx(c,{error:(x=s.questions[l])==null?void 0:x.option_3})]})})]})},B={question:"",option_1:Y,option_2:Z,option_3:ee},Je=()=>{var S,$,w,I;const{surveyid:s}=V(),[a,t]=i.useState(!1),[r,o]=i.useState(""),{createSurvey:d,getSurveyById:m}=se(),{register:l,control:v,handleSubmit:h,reset:j,getValues:x,setError:be,formState:{errors:_}}=G({defaultValues:{survey_header:{survey_status:g.UNPUBLISHED,start_time:new Date().toISOString().slice(0,10)},questions:[B]}}),{fields:C,append:U,remove:M}=P({control:v,name:"questions"}),O=async u=>{u.survey_header.survey_status=u.survey_header.survey_status===!0?g.PUBLISHED:g.UNPUBLISHED,console.log("data: ",u);const N=await d(u);N&&(o(N),t(!0))};return i.useEffect(()=>{console.log("surveyid: ",s),s&&(async()=>{const u=await m(s);u&&j(u)})()},[]),e.jsxs("main",{className:n.container,children:[e.jsx(oe,{show:a,message:r,navRoute:"/admin/surveys"}),e.jsx("form",{onSubmit:h(O),className:n.form,children:e.jsxs(re,{className:n.tabsBar,children:[e.jsx(q,{eventKey:"survey",title:"Kysely",children:e.jsxs("div",{className:"column",style:{maxWidth:"60ch",gap:"1rem"},children:[e.jsxs("label",{className:"createsurveything",children:["Kyselyn nimi",e.jsx("input",{maxLength:40,className:n.input,type:"text",placeholder:"Kyselyn nimi",...l("survey_header.survey_title",{required:{value:!0,message:"Kyselyn nimi vaaditaan"}})}),e.jsx(c,{error:(S=_.survey_header)==null?void 0:S.survey_title})]}),e.jsxs("div",{className:n.dates,children:[e.jsxs("label",{className:"createsurveything",children:["Alkaa",e.jsx("input",{type:"date",placeholder:"Alkaa",className:n.input,...l("survey_header.start_time",{required:{value:!0,message:"Alkamispäivä vaaditaan"}})}),e.jsx(c,{error:($=_.survey_header)==null?void 0:$.start_time})]}),e.jsxs("label",{className:"createsurveything",children:["Päättyy",e.jsx("input",{type:"date",placeholder:"Päättyy",className:n.input,...l("survey_header.end_time",{required:{value:!0,message:"Päättymispäivä vaaditaan"}})}),e.jsx(c,{error:(w=_.survey_header)==null?void 0:w.end_time})]})]}),e.jsxs("label",{className:"createsurveything",children:["Kuvaus",e.jsx("textarea",{placeholder:"Kuvaus",...l("survey_header.description",{required:{value:!0,message:"Kuvaus vaaditaan"}})}),e.jsx(c,{error:(I=_.survey_header)==null?void 0:I.description})]})]})}),e.jsx(q,{eventKey:"questions",title:"Kysymykset",id:"column",children:e.jsxs("div",{className:"column",children:[e.jsx("h3",{children:`Kysymyksiä (${C.length})`}),e.jsx("div",{className:"column",style:{gap:"1rem"},children:C.map((u,N)=>e.jsx(e.Fragment,{children:e.jsx(Ie,{index:N,register:l,control:v,remove:M},u.id)}))}),e.jsx("button",{type:"button",className:"colored",onClick:()=>U(B),children:"Lisää kysymys"})]})}),e.jsx(q,{eventKey:"create",title:"Luo kysely",children:e.jsxs("div",{className:"column color3 padding1",children:[e.jsxs("label",{className:"flex-row center-align",children:[e.jsx(X,{name:"survey_header.survey_status",control:v,rules:{required:!1},render:({field:u})=>e.jsx("input",{style:{height:"1rem",width:"1rem"},type:"checkbox",...u})}),"Jaa kysely isännöitsijöille"]}),e.jsx(ae,{survey:x()}),e.jsx(te,{text:"Luo kysely"}),e.jsx(Be,{errors:_,questions:x().questions})]})})]})})]})};export{Je as default};
