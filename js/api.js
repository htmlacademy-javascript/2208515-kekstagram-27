import {closeForm} from './upload-form.js';
import {showSuccessMessage, showErrorMessage} from './messages.js';

const getData = (onSuссess, onFail) => {
  fetch('https://27.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then((pictures) => {
      onSuссess(pictures);
    })
    .catch(() => {
      onFail('Что-то пошло не так, попробуйте позже...');
    });
};

const sendData = (data) => {
  fetch(
    'https://27.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body: data,
    },
  ) .then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(`${response.status} ${response.statusText}`);
  })
    .then(() => {
      showSuccessMessage();
      closeForm();
    })
    .catch(() => {
      showErrorMessage();
    });
};

export {getData, sendData};

