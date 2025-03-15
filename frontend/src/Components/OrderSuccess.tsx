import { useState, useEffect } from "react";

const OrderSuccess = ({
  setActiveComponent,
  orderId,
}: {
  setActiveComponent: (component: "main") => void;
  orderId: string;
}) => {
  const [orderStatus, setOrderStatus] = useState("Cooking");

  useEffect(() => {
    const fetchOrderStatus = async () => {
      try {
        const response = await fetch(`http://localhost:3000/orders/${orderId}/status`);
        const data = await response.json();
        setOrderStatus(data.status);
      } catch (error) {
        console.error("Error fetching order status:", error);
      }
    };

    const interval = setInterval(fetchOrderStatus, 5000); // Poll every 5 seconds

    return () => clearInterval(interval);
  }, [orderId]);

  return (
    <div className="bg-[#1C1C1D] text-white w-full min-h-screen flex flex-col items-center justify-center p-5">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">Order Placed Successfully!</h2>
      <p className="text-lg mb-6">
        Your order status: <span className="font-semibold">{orderStatus}</span>
      </p>
      <button
        className="bg-[#FFC714] text-black py-2 px-6 rounded-lg font-semibold hover:bg-[#e0b10e]"
        onClick={() => setActiveComponent("main")}
      >
        Back to Home
      </button>
    </div>
  );
};

export default OrderSuccess;
