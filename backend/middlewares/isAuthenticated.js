import jwt from "jsonwebtoken";

const isAuthenticated = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        message: "Người dùng chưa xác thực",
        success: false,
      });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.id = decoded.userId;
    next();
  } catch {
    return res.status(401).json({
      message: "Mã token không hợp lệ",
      success: false,
    });
  }
};

export default isAuthenticated;
