import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import './Styles/UnosRest.css'

function Proba() {
    const [file,setFile] = useState();
    const [naziv,setNaziv] = useState("");
    const [lokacija,setLokacija] = useState("");
    const [radnoVreme,setRadnoVreme] = useState("");
    const [slogan,setSlogan] = useState("");
    const [imageBase64, setImageBase64] = useState('');
    const [pib,setPib] = useState("");
    const [about,setAbout] = useState("");

    const {idOwner} = useParams();

    const [rest,setRest] = useState(0);

    const navigate = useNavigate();
    const [message,setMessage] = useState(false);



    /* const handleFile = (e) => {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
        setFileText(e.target.value);
        //document.getElementById("image").appendChild(file);
    } */
    


    const handleFileChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageBase64(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };



     const insertToDb = async () => {
//        alert(imageBase64);
        try{
         //const r = await axios.post("https://localhost:7224/AddRestaurant", {
         const r = await axios.post("https://benjamin002-001-site1.jtempurl.com/AddRestaurant", {
            pib: pib,
            name: naziv,
            location: lokacija,
            workingTime: radnoVreme,
            slogan: slogan,
            urlPhoto: imageBase64 ,
            ownerId: idOwner,
            about: about,
            status: false //da li je zahtev odobren ili ne. Inicijalno nije.
        });
        //setRest(r.data);
        console.log(r);
        const restoran = r.data;
        setRest(restoran.id);
        console.log(restoran.id);

        navigate(`/signalr/${restoran.id}`);

        //alert("uspesno!");
        //console.log(r.);
        //const p = r.data.id;
        //console.log(JSON.stringify(r));
       
        
        
    }
    catch(e) {
        console.log("Error:",e);
    }
    }
  return (
    <div id='container'>
       <div id='content'>
       <h1>Dobrodosli! Unesite informacije o vasem restoranu.</h1>
       <p>Podaci o restoranu bice poslati administratoru na odobravanje. Bicete obavesteni o tome da li ste uspesno registrovali vas restoran.</p>
       <p>Vas JustNow</p>
       {message && <p>Vas zahtev je odobren.</p>}
       {message && <button>Idi dalje</button>} 

            <div id='infos'>
            <div className='labelinput'>
                    <label>Poreski identifikacioni broj (PIB) restorana</label>
                    <input type='text' value={pib} onChange={(e)=>setPib(e.target.value)}></input>
                </div>
                <div className='labelinput'>
                    <label>Naziv restorana</label>
                    <input type='text' value={naziv} onChange={(e)=>setNaziv(e.target.value)}></input>
                </div>
                <div className='labelinput'>
                    <label>Lokacija</label>
                    <input type='text' value={lokacija} onChange={(e)=>setLokacija(e.target.value)}></input>
                </div>
                <div className='labelinput'>
                    <label>Radno vreme</label>
                    <input type='text' value={radnoVreme} onChange={(e)=>setRadnoVreme(e.target.value)}></input>
                </div>
                <div className='labelinput'>
                    <label>Slogan</label>
                    <input type='text' value={slogan} onChange={(e)=>setSlogan(e.target.value)}></input>
                </div>
                <div className='labelinput'>
                    <label>Opis restorana</label>
                    <textarea value={about} onChange={(e)=>setAbout(e.target.value)}></textarea>
                </div>
                <div className='labelinput'>
                    <label>Unesite fotografiju restorana</label>
                    <input type='file' onChange={handleFileChange} ></input>
                    <img src={imageBase64}></img>
                    {/* <div id='image' style={{width:100%; height:200px;}}>

                    </div> */}
                </div>
                <button onClick={insertToDb}>Posalji zahtev</button>
            </div>
       </div>
    </div>
  )
}

export default Proba














 /* import React, { useState } from 'react'
import './Validations/validationsRegex'
import {rname,remail,rpassword,rusername, rtel, rworkingtime, raccnumber, rpib} from "./Validations/validationsRegex"

const Proba = () => {
   //const rname = new RegExp('^[A-Z]{1}[a-z]+$')
    const [name,setName] = useState("");
    const Provera = () => {
        if(rpib.test(name)) alert("Uspesno!");
        else alert("Unesite ponovo");
    }
  return (
    <div>
      <input type='text' value={name} onChange={(e)=>setName(e.target.value)} type='text'></input>
      <button onClick={Provera}>Provera</button>
    </div>
  )
}

export default Proba  */
