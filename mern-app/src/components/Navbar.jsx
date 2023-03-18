
import React, { useState } from "react";
import { Badge } from "react-bootstrap";
import { Link , useNavigate} from "react-router-dom";
import Modal from "../Modal";
import { useCart } from "./ContextReducer";
import Cart from "./screens/Cart";

export default function Navbar() {
  let data = useCart()
  const [ cartView , setCartView] = useState(false)

  const navigate = useNavigate()
 const handleLogout = ()=>{
  localStorage.removeItem("authtoken")
  navigate("/login")
}

  return (
    <>
     
      <div>
      <nav className="navbar navbar-expand-lg navbar-dark  position-sticky" style={{ backgroundColor : "cyan", boxShadow: "0px 10px 20px black", filter: 'blur(20)', position: "fixed", zIndex: "10", width: "100%" }}>
  <div className="container-fluid">
    <div className="navbar-brand fs-1 fst-italic" style={{color : "black" , fontWeight : "600"}} to="/">
      Bhandara
    </div>

    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active fs-5 mx-3" style={{color : "black" , fontWeight : "bold" ,fontSize : "40px" }} aria-current="page" to="/">Home</Link>
        </li>

        {/* if authtoken present then show my orders -------> */}
        {
          (localStorage.getItem("authtoken"))?
          <li className="nav-item">
            <Link className="nav-link active fs-5 mx-3 active" style={{color : "black" , fontWeight : "bold" }} aria-current="page" to="/myorderData">My Orders</Link>
          </li> : ""
        }
      </ul>

      {
        (!localStorage.getItem("authtoken"))?
        <div className="d-flex">
          <Link className="btn bg-white  mx-1" style={{fontWeight : "bold"  , border : "1px solid black" , fontSize : "18px"  , color : "black" }} to="/login">login</Link>
          <Link className="btn bg-white  mx-1" style={{fontWeight : "bold"  , border : "1px solid black" , fontSize : "18px"  , color : "black" }} to="/createuser">Signup</Link>
        </div> : 

        <div>
          <div className="btn bg-white  mx-2" style={{color : "black" , fontWeight : "bold"  , border : "1px solid black"}} onClick={()=>setCartView(true)}>MyCart {"  "}
            <Badge pill bg = "danger">{data.length}</Badge>
          </div>

          {/* if cartview is true show modal if false hide modal 
          when we close modal setCartView become false and it gets close */}
          {
            cartView? <Modal onClose={()=>setCartView(false)}><Cart/></Modal> : null
          }

          <div className="btn bg-white text-danger mx-2" style={{fontWeight : "bold"  , border : "1px solid black"}} onClick={handleLogout}>Logout</div>
        </div>
      }
              
    </div>
  </div>
</nav>

      </div>
    </>
  );
}
