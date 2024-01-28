import React, { useContext, useEffect, useState } from 'react';
import * as signalR from '@microsoft/signalr';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './Styles/MyOrders.css';
import OrderCard from './OrderCard';
import { LoginUserContext } from './Context/LoginUserContext';

const MyOrders = () => {
  const [connection, setConnection] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const [myOrders,setMyOrders] = useState([]);
  const [notMess,setNotMess] = useState(false);
  const {notif,setNotifFunction} = useContext(LoginUserContext);

  const {id} = useParams();

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

    newConnection.on('NewOrderArrived', (receivedMessage) => {
      setMessage(receivedMessage);
      setNotifFunction("Imate nove proudzbine!");
     
    });
  
   


    return () => {
      newConnection.stop();
    };
  }, []);
  useEffect(() => {
    axios.get(`http://benjamin002-001-site1.jtempurl.com/GetOrdersOfRestaurant/${id}`)
    .then(myorders => {
        console.log(myorders.data);
        if(myorders.data == "Nema novih porudzbina.") {setNotMess(true); }
        
        else  setMyOrders(myorders.data);
        //alert(niz.length)
    })
    .catch(error => console.log("error"))
},[])
   const GetMyOrders = async () => {
    try {
        const myorders = await axios.get("https://localhost:7224/GetOrdersOfRestaurant/1045")
        const o = myorders.data;
        console.log(myorders);
        setMyOrders(o);
        setNotifFunction("");
    }
    catch(e){
        console.log("Error",e);
    }
}
  useEffect(()=>GetMyOrders,[]); 


 /*  const ReceiveNotification = async () => {
      const mess = await axios.get("https://localhost:7224/sendTestMessage");
      //setMessage(mess);
      console.log(mess);
  } */
  const Remove = (orderId) => {
    const updatedOrders = myOrders.filter((order) => order.id !== orderId);
    setMyOrders(updatedOrders);
  }
 //alert(notMess)

  return (
    <div id='orders'>
      
        {notMess && <h1>Nema novih porudzbina.</h1>}

        {!notMess && 
          <div id='orders-items'>
          
            <h1>Narudzbine</h1>
            
             {myOrders.map((order) => <OrderCard niz={myOrders} key={order.id} data={order.id}
            name={order.name}
            amount={order.amount}
            price={order.price}
            user={order.userId}
            date={order.orderDate}
            onClickNaruci={Remove}
            />)}
          </div>}
    
         
        </div>
  );
};

export default MyOrders;
