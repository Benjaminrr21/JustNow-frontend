import { createContext, useReducer, useState, useEffect } from "react";

export const LoginUserContext = createContext({
    currentUser: null,
    owner: null,
    admin: null,
    racun: [],
    notif: "",
    req: "",
    setUserFunction: (data) => {},
    setOwnerFunction: (data) => {},
    setAdminFunction: (data) => {},
    setRacunFunction: (item) => {},
    setNotifFunction: (mess) => {},
    setRequestFunction: (mess) => {}
});

export const LoginUserContextProvider = (props) => {
    const [currentUser,setCurrentUser] = useState(null);
    const [owner,setOwner] = useState(null);
    const [admin,setAdmin] = useState(null);
    const [racun,setRacun] = useState([]);
    const [notif,setNotif] = useState("");
    const [req,setReq] = useState("");

    const setUserFunction = (data) => {
        setCurrentUser(data);
    }
    const setOwnerFunction = (data) => {
        setOwner(data);
    }
    const setAdminFunction = (data) => {
        setAdmin(data);
    }
    const setRacunFunction = (item) => {
        setRacun([...racun,item]);
     
    }
    const setNotifFunction = (mess) => {
        setNotif(mess);
    }
    const setRequestFunction = (mess) => {
        setReq(mess);
    }
    useEffect(() => {
        console.log(racun);
      }, [racun]);

    return ( 
        <LoginUserContext.Provider 
        value={{currentUser, setUserFunction, owner, setOwnerFunction, admin, setAdminFunction,racun,setRacunFunction, notif, setNotifFunction, req, setRequestFunction }}
        >
            {props.children}
        </LoginUserContext.Provider>
    );
};

