import React, {useState,useContext} from 'react'
import { MyContext } from '../App';

export default function ChangingPage() {
    const {setUsername} = useContext(MyContext);
    const [newUsername,setNewUsername] = useState("");
  return (
    <div>
       
        <h2>Promenite svoje korisnicko ime:</h2>
        <input type='text' onChange={e => setNewUsername(e.target.value)}/>
        <button onClick={() => setUsername(newUsername)}>Promeni</button>
    
    </div>
  )
}
