import { useEffect, useRef, useState } from "react";
import axios from "axios";

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

const DeliveryPanel = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (!hasFetched.current) {
      fetchDeliveringOrders();
      hasFetched.current = true;
    }
  }, []);

  const fetchDeliveringOrders = async () => {
    try {
      const response = await axios.get("http://localhost:3000/orders/delivering");
      console.log("Delivering Orders:", response.data); // Debugging
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching delivering orders:", error);
    }
  };

  const markAsCompleted = async (orderId: string) => {
    try {
      await axios.patch(`http://localhost:3000/orders/${orderId}`, {
        status: "Completed",
      });
      setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  return (
    <div className="p-8 bg-[#121212] min-h-screen text-white">
      <h2 className="text-4xl font-bold mb-10 text-white text-center uppercase">Delivery Panel</h2>
      {orders.length === 0 ? (
        <p className="text-gray-400">No orders currently being delivered.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order._id} className="bg-[#202020] p-6 rounded-lg shadow-lg">
              {/* Order Header */}
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-[#FDC700]">{order.fullName}</h3>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    order.status === "Delivering"
                      ? "bg-blue-500 text-white"
                      : "bg-green-500 text-white"
                  }`}
                >
                  {order.status}
                </span>
              </div>

              {/* Delivery Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
                <div>
                  <p>📍 <span className="font-medium">Address:</span> {order.address}</p>
                  <p>📞 <span className="font-medium">Phone:</span> {order.phone}</p>
                </div>
                <div>
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

              {/* Action Button */}
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => markAsCompleted(order._id)}
                  className="bg-[#FDC700] text-black px-6 py-2 rounded-lg font-semibold hover:bg-[#e0b10e] transition-colors"
                >
                  Mark as Completed
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DeliveryPanel;