import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const nestUrl = import.meta.env.VITE_NEST_BASE_URL;

const UserLogin = () => {
  const navigate = useNavigate();

  // Check if the user is already logged in
  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      navigate("/account"); // Redirect if user is already logged in
    }
  }, [navigate]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "+92 ", // Default value with space after +92
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phoneNumber: "",
  });

  const formatPhoneNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    if (!cleaned.startsWith("92")) {
      return "+92 ";
    }
    const remainingDigits = cleaned.slice(2);
    const match = remainingDigits.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `+92 ${match[1]}-${match[2]}-${match[3]}`;
    }
    return `+92 ${remainingDigits}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "phoneNumber") {
      const formattedPhone = formatPhoneNumber(value);
      setFormData({
        ...formData,
        phoneNumber: formattedPhone,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { name: "", email: "", phoneNumber: "" };

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
      isValid = false;
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
      isValid = false;
    } else if (!/^\+92 \d{3}-\d{3}-\d{4}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Phone number must be in the format +92 XXX-XXX-XXXX";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post(`${nestUrl}/user/auth`, formData);
        console.log("Response:", response.data);

        localStorage.setItem("jwtToken", response.data.token);
        console.log("Token stored in localStorage:", localStorage.getItem("jwtToken"));

        alert(response.data.message);
        setFormData({ name: "", email: "", phoneNumber: "+92 " });

        navigate("/account");
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while processing your request.");
      }
    }
  };

  return (
    <div className="bg-[#121212] min-h-screen flex-col flex justify-center items-center gap-5">
      <h1 className="text-3xl font-bold text-white mb-6">User Registration</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <div className="mb-4">
          <label htmlFor="name" className="block text-white mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 bg-gray-800 text-white rounded-md"
            placeholder="Enter your name"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-white mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 bg-gray-800 text-white rounded-md"
            placeholder="Enter your email"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>
        <div className="mb-6">
          <label htmlFor="phoneNumber" className="block text-white mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full p-2 bg-gray-800 text-white rounded-md"
            placeholder="+92 XXX-XXX-XXXX"
          />
          {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
        </div>
        <button
          type="submit"
          className="w-full bg-yellow-500 text-black py-2 rounded-md hover:bg-yellow-600 transition-colors"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default UserLogin;
