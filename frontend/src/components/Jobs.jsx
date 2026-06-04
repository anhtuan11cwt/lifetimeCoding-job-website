import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import FilterCard from "@/components/FilterCard";
import Job from "@/components/Job";
import useGetAllJobs from "@/hooks/useGetAllJobs";

const Jobs = () => {
  useGetAllJobs();
  const { allJobs } = useSelector((store) => store.job);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const [filters, setFilters] = useState({});

  const filteredJobs = useMemo(() => {
    let result = Array.isArray(allJobs) ? allJobs : [];

    // Filter by search query
    if (query) {
      const lowerQuery = query.toLowerCase();
      result = result.filter(
        (job) =>
          job.title?.toLowerCase().includes(lowerQuery) ||
          job.description?.toLowerCase().includes(lowerQuery) ||
          job.location?.toLowerCase().includes(lowerQuery),
      );
    }

    // Filter by location
    if (filters["Địa điểm"]) {
      result = result.filter((job) => job.location === filters["Địa điểm"]);
    }

    // Filter by job type/category
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
    <div className="mt-5 px-6 md:px-12 lg:px-24 xl:px-40">
      <div className="flex flex-col md:flex-row gap-5">
        <div className="w-full md:w-[20%]">
          <FilterCard onFilterChange={setFilters} />
        </div>
        <div className="flex-1 md:h-[88vh] overflow-y-auto pb-5">
          {filteredJobs.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {filteredJobs.map((job) => (
                <Job job={job} key={job._id} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 mt-10">
              Không tìm thấy công việc phù hợp
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
