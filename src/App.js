import logo from "./logo.svg";
import "./App.css";
import Login from '../src/Components/Pages/Login/Login'
import { Route, BrowserRouter, Routes, useLocation, Link, NavLink } from "react-router-dom";
import Dashboard from "./Components/Pages/Dashboard/Dashboard";
import Records from "./Components/Pages/Records/Records";
import Confriguations from "./Components/Pages/Confriguations/Confriguations";
import Profile from "./Components/Pages/Profile/Profile";
import Navbar from "./Components/Pages/Navbar/Navbar";
import { useState } from "react";

function App() {

  // const location = useLocation();
  const [isNavBar, setIsNavBar] = useState(false);

  // console.log(location);
  localStorage.setItem("x-isense-token","17ba650ba063931c56a9f83d8a8018831304549fcc98d2a7ffefb27196c46965");

  return (
    <>
      <div className="mainCoponent">
        <BrowserRouter>
       {isNavBar && <Navbar/>}
          <Routes>
            <Route path="/" element={<Login setIsNavBar={setIsNavBar}/>} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="records" element={<Records />} />
            <Route path="confriguations" element={<Confriguations />} />
            <Route path="profile" element={<Profile />} />
          </Routes>
        </BrowserRouter>
        {/* <MainPage/> */}
      </div>
    </>
  );
}

export default App;
