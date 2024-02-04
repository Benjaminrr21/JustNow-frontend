import React, { useState } from 'react'
import axios from 'axios';

const Cloudinary = () => {

    const [imageSelected,setImageSelected] = useState("");

    const uploadImage = () => {
        console.log(imageSelected);
        const formData = new FormData();
        formData.append("file",imageSelected);
        formData.append("upload_preset","fvplqlov");
        axios.post("https://api.cloudinary.com/v1_1/dx1ec9jse/image/upload",formData)
        .then((res) => console.log(res));
    }
  return (
    <div>
      <input type='file' onChange={(e)=>setImageSelected(e.target.files[0])}></input>
      <button onClick={()=>uploadImage()}>Upload image</button>
    </div>
  )
}

export default Cloudinary
