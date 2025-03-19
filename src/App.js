import "./App.css";

import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import NewTicket from "./client/NewTicket";
import MyTicket from "./client/MyTicket";
import EngineerForm from "./client/EngineerForm";
import Footer from "./client/Footer";
import Home from "./client/Home";
import About from "./client/About";
import Contact from "./client/Contact";

const App = () => {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/create">Create Ticket</Link>
          </li>
          <li>
            <Link to="/my-ticket">My Ticket</Link>
          </li>
          <li>
            <Link to="/Engineers">IT Engineer</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/create" element={<NewTicket />} />
        <Route path="/my-ticket" element={<MyTicket />} />
        <Route path="/engineers" element={<EngineerForm />} />
        <Route path="/" exact element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

      <Footer />
    </Router>
  );
};

export default App;
