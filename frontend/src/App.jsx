import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import SignUp from "./pages/SignUp/SignUp";
import LogIn from "./pages/LogIn/LogIn";
import FootComp from "./components/FootComp/FootComp";
import { CartProvider } from "./context/Cart";
import Cart from "./pages/Cart/Cart";
import Myorders from "./components/Myorders/Myorders";

const App = () => {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/sign-up" element={<SignUp />} />
          <Route exact path="/log-in" element={<LogIn />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/orders" element={<Myorders />} />
        </Routes>
        <FootComp></FootComp>
      </Router>
    </CartProvider>
  );
};

export default App;
