import React, { useState } from "react";
import "./Addproducts.css";
import BASE_URL from "../../service/BaseAddress";
import { toast } from 'react-toastify';

const Addproducts = () => {
  const [productData, setProductData] = useState({
    name: "",
    old_price: "",
    new_price: "",
    category: "women",
    image: "",
    available: true,
  });
  const [image,setImage]=useState(false);
  const imageHandler = (e)=>{
    setImage(e.target.files[0]);
  }
  const changeHandler = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const Add_product = async()=>{
    let product = productData;
    let formData = new FormData();
    formData.append('product',image);
    let responseData;
    await fetch(`${BASE_URL}/upload`,{
      method:'POST',
      headers:{
        Accept:'application/json',
      },
      body:formData,
    }).then((resp)=>resp.json()).then((data)=>{responseData=data});

    if(responseData.success){
      product.image=responseData.image_url;
      await fetch(`${BASE_URL}/addproduct`,{
        method:'POST',
        headers:{
          Accept:'application/json',
          'Content-Type':'application/json',
        },
        body:JSON.stringify(product),
      }).then((resp)=>resp.json()).then((data)=>{
        data.success?toast.success("Product Added successfully"):toast.error("Failed");
      })
    }
  }

  const clear_data = ()=>{
    setProductData({
      name: "",
      old_price: "",
      new_price: "",
      category: "women",
      image: "",
      available: true,
    })
    setImage(false);
  }
  return (
    <div className="addproducts">
      <div className="producttitle">
        <label htmlFor="pname">Product Title : </label>
        <input
          id="pname"
          name="name"
          type="text"
          value={productData.name}
          onChange={changeHandler}
          placeholder="Enter here"
          required
        />
      </div>
      <div className="price-class">
        <div>
          <label htmlFor="old-price">Old Price : </label>
          <input
            id="old-price"
            name="old_price"
            type="text"
            value={productData.old_price}
            onChange={changeHandler}
            placeholder="$"
            required
          />
        </div>
        <div>
          <label htmlFor="new-price">New Price : </label>
          <input
            id="new-price" type="text" name="new_price" value={productData.new_price} onChange={changeHandler} placeholder="$" required/>
        </div>
      </div>
      <div className="category-select">
        <label htmlFor="category">Category : </label>
        <select id="category" value={productData.category} onChange={changeHandler} name="category" >
          <option value="women">Women</option>
          <option value="men">Men</option>
          <option value="kid">Kids</option>
        </select>
      </div>
      <div className="image-upload">
        <p>{image==false?<><label htmlFor="image">Upload</label><input id="image" type="file" onChange={imageHandler} required hidden/></>:<img src={URL.createObjectURL(image)}/>}
        </p>
      </div>
      <div className="addproduct-btns">
        <button className="addproduct-btn" onClick={Add_product}>ADD</button>
        <button className="clrproduct-btn" onClick={clear_data}>CLEAR</button>
      </div>
    </div>
  );
};

export default Addproducts;
