import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSingleJob } from "@/redux/jobSlice";
import { JOB_API_END_POINT } from "@/utils/constants";

const useGetJobById = (jobId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
        }
      } catch (error) {
        console.error("Lỗi lấy chi tiết công việc:", error);
      }
    };

    if (!jobId) return;

    dispatch(setSingleJob(null));
    fetchJob();
  }, [jobId, dispatch]);
};

export default useGetJobById;
