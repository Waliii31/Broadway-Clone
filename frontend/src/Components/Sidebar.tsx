interface SidebarProps {
  activePage: string;
  setActivePage: (page: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activePage, setActivePage }) => {
  return (
    <aside className="w-60 bg-[#202020] p-4 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
      <ul>
        <li
          className={`py-2 px-3 rounded-md cursor-pointer mb-2 ${activePage === "sections" ? "bg-yellow-500 text-black" : "bg-gray-800"
            }`}
          onClick={() => setActivePage("sections")}
        >
          Manage Sections
        </li>
        <li
          className={`py-2 px-3 rounded-md cursor-pointer mb-2 ${activePage === "products" ? "bg-yellow-500 text-black" : "bg-gray-800"
            }`}
          onClick={() => setActivePage("products")}
        >
          Add Products
        </li>
        <li
          className={`py-2 px-3 rounded-md cursor-pointer mb-2 ${activePage === "view-products" ? "bg-yellow-500 text-black" : "bg-gray-800"
            }`}
          onClick={() => setActivePage("view-products")}
        >
          View Products
        </li>
        <li
          className={`py-2 px-3 rounded-md cursor-pointer ${activePage === "admins" ? "bg-yellow-500 text-black" : "bg-gray-800"
            }`}
          onClick={() => setActivePage("admins")}
        >
          Add Admin
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;