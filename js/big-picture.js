import {isEscapeKey} from './util.js';

const bigPicture = document.querySelector('.big-picture');
const body = document.querySelector('body');
const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
const commentsList = bigPicture.querySelector('.social__comments');
const commentsCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');

const EscKeydownHandler = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    BigPictureCloseHandlers();
  }
};

function BigPictureCloseHandlers () {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  commentsCount.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');
  bigPictureCancel.removeEventListener('click', BigPictureCloseHandlers);
  document.removeEventListener('keydown', EscKeydownHandler);
}

function openBigPicture () {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  commentsCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  bigPictureCancel.addEventListener('click', BigPictureCloseHandlers);
  document.addEventListener('keydown', EscKeydownHandler);
}

//Показывает информацию о комментаторе
const showCommentatorInfo = (commentator) => {
  const comment = document.createElement('li');
  comment.classList.add('social__comment');
  comment.innerHTML = '<img class="social__picture" src="" alt="" width="35" height="35"><p class="social__text"></p>';
  comment.querySelector('.social__picture').src = commentator.avatar;
  comment.querySelector('.social__picture').alt = commentator.name;
  comment.querySelector('.social__text').textContent = commentator.message;
  return comment;
};

//Показывает комментарии к изображению
const showComments = (comments) => {
  commentsList.innerHTML = '';
  commentsCount.querySelectorAll('.comment-count').textContent = comments.length;
  const commentsFragment = document.createDocumentFragment();
  comments.forEach((comment) => {
    commentsFragment.appendChild(showCommentatorInfo(comment));
  });
  commentsList.appendChild(commentsFragment);
};

//Показывает полноэкранное изображение
const showBigPicture = (picture) => {
  bigPicture.querySelector('.big-picture__img img').src = picture.url;
  bigPicture.querySelector('.likes-count').textContent = picture.likes;
  bigPicture.querySelector('.comments-count').textContent = picture.comments.length;
  bigPicture.querySelector('.social__caption').textContent = picture.description;

  showComments(picture.comments);
  openBigPicture();
};

export {showBigPicture};
