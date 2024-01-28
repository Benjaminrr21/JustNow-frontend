import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './Styles/IzmenaProizvoda.css'

const IzmenaProizvoda = () => {
    const {id} = useParams(); //id proizvoda
    const [product,setProduct] = useState({}); //proizvod iz baze
    const [idRest,setIdRest] = useState(0); //id restorana izvucenog iz proizvoda
    const [nameRest,setNameRest] = useState(""); //ime restorana izvucenog iz id
    const [image,setImage] = useState("");
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

    const GetProductWithId = async () => {
        try{
            const response = await axios.get(`http://benjamin002-001-site1.jtempurl.com/GetProductById/${id}`);
            console.log(response);
            const resp = response.data;
            setProduct(resp);
            setIdRest(resp.restaurantId);
            
        /*    console.log(product);
            console.log(idRest); */
        }
        catch(e){
            console.log("Error ",e);
        }
    }
 
    

 
     
    useEffect(() => {
        GetProductWithId();
    }, [id]);


    const GetNameOfRest = async (id) => {
       
        try {
            const rest = await axios.get(`http://benjamin002-001-site1.jtempurl.com/GetNameOfRestaurant/${id}`);
            console.log(rest);
            //const resp = rest.data;
            setNameRest(rest.data);

        }
        catch(e){
            console.log("Error",e);
        }
    } 
    
    useEffect(() => {
        if (idRest) {
            GetNameOfRest(idRest);
        }
    }, [idRest]);
    //GetNameOfRest(idRest);
    console.log(nameRest);

    const editProd = async () => {
        //alert(image)
        try {
            const p = await axios.put(`http://benjamin002-001-site1.jtempurl.com/UpdateProduct/${id}`,{
                name:product.name,
                price:product.price,
                photoUrl:image,
                description:""
            });
            navigate(`/prikazrestorana/${idRest}`);
        }
        catch(e){
            console.log("Error",e);
        }
    }

 
  return (
    <div id='containerEdit'>
       <div id='contentt'>
       <h1>Izmenite podatke o proizvodu.</h1>

            <div id='infos'>
                <div className='labelinput'>
                    <label>Restoran</label>
                    <p id='restUpdate'>{nameRest}</p>
                </div>
                <div className='labelinput'>
                    <label>Naziv porizvoda</label>
                    <input type='text' value={product.name} onChange={(e)=>{
                        setProduct((oldState) => ({
                            ...oldState,
                            name: e.target.value,
                        }));
                    }}></input>
                </div>
                <div className='labelinput'>
                    <label>Cena proizvoda</label>
                    <input type='text' value={product.price} onChange={(e)=>{
                        setProduct((oldState) => ({
                            ...oldState,
                            price: e.target.value,
                        }));
                    }}></input>
                </div>
                <div className='labelinput'>
                    <label>Fotografija proizvoda</label>
                    <input type='file' onChange={handleFileChange}></input>
                </div>
                
                <button onClick={editProd}>Izmeni</button>
            </div>
       </div>
    </div>
  )
}

export default IzmenaProizvoda
