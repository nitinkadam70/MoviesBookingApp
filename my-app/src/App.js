import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Bookings from "./pages/Bookings";
import Navbar from "./Components/Navbar";
import Details from "./pages/Details";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/movie/:id" element={<Details />} />
      </Routes>
    </>
  );
}

export default App;
