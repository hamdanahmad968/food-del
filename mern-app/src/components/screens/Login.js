import React, { useState } from "react";
import { Link , useNavigate} from "react-router-dom";
import Navbar from "../Navbar";
export default function Login() {


  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  let navigate = useNavigate()

  const handlesubmit = async (event) => {
    event.preventDefault();
    // const response = await fetch("https://food-0s7o.onrender.com/api/loginuser", {
    const response = await fetch("http://localhost:5000/api/loginuser", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),

    });
    
    const json = await response.json();
    console.log(json)
    if(!json.success){
        alert("Enter valid credentials")
    }
    if(json.success){
      localStorage.setItem("userEmail" , credentials.email);
      localStorage.setItem("authtoken" , json.authtoken);
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
      <div>
      <div className="container-fluid d-flex"  style={{backgroundImage: 'url("https://images.pexels.com/photos/326278/pexels-photo-326278.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', height: '100vh',   backgroundSize: "cover", 
      backgroundRepeat : "no-repeat",
      backgrounPosition: "center center",
      backgroundAttachment : "fixed"}}>
     
      <div className="container" >
        <form className='w-100 w-md-50 m-auto mt-5 border bg-dark border-success rounded' onSubmit ={handlesubmit}>
         
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
            <div id="emailHelp" className="form-text">We'll never share your email with anyone.</div>
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

        
          <button type="submit" className=" m-3 btn btn-success" style={{fontSize : "20px"}}>
            Submit
          </button>
          <Link to="/createuser" className="m-3 mx-1 btn btn-danger" style={{fontSize : "20px"}}>
             New User
          </Link> 
        </form>
      </div>
      </div>
      </div>
      {/* <div> <Footer/> </div> */}
    </>
  )
}