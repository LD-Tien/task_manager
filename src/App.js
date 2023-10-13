import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Todo from "./pages/Todo";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useRef, useState } from "react";
import taskManager from "./models/TaskManger";
import Modal from "./components/Modal";

function App() {
  const root = useRef(document.querySelector("html"));
  const dataTheme = useRef(localStorage.getItem("data-theme"));
  const [showModalConfirm, setShowModalConfirm] = useState(false);
  taskManager.setShowModalConfirm = setShowModalConfirm;

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
        <Modal
          type="confirm"
          isShow={showModalConfirm}
          setIsShow={setShowModalConfirm}
          title={taskManager.confirmModalData.title}
          confirm={taskManager.confirmModalData.confirmContent}
          confirmContent={taskManager.confirmModalData.confirmContent}
          confirmType={taskManager.confirmModalData.confirmType}
          onClickConfirm={taskManager.confirmModalData.onClickConfirm}
          cancelContent={taskManager.confirmModalData.cancelContent}
          onClickCancel={taskManager.confirmModalData.onClickCancel}
        >
          {taskManager.confirmModalData.body}
        </Modal>
      </div>
    </Router>
  );
}

export default App;
