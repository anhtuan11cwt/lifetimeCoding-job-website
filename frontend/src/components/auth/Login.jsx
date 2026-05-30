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

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "student",
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${USER_API_END_POINT}/login`,
        {
          email: input.email,
          password: input.password,
          role: input.role,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        },
      );
      if (response.data.success) {
        toast.success(`Chào mừng ${response.data.user?.fullName || ""} đã quay trở lại`);
        navigate("/");
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
        <h1 className="font-bold text-xl">Đăng nhập</h1>
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
        <Button className="w-full" type="submit">
          Đăng nhập
        </Button>
        <p className="text-sm">
          Chưa có tài khoản?{" "}
          <Link className="text-blue-600" to="/signup">
            Đăng ký
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
