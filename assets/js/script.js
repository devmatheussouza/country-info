'use strict';

const form = document.querySelector('.form-content');
const input = document.querySelector('#country-name');
const btn = document.querySelector('.btn-submit');
const container = document.querySelector('.countries');
const country = document.querySelector('.country');

// Remove elements inside country div
const clearCountryContainer = function () {
  while (container.firstChild) container.removeChild(container.firstChild);
};

// Render country information
const renderCountry = function (data) {
  const html = `
        <div class="country">
          <div class="country-img">
            <img src="${data.flags.png}" alt="">
          </div>
          <div class="country-info">
            <p><span>Name:</span> ${data.name.common}</p>
            <p><span>Population:</span> ${(data.population / 1000000).toFixed(2)} million</p>
            <p><span>Capital:</span> ${data.capital}</p>
            <p><span>Area:</span> ${data.area} km<sup>2</sup></p>
            <p><span>Region:</span> ${data.region}</p>
            <p><span>Subregion:</span> ${data.subregion}</p>
          </div>
        </div>
  `;
  container.insertAdjacentHTML('beforeend', html);
};

// Render error if country not found
const renderError = function (message) {
  const html = `
    <span class="message-error">
      ${message}
    </span>
  `;
  clearCountryContainer();
  container.insertAdjacentHTML('beforeend', html);
};

// Get data from api
const getDataJson = async function (url, errorMessage = 'Something went wrong...') {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${errorMessage}... ${response.status}`);
  return await response.json();
};

// Render country data
const getCountryData = function (country) {
  getDataJson(`https://restcountries.com/v3.1/name/${country}`, 'Country not found')
    .then((data) => {
      clearCountryContainer();
      renderCountry(data[0]);
    })
    .catch((error) => renderError(error.message));
};

form.addEventListener('submit', function (e) {
  e.preventDefault();
  getCountryData(input.value);
  input.value = '';
});
