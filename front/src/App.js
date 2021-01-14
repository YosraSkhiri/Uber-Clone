import { BrowserRouter as Router } from "react-router-dom";
import './assets/style/sass/style.scss';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
      </div>
    </Router>
  );
}

export default App;
