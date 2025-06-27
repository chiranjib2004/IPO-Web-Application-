import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function AddIPO() {
  const navigate = useNavigate();
  const [form, setForm] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(form).forEach((key) => data.append(key, form[key]));
    data.append("logo", e.target.logo.files[0]);
    data.append("rhp", e.target.rhp.files[0]);
    data.append("drhp", e.target.drhp.files[0]);

    try {
      await axios.post("http://localhost:8080/api/ipo", data);
      alert("IPO added!");
      navigate("/");
    } catch (err) {
      alert("Error adding IPO.");
      console.error(err);
    }
  };

  return (
    <div className="container mt-4">
      <h3>Add New IPO</h3>
      <form onSubmit={handleSubmit}>
        {[
          "companyName",
          "priceBand",
          "issueSize",
          "issueType",
          "status",
          "ipoPrice",
          "listingPrice",
          "currentMarketPrice",
        ].map((field) => (
          <div className="mb-3" key={field}>
            <label className="form-label text-capitalize">{field}</label>
            <input
              name={field}
              className="form-control"
              onChange={handleChange}
              required
            />
          </div>
        ))}

        <div className="mb-3">
          <label className="form-label">Open Date</label>
          <input
            type="date"
            name="openDate"
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Close Date</label>
          <input
            type="date"
            name="closeDate"
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Listing Date</label>
          <input
            type="date"
            name="listingDate"
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Upload Logo</label>
          <input type="file" name="logo" className="form-control" required />
        </div>
        <div className="mb-3">
          <label>Upload RHP</label>
          <input type="file" name="rhp" className="form-control" required />
        </div>
        <div className="mb-3">
          <label>Upload DRHP</label>
          <input type="file" name="drhp" className="form-control" required />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default AddIPO;
