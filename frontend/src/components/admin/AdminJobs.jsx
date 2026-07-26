import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import AdminJobsTable from "./AdminJobsTable";
import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs";
import { setSearchJobByText } from "@/redux/jobSlice";

const AdminJobs = () => {
  useGetAllAdminJobs();

  const [input, setInput] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input, dispatch]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8">

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">

          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Search by job title, company or role..."
            className="w-full md:w-80"
          />

          <Button
            className="bg-[#6A38C2] hover:bg-[#5b30a6]"
            onClick={() => navigate("/admin/jobs/create")}
          >
            + Create New Job
          </Button>

        </div>

        <AdminJobsTable />

      </div>
    </div>
  );
};

export default AdminJobs;