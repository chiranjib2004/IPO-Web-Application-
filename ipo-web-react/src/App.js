import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthContext from "./context/AuthContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AddIPO from "./pages/AddIPO";
import EditIPO from "./pages/EditIPO";
import DetailIPO from "./pages/DetailIPO";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <Router>
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

<Routes>
  <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
  <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
  <Route path="/add" element={<AddIPO isLoggedIn={isLoggedIn} />} />
  <Route path="/edit/:id" element={<EditIPO isLoggedIn={isLoggedIn} />} />
  <Route path="/detail/:id" element={<DetailIPO />} />
</Routes>

      </Router>
    </AuthContext.Provider>
  );
}

export default App;
