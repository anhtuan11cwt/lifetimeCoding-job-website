import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Breadcrumb from "@/components/shared/Breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useGetAllCompanies from "@/hooks/useGetAllCompanies";
import { JOB_API_END_POINT } from "@/utils/constants";

const PostJob = () => {
  useGetAllCompanies();
  const navigate = useNavigate();
  const { companies } = useSelector((store) => store.company);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    description: "",
    experience: "",
    jobType: "",
    location: "",
    position: "",
    requirements: "",
    salary: "",
    title: "",
  });
  const [companyId, setCompanyId] = useState("");

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const selectChangeHandler = (value) => {
    setCompanyId(value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!companyId) {
      toast.error("Vui lòng chọn công ty");
      return;
    }
    try {
      setLoading(true);
      const res = await axios.post(
        `${JOB_API_END_POINT}/post`,
        { ...input, company: companyId },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        },
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Đã có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-5 px-6 md:px-12 lg:px-24 xl:px-40">
      <Breadcrumb
        items={[
          { label: "Trang chủ", to: "/" },
          { label: "Việc làm", to: "/admin/jobs" },
          { label: "Đăng tuyển" },
        ]}
      />
      <h1 className="font-bold text-2xl mb-6">Đăng tuyển công việc mới</h1>

      {companies.length === 0 && (
        <p className="text-destructive mb-4">
          Bạn cần tạo công ty trước khi đăng tuyển việc làm.
        </p>
      )}

      <form
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
        onSubmit={submitHandler}
      >
        <div className="space-y-2">
          <Label>Tiêu đề</Label>
          <Input
            name="title"
            onChange={changeEventHandler}
            placeholder="Frontend Developer"
            value={input.title}
          />
        </div>
        <div className="space-y-2">
          <Label>Mô tả</Label>
          <Input
            name="description"
            onChange={changeEventHandler}
            placeholder="Mô tả công việc"
            value={input.description}
          />
        </div>
        <div className="space-y-2">
          <Label>Yêu cầu</Label>
          <Input
            name="requirements"
            onChange={changeEventHandler}
            placeholder="ReactJS, NodeJS"
            value={input.requirements}
          />
        </div>
        <div className="space-y-2">
          <Label>Lương (triệu)</Label>
          <Input
            name="salary"
            onChange={changeEventHandler}
            placeholder="15"
            type="number"
            value={input.salary}
          />
        </div>
        <div className="space-y-2">
          <Label>Địa điểm</Label>
          <Input
            name="location"
            onChange={changeEventHandler}
            placeholder="Hà Nội"
            value={input.location}
          />
        </div>
        <div className="space-y-2">
          <Label>Loại hình</Label>
          <Select
            onValueChange={(val) => setInput({ ...input, jobType: val })}
            value={input.jobType}
          >
            <SelectTrigger>
              <SelectValue placeholder="Chọn loại hình" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Full-time">Toàn thời gian</SelectItem>
              <SelectItem value="Part-time">Bán thời gian</SelectItem>
              <SelectItem value="Internship">Thực tập</SelectItem>
              <SelectItem value="Contract">Hợp đồng</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Kinh nghiệm (năm)</Label>
          <Input
            name="experience"
            onChange={changeEventHandler}
            placeholder="2"
            type="number"
            value={input.experience}
          />
        </div>
        <div className="space-y-2">
          <Label>Số lượng vị trí</Label>
          <Input
            name="position"
            onChange={changeEventHandler}
            placeholder="5"
            type="number"
            value={input.position}
          />
        </div>
        <div className="md:col-span-2 space-y-2">
          <Label>Công ty</Label>
          {companies.length > 0 ? (
            <Select onValueChange={selectChangeHandler} value={companyId}>
              <SelectTrigger>
                <SelectValue placeholder="Chọn công ty" />
              </SelectTrigger>
              <SelectContent>
                {companies.map((company) => (
                  <SelectItem key={company._id} value={company._id}>
                    {company.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <p className="text-sm text-destructive">
              Vui lòng tạo công ty trước
            </p>
          )}
        </div>

        <div className="md:col-span-2">
          {loading ? (
            <Button className="w-full" disabled>
              Đang đăng tuyển...
            </Button>
          ) : (
            <Button className="w-full" type="submit">
              Đăng tuyển
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default PostJob;
