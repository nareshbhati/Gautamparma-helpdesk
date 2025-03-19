import { useEffect, useState } from "react";
import TicketTable from "./components/Table";
import "./index.css";

const MyTable = () => {
  const [tickets, setTickets] = useState([]);
  const [engineers, setEngineers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/tickets")
      .then((response) => response.json())
      .then((data) => setTickets(data))
      .catch((error) => console.error("Error fetching tickets:", error));

    fetch("http://localhost:5000/engineers")
      .then((response) => response.json())
      .then((data) => setEngineers(data))
      .catch((error) => console.error("Error fetching engineer:", error));
  }, []);

  return (
    <div className="myTbl">
      <TicketTable tickets={tickets} engineers={engineers} />
    </div>
  );
};

export default MyTable;
