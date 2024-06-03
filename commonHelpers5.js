import"./assets/modulepreload-polyfill-3cfb730f.js";/* empty css                      */import{a as R,S as w,i as l}from"./assets/vendor-b851b841.js";R.defaults.headers.common["x-api-key"]="live_nOdnL3Dj9jjF4zVLjteozldoqmiVUxxCRsrlPoRVyonLQDm4DFuaUNiaRzafsnXC";const s={form:document.querySelector(".search-form"),gallery:document.querySelector(".gallery"),loader:document.querySelector(".loader")},c={position:"topRight",close:!1,timeout:5e3},r={SUCCESS:"success",ERROR:"error",INFO:"info"},e={page:1,per_page:40,totalHits:0,receivedHits:0,totalPages:0,searchQuery:null,isLoading:!1},d=new w(".gallery a",{captionsData:"alt",captionDelay:250});d.on("error.simplelightbox",function(t){console.log(t)});s.form.addEventListener("submit",v);window.addEventListener("scroll",g);async function v(t){var n;if(t.preventDefault(),e.isLoading)return;e.isLoading=!0;const o=new FormData(t.currentTarget);if(e.searchQuery=o.get("searchQuery"),e.page=1,e.receivedHits=0,e.totalHits=0,e.totalPages=0,s.gallery.innerHTML="",s.loader.classList.remove("hide"),s.form.reset(),!e.searchQuery){i({type:r.ERROR}),s.loader.classList.add("hide");return}try{const a=await p(e.searchQuery);if(!((n=a==null?void 0:a.hits)!=null&&n.length)){i({type:r.ERROR});return}h(a.hits),e.page++,e.totalHits=a.totalHits,e.totalPages=Math.ceil(e.totalHits/e.per_page),e.receivedHits+=a.hits.length,e.per_page=Math.min(e.totalHits-e.receivedHits,e.per_page),d.refresh(),i({type:r.SUCCESS,totalHits:e.totalHits}),e.page<e.totalPages&&window.addEventListener("scroll",g)}catch(a){console.log(a),i({type:r.ERROR})}finally{s.loader.classList.add("hide"),e.isLoading=!1}}function g(){window.scrollY+window.innerHeight>=document.documentElement.scrollHeight-50&&(s.loader.classList.remove("hide"),H())}async function H(){if(!e.isLoading){e.isLoading=!0;try{const t=await p(e.searchQuery);h(t.hits),e.page++,e.receivedHits+=t.hits.length,e.per_page=Math.min(e.totalHits-e.receivedHits,e.per_page),d.refresh();const{height:o}=s.gallery.firstElementChild.getBoundingClientRect();window.scrollBy({top:o*2,behavior:"smooth"}),e.page>e.totalPages&&(window.removeEventListener("scroll",g),i({type:r.INFO}))}catch(t){console.log(t),i({type:r.ERROR})}finally{s.loader.classList.add("hide"),e.isLoading=!1}}}async function p(t){const o=new URLSearchParams({key:"44202133-14fac6110a8eccaaec992feaf",q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:e.per_page,page:e.page}),a=await(await fetch(`https://pixabay.com/api/?${o.toString()}`)).json();return console.log(a),a}function h(t){const o=t.map(({largeImageURL:n,webformatURL:a,tags:m,likes:f,views:u,comments:y,downloads:L})=>`
        <div class="photo-card">
          <a href="${n}" class="card-link">
            <img src="${a}" alt="${m}" class="card-image" loading="lazy" />
          </a>
          <div class="info">
            <p class="info-item">
              <b>Likes</b>
              ${f}
            </p>
            <p class="info-item">
              <b>Views</b>
              ${u}
            </p>
            <p class="info-item">
              <b>Comments</b>
              ${y}
            </p>
            <p class="info-item">
              <b>Downloads</b>
              ${L}
            </p>
          </div>
        </div>
      `).join("");s.gallery.insertAdjacentHTML("beforeend",o)}function i({type:t,totalHits:o}){o&&t===r.SUCCESS?l.success({message:`Hooray! We found ${o} images.`,...c}):t===r.ERROR?l.error({message:"Sorry, there are no images matching your search query. Please try again.",...c}):t===r.INFO&&l.info({message:"We're sorry, but you've reached the end of search results.",...c})}
//# sourceMappingURL=commonHelpers5.js.map
