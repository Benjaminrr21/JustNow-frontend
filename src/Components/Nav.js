import React, {useContext, useState} from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import './Styles/Nav.css'
import './Styles/HomePage.css'
import { LoginUserContext } from './Context/LoginUserContext';
import {FaUser, FaBuilding, FaMoneyBill} from 'react-icons/fa'
import axios from 'axios';

const Nav = () => {
    const [menuOpen,setMenuOpen] = useState(false);
    const {currentUser, owner, setUserFunction, setOwnerFunction, admin, setAdminFunction, notif, setNotifFunction, req, setRequestFunction} = useContext(LoginUserContext);

    const navigate = useNavigate();
    const logoutHandler = () => {
      console.log("Logging out...");

  // Clear the local storage
  try {
    localStorage.clear();
    console.log("Local storage cleared.");
    navigate("/homepage");
  } catch (error) {
    console.error("Error clearing local storage:", error);
  }

  // Clear headers for axios (if needed)
  axios.defaults.headers.common['Authorization'] = ``;

  // Navigate to the homepage
  navigate("/homepage");
    }
    const warning = () => {
      if(!localStorage.getItem("Moj racun")){
       alert("Nemate stavki na računu !!");
       return;
      }
       navigate(`/mojracun/${JSON.parse(localStorage.getItem("User")).user.id}`)
    }
  return (
    <nav>
      <div className='title' onClick={()=>navigate('/homepage')}>
        
      </div>
      <div className='menu' onClick={()=>setMenuOpen(!menuOpen)}>
          <span></span>
          <span></span>
          <span></span>
      </div>
      <ul className={menuOpen ? "open" : ""}>
          <li>
              <NavLink to='/restorani'><FaBuilding/> RESTORANI</NavLink>
          </li>
          
          {!localStorage.getItem("User") && !localStorage.getItem("Admin") && !localStorage.getItem("Vlasnik restorana") && 
          (
          <li>
              <NavLink to='/registracija'><FaUser/> REGISTRACIJA</NavLink>
          </li>
          )}
          {localStorage.getItem("Admin") && (
            <li onClick={()=>setRequestFunction(null)}>
            <NavLink to='/requests'>{req && <span id='notif'>N</span>}ZAHTEVI</NavLink>
            </li>
          )}
          {/* {localStorage.getItem("Vlasnik restorana") && (
            <li>
            <NavLink onClick={()=>navigate(`/myorders/${parseInt(localStorage.getItem("IdRest"))}`)}>{notif && <span id='notif'>N</span>}PORUDŽBINE</NavLink>
            </li>
          )} */}
          {localStorage.getItem("User") && !localStorage.getItem("Vlasnik restorana") && (
            <li onClick={()=>warning()} >
              <NavLink >
                            <FaMoneyBill/> MOJ RAČUN
                        </NavLink>
            </li>
          )

          }
          {localStorage.getItem("User") && (
            <li>
            <NavLink id='logout' onClick={()=>logoutHandler()}>Odjavi se</NavLink>
            </li>
          )}
          {localStorage.getItem("Vlasnik restorana") && (
            <li onClick={()=>logoutHandler()}>
            <NavLink id='logout' >Odjavi se</NavLink>
            </li>
          )}
          
          
      </ul>
    </nav>
  )
}

export default Nav
