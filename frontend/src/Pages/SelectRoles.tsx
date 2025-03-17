import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SelectRoles = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [roles, setRoles] = useState<string[]>([]);

    useEffect(() => {
        const rolesFromState = location.state?.roles;
        if (!rolesFromState) {
            navigate("/login"); // Redirect to login if no roles are provided
        } else {
            setRoles(rolesFromState); // Set only the roles assigned to the user
        }
    }, [location, navigate]);

    // Function to handle role selection and redirect to the respective route
    const handleRoleSelection = (role: string) => {
        switch (role) {
            case "Admin":
                navigate("/admin");
                break;
            case "Orders Receiver":
                navigate("/order-receiver");
                break;
            case "Rider":
                navigate("/delivery");
                break;
            default:
                console.error("Invalid role selected");
                break;
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-[#121212] text-white">
            <div className="bg-[#202020] p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-3xl font-bold text-center mb-6">Select Role</h2>
                <div className="space-y-4">
                    {roles.map((role, index) => (
                        <button
                            key={index}
                            className="w-full bg-yellow-500 text-black p-2 rounded-md font-semibold hover:bg-yellow-600"
                            onClick={() => handleRoleSelection(role)}
                        >
                            {role}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SelectRoles;