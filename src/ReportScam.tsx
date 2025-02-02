import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ReportScam() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    scam_type: "",
    date_of_scam: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newScamReport = {
      scam_type: formData.scam_type,
      date_of_scam: formData.date_of_scam,
      description: formData.description,
    };

    console.log("New Scam Report:", newScamReport);

    setFormData({
      scam_type: "",
      date_of_scam: "",
      description: "",
    });

    navigate("/");
  };

  return (
    <div className="report-scam">
      <h2>Report a Scam</h2>
      <form onSubmit={handleSubmit} className="report-scam-form">
        <div className="form-group">
          <label>Scam Type: </label>
          <select
            name="scam_type"
            value={formData.scam_type}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            <option value="Romance Scams">Romance Scams</option>
            <option value="Tech Support Scams">Tech Support Scams</option>
            <option value="Lottery Scams">Lottery Scams</option>
            <option value="Phishing">Phishing</option>
            <option value="Email Extension">Email Extension</option>
            <option value="Fake Check/Overpayment Scams">
              Fake Check/Overpayment Scams
            </option>
          </select>
        </div>

        <div className="form-group">
          <label>Date of Scam: </label>
          <input
            type="date"
            name="date_of_scam"
            value={formData.date_of_scam}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Description: </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="5"
            placeholder="Provide details about the scam..."
            required
          />
        </div>

        <button type="submit" className="submit-button">
          Submit Report
        </button>
      </form>
    </div>
  );
}

export default ReportScam;
