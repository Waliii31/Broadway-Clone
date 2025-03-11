import { Trash2 } from "lucide-react";
import { useState } from "react";

interface Admin {
  name: string;
  email: string;
  password: string;
  roles: string[];
}

interface AdminsProps {
  admins: Admin[];
  setAdmins: (admins: Admin[]) => void;
}

const Admins: React.FC<AdminsProps> = ({ admins, setAdmins }) => {
  const [newAdmin, setNewAdmin] = useState<Admin>({
    name: "",
    email: "",
    password: "",
    roles: [],
  });
  const roles = ["Admin", "Orders Receiver", "Rider"];

  const addAdmin = () => {
    if (newAdmin.email && newAdmin.password && newAdmin.roles.length > 0) {
      setAdmins([...admins, newAdmin]);
      setNewAdmin({ name: "", email: "", password: "", roles: [] });
    }
  };

  return (
    <>
      <h1 className="text-3xl font-bold mb-4">Add Admin</h1>
      <div className="space-y-4">
        <input
          type="name"
          placeholder="Admin Name"
          className="p-2 bg-gray-800 text-white rounded-md w-full"
          value={newAdmin.name}
          onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Admin Email"
          className="p-2 bg-gray-800 text-white rounded-md w-full"
          value={newAdmin.email}
          onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          className="p-2 bg-gray-800 text-white rounded-md w-full"
          value={newAdmin.password}
          onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
        />
        <div>
          <h3 className="text-lg font-semibold">Roles</h3>
          {roles.map((role) => (
            <label key={role} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={newAdmin.roles.includes(role)}
                onChange={() => {
                  const updatedRoles = newAdmin.roles.includes(role)
                    ? newAdmin.roles.filter((r) => r !== role)
                    : [...newAdmin.roles, role];
                  setNewAdmin({ ...newAdmin, roles: updatedRoles });
                }}
              />
              {role}
            </label>
          ))}
        </div>
        <button onClick={addAdmin} className="bg-yellow-500 text-black p-2 rounded-md w-full">
          Add Admin
        </button>
      </div>
      <h2 className="text-2xl font-bold mt-6">Existing Admins</h2>
      <table className="w-full mt-4 bg-gray-800 rounded-md">
        <thead>
          <tr className="bg-gray-700">
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Roles</th>
            <th className="p-2">Delete</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((admin, index) => (
            <tr key={index} className="border-t border-gray-600">
              <td className="p-2 text-center">{admin.name}</td>
              <td className="p-2 text-center">{admin.email}</td>
              <td className="p-2 text-center">{admin.roles.join(", ")}</td>
              <td className="p-2 text-center">
                <button
                  onClick={() => setAdmins(admins.filter((_, i) => i !== index))}
                  className="bg-red-500 cursor-pointer text-white p-2 rounded-md"
                >
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Admins;