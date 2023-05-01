const uploadFile = document.querySelector('#upload-file');
const createEditingForm = document.querySelector('.img-upload__overlay');
const closeUploadFileButton = createEditingForm.querySelector('#upload-cancel');

function openEditingForm() {
  createEditingForm.classList.remove('hidden');
  document.body.classList.add('modal-open');
}

uploadFile.addEventListener('change', () => {
  openEditingForm();
});


function closeEditingForm() {
  createEditingForm.classList.add('hidden');
  document.body.classList.remove('modal-open');
  createEditingForm.reset();
  uploadFile.reset();
}

closeUploadFileButton.addEventListener('click', () => {
  closeEditingForm();
});

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape' && !createEditingForm.classList.contains('hidden')) {
    closeEditingForm();
  }
});
