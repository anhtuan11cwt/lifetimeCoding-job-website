import axios from "axios";
import { Building, Calendar, Clock, MapPin, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import Breadcrumb from "@/components/shared/Breadcrumb";
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
      <div className="mt-5 px-6 md:px-12 lg:px-24 xl:px-40 pb-10 text-muted-foreground text-center">
        Đang tải...
      </div>
    );
  }

  const details = [
    { icon: MapPin, label: "Địa điểm", value: singleJob.location },
    { icon: Building, label: "Vai trò", value: singleJob.title },
    { icon: Clock, label: "Kinh nghiệm", value: `${singleJob.experience} năm` },
    {
      icon: Calendar,
      label: "Ngày đăng",
      value: new Date(singleJob.createdAt).toLocaleDateString("vi-VN"),
    },
    {
      icon: Users,
      label: "Số người ứng tuyển",
      value: `${singleJob.applications?.length || 0} người`,
    },
  ];

  return (
    <div className="mt-5 px-6 md:px-12 lg:px-24 xl:px-40 pb-10">
      <Breadcrumb
        items={[
          { label: "Trang chủ", to: "/" },
          { label: "Việc làm", to: "/jobs" },
          { label: singleJob.title },
        ]}
      />
      <div>
        <div className="flex sm:flex-row flex-col justify-between sm:items-center gap-4">
          <div className="space-y-3">
            <h1 className="font-bold text-2xl tracking-tight">
              {singleJob.title}
            </h1>
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="font-bold text-primary" variant="ghost">
                {singleJob.position} Vị trí
              </Badge>
              <Badge className="font-bold text-destructive" variant="ghost">
                {JOB_TYPE_MAP[singleJob.jobType] || singleJob.jobType}
              </Badge>
              <Badge className="font-bold text-primary" variant="ghost">
                {singleJob.salary} triệu
              </Badge>
            </div>
          </div>
          <Button
            disabled={isApplied}
            onClick={applyJobHandler}
            variant={isApplied ? "secondary" : "default"}
          >
            {isApplied ? "Đã ứng tuyển" : "Ứng tuyển ngay"}
          </Button>
        </div>

        <div className="mt-8">
          <h2 className="pb-3 border-border border-b font-semibold text-lg">
            Mô tả công việc
          </h2>

          <div className="space-y-4 mt-6">
            <p className="text-muted-foreground leading-relaxed">
              {singleJob.description}
            </p>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="pb-3 border-border border-b font-semibold text-lg">
            Thông tin chi tiết
          </h2>

          <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 mt-6">
            {details.map((detail) => (
              <div
                className="flex items-center gap-3 bg-muted/50 p-4 rounded-lg"
                key={detail.label}
              >
                <detail.icon className="w-5 h-5 text-muted-foreground shrink-0" />
                <div className="min-w-0">
                  <p className="text-muted-foreground text-xs">
                    {detail.label}
                  </p>
                  <p className="font-medium text-sm truncate">{detail.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDescription;
