import React, { useState } from "react";
import { Plus, Edit, Trash } from "lucide-react";
import axios from "axios";

interface Section {
  _id: string;
  title: string;
}

interface SectionsProps {
  sections: Section[];
  setSections: (sections: Section[]) => void;
}

const Sections: React.FC<SectionsProps> = ({ sections, setSections }) => {
  const [newSection, setNewSection] = useState("");
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [editText, setEditText] = useState("");

  const addSection = async () => {
    if (newSection.trim()) {
      try {
        const response = await axios.post("http://localhost:3000/section", {
          title: newSection,
        });
        setSections([...sections, response.data]);
        setNewSection("");
      } catch (error) {
        console.error("Error adding section:", error);
        alert("Failed to add section. Please try again.");
      }
    }
  };

  const saveEdit = async () => {
    if (!editingSection) return;

    try {
      await axios.put(`http://localhost:3000/section/${editingSection}`, {
        title: editText,
      });
      setSections(
        sections.map((section) =>
          section._id === editingSection ? { ...section, title: editText } : section
        )
      );
      setEditingSection(null);
      setEditText("");
    } catch (error) {
      console.error("Error updating section:", error);
      alert("Failed to update section. Please try again.");
    }
  };

  const startEditing = (section: Section) => {
    setEditingSection(section._id);
    setEditText(section.title);
  };

  const deleteSection = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3000/section/${id}`);
      setSections(sections.filter((section) => section._id !== id));
    } catch (error) {
      console.error("Error deleting section:", error);
      alert("Failed to delete section. Please try again.");
    }
  };

  return (
    <>
      <h1 className="text-3xl font-bold mb-4">Manage Sections</h1>
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="New Section Name"
          className="p-2 rounded-md bg-gray-800 text-white w-80"
          value={newSection}
          onChange={(e) => setNewSection(e.target.value)}
        />
        <button onClick={addSection} className="bg-yellow-500 text-black p-2 rounded-md flex items-center">
          <Plus size={16} /> Add
        </button>
      </div>
      <ul className="space-y-2">
        {sections.map((section) => (
          <li key={section._id} className="flex justify-between items-center bg-gray-800 p-2 rounded-md">
            {editingSection === section._id ? (
              <input
                type="text"
                className="bg-gray-700 text-white p-1 rounded-md"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
              />
            ) : (
              <span>{section.title}</span>
            )}
            <div className="flex gap-2">
              {editingSection === section._id ? (
                <button onClick={saveEdit} className="bg-green-500 text-white p-1 rounded-md">
                  Save
                </button>
              ) : (
                <button onClick={() => startEditing(section)} className="bg-blue-500 text-white p-1 rounded-md">
                  <Edit size={16} />
                </button>
              )}
              <button onClick={() => deleteSection(section._id)} className="bg-red-500 text-white p-1 rounded-md">
                <Trash size={16} />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Sections;