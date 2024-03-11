import React, { useState, useEffect } from 'react';

function TodoListInsert() {
  const [pokemonData, setPokemonData] = useState(null);

  useEffect(() => {
  
    const url = window.location.pathname;
    const pokemonName = url.split('/').pop();

    async function fetchPokemonData() {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setPokemonData(data);
      } catch (error) {
        console.error('Error fetching Pokemon data:', error);
      }
    }

    fetchPokemonData();
  }, []);

  return (
    <div>
      {pokemonData ? (
        <div>
          <h2 style ={{ textTransform: "capitalize"}}>{pokemonData.name}</h2>
          <img src={pokemonData.sprites.other.home.front_default} alt={pokemonData.name} />
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default PokemonDetail;
