import FirstExample from './FirstExample'
import TodoList from './TodoList'
import {Link, Routes, Route} from "react-router-dom";
import PokemonList from "./pokemon/PokemonList.tsx";
import PokemonDetail from "./pokemon/PokemonDetail.tsx";

function App() {
  return (
    <div>
      <nav style={{marginBottom: 30, display: 'flex', flexDirection: 'row', gap:10}}>
        <Link to={'/'}>First Example</Link>
        <Link to={'/todo-list'}>Todo List</Link>
        <Link to={'/pokemon'}>Pokemon</Link>
      </nav>
      <Routes>
        <Route path={'/:id'} element={<FirstExample/>}/>
        <Route path={'/todo-list'} element={<TodoList/>}/>
        <Route path={'/pokemon'} element={<PokemonList/>}/>
        <Route path={'/pokemon/:name'} element={<PokemonDetail/>}/>
      </Routes>
    </div>
  )
}


export default App