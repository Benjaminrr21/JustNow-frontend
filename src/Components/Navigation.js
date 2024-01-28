import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { MyContext } from '../App'
import { LoginUserContext } from './Context/LoginUserContext';
import axios from 'axios';
import { LogLevel } from '@microsoft/signalr';
import {FaUser, FaBuilding, FaMoneyBill} from 'react-icons/fa'

/* import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignin } from '@fortawesome/free-solid-svg-icons'

const element = <FontAwesomeIcon icon={faSignin} /> */
/* import './App.css'
 */
function Navigation() {
  const navigate = useNavigate();
  
  const {currentUser, owner, setUserFunction, setOwnerFunction, admin, setAdminFunction, notif, setNotifFunction, req, setRequestFunction} = useContext(LoginUserContext);
  
  const warning = () => {
    if(!localStorage.getItem("Moj racun")) alert("Nemate stavki na računu !!");
    else navigate(`/mojracun/${JSON.parse(localStorage.getItem("User")).user.id}`)
  }
  

  const LogoutHandler = () => {
    setUserFunction(null);
    axios.defaults.headers.common['Authorization'] = ``;
   /*  localStorage.removeItem("User");
    if(localStorage.getItem("Admin")) localStorage.removeItem("Admin");
    if(localStorage.getItem("Vlasnik restorana")) localStorage.removeItem("Vlasnik restorana"); */
    localStorage.clear();
    navigate("/homepage");
  }
  return (
    <div className='navigation'>
      <div id='navigation-logo' onClick={()=>navigate("/homepage")}>
      
      </div>
     
      <div id='navigation-links'>
          <div className='navigation-links-link' onClick={()=>navigate("/restorani")}>
              {/* < Link to="/restorani" style={{color:'white'}}>RESTORANI</Link> */}
             <FaBuilding/> RESTORANI
          </div>
          { localStorage.getItem("User")  && !localStorage.getItem("Admin") && !localStorage.getItem("Vlasnik restorana") && (
          <div onClick={()=>warning()} id='dropp' className='navigation-links-link' >
             <FaMoneyBill/> MOJ RAČUN
          </div>
          )}
          { !localStorage.getItem("User") && !localStorage.getItem("Vlasnik restorana")   && (
          <div id='dropp' className='navigation-links-link' onClick={()=>navigate("/registracija")}>
             <FaUser/> REGISTRACIJA
          </div>
          )}
          {localStorage.getItem("Admin") && (
          <div id='dropp' className='navigation-links-link' onClick={()=>navigate("/requests")}>
             {req && <span id='notif'>N</span>}ZAHTEVI
            
          </div>

          )}
          {localStorage.getItem("Vlasnik restorana")  && (
          <div id='dropp' className='navigation-links-link' onClick={()=>navigate(`/myorders/${parseInt(localStorage.getItem("IdRest"))}`)}>
            {notif && <span id='notif'>N</span>}PORUDZBINE
            
          </div>

          )}
          {localStorage.getItem("User")  && (
            <div id='logout' className='navigation-links-link' onClick={()=>LogoutHandler()}>
             <button id='lo'>Odjavi se</button>
          
        </div>
          )}
          {localStorage.getItem("Vlasnik restorana")  && (
            <div id='logout' className='navigation-links-link' onClick={()=>LogoutHandler()}>
             <button id='lo'>Odjavi se</button>
          
        </div>
          )}
          
      </div>
      
      
    </div>
  );
};

export default Navigation
