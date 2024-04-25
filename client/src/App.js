import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import CreateListing from './pages/CreateListing'
import Layout from './layouts/Layout'
import PrivateRoute from './routes/PrivateRoute'
import ListingDetails from './pages/ListingDetails'
import TripList from './pages/TripList' 
import AdminRoute from './routes/AdminRoute'
import Profile from './pages/Profile'
import AdminDashboard from './pages/AdminDashboard'
import { useContext } from 'react'
import { DarkModeContext } from './context/darkModeContext.js'
import AdminLayout from './layouts/AdminLayout'

import './App.css'

function App() {
  const { darkMode } = useContext(DarkModeContext)
  console.log(darkMode)

  return ( 
    <div className={darkMode ? "dark" : ""}>
      <BrowserRouter> 
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route path='' element={<Home />} />
            <Route path='register' element={<Register />} />
            <Route path='login' element={<Login />} /> 
            <Route path='/properties/:listingId' element={<ListingDetails />} />
            <Route path='/' element={<PrivateRoute />}>      
              <Route path='/profile' element={<Profile />} />       
              <Route path='/:userId/trips' element={<TripList />} />
              <Route path='/' element={<AdminRoute />}> 
                <Route path='create-listing' element={<CreateListing />} /> 
              </Route>   
            </Route> 
          </Route> 
          <Route path='/admin' element={<AdminLayout />}>
            <Route path='dashboard' element={<AdminDashboard />} />
          </Route>
        </Routes>
        <Toaster position='bottom-center' />
      </BrowserRouter>
    </div>
  );
}

export default App;
