import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import LatestJobCards from "@/components/LatestJobCards";
import Breadcrumb from "@/components/shared/Breadcrumb";
import useGetAllJobs from "@/hooks/useGetAllJobs";

const Browse = () => {
  useGetAllJobs();
  const { allJobs } = useSelector((store) => store.job);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  const filteredJobs = useMemo(() => {
    const jobs = Array.isArray(allJobs) ? allJobs : [];

    if (!query) {
      return jobs;
    }

    const lowerQuery = query.toLowerCase();
    return jobs.filter(
      (job) =>
        job.title?.toLowerCase().includes(lowerQuery) ||
        job.description?.toLowerCase().includes(lowerQuery) ||
        job.location?.toLowerCase().includes(lowerQuery),
    );
  }, [allJobs, query]);

  return (
    <div className="mt-5 px-6 md:px-12 lg:px-24 xl:px-40">
      <Breadcrumb
        items={[{ label: "Trang chủ", to: "/" }, { label: "Tìm kiếm" }]}
      />
      <h1 className="font-bold text-xl mb-8">
        Kết quả tìm kiếm ({filteredJobs.length})
      </h1>
      {filteredJobs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredJobs.map((job) => (
            <LatestJobCards job={job} key={job._id} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-muted-foreground">
            Không tìm thấy công việc phù hợp
          </p>
        </div>
      )}
    </div>
  );
};

export default Browse;
