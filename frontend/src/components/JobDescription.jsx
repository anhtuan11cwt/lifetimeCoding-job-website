import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const JobDescription = () => {
  const [isApplied, setIsApplied] = useState(false);

  return (
    <div className="max-w-5xl mx-auto my-10 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-2xl">Front-end Developer</h1>
          <div className="flex items-center gap-2 mt-3">
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
        </div>
        <Button
          className={`rounded-lg ${
            isApplied
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-[#7209b7] hover:bg-[#5f32ad]"
          }`}
          disabled={isApplied}
          onClick={() => setIsApplied(true)}
        >
          {isApplied ? "Đã ứng tuyển" : "Ứng tuyển ngay"}
        </Button>
      </div>

      {/* Job Description */}
      <h1 className="border-b-2 border-b-gray-300 font-medium text-lg py-4 mt-6">
        Mô tả công việc
      </h1>

      <div className="my-4 space-y-3">
        <h1 className="font-bold my-1">
          Vai trò:{" "}
          <span className="pl-4 font-normal text-gray-800">
            Front-end Developer
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Địa điểm:{" "}
          <span className="pl-4 font-normal text-gray-800">Hà Nội</span>
        </h1>
        <h1 className="font-bold my-1">
          Mô tả:{" "}
          <span className="pl-4 font-normal text-gray-800">
            Phát triển và duy trì giao diện người dùng cho các ứng dụng web. Làm
            việc chặt chẽ với đội ngũ thiết kế và back-end để đảm bảo trải
            nghiệm người dùng tốt nhất.
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Kinh nghiệm:{" "}
          <span className="pl-4 font-normal text-gray-800">2 năm</span>
        </h1>
        <h1 className="font-bold my-1">
          Lương:{" "}
          <span className="pl-4 font-normal text-gray-800">15-20 triệu</span>
        </h1>
        <h1 className="font-bold my-1">
          Số người ứng tuyển:{" "}
          <span className="pl-4 font-normal text-gray-800">4 người</span>
        </h1>
        <h1 className="font-bold my-1">
          Ngày đăng:{" "}
          <span className="pl-4 font-normal text-gray-800">29-12-2024</span>
        </h1>
      </div>
    </div>
  );
};

export default JobDescription;
