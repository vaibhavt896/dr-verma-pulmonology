import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import { initSmoothScroll } from './lib/motion';

const AssessmentPage = lazy(() => import('./pages/Assessment'));

function App() {
  useEffect(() => {
    initSmoothScroll();
  }, []);

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
