// AdminPanel.tsx
import axios from "axios";
import { useEffect, useState } from "react";
import Sidebar from "../Components/Sidebar";
import Sections from "../Components/Sections";
import Products from "../Components/Products";
import ViewProducts from "../Components/ViewProducts";
import Admins from "../Components/Admins";

type Section = {
  _id: string;
  title: string;
};

type Product = {
  _id: string;
  section: Section; // Change this to match the expected type
  imageUrl: string;
  title: string;
  description: string;
  price: number;
  oldPrice: number;
  discount: number;
  isNew: boolean;
};

type Admin = {
  name: string;
  email: string;
  password: string;
  roles: string[];
};

const AdminPanel: React.FC = () => {
  const [activePage, setActivePage] = useState("sections");
  const [sections, setSections] = useState<Section[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [admins, setAdmins] = useState<Admin[]>([]); // Add state for admins

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const response = await axios.get("http://localhost:3000/section");
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
        const { data } = await axios.get("http://localhost:3000/products");
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
      </div>
    </div>
  );
};

export default AdminPanel;