import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import cookingFood from "../assets/cooking-food.gif";
import delivering from "../assets/food-delivery.gif";
import completed from "../assets/completed.gif";
import { useCart } from "../context/CartContext"; // Import useCart

const OrderSuccess = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const orderId = location.state?.orderId;
    const { setCartItems } = useCart(); // Access setCartItems from CartContext

    const [orderStatus, setOrderStatus] = useState("Cooking Food");

    useEffect(() => {
        if (!orderId) {
            console.error("Error: orderId is null or undefined!");
            return;
        }

        console.log("Fetching status for Order ID:", orderId);

        const fetchOrderStatus = async () => {
            try {
                const response = await fetch(`http://localhost:3000/orders/${orderId}/status`);
                if (!response.ok) throw new Error(`Failed to fetch order status (Status: ${response.status})`);

                const data = await response.json();
                setOrderStatus(data.status);
            } catch (error) {
                console.error("Error fetching order status:", error);
            }
        };

        fetchOrderStatus();
        const interval = setInterval(fetchOrderStatus, 15000); // Update status every 60 seconds

        return () => clearInterval(interval);
    }, [orderId]);

    // Clear the cart when the component mounts
    useEffect(() => {
        setCartItems([]); // Clear the cart
    }, [setCartItems]);

    if (!orderId) {
        return <p className="text-white text-center text-xl">Order ID not found</p>;
    }

    const getStatusImage = () => {
        switch (orderStatus) {
            case "Delivering":
                return delivering;
            case "Completed":
                return completed;
            default:
                return cookingFood;
        }
    };

    return (
        <div className="bg-[#1C1C1D] text-white w-full min-h-screen flex flex-col items-center justify-center p-5">
            <img src={getStatusImage()} alt={orderStatus} className="mb-4 w-40 h-40 md:w-56 md:h-56" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Order Placed Successfully!</h2>
            <h1 className="text-xl md:text-2xl font-medium mb-4">Estimated Delivery in 30 minutes</h1>
            <p className="text-lg mb-6">
                Your order status: <span className="font-semibold">{orderStatus}</span>
            </p>
            <button
                onClick={() => navigate("/")}
                className="bg-[#FFC714] text-black py-2 px-6 rounded-lg font-semibold hover:bg-[#e0b10e]"
            >
                Back to Home
            </button>
        </div>
    );
};

export default OrderSuccess;