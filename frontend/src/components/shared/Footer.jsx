const Footer = () => {
  return (
    <footer className="border-t border-gray-200 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <h1 className="text-2xl font-bold">
            Job<span className="text-red-600">Portal</span>
          </h1>
          <p className="text-sm text-gray-500">
            &copy; 2026 JobPortal. Đã đăng ký bản quyền.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
