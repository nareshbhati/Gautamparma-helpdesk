import "../index.css";

const TicketTable = ({ tickets = [] }) => {
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

  const getRandomStatus = (currentStatus) => {
    const statuses = ["Pending", "In Progress", "Hold", "Done"];
    // If the current status is in the list, remove it to avoid repetition
    const filteredStatuses = statuses.filter(
      (status) => status !== currentStatus
    );
    // Return a random status from the filtered array
    return filteredStatuses[
      Math.floor(Math.random() * filteredStatuses.length)
    ];
  };

  return (
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
            <td className={getStatusColor(getRandomStatus())}>
              {getRandomStatus()}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TicketTable;
