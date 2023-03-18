import React, { useState, useEffect } from "react";
import Card from "../Card";
import Footer from "../Footer";
import Navbar from "../Navbar";

export default function Home () {
  const [Search , setSearch] = useState("")
  const [foodItems, setfoodItems] = useState([]);
  const [foodCategory, setfoodCategory] = useState([]);

  const loadData = async () => {
    // let response = await fetch("https://food-0s7o.onrender.com/api/foodData", {
    let response = await fetch("http://localhost:5000/api/foodData", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
    });
    response = await response.json();
    setfoodItems(response[0]);
    setfoodCategory(response[1]);

    // console.log(response[0], response[1]);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <div> <Navbar /></div>
      <div> <div>
      <div
        id="carouselExampleFade"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel" style={{objectFit : "fill"}}
      >
        <div className="carousel-inner" id="carousel">
          <div className="carousel-caption" style={{ zIndex: "10" }}>
            <div className="d-flex justify-content-center">
              <input
                className="form-control me-2 w-75 bg-white text-dark"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={Search}
                onChange = {(e)=>{setSearch(e.target.value)}}
              />
             
            </div>
          </div>
          <div className="carousel-item active">
            <img
              src="https://source.unsplash.com/random/400×300/?pasta"
              className="d-block w-100"
              style={{ filter: "brightness(30%)" }}
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://source.unsplash.com/random/400×300/?fries"
              className="d-block w-100"
              style={{ filter: "brightness(30%)" }}
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://source.unsplash.com/random/400×300/?burger"
              className="d-block w-100"
              style={{ filter: "brightness(30%)" }}
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://source.unsplash.com/random/400×300/?pizza"
              className="d-block w-100"
              style={{ filter: "brightness(30%)" }}
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://source.unsplash.com/random/400×300/?pastry"
              className="d-block w-100"
              style={{ filter: "brightness(30%)" }}
              alt="..."
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div></div>
      
      <div className='container'> {/* boootstrap is mobile first */}
        {
          foodCategory !== []
            ? foodCategory.map((data) => {
              return (
                // justify-content-center
                <div className='row mb-3'>
                  <div key={data.id} className='fs-3 m-3'>
                    {data.CategoryName}
                  </div>
                  <hr id="hr-success" style={{ height: "4px", backgroundImage: "-webkit-linear-gradient(left,rgb(0, 255, 137),rgb(0, 0, 0))" }} />
                  {foodItems !== [] ? foodItems.filter(
                    (items) => (items.CategoryName === data.CategoryName) && (items.name.toLowerCase().includes(Search.toLowerCase())))
                    .map(filterItems => {
                      return (
                        <div key={filterItems.id} className="col-sm-12 col-md-6 col-lg-4">
                           <Card 
                           foodItem = {filterItems}
                            options = {filterItems.options[0]}
                           />
                        </div>
                      )
                    }) : <div> No Such Data </div>}
                </div>
              )
            })
            : ""}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}