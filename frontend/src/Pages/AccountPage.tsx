import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const AccountPage = () => {
  const [activeTab, setActiveTab] = useState("my-orders");
  const [user, setUser] = useState({
    id: "", // Add ID field
    name: "",
    email: "",
    phoneNumber: "",
  });
  const [isEditing, setIsEditing] = useState(false); // State for edit mode
  const [tempUser, setTempUser] = useState({ ...user }); // Temporary state for editing

  interface Order {
    _id: string;
    createdAt: string;
    totalPrice: number;
    status: string;
    products: {
      _id: string;
      product: {
        image: string;
        title: string;
        discount: number;
        description: string;
        price: number;
      };
      quantity: number;
    }[];
    address: string;
    phone: string;
    specialInstructions: string;
    paymentType: string;
  }

  const [orders, setOrders] = useState<Order[]>([]); // State to store orders

  // Decode the token and set user data when the component mounts
  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      try {
        interface DecodedToken {
          id: string; // Ensure this matches the token payload
          name: string;
          email: string;
          phoneNumber: string;
        }
  
        const decodedToken = jwtDecode<DecodedToken>(token); // Decode the token
        console.log('Decoded Token:', decodedToken); // Debugging: Log the decoded token
  
        setUser({
          id: decodedToken.id, // Set ID
          name: decodedToken.name,
          email: decodedToken.email,
          phoneNumber: decodedToken.phoneNumber,
        });
        setTempUser({ ...decodedToken }); // Initialize tempUser with decoded data
        fetchOrders(decodedToken.email)
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  // Fetch orders from the backend
  const fetchOrders = async (email: string) => {
    try {
      const response = await fetch(`http://localhost:3000/orders/user-orders?email=${email}`);
      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  // Handle input changes in edit mode
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTempUser({ ...tempUser, [name]: value });
  };

  // Save updated user details
  const handleSave = async () => {
    try {
      const token = localStorage.getItem('jwtToken');
      if (!token) {
        throw new Error('No token found');
      }
  
      if (!user.id) {
        throw new Error('User ID is missing');
      }
  
      // Send updated data to the backend
      const response = await fetch(`http://localhost:3000/user/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(tempUser),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update user details');
      }
  
      const data = await response.json(); // Get the updated user data from the response
  
      // Update the user state with the new data
      setUser(data.user);
      setIsEditing(false); // Exit edit mode
      alert(data.message); // Show success message
    } catch (error) {
      console.error('Error updating user details:', error);
      alert('Failed to update user details');
    }
  };

  // Cancel edit mode
  const handleCancel = () => {
    setTempUser({ ...user }); // Reset tempUser to original data
    setIsEditing(false); // Exit edit mode
  };

  return (
    <div className="bg-[#121212] mt-20 min-h-screen text-white p-8 flex">
      {/* Sidebar */}
      <div className="w-64 bg-[#1C1C1D] rounded-lg p-6">
        <nav className="space-y-4">
          <Link
            to="#"
            onClick={() => setActiveTab("my-orders")}
            className={`block text-lg font-medium ${
              activeTab === "my-orders" ? "text-[#FDC700]" : "text-gray-400"
            } hover:text-[#FDC700] transition`}
          >
            My Orders
          </Link>
          <Link
            to="#"
            onClick={() => setActiveTab("my-account")}
            className={`block text-lg font-medium ${
              activeTab === "my-account" ? "text-[#FDC700]" : "text-gray-400"
            } hover:text-[#FDC700] transition`}
          >
            My Account
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-8">
        {activeTab === "my-orders" && (
          <div>
            <h2 className="text-3xl font-bold text-[#FDC700] mb-6">My Orders</h2>
            {orders.length > 0 ? (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div
                    key={order._id}
                    className="bg-[#1C1C1D] p-6 rounded-lg"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <p className="text-lg font-semibold">Order #{order._id}</p>
                        <p className="text-gray-400">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-lg font-semibold">Rs {order.totalPrice}</p>
                        <p
                          className={`text-sm font-medium ${
                            order.status === "Completed"
                              ? "text-[#00C951]"
                              : "text-red-500"
                          }`}
                        >
                          {order.status}
                        </p>
                      </div>
                    </div>

                    {/* Display Products */}
                    <div className="mt-4">
                      <h3 className="text-xl font-semibold mb-2">Products</h3>
                      <div className="bg-[#1C1C1D] p-4 rounded-lg shadow-lg">
                        <div className="grid grid-cols-6 text-gray-400 font-mono border-b pb-2">
                          <p className="col-span-2">Product</p>
                          <p>Qty</p>
                          <p>Price</p>
                          <p>Total</p>
                        </div>

                        {order.products.map((product) => (
                          <div key={product._id} className="grid grid-cols-6 border-b border-gray-700 py-3 items-center">
                            {/* Product Image & Name */}
                            <div className="col-span-2 flex items-center space-x-3">
                              <img src={product.product.image} alt={product.product.title} className="w-10 h-10 object-cover rounded-md" />
                              <p className="text-white text-sm">{product.product.title}</p>
                            </div>

                            {/* Quantity */}
                            <p className="text-gray-400">{product.quantity}</p>

                            {/* Price */}
                            <p className="text-gray-400">Rs {product.product.price}</p>

                            {/* Total */}
                            <p className="text-white font-semibold">
                              Rs {product.product.price * product.quantity}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Order Details */}
                    <div className="mt-4">
                      <h3 className="text-xl font-semibold mb-2">Order Details</h3>
                      <p className="text-gray-400"><span className="font-semibold">Address:</span> {order.address}</p>
                      <p className="text-gray-400"><span className="font-semibold">Phone:</span> {order.phone}</p>
                      <p className="text-gray-400"><span className="font-semibold">Special Instructions:</span> {order.specialInstructions}</p>
                      <p className="text-gray-400"><span className="font-semibold">Payment Type:</span> {order.paymentType}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400">No orders found.</p>
            )}
          </div>
        )}

        {activeTab === "my-account" && (
          <div>
            <h2 className="text-3xl font-bold text-[#FDC700] mb-6">My Account</h2>
            <div className="bg-[#1C1C1D] p-6 rounded-lg">
              <div className="space-y-4">
                {/* Name Field */}
                <div>
                  <label className="text-gray-400">Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={tempUser.name}
                      onChange={handleInputChange}
                      className="w-full p-2 bg-gray-800 text-white rounded-md"
                    />
                  ) : (
                    <p className="text-lg font-semibold">{user.name}</p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label className="text-gray-400">Email</label>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={tempUser.email}
                      onChange={handleInputChange}
                      className="w-full p-2 bg-gray-800 text-white rounded-md"
                    />
                  ) : (
                    <p className="text-lg font-semibold">{user.email}</p>
                  )}
                </div>

                {/* Phone Number Field */}
                <div>
                  <label className="text-gray-400">Phone Number</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="phoneNumber"
                      value={tempUser.phoneNumber}
                      onChange={handleInputChange}
                      className="w-full p-2 bg-gray-800 text-white rounded-md"
                    />
                  ) : (
                    <p className="text-lg font-semibold">{user.phoneNumber}</p>
                  )}
                </div>

                {/* Edit/Save/Cancel Buttons */}
                <div className="flex space-x-4">
                  {isEditing ? (
                    <>
                      <button
                        onClick={handleSave}
                        className="bg-[#FDC700] text-black py-2 px-4 rounded-md hover:bg-[#FDD835] transition"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancel}
                        className="bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="bg-[#FDC700] text-black py-2 px-4 rounded-md hover:bg-[#FDD835] transition"
                    >
                      Edit
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountPage;