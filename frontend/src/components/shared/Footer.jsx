import {
  Briefcase,
  ExternalLink,
  Globe,
  Mail,
  MessageCircle,
} from "lucide-react";
import { Link } from "react-router-dom";

const footerLinks = [
  {
    links: [
      { label: "Việc làm", to: "/jobs" },
      { label: "Tìm kiếm", to: "/browse" },
      { label: "Đăng tuyển", to: "/signup" },
    ],
    title: "Dịch vụ",
  },
  {
    links: [
      { label: "Trung tâm trợ giúp", to: "#" },
      { label: "Điều khoản sử dụng", to: "#" },
      { label: "Chính sách bảo mật", to: "#" },
    ],
    title: "Hỗ trợ",
  },
];

const socialLinks = [
  { href: "#", icon: Mail, label: "Email" },
  { href: "#", icon: Globe, label: "Website" },
  { href: "#", icon: ExternalLink, label: "LinkedIn" },
  { href: "#", icon: MessageCircle, label: "Zalo" },
];

const Footer = () => {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="px-6 md:px-12 lg:px-24 xl:px-40 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-3">
            <Link className="inline-flex items-center gap-2" to="/">
              <Briefcase className="text-destructive" size={24} />
              <span className="text-xl font-bold">
                Job<span className="text-destructive">Portal</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Nền tảng kết nối sinh viên và nhà tuyển dụng hàng đầu Việt Nam.
              Tìm kiếm cơ hội việc làm phù hợp với bạn.
            </p>
            <div className="flex items-center gap-2 pt-1">
              {socialLinks.map((social) => (
                <a
                  aria-label={social.label}
                  className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-150"
                  href={social.href}
                  key={social.label}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {footerLinks.map((group) => (
            <div className="space-y-3" key={group.title}>
              <h3 className="font-semibold text-sm text-foreground">
                {group.title}
              </h3>
              <ul className="space-y-2">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-150"
                      to={link.to}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-border px-6 md:px-12 lg:px-24 xl:px-40 py-5">
        <p className="text-sm text-muted-foreground text-center">
          &copy; {new Date().getFullYear()} JobPortal. Đã đăng ký bản quyền.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
