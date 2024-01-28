import React from 'react'
import { createContext, useState } from 'react'


export const RestContext = createContext({
    naziv: "",
    lokacija: "",
    radnoVreme: "",
    slogan: ""
}) 

export default RestContext
/*
 
import { createContext, useState } from "react";

export const MyContext = createContext({
  Username: "",
  changeUsername: (fn) => {}
});

export const MyContextProvider = (props) => {
  const [Username, setUsername] = useState("Benjamin");

  const changeUsername = (fn) => {
    setUsername(fn);
  };

  return (
    <MyContext.Provider value={{ Username, changeUsername }}>
      {props.children}
    </MyContext.Provider>
  );
};


*/