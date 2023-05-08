import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import stil from './obavijesti.module.css'
import UserContext from '../../components/Context/UserContext'
import { useState,useContext,useEffect } from 'react'
import axios from "axios"; 
import PrikazObavijesti from '../../components/PrikazObavijesti/PrikazObavijesti'


const Obavijesti = () => {


const korisnik=useContext(UserContext);
const [botun,postaviBotun]=useState(false);
const [obavijesti, postaviObavijesti] = useState([]);
const current=new Date();

const [podaci,postaviPodatke]=useState({
  naslov:"",
  datum:"",
  tekst:"",
  vazno:false
})

const vratiZadano=()=>{
  podaci.tekst=""
  podaci.naslov=""
  podaci.datum=""
  podaci.vazno=false
  DodajObavijest();
}


function obradiPodatke(objekt){
  return {
    "naslov":objekt.naslov,
    "datum":`${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`,
    "tekst":objekt.tekst,
    "vazno":objekt.vazno
  }
}

function obradiPodatkeKorisnik(objekt){
  return {
    "naslov":objekt.naslov,
    "datum":`${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`,
    "tekst":objekt.tekst,
    "vazno":false
  }
}

const UnosVrijednosti=(e)=>{
  const {name, value}=e.target;
  postaviPodatke({...podaci,[name]:value})
}

const UnosCheck=()=>{
  if(podaci.vazno===false)
  {
     postaviPodatke({...podaci,vazno:true})
  }
    else{
      postaviPodatke({...podaci,vazno:false})
    }

}

const DodajObavijest=()=>{
    postaviBotun(!botun);
}



const UnesiObavijest=(e)=>{
  e.preventDefault();
  const ObradeniPodaci=obradiPodatke(podaci);

  axios.post("http://localhost:3001/obavijesti", ObradeniPodaci)
        .then(rez => {
          axios.get("http://localhost:3001/obavijesti")
            .then(rez => postaviObavijesti(rez.data));
        })

  vratiZadano();
 
}

const UnesiObavijestKorisnik=(e)=>{
  e.preventDefault();
  const ObradeniPodaci=obradiPodatkeKorisnik(podaci);

  axios.post("http://localhost:3001/obavijesti", ObradeniPodaci)
        .then(rez => {
          axios.get("http://localhost:3001/obavijesti")
            .then(rez => postaviObavijesti(rez.data));
        })

        vratiZadano();

}

useEffect(() => {
  axios
    .get("http://localhost:3001/Obavijesti")
    .then(res => postaviObavijesti(res.data));
}, []);



  return (
    <div>
     
     <Navbar />
       
       <div className={stil.ObavijestiContainer}>
        <div className={stil.UnosObavijesti}>
         
          <div className={stil.ObavijestiForma}>

          {botun ? 
           <div className={stil.ObavijestiForma}>

              <div className={stil.NovaObavijest}>

                <div className={stil.NovaObavijestNaslov}>UNESITE NOVU OBAVIJEST</div>

                
                   { korisnik.context === "admin" ?

                      <form className={stil.NovaObavijestForm} onSubmit={UnesiObavijest}>

                        <div className={stil.Input}>
                          <div className={stil.Opis}>
                            <label htmlFor="naslov">NASLOV:</label> 
                          </div>
                          <input className={stil.inputArea} type="text" id="naslov" name="naslov" maxLength="20" value={podaci.naslov} onChange={UnosVrijednosti} required/>
                        </div>

                        <div className={stil.Input}>
                          <div className={stil.Opis}>
                            <label htmlFor="tekst">TEKST:</label> 
                          </div>
                          <textarea className={stil.inputArea}  type="text" id="tekst" name="tekst"  minLength="10" maxLength="200" value={podaci.tekst} onChange={UnosVrijednosti} required></textarea>
                        </div>

                      <div className={stil.NovaObavijestPotvrda}>
                          <div className={stil.Input}>
                            <div className={stil.Opis}>
                              <label htmlFor="vazno">VAŽNO:</label> 
                            </div>
                            <input className={stil.Vazno} type="checkbox"  id="vazno" value={podaci.vazno} onChange={UnosCheck} checked={podaci.vazno===true} name="vazno" />
                          </div>

                          <div className={stil.NovaObavijestSpremi}>
                            <button  className={stil.Spremi} type="submit">Spremi</button>
                          </div>
                        </div>

                      </form>  

                      :
                    
                      <form className={stil.NovaObavijestForm} onSubmit={UnesiObavijestKorisnik}>

                        <div className={stil.Input}>
                          <div className={stil.Opis}>
                            <label htmlFor="naslov">NASLOV:</label> 
                          </div>
                          <input className={stil.inputArea} type="text" id="naslov" name="naslov" maxLength="20" value={podaci.naslov} onChange={UnosVrijednosti} required/>
                        </div>

                        <div className={stil.Input}>
                          <div className={stil.Opis}>
                            <label htmlFor="tekst">TEKST:</label> 
                          </div>
                          <textarea className={stil.inputArea}  type="text" id="tekst" name="tekst"  minLength="10" maxLength="200" value={podaci.tekst} onChange={UnosVrijednosti} required></textarea>
                        </div>

                        <div className={stil.NovaObavijestPotvrda}>
                          <div className={stil.NovaObavijestSpremi}>
                            <button  className={stil.Spremi} type="submit">Spremi</button>
                          </div>
                        </div>

                      </form>  

                   } 
                           
              </div>
              </div>
               : 
               <div className={stil.UnosBotun}>
  
               <button className={stil.BotunObavijest} onClick={DodajObavijest}>UNESITE NOVU OBAVIJEST</button>
             </div>
          }

          </div>
        </div>
      
         <div className={stil.PrikazObavijesti}>
          {obavijesti.sort((a, b) => new Date(...b.datum.split('/').reverse()) - new Date(...a.datum.split('/').reverse())).map(rez=>(
            <PrikazObavijesti key={rez.id} podaci={rez} promjena={postaviObavijesti}/>
          )) }
        </div>
      </div>
      <Footer />

    </div>
  )

}

export default Obavijesti


 