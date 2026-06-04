import axios from "axios";
import { Camera, Eye, EyeOff, Loader2 } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { setLoading } from "@/redux/authSlice.js";
import { USER_API_END_POINT } from "@/utils/constants";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((store) => store.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
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
    const file = e.target.files?.[0];
    if (file) {
      setInput({ ...input, file });
      setPreviewImage(URL.createObjectURL(file));
    }
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

    dispatch(setLoading(true));
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
          <h1 className="font-bold text-2xl tracking-tight">Đăng ký</h1>
          <p className="text-sm text-muted-foreground">
            Tạo tài khoản để bắt đầu tìm kiếm cơ hội việc làm
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="signup-name">Họ và tên</Label>
            <Input
              autoComplete="name"
              disabled={loading}
              id="signup-name"
              name="fullName"
              onChange={changeEventHandler}
              placeholder="Nhập họ và tên của bạn"
              type="text"
              value={input.fullName}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="signup-email">Email</Label>
            <Input
              autoComplete="email"
              disabled={loading}
              id="signup-email"
              name="email"
              onChange={changeEventHandler}
              placeholder="Nhập email của bạn"
              type="email"
              value={input.email}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="signup-phone">Số điện thoại</Label>
            <Input
              autoComplete="tel"
              disabled={loading}
              id="signup-phone"
              name="phoneNumber"
              onChange={changeEventHandler}
              placeholder="Nhập số điện thoại của bạn"
              type="tel"
              value={input.phoneNumber}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="signup-password">Mật khẩu</Label>
            <div className="relative">
              <Input
                autoComplete="new-password"
                className="pr-10"
                disabled={loading}
                id="signup-password"
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
                  id="signup-student"
                  value="student"
                />
                <Label
                  className="text-sm font-normal cursor-pointer"
                  htmlFor="signup-student"
                >
                  Sinh viên
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  disabled={loading}
                  id="signup-recruiter"
                  value="recruiter"
                />
                <Label
                  className="text-sm font-normal cursor-pointer"
                  htmlFor="signup-recruiter"
                >
                  Nhà tuyển dụng
                </Label>
              </div>
            </RadioGroup>
          </fieldset>

          <div className="space-y-2">
            <Label htmlFor="signup-avatar">Ảnh đại diện</Label>
            <div className="flex items-center gap-4">
              <label
                className="relative size-16 shrink-0 rounded-full overflow-hidden border-2 border-dashed border-muted-foreground/30 hover:border-primary/50 transition-colors duration-150 cursor-pointer bg-muted flex items-center justify-center"
                htmlFor="signup-avatar"
              >
                {previewImage ? (
                  <img
                    alt="Preview"
                    className="size-full object-cover"
                    src={previewImage}
                  />
                ) : (
                  <Camera className="text-muted-foreground" size={20} />
                )}
              </label>
              <div className="flex-1">
                <Input
                  accept="image/*"
                  className="cursor-pointer text-sm"
                  disabled={loading}
                  id="signup-avatar"
                  onChange={changeFileHandler}
                  type="file"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  JPG, PNG hoặc WEBP. Tối đa 5MB.
                </p>
              </div>
            </div>
          </div>
        </div>

        {loading ? (
          <Button className="w-full" disabled>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Vui lòng chờ...
          </Button>
        ) : (
          <Button className="w-full" type="submit">
            Đăng ký
          </Button>
        )}

        <p className="text-sm text-center text-muted-foreground">
          Đã có tài khoản?{" "}
          <Link
            className={`text-primary font-medium hover:underline ${loading ? "pointer-events-none opacity-50" : ""}`}
            to="/login"
          >
            Đăng nhập
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
