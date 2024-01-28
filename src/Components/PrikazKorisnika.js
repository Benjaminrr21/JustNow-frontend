import React, { useEffect, useState } from 'react'
import './Styles/PrikazKorisnika.css';
import axios from 'axios'

function PrikazKorisnika() {
    const [users,setUsers] = useState([]);
    const VratiKorisnike = 
    useEffect(() => {
        try{
        axios.get("http://benjamin002-001-site1.jtempurl.com/GetAllUsers")
        .then(resp => { 
            console.log(resp.data);
            setUsers(resp.data);
         }
        );
        }
        catch(e) {
        console.log("Error ",e);
        }
},[])
  return (
    <div id='outer'>
        <h2>Korisnici aplikacije JustNow</h2>
        <div id='outer2'>
        <div id='contentt'>
            <table>
                <tbody>
                <tr id='first'>
                    <th>Ime</th>
                    <th>Prezime</th>
                    <th>Broj telefona</th>
                    <th>Email</th>
                    <th>Korisnicko ime</th>
                </tr>
                {users.map(user => <tr className='others' key={user.Id}>
                    <td key={user.Id}>{user.firstName}</td>
                    <td key={user.Id}>{user.lastName}</td>
                    <td key={user.Id}>{user.phoneNumber}</td>
                    <td key={user.Id}>{user.email}</td>
                    <td key={user.Id}>{user.username}</td>
                    </tr>)}
            </tbody>
            </table>
        </div>
        </div>
    </div>
  )
}

export default PrikazKorisnika
