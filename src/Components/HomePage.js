import React, { useContext, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Styles/HomePage.css'
import {FaUser,FaBuilding} from 'react-icons/fa'
import { LoginUserContext } from './Context/LoginUserContext';
import * as signalR from '@microsoft/signalr';


/* import { Route, Routes } from 'react-router-dom'
 */
function HomePage() {
  const navigate = useNavigate();
  const [naziv,setNaziv] = useState("");
  const {notif,setNotifFunction,req,setRequestFunction} = useContext(LoginUserContext);
  const [connection, setConnection] = useState(null);
  const [message, setMessage] = useState('');
  
  useEffect(() => {
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://benjamin002-001-site1.jtempurl.com/adminNotificationHub') // Update with your API URL
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);

    newConnection
      .start()
      .then(() => console.log('SignalR Connected'))
      .catch((error) => console.error('SignalR Connection Error: ', error));

     
      
    newConnection.on('NewOrderArrived', (receivedMessage) => {
      setMessage(receivedMessage);
      setNotifFunction("Imate nove proudzbine!");
     
    });
  
  
 
    if(localStorage.getItem("Admin")) {
    newConnection.on('ReceiveNotification', (receivedMessage) => {
      setMessage(receivedMessage);     
      setRequestFunction("Imate nove zahteve!");
    });
  }
  
   


    return () => {
      newConnection.stop();
    };
  }, []);

  const Pretraga = () => {
    if(naziv.trim().length == 0) alert("Unesite naziv restorana za pretragu.");
    else {
      navigate(`/pretraga/${naziv}`);
    }
  }
  return (
    <div id='home-content'>
      {/* {localStorage.getItem("Admin") && <div id='notification' onClick={()=>navigate("/myorders")}><p>Imate nove proudzbine!</p></div>} */}
      <div className='home-content-search'>
          <div id='search'>
              <button onClick={Pretraga}>PRETRAZI</button>
              <input type='text' value={naziv} onChange={(e)=>setNaziv(e.target.value)} placeholder='Pretrazi restorane...'></input>
          </div>
      </div>
      <div className='home-content-header'>
          <div id='heder'>
           <h1>Brzo i sigurno do svoje omiljene hrane!</h1>
          </div>
          {!localStorage.getItem("User") && <div className='btn'>
           <button id='log' onClick={()=>navigate("/prijava")}><FaUser size={20}/>PRIJAVI SE KAO KORISNIK</button>
         {/*  </div> */}
         {/*  <div className='btn'> */}
           <button id='rest' onClick={()=>navigate("/prijavarest")}><FaBuilding/>PRIJAVI SE KAO RESTORAN</button>
           </div>} 
           {localStorage.getItem("Vlasnik restorana") && 
           <button id='mojrest' onClick={()=>navigate(`/prikazrestorana/${parseInt(localStorage.getItem("IdRest"))}`)}>MOJ RESTORAN</button>
           }
           {localStorage.getItem("Admin") && 
           <button id='mojrest' onClick={()=>navigate('/prikazkorisnika')}>KORISNICI</button>
           }
          
      </div>
    </div>
  )
}

export default HomePage
