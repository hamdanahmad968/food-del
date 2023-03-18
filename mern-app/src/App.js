 // eslint-disable-next-line
 import React from "react";
 import Home from "./components/screens/Home";
 import Login from "./components/screens/Login";
 import Signup from "./components/screens/Signup";
 import Myorder from "./components/screens/MyOrder";
 import { CartProvider } from "./components/ContextReducer";
 import { Routes, Route } from "react-router-dom";
 import "../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css"
//  import "../node_modules/bootstrap/dist/js/bootstrap.bundle"
//  import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"
 
 const App = () => {
   return (
     <CartProvider>
     <div>
       <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/login" element={<Login />} />
         <Route path="/createuser" element={<Signup />} />
         <Route path="/myorderData" element={<Myorder />} />
       </Routes>
     </div>
     </CartProvider>
   );
 };
 
 export default App;