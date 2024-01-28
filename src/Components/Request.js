import axios from 'axios'
import React, { useEffect, useState } from 'react'
import adminNotificationHub from './createOwnerNotificationConnection'
import './Styles/Requests.css'


const Request = (props) => {
    const [owner,setOwner] = useState(null);
    
    //Iz propsa izvlacimo id vlasnika i pozivamo funckiju GetOwnerById...koja nam vraca objekat Owner
    const GetOwner = async () => {
      
        try{
        const obj = await axios.get(`https://benjamin002-001-site1.jtempurl.com/GetOwnerById/${props.ownerId}`)
        console.log(obj);
        const o = obj.data;
        setOwner(o);
        }
        catch(e){
            console.log("Error",e);
        }
    }
    //useEffect(()=>GetOwner,[]);
    const acceptRequest = async (ownerId) => {
      //console.log("eee")
      // Update the status of the registration request in the database
      try {
      const ob = await axios.put(`https://benjamin002-001-site1.jtempurl.com/UpdateStatus/${ownerId}`);
      console.log(ob);
      //alert("Uspesno");
      //await api.updateRegistrationRequest(requestId, { status: 'Accepted' });
      }
      catch(e){
        console.log("Error",e);
      }
      // Notify the owner using SignalR
      //adminNotificationHub.invoke('SendNotification', ownerId, 'Your restaurant registration has been accepted');
  };
  const removeRequest = async (ownerId) => {
    try {
      const ob = await axios.delete(`https://benjamin002-001-site1.jtempurl.com/DeleteRestaurant/${ownerId}`);
      console.log(ob);
      //alert("Uspesno");
      //await api.updateRegistrationRequest(requestId, { status: 'Accepted' });
      }
      catch(e){
        console.log("Error",e);
      }
  };
  
  /* useEffect(()=>{if(owner) GetOwner();},[owner]); */

  return (
    <div id='inreq'>
       <p>Poreski identifikacioni broj (PIB):</p><span>{props.pib}</span>
       <p>Naziv restorana:</p><span>{props.name}</span>
       <p>Opis:</p><span>{props.about}</span>
       <br></br>
       <br></br>
       {/*  <h3>Podaci o vlasniku</h3>
        <p>Ime:</p><span>{owner.firstName}</span> 
       <p>Prezime:</p><span>{owner.lastName}</span>
       <p>Email:</p><span>{owner.email}</span>
       <p>Broj telefona:</p><span>{owner.phone}</span> */} 
      <br></br>
      <br></br>
       <button onClick={()=>acceptRequest(props.data)}>Odobri zahtev</button>
       <button onClick={()=>removeRequest(props.data)}>Ponisti zahtev</button>

    </div>
  )
}

export default Request
