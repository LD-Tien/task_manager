import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Todo from "./pages/Todo";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useRef, useState } from "react";
import taskManager from "./models/TaskManger";
import Modal from "./components/Modal";
import { useAuth } from "./contexts/AuthContext";
import PrivateRouter from "./components/PrivateRouter";
import ForgotPassword from "./pages/ForgotPassword";

function App() {
  const { currentUser } = useAuth();
  const root = useRef(document.querySelector("html"));
  const [showModalConfirm, setShowModalConfirm] = useState(false);
  const dataTheme = localStorage.getItem("data-theme");
  taskManager.setShowModalConfirm = setShowModalConfirm;
  
  if (!dataTheme) {
    // set default theme
    root.current.setAttribute("data-theme", "dark");
    localStorage.setItem("data-theme", "dark");
  } else {
    root.current.setAttribute("data-theme", dataTheme);
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/home"
            element={
              <PrivateRouter isPass={currentUser} redirect="/login">
                <Todo />
              </PrivateRouter>
            }
          />
          <Route
            path="/signup"
            element={
              <PrivateRouter isPass={!currentUser} redirect="/home">
                <Signup />
              </PrivateRouter>
            }
          />
          <Route
            path="/forgotPassword"
            element={
              <PrivateRouter isPass={!currentUser} redirect="/home">
                <ForgotPassword />
              </PrivateRouter>
            }
          />
          <Route
            path="/*"
            element={
              <PrivateRouter isPass={!currentUser} redirect="/home">
                <Login />
              </PrivateRouter>
            }
          />{" "}
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
