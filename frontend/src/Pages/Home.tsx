import { useState } from "react";
import SideNav from "../Components/SideNav";
import MenuSections from "../Components/MenuSections";
import Cart from "../Components/Cart";
import OrderDetails from "../Components/OrderDetails";

type CartItem = {
  id: string;
  quantity: number;
};

const Home = () => {
  const [activeComponent, setActiveComponent] = useState<"main" | "cart" | "orderDetails">("main");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [checkoutData, setCheckoutData] = useState<{ cartItems: CartItem[]; totalPrice: number } | null>(null);

  const addToCart = (itemId: string) => {
    setCartItems((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === itemId);
      return existingItem
        ? prevCart.map((item) =>
            item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
          )
        : [...prevCart, { id: itemId, quantity: 1 }];
    });
  };

  return (
    <div className="bg-[#121212] w-full h-full min-h-screen flex justify-between items-start"> 
      <SideNav setActiveComponent={setActiveComponent} cartNum={cartItems.length} />
      {activeComponent === "cart" ? (
        <Cart 
          cartItems={cartItems} 
          setCartItems={setCartItems} 
          onContinue={(data) => {
            setCheckoutData({
              cartItems: data.cartItems.map(({ productId, quantity }) => ({
                id: productId,
                quantity,
              })),
              totalPrice: data.totalPrice,
            });
            setActiveComponent("orderDetails");
          }}
        />
      ) : activeComponent === "orderDetails" ? (
        <OrderDetails checkoutData={checkoutData} />
      ) : (
        <MenuSections addToCart={addToCart} />
      )}
    </div>
  );
};

export default Home;
