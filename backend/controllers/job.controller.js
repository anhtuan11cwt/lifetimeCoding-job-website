import Job from "../models/job.model.js";

// Đăng tin tuyển dụng
export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experience,
      experienceLevel,
      position,
      company,
    } = req.body;

    if (
      !title ||
      !description ||
      !salary ||
      !location ||
      !jobType ||
      !experience ||
      !position ||
      !company
    ) {
      return res.status(400).json({
        message: "Thiếu thông tin bắt buộc",
        success: false,
      });
    }

    const userId = req.id;

    // Chuyển requirements từ chuỗi thành mảng nếu cần
    let requirementsArray;
    if (requirements) {
      if (Array.isArray(requirements)) {
        requirementsArray = requirements;
      } else {
        requirementsArray = requirements.split(",").map((req) => req.trim());
      }
    }

    const job = await Job.create({
      company,
      created_by: userId,
      description,
      experience,
      experienceLevel,
      jobType,
      location,
      position,
      requirements: requirementsArray,
      salary: Number(salary),
      title,
    });

    return res.status(201).json({
      job,
      message: "Đã tạo công việc mới",
      success: true,
    });
  } catch (error) {
    console.error("Lỗi đăng tin tuyển dụng:", error);
    return res.status(500).json({
      message: "Lỗi máy chủ nội bộ",
      success: false,
    });
  }
};
// Cập nhật công việc
export const updateJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experience,
      position,
      company,
    } = req.body;

    const updateData = {
      company,
      description,
      experience,
      jobType,
      location,
      position,
      requirements: requirements
        ? Array.isArray(requirements)
          ? requirements
          : requirements.split(",").map((r) => r.trim())
        : undefined,
      salary: salary ? Number(salary) : undefined,
      title,
    };

    // Remove undefined values
    for (const key in updateData) {
      if (updateData[key] === undefined) {
        delete updateData[key];
      }
    }

    const job = await Job.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!job) {
      return res.status(404).json({
        message: "Không tìm thấy công việc",
        success: false,
      });
    }

    return res.status(200).json({
      job,
      message: "Công việc đã được cập nhật",
      success: true,
    });
  } catch (error) {
    console.error("Lỗi cập nhật công việc:", error);
    return res.status(500).json({
      message: "Lỗi máy chủ nội bộ",
      success: false,
    });
  }
};

// Lấy tất cả công việc
export const getAllJobs = async (req, res) => {
  try {
    const { keyword } = req.query;

    let query = {};

    if (keyword) {
      query = {
        $or: [
          { title: { $options: "i", $regex: keyword } },
          { description: { $options: "i", $regex: keyword } },
        ],
      };
    }

    const jobs = await Job.find(query)
      .populate({ path: "company" })
      .sort({ createdAt: -1 });

    if (!jobs || jobs.length === 0) {
      return res.status(404).json({
        message: "Không tìm thấy công việc",
        success: false,
      });
    }

    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.error("Lỗi lấy danh sách công việc:", error);
    return res.status(500).json({
      message: "Lỗi máy chủ nội bộ",
      success: false,
    });
  }
};

// Lấy công việc theo ID
export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate("applications");

    if (!job) {
      return res.status(404).json({
        message: "Không tìm thấy công việc",
        success: false,
      });
    }

    return res.status(200).json({
      job,
      success: true,
    });
  } catch (error) {
    console.error("Lỗi lấy công việc theo ID:", error);
    return res.status(500).json({
      message: "Lỗi máy chủ nội bộ",
      success: false,
    });
  }
};

// Lấy công việc của admin/recruiter
export const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.id;
    const jobs = await Job.find({ created_by: adminId }).populate({
      path: "company",
    });

    if (!jobs || jobs.length === 0) {
      return res.status(404).json({
        message: "Không tìm thấy công việc",
        success: false,
      });
    }

    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.error("Lỗi lấy công việc của admin:", error);
    return res.status(500).json({
      message: "Lỗi máy chủ nội bộ",
      success: false,
    });
  }
};
