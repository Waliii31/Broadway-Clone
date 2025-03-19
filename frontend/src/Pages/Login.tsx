import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const nestUrl = import.meta.env.VITE_NEST_BASE_URL;

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(""); // Clear previous errors

        try {
            const response = await axios.post(`${nestUrl}/admin/login`, { 
                email, 
                password 
            });

            localStorage.setItem("token", response.data.token); // Store JWT
            localStorage.setItem("roles", JSON.stringify(response.data.roles)); // Store roles

            navigate("/select-roles", { state: { roles: response.data.roles } }); // Redirect to Select Roles with roles data
        } catch (error: any) {
            console.error("Login error:", error);
            setError(error.response?.data?.message || "Invalid credentials");
        }
    };    

    return (
        <div className="flex justify-center items-center min-h-screen bg-[#121212] text-white">
            <div className="bg-[#202020] p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-3xl font-bold text-center mb-6">Login</h2>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>} {/* Show error message */}
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
            </div>
        </div>
    );
};

export default Login;