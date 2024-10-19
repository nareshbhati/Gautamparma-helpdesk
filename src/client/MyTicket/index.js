import { useEffect, useState } from "react";
import TicketTable from "./components/Table";
import "./index.css";

const MyTable = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/tickets")
      .then((response) => response.json())
      .then((data) => setTickets(data))
      .catch((error) => console.error("Error fetching tickets:", error));
  }, []);

  return (
    <div className="myTbl">
      <TicketTable tickets={tickets} />
    </div>
  );
};

export default MyTable;
