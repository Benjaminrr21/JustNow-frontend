import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Order from './Order'
import './Styles/Meni.css'
import { MdDeleteOutline, MdEdit, MdOutlineNoFood   } from "react-icons/md";

//import './Styles/UnosProizvod.css'


const Meni = ({rid,meni,restoran,sendDataToParent}) => {
  const [menii,setMeni] = useState(meni);
  const navigate = useNavigate();
  const [isModalOpen,setIsOpen] = useState(false);
  const handleButtonClick = (rid,r,p,c) => {
    navigate(`/order/${rid}/${r}/${p}/${c}`);
    
  }
  ///console.log(menii)

  const Brisanje = async (id) => {

    try {
      axios.delete(`https://benjamin002-001-site1.jtempurl.com/DeleteProductWithId/${id}`);
      console.log("Uspesno brisanje");
      //console.log(filterMeni);
     /*  setMeni(props.meni);*/
      sendDataToParent(id);
     // const filterMeni = meni.filter(x => x.id != id);

    }
    catch(e){
      console.log("Error",e);
    }
  }

  const Izmena = async (id) => {
    navigate(`/izmenaproizvoda/${id}`)
  }
 
  return (
    
    <table id='meni'>
      <tbody>
          {meni.map(item => <tr key={item.id} data={item.id}>
            <td>{item.name}</td>
            <td><img className='im' src={item.photoUrl}></img></td>
            <td>{item.price} din</td>
            <td className='btnn'><button  onClick={()=>handleButtonClick(rid, restoran,item.name,item.price)}><MdOutlineNoFood/> Naruci</button></td>
            <td className='btnn'>{localStorage.getItem("Vlasnik restorana") && <button onClick={()=>Brisanje(item.id)}><MdDeleteOutline/> Izbrisi</button>}</td>
            <td className='btnn'>{localStorage.getItem("Vlasnik restorana") && <button onClick={()=>Izmena(item.id)}><MdEdit/> Izmeni</button>}</td>
          </tr>)}
          {/*<tr><th>Naziv</th><th>Cena</th><th>Slika</th><th>Naruci</th></tr>*/}
         
      </tbody>
    </table>
  )
}

export default Meni
