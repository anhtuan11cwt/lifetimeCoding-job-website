import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CompaniesTable from "@/components/admin/CompaniesTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useGetAllCompanies from "@/hooks/useGetAllCompanies";
import { setSearchCompanyByText } from "@/redux/companySlice";

const Companies = () => {
  useGetAllCompanies();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { companies } = useSelector((store) => store.company);
  const [input, setInput] = useState("");

  useEffect(() => {
    dispatch(setSearchCompanyByText(input));
  }, [input, dispatch]);

  const filteredCompanies = companies.filter((company) =>
    company.name?.toLowerCase().includes(input.toLowerCase()),
  );

  return (
    <div className="max-w-6xl mx-auto my-10 px-4">
      <div className="flex items-center justify-between my-5">
        <Input
          className="w-fit"
          onChange={(e) => setInput(e.target.value)}
          placeholder="Tìm theo tên công ty"
          value={input}
        />
        <Button onClick={() => navigate("/admin/companies/create")}>
          Công ty mới
        </Button>
      </div>
      <CompaniesTable companies={filteredCompanies} />
    </div>
  );
};

export default Companies;
