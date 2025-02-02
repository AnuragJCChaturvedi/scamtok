import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

import Home from "./Home";
import Scams from "./Scams";
import SignedOutHome from "./SignedOutHome";
import SetUp from "./SetUp";
import ReportScam from "./ReportScam";

export default function App() {
  const { user } = useUser();

  return (
    <Router>
      <div>
        <SignedOut>
          <div className="signed-out">
            <SignedOutHome />
            <SignInButton />
          </div>
        </SignedOut>
        <SignedIn>
          <UserButton />
          <Routes>
            <Route path="/" element={<Home user={user} />} />
            <Route path="/scams" element={<Scams />} />
            <Route path="/setup" element={<SetUp user={user} />} />
            <Route path="/report-scam" element={<ReportScam />} />
          </Routes>
        </SignedIn>
      </div>
    </Router>
  );
}
