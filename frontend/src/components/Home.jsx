import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CategoryCarousel from "@/components/CategoryCarousel";
import HeroSection from "@/components/HeroSection";
import LatestJobCards from "@/components/LatestJobCards";
import Footer from "@/components/shared/Footer";
import useGetAllJobs from "@/hooks/useGetAllJobs";

const Home = () => {
  useGetAllJobs();
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);
  const { allJobs } = useSelector((store) => store.job);

  useEffect(() => {
    if (user?.role === "recruiter") {
      navigate("/admin/companies");
    }
  }, [user, navigate]);

  return (
    <div>
      <HeroSection />
      <CategoryCarousel />
      <div className="my-20 px-6 md:px-12 lg:px-24 xl:px-40">
        <h1 className="text-2xl font-bold">Việc làm mới và nổi bật</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-5">
          {allJobs.length > 0 ? (
            allJobs
              .slice(0, 6)
              .map((job) => <LatestJobCards job={job} key={job._id} />)
          ) : (
            <p className="col-span-3 text-center text-gray-500">
              Chưa có công việc nào
            </p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
