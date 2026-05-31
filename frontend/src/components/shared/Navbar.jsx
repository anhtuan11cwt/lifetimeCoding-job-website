import axios from "axios";
import { LogOut, Menu, User, X } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { logout } from "@/redux/authSlice.js";
import { USER_API_END_POINT } from "@/utils/constants";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(logout());
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Đã có lỗi xảy ra");
    }
  };

  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mx-auto max-w-6xl h-16 px-4">
        <div>
          <h1 className="text-2xl font-bold">
            Job<span className="text-red-600">Portal</span>
          </h1>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-12">
          <ul className="flex font-medium items-center gap-5">
            {user && user.role === "recruiter" ? (
              <>
                <li>
                  <Link to="/admin/companies">Công ty</Link>
                </li>
                <li>
                  <Link to="/admin/jobs">Việc làm</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/">Trang chủ</Link>
                </li>
                <li>
                  <Link to="/jobs">Việc làm</Link>
                </li>
                <li>
                  <Link to="/browse">Tìm kiếm</Link>
                </li>
              </>
            )}
          </ul>

          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="outline">Đăng nhập</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">
                  Đăng ký
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src={
                      user?.profile?.profilePhoto ||
                      "https://github.com/shadcn.png"
                    }
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="flex gap-4">
                  <Avatar>
                    <AvatarImage
                      src={
                        user?.profile?.profilePhoto ||
                        "https://github.com/shadcn.png"
                      }
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{user?.fullName}</h4>
                    <p className="text-sm text-muted-foreground">
                      {user?.role === "student"
                        ? "Sinh viên"
                        : "Nhà tuyển dụng"}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col mt-4 gap-3 text-gray-600">
                  {user && user.role === "student" && (
                    <div className="flex items-center gap-2 cursor-pointer">
                      <User size={18} />
                      <Link to="/profile">
                        <Button className="p-0 h-auto" variant="link">
                          Xem hồ sơ
                        </Button>
                      </Link>
                    </div>
                  )}
                  <div className="flex items-center gap-2 cursor-pointer">
                    <LogOut size={18} />
                    <Button
                      className="p-0 h-auto"
                      onClick={logoutHandler}
                      variant="link"
                    >
                      Đăng xuất
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          type="button"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 pb-4">
          <ul className="flex flex-col font-medium gap-4 py-4">
            {user && user.role === "recruiter" ? (
              <>
                <li>
                  <Link
                    onClick={() => setIsMobileMenuOpen(false)}
                    to="/admin/companies"
                  >
                    Công ty
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => setIsMobileMenuOpen(false)}
                    to="/admin/jobs"
                  >
                    Việc làm
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link onClick={() => setIsMobileMenuOpen(false)} to="/">
                    Trang chủ
                  </Link>
                </li>
                <li>
                  <Link onClick={() => setIsMobileMenuOpen(false)} to="/jobs">
                    Việc làm
                  </Link>
                </li>
                <li>
                  <Link onClick={() => setIsMobileMenuOpen(false)} to="/browse">
                    Tìm kiếm
                  </Link>
                </li>
              </>
            )}
          </ul>

          {!user ? (
            <div className="flex flex-col gap-2">
              <Link onClick={() => setIsMobileMenuOpen(false)} to="/login">
                <Button className="w-full" variant="outline">
                  Đăng nhập
                </Button>
              </Link>
              <Link onClick={() => setIsMobileMenuOpen(false)} to="/signup">
                <Button className="w-full bg-[#6A38C2] hover:bg-[#5b30a6]">
                  Đăng ký
                </Button>
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-3 text-gray-600 border-t border-gray-100 pt-4">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage
                    src={
                      user?.profile?.profilePhoto ||
                      "https://github.com/shadcn.png"
                    }
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-medium">{user?.fullName}</h4>
                  <p className="text-sm text-muted-foreground">
                    {user?.role === "student" ? "Sinh viên" : "Nhà tuyển dụng"}
                  </p>
                </div>
              </div>
              {user && user.role === "student" && (
                <Link
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => setIsMobileMenuOpen(false)}
                  to="/profile"
                >
                  <User size={18} />
                  <Button className="p-0 h-auto" variant="link">
                    Xem hồ sơ
                  </Button>
                </Link>
              )}
              <div className="flex items-center gap-2 cursor-pointer">
                <LogOut size={18} />
                <Button
                  className="p-0 h-auto"
                  onClick={() => {
                    logoutHandler();
                    setIsMobileMenuOpen(false);
                  }}
                  variant="link"
                >
                  Đăng xuất
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
