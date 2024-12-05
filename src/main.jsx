{/*React Hookes*/}
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

{/*Css*/}
import './index.css'

{/*Pages*/}
import App from './App.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import RecoverPassword from './pages/RecoverPassword.jsx';
import RedefinePassword from './pages/RedifinePassword.jsx';
import Profile from './pages/Profile.jsx';
import Delivery from './pages/Delivery.jsx';
import Payments from './pages/Payments.jsx';
import DeliveryToConfirm from './pages/DeliveryToConfirm.jsx';
import Transporters from './pages/Transportes.jsx';
import Transporter from './pages/Transporter.jsx';
import Search from './pages/Search.jsx';
import AddTransporter from './pages/AddTransporter.jsx';
import Car from './pages/Car.jsx';
import AddDelivery from './pages/AddDelivery.jsx';
import AddCar from './pages/AddCar.jsx';
import AddManager from './pages/AddManager.jsx';

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
        <Route path='/deliveryToConfirm'element={<ProtectedManagerRoute><DeliveryToConfirm /></ProtectedManagerRoute>}></Route>
        <Route path='/transporters'element={<ProtectedManagerRoute><Transporters /></ProtectedManagerRoute>}></Route>
        <Route path='/transporter/:id'element={<Transporter />}></Route>
        <Route path='search' element={<Search />}></Route>
        <Route path='add-transporter' element={<AddTransporter />}></Route>
        <Route path='/car/:id'element={<Car />}></Route>
        <Route path='/car/:id/add-delivery' element={<AddDelivery />} />
        <Route path='/transporter/:id/add-car' element={<AddCar />}></Route>
        <Route path='/add-manager' element={<AddManager />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
