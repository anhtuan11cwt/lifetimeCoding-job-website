import { LogOut, Menu, User, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const Navbar = () => {
  const [isLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
            <li>
              <Link to="/">Trang chủ</Link>
            </li>
            <li>
              <Link to="/jobs">Việc làm</Link>
            </li>
            <li>
              <Link to="/browse">Tìm kiếm</Link>
            </li>
          </ul>

          {!isLoggedIn ? (
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
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="flex gap-4">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium">Aachal Mittal</h4>
                    <p className="text-sm text-muted-foreground">
                      Full Stack Developer
                    </p>
                  </div>
                </div>
                <div className="flex flex-col mt-4 gap-3 text-gray-600">
                  <div className="flex items-center gap-2 cursor-pointer">
                    <User size={18} />
                    <Button className="p-0 h-auto" variant="link">
                      Xem hồ sơ
                    </Button>
                  </div>
                  <div className="flex items-center gap-2 cursor-pointer">
                    <LogOut size={18} />
                    <Button className="p-0 h-auto" variant="link">
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
          </ul>

          {!isLoggedIn ? (
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
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-medium">Aachal Mittal</h4>
                  <p className="text-sm text-muted-foreground">
                    Full Stack Developer
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 cursor-pointer">
                <User size={18} />
                <Button className="p-0 h-auto" variant="link">
                  Xem hồ sơ
                </Button>
              </div>
              <div className="flex items-center gap-2 cursor-pointer">
                <LogOut size={18} />
                <Button className="p-0 h-auto" variant="link">
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
