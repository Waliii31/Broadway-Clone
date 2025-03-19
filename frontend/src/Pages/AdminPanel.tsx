import axios from "axios";
import { useEffect, useState } from "react";
import Sidebar from "../Components/Sidebar";
import Sections from "../Components/Sections";
import Products from "../Components/Products";
import ViewProducts from "../Components/ViewProducts";
import Admins from "../Components/Admins";
import ViewOrders from "../Components/ViewOrders";
const nestUrl = import.meta.env.VITE_NEST_BASE_URL;

type Section = {
  _id: string;
  title: string;
};

type Product = {
  _id: string;
  section: Section;
  imageUrl: string;
  title: string;
  description: string;
  price: number;
  oldPrice: number;
  discount: number;
  isNew: boolean;
};

type Admin = {
  adminName: string;
  adminEmail: string;
  adminPassword: string;
  adminRoles: string[];
};

const AdminPanel: React.FC = () => {
  const [activePage, setActivePage] = useState("sections");
  const [sections, setSections] = useState<Section[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [admins, setAdmins] = useState<Admin[]>([]);

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const response = await axios.get(`${nestUrl}/section`);
        setSections(response.data);
      } catch (error) {
        console.error("Error fetching sections:", error);
      }
    };

    fetchSections();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(`${nestUrl}/products`);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="p-6 bg-[#121212] text-white min-h-screen flex">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      <div className="flex-1 p-6">
        {activePage === "sections" && <Sections sections={sections} setSections={setSections} />}
        {activePage === "products" && <Products sections={sections} setProducts={setProducts} />}
        {activePage === "view-products" && (
          <ViewProducts products={products} setProducts={setProducts} />
        )}
        {activePage === "admins" && <Admins admins={admins} setAdmins={setAdmins} />}
        {activePage === "view-orders" && <ViewOrders />} {/* Add the new component */}
      </div>
    </div>
  );
};

export default AdminPanel;