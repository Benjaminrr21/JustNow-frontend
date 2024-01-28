import axios from 'axios'
import React, { useState } from 'react'
import { useContext } from 'react'
import { json, Link, useNavigate } from 'react-router-dom'
import { MyContext } from '../App'
import ChangingPage from './ChangingPage'
import { LoginUserContext } from './Context/LoginUserContext'
import {FaUser} from 'react-icons/fa'
import { RiLockPasswordLine } from "react-icons/ri";

import './Styles/Prijava.css'

function Prijava() {
 const [username,setUsername] = useState("");
 const [usernameMsg,setUsernameMsg] = useState("");
 const [password,setPassword] = useState("");
 const [passwordMsg,setPasswordMsg] = useState("");
 const [error,setError] = useState("");
 const [user,setUser] = useState(null);
 const navigate = useNavigate();
 const [loading,setLoading] = useState(false);

 const {setUserFunction,setAdminFunction} = useContext(LoginUserContext)
 //setUser(JSON.parse(localStorage.getItem("Admin")));
 //alert(uer);
 
 ///alert(js.token)
 

 
 const Login = async () => {
   setLoading(true);
   try {
   const resp = await axios.post("https://benjamin002-001-site1.jtempurl.com/LoginUser", {
     username,
     password
   });
   const userr = resp.data;
   console.log(resp);
   console.log(userr);
   axios.defaults.headers.common['Authorization'] = `Bearer ${userr.token}`;
  
localStorage.setItem("User",JSON.stringify(userr));
setLoading(false);
 // localStorage.setItem(userr.role.name,JSON.stringify(userr));
  /*  if(userr.role.name == "Admin") {
    localStorage.setItem("Admin",JSON.stringify(userr));
  }  */
  if(localStorage.getItem("User")){
    if(JSON.parse(localStorage.getItem("User")).user.id == 2) localStorage.setItem("Admin",JSON.stringify(userr));
  }
  setUserFunction(userr);
  navigate("/homepage");
  /* var obj = localStorage.getItem(userr.role.name)
  alert(JSON.parse(obj)); */
  //alert(currentUser);
     
     /* if(resp.response.status == 404)  
     setError("Molimo vas registrujte se na aplikaciju."); */
     //axios.defaults.headers.common["Authorization"] = `Bearer ${userr.token}`
   }
   catch(e){
     setLoading(false);
     console.log("Error ",e);
     setError("Korisnicko ime ili lozinka nisu pravilno uneti.");

   }
 }
 const removeSpan = () => {
   setError("");
 }
  return (
    <div id='main'>
      <div id='login-content'>
        
        <h1>Prijavi se na JustNow!</h1>
        {loading && <p id='loading-text'>Prijavljivanje je u toku...</p>}
        <div className='login-inputs'>
          <label><FaUser/> Korisnicko ime</label>
          <input onInput={removeSpan} onChange={e => setUsername(e.target.value)} value={username} type='text' name='username'></input>
          {{usernameMsg} && <span>{usernameMsg}</span>}
        </div>
        <div className='login-inputs'>
          <label><RiLockPasswordLine/> Lozinka</label>
          <input onChange={e => setPassword(e.target.value)} value={password} type='password' name='password'></input>
          {{passwordMsg} && <span>{passwordMsg}</span>}
        </div>
        {error!="" && <span>{error}</span>}
        <button  onClick={Login}>Prijava</button>
        
        
      </div>

    </div>
  )
}

export default Prijava
