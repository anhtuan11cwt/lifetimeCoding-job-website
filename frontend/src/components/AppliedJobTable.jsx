import { useSelector } from "react-redux";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate } from "@/utils/format";

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

const AppliedJobTable = () => {
  const { allAppliedJobs } = useSelector((store) => store.job);

  return (
    <div>
      <h1 className="font-bold text-lg my-5">Công việc đã ứng tuyển</h1>
      <Table>
        <TableCaption>Danh sách các công việc bạn đã ứng tuyển</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Ngày</TableHead>
            <TableHead>Vị trí</TableHead>
            <TableHead>Công ty</TableHead>
            <TableHead className="text-center">Trạng thái</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allAppliedJobs && allAppliedJobs.length > 0 ? (
            allAppliedJobs.map((item) => (
              <TableRow key={item._id}>
                <TableCell>{formatDate(item.createdAt)}</TableCell>
                <TableCell className="font-medium">
                  {item.job?.title || "N/A"}
                </TableCell>
                <TableCell>{item.job?.company?.name || "N/A"}</TableCell>
                <TableCell className="text-center">
                  <Badge variant={statusVariant[item.status] || "outline"}>
                    {statusLabel[item.status] || item.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                className="text-center text-muted-foreground py-8"
                colSpan={4}
              >
                Chưa ứng tuyển công việc nào
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobTable;
