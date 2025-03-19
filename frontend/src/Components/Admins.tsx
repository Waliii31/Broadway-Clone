import { Trash2, Edit } from "lucide-react";
import { useState, useEffect } from "react";
const nestUrl = import.meta.env.VITE_NEST_BASE_URL;
console.log(nestUrl)
import axios from "axios";

interface Admin {
  _id?: string;
  adminName: string;
  adminEmail: string;
  adminPassword: string;
  adminRoles: string[];
}

interface AdminsProps {
  admins: Admin[];
  setAdmins: (admins: Admin[]) => void;
}

const Admins: React.FC<AdminsProps> = ({ admins, setAdmins }) => {
  const [newAdmin, setNewAdmin] = useState<Admin>({
    adminName: "",
    adminEmail: "",
    adminPassword: "",
    adminRoles: [],
  });
  const [editAdminId, setEditAdminId] = useState<string | null>(null); 
  const roles = ["Admin", "Orders Receiver", "Rider"];

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const response = await axios.get(`${nestUrl}/admin`);
      // Ensure each admin has a roles array
      const validatedAdmins = response.data.map((admin: Admin) => ({
        ...admin,
        adminRoles: admin.adminRoles || [], // Fallback to empty array if roles is undefined
      }));
      setAdmins(validatedAdmins);
    } catch (error) {
      console.error("Error fetching admins:", error);
    }
  };

  const addAdmin = async () => {
    if (newAdmin.adminEmail && newAdmin.adminPassword && newAdmin.adminRoles.length > 0) {
      try {
        const response = await axios.post(`${nestUrl}/admin/create`, {
          adminName: newAdmin.adminName,
          adminEmail: newAdmin.adminEmail,
          adminPassword: newAdmin.adminPassword,
          adminRoles: newAdmin.adminRoles,
        });
        setAdmins([...admins, response.data]);
        setNewAdmin({ adminName: "", adminEmail: "", adminPassword: "", adminRoles: [] });
      } catch (error) {
        console.error("Error adding admin:", error);
      }
    }
  };

  const updateAdmin = async () => {
    if (editAdminId && newAdmin.adminEmail && newAdmin.adminRoles.length > 0) {
      try {
        const payload: Partial<Admin> = {
          adminName: newAdmin.adminName,
          adminEmail: newAdmin.adminEmail,
          adminRoles: newAdmin.adminRoles,
        };

        if (newAdmin.adminPassword) {
          payload.adminPassword = newAdmin.adminPassword;
        }

        const response = await axios.put(`${nestUrl}/admin/${editAdminId}`, payload);
        const updatedAdmins = admins.map((admin) =>
          admin._id === editAdminId ? response.data : admin
        );
        setAdmins(updatedAdmins);
        setNewAdmin({ adminName: "", adminEmail: "", adminPassword: "", adminRoles: [] });
        setEditAdminId(null);
      } catch (error) {
        console.error("Error updating admin:", error);
      }
    }
  };

  const deleteAdmin = async (adminId: string) => {
    try {
      // Check if the admin being deleted has all three roles
      const adminToDelete = admins.find((admin) => admin._id === adminId);
      if (adminToDelete && adminToDelete.adminRoles.length === 3) {
        // Check if this is the last admin with all three roles
        const superAdmins = admins.filter((admin) => admin.adminRoles.length === 3);
        if (superAdmins.length === 1) {
          alert("This is the last admin with all three roles and cannot be deleted.");
          return;
        }
      }

      await axios.delete(`${nestUrl}/admin/${adminId}`);
      const updatedAdmins = admins.filter((admin) => admin._id !== adminId);
      setAdmins(updatedAdmins);
    } catch (error) {
      console.error("Error deleting admin:", error);
    }
  };

  const handleEdit = (admin: Admin) => {
    setNewAdmin({
      ...admin,
      adminPassword: "", // Reset the password field
    });
    setEditAdminId(admin._id || null);
  };

  return (
    <>
      <h1 className="text-3xl font-bold mb-4">Add Admin</h1>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Admin Name"
          className="p-2 bg-gray-800 text-white rounded-md w-full"
          value={newAdmin.adminName}
          onChange={(e) => setNewAdmin({ ...newAdmin, adminName: e.target.value })}
        />
        <input
          type="email"
          placeholder="Admin Email"
          className="p-2 bg-gray-800 text-white rounded-md w-full"
          value={newAdmin.adminEmail}
          onChange={(e) => setNewAdmin({ ...newAdmin, adminEmail: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          className="p-2 bg-gray-800 text-white rounded-md w-full"
          value={newAdmin.adminPassword}
          onChange={(e) => setNewAdmin({ ...newAdmin, adminPassword: e.target.value })}
        />
        <div>
          <h3 className="text-lg font-semibold">Roles</h3>
          {roles.map((role) => (
            <label key={role} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={newAdmin.adminRoles.includes(role)}
                onChange={() => {
                  const updatedRoles = newAdmin.adminRoles.includes(role)
                    ? newAdmin.adminRoles.filter((r) => r !== role)
                    : [...newAdmin.adminRoles, role];
                  setNewAdmin({ ...newAdmin, adminRoles: updatedRoles });
                }}
              />
              {role}
            </label>
          ))}
        </div>
        <button
          onClick={editAdminId ? updateAdmin : addAdmin}
          className="bg-yellow-500 text-black p-2 rounded-md w-full"
        >
          {editAdminId ? "Update Admin" : "Add Admin"}
        </button>
      </div>
      <h2 className="text-2xl font-bold mt-6">Existing Admins</h2>
      <table className="w-full mt-4 bg-gray-800 rounded-md">
        <thead>
          <tr className="bg-gray-700">
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Roles</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((admin) => (
            <tr key={admin._id} className="border-t border-gray-600">
              <td className="p-2 text-center">{admin.adminName}</td>
              <td className="p-2 text-center">{admin.adminEmail}</td>
              <td className="p-2 text-center">{(admin.adminRoles || []).join(", ")}</td>
              <td className="p-2 text-center flex justify-center gap-2">
                <button
                  onClick={() => handleEdit(admin)}
                  className="bg-blue-500 cursor-pointer text-white p-2 rounded-md"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => deleteAdmin(admin._id!)}
                  className={`bg-red-500 cursor-pointer text-white p-2 rounded-md ${
                    admin.adminRoles.length === 3 &&
                    admins.filter((a) => a.adminRoles.length === 3).length === 1
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                  disabled={
                    admin.adminRoles.length === 3 &&
                    admins.filter((a) => a.adminRoles.length === 3).length === 1
                  }
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