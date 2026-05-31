import Company from "../models/company.model.js";
import cloudinary from "../utils/cloudinary.js";

const extractPublicIdFromUrl = (url) => {
  if (!url) return null;
  const matches = url.match(/\/upload\/v\d+\/(.+)\.\w+$/);
  return matches ? matches[1] : null;
};

// Đăng ký công ty
export const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;

    if (!companyName) {
      return res.status(400).json({
        message: "Tên công ty là bắt buộc",
        success: false,
      });
    }

    // Kiểm tra tên công ty đã tồn tại
    const existingCompany = await Company.findOne({ name: companyName });
    if (existingCompany) {
      return res.status(400).json({
        message: "Bạn không thể đăng ký cùng một công ty",
        success: false,
      });
    }

    // Tạo công ty mới
    const company = await Company.create({
      name: companyName,
      userId: req.id,
    });

    return res.status(201).json({
      company,
      message: "Đăng ký công ty thành công",
      success: true,
    });
  } catch (error) {
    console.error("Lỗi đăng ký công ty:", error);
    return res.status(500).json({
      message: "Lỗi máy chủ nội bộ",
      success: false,
    });
  }
};

// Lấy danh sách công ty của người dùng
export const getCompany = async (req, res) => {
  try {
    const userId = req.id;
    const companies = await Company.find({ userId });

    if (!companies || companies.length === 0) {
      return res.status(404).json({
        message: "Không tìm thấy công ty",
        success: false,
      });
    }

    return res.status(200).json({
      companies,
      success: true,
    });
  } catch (error) {
    console.error("Lỗi lấy danh sách công ty:", error);
    return res.status(500).json({
      message: "Lỗi máy chủ nội bộ",
      success: false,
    });
  }
};

// Lấy thông tin công ty theo ID
export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findById(companyId);

    if (!company) {
      return res.status(404).json({
        message: "Không tìm thấy công ty",
        success: false,
      });
    }

    return res.status(200).json({
      company,
      success: true,
    });
  } catch (error) {
    console.error("Lỗi lấy công ty theo ID:", error);
    return res.status(500).json({
      message: "Lỗi máy chủ nội bộ",
      success: false,
    });
  }
};

// Cập nhật thông tin công ty
export const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;

    const updateData = {};

    if (typeof description !== "undefined")
      updateData.description = description;
    if (typeof location !== "undefined") updateData.location = location;
    if (typeof name !== "undefined") updateData.name = name;
    if (typeof website !== "undefined") updateData.website = website;

    if (req.file) {
      const existingCompany = await Company.findById(req.params.id);
      const oldLogoUrl = existingCompany?.logo;

      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "lifetimeCoding-job-website/logo",
            resource_type: "image",
          },
          (err, uploadResult) => {
            if (err) {
              reject(err);
              return;
            }

            resolve(uploadResult);
          },
        );

        stream.end(req.file.buffer);
      });
      updateData.logo = result.secure_url;

      if (oldLogoUrl) {
        const publicId = extractPublicIdFromUrl(oldLogoUrl);
        if (publicId) {
          await cloudinary.uploader.destroy(publicId);
        }
      }
    }

    const company = await Company.findByIdAndUpdate(req.params.id, updateData, {
      returnDocument: "after",
    });

    if (!company) {
      return res.status(404).json({
        message: "Không tìm thấy công ty",
        success: false,
      });
    }

    return res.status(200).json({
      company,
      message: "Thông tin đã được cập nhật",
      success: true,
    });
  } catch (error) {
    console.error("Lỗi cập nhật công ty:", error);
    return res.status(500).json({
      message: "Lỗi máy chủ nội bộ",
      success: false,
    });
  }
};

// Xoá công ty
export const deleteCompany = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);

    if (!company) {
      return res.status(404).json({
        message: "Không tìm thấy công ty",
        success: false,
      });
    }

    if (company.logo) {
      const publicId = extractPublicIdFromUrl(company.logo);
      if (publicId) {
        await cloudinary.uploader.destroy(publicId);
      }
    }

    await Company.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      message: "Xoá công ty thành công",
      success: true,
    });
  } catch (error) {
    console.error("Lỗi xoá công ty:", error);
    return res.status(500).json({
      message: "Lỗi máy chủ nội bộ",
      success: false,
    });
  }
};
