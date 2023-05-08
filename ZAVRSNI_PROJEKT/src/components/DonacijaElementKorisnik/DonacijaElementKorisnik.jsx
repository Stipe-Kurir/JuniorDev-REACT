import React from 'react'
import stil from './donacijaElementKorisnik.module.css'
import { useState } from 'react'
import axios from 'axios'

const DonacijaElementKorisnik = ({donacije,postaviDonacije}) => {


    const [filter,postaviFilter]=useState(donacije.kategorija)

    async function handleDonirano(){

        await axios.patch(`http://localhost:3001/donacije/${donacije.id}`, {kategorija:"donirano"})
         const rezultat= await axios.get("http://localhost:3001/donacije")
         postaviDonacije(rezultat.data)
     
       }


  return (
    <div className={stil.DonacijaPrikaz}>
    <div className={stil.DonacijaElementi}>
      <div className={stil.DonacijaEl}><b>TIP:</b> {donacije.tip}</div>
      <div className={stil.DonacijaEl}><b>VRIJEDNOST:</b> {donacije.vrijednost} €</div>
      <div className={stil.PodaciElmOpis}><b>OPIS: </b>{donacije.opis}</div>
    </div>
    <div className={stil.DonacijaElementiBotuni} >
    {
    filter==="trazi" && <div className={stil.JedanBotun}>
      <button className={stil.BotunStil} onClick={handleDonirano} >DONIRAJ</button>
      </div>
      }
   
    </div>
   
  </div>
  )
}

export default DonacijaElementKorisnik
