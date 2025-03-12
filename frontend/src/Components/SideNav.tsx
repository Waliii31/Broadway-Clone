import { House, Menu, ScrollText, ShoppingCart, User } from "lucide-react";

interface SideNavProps {
  setActiveComponent: (component: "main" | "cart") => void; // ✅ Function prop
  cartNum: number; // ✅ Add cartNum as a prop
}

const SideNav = ({ setActiveComponent, cartNum }: SideNavProps) => {
  return (
    <div className="flex sticky top-0 left-0 bg-[#202020] h-full min-h-screen w-20 flex-col justify-between border-e border-[#202020]">
      <div>
        <div className="px-4">
          <ul className="space-y-10 pt-3">
            <li>
              <a href="#" className="group bg-black relative flex justify-center rounded-full px-2 py-3">
                <Menu color="#fff" strokeWidth={2} />
              </a>
            </li>

            {/* Home Button */}
            <li>
              <button
                onClick={() => setActiveComponent("main")}
                className="group relative cursor-pointer flex justify-center rounded-full px-2 py-2.5 bg-yellow-400"
              >
                <House color="#fff" />
              </button>
            </li>

            <li>
              <a href="#" className="group relative flex justify-center rounded-sm px-2 py-2.5">
                <ScrollText size={30} color="#fff" />
              </a>
            </li>

            {/* Cart Button */}
            <li>
              <button
                onClick={() => setActiveComponent("cart")}
                className="group relative cursor-pointer flex justify-center rounded-sm px-2 py-2.5"
              >
                <ShoppingCart size={30} color="#fff" />
                {/* ✅ Show cart count dynamically */}
                {cartNum > 0 && (
                  <span className="absolute top-0 right-0 bg-yellow-400 text-white text-sm py-0.2 rounded-full px-1.5 font-semibold">
                    {cartNum}
                  </span>
                )}
              </button>
            </li>

            <li>
              <a href="#" className="group relative flex justify-center rounded-sm px-2 py-2.5">
                <User size={30} color="#fff" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SideNav;
