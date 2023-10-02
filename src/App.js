import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Todo from "./pages/Todo";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
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
