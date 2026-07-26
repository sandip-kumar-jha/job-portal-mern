import React, { useEffect } from "react";
import Navbar from "../shared/Navbar";
import ApplicantsTable from "./ApplicantsTable";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

import { APPLICATION_API_END_POINT } from "@/utils/constant";
import { setAllApplicants } from "@/redux/applicationSlice";

const Applicants = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { applicants } = useSelector((store) => store.application);

  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const res = await axios.get(
          `${APPLICATION_API_END_POINT}/${id}/applicants`,
          {
            withCredentials: true,
          }
        );

        if (res.data.success) {
          dispatch(setAllApplicants(res.data.job));
        }
      } catch (error) {
        console.error(error);
        toast.error(
          error?.response?.data?.message ||
            "Failed to load applicants"
        );
      }
    };

    fetchAllApplicants();
  }, [id, dispatch]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8">

        <h1 className="text-2xl font-bold mb-6">
          Applicants
          <span className="text-[#6A38C2] ml-2">
            ({applicants?.applications?.length || 0})
          </span>
        </h1>

        <ApplicantsTable />

      </div>
    </div>
  );
};

export default Applicants;