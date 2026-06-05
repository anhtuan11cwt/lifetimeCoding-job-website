import { Contact, Mail, Pen } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import AppliedJobTable from "@/components/AppliedJobTable";
import UpdateProfileDialog from "@/components/UpdateProfileDialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";
import { getInitials } from "@/utils/format";

const Profile = () => {
  useGetAppliedJobs();
  const { user } = useSelector((store) => store.auth);
  const [open, setOpen] = useState(false);

  const skills = user?.profile?.skills || [];

  return (
    <div className="my-5 px-6 md:px-16 lg:px-24 xl:px-32">
      <div className="bg-card shadow-sm p-8 border border-border rounded-2xl">
        <div className="flex justify-between items-start gap-4">
          <div className="flex items-center gap-4">
            <Avatar className="ring-4 ring-muted w-24 h-24">
              <AvatarImage
                src={
                  user?.profile?.profilePhoto || "https://github.com/shadcn.png"
                }
              />
              <AvatarFallback className="text-lg">
                {getInitials(user?.fullName)}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h1 className="font-semibold text-xl">{user?.fullName}</h1>
              <p className="text-muted-foreground text-sm">
                {user?.profile?.bio || "Chưa có giới thiệu"}
              </p>
            </div>
          </div>
          <Button onClick={() => setOpen(true)} size="icon" variant="outline">
            <Pen className="w-4 h-4" />
          </Button>
        </div>

        <div className="space-y-3 my-6">
          <div className="flex items-center gap-3 text-muted-foreground">
            <Mail className="w-4 h-4 shrink-0" />
            <span className="text-foreground">{user?.email}</span>
          </div>
          <div className="flex items-center gap-3 text-muted-foreground">
            <Contact className="w-4 h-4 shrink-0" />
            <span className="text-foreground">
              {user?.phoneNumber || "Chưa cập nhật"}
            </span>
          </div>
        </div>

        <div className="my-6">
          <h1 className="mb-3 font-bold text-lg">Kỹ năng</h1>
          {skills.length > 0 ? (
            <div className="flex flex-wrap items-center gap-2">
              {skills.map((skill) => (
                <Badge key={skill} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          ) : (
            <span className="text-muted-foreground text-sm">
              Chưa cập nhật kỹ năng
            </span>
          )}
        </div>

        <AppliedJobTable />
      </div>

      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
