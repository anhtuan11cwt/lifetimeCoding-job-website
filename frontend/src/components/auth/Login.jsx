import axios from "axios";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { setLoading, setUser } from "@/redux/authSlice.js";
import { USER_API_END_POINT } from "@/utils/constants";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((store) => store.auth);
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
    dispatch(setLoading(true));
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
        dispatch(setUser(response.data.user));
        toast.success(
          `Chào mừng ${response.data.user?.fullName || ""} đã quay trở lại`,
        );
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Đã có lỗi xảy ra");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100dvh-5rem)] px-6 md:px-12 lg:px-24 xl:px-40 py-10">
      <form
        className="w-full max-w-lg bg-card border border-border rounded-xl p-8 space-y-6 shadow-sm"
        onSubmit={handleSubmit}
      >
        <div className="space-y-1">
          <h1 className="font-bold text-2xl tracking-tight">Đăng nhập</h1>
          <p className="text-sm text-muted-foreground">
            Đăng nhập để tiếp tục sử dụng dịch vụ
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="login-email">Email</Label>
            <Input
              autoComplete="email"
              disabled={loading}
              id="login-email"
              name="email"
              onChange={changeEventHandler}
              placeholder="Nhập email của bạn"
              type="email"
              value={input.email}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="login-password">Mật khẩu</Label>
            <div className="relative">
              <Input
                autoComplete="current-password"
                className="pr-10"
                disabled={loading}
                id="login-password"
                name="password"
                onChange={changeEventHandler}
                placeholder="Nhập mật khẩu của bạn"
                type={showPassword ? "text" : "password"}
                value={input.password}
              />
              <button
                aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                className="absolute inset-y-0 right-0 flex items-center px-3.5 text-muted-foreground transition-colors hover:text-foreground"
                disabled={loading}
                onClick={() => setShowPassword((value) => !value)}
                tabIndex={-1}
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

          <fieldset className="pt-1">
            <legend className="text-sm font-medium mb-2">Bạn là</legend>
            <RadioGroup
              className="flex items-center gap-6"
              disabled={loading}
              onValueChange={(value) => setInput({ ...input, role: value })}
              value={input.role}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  disabled={loading}
                  id="login-student"
                  value="student"
                />
                <Label
                  className="text-sm font-normal cursor-pointer"
                  htmlFor="login-student"
                >
                  Sinh viên
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  disabled={loading}
                  id="login-recruiter"
                  value="recruiter"
                />
                <Label
                  className="text-sm font-normal cursor-pointer"
                  htmlFor="login-recruiter"
                >
                  Nhà tuyển dụng
                </Label>
              </div>
            </RadioGroup>
          </fieldset>
        </div>

        {loading ? (
          <Button className="w-full" disabled>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Vui lòng chờ...
          </Button>
        ) : (
          <Button className="w-full" type="submit">
            Đăng nhập
          </Button>
        )}

        <p className="text-sm text-center text-muted-foreground">
          Chưa có tài khoản?{" "}
          <Link
            className={`text-primary font-medium hover:underline ${loading ? "pointer-events-none opacity-50" : ""}`}
            to="/signup"
          >
            Đăng ký
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
