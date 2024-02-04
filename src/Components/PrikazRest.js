import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Meni from './Meni';
import './Styles/PrikazRest.css'
import {FaLocationArrow, FaTimes, FaStopwatch} from 'react-icons/fa'
import {FaEdit} from 'react-icons/fa'
import ImageGallery, { CollapseComp } from './ImageGallery';
import { Photos } from './Photos';
import * as signalR from '@microsoft/signalr';
import { LoginUserContext } from './Context/LoginUserContext';


function PrikazRest() {
  const [Rest,setRest] = useState({});
  let {id} = useParams();
  const [mymeni,setMyMeni] = useState([]);
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();
  const [images,setImages] = useState([]);
  const [photo1,setPhoto1] = useState("");
  const [photo2,setPhoto2] = useState("");
  const {notif,setNotifFunction,req,setRequestFunction} = useContext(LoginUserContext);
  const [connection, setConnection] = useState(null);
  const [message, setMessage] = useState('');
  
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

     
      
    newConnection.on('NewOrderArrived', (receivedMessage) => {
      setMessage(receivedMessage);
      setNotifFunction("Imate nove proudzbine!");
      alert("Imate nove porudzbine.");
    });
  
  
 
    
    newConnection.on('ReceiveNotification', (receivedMessage) => {
      setMessage(receivedMessage);     
      setRequestFunction("Imate nove zahteve!");
    });
  
  
   


    return () => {
      newConnection.stop();
    };
  }, []);

  const GetRestaurantWithId = async () => {
   //alert("Waiting...")
    try{
      const resp = await axios.get(`https://benjamin002-001-site1.jtempurl.com/GetRestaurantById/${id}`);
      const respData = resp.data;
      setRest(resp.data);
      console.log(resp.data);
      }
      catch(e){
        console.log("Error",e);
      }
  }
  const GetMenu = async () => {
    setLoading(true);
    try {
    const niz = await axios.get(`https://benjamin002-001-site1.jtempurl.com/GetAllProductsOfRestaurant/${id}`);
    setMyMeni(niz.data);
    setLoading(false);
  }
    catch(e) {
      console.log("Error",e);
    }
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([GetRestaurantWithId(), GetMenu()]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
   

  }, []);

  const [dataFromChild, setDataFromChild] = useState(null);

  const handleDataFromChild = (data) => {
    // This function is called by the child component
    // Set the data received from the child in the state or perform any other action
    const filterMeni = mymeni.filter((item) => item.id != data);
    setMyMeni(filterMeni);
  };
  console.log(mymeni)
  //useEffect(()=>GetRestaurantWithId(),[]);
  //useEffect(()=>GetMenu(),[]);
  const makeRandomNumber = () => {
    const min = 0;
    const max = 4;
    const newRandomNumber1 = Math.floor(Math.random() * (max - min + 1)) + min;
    const newRandomNumber2 = Math.floor(Math.random() * (max - min + 1)) + min;
    setPhoto1(Photos[newRandomNumber1].url);
    setPhoto2(Photos[newRandomNumber2].url);
    console.log(newRandomNumber1);
    console.log(newRandomNumber2);
  }
  useEffect(()=>{
    setImages(Photos);
    
    makeRandomNumber();
  },[]);
  return (
    <div id='containerP'>
      <div id='contentRest'>
        {localStorage.getItem("Vlasnik restorana") && <button id='editt' onClick={()=>navigate(`/myorders/${parseInt(localStorage.getItem("IdRest"))}`)}>{notif && <span id='notif'>N</span>} PORUDŽBINE</button>}
        {localStorage.getItem("Vlasnik restorana") && <button id='editt' onClick={()=>navigate(`/editrest/${id}`)}><FaEdit/> Izmeni podatke o restoranu</button>}
        {localStorage.getItem("Vlasnik restorana") && <button id='editt' onClick={()=>navigate(`/unosproizvoda/${id}`)}><FaEdit/> Proširi svoj meni</button>}
        {localStorage.getItem("Vlasnik restorana") && <button id='editt' onClick={()=>navigate(`/unosrest/${JSON.parse(localStorage.getItem("Vlasnik restorana")).owner.id}`)}><FaEdit/> Unesi novi restoran</button>}
        <h1>RESTORAN {Rest.name}</h1>
        <p id='slogan'>{Rest.slogan}</p>
        <div id='first'>
      
           {/* <img src={Rest.urlPhoto}></img> */} 
          <ImageGallery s1={Rest.urlPhoto} s2={photo1} s3={photo2}/>
        
        
        <div id='infoss'>
          <CollapseComp title='O nama' content={Rest.about}/>
           <CollapseComp title='Lokacija' content={Rest.location}/>
           <CollapseComp title='Radno vreme' content={Rest.workingTime}/>
          {/* <p id='about'>{Rest.about}</p> */}
          {/* <h3><FaLocationArrow/> Lokacija: {Rest.location}</h3>
          <h3><FaStopwatch/> Radno vreme: {Rest.workingTime}</h3> */}
        </div>
        </div>

        
        <div id='menu'>
          
          <h1>MENI</h1>
          {loading && <p id='loading-text'>Meni se učitava...</p>}
          <Meni sendDataToParent={handleDataFromChild} rid={Rest.id} meni={mymeni} restoran={Rest.name}></Meni>
         {/*  <table>
            <tbody>
              <tr></tr>
            </tbody>
          </table> */}
        </div>
      </div>
      
    </div>
  )
}

export default PrikazRest
