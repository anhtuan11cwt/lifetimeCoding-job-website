import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";
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

const AdminJobsTable = ({ jobs }) => {
  const navigate = useNavigate();

  return (
    <Table>
      <TableCaption>Danh sách công việc bạn đã đăng</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Công ty</TableHead>
          <TableHead>Vị trí</TableHead>
          <TableHead>Ngày đăng</TableHead>
          <TableHead className="text-right">Thao tác</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {jobs.length <= 0 ? (
          <TableRow>
            <TableCell className="text-center" colSpan={4}>
              Chưa có công việc nào
            </TableCell>
          </TableRow>
        ) : (
          jobs.map((job) => (
            <TableRow key={job._id}>
              <TableCell>{job.company?.name || "N/A"}</TableCell>
              <TableCell>{job.title}</TableCell>
              <TableCell>
                {new Date(job.createdAt).toLocaleDateString("vi-VN")}
              </TableCell>
              <TableCell className="text-right">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button className="h-8 w-8 p-0" variant="ghost">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-48">
                    <button
                      className="flex w-full items-center gap-2 rounded-sm px-2 py-1 text-left text-sm hover:bg-muted"
                      onClick={() => navigate(`/admin/jobs/${job._id}`)}
                      type="button"
                    >
                      <Edit2 className="h-4 w-4" />
                      <span>Chỉnh sửa</span>
                    </button>
                    <button
                      className="mt-1 flex w-full items-center gap-2 rounded-sm px-2 py-1 text-left text-sm hover:bg-muted"
                      onClick={() =>
                        navigate(`/admin/jobs/${job._id}/applicants`)
                      }
                      type="button"
                    >
                      <Eye className="h-4 w-4" />
                      <span>Ứng viên</span>
                    </button>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default AdminJobsTable;
