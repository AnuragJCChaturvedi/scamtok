import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Scams from "./Scams";

const isNewUser = (user) => {
  if (user) {
    const creationDate = new Date(user.createdAt);
    const now = new Date();

    const diff = now.getTime() - creationDate.getTime();
    return diff - 5000 <= 0;
  }
};

function Home({ user }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (isNewUser(user)) {
      navigate("/setup");
    }
  }, [user, navigate]);

  return (
    <div className="home">
      <button
        className="reconfig-account-button"
        onClick={() => navigate("/setup")}
      >
        Reconfigure Account
      </button>
      <Scams user={user} />
    </div>
  );
}

export default Home;
