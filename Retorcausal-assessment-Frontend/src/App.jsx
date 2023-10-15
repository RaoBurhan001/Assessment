import { BrowserRouter as Router } from 'react-router-dom';
import Routing from './routing/Routes';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <>
      <ToastContainer />
      <Router>
        <Routing />
      </Router>
    </>
  );
}

export default App;
