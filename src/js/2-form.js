document.addEventListener('DOMContentLoaded', () => {
  const KEY_STORAGE = 'feedback-form-state';
  const form = document.querySelector('.feedback-form');
  const formData = {
    email: '',
    message: '',
  };

  form.addEventListener('input', () => {
    const formData = new FormData(form);
    const data = {
      email: (formData.get('email') || '').trim(),
      message: (formData.get('message') || '').trim(),
    };
    localStorage.setItem(KEY_STORAGE, JSON.stringify(data));
  });

  const savedData = JSON.parse(localStorage.getItem(KEY_STORAGE)) || {};
  const params = new URLSearchParams(location.search);
  form.elements.email.value = params.get('email') || savedData.email || '';
  form.elements.message.value =
    params.get('message') || savedData.message || '';

  form.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(form);
    const email = formData.get('email');
    const message = formData.get('message');
    if (!email || !message) {
      alert('Fill please all fields');
      return;
    }
    console.log({ email, message });
    localStorage.removeItem(KEY_STORAGE);
    form.reset();
  });
});
