const Footer = () => {
  return (
    <footer className="border-t border-gray-200 py-8 px-6 md:px-12 lg:px-24 xl:px-40">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-2xl font-bold">
          Job<span className="text-red-600">Portal</span>
        </h1>
        <p className="text-sm text-gray-500">
          &copy; 2026 JobPortal. Đã đăng ký bản quyền.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
