import './App.css';
import FirstPage from './screens/FirstPage'
import { AccueilChat } from './screens/chat';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        {/* Define the routes */}
        <Route path="/" element={<FirstPage />} />
        <Route path="/ask/:fileName" element={<AccueilChat />} />
      </Routes>
    </Router>

  );
}

export default App;
