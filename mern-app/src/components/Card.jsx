import React ,{useEffect, useRef, useState ,} from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatchCart , useCart } from './ContextReducer';

export default function Card(props) {

//  using the ---useCart and useDispatchCart--- hook to get the state value from the context
//    and is  used to consume the CartStateContext. This allows the card component to access the current state of the cart  which was set by the CartProvider component in the contextreducerjs file

  let dispatch = useDispatchCart()
  let data = useCart()

  const priceref = useRef()

  // Then Object.keys(options) will return an array ['small', 'medium', 'large']
  let options = props.options;
  let priceOptions = Object.keys(options)
  
  let navigate = useNavigate()
  const [qty, setQty] = useState(1)
  const [size, setSize] = useState("")

  // const handleClick = () => {
  //   if (!localStorage.getItem("authtoken")) {
  //     navigate("/login")
  //   }
  // }

  //when handletocart function runs it dispatch the action method "ADD" which is declared in contextreducer file // 
  const handleAddToCart = async () => {
   
    if (!localStorage.getItem("authtoken")) {
      navigate("/login")
    }

    
    let food = []
    for (const item of data){
      if(item.id === props.foodItem._id){
        food = item;
        break;
      }
    }
    if (food !== []){
      if(food.size === size){
        await dispatch ({type : "UPDATE",
                       id : props.foodItem._id,
                       price : finalPrice,
                       qty : qty,
  }) 
  return

      }
      else if(food.size !== size){
        await dispatch ({type : "ADD",
                      id : props.foodItem._id,
                      name : props.foodItem.name,
                      price : finalPrice,
                      qty : qty,
                      size : size

      })
      return
    }

    return
  }
  await dispatch ({type : "ADD",
  id : props.foodItem._id,
  name : props.foodItem.name,
  price : finalPrice,
  qty : qty,
  size : size

})
  }

  
  let finalPrice = qty * parseInt(options[size]);


//  useEffect hook is used to perform some side-effect (such as setting a state or updating the DOM) after the component is rendered//
useEffect(()=>{
  setSize(priceref.current.value)
},[])

  return (
    <div>
    <div
      className="card mt-3"
      style={{ width: "auto", maxHeight: "350px" ,  color : "cyan" }}
    >
      <img src={props.foodItem.img} className="card-img-top" alt="food"  style={{ height: "170px", objectFit: "fill" , border : "3px solid white"}}/>
      <div className="card-body" style={{border : "3px solid white" , backgroundColor : "black"}}>
        <h5 className="card-title" style ={{color : "cyan"}}> {props.foodItem.name}</h5>
        {/* <p className="card-text">this is hamdan text</p> */}
        <div className="container w-100 p-0" style={{ height: "38px" ,color : "cyan"  }}>
          <select className="m-2 h-100  w-20 bg-success text-black rounded" style={{ select: "#FF0000" , fontWeight : "bold" }}  onChange={(e)=>setQty(e.target.value)}>

           a represents the current value of the array
          i represents the current index of the array 
            {Array.from(Array(5), (a, i) => {
              return (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              );
            })}
          </select>
          <select className="m-2 h-100 w-20 bg-success text-black rounded" style={{ select: "#FF0000" ,fontWeight : "bold" }} ref={priceref}  onChange={(e)=>setSize(e.target.value)}>
            {
              priceOptions.map((data)=>{
                return <option key={data} value = {data}>{data}</option>
              })
            }
          </select>

          <div className="d-inline ms-2 h-100 w-20 fs-5">₹{finalPrice}/-</div>

        </div>
        <hr></hr>
          <button className={`btn btn-success justify-center ms-2 `} style = {{color : "black" , backgroundColor : "cyan" , fontWeight : "bold"}} onClick={handleAddToCart}>Add to Cart</button>
      </div>
    </div>
  </div>
  )
}
