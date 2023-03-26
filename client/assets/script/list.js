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
      <button class="delete-btn" data-id="${pokemon._id}">&times;</button>  
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
        const type = pokemon.apiTypes[0].name.toLowerCase();
        localStorage.setItem('pokemonType', type);
        console.log(type)
        window.location.href = `/pokemon/${pokemon._id}`;
      });

const deleteButtons = document.querySelectorAll('.delete-btn');

// Ajouter un écouteur d'événements pour chaque bouton de suppression
deleteButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Récupérer l'id du pokemon à supprimer
    const pokemonId = button.dataset.id;
    fetch(`/api/pokemon/${pokemonId}`, {
      method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.error(error);
    });
  });
});

    });
    document.querySelector('#add-pokemon').addEventListener('click', () => {
      window.location.href = '/add';
    });;

  })
  .catch(error => console.error(error));
