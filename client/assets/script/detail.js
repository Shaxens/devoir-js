const pokemonId = window.location.pathname.split('/').pop();
fetch(`/api/pokemon/${pokemonId}`)
  .then(response => response.json())
  .then(pokemon => {
    const pokemonDetails = `
      <p>Nom: ${pokemon.name}</p>
      <p>Type: ${pokemon.apiTypes[0].name} - ${pokemon?.apiTypes[1]?.name}</p>
      <p>Niveau: ${pokemon.level}</p>
    `;
    document.getElementById('pokemon-details').innerHTML = pokemonDetails;
  })
  .catch(error => console.error(error));