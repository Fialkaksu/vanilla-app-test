import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const options = {
  class: 'promisesToast',
  position: 'topRight',
  close: false,
  timeout: 5000,
};
const form = document.querySelector('.form');

form.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();
  const formElements = e.currentTarget.elements;
  const amount = convertToNumber('amount', formElements.amount.value);
  const step = convertToNumber('step', formElements.step.value);
  let delay = convertToNumber('delay', formElements.delay.value);

  for (let i = 1; i <= amount; i++) {
    createPromise(i, delay);
    delay += step;
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });

  promise
    .then(({ position, delay }) => {
      iziToast.success({
        message: `✅ Fulfilled promise ${position} in ${delay}ms`,
        ...options,
      });
    })
    .catch(({ position, delay }) => {
      iziToast.error({
        message: `❌ Rejected promise ${position} in ${delay}ms`,
        ...options,
      });
    });

  form.reset();
}

function convertToNumber(paramName, value) {
  if (Number(value) && value > 0) {
    return Number(value);
  }

  const correctedValue = paramName === 'amount' ? 1 : 0;

  iziToast.info({
    message: `The ${paramName} parameter value with a value of ${value} is incorrect and has been changed to ${correctedValue}.`,
    ...options,
  });

  return correctedValue;
}
