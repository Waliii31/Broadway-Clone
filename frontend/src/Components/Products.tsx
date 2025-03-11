import React, { useState } from "react";
import axios from "axios";

interface Product {
  _id: string;
  section: string;
  imageUrl: string;
  title: string;
  description: string;
  price: number;
  oldPrice: number;
  discount: number;
  isNew: boolean;
}

interface ProductsProps {
  sections: { _id: string; title: string }[];
  setProducts: (products: any[]) => void;
}

const Products: React.FC<ProductsProps> = ({ sections, setProducts }) => {
  const [product, setProduct] = useState<Product>({
    _id: "", // Add _id for editing
    section: "",
    imageUrl: "",
    title: "",
    description: "",
    price: 0,
    oldPrice: 0,
    discount: 0,
    isNew: false,
  });
  const [file, setFile] = useState<File | null>(null);
  const [editingProduct, setEditingProduct] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const uploadImage = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://localhost:3000/products/image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setProduct({ ...product, imageUrl: response.data.imageUrl });
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image. Please try again.");
    }
  };

  const calculateDiscount = (oldPrice: number, newPrice: number): number => {
    if (oldPrice > 0 && newPrice < oldPrice) {
      return Math.round(((oldPrice - newPrice) / oldPrice) * 100);
    }
    return 0;
  };

  const addProduct = async () => {
    if (!product.section || !product.imageUrl || !product.title || !product.price) {
      alert("Please fill out all required fields.");
      return;
    }

    const discount = calculateDiscount(product.oldPrice, product.price);

    const productData = {
      section: product.section,
      image: product.imageUrl,
      title: product.title,
      description: product.description,
      price: product.price,
      oldPrice: product.oldPrice,
      discount: discount,
      isNew: product.isNew,
    };

    try {
      if (editingProduct) {
        // Update existing product
        await axios.put(`http://localhost:3000/products/${product._id}`, productData);
        alert("Product updated successfully!");
      } else {
        // Add new product
        await axios.post("http://localhost:3000/products", productData);
        alert("Product added successfully!");
      }
      setProduct({
        _id: "",
        section: "",
        imageUrl: "",
        title: "",
        description: "",
        price: 0,
        oldPrice: 0,
        discount: 0,
        isNew: false,
      });
      setEditingProduct(false);
      const { data } = await axios.get("http://localhost:3000/products");
      setProducts(data);
    } catch (error: any) {
      console.error("Error adding/updating product:", error);
      alert("Failed to add/update product. Please try again.");
    }
  };


  return (
    <>
      <h1 className="text-3xl font-bold mb-4">{editingProduct ? "Edit Product" : "Add Products"}</h1>
      <div className="space-y-4">
        <select
          className="p-2 bg-gray-800 text-white rounded-md w-full"
          value={product.section}
          onChange={(e) => setProduct({ ...product, section: e.target.value })}
        >
          <option value="">Select Section</option>
          {sections.map((section) => (
            <option key={section._id} value={section._id}>
              {section.title}
            </option>
          ))}
        </select>
        <input
          type="file"
          onChange={handleFileChange}
          className="p-2 bg-gray-800 text-white rounded-md w-full"
        />
        <button onClick={uploadImage} className="bg-yellow-500 text-black p-2 rounded-md">
          Upload Image
        </button>
        <input
          type="text"
          placeholder="Title"
          className="p-2 bg-gray-800 text-white rounded-md w-full"
          value={product.title}
          onChange={(e) => setProduct({ ...product, title: e.target.value })}
        />
        <textarea
          placeholder="Description"
          className="p-2 bg-gray-800 text-white rounded-md w-full"
          value={product.description}
          onChange={(e) => setProduct({ ...product, description: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          className="p-2 bg-gray-800 text-white rounded-md w-full"
          value={isNaN(product.price) ? "" : product.price}
          onChange={(e) => {
            const value = parseFloat(e.target.value);
            setProduct({ ...product, price: isNaN(value) ? 0 : value });
          }}
        />
        <input
          type="number"
          placeholder="Old Price"
          className="p-2 bg-gray-800 text-white rounded-md w-full"
          value={isNaN(product.oldPrice) ? "" : product.oldPrice}
          onChange={(e) => {
            const value = parseFloat(e.target.value);
            setProduct({ ...product, oldPrice: isNaN(value) ? 0 : value });
          }}
        />
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={product.isNew}
            onChange={(e) => setProduct({ ...product, isNew: e.target.checked })}
          />
          New Product
        </label>
        <button onClick={addProduct} className="bg-yellow-500 text-black p-2 rounded-md w-full">
          {editingProduct ? "Save Product" : "Add Product"}
        </button>
      </div>
    </>
  );
};

export default Products;