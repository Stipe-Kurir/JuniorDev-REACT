import React from 'react'
import stil from "./prikazObavijesti.module.css"
import UserContext from '../../components/Context/UserContext'
import { useContext} from 'react'
import axios from 'axios'

const PrikazObavijesti = ({podaci,promjena}) => {
    

    const korisnik=useContext(UserContext);

    async function izbrisiObavijest(){
        const confirmBox = window.confirm(
            "Želite li izbrisati odabrano obavijest?"
          )
          if (confirmBox === true) 
          {
            await axios.delete(`http://localhost:3001/obavijesti/${podaci.id}`);
            const rez=await axios.get("http://localhost:3001/obavijesti");
            promjena(rez.data)
          }
          else
          {
            return
          } 
    }
    

  return (
    <div >
        {korisnik.context==="admin" ?
            <div className={podaci.vazno ? stil.ObavijestAdminVazno : stil.ObavijestAdmin}>
                <div className={stil.Naslov}>
                    <div  className={stil.NaslovElm1}>{podaci.naslov}</div>
                         {podaci.vazno ? <div className={stil.NaslovElm2}>VAŽNO!</div>: <div></div>} 
                    <div className={stil.NaslovElm3}>{podaci.datum}</div>
                </div>
                <div className={stil.Tekst}>
                    <div className={stil.TekstElm}>{podaci.tekst}</div>
                    <div className={stil.SmeceIkona}>
                        <img src="delete.png" width="30px" height="30px" className={stil.Ikona} onClick={izbrisiObavijest} />
                    </div>
                </div>
                    
            </div>
            :
            <div className={podaci.vazno ? stil.ObavijestKorisnikVazno : stil.ObavijestKorisnik}>
                <div className={stil.Naslov}>
                    <div  className={stil.NaslovElm1}>{podaci.naslov}</div>
                        {podaci.vazno ? <div className={stil.NaslovElm2}>VAŽNO!</div>: <div></div>} 
                    <div className={stil.NaslovElm3}>{podaci.datum}</div>
                </div>
                <div className={stil.Tekst}>
                    <div className={stil.TekstElm}>{podaci.tekst}</div>
                </div>
            </div>
        } 
    </div>      
  )
}

export default PrikazObavijesti
