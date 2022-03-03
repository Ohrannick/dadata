'use strict';

const url =
  'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/party';
const token = '293f1fd3fbbded617022eec8f40c7bdbe3ae4bfc';

const inputInn = document.querySelector('#inn'),
  nameShort = document.querySelector('#name_short'),
  nameFull = document.querySelector('#name_full'),
  innKpp = document.querySelector('#inn_kpp'),
  address = document.querySelector('#address'),
  dataSearch = document.querySelector('.result-search'),
  inputSearch = document.querySelector('.suggestions-suggestions');

function getSuggestions(inn) {
  // inputInn.style.border = '1px solid black';
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
    .then((response) => response.suggestions)
    .then((data) => {
      inputSearch.innerHTML = '';
      if (data.length > 0) {
        inputSearch.style.display = 'block';
        data.map((item) => {
          console.log(item.data.inn);
          inputSearch.innerHTML += `<li>${item.data.inn}</li>`;
        });
      } else {
        inputSearch.innerHTML += `<span>данные отсутствуют</span>`;
      }

      dataSearch.classList.add('result-visual');
      nameShort.value = data.name.short_with_opf;
      nameFull.value = data.name.full_with_opf;
      innKpp.value = `${data.inn} / ${data.kpp}`;
      address.value = data.address.value;
    })
    .catch((err) => {
      dataSearch.classList.remove('result-visual');
      // inputInn.style.border = '1px solid red';
    });
}

inputInn.addEventListener('input', (e) => getSuggestions(e.target.value));
