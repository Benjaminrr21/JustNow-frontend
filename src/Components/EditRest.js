import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import './Styles/UnosRest.css'

const EditRest = () => {
   /* const [file,setFile] = useState();
    const [fileText,setFileText] = useState("");
    const [naziv,setNaziv] = useState("");
    const [lokacija,setLokacija] = useState("");
    const [radnoVreme,setRadnoVreme] = useState("");
    const [slogan,setSlogan] = useState("");
    const [urlSlike,setUrlSlike] = useState("");*/
    const [image,setImage] = useState("");
    const [restFromBackend,setRestFromBackend] = useState({});
    const {id} = useParams();
    const navigate = useNavigate();

    const handleFileChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
                
            };
            reader.readAsDataURL(file);
        }
    };

    const getRestaurantForEdit = async () => {
        try {
            const response = await axios.get(`https://benjamin002-001-site1.jtempurl.com/GetRestaurantById/${id}`);
            console.log(response);
            const resp = response.data;
            setRestFromBackend(resp);
            }
            catch(e){
                console.log("Error ",e);
            }
    }
    useEffect(()=>{getRestaurantForEdit();},[id]);
     const editRest = () => {
        try {
            axios.put(`https://benjamin002-001-site1.jtempurl.com/UpdateRestaurant/${id}`,{
                name:restFromBackend.name,
                location:restFromBackend.location,
                workingTime:restFromBackend.workingTime,
                slogan:restFromBackend.slogan,
                urlPhoto:image,
                about:restFromBackend.about
            });
            navigate(`/prikazrestorana/${id}`);
        
        }
        catch(e) {
            console.log("Error", e);
        }
     
    }
  return (
    
      <div id='container'>
       <div id='content'>
       <h1>Izmenite informacije o vasem restoranu.</h1>

            <div id='infos'>
                <div className='labelinput'>
                    <label>Naziv restorana</label>
                    <input type='text' value={restFromBackend.name} onChange={(e)=>{
                        setRestFromBackend((oldState) => ({
                            ...oldState,
                            name: e.target.value,
                        }));
                    }}></input>
                </div>
                <div className='labelinput'>
                    <label>Lokacija</label>
                    <input type='text' value={restFromBackend.location} onChange={(e)=>{
                        setRestFromBackend((oldState) => ({
                            ...oldState,
                            location: e.target.value,
                        }));
                    }}></input>
                </div>
                <div className='labelinput'>
                    <label>Radno vreme</label>
                    <input type='text' value={restFromBackend.workingTime} onChange={(e)=>{
                        setRestFromBackend((oldState) => ({
                            ...oldState,
                            workingTime: e.target.value,
                        }));
                    }}></input>
                </div>
                <div className='labelinput'>
                    <label>Slogan</label>
                    <input type='text' value={restFromBackend.slogan} onChange={(e)=>{
                        setRestFromBackend((oldState) => ({
                            ...oldState,
                            slogan: e.target.value,
                        }));
                    }}></input>
                </div>
                <div className='labelinput'>
                    <label>Opis restorana</label>
                    <textarea value={restFromBackend.about} onChange={(e)=>{
                        setRestFromBackend((oldState) => ({
                            ...oldState,
                            about: e.target.value,
                        }));
                    }}></textarea>
                </div>
                <div className='labelinput'>
                    <label>Fotografija restorana</label>
                     <input type='file' onChange={handleFileChange} ></input>
                    <img src={image}></img> 
                
                </div>
                <button onClick={editRest}>Izmeni</button>
            </div>
       </div>
    </div>
    
  )
}

export default EditRest
