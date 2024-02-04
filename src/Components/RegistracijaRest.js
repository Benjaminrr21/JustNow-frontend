import axios from 'axios';
import React, { useRef } from 'react'
import { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../App'
import { LoginUserContext } from './Context/LoginUserContext';
import {rname,remail,rpassword,rusername, rtel, rpib} from "./Validations/validationsRegex"
import './Styles/Registracija.css'
import { FaUser,FaPhoneAlt } from 'react-icons/fa';
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { LuUserSquare2 } from "react-icons/lu";
import { SHA256, enc } from 'crypto-js';
import emailjs from '@emailjs/browser'


const  RegistracijaRest = ()=> {
  const navigate = useNavigate();
  const [loading,setLoading] = useState(false);

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

  const [hashNum,setHashNum] = useState("");
  const [randomNum,setRandomNum] = useState("");
  const form = useRef();
  
  const generateRandomNumber = () => {
    const min = 10000;
    const max = 99999;
    const newRandomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    setRandomNum(newRandomNumber);

    // Hash the number using SHA-256
    const hash = SHA256(newRandomNumber.toString());
    ///hash.update(newRandomNumber.toString());
    const hashString = hash.toString(enc.Hex);
   // alert(hashString);
    //alert(typeof(hashString));
    setHashNum(hashString);
    //console.log(hashString);
    return hashString;
  };
  const Registracija = async () => {
  /*   if(!rname.test(name) || name.trim().length == 0){
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
    */
   
   /* else{
   try {
    const owner = await axios.post("https://benjamin002-001-site1.jtempurl.com/RegisterOwner", {
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
  } */
  if(!name || !lastname || !email || !phoneNumber || !userName || !password){

    alert("Sva polja su obavezna.");
    return;
   }
  const allInputsGreen = [...document.querySelectorAll('input')].filter((inp) => inp.style.backgroundColor != 'darksalmon').length;
  //const allInputsGreen = Array.from(document.querySelectorAll('input')).every((input) => input.style.backgroundColor != 'darkseagreen');
  if(allInputsGreen == 7){
     //const hs = generateRandomNumber();
     emailjs.sendForm('service_r3f5pdh', 'template_2ylrk2k', form.current, 'E4aw1o8lZ5pNSizJO')
    .then((result) => {
        console.log(result.text);
    }, (error) => {
        console.log(error.text);
    });
     //alert(hashNum)
     navigate(`/verify/owner/${hashNum}/${name}/${lastname}/${email}/${phoneNumber}/${userName}/${password}`)
  }
  else{} return; 
}
useEffect(()=>{
  setHashNum(generateRandomNumber());
 },[])
  
  const checkk = (e,valid,sett) => {
    sett(e.target.value);
     if(!valid.test(e.target.value)){
      e.currentTarget.style.backgroundColor = '#ffc1b9';
    } 
    else {
     e.currentTarget.style.backgroundColor = '#cce6cc';

    }
  }

  return (
    <div id='reg-container'>
      <div id='reg-container-mainn'>
       <h3>Unesite podatke o vlasniku restorana</h3>
       <form ref={form} onSubmit={Registracija}>
       <div className='reg-inputs'>
         <label><LuUserSquare2/> Ime vlasnika</label>
         <input onChange={e =>  checkk(e,rname,setName)} type='text' name='ime' value={name}></input>
         {{nameMsg} && <span>{nameMsg}</span>}
       </div>
       <div className='reg-inputs'>
         <label><LuUserSquare2/> Prezime vlasnika</label>
         <input onChange={e =>  checkk(e,rname,setLastName)} type='text' name='prezime' value={lastname}></input>
         {{lastnameMsg} && <span>{lastnameMsg}</span>}
       </div>
       <div className='reg-inputs'>
         <label><MdOutlineMailOutline/> Email</label>
         <input onChange={e =>  checkk(e,remail,setEmail)} type='email' name='email' value={email}></input>
         {{emailMsg} && <span>{emailMsg}</span>}
       </div>
   
       <div className='reg-inputs'>
         <label><FaPhoneAlt/> Broj telefona</label>
         <input onChange={e =>  checkk(e,rtel,setPhoneNumber)} type='text' name='phone' value={phoneNumber}></input>
         {{phoneNumberMessage} && <span>{phoneNumberMessage}</span>}
       </div>
       <div className='reg-inputs'>
         <label><FaUser/> Izaberite korisničko ime</label>
         <input onChange={e =>  checkk(e,rusername,setUserName)} type='text' name='username' value={userName}></input>
         {{usernameMsg} && <span>{usernameMsg}</span>}
       </div>
       <div className='reg-inputs'>
         <label><RiLockPasswordLine/> Lozinka</label>
         <input onChange={e =>  checkk(e,rpassword,setPassword)} type='password' name='password' value={password}></input>
         {{passwordMsg} && <span>{passwordMsg}</span>}
         <span id='warningpassword'>Lozinka mora sadržati slova,brojeve i jedan specijalan znak.</span>

       </div>
       {loading && <p>Registracija je u toku...</p>}
       
       <div id='bns'>
       <input id='num' name='num' value={randomNum} readOnly></input>
       <button type='submit' >Registracija vlasnika</button>
       </div>
      </form>
      </div>
     
    </div>
  )
}

export default RegistracijaRest
