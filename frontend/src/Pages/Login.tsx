import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); // State for error messages
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            // Step 1: Make an API call to the backend
            const response = await axios.post("http://localhost:3000/user/login", {
                email,
                password,
            });

            // Step 2: Store the JWT token in local storage
            const token = response.data.token; // Assuming the token is returned in the response
            localStorage.setItem("token", token); // Store the token

            // Step 3: Redirect to the home page
            navigate("/");
        } catch (error) {
            // Handle errors
            if (axios.isAxiosError(error)) {
                setError(error.response?.data?.message || "An error occurred during login.");
            } else {
                setError("An unexpected error occurred.");
            }
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-[#121212] text-white">
            <div className="bg-[#202020] p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-3xl font-bold text-center mb-6">Login</h2>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>} {/* Display error message */}
                <form className="space-y-4" onSubmit={handleSubmit}>
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
                    <button
                        type="submit"
                        className="w-full bg-yellow-500 text-black p-2 rounded-md font-semibold hover:bg-yellow-600"
                    >
                        Login
                    </button>
                </form>
                <p className="text-center mt-4">
                    Don't have an account? <a href="/signup" className="text-yellow-500 hover:underline">Sign Up</a>
                </p>
            </div>
        </div>
    );
};

export default Login;