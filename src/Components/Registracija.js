import axios from 'axios';
import React from 'react'
import { useContext, useState } from 'react'
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

  const {currentUser,setUserFunction,admin,setAdminFunction} = useContext(LoginUserContext);
  
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
    //e.preventDefault();
    
    //alert("Uspesno");
    
   try{
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
 // localStorage.setItem(userr.role.name,JSON.stringify(userr));
    if(userr.role.name == "Admin") {
    localStorage.setItem("Admin",JSON.stringify(userr));
  } 
  setUserFunction(userr);
  navigate("/homepage");
}
catch(e){
  console.log("Error: ",e);
}
    
    // e.preventDefault();
     //console.log(`${name} ${lastname} ${email} ${datum} ${username} ${password}`); 
  //}
}
   }
  return (
    <div id='reg-container'>
      <div id='reg-container-main'>
       {/*  <button onClick={()=>navigate("/registracijarest")}><FaBuilding/> Registruj svoj restoran</button> */}
       <h1>Registracija</h1>
      
       <div className='reg-inputs'>
         <label><LuUserSquare2/> Ime</label>
         <input placeholder='' onChange={e => {setName(e.target.value);}} type='text' name='ime' value={name}></input>
         {{nameMsg} && <span>{nameMsg}</span>}
       </div>
       <div className='reg-inputs'>
         <label><LuUserSquare2/> Prezime</label>
         <input  onChange={e => setLastName(e.target.value)} type='text' name='prezime' value={lastname}></input>
         {{lastnameMsg} && <span>{lastnameMsg}</span>}
       </div>
       <div className='reg-inputs'>
         <label><MdOutlineMailOutline/> Email</label>
         <input onChange={e => {setEmail(e.target.value);}}  type='email' name='email' value={email}></input>
         {{emailMsg} && <span>{emailMsg}</span>}
       </div>
       {/* <div className='reg-inputs'>
         <label>Datum rodjenja</label>
         <input onChange={e => setDatum(e.target.value)} type='date' name='datum' value={datum}></input>
         {{datumMsg} && <span>{datumMsg}</span>}
       </div> */}
       <div className='reg-inputs'>
         <label><FaPhoneAlt/> Broj telefona</label>
         <input onChange={e => setPhoneNumber(e.target.value)} type='text' name='phone' value={phoneNumber}></input>
         {{phoneNumberMessage} && <span>{phoneNumberMessage}</span>}
       </div>
       <div className='reg-inputs'>
         <label><FaUser/> Izaberite korisnicko ime</label>
         <input onChange={e => setUserName(e.target.value)} type='text' name='username' value={username}></input>
         {{usernameMsg} && <span>{usernameMsg}</span>}
       </div>
       <div className='reg-inputs'>
         <label><RiLockPasswordLine/> Lozinka</label>
         <input onChange={e => setPassword(e.target.value)} type='password' name='password' value={password}></input>
         {{passwordMsg} && <span>{passwordMsg}</span>}
       </div>
       {loading && <p>Registracija je u toku...</p>}
       <button onClick={()=>Provera()} >Registruj se</button>
       
      </div>
    </div>
  )

}

export default Registracija
