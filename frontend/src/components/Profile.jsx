import { Contact, Mail, Pen } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import AppliedJobTable from "@/components/AppliedJobTable";
import UpdateProfileDialog from "@/components/UpdateProfileDialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";

const Profile = () => {
  useGetAppliedJobs();
  const { user } = useSelector((store) => store.auth);
  const [open, setOpen] = useState(false);

  const skills = user?.profile?.skills || [];
  const isResume = !!user?.profile?.resume;

  return (
    <div className="max-w-5xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="h-24 w-24">
            <AvatarImage
              src={
                user?.profile?.profilePhoto || "https://github.com/shadcn.png"
              }
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="font-medium text-xl">{user?.fullName}</h1>
            <p className="text-sm text-gray-500">
              {user?.profile?.bio || "Chưa có giới thiệu"}
            </p>
          </div>
        </div>
        <Button onClick={() => setOpen(true)} variant="outline">
          <Pen className="h-4 w-4" />
        </Button>
      </div>

      {/* Contact Info */}
      <div className="my-5">
        <div className="flex items-center gap-3 my-2">
          <Mail className="h-4 w-4 text-gray-500" />
          <span className="text-gray-700">{user?.email}</span>
        </div>
        <div className="flex items-center gap-3 my-2">
          <Contact className="h-4 w-4 text-gray-500" />
          <span className="text-gray-700">
            {user?.phoneNumber || "Chưa cập nhật"}
          </span>
        </div>
      </div>

      {/* Skills */}
      <div className="my-5">
        <h1 className="font-bold text-lg">Kỹ năng</h1>
        <div className="flex items-center gap-2 mt-2 flex-wrap">
          {skills.length !== 0 ? (
            skills.map((skill) => (
              <Badge key={skill} variant="secondary">
                {skill}
              </Badge>
            ))
          ) : (
            <span className="text-gray-500">NA</span>
          )}
        </div>
      </div>

      {/* Resume */}
      <div className="my-5">
        <h1 className="font-bold text-lg">CV</h1>
        {isResume ? (
          <a
            className="text-blue-500 hover:underline cursor-pointer"
            href={user?.profile?.resume}
            rel="noopener noreferrer"
            target="_blank"
          >
            {user?.profile?.resumeOriginalName || "Xem CV"}
          </a>
        ) : (
          <span className="text-gray-500">NA</span>
        )}
      </div>

      {/* Applied Jobs */}
      <AppliedJobTable />

      {/* Update Profile Dialog */}
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
