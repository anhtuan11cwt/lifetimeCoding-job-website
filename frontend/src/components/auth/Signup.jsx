import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { USER_API_END_POINT } from "@/utils/constants";

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [input, setInput] = useState({
    email: "",
    file: null,
    fullName: "",
    password: "",
    phoneNumber: "",
    role: "student",
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullName", input.fullName);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      const response = await axios.post(
        `${USER_API_END_POINT}/register`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        },
      );
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Đã có lỗi xảy ra");
    }
  };

  return (
    <div className="flex items-center justify-center max-w-7xl mx-auto">
      <form
        className="w-4/5 md:w-1/2 border border-gray-200 rounded-lg p-6 my-10 space-y-6"
        onSubmit={handleSubmit}
      >
        <h1 className="font-bold text-xl">Đăng ký</h1>
        <div className="space-y-3">
          <Label>Họ và tên</Label>
          <Input
            name="fullName"
            onChange={changeEventHandler}
            placeholder="Nhập họ và tên của bạn"
            type="text"
            value={input.fullName}
          />
        </div>
        <div className="space-y-3">
          <Label>Email</Label>
          <Input
            name="email"
            onChange={changeEventHandler}
            placeholder="Nhập email của bạn"
            type="email"
            value={input.email}
          />
        </div>
        <div className="space-y-3">
          <Label>Số điện thoại</Label>
          <Input
            name="phoneNumber"
            onChange={changeEventHandler}
            placeholder="Nhập số điện thoại của bạn"
            type="text"
            value={input.phoneNumber}
          />
        </div>
        <div className="space-y-3">
          <Label>Mật khẩu</Label>
          <div className="relative">
            <Input
              className="pr-10"
              name="password"
              onChange={changeEventHandler}
              placeholder="Nhập mật khẩu của bạn"
              type={showPassword ? "text" : "password"}
              value={input.password}
            />
            <button
              aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
              className="absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground transition-colors hover:text-foreground"
              onClick={() => setShowPassword((value) => !value)}
              type="button"
            >
              {showPassword ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </button>
          </div>
        </div>
        <div className="pt-2">
          <RadioGroup
            className="flex items-center gap-4"
            onValueChange={(value) => setInput({ ...input, role: value })}
            value={input.role}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem id="r1" value="student" />
              <Label htmlFor="r1">Sinh viên</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem id="r2" value="recruiter" />
              <Label htmlFor="r2">Nhà tuyển dụng</Label>
            </div>
          </RadioGroup>
        </div>
        <div className="space-y-3">
          <Label>Ảnh đại diện</Label>
          <Input
            accept="image/*"
            className="cursor-pointer"
            onChange={changeFileHandler}
            type="file"
          />
        </div>
        <Button className="w-full" type="submit">
          Đăng ký
        </Button>
        <p className="text-sm">
          Đã có tài khoản?{" "}
          <Link className="text-blue-600" to="/login">
            Đăng nhập
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
