import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

const AssessmentPage = lazy(() => import('./pages/Assessment'));

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/assessment"
          element={
            <Suspense fallback={<div className="min-h-screen bg-soft-grey" />}>
              <AssessmentPage />
            </Suspense>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
