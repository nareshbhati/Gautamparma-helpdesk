import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./index.css";

const TicketForm = () => {
  const navigate = useNavigate();
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [deskNo, setDeskNo] = useState("");
  const [floor, setFloor] = useState("");
  const [priority, setPriority] = useState("Low");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({
      subject,
      description,
      deskNo,
      floor,
      priority,
    });

    const ticket = {
      subject,
      deskNo,
      floor,
      priority,
      description,
      status: "Pending",
    };

    fetch("http://localhost:5000/tickets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ticket),
    })
      .then((response) => response.json())
      .then((newTicket) => {
        navigate("/my-ticket");
      })
      .catch((error) => console.error("Error adding ticket:", error));

    // Reset form fields
    setSubject("");
    setDescription("");
    setDeskNo("");
    setFloor("");
    setPriority("Low");
  };

  return (
    <form className="ticket-form" onSubmit={handleSubmit}>
      <h2>Create Ticket</h2>
      <div className="form-group">
        <label htmlFor="subject">Subject</label>
        <input
          type="text"
          id="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
      </div>
      <div className="form-group">
        <label htmlFor="deskNo">Desk No.</label>
        <input
          type="text"
          id="deskNo"
          value={deskNo}
          onChange={(e) => setDeskNo(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="floor">Floor</label>
        <input
          type="text"
          id="floor"
          value={floor}
          onChange={(e) => setFloor(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="priority">Priority</label>
        <select
          id="priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>
      <button type="submit">Submit Ticket</button>
    </form>
  );
};

export default TicketForm;
