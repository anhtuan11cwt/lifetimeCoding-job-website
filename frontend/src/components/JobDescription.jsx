import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { setSingleJob } from "@/redux/jobSlice";
import {
  APPLICATION_API_END_POINT,
  JOB_API_END_POINT,
  JOB_TYPE_MAP,
} from "@/utils/constants";

const JobDescription = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);
  const { singleJob } = useSelector((store) => store.job);
  const [isApplied, setIsApplied] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${id}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job.applications?.some(
              (application) => application.applicant === user?._id,
            ) || false,
          );
        }
      } catch (error) {
        console.error("Lỗi lấy chi tiết công việc:", error);
      }
    };
    fetchJob();
  }, [id, dispatch, user?._id]);

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${id}`, {
        withCredentials: true,
      });
      if (res.data.success) {
        setIsApplied(true);
        const updatedSingleJob = {
          ...singleJob,
          applications: [
            ...(singleJob.applications || []),
            { applicant: user?._id },
          ],
        };
        dispatch(setSingleJob(updatedSingleJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Đã có lỗi xảy ra");
    }
  };

  if (!singleJob) {
    return (
      <div className="my-10 py-6 px-6 md:px-12 lg:px-24 xl:px-40 text-center text-gray-500">
        Đang tải...
      </div>
    );
  }

  return (
    <div className="my-10 py-6 px-6 md:px-12 lg:px-24 xl:px-40">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-2xl">{singleJob.title}</h1>
          <div className="flex items-center gap-2 mt-3">
            <Badge className="text-blue-700 font-bold" variant="ghost">
              {singleJob.position} Vị trí
            </Badge>
            <Badge className="text-[#F83002] font-bold" variant="ghost">
              {JOB_TYPE_MAP[singleJob.jobType] || singleJob.jobType}
            </Badge>
            <Badge className="text-[#7209b7] font-bold" variant="ghost">
              {singleJob.salary} triệu
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
          onClick={isApplied ? null : applyJobHandler}
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
            {singleJob.title}
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Địa điểm:{" "}
          <span className="pl-4 font-normal text-gray-800">
            {singleJob.location}
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Mô tả:{" "}
          <span className="pl-4 font-normal text-gray-800">
            {singleJob.description}
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Kinh nghiệm:{" "}
          <span className="pl-4 font-normal text-gray-800">
            {singleJob.experience} năm
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Lương:{" "}
          <span className="pl-4 font-normal text-gray-800">
            {singleJob.salary} triệu
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Số người ứng tuyển:{" "}
          <span className="pl-4 font-normal text-gray-800">
            {singleJob.applications?.length || 0} người
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Ngày đăng:{" "}
          <span className="pl-4 font-normal text-gray-800">
            {new Date(singleJob.createdAt).toLocaleDateString("vi-VN")}
          </span>
        </h1>
      </div>
    </div>
  );
};

export default JobDescription;
