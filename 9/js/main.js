import {createPictures} from './picture.js';
import {getData} from './api.js';
import {showAlert} from './util.js';

getData((pictures) => {
  createPictures(pictures);
},
() => {
  showAlert('Не удалось загрузить данные с сервера. Перезагрузите страницу');
});
