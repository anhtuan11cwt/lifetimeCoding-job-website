import axios from "axios";
import { Edit2, MoreHorizontal, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { setCompanies } from "@/redux/companySlice";
import { COMPANY_API_END_POINT } from "@/utils/constants";

const CompaniesTable = ({ companies }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { companies: allCompanies } = useSelector((store) => store.company);

  const deleteHandler = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xoá công ty này?")) return;
    try {
      const res = await axios.delete(`${COMPANY_API_END_POINT}/delete/${id}`, {
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(setCompanies(allCompanies.filter((c) => c._id !== id)));
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Đã có lỗi xảy ra");
    }
  };

  return (
    <Table>
      <TableCaption>Danh sách công ty của bạn</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Logo</TableHead>
          <TableHead>Tên</TableHead>
          <TableHead>Ngày tạo</TableHead>
          <TableHead className="text-right">Thao tác</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {companies.length <= 0 ? (
          <TableRow>
            <TableCell className="text-center" colSpan={4}>
              Bạn chưa đăng ký công ty nào
            </TableCell>
          </TableRow>
        ) : (
          companies.map((company) => (
            <TableRow key={company._id}>
              <TableCell>
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={company.logo || "https://github.com/shadcn.png"}
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell>{company.name}</TableCell>
              <TableCell>
                {new Date(company.createdAt).toLocaleDateString("vi-VN")}
              </TableCell>
              <TableCell className="text-right">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button className="h-8 w-8 p-0" variant="ghost">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-40">
                    <button
                      className="flex w-full items-center gap-2 rounded-sm px-2 py-1 text-left text-sm hover:bg-muted"
                      onClick={() =>
                        navigate(`/admin/companies/${company._id}`)
                      }
                      type="button"
                    >
                      <Edit2 className="h-4 w-4" />
                      <span>Chỉnh sửa</span>
                    </button>
                    <button
                      className="flex w-full items-center gap-2 rounded-sm px-2 py-1 text-left text-sm text-red-600 hover:bg-muted"
                      onClick={() => deleteHandler(company._id)}
                      type="button"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span>Xoá</span>
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

export default CompaniesTable;
