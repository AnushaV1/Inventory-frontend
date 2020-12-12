import React, {useState, useEffect} from "react";
import {useDispatch} from "react-redux";
import Alerts from './components/Alerts';
import {decode} from 'jsonwebtoken';
import {  loadUser } from './actions/userAction';
import './App.css';
import Navigation from "./components/Navigation";
import Routes from "./components/Routes";
import Footer from "./components/Footer";
import { loadAllUPC } from "./actions/upcActions";

function App() {
  const dispatch = useDispatch();

  const [infoLoaded, setInfoLoaded] = useState(false);

    useEffect(() => {
    async function getUser() {
      let token = localStorage.getItem('inventory-token') || null;
              if(token) {
                let { username,userid } = decode(token);
                let data = {token, username, userid}
                console.log("Data from app js", data)
                await dispatch(loadUser(data));
                await dispatch(loadAllUPC());
          }
    setInfoLoaded(true);
    }
    getUser();
    }, [dispatch]);



  if (!infoLoaded) {
    return <h3>Loading...</h3>;
  }


  return (

        <div className="App">
              <Navigation />
              <Alerts />
              <Routes  />
              <Footer />
              </div>
  )
}

export default App;
