    fetch('/api/types')
    .then(response => response.json())
    .then(types => {
      const firstTypeSelect = document.querySelector('#new-firstType');
      const secondTypeSelect = document.querySelector('#new-secondType');

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

    });

    function createPokemon() {
      const name = document.querySelector('#new-name').value;
      const firstType = document.querySelector('#new-firstType').value;
      const secondType = document.querySelector('#new-secondType').value;
      const image = document.querySelector('#new-image').value;
      const sprite = document.querySelector('#new-sprite').value;
      const hp = document.querySelector('#new-HP').value;
      const attack = document.querySelector('#new-attack').value;
      const defense = document.querySelector('#new-defense').value;
      const specialAttack = document.querySelector('#new-special_attack').value;
      const specialDefense = document.querySelector('#new-special_defense').value;
      const speed = document.querySelector('#new-speed').value;
    
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
    
      fetch(`/api/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(response => response.json())
      .then(pokemon => {
        console.log(pokemon);
        alert('Le Pokémon a été créé!');
      })
      .catch(error => console.error(error));

    }
    document.addEventListener('DOMContentLoaded', function() {
      const saveBtn = document.querySelector('#save-btn');
      console.log(saveBtn);
      saveBtn.addEventListener('click', createPokemon);
    });
    

