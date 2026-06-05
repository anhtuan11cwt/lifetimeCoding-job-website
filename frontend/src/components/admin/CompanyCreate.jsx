import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Breadcrumb from "@/components/shared/Breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { COMPANY_API_END_POINT } from "@/utils/constants";

const CompanyCreate = () => {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState("");

  const registerNewCompany = async () => {
    if (!companyName.trim()) {
      toast.error("Vui lòng nhập tên công ty");
      return;
    }
    try {
      const res = await axios.post(
        `${COMPANY_API_END_POINT}/register`,
        { companyName },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        },
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate(`/admin/companies/${res.data.company._id}`);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Đã có lỗi xảy ra");
    }
  };

  return (
    <div className="mt-5 px-6 md:px-16 lg:px-24 xl:px-32">
      <Breadcrumb
        items={[
          { label: "Trang chủ", to: "/" },
          { label: "Công ty", to: "/admin/companies" },
          { label: "Tạo mới" },
        ]}
      />
      <div className="my-10">
        <h1 className="font-bold text-2xl">Tên công ty của bạn</h1>
        <p className="mt-2 text-muted-foreground">
          Bạn muốn đặt tên công ty là gì? Bạn có thể thay đổi sau.
        </p>
      </div>

      <div className="space-y-4">
        <Label>Tên công ty</Label>
        <Input
          onChange={(e) => setCompanyName(e.target.value)}
          placeholder="Microsoft, ATS..."
          value={companyName}
        />
      </div>

      <div className="flex items-center gap-2 mt-10">
        <Button onClick={() => navigate("/admin/companies")} variant="outline">
          Hủy
        </Button>
        <Button onClick={registerNewCompany}>Tiếp tục</Button>
      </div>
    </div>
  );
};

export default CompanyCreate;
