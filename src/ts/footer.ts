import axios from 'axios';

const handleSubmitSubscribing = async (e: Event) => {
  e.preventDefault();
  const form = e.target as HTMLFormElement;
  const data = new FormData(form);

  await subscribe(data.get('userEmail') as string);

  form.reset();
};

const subscribe = async (email: string) => {
  await axios.post('https://food-boutique.b.goit.study/api/subscription', {
    email,
  });
};

const subscribingForm = document.querySelector(
  '.footer-form'
) as HTMLFormElement;

subscribingForm.addEventListener('submit', handleSubmitSubscribing);
