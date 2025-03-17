import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import MenuSections from "../Components/MenuSections";

const Home = () => {
  const cartContext = useContext(CartContext);

  if (!cartContext) {
    throw new Error("Home must be used within a CartProvider");
  }

  return (
    <div className="bg-[#121212] w-full h-full mt-20 min-h-screen">
      <MenuSections />
    </div>
  );
};

export default Home;
