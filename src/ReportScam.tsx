import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { scamCategories, storeUserKey } from './common'

import { UserContext } from './contexts/UserContext'

function ReportScam() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    scam_type: "",
    date_of_scam: "",
    description: "",
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const { setCount } = useContext(UserContext)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Confirmation before submission
    const confirmSubmit = window.confirm(
      "Are you sure you want to submit this scam report?"
    );

    if (!confirmSubmit) return;

    console.log("New Scam Report:", formData);

    const userDataStr = localStorage.getItem(storeUserKey);
    
    if (userDataStr) {
      const userDataObj = JSON.parse(userDataStr);
    
      if (!userDataObj.user_scams.includes(formData.scam_type)) {
        userDataObj.user_scams.push(formData.scam_type);
    
        localStorage.setItem(storeUserKey, JSON.stringify(userDataObj));
      }

    } else {
      const newUserData = {
        user_scams: [formData.scam_type],
      };
    
      localStorage.setItem(storeUserKey, JSON.stringify(newUserData));

    }

    setCount(1)
    

    setShowSuccess(true);

    setTimeout(() => {
      setShowSuccess(false);
      setFormData({
        scam_type: "",
        date_of_scam: "",
        description: "",
      });
      navigate("/");
    }, 3000);
  };

  return (
    <div className="report-scam">
      <h2>Report a Scam</h2>

      {showSuccess && (
        <div className="success-message">
          ✅ Scam report submitted successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="report-scam-form">
        <div className="form-group">
          <label>Scam Type: </label>
          <select
            name="scam_type"
            value={formData.scam_type}
            onChange={handleChange}
            required
          >
            {scamCategories.map((val) => {
              return (
                <option value={val}>{val}</option>
              )
            })}
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
