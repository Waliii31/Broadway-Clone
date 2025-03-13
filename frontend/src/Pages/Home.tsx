import { useState } from "react";
import SideNav from "../Components/SideNav";
import MenuSections from "../Components/MenuSections";
import Cart from "../Components/Cart";

type CartItem = {
  id: string;
  quantity: number;
};

const Home = () => {
  const [activeComponent, setActiveComponent] = useState<"main" | "cart">("main");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (itemId: string) => {
    setCartItems((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === itemId);
  
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { id: itemId, quantity: 1 }];
      }
    });
  };

  return (
    <div className="bg-[#121212] w-full h-full min-h-screen flex justify-between items-start"> 
      <SideNav setActiveComponent={setActiveComponent} cartNum={cartItems.length} />
      {activeComponent === "cart" ? <Cart cartItems={cartItems} setCartItems={setCartItems} /> : <MenuSections addToCart={addToCart} />}
    </div>
  );
};

export default Home;