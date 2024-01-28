import { type } from '@testing-library/user-event/dist/type';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { LoginUserContext } from './Context/LoginUserContext';
import './Styles/MojRacun.css'
import * as signalR from '@microsoft/signalr'
import { raccnumber } from './Validations/validationsRegex';

const MojRacun = () => {

  const [mojRacun,setMojRacun] = useState([]);
  const [user,setUser] = useState("");
  const {id} = useParams();
  const [ukupno,setUkupno] = useState();
  const {racun,setRacunFunction} = useContext(LoginUserContext);
  const [acc,setAcc] = useState(false);
  const [connection, setConnection] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const [notificate,setNotificate] = useState(false);
  const [acn,setAcn]  = useState("");
  
  //const [myOrders,setMyOrders] = useState([]);

  useEffect(() => {
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://benjamin002-001-site1.jtempurl.com/adminNotificationHub') // Update with your API URL
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);

    newConnection
      .start()
      .then(() => console.log('SignalR Connected'))
      .catch((error) => console.error('SignalR Connection Error: ', error));

    newConnection.on('OrderDelivered', (receivedMessage) => {
      setMessage(receivedMessage);

      
     
    });
    return () => {
      newConnection.stop();
    };
  }, []);
 /*  const getMyOrders = async () => {
    console.log("Wait...");
    try {
      const niz = await axios.get(`https://localhost:7224/GetMyOrders/${id}`)
      const o = niz.data;
      console.log(niz);
      setMojRacun(o);
    }
    catch(e){
      console.log("Error",e);
    }
  } */
  useEffect(()=>{
   ///alert()
    setMojRacun(JSON.parse(localStorage.getItem("Moj racun")));
    setUser(JSON.parse(localStorage.getItem("User")).user.username);
    //alert((mojRacun[0]));
  },[]);
  //alert(mojRacun.length)
  //niz = JSON.parse(localStorage.getItem("Moj racun"));
  //setRacunFunction(niz);
  //useEffect(()=>alert(niz[0].proizvod),[]);

  const Naruci = async () => {
    if(acc == true && (!raccnumber.test(acn) || acn.trim().length == 0)) {
      alert("Nije unet broj računa.");
      return;
    }
    setMojRacun([]);
    localStorage.removeItem("Moj racun");
   //alert(typeof(mojRacun[0]))
     try{
    for (let i=0;i<mojRacun.length;i++) {
     
       const data = await axios.post("https://benjamin002-001-site1.jtempurl.com/AddNewOrder",{
        restaurantId:mojRacun[i].restaurantId,
        userId: mojRacun[i].userId,
        name: mojRacun[i].name,
        amount: mojRacun[i].amount,
        orderDate: mojRacun[i].orderDate,
        price: mojRacun[i].price,
        status: false
      }); 
      console.log("Item successfully added!");
    }
    console.log("All items successfully added!!!");

    setNotificate(true);
    
  }
  catch(e){
    console.log("Error",e);
  } 
  }
  const FindSum = () => {
    var sum = 0;
    for(let i=0;i<mojRacun.length;i++){
      sum += mojRacun[i].price*mojRacun[i].amount;
    }
    setUkupno(sum);
  }

  useEffect(()=>{FindSum();},[mojRacun])
    const Delete = (id) => {
    const filt = mojRacun.filter(x => x.id != id);
    setMojRacun([...filt]);
    localStorage.removeItem("Moj racun");
    }
  return (
    <div id='mojracun'>
      {mojRacun != [] && <p>Korisnik: {user}</p>}
        {mojRacun  && <table>
         <tbody>
           <tr>
             <th>Restoran</th>
             <th>Proizvod</th>
             <th>Kolicina</th>
             <th>Cena proizvoda</th>
             <th>Ukupno</th>
           </tr>
           {mojRacun.map(item => <tr key={item.id}>
             <td>{item.restoran}</td>
             <td>{item.name}</td>
             <td>{item.amount}</td>
             <td>{item.price} din</td>
             <td>{item.price*item.amount} din</td>
             <td onClick={()=>Delete(item.id)}><span id='x'>X</span></td>
           </tr>)}
           <tr><td/><td/><td/><td>Ukupan iznos:</td><td>{ukupno}</td></tr>
           <tr><td/><td/><td></td></tr>
         </tbody>
       </table>
       }
       <p>Unesite lokaciju:</p>
       <input id='loc' type='text' ></input>
       <label>Izaberi način plaćanja</label>
       <label onClick={()=>setAcc(false)}>Uzivo</label>
       <label onClick={()=>setAcc(true)}>Karticom</label>
       {acc && <input type='text' value={acn} onChange={(e)=>setAcn(e.target.value)} id='loc' placeholder='Unesite broj kartice u formatu: xxx-xxxxxxxxxxxxx-xx'></input>}
       <button onClick={()=>Naruci()}>Naruci</button>

       {notificate && <h2>Porudzbine su poslate. Ubrzo ocekujte vasu hranu. Vas JustNow!</h2>}
    </div>
  )
}

export default MojRacun
