import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import 'Routes' instead of 'Switch'
import HomePage from './components/HomePage';
import MovieDetails from './components/MovieDetails';

function App() {
  return (
    <Router>
      <Routes> {/* Use 'Routes' instead of 'Switch' */}
        <Route path="/" element={<HomePage />} /> {/* Use 'element' prop */}
        <Route path="/movies/:id" element={<MovieDetails />} /> {/* Use 'element' prop */}
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
}

export default App;

