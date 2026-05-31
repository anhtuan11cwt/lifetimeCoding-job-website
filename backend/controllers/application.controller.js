import Application from "../models/application.model.js";
import Job from "../models/job.model.js";

// Ứng tuyển công việc
export const applyJob = async (req, res) => {
  try {
    const userId = req.id;
    const jobId = req.params.id;

    if (!jobId) {
      return res.status(400).json({
        message: "ID công việc là bắt buộc",
        success: false,
      });
    }

    // Kiểm tra xem user đã ứng tuyển công việc này chưa
    const existingApplication = await Application.findOne({
      applicant: userId,
      job: jobId,
    });

    if (existingApplication) {
      return res.status(400).json({
        message: "Bạn đã ứng tuyển công việc này rồi",
        success: false,
      });
    }

    // Kiểm tra công việc có tồn tại không
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        message: "Không tìm thấy công việc",
        success: false,
      });
    }

    // Tạo ứng tuyển mới
    const newApplication = await Application.create({
      applicant: userId,
      job: jobId,
    });

    // Đẩy ID ứng tuyển vào mảng applications của Job
    job.applications.push(newApplication._id);
    await job.save();

    return res.status(201).json({
      application: newApplication,
      message: "Ứng tuyển thành công",
      success: true,
    });
  } catch (error) {
    console.error("Lỗi ứng tuyển công việc:", error);
    return res.status(500).json({
      message: "Lỗi máy chủ nội bộ",
      success: false,
    });
  }
};

// Lấy danh sách công việc đã ứng tuyển
export const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.id;

    const applications = await Application.find({ applicant: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        populate: { path: "company" },
      });

    if (!applications || applications.length === 0) {
      return res.status(404).json({
        message: "Không có đơn ứng tuyển nào",
        success: false,
      });
    }

    return res.status(200).json({
      applications,
      success: true,
    });
  } catch (error) {
    console.error("Lỗi lấy danh sách đã ứng tuyển:", error);
    return res.status(500).json({
      message: "Lỗi máy chủ nội bộ",
      success: false,
    });
  }
};

// Lấy danh sách ứng viên của một công việc (dành cho Admin/Recruiter)
export const getApplicants = async (req, res) => {
  try {
    const jobId = req.params.id;

    const job = await Job.findById(jobId).populate({
      options: { sort: { createdAt: -1 } },
      path: "applications",
      populate: { path: "applicant" },
    });

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
    console.error("Lỗi lấy danh sách ứng viên:", error);
    return res.status(500).json({
      message: "Lỗi máy chủ nội bộ",
      success: false,
    });
  }
};

// Cập nhật trạng thái ứng tuyển
export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;

    if (!status) {
      return res.status(400).json({
        message: "Trạng thái là bắt buộc",
        success: false,
      });
    }

    const application = await Application.findById(applicationId);

    if (!application) {
      return res.status(404).json({
        message: "Không tìm thấy đơn ứng tuyển",
        success: false,
      });
    }

    application.status = status;
    await application.save();

    return res.status(200).json({
      message: "Cập nhật trạng thái thành công",
      success: true,
    });
  } catch (error) {
    console.error("Lỗi cập nhật trạng thái:", error);
    return res.status(500).json({
      message: "Lỗi máy chủ nội bộ",
      success: false,
    });
  }
};
