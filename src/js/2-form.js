const KEY_STORAGE = 'feedback-form-state';
const formData = {
  email: '',
  message: '',
};

const form = document.querySelector('.feedback-form');

form.addEventListener('input', event => {
  const formData = new FormData(form);
  const data = {
    email: (formData.get('email') || '').trim(),
    message: (formData.get('message') || '').trim(),
  };

  localStorage.setItem(KEY_STORAGE, JSON.stringify(data));
});

document.addEventListener('DOMContentLoaded', () => {
  const savedData = localStorage.getItem(KEY_STORAGE);

  const data = JSON.parse(savedData) || {};
  form.elements.email.value = data.email || '';
  form.elements.message.value = data.message || '';
});

form.addEventListener('submit', event => {
  event.preventDefault();
  const formData = new FormData(form);
  const email = formData.get('email');
  const message = formData.get('message');
  if (!email || !message) {
    alert('Fill please all fields');
    return;
  }

  const data = {
    email,
    message,
  };
  console.log(data);
  localStorage.removeItem(KEY_STORAGE);
  form.reset();
});
