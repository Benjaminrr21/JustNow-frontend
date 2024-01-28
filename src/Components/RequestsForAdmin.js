import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import "./Styles/Requests.css"
import Request from './Request'
import { message } from 'antd'
import { LoginUserContext } from './Context/LoginUserContext'

const RequestsForAdmin = () => {
    const [requests,setRequests] = useState([]);
    const [owner,setOwner] = useState({});
    const [messageNot,setMessageNot] = useState("");
    const {req,setRequestFunction,notif,setNotifFunction} = useContext(LoginUserContext);
    const [loading,setLoading] = useState(false);
    
    //alert(owner);

   /*  const GetRequests = async () => {
        console.log("Sending...");

        try {
            const arr = await axios.get("https://localhost:7224/GetRestaurantsOnWaiting");
            console.log(arr);
            setRequests(arr.data);
            }
            catch(e){
                console.log("Error",e);
            }
    }

    useEffect(()=>GetRequests,[]); */
    useEffect(() => {
        setLoading(true);
        //GetOwner();
        axios.get("https://benjamin002-001-site1.jtempurl.com/GetRestaurantsOnWaiting")
        .then(resp => {
            console.log(resp.data);
            setRequests(resp.data);
            setLoading(false);
            if(resp.data.length == 0) setMessageNot("Nema novih zahteva.");
            //alert(niz.length)
        }) 
        .catch(error => console.log(error))
        
        setNotifFunction("");
        
    },[])
    /* const GetOwner = async () => {
        try{
        const obj = await axios.get(`https://localhost:7224/GetOwnerById/12`)
        console.log(obj);
        const o = obj.data;
        //setOwner(o);
        }
        catch(e){
            console.log("Error",e);
        }
    }
    useEffect(()=>GetOwner,[]); */
  return (
    <div id='outreq'>
      {/* {requests.length == 0 && <p>Nema novih zahteva restorana.</p>} */}
      
          <h1>Zahtevi za registraciju restorana</h1>
          <p>{messageNot}</p>
       { requests.map(r => <Request key={r.id} data={r.id} pib={r.pib} name={r.name} about={r.about} ownerId={r.ownerId}></Request>) }
    </div>
  )
}

export default RequestsForAdmin
