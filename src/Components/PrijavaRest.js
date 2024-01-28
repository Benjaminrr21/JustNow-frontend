import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import {LoginUserContext} from './Context/LoginUserContext'
import './Styles/Prijava.css'
import {FaBuilding} from 'react-icons/fa'
const PrijavaRest = () => {
 const [naziv,setNaziv] = useState("");
 const [nazivMsg,setNazivMsg] = useState("");
 const [pib,setPib] = useState("");
 const [pibMsg,setPibMsg] = useState("");
 const [error,setError] = useState("");

 const [username,setUsername] = useState("");
 const [usernameMsg,setUsernameMsg] = useState("");
 const [password,setPassword] = useState("");
 const [passwordMsg,setPasswordMsg] = useState("");

 const {owner,setOwnerFunction} = useContext(LoginUserContext);
 const [izaberiRest,setIzaberiRest] = useState(false);
 const [rests,setRests] = useState([]);
 const [buttonContent,setButtonContent] = useState("Dalje");
 const navigate = useNavigate();

  const GetRestaurantsOfOwner = async (id) => {
  try {
   const niz = await axios.get(`https://benjamin002-001-site1.jtempurl.com/GetRestaurantsOfOwner/${id}`)
   setRests(niz.data);
   setIzaberiRest(true);
   setButtonContent("Prijavi se")
  }
  catch(e){
  console.log("Error",e);
  }
} 

  const LoginOwner = async () => {
  if(buttonContent == "Prijavi se"){
     navigate(`/prikazrestorana/${(rests.find(x => x.name == document.getElementById("nr").value).id)}`);
     localStorage.setItem("IdRest",rests.find(x => x.name == document.getElementById("nr").value).id);
    }
     try {
     const resp = await axios.post("https://benjamin002-001-site1.jtempurl.com/LoginOwner", {
      username,
      password
    });
    const owner = resp.data;
    console.log(resp);
    console.log(owner);
    axios.defaults.headers.common['Authorization'] = `Bearer ${owner.token}`;
   //alert(owner.owner.id);
 
   localStorage.setItem("Vlasnik restorana",JSON.stringify(owner));
   //localStorage.setItem("User",JSON.stringify(owner));
   localStorage.setItem("Restoran",naziv);
   setError("");
   
   setOwnerFunction(owner);
    GetRestaurantsOfOwner(owner.owner.id);

   
   }
   catch(e){
     console.log("Error",e);
     setError("Korisničko ime ili lozinka su nepravilno uneti.");
   } 
 }
  

 const Navigatee = () => {
   alert(naziv)
   //alert(rests.find(x => x.name == "Best").id);
 }

  return (
    <div id='main'>
      <div id='login-content'>
        
        <h1>Prijavi svoj restoran i uspesno posluj na JustNow!</h1>
        <p>Najpre unesite podatke o vlasniku restorana</p>
      {/*   <div className='login-inputs'>
          <label>Naziv restorana</label>
          <input onInput={removeSpan} onChange={e => setUsername(e.target.value)} value={username} type='text' name='username'></input>
          {{usernameMsg} && <span>{usernameMsg}</span>}
        </div> */}
        <div className='login-inputs'>
          <label>Korisnicko ime vlasnika</label>
          <input onChange={e => setUsername(e.target.value)} value={username} type='text' name='un'></input>
          {{usernameMsg} && <span>{usernameMsg}</span>}
        </div>
        <div className='login-inputs'>
          <label>Lozinka</label>
          <input onChange={e => setPassword(e.target.value)} value={password} type='password' name='pw'></input>
          {{passwordMsg} && <span>{passwordMsg}</span>}
        </div>
        {izaberiRest && 
        <div className='login-inputs'>
          <label>Izaberite jedan od vasih restorana</label>
          <select onChange={e => setNaziv(e.target.value)} value={naziv}  id='nr'>
            {rests.map(r => <option value={r.name} key={r.id}>{r.name}</option>)}
          </select>
          
        </div>}
        {error!="" && <span>{error}</span>}

        <button  onClick={LoginOwner}>{buttonContent}</button>
        <button onClick={()=>navigate("/registracijarest")}><FaBuilding/> Registruj svoj restoran</button>
        
        
      </div>
    </div>
  )
}

export default PrijavaRest
