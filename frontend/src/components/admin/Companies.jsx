import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import CompanyTable from "./CompanyTable";
import useGetAllCompanies from "../../hooks/useGetAllCompanies";
import { setSearchCompanyByText } from "../../redux/companySlice";

const Companies = () => {
  // Fetch all companies from backend
  useGetAllCompanies();

  const [search, setSearch] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchCompanyByText(search));
  }, [search, dispatch]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">

          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search company by name..."
            className="w-full md:w-80"
          />

          <Button
            className="bg-[#6A38C2] hover:bg-[#5b30a6]"
            onClick={() => navigate("/admin/companies/create")}
          >
            + New Company
          </Button>

        </div>

        {/* Companies Table */}
        <CompanyTable />

      </div>
    </div>
  );
};

export default Companies;