import React, { useEffect, useState } from 'react'
import './Styles/PrikazKorisnika.css';
import axios from 'axios'

function PrikazKorisnika() {
    const [users,setUsers] = useState([]);
    const [restaurants,setRestaurants] = useState([]);
    const [owners,setOwners] = useState([]);

    const VratiKorisnike = 
    useEffect(() => {
        try{
        axios.get("https://benjamin002-001-site1.jtempurl.com/GetAllUsers")
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
const getRestaurants = async () => {
     try {
        const rsts = await axios.get("https://benjamin002-001-site1.jtempurl.com/GetAllRestaurants");
        //const rsts = await axios.get("https://localhost:7224/GetAllRestaurants");
        console.log(rsts);
        setRestaurants(rsts.data);
      }
    catch(e){
        console.log("Error",e);
    }
}
const getOwners = async () => {
    try {
        const ows = await axios.get("https://benjamin002-001-site1.jtempurl.com/GetAllOwners");
        console.log(ows);
        setOwners(ows.data);
    }
    catch(e){
        console.log("Error",e);
    }
}
useEffect(()=>{
    getRestaurants();
    getOwners();
},[]);
  return (
      <div>
    <div id='outerr'>
        <h2>Korisnici aplikacije JustNow</h2>
        <div id='outer2'>
        <div id='contentt'>
            <table>
                <tbody>
                <tr id='firstrow'>
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
    <div id='outerr'>
        <h2>Restorani i vlasnici restorana aplikacije JustNow</h2>
        <div id='outer2'>
        <div id='contentt'>
            <table>
                <tbody>
                <tr id='firstrow'>
                    <th>PIB</th>
                    <th>Naziv</th>
                    <th>Ime vlasnika</th>
                    <th>Email vlasnika</th>
                    <th>Korisničko ime vlasnika</th>
                </tr>
                {restaurants.map(rest => <tr className='others' key={rest.Id}>
                    <td key={rest.Id}>{rest.pib}</td>
                    <td key={rest.Id}>{rest.name}</td>
                    <td key={rest.Id}>{(owners.find(x => x.id == rest.ownerId)).firstName}</td>
                    <td key={rest.Id}>{(owners.find(x => x.id == rest.ownerId)).email}</td>
                    <td key={rest.Id}>{(owners.find(x => x.id == rest.ownerId)).username}</td>
                    
                  
                    </tr>)}
            </tbody>
            </table>
        </div>
        </div>
    </div>
    </div>
  )
}

export default PrikazKorisnika
