import axios from "axios";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { setUser } from "@/redux/authSlice";
import { USER_API_END_POINT } from "@/utils/constants";

const UpdateProfileDialog = ({ open, setOpen }) => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    bio: user?.profile?.bio || "",
    email: user?.email || "",
    file: user?.profile?.resume || "",
    fullName: user?.fullName || "",
    phoneNumber: user?.phoneNumber || "",
    skills: user?.profile?.skills?.join(", ") || "",
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullName", input.fullName);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      setLoading(true);
      const res = await axios.post(
        `${USER_API_END_POINT}/profile/update`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        },
      );
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Đã có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
    setOpen(false);
  };

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Cập nhật hồ sơ</DialogTitle>
        </DialogHeader>
        <form onSubmit={submitHandler}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right" htmlFor="fullName">
                Họ tên
              </Label>
              <Input
                className="col-span-3"
                id="fullName"
                name="fullName"
                onChange={changeEventHandler}
                value={input.fullName}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right" htmlFor="email">
                Email
              </Label>
              <Input
                className="col-span-3"
                id="email"
                name="email"
                onChange={changeEventHandler}
                value={input.email}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right" htmlFor="phoneNumber">
                Số điện thoại
              </Label>
              <Input
                className="col-span-3"
                id="phoneNumber"
                name="phoneNumber"
                onChange={changeEventHandler}
                value={input.phoneNumber}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right" htmlFor="bio">
                Giới thiệu
              </Label>
              <Input
                className="col-span-3"
                id="bio"
                name="bio"
                onChange={changeEventHandler}
                value={input.bio}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right" htmlFor="skills">
                Kỹ năng
              </Label>
              <Input
                className="col-span-3"
                id="skills"
                name="skills"
                onChange={changeEventHandler}
                placeholder="HTML, CSS, JavaScript"
                value={input.skills}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right" htmlFor="file">
                CV
              </Label>
              <Input
                accept="application/pdf"
                className="col-span-3"
                id="file"
                name="file"
                onChange={fileChangeHandler}
                type="file"
              />
            </div>
          </div>
          <DialogFooter>
            {loading ? (
              <Button disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Đang lưu...
              </Button>
            ) : (
              <Button type="submit">Lưu thay đổi</Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfileDialog;
