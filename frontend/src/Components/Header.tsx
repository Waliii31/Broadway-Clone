import { useState, useContext } from "react";
import { X, Menu, ShoppingCart, User } from "lucide-react";
import { CartContext } from "../context/CartContext"; // Import Context
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartItems } = useContext(CartContext) || { cartItems: [] }; // ✅ Get cart state

  return (
    <header className="bg-[#202020] px-6 text-white w-full py-5 flex justify-between items-center shadow-lg fixed top-0 z-50">
      {/* Logo */}
      <div className="flex items-center cursor-pointer">
        <img onClick={()=> navigate("/")} src={logo} className="h-10" alt="Logo" />
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex space-x-6 text-lg">
        <a href="/" className="text-yellow-400 transition">Home</a>
        <a href="/menu" className="hover:text-yellow-400 transition">Menu</a>
        <a href="/contact" className="hover:text-yellow-400 transition">Contact</a>
      </nav>

      {/* Right Side (Cart & Account) */}
      <div className="flex items-center space-x-6">
        {/* Cart Icon with Count */}
        <a href="/cart" className="relative">
          <ShoppingCart className="text-2xl hover:text-yellow-400 transition" />
          {cartItems.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-full">
              {cartItems.length}
            </span>
          )}
        </a>

        {/* Account Icon */}
        <a href="#" className="hover:text-yellow-400 transition">
          <User className="text-2xl" />
        </a>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-2xl cursor-pointer" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-20 left-0 h-full max-h-[89vh] w-full bg-[#202020] text-white flex flex-col items-center justify-center z-10 py-5 space-y-6 shadow-lg md:hidden">
          <a href="/" className="text-xl text-yellow-400 transition">Home</a>
          <a href="/menu" className="text-xl hover:text-yellow-400 transition">Menu</a>
          <a href="#" className="text-xl hover:text-yellow-400 transition">Contact</a>
          <a href="/cart" className="text-xl flex items-center space-x-2 hover:text-yellow-400 transition">
            <ShoppingCart className="text-xl" />
            <span>Cart</span>
          </a>
          <a href="#" className="text-lg flex items-center space-x-2 hover:text-yellow-400 transition">
            <User className="text-xl" />
            <span>Account</span>
          </a>
        </div>
      )}
    </header>
  );
};

export default Header;
