"use strict";(self.webpackChunkpotato_peeler=self.webpackChunkpotato_peeler||[]).push([[678],{6558:function(e,t,l){l.r(t),l.d(t,{Head:function(){return a}});var n=l(7294);t.default=()=>{const e=(0,n.useRef)(null),{0:t,1:l}=(0,n.useState)("0000");return(0,n.useEffect)((()=>{let t,n=500;const a=e.current.querySelectorAll(".peelers div");console.log(a[0]);const r=e.current.querySelector(".peelers").offsetTop,c=e.current.querySelector(".peelers").clientHeight;let m=.1;function s(t){const l=document.createElement("div");l.dataset.elapsedTime=t.toString(),l.className="potatoRow",l.style.bottom=window.innerHeight+"px";const a=Math.random()<.5?1:2,r=[1,2,3];for(let e=0;e<a&&n>0;e++){const e=Math.floor(Math.random()*r.length),t=document.createElement("img");t.src="https://devlak2001.s3.eu-central-1.amazonaws.com/potatoPeeler/potato.png",t.style.gridColumn=""+r[e],t.dataset.peelable="false",t.dataset.column=""+r[e],t.ontouchstart=u,l.append(t),n--,r.splice(e,1)}e.current.append(l)}function u(e){const t=e.currentTarget;t.getBoundingClientRect().top+t.clientHeight>r&&t.getBoundingClientRect().top<r+c&&(t.classList.add("clicked"),l((e=>(Number(e)+10).toString().padStart(4,"0"))),a[parseInt(t.dataset.column)-1].style.animation="none",console.log(t.clientHeight),a[parseInt(t.dataset.column)-1].style.animation="peeling 0.4s ease")}document.addEventListener("gesturestart",(function(e){e.preventDefault()})),s(0),requestAnimationFrame((function l(n){void 0===t&&(t=n);const a=n-t,r=e.current.querySelectorAll(".potatoRow");r[r.length-1].offsetTop>0&&s(a),m<.3&&(m=.1+a/1e5),r[0].offsetTop>window.innerHeight&&e.current.removeChild(r[0]),r.forEach((e=>{e.style.bottom=window.innerHeight-(a-e.dataset.elapsedTime)*m+"px"})),requestAnimationFrame(l)}))}),[l]),n.createElement("div",{className:"potatoGame",ref:e},n.createElement("div",{className:"score"},n.createElement("div",{className:"digits",style:{transform:"translateY(calc(-"+Number(t[0])+" * 11.4vw))"}},n.createElement("div",null,n.createElement("span",null,"0")),n.createElement("div",null,n.createElement("span",null,"1")),n.createElement("div",null,n.createElement("span",null,"2")),n.createElement("div",null,n.createElement("span",null,"3")),n.createElement("div",null,n.createElement("span",null,"4")),n.createElement("div",null,n.createElement("span",null,"5")),n.createElement("div",null,n.createElement("span",null,"6")),n.createElement("div",null,n.createElement("span",null,"7")),n.createElement("div",null,n.createElement("span",null,"8")),n.createElement("div",null,n.createElement("span",null,"9"))),n.createElement("div",{className:"digits",style:{transform:"translateY(calc(-"+Number(t[1])+" * 11.4vw))"}},n.createElement("div",null,n.createElement("span",null,"0")),n.createElement("div",null,n.createElement("span",null,"1")),n.createElement("div",null,n.createElement("span",null,"2")),n.createElement("div",null,n.createElement("span",null,"3")),n.createElement("div",null,n.createElement("span",null,"4")),n.createElement("div",null,n.createElement("span",null,"5")),n.createElement("div",null,n.createElement("span",null,"6")),n.createElement("div",null,n.createElement("span",null,"7")),n.createElement("div",null,n.createElement("span",null,"8")),n.createElement("div",null,n.createElement("span",null,"9"))),n.createElement("div",{className:"digits",style:{transform:"translateY(calc(-"+Number(t[2])+" * 11.4vw))"}},n.createElement("div",null,n.createElement("span",null,"0")),n.createElement("div",null,n.createElement("span",null,"1")),n.createElement("div",null,n.createElement("span",null,"2")),n.createElement("div",null,n.createElement("span",null,"3")),n.createElement("div",null,n.createElement("span",null,"4")),n.createElement("div",null,n.createElement("span",null,"5")),n.createElement("div",null,n.createElement("span",null,"6")),n.createElement("div",null,n.createElement("span",null,"7")),n.createElement("div",null,n.createElement("span",null,"8")),n.createElement("div",null,n.createElement("span",null,"9"))),n.createElement("div",{className:"digits",style:{transform:"translateY(calc(-"+Number(t[3])+" * 11.4vw))"}},n.createElement("div",null,n.createElement("span",null,"0")),n.createElement("div",null,n.createElement("span",null,"1")),n.createElement("div",null,n.createElement("span",null,"2")),n.createElement("div",null,n.createElement("span",null,"3")),n.createElement("div",null,n.createElement("span",null,"4")),n.createElement("div",null,n.createElement("span",null,"5")),n.createElement("div",null,n.createElement("span",null,"6")),n.createElement("div",null,n.createElement("span",null,"7")),n.createElement("div",null,n.createElement("span",null,"8")),n.createElement("div",null,n.createElement("span",null,"9")))),n.createElement("div",{className:"peelers"},n.createElement("div",null),n.createElement("div",null),n.createElement("div",null)))};const a=()=>n.createElement(n.Fragment,null,n.createElement("meta",{name:"viewport",content:"width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"}),n.createElement("title",null,"Home Page"))}}]);
//# sourceMappingURL=component---src-pages-index-js-3980a23c02f5d0ca6499.js.map