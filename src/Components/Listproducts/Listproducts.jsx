import React, { useEffect, useState } from 'react'
import './Listproducts.css'
import BASE_URL from "../../service/BaseAddress";
import cross_icon from '../../Assets/cart_cross_icon.png'
import { toast } from 'react-toastify';

const Listproducts = () => {
  const [products,setProducts]=useState([]);
  const fetchinfo = async()=>{
    fetch(`${BASE_URL}/allproducts`).then((resp)=>resp.json()).then((data)=>setProducts(data))
  }
  useEffect(()=>{
    fetchinfo();
  },[])

  const remove_product = async(id)=>{
    let responsedata = await fetch(`${BASE_URL}/deleteproduct`,{
        method:'POST',
        headers:{
          Accept:'application/json',
          'Content-Type':'application/json',
        },
        body:JSON.stringify({id:id})
      })
      let data = await responsedata.json();
      if(data.success){
        toast.success("Item deleted");
      }
      else{
        toast.error("Failed in deleting ");
      }
      fetchinfo();
  }
  return (
    <div className='listproducts'>
      <div className="topic-details">
        <p className="product-img">Product</p>
        <p className="product-title">Title</p>
        <p className="product-old-price">Old Price</p>
        <p className="product-new-price">New Price</p>
        <p className="product-category">Category</p>
        <p className="remove-product">Remove</p>
      </div>
      <hr/>
      <div className="display-products">
        {
            products.map((e)=>{
                   return(
                    <React.Fragment key={e.id}>
                    <div className="in-small">{e.name}</div>
                    <div className='display-products-inside-one' key={e.id}>
                    <div className="product-img"><img src={e.image} alt="" /></div>
                    <div className="product-title">{e.name}</div>
                    <div className="product-old-price">${e.old_price}</div>
                    <div className="product-new-price">${e.new_price}</div>
                    <div className="product-category">{e.category}</div>
                    <div className="remove-product" ><img src={cross_icon} alt="" onClick={()=>remove_product(e.id)}/></div>
                    </div>
                    <hr/>
                    </React.Fragment>
                   )
            })
        }
      </div>
    </div>
  )
}

export default Listproducts
