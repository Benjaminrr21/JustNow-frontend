// OrderCard.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getUserAgentHeader } from '@microsoft/signalr/dist/esm/Utils';

const OrderCard = ({ data, name, price, amount, date, user, onClickNaruci }) => {
  const [korisnik,setKorisnik] = useState({});
  const TakeOrder = (d) => {
    try {
      const obj = axios.put(`https://benjamin002-001-site1.jtempurl.com/TakeOrder/${d}`);
      console.log(obj);
      onClickNaruci(data);
    } catch (e) {
      console.log("Error", e);
    }
  };
  const getUser = async () => {
    try{
    const u = await axios.get(`https://benjamin002-001-site1.jtempurl.com/GetUserWithId/${parseInt(user)}`);
    console.log(u)
    console.log(u.data)

    setKorisnik(u.data);
    }
    catch(e){
      console.log("Error",e);
    }
  }
  useEffect(()=>{
    getUser();
  },[])

  return (
    <div id='order-item'>
      
      <div id='order-one'>
        <p>Proizvod</p>
        <p>Cena proizvoda</p>
        <p>Količina</p>
        <p>Vreme porudžbine</p>
        <p>Korisnik</p>
        <p>Ukupan iznos porudžbine</p>
      </div>
      <div id='order-two'>
        <p>{name}</p>
        <p>{price} din</p>
        <p>{amount}</p>
        <p>{date}</p>
        <p>{korisnik.username}</p>
        <p>{amount * price} din</p>
        <button onClick={() => TakeOrder(data)}>Prihvati porudzbinu</button>
      </div>
    </div>
  );
};

export default OrderCard;


/* import axios from 'axios';
import React from 'react'
import * as signalR from '@microsoft/signalr'
import { useState, useEffect, useNavigate } from 'react';

const OrderCard = (props,{onClickNaruci}) => {
 
    //const str = props.date;
    //const newDate = (str) =>  `${str[8]}${str[9]}.${str[5]}${str[6]}.${str[0]}${str[1]}${str[2]}${str[3]}. `;
 
    const TakeOrder = (d) => {
        try {
        const obj = axios.put(`https://localhost:7224/TakeOrder/${d}`);
        console.log(obj);
        onClickNaruci(props.data);
        }
        catch(e){
            console.log("Error",e);
        }
    }
 
    return (
    <div id='order-item'>
                <div id='order-one'>
                    <p>Proizvod</p>
                    <p>Cena proizvoda</p>
                    <p>Kolicina</p>
                    <p>Vreme porudzbine</p>
                    <p>Korisnik</p>
                    <p>Ukupan iznos porudzbine</p>
                </div>
                <div id='order-two'>
                    <p>{props.name}</p>
                    <p>{props.price} din</p>
                    <p>{props.amount}</p>
                    <p>{props.date}</p>
                    <p>{props.user}</p>
                    <p>{props.amount * props.price} din</p>
                    <button onClick={()=>TakeOrder(props.data)}>Prihvati porudzbinu</button>

                </div>
                
            </div>
  )
}

export default OrderCard
 */