import React from 'react'
import { useCart , useDispatchCart } from '../ContextReducer'

export default function Cart() {
    // using the ---useCart and useDispatchCart--- hook to get the state value from the context
    //    and is  used to consume the CartStateContext.
    let data = useCart()
    let dispatch = useDispatchCart()

    if (data.length===0){
        return (
            <div>
                <div className='m-5 w-100 text-cen
                 fs-3'>The Cart is Empty</div>
            </div>
        )
    }

    const handleCheckOut = async()=>{
        let userEmail = localStorage.getItem("userEmail")
        // let response = await fetch("https://food-0s7o.onrender.com/api/orderData", {
        let response = await fetch("http://localhost:5000/api/orderData", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({
                // this data is from usercart()
                order_data : data,
                email : userEmail,
                order_date : new Date().toDateString()
            })

    } )

    // console.log("order response:" , response)
    if(response.status === 200){
        dispatch({type : "DROP"})
    }

}
   let totalPrice = data.reduce((total, food) => total + food.price, 0)
  return (
    <div>
        <div className='container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md' >
        <table className='table table-hover '>
          <thead className=' text-success fs-4'>
            <tr>
              <th scope='col' >#</th>
              <th scope='col' >Name</th>
              <th scope='col' >Quantity</th>
              <th scope='col' >Option</th>
              <th scope='col' >Amount</th>
              <th scope='col' ></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr>
                <th scope='row' >{index + 1}</th>
                <td >{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td ><button type="button" className="btn p-0" onClick={() => { dispatch({ type: "REMOVE", index: index }) }} >
                ❎ 
                </button> </td>
                </tr>
            ))}
          </tbody>
        </table>
        <div><h1 className='fs-2'>Total Price: {totalPrice}/-</h1></div>
        <div>
          <button className='btn bg-success mt-5 ' onClick={handleCheckOut} > Check Out </button>
        </div>
      </div>


    </div>
  )
}