import axios from 'axios';
import React, { useState } from 'react'
import {FaStar} from 'react-icons/fa'
import './Styles/RatingRest.css'

const RatingRest = (props) => {
    const [rating,setRating] = useState(null);
    const [hover,setHover] = useState(null);
    const Oceni = async (rating,restid) => {
      try{
      const grade = await axios.post("https://benjamin002-001-site1.jtempurl.com/AddNewGrade",{
        userId: parseInt(JSON.parse(localStorage.getItem("User")).user.id),
        restaurantId: restid,
        grade: rating
      });
      console.log("Restoran sa idem" +restid+" je ocenjen ocenom " +rating+ ".");
      }
      catch(e){
      console.log("Error",e);
      }
    }
  return (
    <div id='flexx'>
    {!localStorage.getItem("Admin") && <div>
        <p style={{textAlign:'center'}}>{!localStorage.getItem("Admin") && <button id='rate' onClick={()=>Oceni(rating,props.r)}>Oceni restoran</button>}</p>
        {[...Array(5)].map((star,index) => {
        const currentRating = index + 1;
        return (
        <label>
            <input type='radio' name='rating' value={currentRating} onClick={()=>setRating(currentRating)}></input>
        <FaStar  color={currentRating <= (hover || rating) ? 'yellow' : 'silver'} className='star' size={30}
        onClick={()=>setHover(currentRating)}
       
        />
        </label>
        );
        })}
        
        
    </div>}
    <div><p id='grade'>{rating}</p></div>

    </div>
  )
}

export default RatingRest
