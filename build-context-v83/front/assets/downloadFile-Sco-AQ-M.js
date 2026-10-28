import{t}from"./FileSaver.min-D8cZh_RN.js";var a=t(),l=(r,i)=>fetch(r).then(e=>e.status===200?e.blob():Promise.reject("Failed downloading file")).then(e=>{(0,a.saveAs)(e,i)});export{l as t};
