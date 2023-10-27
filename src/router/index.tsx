import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Wallet from "../pages/Wallet";
import Create from "../pages/Create";
import Login from "../pages/login";
import Header from "../components/header";
import SignUp from "../pages/signup";
import Inbox from "../pages/inbox";

function AppRouter() {
  return (
    <div className="p-4">
      <Header />
      <Routes>
        <Route path="/" Component={Login} />
        <Route path="/sign-up" Component={SignUp} />
        <Route path="/inbox" Component={Inbox} />
        <Route path="/home" Component={Home} />
        <Route path="/wallet" Component={Wallet} />
        <Route path="/create" Component={Create} />
      </Routes>
    </div>
  );
}

export default AppRouter;
