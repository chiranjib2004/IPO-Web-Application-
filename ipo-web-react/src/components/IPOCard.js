import { Link } from "react-router-dom";
import axios from "axios";

function IPOCard({ ipo, onDelete, isLoggedIn }) {
  const handleDelete = () => {
    if (!window.confirm(`Delete IPO: ${ipo.companyName}?`)) return;

    axios
      .delete(`http://localhost:8080/api/ipo/${ipo.id}`)
      .then(() => {
        alert("Deleted!");
        if (onDelete) onDelete(ipo.id);
      })
      .catch((err) => {
        alert("Error deleting IPO.");
        console.error(err);
      });
  };

  return (
    <div className="col">
      <div className="card p-3 h-100">
        <img
          src={`http://localhost:8080/${ipo.logoPath}`}
          className="img-fluid mb-2"
          style={{ maxHeight: "80px" }}
          alt="Logo"
        />
        <h5>{ipo.companyName}</h5>
        <p><strong>Status:</strong> {ipo.status}</p>
        <p><strong>Market Price:</strong> ₹{ipo.currentMarketPrice}</p>

        <div className="d-flex gap-2 flex-wrap">
          <Link to={`/detail/${ipo.id}`} className="btn btn-outline-primary btn-sm">
            View
          </Link>
          {isLoggedIn ? (
            <>
              <Link to={`/edit/${ipo.id}`} className="btn btn-warning btn-sm">Edit</Link>
              <button onClick={handleDelete} className="btn btn-danger btn-sm">Delete</button>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default IPOCard;
