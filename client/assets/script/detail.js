const pokemonId = window.location.pathname.split('/').pop();

fetch(`/api/pokemon/${pokemonId}`)
  .then(response => response.json())
  .then(pokemon => {
    console.log(pokemon)
    fetch('/api/types')
    .then(response => response.json())
    .then(types => {
      const firstTypeSelect = document.querySelector('#firstType');
      const secondTypeSelect = document.querySelector('#secondType');

      types.forEach(type => {
        const option = document.createElement('option');
        option.value = type.name;
        option.textContent = type.name;
        firstTypeSelect.appendChild(option);

        const option2 = document.createElement('option');
        option2.value = type.name;
        option2.textContent = type.name;
        secondTypeSelect.appendChild(option2);
      });

      // Ajouter la possibilité de n'avoir qu'un seul type
      const emptyOption = document.createElement('option');
      emptyOption.value = '';
      emptyOption.textContent = 'No types';
      secondTypeSelect.appendChild(emptyOption);

      // Définir les options sélectionnées en fonction des types du Pokémon
      firstTypeSelect.value = pokemon.apiTypes[0].name;
      secondTypeSelect.value = pokemon.apiTypes[1] ? pokemon.apiTypes[1].name : '';
    });

    const pokemonDetails = `
      <div class="my-item">
        <label for="name">Nom:</label>
        <input type="text" id="name" name="name" value="${pokemon.name}">
      </div>
      <div class="my-item">
        <label for="firstType">Type 1 :</label>
        <select id="firstType" name="firstType">
          <option value="${pokemon.apiTypes[0].name}" selected disabled>${pokemon.apiTypes[0].name}</option>
        </select>
      </div>
      <div class="my-item">
        <label for="secondType">Type 2 :</label>
        <select id="secondType" name="secondType">
        <option value="${pokemon.apiTypes[1] ? pokemon.apiTypes[1].name : ''}" selected disabled>${pokemon.apiTypes[1] ? pokemon.apiTypes[1].name : ''}</option>
      </select>
      </div>
      <div class="my-item">
        <label for="image">Image:</label>
        <input type="text" id="image" name="image" value="${pokemon.image}">
      </div>
      <div class="my-item">
        <label for="sprite">Sprite image:</label>
        <input type="text" id="sprite" name="sprite" value="${pokemon.sprite}">
      </div>
      <div class="my-item">
        <label for="HP">PV:</label>
        <input type="number" id="HP" name="HP" value="${pokemon.stats.HP}" min="1" max="255">
      </div>
      <div class="my-item">
        <label for="attack">Attaque:</label>
        <input type="number" id="attack" name="attack" value="${pokemon.stats.attack}" min="1" max="255">
      </div>
      <div class="my-item">
        <label for="defense">Défense:</label>
        <input type="number" id="defense" name="defense" value="${pokemon.stats.defense}" min="1" max="255">
      </div>
      <div class="my-item">
        <label for="special_attack">Attaque Spéciale:</label>
        <input type="number" id="special_attack" name="special_attack" value="${pokemon.stats.special_attack}" min="1" max="255">
      </div>
      <div class="my-item">
        <label for="special_defense">Défense Spéciale:</label>
        <input type="number" id="special_defense" name="special_defense" value="${pokemon.stats.special_defense}" min="1" max="255">
      </div>
      <div class="my-item">
        <label for="speed">Vitesse:</label>
        <input type="number" id="speed" name="speed" value="${pokemon.stats.speed}" min="1" max="255">
      </div>
      <button id="save-btn">Enregistrer les modifications</button>
    `;
    document.querySelector('#pokemon-details').innerHTML += pokemonDetails;
    document.querySelector('#sprite-img').src = pokemon.sprite;

    function updatePokemon() {
      const pokemonId = window.location.pathname.split('/').pop();
      const name = document.querySelector('#name').value;
      const firstType = document.querySelector('#firstType').value;
      const secondType = document.querySelector('#secondType').value;
      const image = document.querySelector('#image').value;
      const sprite = document.querySelector('#sprite').value;
      const hp = document.querySelector('#HP').value;
      const attack = document.querySelector('#attack').value;
      const defense = document.querySelector('#defense').value;
      const specialAttack = document.querySelector('#special_attack').value;
      const specialDefense = document.querySelector('#special_defense').value;
      const speed = document.querySelector('#speed').value;
    
      const data = {
        name: name,
        apiTypes: [
          {
            name: firstType,
          },
          {
            name: secondType,
          }
        ],
        image: image,
        sprite: sprite,
        stats: {
          HP: hp,
          attack: attack,
          defense: defense,
          special_attack: specialAttack,
          special_defense: specialDefense,
          speed: speed
        }
      };
    
      fetch(`/api/pokemon/${pokemonId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(response => response.json())
      .then(pokemon => {
        console.log(pokemon);
        alert('Le Pokémon a été mis à jour!');
      })
      .catch(error => console.error(error));
    }
    const saveBtn = document.querySelector('#save-btn');
    saveBtn.addEventListener('click', updatePokemon);
        
  })
