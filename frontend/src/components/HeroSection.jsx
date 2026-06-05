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
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 text-center">
      <div className="flex flex-col gap-5 my-10">
        <span className="bg-muted mx-auto px-4 py-2 rounded-full font-medium text-destructive text-sm">
          Trang web tìm việc số 1
        </span>
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight">
          Tìm kiếm, Ứng tuyển & <br />
          Nhận <span className="text-primary">Công việc Mơ ước</span>
        </h1>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          Nền tảng kết nối ứng viên tài năng với nhà tuyển dụng hàng đầu, giúp
          bạn tìm kiếm cơ hội việc làm phù hợp nhất với năng lực và mong muốn
          của mình.
        </p>
        <div className="flex items-center gap-4 bg-card shadow-sm mx-auto pl-3 border border-border rounded-full w-[90%] md:w-[40%]">
          <Input
            className="shadow-none border-none outline-none w-full"
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && searchJobHandler()}
            placeholder="Tìm công việc mơ ước"
            type="text"
            value={query}
          />
          <Button
            aria-label="Tìm kiếm"
            className="rounded-r-full shrink-0"
            onClick={searchJobHandler}
          >
            <Search className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
