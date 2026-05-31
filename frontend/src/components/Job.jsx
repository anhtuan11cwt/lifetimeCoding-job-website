import { Bookmark } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const Job = () => {
  return (
    <div className="p-5 rounded-md bg-white border border-gray-100">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">2 ngày trước</p>
        <button type="button">
          <Bookmark className="text-gray-500" size={18} />
        </button>
      </div>

      <div className="flex items-center gap-2 my-2">
        <Avatar className="h-10 w-10">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="font-medium text-lg">Tên công ty</h1>
          <p className="text-sm text-gray-500">Việt Nam</p>
        </div>
      </div>

      <div>
        <h1 className="font-bold text-lg my-2">Tiêu đề công việc</h1>
        <p className="text-sm text-gray-600">
          Mô tả ngắn về công việc với những chi tiết chính về vai trò và trách
          nhiệm.
        </p>
      </div>

      <div className="flex items-center gap-2 mt-4">
        <Badge className="text-blue-700 font-bold" variant="ghost">
          12 Vị trí
        </Badge>
        <Badge className="text-[#F83002] font-bold" variant="ghost">
          Bán thời gian
        </Badge>
        <Badge className="text-[#7209b7] font-bold" variant="ghost">
          15-20 triệu
        </Badge>
      </div>

      <div className="flex items-center gap-4 mt-4">
        <Button size="sm" variant="outline">
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
