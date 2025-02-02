import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SetUp({ user }) {
  const navigate = useNavigate();
  const [countries, setCountries] = useState([]);
  const [formData, setFormData] = useState({
    user_id: user.id,
    user_gender: "",
    user_level: 1,
    user_own: "",
    user_country: "",
    user_scams: [],
  });

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all?fields=name")
      .then((response) => response.json())
      .then((data) => {
        const countryNames = data.map((country) => country.name.common).sort();
        setCountries(countryNames);
      })
      .catch((error) => console.error("Error fetching countries:", error));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prevData) => ({
        ...prevData,
        user_scams: checked
          ? [...prevData.user_scams, value]
          : prevData.user_scams.filter((scam) => scam !== value),
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    //TODO: Use this data and communicate with backend
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    navigate("/");
  };

  return (
    <div className="set-up">
      <h2>Set Up Your Profile</h2>
      <form onSubmit={handleSubmit} className="set-up-form">
        <div className="set-up-gender">
          <div className="set-up-country">
            <label>Country: </label>
            <select
              name="user_country"
              value={formData.user_country}
              onChange={handleChange}
            >
              <option value="">Select</option>
              {countries.map((country, index) => (
                <option key={index} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>

          <label>Gender: </label>
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
          <label>Internet Savviness (1-5): </label>
          <input
            type="number"
            name="user_level"
            min="1"
            max="5"
            value={formData.user_level}
            onChange={handleChange}
          />
        </div>

        <div className="home-ownership">
          <label>Do you own or rent: </label>
          <select
            name="user_own"
            value={formData.user_own}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="Own">Own</option>
            <option value="Rent">Rent</option>
          </select>
        </div>

        <div className="scam-experience">
          <label>Have you fallen for any of the following scams?</label>
          <div>
            <input
              type="checkbox"
              name="user_scams"
              value="Romance Scams"
              onChange={handleChange}
            />{" "}
            Romance Scams
          </div>
          <div>
            <input
              type="checkbox"
              name="user_scams"
              value="Tech Support Scams"
              onChange={handleChange}
            />{" "}
            Tech Support Scams
          </div>
          <div>
            <input
              type="checkbox"
              name="user_scams"
              value="Lottery Scams"
              onChange={handleChange}
            />{" "}
            Lottery Scams
          </div>
          <div>
            <input
              type="checkbox"
              name="user_scams"
              value="Phishing"
              onChange={handleChange}
            />{" "}
            Phishing
          </div>
          <div>
            <input
              type="checkbox"
              name="user_scams"
              value="Email Extension"
              onChange={handleChange}
            />{" "}
            Email Extension
          </div>
          <div>
            <input
              type="checkbox"
              name="user_scams"
              value="Fake Check/Overpayment Scams"
              onChange={handleChange}
            />{" "}
            Fake Check/Overpayment Scams
          </div>
        </div>

        <button type="submit" className="set-up-submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default SetUp;
