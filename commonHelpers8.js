import"./assets/modulepreload-polyfill-3cfb730f.js";/* empty css                      */import{f as h,i as b}from"./assets/vendor-b851b841.js";const t={btnStart:document.querySelector("[data-start]"),btnReset:document.querySelector("[data-reset]"),days:document.querySelector("[data-days]"),hours:document.querySelector("[data-hours]"),minutes:document.querySelector("[data-minutes]"),seconds:document.querySelector("[data-seconds]")},y={enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(e){const n=e[0];if(n<new Date){d();return}o&&c(),u=n,t.btnStart.disabled=!1}};let o=null,u=null;t.btnStart.disabled=!0;t.btnReset.disabled=!0;t.btnStart.addEventListener("click",S);t.btnReset.addEventListener("click",C);h("#datetime-picker",y);function S(){if(u<new Date){t.btnStart.disabled=!0,d();return}o&&clearInterval(o),o=setInterval(()=>{const{days:e,hours:n,minutes:s,seconds:a}=p(u-new Date);if(e<=0&&n<=0&&s<=0&&a<=0){c();return}t.days.textContent=`${r(e)}`,t.hours.textContent=`${r(n)}`,t.minutes.textContent=`${r(s)}`,t.seconds.textContent=`${r(a)}`},1e3),t.btnStart.disabled=!0,t.btnReset.disabled=!1}function C(){c()}function c(){clearInterval(o),t.days.textContent="00",t.hours.textContent="00",t.minutes.textContent="00",t.seconds.textContent="00",t.btnReset.disabled=!0}function p(e){const i=Math.floor(e/864e5),l=Math.floor(e%864e5/36e5),m=Math.floor(e%864e5%36e5/6e4),f=Math.floor(e%864e5%36e5%6e4/1e3);return{days:i,hours:l,minutes:m,seconds:f}}function r(e){return String(e).padStart(2,"0")}function d(){b.show({class:"timerToast",message:"Please choose a date in the future",backgroundColor:"red",theme:"dark",close:!0,closeOnEscape:!0,closeOnClick:!0,position:"topRight",timeout:3e3,rtl:!0})}
//# sourceMappingURL=commonHelpers8.js.map
