

import React, {useContext} from 'react';
import { useState, useEffect } from 'react';
import  {Link} from 'react-router-dom';
import "./cart.css";
import carticon from "./assets/images/icons/cart-icon.png";
import searchicon from "./assets/images/icons/search-icon.png";
import amazonlogo from "./assets/images/amazon-logo-white.png";
import amazonBlack from "./assets/images/amazon-logo.png";
import amazonMobileBlack from "./assets/images/amazon-mobile-logo.png"
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
import checkoutLockIcon from "./assets/images/icons/checkout-lock-icon.png";
import { CartContext } from './CartContext';
import Product from './products';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

    
/* const deliveryOptionsForDate = [{
  id: '1',
  deliveryDays: '7',
  priceCents: 0

},
{
  id: '2',
  deliveryDays: '3',
  priceCents: 499
},
{
  id: '3',
  deliveryDays: '1',
  priceCents: 799
}
] */


function Cart() {

  const {cart, removeFromCart, formatCurrency} = useContext(CartContext)
  const [cartNumber , setCartNumber] = useState(0);
  const [deliveryOptions, setDeliveryOptions] = useState({});

 
  

  useEffect(() => {
        handleAddToCart();

        const defaultDeliveryOptions = {};
        cart.forEach((cartItem) => {
          defaultDeliveryOptions[cartItem.id] = "free"; // Default to "FREE Shipping"
        });
        setDeliveryOptions(defaultDeliveryOptions);


      }, [cart]);

      function handleAddToCart(){
            let quantity = 0;
            cart.forEach((cartItem) => {
              quantity += cartItem.quantity;  
              return quantity;
            })
            setCartNumber(quantity);
      } 
    

    function deliveryOptionOne (){
        const today = dayjs();
          const deliveryDate = today.add(7, 'days')
      
          const dateString = deliveryDate.format('dddd, MMMM D')
          
          
          return dateString;
    }
    function deliveryOptionTwo (){
          const today = dayjs();
          const deliveryDate = today.add(4, 'days')
          const dateString = deliveryDate.format('dddd, MMMM D')
          return dateString;
    }

   
    function deliveryOptionThree (){
            const today = dayjs();
            const deliveryDate = today.add(1, 'days')
            const dateString = deliveryDate.format('dddd, MMMM D')
            return dateString;
    }

     // Handle delivery option change
  function handleDeliveryChange(itemId, option) {
            setDeliveryOptions((prev) => ({
            ...prev,
            [itemId]: option,
    }));
  }


  let productPriceCents = 0;
  cart.forEach((cartItem) => {
    productPriceCents += cartItem.priceCents * cartItem.quantity
  })


  


   



  return (
    
      <>
              <div className="checkout-header">  
                <div className="header-content">
                  <div className="checkout-header-left-section">
                    <Link to="/">
                      <img className="amazon-logo" src={amazonBlack} />
                      <img className="amazon-mobile-logo" src={amazonMobileBlack} />
                    </Link>
                  </div>

                  <div className="checkout-header-middle-section">
                    Checkout (<Link className="return-to-home-link js-checkout-items" to="/">{cartNumber} items</Link>)
                  </div>

                  <div className="checkout-header-right-section">
                    <img src={checkoutLockIcon} />
                  </div>
                </div>
              </div>
              <div>
              </div>

              <div className="main">
              <div className="page-title">Review your order</div>

              <div className="checkout-grid">
                  <div className="order-summary js-order-summary">

                    { cart.map((cartItem) => 
                    
                  
                    <div key={cartItem.id} className="cart-item-container">
                    <div className="delivery-date">
                    {/*   Delivery date: Tuesday, June 21 */}
                    Delivery date: {deliveryOptions[cartItem.id] === "free" ? deliveryOptionOne() : 
                                          deliveryOptions[cartItem.id] === "standard" ? deliveryOptionTwo() : 
                                          deliveryOptionThree()}
                    </div>
                  
          <div className="cart-item-details-grid">
            <img className="product-image"
              src={cartItem.image}
              alt="Product" />
         
                <div className="cart-item-details">
                    <div className="product-name">
                      {cartItem.name}
                        </div>
                          <div className="product-price">
                            ${formatCurrency(cartItem.priceCents)}
                              </div>
                                <div className="product-quantity">
                                <span>
                                Quantity: <span className="quantity-label">{cartItem.quantity}</span>
                                </span>
                                <span className="update-quantity-link link-primary">
                              Update
                            </span>
                            <span className="delete-quantity-link link-primary" onClick={ () => removeFromCart(cartItem.id)}>
                          Delete
                      </span>
                    </div>
                </div>

            <div className="delivery-options">
              <div className="delivery-options-title">
                Choose a delivery option:
              </div>
              <div className="delivery-option">
                <input type="radio" 
                  className="delivery-option-input"
                  name={`delivery-option-${cartItem.id}`}
                  checked={deliveryOptions[cartItem.id] === "free"}
                  onChange={() => handleDeliveryChange(cartItem.id, "free")}
                  />
                 
                      
                <div>
                  <div className="delivery-option-date">
                  {/*  Tuesday, June 21 */}  {deliveryOptionOne()} 
                  </div>
                  <div className="delivery-option-price">
                    FREE Shipping
                  </div>
                </div>
              </div>
              <div className="delivery-option">
                <input type="radio"
                  className="delivery-option-input"
                  name={`delivery-option-${cartItem.id}`} 
                  checked={deliveryOptions[cartItem.id] === "standard"}
                        onChange={() => handleDeliveryChange(cartItem.id, "standard")}
                  />
                <div>
                  <div className="delivery-option-date">
                    {/* Wednesday, June 15 */} {deliveryOptionTwo()}
                  </div>
                  <div className="delivery-option-price">
                    $4.99 - Shipping
                  </div>
                </div>
              </div>
              <div className="delivery-option">
                <input type="radio"
                  className="delivery-option-input"
                  name={`delivery-option-${cartItem.id}`}
                        checked={deliveryOptions[cartItem.id] === "express"}
                        onChange={() => handleDeliveryChange(cartItem.id, "express")}/>
                <div>
                  <div className="delivery-option-date">
                    {/* Monday, June 13 */}{deliveryOptionThree()}
                  </div>
                  <div className="delivery-option-price">
                    $9.99 - Shipping
                  </div>
                </div>
              </div>
            </div>
          </div>
         </div>
         
        )
 
          }
        

        </div> 



        <div className="payment-summary js-payment-summary">
          <div className="payment-summary-title">
            Order Summary
          </div>

          <div className="payment-summary-row">
            <div>Items ({cartNumber}):</div>
            <div className="payment-summary-money">  

            ${
              formatCurrency(productPriceCents)
            }

          
              
              </div>
          </div>

          <div className="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div className="payment-summary-money">
              
             ${
                cart.reduce((total, item) => {
                  if (deliveryOptions[item.id] === "free") return total + 0;
                  if (deliveryOptions[item.id] === "standard") return total + 4.99;
                  if (deliveryOptions[item.id] === "express") return total + 9.99;
                  return total;
                }, 0).toFixed(2)
              } 
              
              </div>
          </div>

          <div className="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div className="payment-summary-money">
              
             ${
                ((cart.reduce((total, item) => total + item.priceCents * item.quantity, 0)  +
                cart.reduce((total, item) => {
                  if (deliveryOptions[item.id] === "free") return total + 0;
                  if (deliveryOptions[item.id] === "standard") return total + 499;
                  if (deliveryOptions[item.id] === "express") return total + 999;
                  return total;
                }, 0)) / 100).toFixed(2) 
              } 
          
              </div>
          </div>

          <div className="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div className="payment-summary-money">

              ${
              formatCurrency(  (cart.reduce((total, item) => total + item.priceCents * item.quantity, 0)  +
                cart.reduce((total, item) => {
                  if (deliveryOptions[item.id] === "free") return total + 0;
                  if (deliveryOptions[item.id] === "standard") return total + 499;
                  if (deliveryOptions[item.id] === "express") return total + 999;
                  return total;
                }, 0)) * 0.1)
              } 
            </div>
          </div>

          <div className="payment-summary-row total-row">
            <div>Order total:</div>
            <div className="payment-summary-money">

            ${
            formatCurrency ( (cart.reduce((total, item) => total + item.priceCents * item.quantity, 0)  +
                        cart.reduce((total, item) => {
                          if (deliveryOptions[item.id] === "free") return total + 0;
                          if (deliveryOptions[item.id] === "standard") return total + 499;
                          if (deliveryOptions[item.id] === "express") return total + 999;
                          return total;
                        }, 0)) 
             
             + 
             
                        (cart.reduce((total, item) => total + item.priceCents * item.quantity, 0)  +
                          cart.reduce((total, item) => {
                            if (deliveryOptions[item.id] === "free") return total + 0;
                            if (deliveryOptions[item.id] === "standard") return total + 499;
                            if (deliveryOptions[item.id] === "express") return total + 999;
                            return total;
                          }, 0)) * 0.1)
                      }

                      </div>
                      </div>

                  <button className="place-order-button button-primary">
                  Place your order
                </button> 
              </div>


            
            </div>


          </div>
            
            
    </>
  
  );
}

export default Cart;
