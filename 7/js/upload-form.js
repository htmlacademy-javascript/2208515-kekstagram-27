import {isEscapeKey} from './util.js';
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

const pristine = new Pristine (form, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'field-error',
  successClass: 'field-success',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'p',
  errorTextClass: 'form__error'
}, true);

// Валидация пустой формы
function validEmplyForm (value) {
  if (value.length === 0) {
    return true;
  }
}
pristine.addValidator(hashtagsField, validEmplyForm);
pristine.addValidator(commentField, validEmplyForm);

// Валидация символов в хэштеге
const getHashtags = (elements) => elements.split(' ').map((element) => element.trim());

function validSimbolHashtags (value) {
  const hashtags = getHashtags(value);
  const isEveryHashtagsValid = hashtags.every((hashtag) => regexp.test(hashtag));
  return isEveryHashtagsValid;
}
pristine.addValidator(hashtagsField, validSimbolHashtags, 'Недопустимые символы');

// Валидация количества хэштегов
function validCountHashtag (value) {
  const hashtags = getHashtags(value);
  if (hashtags.length <= HASHTAGS_COUNT) {
    return true;
  }
}
pristine.addValidator(hashtagsField, validCountHashtag, 'Превышено максимальное количество хэштегов');

// Валидация "один и тот же хэштег нельзя писать дважды"
function validRepeatHashtags (value) {
  const hashtags = getHashtags(value);
  const duplicates = hashtags.filter((number, index, numbers) => numbers.indexOf(number) !== index);
  return duplicates;
}
pristine.addValidator(hashtagsField, validRepeatHashtags, 'Один и тот же хэштег нельзя писать дважды');

// Для валидации комментариев
function validLengthComment (value) {
  if (value.length <= MAX_LENGTH_COMMENT) {
    return true;
  }
}
pristine.addValidator(commentField, validLengthComment, 'Превышено максимальное количество символов');

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isFormValid = pristine.validate();
  if (isFormValid) {
    form.submit();
  }
});

const escKeydownHandler = (evt) => {
  if (commentField === document.activeElement || hashtagsField === document.activeElement) {
    return evt;
  }
  else if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeForm();
  }
};

function closeForm () {
  imgEdit.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('click', closeForm);
  document.removeEventListener('keydown', escKeydownHandler);
}

function showForm () {
  imgUploadField.addEventListener('change', () => {
    form.reset();
    pristine.reset();
    imgEdit.classList.remove('hidden');
    body.classList.add('modal-open');
    imgUploadCancel.addEventListener('click', closeForm);
    document.addEventListener('keydown', escKeydownHandler);
  });
}

export{showForm};
