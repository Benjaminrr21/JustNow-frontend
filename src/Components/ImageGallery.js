import React, { useEffect, useState } from 'react'
import { Photos } from './Photos';
import './Styles/ImageGallery.css'
import { TiThMenu } from "react-icons/ti";
import { BiCollapseVertical } from "react-icons/bi";
import axios from 'axios';



const ImageGallery = (props) => {
    const [currentIndex,setCurrentIndex] = useState(0);
    const [photoss,setPhotoss] = useState([{}]);
    
    

    const next = () => {
        setCurrentIndex((currentIndex + 1) % photoss.length);
      };
      const prev = () => {
        setCurrentIndex((currentIndex - 1 + photoss.length) % photoss.length);
      };
      useEffect(()=>{
        setPhotoss([
          {
            url:props.s1,
            id:0
          },
          {
            url:props.s2,
            id:1
          },
          {
            url:props.s3,
            id:2
          }
        ]);
        console.log(props.s1);
        console.log(props.s2);
        console.log(props.s3);
      },[props.s1,props.s2,props.s3])
  return (
    <>
        <div className='sliderContainer'>
        {photoss.map((photo) => (
          <div
            key={photo.id}

            // if the photo is the current photo, show it
            className={
              photoss[currentIndex].id === photo.id ? 'fade' : 'slide fade'
            }
          >
            <img src={photo.url}/* 'https://res.cloudinary.com/dx1ec9jse/image/upload/v1706894184/eqjbbnop0l2ndkrgiwhf.png' alt={photo.title} className='photo' */ />
            
          </div>
        ))}

        {/* Previous button */}
        <button onClick={prev} className='prev'>
          &lt;
        </button>

        {/* Next button */}
        <button onClick={next} className='next'>
          &gt;
        </button>
      </div>

      {/* Render dots indicator */}
      <div className='dots'>
        {photoss.map((photo) => (
          <span
            key={photo.id}
            // highlight the dot that corresponds to the current photo
            className={
              photoss[currentIndex].id === photo.id ? 'dot activee' : 'dot'
            }
            // when the user clicks on a dot, go to the corresponding photo
            onClick={() => setCurrentIndex(photoss.indexOf(photo))}
          ></span>
        ))}
        </div>


       
    </>
  );
}

export default ImageGallery


export const CollapseComp = (props) => {
  const [menuOpen,setMenuOpen] = useState(false);
  return (
    <div id='collapse-div'>
    <div id='collapse-item' onClick={()=>setMenuOpen(!menuOpen)}>
      <p id='title'>{props.title}</p>
      <p id='men' ><BiCollapseVertical/></p>
      
    </div>
    {menuOpen && 
    <div id='con'>
        <p>{props.content}</p>
    </div>
    }
  </div>
  )
}
export const CollapseCompBasic = (props) => {
  const [menuOpen,setMenuOpen] = useState(false);
  return (
    <div id='collapse-div'>
    <div id='collapse-item' onClick={()=>setMenuOpen(!menuOpen)}>
      <p id='title'>{props.title}</p>
      <p id='men' ><BiCollapseVertical/></p>
      
    </div>
    {/* {menuOpen && 
    <div id='con'>
        <p>{props.content}</p>
    </div>
    } */}
  </div>
  )
}

export const Streets = [
  "Kragujevačka",
  "Mitrovačka",
  "Stevana Nemanje",
  "Prvi maj",
  "Biserovačka",
  "Mur",
  "Dubrovačka",
  "Relje Krilatice",
  "Generala Živkovića",
  "Kraljevića Marka",
  "Borski kej",
  "Kej 37. Sandžačke divizije",
  "Pribojska",
  "Varevska",
  "Sjenička",
  "Bukreš",
  "Hadžet"
]