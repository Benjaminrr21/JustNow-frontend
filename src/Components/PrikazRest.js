import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Meni from './Meni';
import './Styles/PrikazRest.css'
import {FaLocationArrow, FaTimes, FaStopwatch} from 'react-icons/fa'
import {FaEdit} from 'react-icons/fa'

function PrikazRest() {
  const [Rest,setRest] = useState({});
  let {id} = useParams();
  const [mymeni,setMyMeni] = useState([]);
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();

  const GetRestaurantWithId = async () => {
   //alert("Waiting...")
    try{
      const resp = await axios.get(`http://benjamin002-001-site1.jtempurl.com/GetRestaurantById/${id}`);
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
    const niz = await axios.get(`http://benjamin002-001-site1.jtempurl.com/GetAllProductsOfRestaurant/${id}`);
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
  return (
    <div id='containerP'>
      <div id='contentRest'>
        {localStorage.getItem("Vlasnik restorana") && <button id='editt' onClick={()=>navigate(`/editrest/${id}`)}><FaEdit/> Izmeni podatke o restoranu</button>}
        {localStorage.getItem("Vlasnik restorana") && <button id='editt' onClick={()=>navigate(`/unosproizvoda/${id}`)}><FaEdit/> Proširi svoj meni</button>}
        <h1>RESTORAN {Rest.name}</h1>
        <p id='slogan'>{Rest.slogan}</p>
        <div id='first'>
        <div id='img'><img src={Rest.urlPhoto}></img></div>
        
        <div id='infoss'>
          <p id='about'>{Rest.about}</p>
          <h3><FaLocationArrow/> Lokacija: {Rest.location}</h3>
          <h3><FaStopwatch/> Radno vreme: {Rest.workingTime}</h3>
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
