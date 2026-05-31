import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const currentTime = Date.now();

const LatestJobCards = ({ job }) => {
  const postedLabel = (() => {
    const days = Math.floor(
      (currentTime - new Date(job.createdAt).getTime()) / (1000 * 60 * 60 * 24),
    );

    if (days === 0) return "Hôm nay";
    if (days === 1) return "Hôm qua";
    return `${days} ngày trước`;
  })();

  return (
    <Link
      className="block rounded-md border border-gray-100 bg-white p-5 shadow-xl transition hover:border-gray-200 hover:shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      to={`/description/${job._id}`}
    >
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">{postedLabel}</p>
      </div>

      <div className="my-2 flex items-center gap-2">
        <Avatar className="h-10 w-10">
          <AvatarImage
            src={job?.company?.logo || "https://github.com/shadcn.png"}
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-lg font-medium">
            {job?.company?.name || "Tên công ty"}
          </h1>
          <p className="text-sm text-gray-500">{job?.location || "Việt Nam"}</p>
        </div>
      </div>

      <div>
        <h1 className="my-2 text-lg font-bold">
          {job?.title || "Tiêu đề công việc"}
        </h1>
        <p className="line-clamp-2 text-sm text-gray-600">
          {job?.description || "Mô tả ngắn về công việc."}
        </p>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <Badge className="font-bold text-blue-700" variant="ghost">
          {job?.position || 0} Vị trí
        </Badge>
        <Badge className="font-bold text-[#F83002]" variant="ghost">
          {job?.jobType || "Toàn thời gian"}
        </Badge>
        <Badge className="font-bold text-[#7209b7]" variant="ghost">
          {job?.salary ? `${job.salary} triệu` : "Thỏa thuận"}
        </Badge>
      </div>
    </Link>
  );
};

export default LatestJobCards;
