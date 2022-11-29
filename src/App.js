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
import Login from "./component/Login";
import SignUp from "./component/SignUp";

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
            <Route path="/login" element={<Login />}/>
            <Route path="/signup" element={<SignUp />}/>
          </Routes>

        </Router>
      </NoteState>
    </>
  );
}

export default App;
