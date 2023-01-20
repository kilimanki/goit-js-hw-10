import Notiflix from 'notiflix';
import { itemsUl } from './index';
// const itemsUl = document.querySelector('.country-list');
export function fetchCountries(name) {
  const URL_LINK = 'https://restcountries.com/v3.1/name/';
  return fetch(`${URL_LINK}${name}`).then(response => {
    if (!response.ok) {
      Notiflix.Notify.info('Oops, there is no country with that name');
      itemsUl.innerHTML = null;
      throw new Error(response.statusText);
    }
    return response.json();
  });
}
