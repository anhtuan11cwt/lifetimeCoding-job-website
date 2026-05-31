import axios from "axios";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { updateApplicationStatus } from "@/redux/applicationSlice";
import { APPLICATION_API_END_POINT } from "@/utils/constants";
import { formatDate } from "@/utils/format";

const shortlistingStatus = ["Accepted", "Rejected"];
const statusVariant = {
  Accepted: "default",
  Pending: "outline",
  Rejected: "destructive",
};
const statusLabel = {
  Accepted: "Đã duyệt",
  Pending: "Đang chờ",
  Rejected: "Từ chối",
};

const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.application);
  const dispatch = useDispatch();
  const [openStates, setOpenStates] = useState({});

  const statusHandler = async (status, id) => {
    try {
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/status/${id}/update`,
        { status },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        },
      );
      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(updateApplicationStatus({ id, status }));
        setOpenStates((prev) => ({ ...prev, [id]: false }));
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Đã có lỗi xảy ra");
    }
  };

  return (
    <Table>
      <TableCaption>Danh sách ứng viên gần đây</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Họ tên</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Số điện thoại</TableHead>
          <TableHead>CV</TableHead>
          <TableHead>Ngày ứng tuyển</TableHead>
          <TableHead className="text-center">Trạng thái</TableHead>
          <TableHead className="text-right">Thao tác</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {applicants?.applications?.length > 0 ? (
          applicants.applications.map((item) => (
            <TableRow key={item._id}>
              <TableCell>{item.applicant?.fullName || "N/A"}</TableCell>
              <TableCell>{item.applicant?.email || "N/A"}</TableCell>
              <TableCell>{item.applicant?.phoneNumber || "N/A"}</TableCell>
              <TableCell>
                {item.applicant?.profile?.resume ? (
                  <a
                    className="text-blue-600 cursor-pointer"
                    href={item.applicant.profile.resume}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {item.applicant.profile.resumeOriginalName || "Xem CV"}
                  </a>
                ) : (
                  "N/A"
                )}
              </TableCell>
              <TableCell>{formatDate(item.createdAt)}</TableCell>
              <TableCell className="text-center">
                <Badge variant={statusVariant[item.status] || "outline"}>
                  {statusLabel[item.status] || item.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                {item.status === "Pending" && (
                  <Popover
                    onOpenChange={(isOpen) =>
                      setOpenStates((prev) => ({ ...prev, [item._id]: isOpen }))
                    }
                    open={openStates[item._id] || false}
                  >
                    <PopoverTrigger asChild>
                      <Button className="h-8 w-8 p-0" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-40">
                      {shortlistingStatus.map((status) => (
                        <button
                          className="flex w-full items-center rounded-sm px-2 py-1 text-left text-sm hover:bg-muted cursor-pointer"
                          key={status}
                          onClick={() => statusHandler(status, item._id)}
                          type="button"
                        >
                          <span
                            className={
                              status === "Accepted"
                                ? "text-green-600"
                                : "text-red-600"
                            }
                          >
                            {statusLabel[status] || status}
                          </span>
                        </button>
                      ))}
                    </PopoverContent>
                  </Popover>
                )}
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell className="text-center" colSpan={7}>
              Chưa có ứng viên nào
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default ApplicantsTable;
