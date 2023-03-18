import React, { useState  } from "react";
import { Link , useNavigate } from "react-router-dom";
import Navbar from "../Navbar";

export default function Signup() {
    
  const navigate = useNavigate()
  

  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    geolocation: "",
  });

  const handlesubmit = async (event) => {
    event.preventDefault();
    console.log(JSON.stringify({  name : credentials.name,  email : credentials.email , password : credentials.password , location : credentials.location }))

    // const response = await fetch("https://food-0s7o.onrender.com/api/createuser", {
    const response = await fetch("http://localhost:5000/api/createuser", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        location: credentials.geolocation,
      }),

    });
    
    const json = await response.json();
    if(json.success){
        navigate("/")
    }
   
  };

  const onchange = (event) => {
    const { name, value } = event.target;
    setCredentials((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  };

  return (
    <>
    <div>
      <Navbar/>
     </div>
     <div className="container-fluid d-flex overflow-hidden" style={{ backgroundImage: 'url("https://images.pexels.com/photos/1565982/pexels-photo-1565982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', backgroundSize: 'cover',height: '100vh' , backgroundRepeat : "no-repeat",
      backgrounPosition: "center center",
      backgroundAttachment : "fixed" }}>
     
      <div className="container">
        <form className="w-100 w-md-50 m-auto mt-5 border bg-dark border-success rounded" onSubmit={handlesubmit}>
          <div className="m-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control form-control-lg"
              name="name"
              value={credentials.name}
              onChange={onchange}
              
            />
          </div>

          <div className="m-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control form-control-lg"
              name="email"
              value={credentials.email}
              onChange={onchange}
              aria-describedby="emailHelp"
            />
          </div>

          <div className="m-3">
          <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control form-control-lg"
              name="password"
              value={credentials.password}
              onChange={onchange}
            />
          </div>

          <div className="m-3">
           <label htmlFor="location" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control form-control-lg"
              name="geolocation"
              value={credentials.geolocation}
              onChange={onchange}
            />
          </div>

          <button type="submit" style={{fontSize : "20px"}} className=" m-3 btn btn-success">
            Submit
          </button>
          <Link to="/login" style={{fontSize : "20px"}} className="m-3 btn btn-danger">
            Already a user
          </Link>
        </form>
      </div>
      </div>
      {/* <div> <Footer/>  </div> */}
    </>
  );
}