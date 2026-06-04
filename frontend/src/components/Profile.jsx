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
    <div className="my-5 px-6 md:px-12 lg:px-24 xl:px-40">
      <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24 ring-4 ring-muted">
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
              <p className="text-sm text-muted-foreground">
                {user?.profile?.bio || "Chưa có giới thiệu"}
              </p>
            </div>
          </div>
          <Button onClick={() => setOpen(true)} size="icon" variant="outline">
            <Pen className="h-4 w-4" />
          </Button>
        </div>

        <div className="my-6 space-y-3">
          <div className="flex items-center gap-3 text-muted-foreground">
            <Mail className="h-4 w-4 shrink-0" />
            <span className="text-foreground">{user?.email}</span>
          </div>
          <div className="flex items-center gap-3 text-muted-foreground">
            <Contact className="h-4 w-4 shrink-0" />
            <span className="text-foreground">
              {user?.phoneNumber || "Chưa cập nhật"}
            </span>
          </div>
        </div>

        <div className="my-6">
          <h1 className="font-bold text-lg mb-3">Kỹ năng</h1>
          {skills.length > 0 ? (
            <div className="flex items-center gap-2 flex-wrap">
              {skills.map((skill) => (
                <Badge key={skill} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          ) : (
            <span className="text-sm text-muted-foreground">
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
