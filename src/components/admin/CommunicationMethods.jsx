import React, { useState } from "react";

const CommunicationMethods = () => {
  // Default methods
  const [methods, setMethods] = useState([
    {
      id: 1,
      name: "LinkedIn Post",
      description: "Post on LinkedIn",
      sequence: 1,
      mandatory: true,
    },
    {
      id: 2,
      name: "LinkedIn Message",
      description: "Message on LinkedIn",
      sequence: 2,
      mandatory: true,
    },
    {
      id: 3,
      name: "Email",
      description: "Send an email",
      sequence: 3,
      mandatory: true,
    },
    {
      id: 4,
      name: "Phone Call",
      description: "Call the company",
      sequence: 4,
      mandatory: false,
    },
    {
      id: 5,
      name: "Other",
      description: "Any other method",
      sequence: 5,
      mandatory: false,
    },
  ]);

  const [formState, setFormState] = useState({
    id: null,
    name: "",
    description: "",
    sequence: "",
    mandatory: false,
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormState({
      ...formState,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleAddMethod = () => {
    if (!isEditing) {
      setMethods([
        ...methods,
        {
          ...formState,
          id: Date.now(),
          sequence: parseInt(formState.sequence, 10),
        },
      ]);
    } else {
      setMethods(
        methods.map((method) =>
          method.id === formState.id
            ? { ...formState, sequence: parseInt(formState.sequence, 10) }
            : method
        )
      );
      setIsEditing(false);
    }
    resetForm();
  };

  const handleEditMethod = (id) => {
    const methodToEdit = methods.find((method) => method.id === id);
    setFormState(methodToEdit);
    setIsEditing(true);
  };

  const handleDeleteMethod = (id) => {
    setMethods(methods.filter((method) => method.id !== id));
  };

  const resetForm = () => {
    setFormState({
      id: null,
      name: "",
      description: "",
      sequence: "",
      mandatory: false,
    });
  };

  const sortedMethods = [...methods].sort((a, b) => a.sequence - b.sequence);

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h2 className="text-xl font-bold mb-4 text-gray-700">
        Communication Method Management
      </h2>

      {/* Form for Adding or Editing Methods */}
      <div className="bg-white p-4 rounded shadow mb-4">
        <h3 className="text-lg font-bold mb-2">
          {isEditing ? "Edit Method" : "Add Method"}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Method Name"
            value={formState.name}
            onChange={handleInputChange}
            className="p-2 border rounded"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formState.description}
            onChange={handleInputChange}
            className="p-2 border rounded"
          ></textarea>
          <input
            type="number"
            name="sequence"
            placeholder="Sequence"
            value={formState.sequence}
            onChange={handleInputChange}
            className="p-2 border rounded"
          />
          <div className="flex items-center">
            <input
              type="checkbox"
              name="mandatory"
              checked={formState.mandatory}
              onChange={handleInputChange}
              className="mr-2"
            />
            <label className="text-gray-700">Mandatory</label>
          </div>
        </div>
        <button
          onClick={handleAddMethod}
          className={`mt-4 px-4 py-2 text-white rounded shadow ${
            isEditing
              ? "bg-green-500 hover:bg-green-600"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {isEditing ? "Update Method" : "Add Method"}
        </button>
      </div>

      {/* List of Methods */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-lg font-bold mb-2">Method List</h3>
        <ul className="space-y-2">
          {sortedMethods.length > 0 ? (
            sortedMethods.map((method) => (
              <li
                key={method.id}
                className="flex justify-between items-center p-4 bg-gray-50 rounded shadow"
              >
                <div>
                  <p className="font-bold">{method.name}</p>
                  <p className="text-sm text-gray-600">{method.description}</p>
                  <p className="text-sm">
                    Sequence: {method.sequence}{" "}
                    {method.mandatory && (
                      <span className="text-red-500">(Mandatory)</span>
                    )}
                  </p>
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() => handleEditMethod(method.id)}
                    className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteMethod(method.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))
          ) : (
            <p className="text-gray-600">No methods defined yet.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default CommunicationMethods;
