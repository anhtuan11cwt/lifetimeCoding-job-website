import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import Breadcrumb from "@/components/shared/Breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useGetCompanyById from "@/hooks/useGetCompanyById";
import { setSingleCompany } from "@/redux/companySlice";
import { COMPANY_API_END_POINT } from "@/utils/constants";

const getInitialInput = (company) => ({
  description: company?.description || "",
  location: company?.location || "",
  name: company?.name || "",
  website: company?.website || "",
});

const CompanySetup = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useGetCompanyById(params.id);

  const { singleCompany } = useSelector((store) => store.company);
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState({});
  const [input, setInput] = useState({
    description: "",
    file: null,
    location: "",
    name: "",
    website: "",
  });
  const [logoPreview, setLogoPreview] = useState(null);

  useEffect(() => {
    return () => {
      if (logoPreview) URL.revokeObjectURL(logoPreview);
    };
  }, [logoPreview]);

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput((current) => ({ ...current, [name]: value }));
    setTouched((current) => ({ ...current, [name]: true }));
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput((current) => ({ ...current, file }));
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const resolvedInput = {
    ...getInitialInput(singleCompany),
    ...Object.fromEntries(
      Object.entries(input).filter(([key]) => key !== "file" && touched[key]),
    ),
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", resolvedInput.name);
    formData.append("description", resolvedInput.description);
    formData.append("website", resolvedInput.website);
    formData.append("location", resolvedInput.location);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      setLoading(true);
      const res = await axios.put(
        `${COMPANY_API_END_POINT}/update/${params.id}`,
        formData,
        {
          withCredentials: true,
        },
      );
      if (res.data.success) {
        dispatch(setSingleCompany(res.data.company));
        toast.success(res.data.message);
        navigate("/admin/companies");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Đã có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-5 px-6 md:px-16 lg:px-24 xl:px-32">
      <Breadcrumb
        items={[
          { label: "Trang chủ", to: "/" },
          { label: "Công ty", to: "/admin/companies" },
          { label: "Thiết lập" },
        ]}
      />

      <h1 className="mb-6 font-bold text-2xl">Thiết lập công ty</h1>

      <form className="space-y-4" onSubmit={submitHandler}>
        <div className="space-y-2">
          <Label>Tên công ty</Label>
          <Input
            disabled
            name="name"
            value={touched.name ? input.name : resolvedInput.name}
          />
        </div>
        <div className="space-y-2">
          <Label>Mô tả</Label>
          <Input
            name="description"
            onChange={changeEventHandler}
            value={
              touched.description
                ? input.description
                : resolvedInput.description
            }
          />
        </div>
        <div className="space-y-2">
          <Label>Website</Label>
          <Input
            name="website"
            onChange={changeEventHandler}
            value={touched.website ? input.website : resolvedInput.website}
          />
        </div>
        <div className="space-y-2">
          <Label>Địa điểm</Label>
          <Input
            name="location"
            onChange={changeEventHandler}
            value={touched.location ? input.location : resolvedInput.location}
          />
        </div>
        <div className="space-y-2">
          <Label>Logo</Label>
          <Input accept="image/*" onChange={changeFileHandler} type="file" />
          {(logoPreview || singleCompany?.logo) && (
            <div className="mt-2">
              <img
                alt="Logo preview"
                className="border rounded size-24 object-contain"
                src={logoPreview || singleCompany?.logo}
              />
            </div>
          )}
        </div>

        {loading ? (
          <Button className="w-full" disabled>
            Đang lưu...
          </Button>
        ) : (
          <Button className="w-full" type="submit">
            Cập nhật
          </Button>
        )}
      </form>
    </div>
  );
};

export default CompanySetup;
