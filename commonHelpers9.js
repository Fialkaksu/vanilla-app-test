import"./assets/modulepreload-polyfill-3cfb730f.js";/* empty css                      */import{P as o,t as n}from"./assets/vendor-b851b841.js";const c=document.querySelector("iframe#vimeo-player"),t=new o(c),r="videoplayer-current-time",a=JSON.parse(localStorage.getItem(r))||0;t.setCurrentTime(a).catch(function(e){console.error("Error setting current time:",e)});const i=n(function(e){localStorage.setItem(r,e.seconds)},1e3);t.on("timeupdate",i);
//# sourceMappingURL=commonHelpers9.js.map
