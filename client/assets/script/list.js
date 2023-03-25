fetch('/api/pokemon')
  .then(response => response.json())
  .then(pokemonList => {
    console.log(pokemonList)
    const pokemonCards = document.querySelector('#pokemon-list');
    pokemonList.forEach(pokemon => {
      let myCard = document.createElement('div');
      myCard.classList.add('pokemon-body');

      myCard.innerHTML += `
        <div class="pokemon-card ${pokemon.apiTypes[0].name.toLowerCase()}-${pokemon?.apiTypes[1]?.name?.toLowerCase()}">
          <div class="pokemon-content">
            <div class="middle ${pokemon.name}">
              <div>
                <p class="pokemon-name">${pokemon.name}</p><br>
                <span class="badge ${pokemon.apiTypes[0].name.toLowerCase()}">${pokemon.apiTypes[0].name}</span><br>
                <span class="badge ${pokemon?.apiTypes[1]?.name?.toLowerCase()}">${pokemon?.apiTypes[1]?.name}</span>
              </div>
              <img src=${pokemon.image} alt=${pokemon.name} />
            </div>
            <div class="bottom">
              <div>
                <p>HP</p>
                <p>${pokemon.stats.HP}</p>
              </div>
              <div>
                <p>ATK</p>
                <p>${pokemon.stats.attack}</p>
              </div>
              <div>
                <p>DF</p>
                <p>${pokemon.stats.defense}</p>
              </div>
            </div>
            <div class="btn-parent">
              <button class="details-btn">Détails</button>
            </div>
          </div>
        </div>
      `
      pokemonCards.appendChild(myCard)
      
      myCard.querySelector('.details-btn').addEventListener('click', () => {
        window.location.href = `/pokemon/${pokemon._id}`;
      });
      
      
      

      // body.appendChild(card);
      // card.appendChild(content);
      // content.appendChild(middle);
      // content.appendChild(bottom);
      // middle.appendChild(title);
      // middle.appendChild(image);
      // bottom.appendChild(hp)
      // pokemonCards.appendChild(body)
    });
  })
  .catch(error => console.error(error));
