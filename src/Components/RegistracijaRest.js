import axios from 'axios';
import React from 'react'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../App'
import { LoginUserContext } from './Context/LoginUserContext';
import {rname,remail,rpassword,rusername, rtel, rpib} from "./Validations/validationsRegex"
import './Styles/Registracija.css'
import { FaUser,FaPhoneAlt } from 'react-icons/fa';
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { LuUserSquare2 } from "react-icons/lu";

const  RegistracijaRest = ()=> {
  const navigate = useNavigate();
  //const {username, setUsername} = useContext(MyContext);
  const [name,setName] = useState("");
  const [nameMsg,setNameMsg] = useState("");

  const [lastname,setLastName] = useState("");
  const [lastnameMsg,setLastNameMsg] = useState("");
  
  const [email,setEmail] = useState("");
  const [emailMsg,setEmailMsg] = useState("");

  const [phoneNumber,setPhoneNumber] = useState("");
  const [phoneNumberMessage,setPhoneNumberMessage] = useState("");
  
  const [userName,setUserName] = useState("");
  const [usernameMsg,setUsernameMsg] = useState("");

  const [password,setPassword] = useState("");
  const [passwordMsg,setPasswordMsg] = useState("");

  const [pib,setPib] = useState("");
  const [pibMsg,setPibMsg] = useState("");

  const {setOwnerFunction} = useContext(LoginUserContext);

  
  

  const Registracija = async () => {
    if(!rname.test(name) || name.trim().length == 0){
      setNameMsg("Ime nije uneto");
   //   return ;
   }
   //else setNameMsg("");
   if(lastname.trim() == 0 || !rname.test(lastname)){
    setLastNameMsg("Prezime nije uneto");  }
   //else setLastNameMsg("");

   if(email.trim().length == 0 || !remail.test(email)){ setEmailMsg("Email nije pravilno unet"); }
   //else setEmailMsg("");
   // if(datum.trim().length == 0){ setDatumMsg("Datum nije unet"); return;}
   if(phoneNumber.trim().length == 0 || !rtel.test(phoneNumber)){ setPhoneNumberMessage("Nepravilan unos");} 
   if(userName.trim().length == 0 || !rusername.test(userName)){ setUsernameMsg("Korisnicko ime nije pravilno uneto");  }
 // else setUserNameMsg("");
   if(password.trim().length == 0 || !rpassword.test(password)){ setPasswordMsg("Lozinka nije pravilno uneta"); }
   
   
   else{
   try {
    const owner = await axios.post("http://benjamin002-001-site1.jtempurl.com/RegisterOwner", {
      firstName: name,
      lastName: lastname,
      email: email,
      phone: phoneNumber,
      username: userName,
      password: password
    });
    console.log("Uspesna registracija!");
    const userr = owner.data;
    console.log(userr);
    axios.defaults.headers.common['Authorization'] = `Bearer ${userr.token}`;
    setOwnerFunction(userr);

    localStorage.setItem("Vlasnik restorana",JSON.stringify(userr));
    //navigate("/signalr");
    navigate(`/unosrest/${userr.owner.id}`);


  }
  catch(e){
    console.log("Error ",e);
  }
}
  }

  return (
    <div id='reg-container'>
      <div id='reg-container-mainn'>
       <h3>Unesite podatke o vlasniku restorana</h3>
      
       <div className='reg-inputs'>
         <label><LuUserSquare2/> Ime vlasnika</label>
         <input onChange={e => setName(e.target.value)} type='text' name='ime' value={name}></input>
         {{nameMsg} && <span>{nameMsg}</span>}
       </div>
       <div className='reg-inputs'>
         <label><LuUserSquare2/> Prezime vlasnika</label>
         <input onChange={e => setLastName(e.target.value)} type='text' name='prezime' value={lastname}></input>
         {{lastnameMsg} && <span>{lastnameMsg}</span>}
       </div>
       <div className='reg-inputs'>
         <label><MdOutlineMailOutline/> Email</label>
         <input onChange={e => setEmail(e.target.value)} type='email' name='email' value={email}></input>
         {{emailMsg} && <span>{emailMsg}</span>}
       </div>
   
       <div className='reg-inputs'>
         <label><FaPhoneAlt/> Broj telefona</label>
         <input onChange={e => setPhoneNumber(e.target.value)} type='text' name='phone' value={phoneNumber}></input>
         {{phoneNumberMessage} && <span>{phoneNumberMessage}</span>}
       </div>
       <div className='reg-inputs'>
         <label><FaUser/> Izaberite korisnicko ime</label>
         <input onChange={e => setUserName(e.target.value)} type='text' name='username' value={userName}></input>
         {{usernameMsg} && <span>{usernameMsg}</span>}
       </div>
       <div className='reg-inputs'>
         <label><RiLockPasswordLine/> Lozinka</label>
         <input onChange={e => setPassword(e.target.value)} type='password' name='password' value={password}></input>
         {{passwordMsg} && <span>{passwordMsg}</span>}
       </div>
       
      
       <button onClick={()=>Registracija()} >Registracija vlasnika</button>
      
      </div>
    </div>
  )
}

export default RegistracijaRest
