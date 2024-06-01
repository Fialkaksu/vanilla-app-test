import"./assets/modulepreload-polyfill-3cfb730f.js";/* empty css                      */import{a as r,C as l,i as h}from"./assets/vendor-b851b841.js";r.defaults.headers.common["x-api-key"]="live_nOdnL3Dj9jjF4zVLjteozldoqmiVUxxCRsrlPoRVyonLQDm4DFuaUNiaRzafsnXC";async function m(){return r.get("https://api.thecatapi.com/v1/breeds")}async function p(n){return r.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${n}`)}const t={breedSelect:document.querySelector(".breed-select"),loader:document.querySelector(".loader"),catInfo:document.querySelector(".cat-info")};t.breedSelect.addEventListener("change",u);(function(){m().then(e=>e.data).then(e=>{f(e),new l(t.breedSelect,{searchEnabled:!0})}).catch(e=>{console.log(e),c()}).finally(()=>{t.loader.classList.add("hide"),t.breedSelect.classList.remove("hide")})})();function u(){t.loader.classList.remove("hide"),t.catInfo.innerHTML="";const n=t.breedSelect.value;p(n).then(e=>e.data).then(e=>{b(e[0])}).catch(e=>{console.log(e),c()}).finally(()=>{t.loader.classList.add("hide")})}function f(n){const e=n.map(({id:a,name:o})=>`<option value="${a}">${o}</option>`).join("");t.breedSelect.insertAdjacentHTML("beforeend",e)}function b(n){const{url:e,breeds:a}=n,{name:o,description:s,temperament:i}=a[0],d=`
    <div class="cat-img">
      <img src="${e}" alt="${o}">
    </div>
    <div class="info">
      <h2>${o}</h2>
      <p>${s}</p>
      <p><b>Temperament:</b> ${i}</p>
    </div>
  `;t.catInfo.innerHTML=d}function c(){h.error({message:"Oops! Something went wrong! Try reloading the page!",position:"topRight",close:!1,timeout:3e3})}
//# sourceMappingURL=commonHelpers.js.map
