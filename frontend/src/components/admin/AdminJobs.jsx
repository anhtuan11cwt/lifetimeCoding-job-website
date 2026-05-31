import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AdminJobsTable from "@/components/admin/AdminJobsTable";
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
    <div>
      <div className="max-w-6xl mx-auto my-10">
        <div className="flex items-center justify-between my-5">
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
    </div>
  );
};

export default AdminJobs;
