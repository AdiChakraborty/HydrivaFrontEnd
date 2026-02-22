import React, { useEffect, useState } from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import Products from './pages/Products'
import About from './pages/About'
import Contact from './pages/contact'
import Cart from './pages/Cart'
import Navbar from './components/Navbar'
import axios from 'axios'
import Footer from './components/Footer'
import SingleProduct from './pages/SingleProduct'
import CategoryProduct from './pages/CategoryProduct'
import SingIn from './pages/SingIn'
import RegisterForm from './pages/RegisterForm'
// import RegisterForm from './pages/RegisterForm'
import { RequireAuth } from './components/RequireAuth'
import { RequireGuest } from './components/RequireGuest'
import { supabase } from './lib/supabase'
import OrderSummary from './pages/OrderSummary'



const App = () => {

  const [location,setLocation] = useState()
  const [openDropdown,setOpenDropdown] = useState (false)

  const  getLocation = async ()=>{
    navigator.geolocation.getCurrentPosition(async pos => {
      const{latitude,longitude} = pos.coords
      // console.log(latitude,longitude);
      
      const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`

      try {
        const location = await axios.get(url)
        // console.log(location);
        const exactLocation = location.data.address
        setLocation(exactLocation)
        setOpenDropdown(false)
        // console.log(exactLocation);
        
        
      } catch (error) {
        console.log(error);
        
      }

    })
  }

  useEffect(()=>{
    getLocation()
  },[])

    useEffect(() => {
      console.log("hello from home")
      const loadSession = async () => {
        const { data, error } = await supabase.auth.getSession();
  
        console.log("load session", data)
  
        if (error) {
          setError(error.message);
        } else {
          setSession(data.session);
          setUser(data.session?.user ?? null);
        }
  
        setLoading(false);
      };
  
      loadSession();
    },[])


  return (
    <BrowserRouter>
    <Navbar location={location} getLocation={getLocation} openDropdown={openDropdown} setOpenDropdown={setOpenDropdown} />
      <Routes>
        <Route path='/' element={<RequireGuest><Home/></RequireGuest>}> </Route>
        <Route path='/products' element={<Products/>}> </Route>
        <Route path='/products/:slug' element={<SingleProduct/>}> </Route>
         <Route path='/category/:category' element={<CategoryProduct />}></Route>
        <Route path='/about' element={<About/>}> </Route>
        <Route path='/contact' element={<Contact/>}> </Route>
        <Route path='/cart' element={<Cart location={location} getLocation={getLocation}/>}> </Route>
        <Route path='/sing-in' element={<SingIn/>}> </Route>
        <Route path='/summary' element={<OrderSummary/>}> </Route>
        <Route path='/registerfrom' element={<RegisterForm/>}> </Route>
      </Routes> 
      <Footer/>
      
    </BrowserRouter>
  )
}

export default App
