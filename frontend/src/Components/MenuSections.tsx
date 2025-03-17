import { useContext, useState, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import Card from "./Card";
import Banner from "./Banner";

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

const MenuSections = () => {
  const cartContext = useContext(CartContext);

  if (!cartContext) {
    throw new Error("MenuSections must be used within a CartProvider");
  }

  const { addToCart, cartItems } = cartContext;

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
    <section className="px-6 py-6">
      <Banner />
      {sections.map((section) => {
        const filteredItems = menuItems.filter((item) => item.section?._id === section._id);

        return (
          <div key={section._id}>
            <hr className="w-[97%] border-0.2 border-[#202020] my-5" />
            <h1 className="text-4xl font-bold text-white mb-8">{section.title}</h1>

            {filteredItems.length > 0 ? (
              <div className="flex justify-start items-stretch gap-6 flex-wrap">
                {filteredItems.map((item) => {
                  const cartItem = cartItems.find((ci) => ci.id === item._id);
                  return (
                    <Card
                      key={item._id}
                      id={item._id}
                      image={item.image || "defaultImagePath.jpg"}
                      title={item.title}
                      description={item.description}
                      price={item.price}
                      oldPrice={item.oldPrice}
                      isNew={item.isNew}
                      addToCart={() => addToCart(item._id)}
                      cartNum={cartItem ? cartItem.quantity : 0}
                    />
                  );
                })}
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
