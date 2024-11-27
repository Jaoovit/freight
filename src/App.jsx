{/*Hook to navigate in the pages*/}
import { Outlet } from 'react-router-dom'

{/*Css*/}
import './App.css'

{/*Components*/}
import NavBar from './components/NavBar'
import Footer from './components/Footer'

{/*Context*/}
import { AuthProvider } from './context/AuthContext'; 

function App() {

  return (
    <AuthProvider>
      <>
        <NavBar />
        <Outlet />
        <Footer />
      </>
    </AuthProvider>
  )
}

export default App
