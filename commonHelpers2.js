import"./assets/modulepreload-polyfill-3cfb730f.js";/* empty css                      */const t={body:document.querySelector("body"),btnStart:document.querySelector("[data-start]"),btnStop:document.querySelector("[data-stop]")};t.btnStart.addEventListener("click",o);t.btnStop.addEventListener("click",n);let e=null;t.btnStop.disabled=!0;function o(){e=setInterval(()=>{t.body.style.backgroundColor=r()},1e3),t.btnStart.disabled=!0,t.btnStop.disabled=!1}function n(){clearInterval(e),t.btnStart.disabled=!1,t.btnStop.disabled=!0}function r(){return`#${Math.floor(Math.random()*16777215).toString(16).padStart(6,0)}`}
//# sourceMappingURL=commonHelpers2.js.map
