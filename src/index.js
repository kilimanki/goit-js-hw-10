import './css/styles.css';
import { fetchCountries } from './fetchCountries.js';
import Notiflix from 'notiflix';
import Lodash from 'lodash.debounce';
const DEBOUNCE_DELAY = 1000;
const inputField = document.querySelector('#search-box');
const itemsUl = document.querySelector('.country-list');
inputField.addEventListener('input', Lodash(country, DEBOUNCE_DELAY));

function country(e) {
  e.preventDefault();
  if (e.target.value.trim() === '') {
    itemsUl.innerHTML = null;
    console.log('123');
    return;
  }
  fetchCountries(e.target.value)
    .then(data => {
      const updateMarkUp = data
        .map(item => {
          return `<li>
               <div class="country">
                    <img src="${
                      item.flags.png
                    }" alt="" style = "width:40px; height:40px">
                    <p>${item.name.official}</p>
                    </div>
                     <p>Capital:${item.capital}</p>
                      <p>Languages:${Object.values(item.languages)}</p>
                       <p>Population:${item.population}</p>
                </li>`;
        })
        .join('');
      const markup = data
        .map(item => {
          return `<li>
                    <img src="${item.flags.png}" alt="">
                    <p>${item.name.official}</p>
                </li>`;
        })
        .join('');
      console.log(data);
      if (data.length >= 10) {
        Notiflix.Notify.failure(
          'Too many matches found. Please enter a more specific name.'
        );
      } else {
        itemsUl.innerHTML = markup;
      }

      if (data.length === 1) {
        Notiflix.Notify.success('You have found your country !');
        itemsUl.innerHTML = updateMarkUp;
      }
    })
    .catch(error => console.log('error'));
}
//asd
