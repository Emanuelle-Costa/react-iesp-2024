import { useState } from 'react'
import MealList from './MealList'
import BoasVindas from './BoasVindas'
import useFetchMeal from './useFetchMeal'
import { useParams, useSearchParams } from 'react-router-dom'
import Modal from "./Modal.tsx";

function App() {
  const [nome, setNome] = useState('')
  const foods = useFetchMeal(nome)
  const params = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const isPortal = Boolean(searchParams.get('isPortal'))
  const showModal = searchParams.get('showModal')
  
  return (
    <div>
      {showModal ? <Modal isPortal={isPortal}/>: null}
      <input type="text" onChange={(evt)=>{
        setNome(evt.target.value) 
      }} value={nome}/>
      <BoasVindas nome={nome} />
      <MealList meals={foods}/>
      <p>
        Params: {params.id}
      </p>
      <button onClick={() => {
        setSearchParams({teste: '123'})
      }}>
        add query param
      </button>

      <button onClick={() => setNome('')}>
        Limpar
      </button>

      <button onClick={() => {
        setSearchParams((prev) => {
          prev.set('showModal', 'true')
          return prev
        })
      }}>Abrir Modal</button>
    </div>
  )
}

export default App
