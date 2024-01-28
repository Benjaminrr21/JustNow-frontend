import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react'
import * as signalR from '@microsoft/signalr';
import { useNavigate, useParams } from 'react-router-dom'
import { LoginUserContext } from './Context/LoginUserContext';
import './Styles/Order.css'

const Order = () => {
    const {rid,rest,prod,cena} = useParams();
    const [amount,setAmount] = useState(1);
    const navigate = useNavigate();
    const [connection,setConnection] = useState(null);
    const [message,setMessage] = useState("");
    const [listen,setListen] = useState(false);
    const [novaCena,setNovaCena] = useState(cena);

    const {racun,setRacunFunction} = useContext(LoginUserContext);

    useEffect(() => {
        const newConnection = new signalR.HubConnectionBuilder()
          .withUrl('http://benjamin002-001-site1.jtempurl.com/adminNotificationHub') // Update with your API URL
          .withAutomaticReconnect()
          .build();
    
        setConnection(newConnection);
    
        newConnection
          .start()
          .then(() => console.log('SignalR Connected'))
          .catch((error) => console.error('SignalR Connection Error: ', error));
    
          if(listen) {
        newConnection.on('ReceiveMessage', (receivedMessage) => {
          setMessage(receivedMessage);
        });
    }
    
        return () => {
          newConnection.stop();
        };
      }, []);

      useEffect(()=>{setNovaCena(amount*cena)},[amount]);

    const Naruci = async () => {
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString();

        //alert(JSON.parse(localStorage.getItem("Prijavljeni kkorisnik")).role.name)
        const item = {
            restoran:rest,
            restaurantId:parseInt(rid),
            userId: parseInt(JSON.parse((localStorage.getItem("User"))).user.id),
            name: prod,
            amount: parseInt(amount),
            orderDate: formattedDate,
            price:parseInt(novaCena),
            status: false
        }
    
      
        localStorage.setItem("Moj racun",JSON.stringify([...racun,item]));
        setRacunFunction(item);
        console.log(racun);

         
         /*try{
         const ord = await axios.post("https://localhost:7224/AddNewOrder",{
            restaurantId:parseInt(rid),
            userId: parseInt(JSON.parse(localStorage.getItem("User")).user.id),
            name: prod,
            amount: amount,
            orderDate: formattedDate,
            price:parseInt(cena),
            status: false
        });
        console.log(ord); 
        setListen(true);
        //navigate(`/prikazrestorana/${rid}`)

    }
    catch(e){
        console.log("Error",e);
    }  */
    }

  return (
    <div id='order'>
      <div id='cont'>
        <h3>Naruci</h3>
        {listen && <p>Poruka: {message}</p>}
        <div id='order-main'>
            <div className='order-item'>
                <div>Restoran</div>
                <div>{rest}</div>
            </div>
            <div className='order-item'>
                <div>Proizvod</div>
                <div>{prod}</div>
            </div>
            <div className='order-item'>
                <div>Kolicina</div>
                <div><input value={amount} onChange={(e)=>{setAmount(e.target.value); setNovaCena(amount*cena);}} type='number' min={1} max={15}></input></div>
            </div>
            <div className='order-item'>
                <div>Cena porudzbine</div>
                <div>{novaCena}</div>
            </div>
            
            <div className='order-item-button'>
                <button onClick={()=>Naruci()}>Naruci</button>
            </div>
        </div>
       
      </div>
    </div>
  )
}

export default Order
