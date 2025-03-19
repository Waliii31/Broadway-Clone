import { Trash2 } from "lucide-react";
import axios from "axios";
const nestUrl = import.meta.env.VITE_NEST_BASE_URL;

interface Product {
  _id: string;
  section: { _id: string; title: string };
  imageUrl: string;
  title: string;
  description: string;
  price: number;
  oldPrice: number;
  discount: number;
  isNew: boolean;
}

interface ViewProductsProps {
  products: Product[];
  setProducts: (products: Product[]) => void;
}

const ViewProducts: React.FC<ViewProductsProps> = ({ products, setProducts }) => {
  const deleteProduct = async (id: string) => {
    try {
      await axios.delete(`${nestUrl}/products/${id}`);
      alert("Product deleted successfully!");
      const { data } = await axios.get(`${nestUrl}/products`);
      setProducts(data);
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product. Please try again.");
    }
  };

  // Function to truncate the description
  const truncateDescription = (description: string, maxLength: number) => {
    return description.length > maxLength
      ? `${description.substring(0, maxLength)}...`
      : description;
  };

  return (
    <>
      <h1 className="text-3xl font-bold mb-4">View Products</h1>
      <table className="w-full mt-4 bg-gray-800 rounded-md">
        <thead>
          <tr className="bg-gray-700">
            <th className="p-2">Section</th>
            <th className="p-2">Title</th>
            <th className="p-2">Description</th>
            <th className="p-2">Price</th>
            <th className="p-2">Old Price</th>
            <th className="p-2">Discount</th>
            <th className="p-2">New</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id} className="border-t border-gray-600">
              <td className="p-2 text-center">{product.section.title}</td>
              <td className="p-2 text-center">{product.title}</td>
              <td className="p-2 text-center">
                {truncateDescription(product.description, 50)} {/* Truncate to 50 characters */}
              </td>
              <td className="p-2 text-center">${product.price}</td>
              <td className="p-2 text-center">${product.oldPrice}</td>
              <td className="p-2 text-center">{product.discount}%</td>
              <td className="p-2 text-center">{product.isNew ? "Yes" : "No"}</td>
              <td className="p-2 text-center">
                <button
                  onClick={() => deleteProduct(product._id)}
                  className="bg-red-500 text-white p-1 rounded-md"
                >
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ViewProducts;