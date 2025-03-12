import { Plus } from "lucide-react";

interface CardProps {
  id: string; // Add the id prop
  image: string;
  title: string;
  description?: string;
  price: number;
  oldPrice: number;
  isNew?: boolean;
  addToCart: (id: string) => void; // Update function to accept id
  cartNum: number
}

const Card: React.FC<CardProps> = ({
  id, // Get the product ID
  image,
  title,
  description,
  price,
  oldPrice,
  isNew = false,
  addToCart,
  cartNum = 0,
}) => {
  const discount = Math.round(((oldPrice - price) / oldPrice) * 100);

  return (
    <div className="bg-[#202020] text-white p-3 rounded-xl shadow-md w-80">
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

      <div className="mt-2">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">{title}</h2>
          <div className="text-right">
            <p className="text-lg font-bold text-yellow-400">Rs {price}</p>
            <p className="text-sm text-gray-400 line-through">Rs {oldPrice}</p>
          </div>
        </div>

        {description && <p className="text-gray-300 text-sm mt-1">{description}</p>}

        {/* Add to Cart Button */}
        <button
          onClick={() =>{
              addToCart(id)
              cartNum = cartNum + 1
            }} // Pass the correct id
          className="bg-yellow-400 text-black p-2 rounded-full flex items-center justify-center mt-3 w-10 h-10 hover:bg-yellow-500 transition"
        >
          <Plus size={20} />
        </button>
      </div>
    </div>
  );
};

export default Card;
