import { useState, useEffect } from "react";
import axios from "axios";
import { Trash2 } from "lucide-react";

interface Product {
  _id: string;
  title: string;
  description?: string;
  price: number;
  image: string;
}

interface Order {
  _id: string;
  fullName: string;
  address: string;
  phone: string;
  email: string;
  paymentType: string;
  totalPrice: number;
  specialInstructions?: string;
  status: string;
  products: { product: Product; quantity: number }[];
}

const ViewOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState<string>("all"); // Filter state: all, Cooking Food, Delivering, Completed

  // Fetch orders from the backend
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:3000/orders");
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  // Filter orders based on the selected filter
  const filteredOrders = orders.filter((order) => {
    if (filter === "all") return true;
    return order.status === filter;
  });

  // Delete an order
  const deleteOrder = async (orderId: string) => {
    try {
      await axios.delete(`http://localhost:3000/orders/${orderId}`);
      setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  return (
    <div className="p-6 bg-[#121212] text-white min-h-screen">
      <h2 className="text-3xl font-bold mb-8 text-[#FDC700]">View Orders</h2>

      {/* Filter Buttons */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded-lg ${
            filter === "all" ? "bg-[#FDC700] text-black" : "bg-[#202020] text-white"
          }`}
        >
          All Orders
        </button>
        <button
          onClick={() => setFilter("Cooking Food")}
          className={`px-4 py-2 rounded-lg ${
            filter === "Cooking Food" ? "bg-[#FDC700] text-black" : "bg-[#202020] text-white"
          }`}
        >
          Cooking Food
        </button>
        <button
          onClick={() => setFilter("Delivering")}
          className={`px-4 py-2 rounded-lg ${
            filter === "Delivering" ? "bg-[#FDC700] text-black" : "bg-[#202020] text-white"
          }`}
        >
          Delivering
        </button>
        <button
          onClick={() => setFilter("Completed")}
          className={`px-4 py-2 rounded-lg ${
            filter === "Completed" ? "bg-[#FDC700] text-black" : "bg-[#202020] text-white"
          }`}
        >
          Completed
        </button>
      </div>

      {/* Orders Table */}
      <div className="space-y-6">
        {filteredOrders.length === 0 ? (
          <p className="text-gray-400">No orders found.</p>
        ) : (
          filteredOrders.map((order) => (
            <div key={order._id} className="bg-[#202020] p-6 rounded-lg shadow-lg">
              {/* Order Header */}
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-[#FDC700]">{order.fullName}</h3>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    order.status === "Cooking Food"
                      ? "bg-yellow-500 text-black"
                      : order.status === "Delivering"
                      ? "bg-blue-500 text-white"
                      : "bg-green-500 text-white"
                  }`}
                >
                  {order.status}
                </span>
              </div>

              {/* Order Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
                <div>
                  <p>📍 <span className="font-medium">Address:</span> {order.address}</p>
                  <p>📞 <span className="font-medium">Phone:</span> {order.phone}</p>
                  <p>📧 <span className="font-medium">Email:</span> {order.email}</p>
                </div>
                <div>
                  <p>💰 <span className="font-medium">Payment:</span> {order.paymentType}</p>
                  <p>💵 <span className="font-medium">Total:</span> Rs. {order.totalPrice}</p>
                  <p>📝 <span className="font-medium">Instructions:</span> {order.specialInstructions || "None"}</p>
                </div>
              </div>

              {/* Ordered Items */}
              <div className="mt-6">
                <h4 className="text-lg font-semibold text-[#FDC700] mb-2">Ordered Items</h4>
                <ul className="space-y-2">
                  {order.products.map((item, index) => (
                    <li key={index} className="flex justify-between items-center bg-[#121212] p-3 rounded-lg">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.product.image}
                          alt={item.product.title}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div>
                          <p className="font-medium">{item.product.title}</p>
                          <p className="text-sm text-gray-400">Quantity: {item.quantity}</p>
                        </div>
                      </div>
                      <p className="text-[#FDC700]">Rs. {item.product.price * item.quantity}</p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Delete Button */}
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => deleteOrder(order._id)}
                  className="bg-red-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-600 transition-colors"
                >
                  <Trash2 size={16} className="inline-block mr-2" />
                  Delete Order
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ViewOrders;