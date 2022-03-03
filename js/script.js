'use strict';

const url =
  'https://suggestions.dadata.ru/suggestions/api/4_1/rs/findById/party';
const token = '293f1fd3fbbded617022eec8f40c7bdbe3ae4bfc';

const inputInn = document.querySelector('#inn'),
  nameShort = document.querySelector('#name_short'),
  nameFull = document.querySelector('#name_full'),
  innKpp = document.querySelector('#inn_kpp'),
  adress = document.querySelector('#adress'),
  dataSearch = document.querySelector('.data-search');

function getSuggestions(inn) {
  inputInn.style.border = '1px solid black';
  const options = {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Token ' + token,
    },
    body: JSON.stringify({ query: inn }),
  };

  fetch(url, options)
    .then((response) => response.json())
    .then((response) => response.suggestions[0].data)
    .then((data) => {
      dataSearch.classList.add('visual');
      nameShort.value = data.name.short_with_opf;
      nameFull.value = data.name.full_with_opf;
      innKpp.value = `${data.inn} / ${data.kpp}`;
      adress.value = data.address.value;
    })
    .catch((err) => {
      dataSearch.classList.remove('visual');
      inputInn.style.border = '1px solid red';
    });
}

inputInn.addEventListener('input', (e) => getSuggestions(e.target.value));
