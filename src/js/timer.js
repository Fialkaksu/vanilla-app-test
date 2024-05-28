import flatpickr from 'flatpickr';
import iziToast from 'izitoast';
import 'flatpickr/dist/flatpickr.min.css';
import 'izitoast/dist/css/iziToast.min.css';

const selectors = {
  btnStart: document.querySelector('[data-start]'),
  btnReset: document.querySelector('[data-reset]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];

    if (selectedDate < new Date()) {
      showAlert();
      return;
    }

    if (timerId) {
      cleanCounter();
    }

    date = selectedDate;
    selectors.btnStart.disabled = false;
  },
};

let timerId = null;
let date = null;

selectors.btnStart.disabled = true;
selectors.btnReset.disabled = true;

selectors.btnStart.addEventListener('click', onBtnStartClick);
selectors.btnReset.addEventListener('click', onBtnResetClick);

flatpickr('#datetime-picker', options);

function onBtnStartClick() {
  if (date < new Date()) {
    selectors.btnStart.disabled = true;
    showAlert();
    return;
  }

  if (timerId) {
    clearInterval(timerId);
  }

  timerId = setInterval(() => {
    const { days, hours, minutes, seconds } = convertMs(date - new Date());

    if (days <= 0 && hours <= 0 && minutes <= 0 && seconds <= 0) {
      cleanCounter();
      return;
    }

    selectors.days.textContent = `${addLeadingZero(days)}`;
    selectors.hours.textContent = `${addLeadingZero(hours)}`;
    selectors.minutes.textContent = `${addLeadingZero(minutes)}`;
    selectors.seconds.textContent = `${addLeadingZero(seconds)}`;
  }, 1000);

  selectors.btnStart.disabled = true;
  selectors.btnReset.disabled = false;
}

function onBtnResetClick() {
  cleanCounter();
}

function cleanCounter() {
  clearInterval(timerId);
  selectors.days.textContent = '00';
  selectors.hours.textContent = '00';
  selectors.minutes.textContent = '00';
  selectors.seconds.textContent = '00';
  selectors.btnReset.disabled = true;
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function showAlert() {
  iziToast.show({
    class: 'timerToast',
    message: 'Please choose a date in the future',
    backgroundColor: 'red',
    theme: 'dark',
    close: true,
    closeOnEscape: true,
    closeOnClick: true,
    position: 'topRight',
    timeout: 3000,
    rtl: true,
  });
}
