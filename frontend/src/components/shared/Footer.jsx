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
    <footer className="bg-muted/30 border-border border-t">
      <div className="px-6 md:px-16 lg:px-24 xl:px-32 py-12">
        <div className="gap-8 grid grid-cols-1 md:grid-cols-3">
          <div className="space-y-3">
            <Link className="inline-flex items-center gap-2" to="/">
              <Briefcase className="text-destructive" size={24} />
              <span className="font-bold text-xl">
                Job<span className="text-destructive">Portal</span>
              </span>
            </Link>
            <p className="max-w-xs text-muted-foreground text-sm leading-relaxed">
              Nền tảng kết nối sinh viên và nhà tuyển dụng hàng đầu Việt Nam.
              Tìm kiếm cơ hội việc làm phù hợp với bạn.
            </p>
            <div className="flex items-center gap-2 pt-1">
              {socialLinks.map((social) => (
                <a
                  aria-label={social.label}
                  className="hover:bg-muted p-2 rounded-full text-muted-foreground hover:text-foreground transition-colors duration-150"
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
              <h3 className="font-semibold text-foreground text-sm">
                {group.title}
              </h3>
              <ul className="space-y-2">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      className="text-muted-foreground hover:text-foreground text-sm transition-colors duration-150"
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

      <div className="px-6 md:px-16 lg:px-24 xl:px-32 py-5 border-border border-t">
        <p className="text-muted-foreground text-sm text-center">
          &copy; {new Date().getFullYear()} JobPortal. Đã đăng ký bản quyền.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
