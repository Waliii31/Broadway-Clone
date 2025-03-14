import { ArrowRight, Minus, Plus } from "lucide-react";
import axios from "axios";
import React, { useState, useEffect } from "react";

interface Product {
  _id: string;
  section: string;
  image: string;
  title: string;
  description: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  isNew: boolean;
}

type CartProps = {
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  onContinue: (data: { cartItems: { productId: string; quantity: number }[]; totalPrice: number }) => void;
};

interface CartItem {
  id: string;
  quantity: number;
}

const Cart: React.FC<CartProps> = ({ cartItems, setCartItems, onContinue }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (!cartItems.length) return;

    const fetchProducts = async () => {
      try {
        const responses = await Promise.all(
          cartItems.map((item) =>
            axios.post("http://localhost:3000/products/find-product", {
              productId: item.id,
            })
          )
        );

        setProducts(responses.map((res) => res.data));
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProducts();
  }, [cartItems]);

  const updateQuantity = (productId: string, amount: number) => {
    setCartItems((prevCart) =>
      prevCart.map((item) =>
        item.id === productId
          ? { ...item, quantity: Math.max(1, item.quantity + amount) }
          : item
      )
    );
  };

  // **Calculate Prices**
  const subtotal = products.reduce((total, product) => {
    const cartItem = cartItems.find((item) => item.id === product._id);
    return total + (cartItem ? cartItem.quantity * product.price : 0);
  }, 0);

  const deliveryCharge = 60; // Only add delivery charge if cart is not empty
  const gst = subtotal * 0.15;
  const totalAmount = subtotal + deliveryCharge + gst;

  const handleCheckout = () => {
    onContinue({
      cartItems: cartItems.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      })),
      totalPrice: totalAmount,
    });
  };


  return (
    <div className="w-full min-h-screen h-full p-4">
      <h1 className="text-5xl text-center mt-10 text-white font-semibold mb-4">
        Your Cart
      </h1>
      {cartItems.length > 0 ? (
        <div className="flex flex-col md:flex-row mt-10 md:mt-20 justify-center items-center md:items-start gap-10 md:gap-16">
          {/* Cart Items */}
          <div className="flex flex-col justify-center gap-5 items-center w-full md:w-auto">
            {products.map((product) => {
              const cartItem = cartItems.find((item) => item.id === product._id);
              return (
                <div
                  key={product._id}
                  className="flex flex-col sm:flex-row items-center bg-[#1C1C1D] text-white p-4 rounded-lg w-full max-w-5xl md:max-w-lg"
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-24 h-24 rounded-lg object-cover"
                  />
                  <div className="ml-0 sm:ml-4 flex-1 text-center sm:text-left">
                    <h2 className="text-lg font-bold">{product.title}</h2>
                    <p className="text-gray-400 text-sm">{product.description}</p>
                  </div>
                  <div className="flex items-center space-x-2 mt-3 sm:mt-0">
                    <button
                      className="bg-[#57491A] text-black w-8 h-8 rounded-full flex items-center justify-center"
                      onClick={() => updateQuantity(product._id, -1)}
                    >
                      <Minus size={15} />
                    </button>
                    <span className="text-lg font-bold">
                      {cartItem?.quantity || 1}
                    </span>
                    <button
                      className="bg-[#FFC714] text-black w-8 h-8 rounded-full flex items-center justify-center"
                      onClick={() => updateQuantity(product._id, 1)}
                    >
                      <Plus size={15} />
                    </button>
                  </div>
                  <span className="ml-0 sm:ml-4 bg-yellow-700 text-black px-3 py-1 rounded-lg mt-3 sm:mt-0">
                    Rs {cartItem?.quantity ? cartItem.quantity * product.price : product.price}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Price Summary */}
          <div className="flex w-80 flex-col gap-3">
            <div className=" flex flex-col gap-2">
              <div className="text-md flex justify-between w-full max-w-sm">
                <h4 className="text-gray-300 font-semibold">Subtotal:</h4>
                <h4 className="text-white font-semibold">Rs {subtotal}</h4>
              </div>
              <div className="text-md flex justify-between w-full max-w-sm">
                <h4 className="text-gray-300 font-semibold">GST 15%:</h4>
                <h4 className="text-white font-semibold">Rs {gst}</h4>
              </div>
              <div className="text-md flex justify-between w-full max-w-sm">
                <h4 className="text-gray-300 font-semibold">Delivery:</h4>
                <h4 className="text-white font-semibold">Rs {deliveryCharge}</h4>
              </div>
              <div className="flex justify-between w-full max-w-sm">
                <h4 className="text-[#FFC714] text-xl font-semibold">Total:</h4>
                <h4 className="text-white text-xl font-bold">Rs {totalAmount}</h4>
              </div>
            </div>
            <button
              className="bg-[#292929] text-white cursor-pointer px-6 py-3 rounded-lg mt-5 flex justify-center gap-2 items-center text-xl"
              onClick={handleCheckout}
            >
              Proceed To Checkout <ArrowRight />
            </button>
          </div>
        </div>
      ) : (
        <div className="text-white flex justify-center items-center text-center mt-10 w-full h-full min-h-[78vh]">
          <div className="bg-[#FDC700] w-56 h-56 rounded-full flex justify-center items-center">
            <p className="font-normal text-3xl">Your Cart is <br /> <span className="font-bold">Empty</span></p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;