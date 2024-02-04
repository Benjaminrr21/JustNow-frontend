import logo from './logo.svg';
import { Navigate, Routes, Route } from 'react-router-dom';
import './App.css';
import Navigation from './Components/Navigation';
import HomePage from './Components/HomePage';
import ErrorPage from './Components/ErrorPage';
import Registracija from './Components/Registracija';
import Prijava from './Components/Prijava';
import { createContext, useContext, useEffect, useState } from 'react';
import ChangingPage from './Components/ChangingPage';
import RestCard from './Components/RestCard';
import Restorani from './Components/Restorani';
import UnosRest from './Components/UnosRest';
import PrikazKorisnika from './Components/PrikazKorisnika';
import PrikazRest from './Components/PrikazRest';
import EditRest from './Components/EditRest';
import RegistracijaRest from './Components/RegistracijaRest';
import UnosProizvod from './Components/UnosProizvod';
import Meni from './Components/Meni';
import IzmenaProizvoda from './Components/IzmenaProizvoda';
import Pretraga from './Components/Pretraga';
import RatingRest from './Components/RatingRest';
import RequestsForAdmin from './Components/RequestsForAdmin';
import Notifications from './Components/Notifications';
import SignalR from './Components/SignalR'
import Order from './Components/Order';

import { LoginUserContext } from './Components/Context/LoginUserContext';
import axios from 'axios';
import MyOrders from './Components/MyOrders';
import PrijavaRest from './Components/PrijavaRest';
import MojRacun from './Components/MojRacun';
import Proba from './Components/Proba';
import Proba2 from './Components/Proba2';
import Cloudinary from './Components/Cloudinary'
import Mail from './Components/Mail'
import Verify from './Components/Verify';
import Nav from './Components/Nav';
import ImageGallery from './Components/ImageGallery';

export const MyContext = createContext();

function App() {
  const [username,setUsername] = useState("Benjamin");
  const {setUserFunction} = useContext(LoginUserContext);

  useEffect(()=>{
    const userdata = localStorage.getItem("Prijavljeni korisnik");
    const currentUser = JSON.parse(userdata);
    if(currentUser){
      setUserFunction(currentUser);
      axios.defaults.headers.common['Authorization'] = `Bearer ${currentUser.token}`;
      //alert(currentUser)
    }
  },[]);
  return (
      <>
      {/*  <Navigation/>  */}
      <Nav/>
      <Routes>
       <Route path="/" element={<Navigate to="/homepage"/>}></Route>
       <Route path="/homepage" element={<HomePage/>}></Route>
       <Route path="/registracija" element={<Registracija/>}></Route>
       <Route path="/prijava" element={<Prijava/>}></Route>
       <Route path="/restorani" element={<Restorani/>}></Route>
       <Route path="/restCard" element={<RestCard/>}></Route>
       <Route path="/unosrest/:idOwner" element={<UnosRest/>}></Route>
       
       <Route path="/prikazkorisnika" element={<PrikazKorisnika/>}></Route>
       <Route path="/prikazrestorana/:id" element={<PrikazRest/>}></Route>
       <Route path="/editrest/:id" element={<EditRest/>}></Route>
       <Route path="/registracijarest" element={<RegistracijaRest/>}></Route>
       <Route path="/unosproizvoda/:id" element={<UnosProizvod/>}></Route>
       <Route path="/meni" element={<Meni/>}></Route>
       <Route path="/izmenaproizvoda/:id" element={<IzmenaProizvoda/>}></Route>
       <Route path="/pretraga/:naziv" element={<Pretraga/>}></Route>
       <Route path="/rating" element={<RatingRest/>}></Route>
       <Route path="/requests" element={<RequestsForAdmin/>}></Route>
       <Route path="/signalr/:idOwner" element={<SignalR/>}></Route>
       <Route path="/notifications" element={<Notifications/>}></Route>
       <Route path="/order/:rid/:rest/:prod/:cena" element={<Order/>}></Route>
       <Route path="/myorders/:id" element={<MyOrders/>}></Route>
       <Route path="/prijavarest" element={<PrijavaRest/>}></Route>
       <Route path="/mojracun/:id" element={<MojRacun/>}></Route>
       <Route path="/regex" element={<Proba/>}></Route>
       <Route path="/proba2" element={<Proba2/>}></Route>
       <Route path="/cl" element={<Cloudinary/>}></Route>
       <Route path="/mail" element={<Mail/>}></Route>
       <Route path="/images" element={<ImageGallery/>}></Route>
       <Route path="/verify/:uo/:hn/:n/:l/:e/:pn/:u/:p" element={<Verify/>}></Route>

       <Route path="*" element={<ErrorPage/>}></Route>
      
      </Routes>

  </>

    /*  <div className="App"> 
    </div> */
  );
}

export default App;
