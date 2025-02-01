import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SetUp({ user }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    user_id: user.id,
    user_gender: "",
    user_level: 1,
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
    console.log("Form Data Submitted:", formData);
    navigate("/");
  };

  return (
    <div className="set-up">
      <h2>Set Up Your Profile</h2>
      <form onSubmit={handleSubmit} className="set-up-form">
        <div className="set-up-gender">
          <label>Gender:</label>
          <select
            name="user_gender"
            value={formData.user_gender}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="x">X</option>
          </select>
        </div>

        <div className="set-up-savviness">
          <label>Internet Savviness (1-5):</label>
          <input
            type="number"
            name="user_level"
            min="1"
            max="5"
            value={formData.user_level}
            onChange={handleChange}
          />
        </div>

        <div className="home-ownership"></div>

        <button type="submit" className="set-up-submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default SetUp;
