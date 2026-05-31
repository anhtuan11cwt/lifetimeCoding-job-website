import { Navigate, Route, Routes } from "react-router-dom";
import Login from "@/components/auth/Login";
import Signup from "@/components/auth/Signup";
import Browse from "@/components/Browse";
import Home from "@/components/Home";
import JobDescription from "@/components/JobDescription";
import Jobs from "@/components/Jobs";
import Profile from "@/components/Profile";
import Navbar from "@/components/shared/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<Login />} path="/login" />
        <Route element={<Signup />} path="/signup" />
        <Route element={<Jobs />} path="/jobs" />
        <Route element={<Browse />} path="/browse" />
        <Route element={<Profile />} path="/profile" />
        <Route element={<JobDescription />} path="/description/:id" />
        <Route element={<Navigate to="/" />} path="*" />
      </Routes>
    </>
  );
}

export default App;
