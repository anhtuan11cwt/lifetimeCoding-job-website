import { Navigate, Route, Routes } from "react-router-dom";
import Login from "@/components/auth/Login";
import Signup from "@/components/auth/Signup";
import Home from "@/components/Home";
import Navbar from "@/components/shared/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<Login />} path="/login" />
        <Route element={<Signup />} path="/signup" />
        <Route element={<Navigate to="/" />} path="*" />
      </Routes>
    </>
  );
}

export default App;
