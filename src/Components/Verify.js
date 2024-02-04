import React, { useContext, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { SHA256, enc } from 'crypto-js';
import { LoginUserContext } from './Context/LoginUserContext';
import axios from 'axios';
import './Styles/Verify.css'

const Verify = () => {
    const {uo,hn,n,l,e,pn,u,p} = useParams();
    const [num,setNum] = useState("");
    const [spanMsg,setSpanMsg] = useState("");
    const navigate = useNavigate();
    const {currentUser,setUserFunction,owner,setOwnerFunction} = useContext(LoginUserContext);

    const check = async () => {
        alert(typeof(ln));
        if(!num) {
            setSpanMsg("Niste uneli kod.");
            return;
        }
        const hash = SHA256(num.toString());
    ///hash.update(newRandomNumber.toString());
    const hashString = hash.toString(enc.Hex);
    
        if(hashString == hn) {
          if(uo == 'user'){
            try{
                //setLoading(true);
                //console.log(name,lastname,email,username,password)
              const resp = await axios.post("https://benjamin002-001-site1.jtempurl.com/RegisterUser",
              {
              firstName: n,
              lastName: l,
              email: e,
              phoneNumber: pn,
              birthDate: "",
              username: u,
              password: p
              }
              );
              //setLoading(false);
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
              alert("Uspesna registracija.");

                setTimeout(() => {
                navigate("/prijava");    
            }, 1500);
              //navigate("/homepage");
            }
            catch(e){
              console.log("Error: ",e);
            }
          }
          else {
            try {
              const owner = await axios.post("https://benjamin002-001-site1.jtempurl.com/RegisterOwner", {
                firstName: n,
                lastName: l,
                email: e,
                phone: pn,
                username: u,
                password: p
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
        else {
            setSpanMsg("Nije uspela registracija");
            setTimeout(() => {
                navigate("/registracija");    
            }, 1500);
            
        }
    }
  return (
    <div id='reg-btn'>
      {/* <p>{hn}</p>
      <p>{n}</p>
      <p>{ln}</p>
      <p>{e}</p>
      <p>{pn}</p>
      <p>{u}</p>
      <p>{p}</p> */}
      <div id='reg2-btn'>
          <p>Kod za verifikaciju je poslat na imejl adresu {e}.</p>
      <input type='text' placeholder='Unesite dobijeni kod...' onChange={(e)=>setNum(e.target.value)}></input>
      <button onClick={()=>check()}>Registruj se</button>
      {spanMsg && <span>{spanMsg}</span>}
    </div>
    </div>
  )
}

export default Verify
