import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import Footer from './components/Footer';
import Search from './pages/Search';
import { getFirebaseToken } from "./utils/firebase";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
const App = () => {

  return (
    <Router>
      <ToastContainer />
    <Navbar />
      <Routes>
        <Route path = "/" element = {<Home />} />
        <Route path = "/search" element = {<Search />} />
      </Routes>
      <Footer/>
    </Router>
  )
}

export default App