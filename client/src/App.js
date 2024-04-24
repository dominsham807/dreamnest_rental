import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import CreateListing from './pages/CreateListing'
import Layout from './components/Layout'
import PrivateRoute from './routes/PrivateRoute'
import ListingDetails from './pages/ListingDetails'
import TripList from './pages/TripList'
// import ScrollToTop from './components/ScrollToTop'

import './App.css'


function App() {
  return (
    <div>
      <BrowserRouter> 
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route path='' element={<Home />} />
            <Route path='register' element={<Register />} />
            <Route path='login' element={<Login />} />
            <Route path='/properties/:listingId' element={<ListingDetails />} />
            <Route path='/' element={<PrivateRoute />}>
              <Route path='create-listing' element={<CreateListing />} />
              <Route path='/:userId/trips' element={<TripList />} />
            </Route> 
          </Route> 
        </Routes>
        <Toaster position='bottom-center' />
      </BrowserRouter>
    </div>
  );
}

export default App;
