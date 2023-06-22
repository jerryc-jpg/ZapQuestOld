import React, { useEffect } from "react";
import Home from "./Home";
import Login from "./Login";
import Navbar from "./Navbar";
import Nearby from "./Nearby"
import Map from "./Map"
import { useSelector, useDispatch } from "react-redux";
import { loginWithToken, fetchCart } from "../store";
import { Link, Routes, Route } from "react-router-dom";

const App = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loginWithToken());
  }, []);

  useEffect(() => {
    if (auth.id) {
      dispatch(fetchCart());
    }
  }, [auth]);
  return (
    <div>
      <Navbar />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/nearby" element={<Nearby />} />
          <Route path="/map" element={<Map />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
