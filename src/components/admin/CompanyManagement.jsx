import React, { useState } from "react";

const CompanyManagement = () => {
  const [companies, setCompanies] = useState([]);
  const [formState, setFormState] = useState({
    id: null,
    name: "",
    location: "",
    linkedIn: "",
    emails: "",
    phoneNumbers: "",
    comments: "",
    periodicity: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleAddCompany = () => {
    if (!isEditing) {
      setCompanies([...companies, { ...formState, id: Date.now() }]);
    } else {
      setCompanies(
        companies.map((company) =>
          company.id === formState.id ? formState : company
        )
      );
      setIsEditing(false);
    }
    resetForm();
  };

  const handleEditCompany = (id) => {
    const companyToEdit = companies.find((company) => company.id === id);
    setFormState(companyToEdit);
    setIsEditing(true);
  };

  const handleDeleteCompany = (id) => {
    setCompanies(companies.filter((company) => company.id !== id));
  };

  const resetForm = () => {
    setFormState({
      id: null,
      name: "",
      location: "",
      linkedIn: "",
      emails: "",
      phoneNumbers: "",
      comments: "",
      periodicity: "",
    });
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h2 className="text-xl font-bold mb-4 text-gray-700">
        Company Management
      </h2>

      {/* Form for Adding or Editing Companies */}
      <div className="bg-white p-4 rounded shadow mb-4">
        <h3 className="text-lg font-bold mb-2">
          {isEditing ? "Edit Company" : "Add Company"}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Company Name"
            value={formState.name}
            onChange={handleInputChange}
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formState.location}
            onChange={handleInputChange}
            className="p-2 border rounded"
          />
          <input
            type="url"
            name="linkedIn"
            placeholder="LinkedIn Profile"
            value={formState.linkedIn}
            onChange={handleInputChange}
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="emails"
            placeholder="Emails (comma-separated)"
            value={formState.emails}
            onChange={handleInputChange}
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="phoneNumbers"
            placeholder="Phone Numbers (comma-separated)"
            value={formState.phoneNumbers}
            onChange={handleInputChange}
            className="p-2 border rounded"
          />
          <textarea
            name="comments"
            placeholder="Comments"
            value={formState.comments}
            onChange={handleInputChange}
            className="p-2 border rounded"
          ></textarea>
          <input
            type="text"
            name="periodicity"
            placeholder="Communication Periodicity (e.g., every 2 weeks)"
            value={formState.periodicity}
            onChange={handleInputChange}
            className="p-2 border rounded"
          />
        </div>
        <button
          onClick={handleAddCompany}
          className={`mt-4 px-4 py-2 text-white rounded shadow ${
            isEditing
              ? "bg-green-500 hover:bg-green-600"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {isEditing ? "Update Company" : "Add Company"}
        </button>
      </div>

      {/* List of Companies */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-lg font-bold mb-2">Company List</h3>
        <ul className="space-y-2">
          {companies.length > 0 ? (
            companies.map((company) => (
              <li
                key={company.id}
                className="flex justify-between items-center p-4 bg-gray-50 rounded shadow"
              >
                <div>
                  <p className="font-bold">{company.name}</p>
                  <p className="text-sm text-gray-600">{company.location}</p>
                  <p className="text-sm text-blue-500">
                    <a
                      href={company.linkedIn}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      LinkedIn Profile
                    </a>
                  </p>
                  <p className="text-sm">Emails: {company.emails}</p>
                  <p className="text-sm">
                    Phone Numbers: {company.phoneNumbers}
                  </p>
                  <p className="text-sm">Comments: {company.comments}</p>
                  <p className="text-sm">Periodicity: {company.periodicity}</p>
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() => handleEditCompany(company.id)}
                    className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteCompany(company.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))
          ) : (
            <p className="text-gray-600">No companies added yet.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default CompanyManagement;
