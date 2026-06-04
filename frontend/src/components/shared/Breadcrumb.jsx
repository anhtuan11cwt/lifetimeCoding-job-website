import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const Breadcrumb = ({ items }) => {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center gap-1.5 text-sm text-muted-foreground mb-6"
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <span className="flex items-center gap-1.5" key={item.label}>
            {index > 0 && <ChevronRight className="size-4 shrink-0" />}
            {isLast || !item.to ? (
              <span className={isLast ? "text-foreground font-medium" : ""}>
                {item.label}
              </span>
            ) : (
              <Link
                className="hover:text-foreground transition-colors duration-150"
                to={item.to}
              >
                {item.label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;
