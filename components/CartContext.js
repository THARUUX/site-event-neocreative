import {createContext, useEffect, useState} from "react";
import { ToastContainer, toast } from 'react-toastify';


export const CartContext = createContext({});

export function CartContextProvider({children}) {
  const addToCartNotify = () => toast.success("The product has been successfully added to the cart!");

  
  const ls = typeof window !== "undefined" ? window.localStorage : null;
  const [cartProducts,setCartProducts] = useState([]);

  useEffect(() => {
    if (cartProducts?.length > 0) {
      ls?.setItem('cart', JSON.stringify(cartProducts));
    }
  }, [ls, cartProducts]);


  useEffect(() => {
    if (ls && ls.getItem('cart')) {
      setCartProducts(JSON.parse(ls.getItem('cart')));
    }
  }, [ls]);

  function addProduct(productId) {
    setCartProducts(prev => [...prev,productId]);
    addToCartNotify();
  }

  function removeProduct(productId) {
    setCartProducts(prev => {
      const pos = prev.indexOf(productId);
      if (pos !== -1) {
        return prev.filter((value,index) => index !== pos);
      }
      return prev;
    });
  }

  function clearCart() {
    setCartProducts([]);
  }
  
  return (
    
    <CartContext.Provider value={{cartProducts,setCartProducts,addProduct,removeProduct,clearCart}}>
          <ToastContainer position="top-center"/>

      {children}
    </CartContext.Provider>
  );
}