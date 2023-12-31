import "./App.css";
import {
  Home,
  Payment,
  Profile,
  Register,
  LandingPage,
  Favorites,
  UsersProfile,
  UpdateProfile,
  Subscription,
  AdminDashboard,
  UsersDashboard,
  DataSetDashboard,
  SettingsDashboard,
  Feedback,

 
} from "./Views";

import GameDetail from "./Components/GameDetail/GameDetail";
import GamePosts from "./Components/GamePosts/GamePosts";
import { Routes, Route, useLocation } from "react-router-dom";
import NavBar from "./Components/NavBar/NavBar";
import {
  ProtectedAdminRoute,
  ProtectedRoutes,
  ProtectedRoutes2,
} from "./router/ProctectedRoutes";
import GamesBar from "./Components/GamesBar/GamesBar";
import LobbyFlight from "./Multimedia/Flight lobbylair.gif";
import { useEffect, useState } from "react";
import SendEmail from "./Components/ForgotPassword/sendEmail";
import ResetPassword from "./Components/ForgotPassword/resetPassword";
import "react-toastify/dist/ReactToastify.css";
import AdminNav from "./Components/AdminNav/AdminNav";
function ProjectCursor() {
  const [cursorX, setCursorX] = useState();
  const [cursorY, setCursorY] = useState();

  useEffect(() => {
    window.addEventListener("mousemove", (e) => {
      setCursorX(e.clientX);
      setCursorY(e.clientY);
    });
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        top: cursorY - 30,
        left: cursorX - 20,
        transform: "translate(-50%, -50%)",
        zIndex: 1,
        transition: "transform 1.2s ease",
        pointerEvents: "none",
      }}
    >
      <img src={LobbyFlight} alt="LOBBYF" className="w-44" />
    </div>
  );
}
function App() {
  const location = useLocation();

  return (
    <div className="App">
      {location.pathname !== "/" &&
        location.pathname !== "/register" &&
        location.pathname !== "/feedback" &&
        !location.pathname.startsWith("/resetPassword") &&
        !location.pathname.startsWith("/sendEmail") && <NavBar />}
      {location.pathname === "/home" ? (
        <GamesBar />
      ) : location.pathname.startsWith("/games") ? (
        <GamesBar />
      ) : location.pathname === "/post" ? (
        <GamesBar />
      ) : null}
      {location.pathname.startsWith('/admindashboard') && <AdminNav/>}
      <Routes>
       
      <Route element={<ProtectedRoutes2 />}>

        <Route path="/" element={<LandingPage />} />
         </Route>
        <Route exact path="/register" element={<Register />} />


        <Route element={<ProtectedRoutes />}>

          <Route path="/home" element={<Home />} />
          <Route path="/feedback" element={<Feedback />} />
       
          <Route path="/games/:detail" element={<GameDetail />} />
          <Route path="/post" element={<GamePosts />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route exact path="/subscription" element={<Subscription />} />
          <Route exact path="/payment" element={<Payment />} />
          <Route exact path="/profile/:id" element={<Profile />} />
          <Route exact path="/profile/:id/update" element={<UpdateProfile />} />
          <Route path="/user/:id" element={<UsersProfile />} />
           </Route>

          <Route element={<ProtectedAdminRoute />}>
            
            <Route path="/admindashboard" element={<AdminDashboard />} />
            <Route path="/admindashboard/users" element={<UsersDashboard />} />
            <Route path="/admindashboard/settings" element={<SettingsDashboard />} />
            <Route path="/admindashboard/dataset" element={<DataSetDashboard />} />
            
         
        </Route>
      
        <Route exact path="/sendEmail" element={<SendEmail />} />
        <Route exact path="/resetPassword/:token" element={<ResetPassword />} />
      </Routes>
      <ProjectCursor />
    </div>
  );
}

export default App;
