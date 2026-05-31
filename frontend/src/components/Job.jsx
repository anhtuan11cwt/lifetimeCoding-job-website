import { Bookmark } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { JOB_TYPE_MAP } from "@/utils/constants";
import { formatDate } from "@/utils/format";

const Job = ({ job }) => {
  const navigate = useNavigate();
  const daysAgo = formatDate(job?.createdAt);

  return (
    <div className="rounded-md border border-gray-100 bg-white p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">{daysAgo}</p>
        <button type="button">
          <Bookmark className="text-gray-500" size={18} />
        </button>
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
          {JOB_TYPE_MAP[job?.jobType] || job?.jobType || "Toàn thời gian"}
        </Badge>
        <Badge className="font-bold text-[#7209b7]" variant="ghost">
          {job?.salary ? `${job.salary} triệu` : "Thỏa thuận"}
        </Badge>
      </div>

      <div className="mt-4 flex items-center gap-4">
        <Button
          onClick={() => navigate(`/description/${job?._id}`)}
          size="sm"
          variant="outline"
        >
          Chi tiết
        </Button>
        <Button className="bg-[#7209b7] hover:bg-[#5f32ad]" size="sm">
          Lưu lại sau
        </Button>
      </div>
    </div>
  );
};

export default Job;
