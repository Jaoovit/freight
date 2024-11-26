{/*Hook to navigate in the pages*/}
import { Outlet } from 'react-router-dom'

{/*Css*/}
import './App.css'

{/*Components*/}
import NavBar from './components/NavBar'
import Footer from './components/Footer'

function App() {

  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  )
}

export default App
