import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

// Đăng ký
export const register = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, password, role } = req.body;

    if (!fullName || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({
        message: "Thiếu thông tin",
        success: false,
      });
    }

    // Kiểm tra người dùng đã tồn tại
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "Người dùng đã tồn tại với email này",
        success: false,
      });
    }

    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    // Tạo người dùng
    const user = await User.create({
      email,
      fullName,
      password: hashedPassword,
      phoneNumber,
      role,
    });

    return res.status(201).json({
      message: "Tạo tài khoản thành công",
      success: true,
      user: {
        _id: user._id,
        email: user.email,
        fullName: user.fullName,
        phoneNumber: user.phoneNumber,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Lỗi đăng ký:", error);
    return res.status(500).json({
      message: "Lỗi máy chủ nội bộ",
      success: false,
    });
  }
};

// Đăng nhập
export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Thiếu thông tin",
        success: false,
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Email hoặc mật khẩu không hợp lệ",
        success: false,
      });
    }

    // So sánh mật khẩu
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Email hoặc mật khẩu không hợp lệ",
        success: false,
      });
    }

    // Kiểm tra vai trò
    if (role !== user.role) {
      return res.status(400).json({
        message: "Tài khoản không tồn tại với vai trò này",
        success: false,
      });
    }

    // Tạo mã JWT
    const tokenData = { userId: user._id };
    const token = jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    // Thiết lập cookie
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 ngày
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      secure: process.env.NODE_ENV === "production",
    });

    return res.status(200).json({
      message: `Chào mừng ${user.fullName} đã quay trở lại`,
      success: true,
      user: {
        _id: user._id,
        email: user.email,
        fullName: user.fullName,
        phoneNumber: user.phoneNumber,
        profile: user.profile,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Lỗi đăng nhập:", error);
    return res.status(500).json({
      message: "Lỗi máy chủ nội bộ",
      success: false,
    });
  }
};

// Đăng xuất
export const logout = async (_req, res) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      maxAge: 0,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      secure: process.env.NODE_ENV === "production",
    });

    return res.status(200).json({
      message: "Đăng xuất thành công",
      success: true,
    });
  } catch (error) {
    console.error("Lỗi đăng xuất:", error);
    return res.status(500).json({
      message: "Lỗi máy chủ nội bộ",
      success: false,
    });
  }
};

// Cập nhật hồ sơ
export const updateProfile = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, bio, skills } = req.body;

    const userId = req.id; // từ middleware xác thực

    // Tìm người dùng hiện tại
    const currentUser = await User.findById(userId);
    if (!currentUser) {
      return res.status(404).json({
        message: "Người dùng không tồn tại",
        success: false,
      });
    }

    // Cập nhật từng trường một cách độc lập
    if (fullName) {
      currentUser.fullName = fullName;
    }

    if (email) {
      currentUser.email = email;
    }

    if (phoneNumber) {
      currentUser.phoneNumber = phoneNumber;
    }

    if (bio) {
      currentUser.profile.bio = bio;
    }

    if (skills) {
      const skillsArray = skills.split(",").map((skill) => skill.trim());
      currentUser.profile.skills = skillsArray;
    }

    await currentUser.save();

    return res.status(200).json({
      message: "Cập nhật hồ sơ thành công",
      success: true,
      user: {
        _id: currentUser._id,
        email: currentUser.email,
        fullName: currentUser.fullName,
        phoneNumber: currentUser.phoneNumber,
        profile: currentUser.profile,
        role: currentUser.role,
      },
    });
  } catch (error) {
    console.error("Lỗi cập nhật hồ sơ:", error);
    return res.status(500).json({
      message: "Lỗi máy chủ nội bộ",
      success: false,
    });
  }
};
