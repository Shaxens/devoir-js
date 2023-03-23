fetch('/api/pokemon')
  .then(response => response.json())
  .then(pokemonList => {
    console.log(pokemonList)
    const pokemonCards = document.querySelector('#pokemon-list');
    pokemonList.forEach(pokemon => {
      
      const body = document.createElement('div');
      body.classList.add('pokemon-body');

      
      const card = document.createElement('div');
      card.classList.add('pokemon-card');

      const content = document.createElement('div');
      content.classList.add('pokemon-content')

      const middle = document.createElement('div');
      middle.classList.add('middle');

      const title = document.createElement('p');
      title.classList.add('pokemon-name');
      title.innerText = pokemon.name;
      
      const image = document.createElement('img');
      image.classList.add('pokemon-image');
      image.setAttribute('src', pokemon.image);
      image.setAttribute('alt', pokemon.name);

      const bottom = document.createElement('div');
      bottom.classList.add('bottom');


      const hp = document.createElement('p');
      hp.classList.add('pokemon-stats');
      hp.innerHTML = `<strong>HP:</strong> ${pokemon.stats.HP}`;

      const detail = document.createElement('button');
      detail.classList.add('add-to-cart-button');
      detail.innerHTML = `Détails`;

      body.appendChild(card);
      card.appendChild(content);
      content.appendChild(middle);
      content.appendChild(bottom);
      middle.appendChild(title);
      middle.appendChild(image);
      bottom.appendChild(hp)
      pokemonCards.appendChild(body)
    });
  })
  .catch(error => console.error(error));
