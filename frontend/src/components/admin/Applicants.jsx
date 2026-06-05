import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ApplicantsTable from "@/components/admin/ApplicantsTable";
import Breadcrumb from "@/components/shared/Breadcrumb";
import { setAllApplicants } from "@/redux/applicationSlice";
import { APPLICATION_API_END_POINT } from "@/utils/constants";

const Applicants = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { applicants } = useSelector((store) => store.application);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const res = await axios.get(
          `${APPLICATION_API_END_POINT}/${params.id}/applicants`,
          { withCredentials: true },
        );
        if (res.data.success) {
          dispatch(setAllApplicants(res.data.job));
        }
      } catch (error) {
        console.error("Lỗi lấy danh sách ứng viên:", error);
      }
    };
    fetchApplicants();
  }, [params.id, dispatch]);

  return (
    <div className="mt-5 px-6 md:px-16 lg:px-24 xl:px-32">
      <Breadcrumb
        items={[
          { label: "Trang chủ", to: "/" },
          { label: "Việc làm", to: "/admin/jobs" },
          { label: "Ứng viên" },
        ]}
      />
      <h1 className="my-5 font-bold text-xl">
        Ứng viên ({applicants?.applications?.length || 0})
      </h1>
      <ApplicantsTable />
    </div>
  );
};

export default Applicants;
