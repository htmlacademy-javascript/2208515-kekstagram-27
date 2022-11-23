import {isEscapeKey} from './util.js';

const MAX_COMMENTS_TO_SHOW = 5;
const bigPicture = document.querySelector('.big-picture');
const body = document.querySelector('body');
const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
const commentsList = bigPicture.querySelector('.social__comments');
const commentsCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
let count = 0;

const createComment = (comment) => {
  const newComment = document.createElement('li');
  newComment.classList.add('social__comment');
  const commentImage = document.createElement('img');
  commentImage.classList.add('social__picture');
  commentImage.src = comment.avatar;
  commentImage.alt = comment.name;
  commentImage.width = 35;
  commentImage.height = 35;
  newComment.appendChild(commentImage);

  const commentText = document.createElement('p');
  commentText.classList.add('social__text');
  commentText.textContent = comment.message;
  newComment.appendChild(commentText);
  return newComment;
};

const showBigPicture = (picture) => {

  const escKeydownHandler = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      setBigPictureHandlers();
    }
  };

  const buttonClickHandler = () => {
    setBigPictureHandlers();
  };

  function setBigPictureHandlers() {
    bigPicture.classList.add('hidden');
    body.classList.remove('modal-open');
    document.removeEventListener('keydown', escKeydownHandler);
    bigPictureCancel.removeEventListener('click', buttonClickHandler);
    commentsLoader.removeEventListener('click', commentsLoaderClickHandler);
    count = 0;
  }

  function commentsLoaderClickHandler() {
    // изменяем значение count прибавляя 5, следовательно slice станет (5, 10), отрисуется еще 5 штук
    count += MAX_COMMENTS_TO_SHOW;
    getCommentsSlice();
  }

  function getCommentsSlice() {
    commentsList.innerHTML = '';
    const commentsFragment = document.createDocumentFragment();
    const commentsToShow = picture.comments.slice(0, count + MAX_COMMENTS_TO_SHOW);
    commentsToShow.forEach((comment) => {
      commentsFragment.appendChild(createComment(comment));
    });
    commentsList.appendChild(commentsFragment);
    commentsLoader.classList.toggle('hidden', picture.comments.length === commentsToShow.length);
    commentsCount.innerHTML = `${commentsToShow.length} из <span class="comments-count">${picture.comments.length}</span> комментариев`;
  }

  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  bigPicture.querySelector('.big-picture__img img').src = picture.url;
  bigPicture.querySelector('.likes-count').textContent = picture.likes;
  bigPicture.querySelector('.comments-count').textContent = picture.comments.length;
  bigPicture.querySelector('.social__caption').textContent = picture.description;

  getCommentsSlice();
  commentsLoader.addEventListener('click', commentsLoaderClickHandler);
  bigPictureCancel.addEventListener('click', buttonClickHandler);
  document.addEventListener('keydown', escKeydownHandler);
};

export {showBigPicture};
