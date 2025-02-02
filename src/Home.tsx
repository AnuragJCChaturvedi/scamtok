import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Scams from "./Shorts";
import { Dropdown } from "react-bootstrap";
import ScamItem from "./ScamItem";

function Home({ user }) {
  const navigate = useNavigate();
  const [scams, setScams] = useState([]);

  useEffect(() => {
    fetch("/recent_scams.json")
      .then((response) => response.json())
      .then((data) => {
        const sortedScams = data.sort(
          (a, b) => new Date(b["date-of-scam"]) - new Date(a["date-of-scam"]),
        );
        setScams(sortedScams);
      })
      .catch((error) => console.error("Error fetching scams:", error));
  }, []);

  const handleSelect = (eventKey, event) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  return (
    <div className="home">
      <div className="dropdown-container">
        <Dropdown onSelect={handleSelect} autoClose={false}>
          <Dropdown.Toggle variant="primary" id="dropdown-basic">
            Recent Scams
          </Dropdown.Toggle>
          <Dropdown.Menu onClick={(e) => e.stopPropagation()}>
            {scams.map((scam, index) => (
              <ScamItem key={index} scam={scam} />
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>

      {/*THIS BUTTON MIGHT NOT BE NEEDED. MIGHT ADD CONFUSION TO SENIOR??*/}
      <button
        className="reconfig-account-button"
        onClick={() => navigate("/setup")}
      >
        Reconfigure Account
      </button>

      <Scams user={user} />

      <button
        className="report-scam-button"
        onClick={() => navigate("/report-scam")}
      >
        Report Scam
      </button>
    </div>
  );
}

export default Home;
