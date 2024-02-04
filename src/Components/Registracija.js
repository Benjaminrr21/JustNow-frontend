import axios from 'axios';
import React from 'react'
import { useContext, useState, useEffect,useRef } from 'react'
import { FaBuilding } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../App'
import './Styles/Registracija.css'
import {rname,remail,rpassword,rusername, rtel} from "./Validations/validationsRegex"
import { LoginUserContext } from './Context/LoginUserContext';
import { FaUser,FaPhoneAlt } from 'react-icons/fa';
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { LuUserSquare2 } from "react-icons/lu";
import CheckableTag from 'antd/es/tag/CheckableTag';
import { SHA256, enc } from 'crypto-js';
import emailjs from '@emailjs/browser'


const  Registracija = ()=> {
  //const {username, setUsername} = useContext(MyContext);
  const [name,setName] = useState("");
  const [nameMsg,setNameMsg] = useState("");

  const [lastname,setLastName] = useState("");
  const [lastnameMsg,setLastNameMsg] = useState("");
  
  const [email,setEmail] = useState("");
  const [emailMsg,setEmailMsg] = useState("");
  
  const [datum,setDatum] = useState("");
  const [datumMsg,setDatumMsg] = useState("");
  
  const [username,setUserName] = useState("");
  const [usernameMsg,setUserNameMsg] = useState("");
  
  const [password,setPassword] = useState("");
  const [passwordMsg,setPasswordMsg] = useState("");

  const [phoneNumber,setPhoneNumber] = useState("");
  const [phoneNumberMessage,setPhoneNumberMessage] = useState("");

  const navigate = useNavigate();
  const [loading,setLoading] = useState(false);

  const [hashNum,setHashNum] = useState("");
  const [randomNum,setRandomNum] = useState("");

  const {currentUser,setUserFunction,admin,setAdminFunction} = useContext(LoginUserContext);
  
  const form = useRef();

  const Validate = () => {
    //alert("a");
    if(!rname.test(name) || name.trim().length == 0){
      setNameMsg("Ime nije uneto");
   //   return ;
   }
   //else setNameMsg("");
   if(lastname.trim() == 0 || !rname.test(lastname)){
    setLastNameMsg("Prezime nije uneto");  }
   //else setLastNameMsg("");

   if(email.trim().length == 0 || !remail.test(email)){ setEmailMsg("Email nije unet"); }
   //else setEmailMsg("");
   // if(datum.trim().length == 0){ setDatumMsg("Datum nije unet"); return;}
   if(phoneNumber.trim().length == 0 || !rtel.test(phoneNumber)){ setPhoneNumberMessage("Nepravilan unos");} 
   if(username.trim().length == 0 || !rusername.test(username)){ setUserNameMsg("Korisnicko ime nije uneto");  }
 // else setUserNameMsg("");
   if(password.trim().length == 0 || !rpassword.test(password)){ setPasswordMsg("Lozinka nije uneta"); }
   //else setPasswordMsg("");

  // Provera();
  }
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
 
  
   const Provera = async () => {
     /* if(!name || !lastname || !email || !username ||!phoneNumber || !password) return;
     else Validate();
    if(nameMsg != "" || lastnameMsg != "" || usernameMsg != "" || phoneNumberMessage != "" || emailMsg != "" || passwordMsg != "") return; */
    if(!rname.test(name) || name.trim().length == 0){
      setNameMsg("Ime nije uneto");
   //   return ;
   }
   //else setNameMsg("");
   if(lastname.trim() == 0 || !rname.test(lastname)){
    setLastNameMsg("Prezime nije uneto");  }
   //else setLastNameMsg("");

   if(email.trim().length == 0 || !remail.test(email)){ setEmailMsg("Email nije unet"); }
   //else setEmailMsg("");
   // if(datum.trim().length == 0){ setDatumMsg("Datum nije unet"); return;}
   if(phoneNumber.trim().length == 0 || !rtel.test(phoneNumber)){ setPhoneNumberMessage("Nepravilan unos");} 
   if(username.trim().length == 0 || !rusername.test(username)){ setUserNameMsg("Korisnicko ime nije uneto");  }
 // else setUserNameMsg("");
   if(password.trim().length == 0 || !rpassword.test(password)){ setPasswordMsg("Lozinka nije uneta"); }
    
   else{
     //generateRandomNumber();
    alert(hashNum)
    console.log(hashNum);
     navigate(`/verify/${hashNum}/${name}/${lastname}/${email}/${phoneNumber}/${username}/${password}`)
    
  /* try{
    setLoading(true);
    console.log(name,lastname,email,username,password)
  const resp = await axios.post("https://benjamin002-001-site1.jtempurl.com/RegisterUser",
  {
  firstName: name,
  lastName: lastname,
  email: email,
  phoneNumber: phoneNumber,
  birthDate: datum,
  username: username,
  password: password
  }
  );
  setLoading(false);
  console.log(resp);

  const userr = resp.data;
   console.log(resp);
   console.log(userr);
   axios.defaults.headers.common['Authorization'] = `Bearer ${userr.token}`;
  
    localStorage.setItem("User",JSON.stringify(userr));
 
    if(userr.role.name == "Admin") {
    localStorage.setItem("Admin",JSON.stringify(userr));
  } 
  setUserFunction(userr);
  navigate("/homepage");
}
catch(e){
  console.log("Error: ",e);
}*/
    
    // e.preventDefault();
     //console.log(`${name} ${lastname} ${email} ${datum} ${username} ${password}`); 
  //}
}
   }
   
   const checkk = (e,valid,sett) => {
     sett(e.target.value);
      if(!valid.test(e.target.value)){
       e.currentTarget.style.backgroundColor = 'darksalmon';
     } 
     else {
      e.currentTarget.style.backgroundColor = 'darkseagreen';

     }
   }
   useEffect(()=>{
    setHashNum(generateRandomNumber());
   },[])
   const Provera2 = () => {
     if(!name || !lastname || !email || !phoneNumber || !username || !password){

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
       navigate(`/verify/user/${hashNum}/${name}/${lastname}/${email}/${phoneNumber}/${username}/${password}`)
    }
    else{} return; 
  }
  return (
    <div id='reg-container'>
      
      <div id='reg-container-main'>
       {/*  <button onClick={()=>navigate("/registracijarest")}><FaBuilding/> Registruj svoj restoran</button> */}
       <h1>Registracija</h1>
        <form ref={form} onSubmit={Provera2}>
       <div className='reg-inputs'>
         <label><LuUserSquare2/> Ime</label>
         <input placeholder='' name='name' onChange={e =>  checkk(e,rname,setName)} type='text'  value={name}></input>
         {{nameMsg} && <span>{nameMsg}</span>}
       </div>
       <div className='reg-inputs'>
         <label><LuUserSquare2/> Prezime</label>
         <input  onChange={e => checkk(e,rname,setLastName)} type='text' name='prezime' value={lastname}></input>
         {{lastnameMsg} && <span>{lastnameMsg}</span>}
       </div>
       <div className='reg-inputs'>
         <label><MdOutlineMailOutline/> Email</label>
         <input name='email' onChange={e => checkk(e,remail,setEmail)}  type='email' name='email' value={email}></input>
         {{emailMsg} && <span>{emailMsg}</span>}
       </div>
       {/* <div className='reg-inputs'>
         <label>Datum rodjenja</label>
         <input onChange={e => setDatum(e.target.value)} type='date' name='datum' value={datum}></input>
         {{datumMsg} && <span>{datumMsg}</span>}
       </div> */}
       <div className='reg-inputs'>
         <label><FaPhoneAlt/> Broj telefona</label>
         <input onChange={e => checkk(e,rtel,setPhoneNumber)} type='text' name='phone' value={phoneNumber}></input>
         {{phoneNumberMessage} && <span>{phoneNumberMessage}</span>}
       </div>
       <div className='reg-inputs'>
         <label><FaUser/> Izaberite korisnicko ime</label>
         <input onChange={e => checkk(e,rusername,setUserName)} type='text' name='username' value={username}></input>
         {{usernameMsg} && <span>{usernameMsg}</span>}
       </div>
       <div className='reg-inputs'>
         <label><RiLockPasswordLine/> Lozinka</label>
         <input onChange={e => checkk(e,rpassword,setPassword)} type='password' name='password' value={password}></input>
         {{passwordMsg} && <span>{passwordMsg}</span>}
         <span id='warningpassword'>Lozinka mora sadržati slova,brojeve i jedan specijalan znak.</span>
       </div>
       {loading && <p>Registracija je u toku...</p>}
       <div id='bns'>
         <input id='num' name='num' value={randomNum} readOnly></input>
       <button type='submit'>Registruj se</button>
       
       </div>
       </form>
      </div>
    </div>
  )

}

export default Registracija
