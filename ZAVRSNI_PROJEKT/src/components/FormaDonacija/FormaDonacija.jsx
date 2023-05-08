import React from 'react'
import stil from './formaDonacija.module.css'
import { useState,useContext } from 'react'
import axios from 'axios'
import UserContext from '../../components/Context/UserContext'


const FormaDonacija = ({funk,postaviDonacije}) => {

    const korisnik=useContext(UserContext)

    const [podaci,postaviPodatke]=useState({
        kategorija:"",
        tip:"",
        vrijednost:"",
        opis:""
      })


      function obradiPodatkeAdmin(objekt){
        return {
          "kategorija":"trazi",
          "tip":objekt.tip,
          "vrijednost":objekt.vrijednost,
          "opis":objekt.opis
        }
      }

      function obradiPodatkeKorisnik(objekt){
        return {
          "kategorija":"nudi",
          "tip":objekt.tip,
          "vrijednost":objekt.vrijednost,
          "opis":objekt.opis
        }
      }

      const unosVrijednosti=(e)=>{
        const {name, value}=e.target;
        postaviPodatke({...podaci,[name]:value})
      }
      


    const UnesiDonaciju=(e)=>{
        e.preventDefault();
        if(korisnik.context==="admin")
        {
            const ObradeniPodaci=obradiPodatkeAdmin(podaci);
            axios.post("http://localhost:3001/donacije", ObradeniPodaci)
            .then(rez => {
                    axios.get("http://localhost:3001/donacije")
                     .then(rez => postaviDonacije(rez.data));
                 })
            funk()
        }
        else
        {
            const ObradeniPodaci=obradiPodatkeKorisnik(podaci);
            axios.post("http://localhost:3001/donacije", ObradeniPodaci)
            .then(rez => {
                    axios.get("http://localhost:3001/donacije")
                     .then(rez => postaviDonacije(rez.data));
                 })
            funk()
        }
      
    }
       

  return (
    <form className={stil.formaDonacija} onSubmit={UnesiDonaciju}>
        <div className={stil.donacijaNaslov}>UNESITE NOVU DONACIJU</div>
        <div className={stil.PodaciElm}><b>Tip: </b>
            <input className={stil.RadioBtn} type="radio"  name="tip" value={"Ostalo"}  onChange={unosVrijednosti}  required />
            <label htmlFor="tip">Ostalo</label>

            <input className={stil.RadioBtn} type="radio"  name="tip" value={"Hrana"}  onChange={unosVrijednosti} required />
            <label htmlFor="tip">Hrana</label>

            <input className={stil.RadioBtn} type="radio"  name="tip" value={"Igračke"} onChange={unosVrijednosti} required />
            <label htmlFor="tip">Igračke</label>

            <input className={stil.RadioBtn} type="radio"  name="tip" value={"Lijekovi"}  onChange={unosVrijednosti} required />
            <label htmlFor="tip">Lijekovi</label>
        
        </div>
        <div className={stil.PodaciElm}><b>Vrijednost: </b>
        <input className={stil.inputVr} type="number"  name="vrijednost" min={0} value={podaci.vrijednost} onChange={unosVrijednosti}   required/> 
        </div>
        <div className={stil.PodaciElm}><b>Opis: </b>
          <input className={stil.input} type="text"  name="opis" value={podaci.opis} onChange={unosVrijednosti}   maxLength="100"  /> 
        </div>
      <button className={stil.BotunUrediStil} type="submit">DODAJ</button>
    </form>
  )
}

export default FormaDonacija
