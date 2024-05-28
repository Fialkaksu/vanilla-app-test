const selectors = {
  body: document.querySelector('body'),
  btnStart: document.querySelector('[data-start]'),
  btnStop: document.querySelector('[data-stop]'),
};

selectors.btnStart.addEventListener('click', onBtnStartClick);
selectors.btnStop.addEventListener('click', onBtnStopClick);

let timerId = null;
selectors.btnStop.disabled = true;

function onBtnStartClick() {
  timerId = setInterval(() => {
    selectors.body.style.backgroundColor = getRandomHexColor();
  }, 1000);

  selectors.btnStart.disabled = true;
  selectors.btnStop.disabled = false;
}

function onBtnStopClick() {
  clearInterval(timerId);
  selectors.btnStart.disabled = false;
  selectors.btnStop.disabled = true;
}
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
