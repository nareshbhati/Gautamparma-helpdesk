import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css"; // Import CSS

const EngineerForm = () => {
  const navigate = useNavigate();
  const [empId, setEmpId] = useState("");
  const [empName, setEmpName] = useState("");
  const [role, setRole] = useState("");
  const [engineers, setEngineers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/engineers")
      .then((response) => response.json())
      .then((data) => setEngineers(data))
      .catch((error) => console.error("Error fetching engineer:", error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newEngineer = {
      id: empId,
      empName,
      role,
    };

    setEngineers([...engineers, newEngineer]);

    fetch("http://localhost:5000/engineers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEngineer),
    })
      .then((response) => response.json())
      .then(() => {
        navigate("/engineers");
      })
      .catch((error) => console.error("Error adding engineer:", error));

    setEmpId("");
    setEmpName("");
    setRole("");
  };

  const handleDelete = (empId) => {
    // Remove from state
    const updatedEngineers = engineers.filter(
      (engineer) => engineer.id !== empId
    );
    setEngineers(updatedEngineers);

    // Send DELETE request to the server
    fetch(`http://localhost:5000/engineers/${empId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          console.log(`Engineer with empId: ${empId} deleted`);
        } else {
          console.error("Failed to delete the engineer");
        }
      })
      .catch((error) => console.error("Error deleting engineer:", error));
  };

  return (
    <div className="engineer-form-container">
      <h2 className="form-title">Add Engineer</h2>
      <form className="engineer-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="empId" className="label">
            Employee ID:
          </label>
          <input
            type="text"
            id="empId"
            className="input"
            value={empId}
            onChange={(e) => setEmpId(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="empName" className="label">
            Employee Name:
          </label>
          <input
            type="text"
            id="empName"
            className="input"
            value={empName}
            onChange={(e) => setEmpName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="role" className="label">
            Role:
          </label>
          <select
            id="role"
            className="input"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="">Select Role</option>
            <option value="Admin">Admin</option>
            <option value="Engineer">Engineer</option>
          </select>
        </div>
        <button type="submit" className="submit-button">
          Add Engineer
        </button>
      </form>

      <h2 className="engineers-list-title">Engineers List</h2>
      {engineers.length > 0 ? (
        <table className="engineers-table">
          <thead>
            <tr>
              <th>EmpID</th>
              <th>EmpName</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {engineers.map((engineer, index) => (
              <tr key={index}>
                <td>{engineer.id}</td>
                <td>{engineer.empName}</td>
                <td>{engineer.role}</td>
                <td>
                  <button
                    onClick={() => handleDelete(engineer.id)}
                    className="delete-button"
                    aria-label="Delete Engineer"
                  >
                    <span styles={{ color: "black" }}>Delete</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="no-engineers-message">No engineers added yet.</p>
      )}
    </div>
  );
};

export default EngineerForm;
