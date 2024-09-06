import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainMenu from './views/MainMenu'
import Game from './views/Game'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainMenu />} />
        <Route path='/in-game' element={<Game />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
