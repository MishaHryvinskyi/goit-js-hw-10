import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

import { fetchCountries } from './js/fetchCountries';
const DEBOUNCE_DELAY = 300;

const refs = {
    input: document.getElementById('search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
};
console.log(refs.input);
console.log(refs.countryList);
console.log(refs.countryInfo);

refs.input.addEventListener('input', debounce(evt => {
    const trimmedValue = refs.input.value.trim();
    clearingMarkup();

    if(trimmedValue !== '') {
        fetchCountries(trimmedValue).then(foundData => {
            if(foundData.length > 10) {
                Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
            } else if (foundData.length === 0){
                Notiflix.Notify.failure('Oops, there is no country with that name');
            } else if (foundData.length >= 2 && foundData.length <= 10){
                markupCountryList(foundData);
            } else if (foundData.length === 1) {
                markupOneCountry(foundData);
            }
        });
    }
}, DEBOUNCE_DELAY)
);




function clearingMarkup() {
    refs.countryList.innerHTML = '';
    refs.countryInfo.innerHTML = '';
}

function markupCountryList (countries) {
    const markup = countries.map(country => {
        return `<li>
        <img src="${country.flags.svg}" alt="Flag of ${country.name.official}" width="30" hight="20">
        <p>${country.name.official}</p>
        </li>`;
    })
    .join('');
    refs.countryList.innerHTML = markup;
}

function markupOneCountry(countries) {
    const markup = countries.map(country => {
        return `<li>
        <img src="${country.flags.svg}" alt="Flag of ${country.name.official}" width="30" hight="20">
        <p>${country.name.official}</p>
        <div class="wrap">
        <p><b>Capital</b>: ${country.capital}</p>
        <p><b>Population</b>: ${country.population}</p>
        <p><b>Languages</b>: ${Object.values(country.languages)}</p>
        </div>
        </li>`;
    })
    .join('');
    refs.countryList.innerHTML = markup;
}