import { useEffect, useState } from "react";
import Card from "./Card";
import crust from "../assets/king1crust.jpg"; // Temporary Image

const MenuSections = () => {
  const sections = [
    { id: "new-arrivals", label: "New Arrivals" },
    { id: "promo-campaigns", label: "Promo Campaigns" },
    { id: "crazy-value-deals", label: "Crazy Value Deals" },
    { id: "midnight-deals", label: "Midnight Deals" },
    { id: "kids-meal", label: "Kids Meal" },
    { id: "special-offers", label: "Special Offers" },
    { id: "premium-deals", label: "Premium Deals" },
    { id: "appetizers-wings", label: "Appetizers | Wings" },
    { id: "pasta-sandwich-calzon", label: "Pasta | Sandwich | Calzone" },
    { id: "deserts", label: "Deserts" },
    { id: "pizza-flavors", label: "Pizza Flavors" },
    { id: "beverages-and-extras", label: "Beverages & Extras" },
  ];

  const [menuItems, setMenuItems] = useState<any[]>([]); // Store items from backend

  useEffect(() => {
    // Simulating API Call
    fetch("http://localhost:3000/products") // Replace with actual API URL
      .then((res) => res.json())
      .then((data) => setMenuItems(data))
      .catch((err) => console.error("Error fetching menu:", err));
  }, []);

  return (
    <section className="p-6">
      {sections.map((section) => {
        const filteredItems = menuItems.filter((item) => item.category === section.id);

        return (
          <div key={section.id}>
            <hr className="w-[97%] border-0.2 border-[#202020] my-5" />
            <h1 className="text-4xl font-bold text-white mb-8">{section.label}</h1>

            {/* Show items only if there are any */}
            {filteredItems.length > 0 ? (
              <div className="flex justify-start items-stretch gap-6 flex-wrap">
                {filteredItems.map((item) => (
                  <Card
                    key={item.id}
                    image={item.image || crust} // Use a fallback image
                    title={item.title}
                    description={item.description}
                    price={item.price}
                    oldPrice={item.oldPrice}
                    isNew={item.isNew}
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
