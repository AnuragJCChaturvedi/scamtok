import { useState } from "react";
import { Dropdown } from "react-bootstrap";

function ScamItem({ scam }) {
  const [showDescription, setShowDescription] = useState(false);

  return (
    <>
      <Dropdown.Item onClick={() => setShowDescription(!showDescription)}>
        {scam["date-of-scam"]} - {scam["scam-type"]}{" "}
        {showDescription ? "v" : ">"}
      </Dropdown.Item>
      {showDescription && (
        <div style={{ padding: "10px", background: "#f8f9fa" }}>
          <p>{scam.description}</p>
        </div>
      )}
    </>
  );
}

export default ScamItem;
