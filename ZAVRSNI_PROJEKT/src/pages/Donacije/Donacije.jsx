import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import stil from './donacije.module.css'
import { useContext , useState,useEffect} from 'react'
import UserContext from '../../components/Context/UserContext'
import FormaDonacija from '../../components/FormaDonacija/FormaDonacija'
import axios from 'axios'
import DonacijaElementAdmin from '../../components/DonacijaElementAdmin/DonacijaElementAdmin'
import DonacijaElementKorisnik from '../../components/DonacijaElementKorisnik/DonacijaElementKorisnik'



const Donacije = () => {
  
  const korisnik=useContext(UserContext)

  const [forma,postaviFormu]=useState(false)
  const [donacije,postaviDonacije]=useState([])

  
  useEffect(() => {
    axios
      .get("http://localhost:3001/donacije")
      .then(res => postaviDonacije(res.data));
  }, []);
  
  const prikaziFormu=()=>{
    postaviFormu(!forma)
  }

  
  return (
    <div>
      <Navbar />
      <div className={stil.DonacijeContainer}>
      {korisnik.context==="admin"?
      <>
      <div className={stil.DonacijaForma}>
        {forma ? 
        <FormaDonacija funk={prikaziFormu} postaviDonacije={postaviDonacije}/>
        :
        <div><button className={stil.DonacijaBotun} onClick={prikaziFormu}>NOVA DONACIJA</button></div>
        }
        
      </div>
      <div className={stil.DonacijaKategorija}>
        <div className={stil.DonacijaKategorijaNaslov}>TRAŽIMO</div>
        {
           donacije.filter(podatak=>podatak.kategorija.includes("trazi")).map(rez=>
            <DonacijaElementAdmin 
               key={rez.id}
               donacije={rez} 
               postaviDonacije={postaviDonacije} 
            />
           )
        }
       
      </div>
      <div className={stil.DonacijaKategorija}> 
      <div className={stil.DonacijaKategorijaNaslov}>NUDI SE</div>
      {
           donacije.filter(podatak=>podatak.kategorija.includes("nudi")).map(rez=>
            <DonacijaElementAdmin
               key={rez.id}
               donacije={rez}  
               postaviDonacije={postaviDonacije} 
            />
           )
        }
      
      </div>
      <div className={stil.DonacijaKategorija}>
      <div className={stil.DonacijaKategorijaNaslov}>DONIRANO</div>
      {
           donacije.filter(podatak=>podatak.kategorija.includes("donirano")).map(rez=>
            <DonacijaElementAdmin
               key={rez.id}
               donacije={rez}  
               postaviDonacije={postaviDonacije} 
            />
           )
        }
      </div>
      </>

     
      :
   
      <>
       <div className={stil.DonacijaForma}>
        {forma ? 
        <FormaDonacija funk={prikaziFormu} postaviDonacije={postaviDonacije}/>
        :
        <div><button className={stil.DonacijaBotun} onClick={prikaziFormu}>NOVA DONACIJA</button></div>
        }
        
      </div>
      <div className={stil.DonacijaKategorija}>
        <div className={stil.DonacijaKategorijaNaslov}>TRAŽIMO</div>
        {
           donacije.filter(podatak=>podatak.kategorija.includes("trazi")).map(rez=>
            <DonacijaElementKorisnik
               key={rez.id}
               donacije={rez} 
               postaviDonacije={postaviDonacije} 
            />
           )
        }
       
      </div>
      <div className={stil.DonacijaKategorija}> 
      <div className={stil.DonacijaKategorijaNaslov}>NUDI SE</div>
      {
           donacije.filter(podatak=>podatak.kategorija.includes("nudi")).map(rez=>
            <DonacijaElementKorisnik
               key={rez.id}
               donacije={rez}  
               postaviDonacije={postaviDonacije} 
            />
           )
        }
      
      </div>
      <div className={stil.DonacijaKategorija}>
      <div className={stil.DonacijaKategorijaNaslov}>DONIRANO</div>
      {
           donacije.filter(podatak=>podatak.kategorija.includes("donirano")).map(rez=>
            <DonacijaElementKorisnik
               key={rez.id}
               donacije={rez}  
               postaviDonacije={postaviDonacije} 
            />
           )
        }
      </div>
      </>
      }
      </div>
      <Footer />
    </div>
  )
}

export default Donacije
