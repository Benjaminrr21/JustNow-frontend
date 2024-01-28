
 import React, { useState } from 'react'
import './Validations/validationsRegex'
import {rname,remail,rpassword,rusername, rtel, rworkingtime, raccnumber, rpib} from "./Validations/validationsRegex"

const Proba = () => {
   //const rname = new RegExp('^[A-Z]{1}[a-z]+$')
    const [name,setName] = useState("");
    const Provera = () => {
        if(rpib.test(name)) alert("Uspesno!");
        else alert("Unesite ponovo");
    }
  return (
    <div>
      <input type='text' value={name} onChange={(e)=>setName(e.target.value)} type='text'></input>
      <button onClick={Provera}>Provera</button>
    </div>
  )
}

export default Proba 
