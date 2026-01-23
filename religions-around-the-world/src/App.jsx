import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import './App.css'
import Home from './pages/Home.jsx';
import ReligionPage from "./pages/ReligionPage.jsx";
import BranchPage from "./pages/BranchPage.jsx";

function App() {
  return (
      <Router>
          <Routes>
              <Route path="/" element={<Home />} />
              {/*Dynamic route*/}
              <Route path="/religions/:religionId" element={<ReligionPage />} />
              {/*Dynamic Branch*/}
              <Route path="/religions/:religionId/:branchId" element={<BranchPage />} />
          </Routes>
      </Router>
  );
}

export default App
