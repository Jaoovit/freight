{/*React Hookes*/}
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

{/*Css*/}
import './index.css'

{/*Pages*/}
import App from './App.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import RecoverPassword from './pages/RecoverPassword.jsx'
import RedefinePassword from './pages/RedifinePassword.jsx'
import Profile from './pages/Profile.jsx'
import Delivery from './pages/Delivery.jsx';
import Payments from './pages/Payments.jsx';

{/*Components*/}
import ProtectedRoute from './components/ProtectedRoute.jsx';
import ProtectedTransporterRoute from './components/ProtectedTransporterRoute.jsx';
import ProtectedManagerRoute from './components/ProtectedManagerRoute.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
        <Route path='/'element={<Home />}></Route>
        <Route path='/login'element={<ProtectedRoute><Login /></ProtectedRoute>}></Route>
        <Route path='/login/recoverPassword'element={<RecoverPassword />}></Route>
        <Route path='/login/redefinePassword' element={<RedefinePassword />}></Route>
        <Route path='/profile'element={<Profile />}></Route>
        <Route path='/delivery'element={<ProtectedTransporterRoute><Delivery /></ProtectedTransporterRoute>}></Route>
        <Route path='/payments'element={<ProtectedManagerRoute><Payments /></ProtectedManagerRoute>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
