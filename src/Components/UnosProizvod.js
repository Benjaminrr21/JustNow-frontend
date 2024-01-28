import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './Styles/UnosProizvod.css'

const UnosProizvod = () => {
    const r = useParams();
    const [meni,setMeni] = useState([]);
    const navigate = useNavigate();

    const [rbr,setRbr] = useState(1);
    const [name,setName] = useState("");
    const [url,setUrl] = useState("");
    const [cena,setCena] = useState(0);

  
    const handleFileChange = (event) => {
      const file = event.target.files[0];

      if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
              setUrl(reader.result);
          };
          reader.readAsDataURL(file);
      }
  };



    const InsertProduct = async () => {
      console.log(name,url,cena,r);
      try {
      const inp = await axios.post("https://benjamin002-001-site1.jtempurl.com/AddProduct",{
        name:name,
        photoUrl: url,
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
      <div id='h2'><h2>Unesite meni vaseg restorana</h2></div>
      <div>
      <table id='menu'>
        <tbody>
          <tr><th>Naziv</th><th>Fotografija jela</th><th>Cena</th></tr>
          <tr><td><input type='text' value={name} onChange={(e)=>setName(e.target.value)} className='naziv'></input></td><td><input className='slika' type='file' onChange={handleFileChange}></input></td><td><input type='number' id='num' className='cena' value={cena} onChange={(e)=>setCena(e.target.value)} min={10} max={10000}></input><span> din</span></td><td><button onClick={InsertProduct}>Dalje</button></td></tr>
         <tr><td/><td/><td><button onClick={()=>navigate(`/prikazrestorana/${r.id}`)}>Kraj</button></td></tr>
        </tbody>
      </table>
      </div>
    </div>
  )
}

export default UnosProizvod
