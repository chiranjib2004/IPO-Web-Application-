import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function DetailIPO() {
  const { id } = useParams();
  const [ipo, setIpo] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/ipo/${id}`).then(res => {
      setIpo(res.data);
    });
  }, [id]);

  if (!ipo) return <p>Loading...</p>;

  return (
    <div className="card p-4 shadow">
      <img src={`http://localhost:8080/${ipo.logoPath}`} style={{ maxWidth: "150px", height: "auto" }} className="mb-3 img-thumbnail" alt="Logo" />
      <p><strong>Company:</strong> {ipo.companyName}</p>
      <p><strong>Status:</strong> {ipo.status}</p>
      <p><strong>Market Price:</strong> ₹{ipo.currentMarketPrice}</p>
      <p><strong>Returns:</strong> {(((ipo.currentMarketPrice - ipo.ipoPrice) / ipo.ipoPrice) * 100).toFixed(2)}%</p>

      <a href={`http://localhost:8080/${ipo.rhpPdfPath}`} className="btn btn-outline-primary me-2" target="_blank" rel="noreferrer">📄 View RHP</a>
      <a href={`http://localhost:8080/${ipo.drhpPdfPath}`} className="btn btn-outline-secondary" target="_blank" rel="noreferrer">📄 View DRHP</a>
    </div>
  );
}

export default DetailIPO;
