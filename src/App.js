import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Header";
import Vote from "./Vote";
import VotingApp from "./VotingApp";
import Results from "./Results";  // ✅ Import Results page

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Header />} />
        <Route path="/vote" element={<Vote />} />
        <Route path="/login" element={<VotingApp />} />
        <Route path="/results/:id" element={<Results />} />  {/* ✅ Route for Results */}
      </Routes>
    </Router>
  );
}

export default App;
