import { Bookmark } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { JOB_TYPE_MAP } from "@/utils/constants";
import { formatDate, getInitials } from "@/utils/format";

const Job = ({ job }) => {
  const navigate = useNavigate();
  const daysAgo = formatDate(job?.createdAt);

  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-sm transition-all duration-150 hover:shadow-md">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{daysAgo}</p>
        <button
          aria-label="Lưu công việc"
          className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-150"
          type="button"
        >
          <Bookmark size={18} />
        </button>
      </div>

      <div className="my-3 flex items-center gap-3">
        <Avatar className="h-10 w-10">
          <AvatarImage
            src={job?.company?.logo || "https://github.com/shadcn.png"}
          />
          <AvatarFallback>{getInitials(job?.company?.name)}</AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <h1 className="text-base font-semibold truncate">
            {job?.company?.name || "Tên công ty"}
          </h1>
          <p className="text-sm text-muted-foreground">
            {job?.location || "Việt Nam"}
          </p>
        </div>
      </div>

      <div>
        <h1 className="my-2 text-lg font-bold">
          {job?.title || "Tiêu đề công việc"}
        </h1>
        <p className="line-clamp-2 text-sm text-muted-foreground">
          {job?.description || "Mô tả ngắn về công việc."}
        </p>
      </div>

      <div className="mt-4 flex items-center gap-2 flex-wrap">
        <Badge className="font-bold text-primary" variant="ghost">
          {job?.position || 0} Vị trí
        </Badge>
        <Badge className="font-bold text-destructive" variant="ghost">
          {JOB_TYPE_MAP[job?.jobType] || job?.jobType || "Toàn thời gian"}
        </Badge>
        <Badge className="font-bold text-primary" variant="ghost">
          {job?.salary ? `${job.salary} triệu` : "Thỏa thuận"}
        </Badge>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <Button
          onClick={() => navigate(`/description/${job?._id}`)}
          size="sm"
          variant="outline"
        >
          Chi tiết
        </Button>
        <Button size="sm">Lưu lại sau</Button>
      </div>
    </div>
  );
};

export default Job;
