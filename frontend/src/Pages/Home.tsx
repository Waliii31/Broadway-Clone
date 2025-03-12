import { useState } from "react";
import SideNav from "../Components/SideNav";
import MenuSections from "../Components/MenuSections";
import Cart from "../Components/Cart";

const Home = () => {
  const [activeComponent, setActiveComponent] = useState<"main" | "cart">("main");
  const [cartItems, setCartItems] = useState<string[]>([]); // ✅ Type the cartItems array

  const addToCart = (itemId: string) => {
    setCartItems((prevCart) => [...prevCart, itemId]); // ✅ Add the correct item ID
  };

  return (
    <div className="bg-[#121212] w-full h-full min-h-screen flex justify-between items-start"> 
      <SideNav setActiveComponent={setActiveComponent} cartNum={cartItems.length} />
      {activeComponent === "cart" ? <Cart cartItems={cartItems} /> : <MenuSections addToCart={addToCart} />}
    </div>
  );
};

export default Home;
