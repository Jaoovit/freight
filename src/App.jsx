{/*Hook to navigate in the pages*/}
import { Outlet } from 'react-router-dom'

{/*Css*/}
import './App.css'

{/*Components*/}
import NavBar from './components/NavBar'

function App() {

  return (
    <>
      <NavBar />
      <Outlet />
    </>
  )
}

export default App
