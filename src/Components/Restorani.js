import React, { useEffect, useState } from 'react'
import axios from 'axios'
import RestCard from './RestCard';
//import rest1 from './rest1.jpg'
import './Styles/RestCard.css'
import {FaHamburger} from 'react-icons/fa'
import { IoArrowRedoSharp, IoDesktopOutline } from "react-icons/io5";
import { IoMdPizza } from "react-icons/io";
import { FaSearch } from 'react-icons/fa';
import { CollapseComp, CollapseCompBasic } from './ImageGallery';

import Spinner from 'react-bootstrap/Spinner'



function Restorani() {
  const [food,setFood] = useState("");
  const [loading,setLoading] = useState(false);
  const [no,setNo] = useState("");
  const [naziv,setNaziv] = useState("");
  const [open,setOpen] = useState(true);

  

  const getKey = (e) => {
    alert(e.target.getAttribute("data"));
  }
    const [niz,setNiz] = useState([]);
    const [niz2,setNiz2] = useState([]);
    /* useEffect(() => {
      setLoading(true);
        //axios.get("https://localhost:7224/GetAllRestaurants")
        axios.get("http://benjamin002-001-site1.jtempurl.com/GetAllRestaurants")
        .then(resp => {
            console.log(resp.data);
            setNiz(resp.data);
            setLoading(false);
            //alert(niz.length)
        })
        .catch(error => console.log("error"))
    },[]) */
    const getRests = async () => {
      setLoading(true);
      try {
        const rsts = await axios.get("https://benjamin002-001-site1.jtempurl.com/GetAllRestaurants");
        //const rsts = await axios.get("https://localhost:7224/GetAllRestaurants");
        console.log(rsts);
        setNiz(rsts.data);
        setLoading(false);
      }
      catch(e){
        console.log("Error",e);
      }
    }
    const Sort = async () => {
      setLoading(true);
      const rests = await axios.get("https://benjamin002-001-site1.jtempurl.com/SortRestaurants");
      console.log(rests);
      setNiz(rests.data);
      setLoading(false);
    }
    const Filter = async (food) => {
      
       setLoading(true);
      const filterNiz = await axios.get(`https://benjamin002-001-site1.jtempurl.com/FilterRestaurantsByProduct/${food}`);
      console.log(filterNiz);
      setNiz(filterNiz.data);
      setLoading(false); 
      if(filterNiz.data.length == 0) {
        setNo("Nema restorana koji nude ovaj proizvod.");
      }
      else setNo("");
      //alert(niz.length);
    }
    useEffect(()=>{
      getRests();
    },[]);

    const SearchRest = async (e) =>{
      setNaziv(e.target.value);
      try {
        const restorani = await axios.get(`https://benjamin002-001-site1.jtempurl.com/SearchRestaurantByName/${naziv}`)
        
        
        const rests = restorani.data;
        console.log(rests);
        setNiz(rests);
        }
        catch(e){
            console.log("Error",e);
            setNotFound(true);
        }
    }
    const showw = () => {
    setOpen(!open);
    }
   
  return (
    <div id='containerRest'>
      <div id='colapse' onClick={()=>showw()}><CollapseCompBasic  title='Sortiraj/Filtriraj restorane'/></div>
     {open && <div id='prvi'>
       <button id='sort' onClick={()=>Sort()}>Sortiraj po oceni</button>
       <button id='filt' onClick={()=>{
         if(food == ''){ 
          alert("Izaberite proizvod za filtriranje!"); 
          return;
        }
         Filter(food);
         }}>Filtriraj po hrani</button>
       <h4>{food}</h4>
       <div id='hrana' >
       
          <p onClick={(e)=>setFood(e.currentTarget.innerText)}><IoArrowRedoSharp/>Hamburger</p>
          <p onClick={(e)=>setFood(e.currentTarget.innerText)}><IoArrowRedoSharp/>Čizburger</p>
          <p onClick={(e)=>setFood(e.currentTarget.innerText)}><IoArrowRedoSharp/>Pizza Kaprićoza</p>
          <p onClick={(e)=>setFood(e.currentTarget.innerText)}><IoArrowRedoSharp/>Pizza Parče</p>
          <p onClick={(e)=>setFood(e.currentTarget.innerText)}><IoArrowRedoSharp/>Pizza Margarita</p>
          <p onClick={(e)=>setFood(e.currentTarget.innerText)}><IoArrowRedoSharp/>Pohovana piletina</p>
          <p onClick={(e)=>setFood(e.currentTarget.innerText)}><IoArrowRedoSharp/>Hrskava piletina</p>
         
       </div>
     </div>}
    <div id='restCards'>
 
    <div>
    <div id='search2'>
              <button id='s' onClick={SearchRest}><FaSearch/></button>
              <input type='text' value={naziv} onChange={(e)=>SearchRest(e)} placeholder='Pretraži restorane...'></input>
    </div>
      
      {loading && <p id='loading-text'>Učitavanje restorana...</p>}
      {no && <p id='loading-text'>{no}</p>}
      {
        niz.map(rest => <RestCard data={rest.id} onClick={getKey} key={rest.id} naziv={rest.name} radnoVreme={rest.workingTime} lokacija={rest.location} url={rest.urlPhoto}/>)
      }
      </div>
    </div>
    

   
     {/* {
      niz.map(elem =>  {<RestCard key={elem.id}>
        <div id='card-main'>
      <div id='photo'>
          <img src={rest1}></img>
      </div>
      <div id='content'>
          <div id='content-inner'>
            <div id='naslov'>
                <h3>{elem.username}</h3>
                <h1>{elem.name}</h1>
            </div>
            <div id='info'>
                <div className='infos'>
                    <h3>Radno vreme</h3>
                </div>
                <div className='infos'>
                    <h3>Lokacija</h3>
                </div>
            </div>
            <div id='btn'>
                <h2>POGLEDAJ</h2>
            </div>
          </div>
      </div>
    </div>
      </RestCard>}) }  */}
     
    </div>
    

  )
}

export default Restorani
