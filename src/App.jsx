{/*Hook to navigate in the pages*/}
import { Outlet } from 'react-router-dom';

{/*Css*/}
import './App.css';

{/*Components*/}
import NavBar from './components/NavBar';
import Footer from './components/Footer';

{/*Context*/}
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen">
        {/* NavBar */}
        <NavBar />

        {/* Main Content */}
        <main className="flex-grow">
          <Outlet />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;

