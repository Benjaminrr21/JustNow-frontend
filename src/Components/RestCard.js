import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {FaStar} from 'react-icons/fa'
import './Styles/RestCard.css' 
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import RatingRest from './RatingRest';
//import slikaa from './rest1.jpg'

function RestCard(props) {
   const [average,setAverage] = useState(0);
  const navigate = useNavigate();
  const getKey = () => {
    /* if(!localStorage.getItem("User") || localStorage.getItem("Vlasnik restorana")){
      //alert("Niste prijavljeni!");
      return;
    } */
   
  
    navigate(`/prikazrestorana/${props.data}`)
  }
  const getKey2 = () => {
    if(localStorage.getItem("Vlasnik restorana") || !localStorage.getItem("User")){
    alert("Niste prijavljeni kao korisnik.");
     return;
    }
    else getKey();
  }
  const EditHandler = () => {
    navigate(`/editrest/${props.data}`)
  }
  const DeleteHandler = () => {
    
    const obj = axios.delete(`https://benjamin002-001-site1.jtempurl.com/DeleteRestaurant/${props.data}`);
    alert("Obrisan restoran");
    axios.get("https://benjamin002-001-site1.jtempurl.com/GetAllRestaurants");
  }
  useEffect(()=>{
    axios.get(`https://benjamin002-001-site1.jtempurl.com/GetAverageGrade/${props.data}`)
    .then((grade)=>{
      console.log(grade);
      setAverage(grade.data);
    })
    .catch(e => console.log("Error",e));
  },[])
  return (
    <div id='outer'>
    <div id='containerr'>
    <div id='card-main' style={{overflowY:"hidden"}}>
      
      
          
            <div id='naslov'>
                <h3>Restoran</h3>
                <h1>{props.naziv}</h1>
            </div>

          
           
            <div onClick={()=>getKey2()} id='btn'>
                <h2>POGLEDAJ</h2>
            </div>
          
      </div>
    
    </div>
    
    <div id='rating'>
    <p style={{textAlign:'center',marginBottom:'10px'}}><FaStar fill='yellow' size={40} /> {average}</p>

      {localStorage.getItem("User") && <RatingRest r={props.data}/>}
    </div>
    {localStorage.getItem("Admin") && <div id='editdeletes'>
      {/* <button id='edit' onClick={EditHandler}>Izmeni</button> */}
      <button id='delete' onClick={DeleteHandler}>Izbrisi</button>
    </div>}
    {localStorage.getItem("Vlasnik restorana") && props.data == localStorage.getItem("IdRest") && <div id='editdeletes'>
      <button id='edit' onClick={EditHandler}>Izmeni</button>
      {/* <button id='delete' onClick={DeleteHandler}>Izbrisi</button> */}
    </div>}
    </div>
  )
}

export default RestCard
