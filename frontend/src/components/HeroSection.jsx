import { Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const searchJobHandler = () => {
    if (query.trim()) {
      navigate(`/jobs?query=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div className="text-center px-4">
      <div className="flex flex-col gap-5 my-10">
        <span className="mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium text-sm">
          Trang web tìm việc số 1
        </span>
        <h1 className="text-3xl md:text-5xl font-bold">
          Tìm kiếm, Ứng tuyển & <br />
          Nhận <span className="text-[#6A38C2]">Công việc Mơ ước</span>
        </h1>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Nền tảng kết nối ứng viên tài năng với nhà tuyển dụng hàng đầu, giúp
          bạn tìm kiếm cơ hội việc làm phù hợp nhất với năng lực và mong muốn
          của mình.
        </p>
        <div className="flex w-[90%] md:w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto">
          <Input
            className="outline-none border-none w-full"
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && searchJobHandler()}
            placeholder="Tìm công việc mơ ước"
            type="text"
            value={query}
          />
          <Button
            className="rounded-r-full bg-[#6A38C2] hover:bg-[#5b30a6]"
            onClick={searchJobHandler}
          >
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
