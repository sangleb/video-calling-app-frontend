import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home'
import Room from './Pages/Room'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/room/:id' element={<Room />}/>
        <Route />
      </Routes>
    </>
  )
}

export default App
