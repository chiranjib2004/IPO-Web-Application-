import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function EditIPO() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:8080/api/ipo/${id}`).then((res) => {
      setForm(res.data);
    });
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8080/api/ipo/${id}`, form);
    alert("IPO updated!");
    navigate("/");
  };

  if (localStorage.getItem("isLoggedIn") !== "true") {
    return <div className="alert alert-warning mt-4">Please login as admin first.</div>;
  }

  return (
    <div className="container mt-4">
      <h3>Edit IPO</h3>
      <form onSubmit={handleSubmit}>
        {Object.keys(form).map((field) =>
          field !== "id" && field !== "logoPath" && field !== "rhpPdfPath" && field !== "drhpPdfPath" ? (
            <div className="mb-3" key={field}>
              <label className="form-label text-capitalize">{field}</label>
              <input
                name={field}
                value={form[field]}
                onChange={handleChange}
                className="form-control"
              />
            </div>
          ) : null
        )}
        <button className="btn btn-primary">Update</button>
      </form>
    </div>
  );
}

export default EditIPO;
