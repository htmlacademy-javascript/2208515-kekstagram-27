const FILE_TYPES = ['jpg', 'jpeg', 'png', 'svg'];

const fileChooser = document.querySelector('.img-upload__form input[type=file]');
const preview = document.querySelector('.img-upload__preview img');

const uploadPhoto = () => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    preview.src = URL.createObjectURL(file);
  }
};

export {uploadPhoto};
