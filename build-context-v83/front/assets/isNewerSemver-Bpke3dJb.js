var i=(s,a)=>{const n=s.split(".").map(Number),p=a.split(".").map(Number);for(let r=0;r<3;r++){const t=n[r]??0,e=p[r]??0;if(t>e)return!0;if(t<e)return!1}return!1};export{i as t};
