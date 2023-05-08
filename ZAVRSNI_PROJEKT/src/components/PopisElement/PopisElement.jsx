import React from 'react'
import stil from'./popisElement.module.css'
import UserContext from '../../components/Context/UserContext'
import  { useContext,useState } from 'react'
import FormaUredi from '../FormaUredi/FormaUredi'


const PopisElement = ({podaci,funk,postaviPodatke}) => {

    const korisnik=useContext(UserContext);
    const [uredi,postaviUredi]=useState(false);


   const Uredi=()=>{
      postaviUredi(!uredi)
    }

    let timeStamp = Date.parse(podaci.pregled);
    var date = new Date(timeStamp);
    var year = date.getFullYear();
    var dateVal = date.getDate();
    var formattedDate = dateVal + '/' + (date.getMonth()+1) + '/' + year;
  
    const Udomi=()=>{
      funk(podaci.id)
    }


  return (
    <div className={podaci.udomljen==="udomljen" ? stil.PopisElement : stil.PopisElementNijeUdomljen}>
        <div className={stil.Slika}>
          <img className={stil.SlikaElm} src={podaci.slika} alt="slika_zivotinje" />
        </div>
  
    {korisnik.context==="admin"?

        <>
        {uredi ?

                <FormaUredi podaci={podaci} postaviPodatke={postaviPodatke} funk={Uredi}/>
                :
                <div className={stil.Podaci}>
                  <div className={stil.PodaciElm}><b>IME:</b> {podaci.ime}</div>
                  <div className={stil.PodaciElm}><b>VRSTA:</b> {podaci.vrsta}</div>
                  <div className={stil.PodaciElm}><b>STATUS:</b> {podaci.udomljen}</div>
                  <div className={stil.PodaciElm}><b>ČIPIRAN:</b> {podaci.cip?"Čipiran":"Nije čipiran"}</div>
                  <div className={stil.PodaciElm}><b>GODINE:</b> {podaci.godine}</div>
                  <div className={stil.PodaciElm}><b>ZADNJI PREGLED:</b> {formattedDate}</div>
                  <div className={stil.PodaciElmOpis}><b>OPIS:</b> {podaci.opis}</div>
                </div>
        }
          <div className={stil.Botuni}>
                <div className={stil.BotunRaspored}>
                  {uredi ?  
                  <button className={stil.BotunUrediStilZatvori} onClick={Uredi}>ZATVORI FORMU</button>
                  :
                  <button className={stil.BotunUrediStil} onClick={Uredi}>UREDI</button>
                  }
                </div>
          </div>
        </>

        :
        
        <>
        <div className={stil.Podaci}>
          <div className={stil.PodaciElm}><b>IME:</b> {podaci.ime}</div>
          <div className={stil.PodaciElm}><b>VRSTA:</b> {podaci.vrsta}</div>
          <div className={stil.PodaciElm}><b>STATUS:</b> {podaci.udomljen}</div>
          <div className={stil.PodaciElm}><b>ČIPIRAN:</b> {podaci.cip?"Čipiran":"Nije čipiran"}</div>
          <div className={stil.PodaciElm}><b>GODINE:</b> {podaci.godine}</div>
          <div className={stil.PodaciElm}><b>ZADNJI PREGLED:</b> {formattedDate}</div>
          <div className={stil.PodaciElmOpis}><b>OPIS:</b> {podaci.opis}</div>
       </div>
        <div className={stil.Botuni}>
            {
            podaci.udomljen==="udomljen" ? 
              <div></div>
              :
              <div className={stil.BotunRaspored}>
                <button className={stil.BotunUdomiStil} onClick={Udomi}>UDOMI</button>
              </div>

            }
        </div>
        </>
        
    }
    </div>
  )
}

export default PopisElement


