import {isEscapeKey} from './util.js';
import {resetScale} from './scale.js';
import {resetEffects} from './effects.js';
import {sendData} from './api.js';
import {uploadPhoto} from './upload-photo.js';
import {showSuccessMessage, showErrorMessage} from './messages.js';

const HASHTAGS_COUNT = 5;
const MAX_LENGTH_COMMENT = 140;
const regexp = /^#[a-zа-яё0-9]{1,19}$/i;

const body = document.querySelector('body');
const form = body.querySelector('.img-upload__form');
const textForm = body.querySelector('.img-upload__text');
const imgUploadField = form.querySelector('#upload-file');
const imgEdit = form.querySelector('.img-upload__overlay');
const imgUploadCancel = form.querySelector('#upload-cancel');
const commentField = textForm.querySelector('.text__description');
const hashtagsField = textForm.querySelector('.text__hashtags');
const buttonSubmit = document.querySelector('.img-upload__submit');

const pristine = new Pristine (form, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'field-error',
  successClass: 'field-success',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'p',
  errorTextClass: 'form__error'
}, true);

const getHashtags = (value) => value.split(' ');

const validSimbolHashtags = (value) => {
  if (!value) {
    return true;
  }

  const hashtag = getHashtags(value);
  return hashtag.every((test) => regexp.test(test));
};

const validCountHashtag = (value) => {
  const hashtag = getHashtags(value);
  return hashtag.length <= HASHTAGS_COUNT;
};

const validRepeatHashtags = (value) => {
  const hashtag = getHashtags(value);
  const uniqHashtag = new Set(hashtag);
  return uniqHashtag.size === hashtag.length;
};

function validLengthComment (value) {
  if (value.length <= MAX_LENGTH_COMMENT) {
    return true;
  }
}

const addValidator = () => {
  pristine.addValidator(hashtagsField,validSimbolHashtags,'Хэштег должен содержать только цифры и буквы, начинаться с #, не более 20 символов');
  pristine.addValidator(hashtagsField, validRepeatHashtags, 'Хэштеги не должны повторяться');
  pristine.addValidator(hashtagsField, validCountHashtag, 'Превышено максимальное количество хэштегов');
  pristine.addValidator(commentField, validLengthComment, 'Превышено максимальное количество символов');
};

const closeForm = () => {
  form.reset();
  pristine.reset();
  imgEdit.classList.add('hidden');
  body.classList.remove('modal-open');

};

const escKeydownHandler = (evt) => {
  if (document.body.lastChild.classList && document.body.lastChild.classList.contains('error')) {
    return;
  }

  if (commentField === document.activeElement || hashtagsField === document.activeElement) {
    return;
  }

  if (isEscapeKey(evt)) {
    evt.preventDefault();
  }

  closeForm();
};

const showForm = () => {
  imgEdit.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', escKeydownHandler);
  resetScale();
  resetEffects();
  uploadPhoto();
};

const blockSubmitButton = () => {
  buttonSubmit.disabled = true;
  buttonSubmit.textContent = 'Публикую...';
};

const unblockSubmitButton = () => {
  buttonSubmit.disabled = false;
  buttonSubmit.textContent = 'Опубликовать';
};

const submitForm = (onSuccess) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (pristine.validate()) {
      blockSubmitButton();
      sendData(
        () => {
          onSuccess();
          unblockSubmitButton();
          showSuccessMessage();
          closeForm();
        },
        () => {
          unblockSubmitButton();
          showErrorMessage();
        },
        new FormData(evt.target),
      );
    }
  });
};

const setFormHandlers = () => {
  addValidator();
  imgUploadField.addEventListener('change', showForm);
  imgUploadCancel.addEventListener('click', closeForm);
};
export {closeForm, submitForm, setFormHandlers};
