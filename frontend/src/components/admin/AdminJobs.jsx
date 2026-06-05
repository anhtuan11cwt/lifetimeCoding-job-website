import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AdminJobsTable from "@/components/admin/AdminJobsTable";
import Breadcrumb from "@/components/shared/Breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs";

const AdminJobs = () => {
  useGetAllAdminJobs();
  const navigate = useNavigate();
  const { allAdminJobs } = useSelector((store) => store.job);
  const [input, setInput] = useState("");

  const filteredJobs = (allAdminJobs || []).filter(
    (job) =>
      job.title?.toLowerCase().includes(input.toLowerCase()) ||
      job.company?.name?.toLowerCase().includes(input.toLowerCase()),
  );

  return (
    <div className="mt-5 px-6 md:px-16 lg:px-24 xl:px-32">
      <Breadcrumb
        items={[{ label: "Trang chủ", to: "/" }, { label: "Việc làm" }]}
      />
      <div className="flex justify-between items-center my-5">
        <Input
          className="w-fit"
          onChange={(e) => setInput(e.target.value)}
          placeholder="Tìm theo tên công việc hoặc công ty"
          value={input}
        />
        <Button onClick={() => navigate("/admin/jobs/create")}>
          Đăng tuyển mới
        </Button>
      </div>
      <AdminJobsTable jobs={filteredJobs} />
    </div>
  );
};

export default AdminJobs;
