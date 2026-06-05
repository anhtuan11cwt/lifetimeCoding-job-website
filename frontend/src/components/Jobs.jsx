import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import FilterCard from "@/components/FilterCard";
import Job from "@/components/Job";
import Breadcrumb from "@/components/shared/Breadcrumb";
import useGetAllJobs from "@/hooks/useGetAllJobs";

const Jobs = () => {
  useGetAllJobs();
  const { allJobs } = useSelector((store) => store.job);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const [filters, setFilters] = useState({});

  const filteredJobs = useMemo(() => {
    let result = Array.isArray(allJobs) ? allJobs : [];

    if (query) {
      const lowerQuery = query.toLowerCase();
      result = result.filter(
        (job) =>
          job.title?.toLowerCase().includes(lowerQuery) ||
          job.description?.toLowerCase().includes(lowerQuery) ||
          job.location?.toLowerCase().includes(lowerQuery),
      );
    }

    if (filters["Địa điểm"]) {
      result = result.filter((job) => job.location === filters["Địa điểm"]);
    }

    if (filters["Ngành nghề"]) {
      const keyword = filters["Ngành nghề"].toLowerCase();
      result = result.filter(
        (job) =>
          job.title?.toLowerCase().includes(keyword) ||
          job.description?.toLowerCase().includes(keyword),
      );
    }

    return result;
  }, [allJobs, query, filters]);

  return (
    <div className="mt-5 px-6 md:px-16 lg:px-24 xl:px-32">
      <Breadcrumb
        items={[{ label: "Trang chủ", to: "/" }, { label: "Việc làm" }]}
      />
      <div className="flex md:flex-row flex-col gap-5">
        <div className="w-full md:w-[260px] shrink-0">
          <FilterCard onFilterChange={setFilters} />
        </div>
        <div className="flex-1 pb-5">
          {filteredJobs.length > 0 ? (
            <div className="gap-5 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
              {filteredJobs.map((job) => (
                <Job job={job} key={job._id} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <p className="text-muted-foreground">
                Không tìm thấy công việc phù hợp
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
