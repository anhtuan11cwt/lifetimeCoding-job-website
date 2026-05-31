import LatestJobCards from "@/components/LatestJobCards";

const randomJobs = [1, 2, 3, 4, 5, 6];

const Browse = () => {
  return (
    <div className="max-w-6xl mx-auto my-10 px-4">
      <h1 className="font-bold text-xl my-10">
        Kết quả tìm kiếm ({randomJobs.length})
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {randomJobs.map((item) => (
          <LatestJobCards key={item} />
        ))}
      </div>
    </div>
  );
};

export default Browse;
