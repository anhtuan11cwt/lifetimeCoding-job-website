import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "@/components/ProtectedRoute";
import Navbar from "@/components/shared/Navbar";

const AdminJobs = lazy(() => import("@/components/admin/AdminJobs"));
const Applicants = lazy(() => import("@/components/admin/Applicants"));
const Companies = lazy(() => import("@/components/admin/Companies"));
const CompanyCreate = lazy(() => import("@/components/admin/CompanyCreate"));
const CompanySetup = lazy(() => import("@/components/admin/CompanySetup"));
const PostJob = lazy(() => import("@/components/admin/PostJob"));
const JobSetup = lazy(() => import("@/components/admin/JobSetup"));
const Login = lazy(() => import("@/components/auth/Login"));
const Signup = lazy(() => import("@/components/auth/Signup"));
const Browse = lazy(() => import("@/components/Browse"));
const Home = lazy(() => import("@/components/Home"));
const JobDescription = lazy(() => import("@/components/JobDescription"));
const Jobs = lazy(() => import("@/components/Jobs"));
const Profile = lazy(() => import("@/components/Profile"));

function App() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <Suspense fallback={<div className="p-6 text-center">Đang tải...</div>}>
          <Routes>
            <Route element={<Home />} path="/" />
            <Route element={<Login />} path="/login" />
            <Route element={<Signup />} path="/signup" />
            <Route element={<Jobs />} path="/jobs" />
            <Route element={<Browse />} path="/browse" />
            <Route element={<Profile />} path="/profile" />
            <Route element={<JobDescription />} path="/description/:id" />

            {/* Admin Routes */}
            <Route
              element={
                <ProtectedRoute>
                  <Companies />
                </ProtectedRoute>
              }
              path="/admin/companies"
            />
            <Route
              element={
                <ProtectedRoute>
                  <CompanyCreate />
                </ProtectedRoute>
              }
              path="/admin/companies/create"
            />
            <Route
              element={
                <ProtectedRoute>
                  <CompanySetup />
                </ProtectedRoute>
              }
              path="/admin/companies/:id"
            />
            <Route
              element={
                <ProtectedRoute>
                  <AdminJobs />
                </ProtectedRoute>
              }
              path="/admin/jobs"
            />
            <Route
              element={
                <ProtectedRoute>
                  <PostJob />
                </ProtectedRoute>
              }
              path="/admin/jobs/create"
            />
            <Route
              element={
                <ProtectedRoute>
                  <JobSetup />
                </ProtectedRoute>
              }
              path="/admin/jobs/:id"
            />
            <Route
              element={
                <ProtectedRoute>
                  <Applicants />
                </ProtectedRoute>
              }
              path="/admin/jobs/:id/applicants"
            />

            <Route element={<Navigate to="/" />} path="*" />
          </Routes>
        </Suspense>
      </main>
    </>
  );
}

export default App;
