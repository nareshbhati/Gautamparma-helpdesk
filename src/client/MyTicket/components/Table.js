import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../index.css";

const TicketTable = ({ tickets = [], engineers = [] }) => {
  const navigate = useNavigate();

  const [selectedTicket, setSelectedTicket] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [assignedEngineer, setAssignedEngineer] = useState({});
  const [assignedEngineerId, setAssignedEngineerId] = useState("");

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "pending";
      case "In Progress":
        return "in-progress";
      case "Hold":
        return "hold";
      case "Done":
        return "done";
      default:
        return "pending";
    }
  };

  const openModal = (ticket) => {
    setSelectedTicket(ticket);
    setAssignedEngineer(ticket.assignedTo || "");
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleEngineerSelect = (ev) => {
    const id = ev.target.value;
    const selectedIndex = ev.target.selectedIndex;
    const selectedOption = ev.target.options[selectedIndex];
    const empName = selectedOption.text;
    setAssignedEngineer({ id, empName });
    setAssignedEngineerId(id);
  };

  const assignHandler = () => {
    const assidnTieckets = tickets.find(
      (ticket) => ticket.id === selectedTicket.id
    );
    fetch(`http://localhost:5000/tickets/${selectedTicket.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...assidnTieckets,
        assignedTo: assignedEngineer.empName,
        status: "In Progress",
      }),
    })
      .then((response) => {
        if (response.ok) {
          console.log(`Engineer with empId: ${assignedEngineer} updated`);
          setShowModal(false);
          // navigate("/my-ticket");
          navigate(0);
        } else {
          console.error("Failed to update the engineer");
        }
      })
      .catch((error) => console.error("Error deleting engineer:", error));
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Subject</th>
            <th>Desk No.</th>
            <th>Floor</th>
            <th>Priority</th>
            <th>Description</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket, index) => (
            <tr key={index}>
              <td>{`Ticket ${index + 1}`}</td>
              <td>{ticket.subject}</td>
              <td>{ticket.deskNo}</td>
              <td>{ticket.floor}</td>
              <td>{ticket.priority}</td>
              <td>{ticket.description}</td>
              <td>
                {ticket.status?.toLowerCase() === "pending" ? (
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => openModal(ticket)}
                    className={getStatusColor(ticket.status)}
                  >
                    Pending
                  </span>
                ) : (
                  <span>
                    {" "}
                    {ticket.status} by {ticket.assignedTo}
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Modal for selecting engineer */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h2>Select Engineer</h2>
            <select
              value={assignedEngineerId}
              onChange={handleEngineerSelect}
              className="engineer-dropdown"
            >
              <option value="">Select Engineer</option>
              {engineers.map((engineer) => (
                <option key={engineer.id} value={engineer.id}>
                  {engineer.empName}
                </option>
              ))}
            </select>
            <br /> <br /> <br />
            <button onClick={assignHandler}>Assigned To</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketTable;
