import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/auth/login/Login";
import Register from "./pages/auth/sign_up/SignUp";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import Create from "./pages/posts/create/Create";
import Error404 from "./pages/errors/Error404";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />

          <Route path="*" element={<Error404 />} />
        </Routes>
      </Router>
    </>
  );
}

// Global API endpoint
export const API_ENDPOINT: string = "http://localhost/api/"

export default App;
