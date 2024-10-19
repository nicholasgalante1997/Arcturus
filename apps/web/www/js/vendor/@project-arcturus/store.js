function u(c,s){let t=s,e=[];return{useStore:()=>t,dispatch:n=>{t=c(t,n),e.forEach(i=>i(t))},subscribe:n=>(e.push(n),function(){let a=e.indexOf(n);a!==-1&&e.splice(a,1)})}}export{u as createStore};
//# sourceMappingURL=bundle.mjs.map
