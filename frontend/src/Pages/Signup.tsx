import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [loading, setLoading] = useState(false); // Loading state
    const [error, setError] = useState(""); // Error state
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Basic validation
        if (!name || !email || !password || !phone || !address) {
            setError("All fields are required.");
            return;
        }

        // Email validation
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError("Please enter a valid email address.");
            return;
        }

        setLoading(true); // Set loading to true
        setError(""); // Clear any previous errors

        try {
            const response = await axios.post("http://localhost:3000/user/signup", {
                name,
                email,
                password,
                phone,
                address,
            });

            console.log(response.data); // Log the response
            alert("Signup successful! Please login."); // Show success message
            navigate("/login"); // Redirect to login page
        } catch (error) {
            if (axios.isAxiosError(error)) {
                // Handle Axios errors
                setError(error.response?.data?.message || "An error occurred during signup.");
            } else {
                // Handle other errors
                setError("An unexpected error occurred.");
            }
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-[#121212] text-white">
            <div className="bg-[#202020] p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-3xl font-bold text-center mb-6">Sign Up</h2>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Full Name"
                        className="w-full p-2 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full p-2 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full p-2 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <input
                        type="tel"
                        placeholder="Phone Number"
                        className="w-full p-2 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Address"
                        className="w-full p-2 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                    <button
                        type="submit"
                        className="w-full bg-yellow-500 text-black p-2 rounded-md font-semibold hover:bg-yellow-600 disabled:bg-yellow-700 disabled:cursor-not-allowed"
                        disabled={loading} // Disable button when loading
                    >
                        {loading ? "Signing Up..." : "Sign Up"}
                    </button>
                </form>
                <p className="text-center mt-4">
                    Already have an account? <a href="/login" className="text-yellow-500 hover:underline">Login</a>
                </p>
            </div>
        </div>
    );
};

export default Signup;