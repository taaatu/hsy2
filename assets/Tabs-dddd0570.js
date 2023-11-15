import{N as $,F as I,P as f}from"./Fade-fe8caa8d.js";import{r as b,j as i}from"./index-afedb39a.js";import{T as y,m as K,S as h,u as D,$ as W,c as z,e as G,f as H,d as J}from"./Nav-dbd9a1fd.js";import{u as A,c as S}from"./ThemeProvider-1a5ebb11.js";const Q=["active","eventKey","mountOnEnter","transition","unmountOnExit","role","onEnter","onEntering","onEntered","onExit","onExiting","onExited"],X=["activeKey","getControlledId","getControllerId"],Y=["as"];function g(n,e){if(n==null)return{};var t={},o=Object.keys(n),r,a;for(a=0;a<o.length;a++)r=o[a],!(e.indexOf(r)>=0)&&(t[r]=n[r]);return t}function R(n){let{active:e,eventKey:t,mountOnEnter:o,transition:r,unmountOnExit:a,role:d="tabpanel",onEnter:l,onEntering:c,onEntered:E,onExit:u,onExiting:s,onExited:m}=n,x=g(n,Q);const p=b.useContext(y);if(!p)return[Object.assign({},x,{role:d}),{eventKey:t,isActive:e,mountOnEnter:o,transition:r,unmountOnExit:a,onEnter:l,onEntering:c,onEntered:E,onExit:u,onExiting:s,onExited:m}];const{activeKey:v,getControlledId:T,getControllerId:C}=p,O=g(p,X),P=K(t);return[Object.assign({},x,{role:d,id:T(t),"aria-labelledby":C(t)}),{eventKey:t,isActive:e==null&&P!=null?K(v)===P:e,transition:r||O.transition,mountOnEnter:o??O.mountOnEnter,unmountOnExit:a??O.unmountOnExit,onEnter:l,onEntering:c,onEntered:E,onExit:u,onExiting:s,onExited:m}]}const k=b.forwardRef((n,e)=>{let{as:t="div"}=n,o=g(n,Y);const[r,{isActive:a,onEnter:d,onEntering:l,onEntered:c,onExit:E,onExiting:u,onExited:s,mountOnEnter:m,unmountOnExit:x,transition:p=$}]=R(o);return i.jsx(y.Provider,{value:null,children:i.jsx(h.Provider,{value:null,children:i.jsx(p,{in:a,onEnter:d,onEntering:l,onEntered:c,onExit:E,onExiting:u,onExited:s,mountOnEnter:m,unmountOnExit:x,children:i.jsx(t,Object.assign({},r,{ref:e,hidden:!a,"aria-hidden":!a}))})})})});k.displayName="TabPanel";const w=n=>{const{id:e,generateChildId:t,onSelect:o,activeKey:r,defaultActiveKey:a,transition:d,mountOnEnter:l,unmountOnExit:c,children:E}=n,[u,s]=D(r,a,o),m=W(e),x=b.useMemo(()=>t||((v,T)=>m?`${m}-${T}-${v}`:null),[m,t]),p=b.useMemo(()=>({onSelect:s,activeKey:u,transition:d,mountOnEnter:l||!1,unmountOnExit:c||!1,getControlledId:v=>x(v,"tabpane"),getControllerId:v=>x(v,"tab")}),[s,u,d,l,c,x]);return i.jsx(y.Provider,{value:p,children:i.jsx(h.Provider,{value:s||null,children:E})})};w.Panel=k;const B=w;function j(n){return typeof n=="boolean"?n?I:$:n}const F=({transition:n,...e})=>i.jsx(B,{...e,transition:j(n)});F.displayName="TabContainer";const Z=F,L=b.forwardRef(({className:n,bsPrefix:e,as:t="div",...o},r)=>(e=A(e,"tab-content"),i.jsx(t,{ref:r,className:S(n,e),...o})));L.displayName="TabContent";const M=L,U=b.forwardRef(({bsPrefix:n,transition:e,...t},o)=>{const[{className:r,as:a="div",...d},{isActive:l,onEnter:c,onEntering:E,onEntered:u,onExit:s,onExiting:m,onExited:x,mountOnEnter:p,unmountOnExit:v,transition:T=I}]=R({...t,transition:j(e)}),C=A(n,"tab-pane");return i.jsx(y.Provider,{value:null,children:i.jsx(h.Provider,{value:null,children:i.jsx(T,{in:l,onEnter:c,onEntering:E,onEntered:u,onExit:s,onExiting:m,onExited:x,mountOnEnter:p,unmountOnExit:v,children:i.jsx(a,{...d,ref:o,className:S(r,C,l&&"active")})})})})});U.displayName="TabPane";const V=U,nn={eventKey:f.oneOfType([f.string,f.number]),title:f.node.isRequired,disabled:f.bool,tabClassName:f.string,tabAttrs:f.object},_=()=>{throw new Error("ReactBootstrap: The `Tab` component is not meant to be rendered! It's an abstract component that is only valid as a direct Child of the `Tabs` Component. For custom tabs components use TabPane and TabsContainer directly")};_.propTypes=nn;const dn=Object.assign(_,{Container:Z,Content:M,Pane:V});function N(n,e){let t=0;return b.Children.map(n,o=>b.isValidElement(o)?e(o,t++):o)}function en(n,e){let t=0;b.Children.forEach(n,o=>{b.isValidElement(o)&&e(o,t++)})}function tn(n){let e;return en(n,t=>{e==null&&(e=t.props.eventKey)}),e}function on(n){const{title:e,eventKey:t,disabled:o,tabClassName:r,tabAttrs:a,id:d}=n.props;return e==null?null:i.jsx(H,{as:"li",role:"presentation",children:i.jsx(J,{as:"button",type:"button",eventKey:t,disabled:o,id:d,className:r,...a,children:e})})}const q=n=>{const{id:e,onSelect:t,transition:o,mountOnEnter:r=!1,unmountOnExit:a=!1,variant:d="tabs",children:l,activeKey:c=tn(l),...E}=z(n,{activeKey:"onSelect"});return i.jsxs(B,{id:e,activeKey:c,onSelect:t,transition:j(o),mountOnEnter:r,unmountOnExit:a,children:[i.jsx(G,{...E,role:"tablist",as:"ul",variant:d,children:N(l,on)}),i.jsx(M,{children:N(l,u=>{const s={...u.props};return delete s.title,delete s.disabled,delete s.tabClassName,delete s.tabAttrs,i.jsx(V,{...s})})})]})};q.displayName="Tabs";const cn=q;export{cn as T,dn as a};
