import Navbar from "./component/Navbar";
import NoteState from "./context/Note/NoteState";
import Home from "./component/Home";
import About from "./component/About";
import Contact from "./component/Contact";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
    <>
      <NoteState>
        <Router>
        <Navbar />
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/contact" element={<Contact />}/>
            <Route path="/about" element={<About />}/>
            
          </Routes>

        </Router>
      </NoteState>
    </>
  );
}

export default App;
