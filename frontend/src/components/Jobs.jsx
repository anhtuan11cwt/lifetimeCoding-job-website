import FilterCard from "@/components/FilterCard";
import Job from "@/components/Job";

const Jobs = () => {
  return (
    <div className="max-w-7xl mx-auto mt-5 px-4">
      <div className="flex flex-col md:flex-row gap-5">
        <div className="w-full md:w-[20%]">
          <FilterCard />
        </div>
        <div className="flex-1 md:h-[88vh] overflow-y-auto pb-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <Job key={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
