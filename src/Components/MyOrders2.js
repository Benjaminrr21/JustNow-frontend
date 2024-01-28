/* import { useEffect, useState } from 'react';
import * as signalR from '@microsoft/signalr';

const hubConnection = new signalR.HubConnectionBuilder()
    .withUrl('https://localhost:7224/adminNotificationHub') // Update with your API URL
    .withAutomaticReconnect()
    .build();

export const startConnection = async () => {
    try {
        await hubConnection.start();
        console.log('SignalR Connected');
    } catch (err) {
        console.error('SignalR Connection Error: ', err);
    }
};

export const addNotificationListener = (callback) => {
    hubConnection.on('ReceiveNotification', (notification) => {
        callback(notification);
    });
}; */
import React, { useEffect, useState } from 'react';
import './Styles/MyOrders.css';
import OrderCard from './OrderCard';
import { startConnection, addNotificationListener, hubConnection } from './path-to-signalr-service';


const MyOrders2 = () => {
  
  /* const [message,setMessage] = useState("");

  useEffect(() => {
    startConnection();

    addNotificationListener((notification) => {
        console.log('Notification received:', notification);
        setMessage(notification);
        // Handle the notification (e.g., show a toast)
    });

    return () => {
        // Clean up the SignalR connection if needed
        hubConnection.stop();
    };
}, []); */
const [newOrders, setNewOrders] = useState([]);

useEffect(() => {
  startConnection();

  addNotificationListener((notification) => {
    // Update new orders when a notification is received
    setNewOrders((prevOrders) => [...prevOrders, notification]);
  });

  return () => {
    // Clean up the SignalR connection if needed
    hubConnection.stop();
  };
}, []);

    


  return (
    <div>
    <h2>New Orders:</h2>
    <ul>
      {newOrders.map((order, index) => (
        <li key={index}>{order}</li>
      ))}
    </ul>
  </div>
  );
 /*  const [connection, setConnection] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const [myOrders,setMyOrders] = useState([]); */

  /* useEffect(() => {
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:7224/adminNotificationHub') // Update with your API URL
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);

    newConnection
      .start()
      .then(() => console.log('SignalR Connected'))
      .catch((error) => console.error('SignalR Connection Error: ', error));
    newConnection.invoke("getConnectionId")
    .then((connid)=>sessionStorage.setItem("ConnectionId",connid))
    .catch(e => console.log("Error"));

    var cid = sessionStorage.getItem('ConnectionId');
    newConnection.invoke("AddOrderNotification",)

    newConnection.on('AddOrder', (receivedMessage) => {
      setMessage(receivedMessage);

      
     
    });

    
    return () => {
        newConnection.stop();
      };
    }, []); */
    /* const GetMyOrders = async () => {
        try {
            const myorders = await axios.get("https://localhost:7224/GetOrdersOfRestaurant/1045")
            const o = myorders.data;
            console.log(myorders);
            setMyOrders(o);
        }
        catch(e){
            console.log("Error",e);
        }
    }

    useEffect(()=>GetMyOrders(),[]); */

    /* return (
        <div id='orders'>
          <div id='orders-items'>
               {myOrders.length == 0 && <h1>Nema novih porudzbina.</h1>}
            {myOrders.length > 0 && <h1>Narudzbine</h1>}
            
            {myOrders.map((order) => <OrderCard key={order.id} data={order.id}
            name={order.name}
            amount={order.amount}
            price={order.price}
            user={order.userId}
            date={order.orderDate}
            />)}
          </div>
    
         
        </div>
      ); */
}

export default MyOrders2