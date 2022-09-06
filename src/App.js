
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { useEffect, useState } from "react";
import { UserProvider } from "./UserContext";

import AppNavbar from "./components/AppNavbar";

import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import SubmitReports from "./pages/SubmitReports";
import SignOut from "./pages/SignOut";

import "bootswatch/dist/darkly/bootstrap.min.css";
import { Container } from "react-bootstrap";
import './App.css';

function App() {

  const [user, setUser] = useState({
    token: null
  })

  const unsetUser = () => {
    localStorage.clear();
  };

  useEffect(() => {
    if(localStorage.getItem("token") !== null){
      setUser({
        token: localStorage.getItem("token")
      })
    }
  }, [])
  

  return (
    <UserProvider value={{user, setUser, unsetUser}}>

      <Router>
        <AppNavbar />
        <Container fluid>
          <Routes>

            <Route exact path = "/register" element={<Register />} />
            <Route exact path = "/signIn" element={<SignIn />} />
            <Route exact path = "/submitReports" element={<SubmitReports />} />
            <Route exact path = "/signOut" element={<SignOut />} />
          </Routes>
        </Container>
      </Router>
    </UserProvider>
    
  );
}

export default App;
