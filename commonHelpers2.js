import"./assets/modulepreload-polyfill-3cfb730f.js";/* empty css                      */import{t as r}from"./assets/vendor-a60e50bd.js";const a=document.querySelector(".feedback-form");a.addEventListener("submit",n);a.addEventListener("input",r(m,500));const o="feedback-form-state",e=JSON.parse(localStorage.getItem(o))||{};a.email.value=e.email||"";a.message.value=e.message||"";function m(t){e[t.target.name]=t.target.value,localStorage.setItem(o,JSON.stringify(e))}function n(t){t.preventDefault(),t.currentTarget.reset(),localStorage.removeItem(o),console.log(e),e.email="",e.message=""}
//# sourceMappingURL=commonHelpers2.js.map