import{r as i,M as p,a as j,j as s,U as v}from"./index-fd9a55c3.js";import{s as a}from"./Lists.module-d5aca742.js";import{L as g}from"./LoadingList-c823cf63.js";import{S as C}from"./SearchBar-203ea08b.js";import{u as L}from"./BuildingHook-821d0996.js";const _=({userid:r})=>{const{curentUser:o}=i.useContext(p),n=j(),{getAllBuildings:d,getBuildingsByUserId:c}=L(),[l,m]=i.useState([]),[t,x]=i.useState(""),h=l.filter(e=>e.name.toLowerCase().includes(t.toLowerCase())||e.street.toLowerCase().includes(t.toLowerCase())||e.city.toLowerCase().includes(t.toLowerCase())||e.post_code.toLowerCase().includes(t.toLowerCase())),u=e=>x(e.target.value);return i.useEffect(()=>{(async()=>{const e=r?await c(r):await d();m(e)})()},[r]),s.jsxs(g,{children:[s.jsxs("div",{className:"sticky-header color3 rounded padding1",children:[s.jsx(C,{placeholder:"Hae taloyhtiötä",handleSearch:u}),s.jsxs("div",{className:`bold ${a.buildingsHeader}`,children:[s.jsx("div",{children:"Osoite"}),s.jsx("div",{children:"Nimi"}),s.jsx("div",{children:"Isännöitsijä"}),s.jsx("div",{className:a.btnContainer})]})]}),h.map(e=>s.jsxs("div",{className:a.buildingListItem,children:[s.jsxs("div",{style:{flex:1},children:[e.street,", ",e.post_code,", ",e.city]}),s.jsx("div",{style:{flex:1},children:e.name}),s.jsx("div",{style:{flex:1},children:e.manager_name}),s.jsx("div",{className:a.btnContainer,children:s.jsx("button",{onClick:()=>n((o==null?void 0:o.user_group)===v.ADMIN?"/admin/properties/"+e.building_id:"/manager/properties/"+e.building_id),children:"Siirry"})})]},e.building_id))]})};export{_ as B};