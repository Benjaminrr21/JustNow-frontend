import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './Styles/UnosProizvod.css'

const UnosProizvod = () => {
    const r = useParams();
    const [meni,setMeni] = useState([]);
    const navigate = useNavigate();
    const [file,setFile] = useState("");

    const [rbr,setRbr] = useState(1);
    const [name,setName] = useState("");
    const [url,setUrl] = useState("");
    const [cena,setCena] = useState(0);

  
    const handleFileChange = (event) => {
      const file = event.target.files[0];

      if (file) {
         /*  const reader = new FileReader();
          reader.onloadend = () => {
              setUrl(reader.result);
          };
          reader.readAsDataURL(file); */
          setFile(file);
      }
    }



    const InsertProduct = async () => {
      console.log(name,url,cena,r);
      try {
        const formData = new FormData();
            formData.append('file',file);

            const cloudResponse = await axios.post("https://api.cloudinary.com/v1_1/dx1ec9jse/image/upload/",formData,{
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                params: {
                    upload_preset: 'fvplqlov',
                },
            
            });
            const imageUrl = cloudResponse.data.secure_url;

      const inp = await axios.post("https://benjamin002-001-site1.jtempurl.com/AddProduct",{
        name:name,
        photoUrl: imageUrl,
        price: cena,
        description: "",
        restaurantId: r.id
      });
      console.log(inp);

      setRbr((old) => old+1);
      setCena(0);
      setName("");
      setUrl("");
    }
    catch(e){
      console.log("Error ",e);
    }
      
    }
  return (
    <div id='menuCont'>
      <div id='h2'><h2>Unesite meni vašeg restorana</h2></div>
      <div id='tableDiv'>
      <table id='menu'>
        <tbody>
          <tr><th>Naziv jela</th><td><input type='text' value={name} onChange={(e)=>setName(e.target.value)} className='naziv'></input></td></tr>
          <tr><th>Fotografija jela</th><td><input className='slika' type='file' onChange={handleFileChange}></input></td></tr>
          <tr><th>Cena</th><td><input type='number' id='numb' className='cena' value={cena} onChange={(e)=>setCena(e.target.value)} min={10} max={10000}></input><span> din</span></td></tr>
          <tr><td><button onClick={InsertProduct}>Dalje</button></td><td><button onClick={()=>navigate(`/prikazrestorana/${r.id}`)}>Kraj</button></td></tr>
          
         {/*  <tr><th>Naziv</th><th>Fotografija jela</th><th>Cena</th></tr>
          <tr><td><input type='text' value={name} onChange={(e)=>setName(e.target.value)} className='naziv'></input></td><td><input className='slika' type='file' onChange={handleFileChange}></input></td><td><input type='number' id='numb' className='cena' value={cena} onChange={(e)=>setCena(e.target.value)} min={10} max={10000}></input><span> din</span></td><td><button onClick={InsertProduct}>Dalje</button></td></tr>
          <tr><td/><td/><td><button onClick={()=>navigate(`/prikazrestorana/${r.id}`)}>Kraj</button></td></tr> */}
        </tbody>
      </table>
      
      </div>
    </div>
  )
}

export default UnosProizvod
