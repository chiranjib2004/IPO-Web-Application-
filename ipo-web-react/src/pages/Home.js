import { useEffect, useState } from "react";
import axios from "axios";
import IPOCard from "../components/IPOCard";
import { Link } from "react-router-dom";

function Home({ isLoggedIn }) {
  const [ipos, setIpos] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchIPOs();
  }, []);

  const fetchIPOs = () => {
    axios
      .get("http://localhost:8080/api/ipo")
      .then((res) => setIpos(res.data))
      .catch((err) => {
        console.error("Error fetching IPOs:", err);
        alert("Failed to fetch IPO data.");
      });
  };

  const handleDelete = (id) => {
    setIpos(ipos.filter((ipo) => ipo.id !== id)); // Remove from list after delete
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="mb-0">IPO Listings</h3>

        {isLoggedIn ? (
          <Link to="/add" className="btn btn-success">
            + Add IPO
          </Link>
        ) : (
          <Link to="/login" state={{ from: "/add" }} className="btn btn-outline-primary">
            Login to Add IPO
          </Link>
        )}
      </div>

      <input
        type="text"
        className="form-control mb-4"
        placeholder="Search IPO by company name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="row row-cols-1 row-cols-md-3 g-4">
        {ipos
          .filter((ipo) =>
            ipo.companyName.toLowerCase().includes(search.toLowerCase())
          )
          .map((ipo) => (
            <IPOCard
              key={ipo.id}
              ipo={ipo}
              onDelete={handleDelete}
              isLoggedIn={isLoggedIn}
            />
          ))}
      </div>
    </>
  );
}

export default Home;
