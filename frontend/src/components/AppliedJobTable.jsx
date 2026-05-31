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

const appliedJobs = [
  {
    company: "Microsoft",
    date: "27-12-2024",
    role: "Front-end Developer",
    status: "Selected",
  },
  {
    company: "Google",
    date: "25-12-2024",
    role: "Back-end Developer",
    status: "Pending",
  },
  {
    company: "Amazon",
    date: "20-12-2024",
    role: "Full Stack Developer",
    status: "Rejected",
  },
  {
    company: "Meta",
    date: "18-12-2024",
    role: "UI/UX Designer",
    status: "Selected",
  },
];

const statusVariant = {
  Pending: "outline",
  Rejected: "destructive",
  Selected: "default",
};

const translateStatus = (status) => {
  const map = {
    Pending: "Đang chờ",
    Rejected: "Từ chối",
    Selected: "Đã chọn",
  };
  return map[status] || status;
};

const AppliedJobTable = () => {
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
          {appliedJobs.map((job) => (
            <TableRow key={`${job.company}-${job.date}-${job.role}`}>
              <TableCell>{job.date}</TableCell>
              <TableCell>{job.role}</TableCell>
              <TableCell>{job.company}</TableCell>
              <TableCell className="text-center">
                <Badge variant={statusVariant[job.status] || "default"}>
                  {translateStatus(job.status)}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobTable;
