import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AssessmentPage from './pages/Assessment';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/assessment" element={<AssessmentPage />} />
      </Routes>
    </Router>
  );
}

export default App;
