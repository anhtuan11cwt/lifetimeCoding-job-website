import axios from "axios";
import { LogOut, Menu, User, X } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
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

const navLinks = [
  { label: "Trang chủ", to: "/" },
  { label: "Việc làm", to: "/jobs" },
  { label: "Tìm kiếm", to: "/browse" },
];

const recruiterLinks = [
  { label: "Công ty", to: "/admin/companies" },
  { label: "Việc làm", to: "/admin/jobs" },
];

const getInitials = (name) => {
  if (!name) return "U";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const links = user?.role === "recruiter" ? recruiterLinks : navLinks;

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

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="top-0 right-0 left-0 z-50 fixed flex justify-between items-center bg-background px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-border border-b">
      <Link className="shrink-0" to="/">
        <h1 className="font-bold text-foreground text-2xl">
          Job<span className="text-destructive">Portal</span>
        </h1>
      </Link>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-12">
        <ul className="flex items-center gap-1">
          {links.map((link) => (
            <li key={link.to}>
              <Link
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-150 ${
                  isActive(link.to)
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
                to={link.to}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {!user ? (
          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="outline">Đăng nhập</Button>
            </Link>
            <Link to="/signup">
              <Button>Đăng ký</Button>
            </Link>
          </div>
        ) : (
          <Popover>
            <PopoverTrigger asChild>
              <Avatar className="ring-2 ring-transparent hover:ring-primary/30 transition-all duration-150 cursor-pointer">
                <AvatarImage
                  src={
                    user?.profile?.profilePhoto ||
                    "https://github.com/shadcn.png"
                  }
                />
                <AvatarFallback>{getInitials(user?.fullName)}</AvatarFallback>
              </Avatar>
            </PopoverTrigger>
            <PopoverContent align="end" className="p-4 w-72">
              <div className="flex items-center gap-3">
                <Avatar className="size-10">
                  <AvatarImage
                    src={
                      user?.profile?.profilePhoto ||
                      "https://github.com/shadcn.png"
                    }
                  />
                  <AvatarFallback>{getInitials(user?.fullName)}</AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <h4 className="font-semibold text-sm truncate">
                    {user?.fullName}
                  </h4>
                  <p className="text-muted-foreground text-xs">
                    {user?.role === "student" ? "Sinh viên" : "Nhà tuyển dụng"}
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-1 mt-3 pt-3 border-border border-t">
                {user?.role === "student" && (
                  <Link
                    className="flex items-center gap-2 hover:bg-muted px-2 py-2 rounded-lg text-muted-foreground hover:text-foreground text-sm transition-colors duration-150"
                    to="/profile"
                  >
                    <User size={16} />
                    Xem hồ sơ
                  </Link>
                )}
                <button
                  className="flex items-center gap-2 hover:bg-muted px-2 py-2 rounded-lg w-full text-muted-foreground hover:text-foreground text-sm text-left transition-colors duration-150"
                  onClick={logoutHandler}
                  type="button"
                >
                  <LogOut size={16} />
                  Đăng xuất
                </button>
              </div>
            </PopoverContent>
          </Popover>
        )}
      </div>

      {/* Mobile Menu Button */}
      <button
        aria-label={isMobileMenuOpen ? "Đóng menu" : "Mở menu"}
        className="md:hidden hover:bg-muted p-2 rounded-lg text-muted-foreground hover:text-foreground transition-colors duration-150"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        type="button"
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Nav */}
      <div
        className={`${
          isMobileMenuOpen
            ? "translate-y-0 opacity-100"
            : "-translate-y-2 opacity-0 pointer-events-none"
        } absolute top-full left-0 w-full bg-background border-b border-border flex-col p-5 gap-1 md:hidden z-50 shadow-lg transition-all duration-200 ease-out`}
      >
        <ul className="flex flex-col gap-1">
          {links.map((link) => (
            <li key={link.to}>
              <Link
                className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150 ${
                  isActive(link.to)
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
                to={link.to}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {!user ? (
          <div className="flex flex-col gap-2 mt-4 pt-4 border-border border-t">
            <Link onClick={() => setIsMobileMenuOpen(false)} to="/login">
              <Button className="w-full" variant="outline">
                Đăng nhập
              </Button>
            </Link>
            <Link onClick={() => setIsMobileMenuOpen(false)} to="/signup">
              <Button className="w-full">Đăng ký</Button>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-3 mt-4 pt-4 border-border border-t">
            <div className="flex items-center gap-3 px-2">
              <Avatar className="size-10">
                <AvatarImage
                  src={
                    user?.profile?.profilePhoto ||
                    "https://github.com/shadcn.png"
                  }
                />
                <AvatarFallback>{getInitials(user?.fullName)}</AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <h4 className="font-semibold text-sm truncate">
                  {user?.fullName}
                </h4>
                <p className="text-muted-foreground text-xs">
                  {user?.role === "student" ? "Sinh viên" : "Nhà tuyển dụng"}
                </p>
              </div>
            </div>
            {user?.role === "student" && (
              <Link
                className="flex items-center gap-2 hover:bg-muted px-2 py-2 rounded-lg text-muted-foreground hover:text-foreground text-sm transition-colors duration-150"
                onClick={() => setIsMobileMenuOpen(false)}
                to="/profile"
              >
                <User size={16} />
                Xem hồ sơ
              </Link>
            )}
            <button
              className="flex items-center gap-2 hover:bg-muted px-2 py-2 rounded-lg w-full text-muted-foreground hover:text-foreground text-sm text-left transition-colors duration-150"
              onClick={() => {
                logoutHandler();
                setIsMobileMenuOpen(false);
              }}
              type="button"
            >
              <LogOut size={16} />
              Đăng xuất
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
