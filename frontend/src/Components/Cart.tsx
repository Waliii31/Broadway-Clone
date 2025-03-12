import axios from "axios";
import React, { useState, useEffect } from "react";

interface Product {
  _id: string;
  section: string;
  image: string;
  title: string;
  description: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  isNew: boolean;
}

interface CartProps {
  cartItems: string[]; // Array of product IDs
}

const Cart: React.FC<CartProps> = ({ cartItems }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Fetch product details for each item in the cart
    cartItems.forEach((itemId) => {
      sendProductId(itemId);
    });
  }, [cartItems]);

  const sendProductId = async (productId: string) => {
    try {
      const response = await axios.post('http://localhost:3000/products/find-product', {
        productId,
      });
      const productData = response.data;
      console.log(productData)
      setProducts((prevProducts) => [...prevProducts, productData]);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Cart</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product._id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              {/* Product Image */}
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-48 object-cover"
              />

              {/* Product Details */}
              <div className="p-6">
                {/* Title and New Badge */}
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-xl font-semibold text-gray-900">{product.title}</h2>
                  {product.isNew && (
                    <span className="bg-green-100 text-green-800 text-sm font-medium px-2 py-1 rounded-full">
                      New
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4">{product.description}</p>

                {/* Price and Discount */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-gray-900">
                      ${product.price.toFixed(2)}
                    </span>
                    {product.oldPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        ${product.oldPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                  {product.discount && (
                    <span className="bg-red-100 text-red-800 text-sm font-medium px-2 py-1 rounded-full">
                      {product.discount}% off
                    </span>
                  )}
                </div>

                {/* Add to Cart Button */}
                <button className="mt-4 w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors duration-300">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty Cart Message */}
        {products.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">Your cart is empty. Start adding some delicious pizzas!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;