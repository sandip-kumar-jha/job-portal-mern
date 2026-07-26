import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch } from "react-redux";

import { COMPANY_API_END_POINT } from "../../utils/constant";
import { setSingleCompany } from "../../redux/companySlice";

const CompanyCreate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [companyName, setCompanyName] = useState("");
  const [loading, setLoading] = useState(false);

  const registerNewCompany = async () => {
    if (!companyName.trim()) {
      return toast.error("Company name is required");
    }

    try {
      setLoading(true);

      const res = await axios.post(
        `${COMPANY_API_END_POINT}/register`,
        { companyName },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(setSingleCompany(res.data.company));

        toast.success(res.data.message);

        navigate(`/admin/companies/${res.data.company._id}`);
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Unable to create company"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-10">

        <div className="bg-white rounded-xl shadow-md p-8">

          <h1 className="text-3xl font-bold">
            Create Your Company
          </h1>

          <p className="text-gray-500 mt-2">
            Enter your company name. You can update the
            company information later from the Company Setup
            page.
          </p>

          <div className="mt-8">

            <Label className="mb-2 block">
              Company Name
            </Label>

            <Input
              type="text"
              placeholder="Google, Microsoft, Amazon..."
              value={companyName}
              onChange={(e) =>
                setCompanyName(e.target.value)
              }
            />

          </div>

          <div className="flex items-center gap-4 mt-8">

            <Button
              variant="outline"
              onClick={() => navigate("/admin/companies")}
            >
              Cancel
            </Button>

            <Button
              onClick={registerNewCompany}
              disabled={loading}
              className="bg-[#6A38C2] hover:bg-[#5b30a6]"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Continue"
              )}
            </Button>

          </div>

        </div>

      </div>
    </div>
  );
};

export default CompanyCreate;