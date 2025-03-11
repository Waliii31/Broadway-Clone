import React from "react";
import { Plus } from "lucide-react";

interface CardProps {
  image: string;
  title: string;
  description?: string; // Made optional
  price: number;
  oldPrice: number;
  isNew?: boolean;
}

const Card: React.FC<CardProps> = ({
  image,
  title,
  description, // Now optional
  price,
  oldPrice,
  isNew = false,
}) => {
  // Calculate discount dynamically
  const discount = Math.round(((oldPrice - price) / oldPrice) * 100);

  return (
    <div className="bg-[#202020] text-white p-3 rounded-xl shadow-md w-80">
      {/* Image Section */}
      <div className="relative">
        <img src={image} alt={title} className="rounded-xl w-full" />
        <div className="absolute top-2 left-2 flex gap-2">
          {discount > 0 && (
            <span className="bg-yellow-400 text-black px-2 py-1 text-xs rounded-md font-bold">
              Save {discount}%
            </span>
          )}
          {isNew && (
            <span className="bg-green-500 text-black px-2 py-1 text-xs rounded-md font-bold">
              New!
            </span>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="mt-2">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">{title}</h2>
          <div className="text-right">
            <p className="text-lg font-bold text-yellow-400">Rs {price}</p>
            <p className="text-sm text-gray-400 line-through">Rs {oldPrice}</p>
          </div>
        </div>

        {/* Conditionally render description if provided */}
        {description && <p className="text-gray-300 text-sm mt-1">{description}</p>}

        {/* Add to Cart Button */}
        <button className="bg-yellow-400 text-black p-2 rounded-full flex items-center justify-center mt-3 w-10 h-10 hover:bg-yellow-500 transition">
          <Plus size={20} />
        </button>
      </div>
    </div>
  );
};

export default Card;
