import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Todo from "./pages/Todo";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useRef } from "react";

function App() {
  const root = useRef(document.querySelector("html"));
  const dataTheme = useRef(localStorage.getItem("data-theme"));
  if (!dataTheme.current) {
    // set default theme
    root.current.setAttribute("data-theme", "dark");
    localStorage.setItem("data-theme", "dark");
  } else {
    root.current.setAttribute("data-theme", dataTheme.current);
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/home" element={<Todo />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/*" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
