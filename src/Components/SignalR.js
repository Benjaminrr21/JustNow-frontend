import React, { useEffect, useState } from 'react';
import * as signalR from '@microsoft/signalr';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './Styles/SignalR.css'

const NotificationComponent = () => {
  const [connection, setConnection] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const {idOwner} = useParams();

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

    

    newConnection.on('ReceiveRestaurantAcceptedNotification', (receivedMessage) => {
        setMessage(receivedMessage);
    });
  

    return () => {
      newConnection.stop();
    };
  }, []);

 /*  const ReceiveNotification = async () => {
      const mess = await axios.get("https://localhost:7224/sendTestMessage");
      //setMessage(mess);
      console.log(mess);
  } */

  return (
    <div id='signalr'>
      <h1>Vas zahtev je uspesno poslat. Bicete obavesteni o odobravanju zahteva.</h1>
      <h3>Vas JustNow!</h3>

      <p>Obavestenje ce biti prikazano ovde: {message}</p>
      <button onClick={()=>{navigate(`/unosproizvoda/${idOwner}`)}}>Unesi proizvode</button>
      {/* <button onClick={()=>ReceiveNotification()}>SEND</button> */}
    </div>
  );
};

export default NotificationComponent;
