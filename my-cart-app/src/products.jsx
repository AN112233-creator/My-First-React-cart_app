
import React, { useState, useContext, useEffect } from "react";
import  {Link} from 'react-router-dom';
import { CartContext } from "./CartContext.jsx";
import "./products.css";

import carticon from "./assets/images/icons/cart-icon.png";
import searchicon from "./assets/images/icons/search-icon.png";
import amazonlogo from "./assets/images/amazon-logo-white.png";
import amazonmobilelogo from "./assets/images/amazon-mobile-logo-white.png";
import checkmark from "./assets/images/icons/checkmark.png";
import  socks from "./assets/images/products/athletic-cotton-socks-6-pairs.jpg";
import  basketball from "./assets/images/products/intermediate-composite-basketball.jpg";
import  tshirt from "./assets/images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg"
import toaster from "./assets/images/products/black-2-slot-toaster.jpg";
import plates from "./assets/images/products/6-piece-white-dinner-plate-set.jpg";
import hoodie from "./assets/images/products/plain-hooded-fleece-sweatshirt-yellow.jpg";
import towel from "./assets/images/products/luxury-tower-set-6-piece.jpg";
import bakeware from "./assets/images/products/6-piece-non-stick-baking-set.webp";
import Cart from "./cart.jsx";




 
  export const products = [
    {
      id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      image: socks,
      name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
      rating: { stars: 4.5, count: 87 },
      priceCents: 1090,
      keywords: ["socks", "sports", "apparel"],
    },
    {
      id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      image: basketball,
      name: "Intermediate Size Basketball",
      rating: { stars: 4.5, count: 127 },
      priceCents: 2095,
      keywords: ["basketball", "sports"],
},
{
  id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
  image: tshirt,
  name: "Adults Plain Cotton T-Shirt - 2 Pack",
  rating: {
    stars: 4.5,
    count: 56
  },
  priceCents: 799,
  keywords: [
    "tshirts",
    "apparel",
    "mens"
  ],
  type: "clothing",
  sizeChartLink: "images/clothing-size-chart.png"
},
{
  id: "54e0eccd-8f36-462b-b68a-8182611d9add",
  image: toaster,
  name: "2 Slot Toaster - Black",
  rating: {
    stars: 5,
    count: 2197
  },
  priceCents: 1899,
  keywords: [
    "toaster",
    "kitchen",
    "appliances"
  ]
},
{
  id: "3ebe75dc-64d2-4137-8860-1f5a963e534b",
  image: plates,
  name: "6 Piece White Dinner Plate Set",
  rating: {
    stars: 4,
    count: 37
  },
  priceCents: 2067,
  keywords: [
    "plates",
    "kitchen",
    "dining"
  ]
},{
  id: "8c9c52b5-5a19-4bcb-a5d1-158a74287c53",
  image: bakeware,
  name: "6-Piece Nonstick, Carbon Steel Oven Bakeware Baking Set",
  rating: {
    stars: 4.5,
    count: 175
  },
  priceCents: 3499,
  keywords: [
    "kitchen",
    "cookware"
  ]
},
{
  id: "dd82ca78-a18b-4e2a-9250-31e67412f98d",
  image: hoodie,
  name: "Plain Hooded Fleece Sweatshirt",
  rating: {
    stars: 4.5,
    count: 317
  },
  priceCents: 2400,
  keywords: [
    "hoodies",
    "sweaters",
    "apparel"
  ]
},
{
  id: "77919bbe-0e56-475b-adde-4f24dfed3a04",
  image: towel,
  name: "Luxury Towel Set - Graphite Gray",
  rating: {
    stars: 4.5,
    count: 144
  },
  priceCents: 3599,
  keywords: [
    "bathroom",
    "washroom",
    "restroom",
    "towels",
    "bath towels"
  ]
}
  ];

function Product (){

   const {addToCart, cart, formatCurrency} =  useContext(CartContext); 
  const [cartNumber , setCartNumber] = useState(0);
  const [selectedQuantity, setSelectedQuantity] = useState({});
  const [isClickedAdd, setIsClickedAdd]  = useState({});

  /*  useEffect(() => {
      const savedCarts = JSON.parse(localStorage.getItem('carts'));
    
      if (savedCarts){
         setCart(savedCarts) 
        console.log("isSaving")
      }
      else {
        "is not saving"
      }
    }) */
   
    useEffect(() => {
     if (cart.length > 0 ) {
      localStorage.setItem('carts', JSON.stringify(cart))
      console.log("hello")
     }
    }, [cart])


  function handleQuantityChange(productId, quantity) {
    setSelectedQuantity((prevQuantities) => ({
      ...prevQuantities,
      [productId]: quantity, // Store quantity for only this product
    }));
  }
   function handleAddToCart(){
        let quantity = 0;
        cart.forEach((cartItem) => {
          quantity += cartItem.quantity;  
          return quantity;
    })
     setCartNumber(quantity);

  }  

  function addClassForTimeout (productId){
  setIsClickedAdd((prevSate) => ({
    ...prevSate,
    [productId]:true,
  }));

  setTimeout(() => {
    setIsClickedAdd((prevSate) => ({
      ...prevSate,
      [productId]:false,
    }));
  }, 2000)
  
  


  }
  useEffect(() => {
   handleAddToCart(); 
  }, [cart]);




  

  return(

    <>
    <div className="amazon-header">

<div className="amazon-header-left-section">

          <img className="amazon-logo"
            src={amazonlogo} />
          <img className="amazon-mobile-logo"
            src= {amazonmobilelogo} />
      
  </div>

  <div className="amazon-header-middle-section">
        <input className="search-bar" type="text" placeholder="Search" />

        <button className="search-button">
          <img className="search-icon" src= {searchicon} />
        </button>
      </div>

      <div className="amazon-header-right-section">
        <Link to="/cart" className="orders-link header-link"  >
          <span className="returns-text">Returns</span>
          <span className="orders-text">& Orders</span>
        </Link>

        <Link  to="/cart" className="cart-link header-link">
          <img className="cart-icon" src= {carticon} />
          <div className="cart-quantity js-cart-quantity">{cartNumber}</div>
          <div className="cart-text">Cart</div>
        </Link> 
      </div>

    </div>

     <div className="products-grid js-products-grid">     
   {
      products.map ((product, index) => 
  
     <div key={index} className="product-container">
     <div className="product-image-container">
      <img className="product-image"
        src={product.image}
        alt="Product" />
    </div>

    <div className="product-name limit-text-to-2-lines">
    {product.name}
    </div>
  

    <div className="product-price">
    {/*  ${(Math.round(product.priceCents)/100).toFixed(2)} */}

      ${formatCurrency(product.priceCents)}
    
        </div>

    <div className="product-quantity-container">
      <select value={selectedQuantity[product.id] || 1} className="product-quantity js-product-quantity" onChange={(e) => handleQuantityChange(product.id, Number(e.target.value))}  >
        <option value="1" >1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
    </div>


    <div className="product-spacer"></div>

    <div className=/* "added-to-cart" */ {`added-to-cart ${isClickedAdd[product.id] ? "added-visible" : "" }`}> 
      Added
    </div>

    <button className="add-to-cart-button button-primary js-add-to-cart-button" onClick={ () => {addToCart(product, selectedQuantity[product.id] || 1); addClassForTimeout(product.id)}}>
      Add to Cart
    </button>
    </div>
  )
  }
 </div>
 


    </>


 


 
             
  )

}

export default Product;


