import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

type Pokemon = {
  name: string
  url: string
}

type PokemonListResponse = {
  count: number
  next: string
  previous: string
  results: Pokemon[]
}


function PokemonList() {
  const [list, setList] = useState<PokemonListResponse>()
  const [limit, setLimit] = useState(10)
  const instace = new Date().getTime()
  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`)
      .then(resp => resp.json())
      .then((response) => {
        setList(response)
      })
    return () => {
      console.log('cleanup')
    }
  }, [limit]);
  useEffect(() => {
    function onScroll(evt: Event) {
      console.log(`scroll ${instace}`, evt)
    }

    document.addEventListener('scroll', onScroll)
    return () => {
      document.removeEventListener('scroll', onScroll)
    }
  }, [instace]);


  return <div>
    <h1>Pokemon List</h1>
    <button onClick={() => {
      setLimit(30)
    }}>
      Mudar para 30
    </button>
    <div>
      {list?.results.map((pokemon) => {
        return <div key={pokemon.name}>
          <Link to={`/pokemon/${pokemon.name}`}>{pokemon.name}</Link>
        </div>
      })}
    </div>
  </div>
}

// React.createElement('PokemonList', {name: 'Pikachu'},
//   React.createElement('div', {},
//     React.createElement('h1', {}, 'Pokemon List'))
// )
export default PokemonList