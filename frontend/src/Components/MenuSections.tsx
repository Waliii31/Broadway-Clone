import React, { useState, useEffect } from "react"; // ✅ Fix missing imports
import Card from "./Card"; // ✅ Ensure correct import path
import Header from "./Header";
import Banner from "./Banner";
// import crust from "../assets/crust.jpg"; // ✅ Fix missing import (use actual image path)

interface Product {
  _id: string;
  image?: string;
  title: string;
  description?: string;
  price: number;
  oldPrice: number;
  isNew?: boolean;
  section: { _id: string };
}

interface Section {
  _id: string;
  title: string;
}

interface MenuSectionsProps {
  addToCart: (id: string) => void; // ✅ Explicitly type addToCart function
}

const MenuSections: React.FC<MenuSectionsProps> = ({ addToCart }) => {
  const [sections, setSections] = useState<Section[]>([]);
  const [menuItems, setMenuItems] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sectionsResponse = await fetch("http://localhost:3000/section");
        const sectionsData: Section[] = await sectionsResponse.json();
        setSections(sectionsData);

        const productsResponse = await fetch("http://localhost:3000/products");
        const productsData: Product[] = await productsResponse.json();
        setMenuItems(productsData);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div className="text-white text-center p-6">Loading...</div>;
  }

  return (
    <section className="p-6">
      <Header/>
      <Banner/>
      {sections.map((section: Section) => {
        const filteredItems = menuItems.filter(
          (item: Product) => item.section._id === section._id
        );

        return (
          <div key={section._id}>
            <hr className="w-[97%] border-0.2 border-[#202020] my-5" />
            <h1 className="text-4xl font-bold text-white mb-8">{section.title}</h1>

            {filteredItems.length > 0 ? (
              <div className="flex justify-start items-stretch gap-6 flex-wrap">
                {filteredItems.map((item: Product) => (
                  <Card
                    key={item._id}
                    id={item._id} // ✅ Pass the correct product ID
                    image={item.image || "defaultImagePath.jpg"}
                    title={item.title}
                    description={item.description}
                    price={item.price}
                    oldPrice={item.oldPrice}
                    isNew={item.isNew}
                    addToCart={addToCart} // ✅ Pass function
                    cartNum={0} // Pass a default value for cartNum
                  />
                ))}
              </div>
            ) : (
              <p className="text-gray-400">No items available in this category.</p>
            )}
          </div>
        );
      })}
    </section>
  );
};

export default MenuSections;
