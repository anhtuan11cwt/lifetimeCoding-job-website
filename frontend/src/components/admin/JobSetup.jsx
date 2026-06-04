import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
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
import useGetJobById from "@/hooks/useGetJobById";
import { setSingleJob } from "@/redux/jobSlice";
import { JOB_API_END_POINT } from "@/utils/constants";

const getJobFormValues = (job) => ({
  description: job?.description || "",
  experience: job?.experience || "",
  jobType: job?.jobType || "",
  location: job?.location || "",
  position: job?.position || "",
  requirements: job?.requirements?.join(", ") || "",
  salary: job?.salary || "",
  title: job?.title || "",
});

const JobSetupForm = ({ dispatch, job, navigate, params }) => {
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState(() => getJobFormValues(job));

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput((currentInput) => ({
      ...currentInput,
      [name]: value,
    }));
  };

  const selectChangeHandler = (value) => {
    setInput((currentInput) => ({
      ...currentInput,
      jobType: value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.put(
        `${JOB_API_END_POINT}/update/${params.id}`,
        input,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        },
      );
      if (res.data.success) {
        dispatch(setSingleJob(res.data.job));
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
          { label: "Chỉnh sửa" },
        ]}
      />

      <h1 className="mb-6 text-2xl font-bold">Chỉnh sửa công việc</h1>

      <form
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
        onSubmit={submitHandler}
      >
        <div className="space-y-2">
          <Label>Tiêu đề</Label>
          <Input
            name="title"
            onChange={changeEventHandler}
            value={input.title}
          />
        </div>
        <div className="space-y-2">
          <Label>Mô tả</Label>
          <Input
            name="description"
            onChange={changeEventHandler}
            value={input.description}
          />
        </div>
        <div className="space-y-2">
          <Label>Yêu cầu</Label>
          <Input
            name="requirements"
            onChange={changeEventHandler}
            value={input.requirements}
          />
        </div>
        <div className="space-y-2">
          <Label>Lương (triệu)</Label>
          <Input
            name="salary"
            onChange={changeEventHandler}
            type="number"
            value={input.salary}
          />
        </div>
        <div className="space-y-2">
          <Label>Địa điểm</Label>
          <Input
            name="location"
            onChange={changeEventHandler}
            value={input.location}
          />
        </div>
        <div className="space-y-2">
          <Label>Loại hình</Label>
          <Select onValueChange={selectChangeHandler} value={input.jobType}>
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
            type="number"
            value={input.experience}
          />
        </div>
        <div className="space-y-2">
          <Label>Số lượng vị trí</Label>
          <Input
            name="position"
            onChange={changeEventHandler}
            type="number"
            value={input.position}
          />
        </div>

        <div className="md:col-span-2">
          {loading ? (
            <Button className="w-full" disabled>
              Đang cập nhật...
            </Button>
          ) : (
            <Button className="w-full" type="submit">
              Cập nhật
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

const JobSetup = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useGetJobById(params.id);

  const { singleJob } = useSelector((store) => store.job);

  return (
    <div>
      {singleJob ? (
        <JobSetupForm
          dispatch={dispatch}
          job={singleJob}
          key={singleJob._id || params.id}
          navigate={navigate}
          params={params}
        />
      ) : (
        <div className="mt-5 py-16 px-6 md:px-12 lg:px-24 xl:px-40 text-sm text-muted-foreground flex justify-center">
          Đang tải thông tin công việc...
        </div>
      )}
    </div>
  );
};

export default JobSetup;
