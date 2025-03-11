import { useState, useEffect, useRef } from "react";

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

const SectionNavbar = () => {
  const [activeSection, setActiveSection] = useState<string>("new-arrivals");
  const navbarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      let currentSection = activeSection;
      sections.forEach((section) => {
        const element = document.getElementById(section.id);
        if (element) {
          const { top } = element.getBoundingClientRect();
          if (top < 150) {
            currentSection = section.id;
          }
        }
      });
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSection]);

  return (
    <div
      ref={navbarRef}
      className="sticky top-0 z-50 py-3 px-4 flex gap-4 overflow-x-auto whitespace-nowrap scrollbar-hide scroll-smooth"
      style={{
        WebkitOverflowScrolling: "touch",
        msOverflowStyle: "none",
        scrollbarWidth: "none",
      }}
    >
      {sections.map((section) => (
        <a
          key={section.id}
          href={`#${section.id}`}
          className={`px-4 py-2 rounded-md text-white transition-all flex-shrink-0 ${
            activeSection === section.id ? "bg-yellow-500 text-black" : "bg-[#202020]"
          }`}
        >
          {section.label}
        </a>
      ))}
    </div>
  );
};

export default SectionNavbar;
