import {createPictures} from './picture.js';
import {getData} from './api.js';
import {showAlert, debounce} from './util.js';
import {setFilterClickHandler} from './filter.js';
import {submitForm, closeForm, setFormHandlers} from './upload-form.js';

const TIME_OUT_DELAY = 500;

getData((pictures) => {
  createPictures(pictures);
  setFilterClickHandler(pictures, debounce(createPictures, TIME_OUT_DELAY));
},
() => {
  showAlert('Не удалось загрузить данные с сервера. Перезагрузите страницу');
});

submitForm(closeForm);

setFormHandlers();
