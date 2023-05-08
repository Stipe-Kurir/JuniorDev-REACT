import { useState ,useEffect} from 'react'
import './App.css'
import UserContext from './components/Context/UserContext'
import { createBrowserRouter, RouterProvider, Route, redirect } from "react-router-dom";
import Donacije from './pages/Donacije/Donacije.jsx'
import Obavijesti from './pages/Obavijesti/Obavijesti.jsx'
import Unos from './pages/Unos/Unos.jsx'
import Popis from './pages/Popis/Popis.jsx'
import Home from './pages/Home/Home';


const router =createBrowserRouter([
  {
  path:"/",
  element:<Home />
  },
  {
    path:"/donacije",
    element:<Donacije/>
  },
  {
    path:"/obavijesti",
    element:<Obavijesti />
  },
  {
    path:"/popis",
    element:<Popis />
  },
  {
    path:"/unos",
    element:<Unos />
  }

])


function App() {

 

  const [context,setContext]=useState("admin");

  

  return (
    <div className='AppContainer'>

     <UserContext.Provider value={{context,setContext}}  >
  
     <RouterProvider router={router} />
    
     </UserContext.Provider>
     
    </div>
  )
}

export default App



