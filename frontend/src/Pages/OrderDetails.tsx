import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
const nestUrl = import.meta.env.VITE_NEST_BASE_URL;

const OrderDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const checkoutData = location.state;

    if (!checkoutData) {
        return <p className="text-white text-center">No checkout data available</p>;
    }

    const { cartItems, totalPrice } = checkoutData;

    const [formData, setFormData] = useState({
        fullName: "",
        phone: "",
        email: "",
        address: "",
        paymentMethod: "cash",
        specialInstructions: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
  
      const orderData = {
          fullName: formData.fullName,
          address: formData.address,
          phone: formData.phone,
          email: formData.email,
          specialInstructions: formData.specialInstructions || "",
          status: "Cooking Food",
          paymentType: formData.paymentMethod === "cash" ? "Cash" : "Credit/Debit Card",
          products: cartItems.map((item: any) => ({
            product: item.productId, // ✅ Use item.productId instead of item._id
            quantity: item.quantity,
          })),
          totalPrice: totalPrice,
      };
  
      try {
          const response = await fetch(`${nestUrl}/orders`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(orderData),
          });
  
          const data = await response.json();
  
          if (response.ok && data._id) {
              console.log("Order created successfully. Fetching order details...");
  
              // Fetch the newly created order using its ID
              const orderResponse = await fetch(`${nestUrl}/orders/${data._id}`);
              const orderData = await orderResponse.json();
  
              if (orderResponse.ok) {
                  console.log("Navigating to orderSuccess with orderId:", orderData._id);
                  navigate("/order-success", { state: { orderId: orderData._id } });
              } else {
                  console.error("Failed to fetch order details:", orderData);
                  alert(`Failed to fetch order details: ${orderData.message}`);
              }
          } else {
              alert(`Failed to place order: ${data.message || "No orderId received"}`);
          }
      } catch (error) {
          console.error("Error submitting order:", error);
          alert("An error occurred while placing the order. Please try again.");
      }
  };
  
  

    return (
        <div className="bg-[#1C1C1D] mt-20 text-white w-full min-h-screen py-5">
            <h2 className="text-center text-3xl md:text-4xl font-bold mb-5">Place Your Order</h2>
            <div className="w-full flex justify-center items-center">
                <form onSubmit={handleSubmit} className="bg-[#292929] p-6 md:p-8 rounded-lg shadow-lg w-full max-w-2xl">
                    {/* Full Name */}
                    <div className="mb-6">
                        <label htmlFor="fullName" className="block text-sm font-medium mb-2">Full Name</label>
                        <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} className="w-full px-4 py-2 bg-[#1C1C1D] text-white rounded-lg" required />
                    </div>

                    {/* Address */}
                    <div className="mb-6">
                        <label htmlFor="address" className="block text-sm font-medium mb-2">Address</label>
                        <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} className="w-full px-4 py-2 bg-[#1C1C1D] text-white rounded-lg" required />
                    </div>

                    {/* Phone */}
                    <div className="mb-6">
                        <label htmlFor="phone" className="block text-sm font-medium mb-2">Phone</label>
                        <input type="text" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-2 bg-[#1C1C1D] text-white rounded-lg" required />
                    </div>

                    {/* Email */}
                    <div className="mb-6">
                        <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-2 bg-[#1C1C1D] text-white rounded-lg" required />
                    </div>

                    {/* Special Instructions */}
                    <div className="mb-6">
                        <label htmlFor="specialInstructions" className="block text-sm font-medium mb-2">Special Instructions</label>
                        <textarea id="specialInstructions" name="specialInstructions" value={formData.specialInstructions} onChange={handleChange} className="w-full px-4 py-2 bg-[#1C1C1D] text-white rounded-lg" rows={4} />
                    </div>

                    {/* Payment Method */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium mb-2">Payment Method</label>
                        <div className="flex gap-4">
                            <label className="flex items-center">
                                <input type="radio" name="paymentMethod" value="cash" checked={formData.paymentMethod === "cash"} onChange={handleChange} className="mr-2" />
                                Cash
                            </label>
                            <label className="flex items-center">
                                <input type="radio" name="paymentMethod" value="card" checked={formData.paymentMethod === "card"} onChange={handleChange} className="mr-2" />
                                Credit/Debit Card
                            </label>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="w-full bg-[#FFC714] text-black py-2 px-4 rounded-lg font-semibold hover:bg-[#e0b10e]">
                        Place Order
                    </button>
                </form>
            </div>
        </div>
    );
};

export default OrderDetails;
