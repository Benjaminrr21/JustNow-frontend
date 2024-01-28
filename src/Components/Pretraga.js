import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import RestCard from './RestCard';
import './Styles/Restorani.css'

const Pretraga = () => {

    const getKey = (e) => {
        alert(e.target.getAttribute("data"));
      }

    const {naziv} = useParams();
    const [restaurants,setRestaurants] = useState([]);
    const [notFound,setNotFound] = useState(false);

    const PretraziPoNazivu = async () => {
        try {
        const restorani = await axios.get(`http://benjamin002-001-site1.jtempurl.com/SearchRestaurantByName/${naziv}`)
        
        
        const rests = restorani.data;
        setRestaurants(rests);
        }
        catch(e){
            console.log("Error",e);
            setNotFound(true);
        }
    }
    useEffect(()=>{
      PretraziPoNazivu();
    },[]);
    console.log(restaurants);


  return (
    <div id='containerRest'>

    <div id='restCards'>
    <h1 id='h'>Pretraga za: <b>{naziv}</b></h1>
   
     <div>
       
         {notFound && <p id='not'>Nema rezultata pretrage.</p>}
      {
        restaurants.map(rest => <RestCard data={rest.id} onClick={getKey} key={rest.id} naziv={rest.name} radnoVreme={rest.workingTime} lokacija={rest.location} url={rest.urlPhoto}/>)
      }
      </div>
    </div>
   
     
     
    </div>
  )
  
}

export default Pretraga
