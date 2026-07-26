import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

import { ArrowLeft, Loader2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import axios from "axios";
import { toast } from "sonner";

import { COMPANY_API_END_POINT } from "../../utils/constant";
import useGetCompanyById from "../../hooks/useGetCompanyById";

const CompanySetup = () => {
  const { id } = useParams();

  useGetCompanyById(id);

  const navigate = useNavigate();

  const { singleCompany } = useSelector((store) => store.company);

  const [loading, setLoading] = useState(false);

  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });

  useEffect(() => {
    if (singleCompany) {
      setInput({
        name: singleCompany?.name || "",
        description: singleCompany?.description || "",
        website: singleCompany?.website || "",
        location: singleCompany?.location || "",
        file: null,
      });
    }
  }, [singleCompany]);

  const changeEventHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const changeFileHandler = (e) => {
    setInput({
      ...input,
      file: e.target.files[0],
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);

    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      setLoading(true);

      const res = await axios.put(
        `${COMPANY_API_END_POINT}/update/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/companies");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Unable to update company."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-3xl mx-auto py-10 px-4">

        <form
          onSubmit={submitHandler}
          className="bg-white shadow rounded-xl p-8"
        >
          <div className="flex items-center justify-between mb-8">

            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/admin/companies")}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>

            <h1 className="text-2xl font-bold">
              Company Setup
            </h1>

          </div>

          <div className="grid md:grid-cols-2 gap-5">

            <div>
              <Label>Company Name</Label>
              <Input
                name="name"
                value={input.name}
                onChange={changeEventHandler}
              />
            </div>

            <div>
              <Label>Description</Label>
              <Input
                name="description"
                value={input.description}
                onChange={changeEventHandler}
              />
            </div>

            <div>
              <Label>Website</Label>
              <Input
                name="website"
                value={input.website}
                onChange={changeEventHandler}
              />
            </div>

            <div>
              <Label>Location</Label>
              <Input
                name="location"
                value={input.location}
                onChange={changeEventHandler}
              />
            </div>

            <div className="md:col-span-2">
              <Label>Company Logo</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={changeFileHandler}
              />
            </div>

          </div>

          <div className="mt-8">

            {loading ? (
              <Button
                disabled
                className="w-full bg-[#6A38C2]"
              >
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating...
              </Button>
            ) : (
              <Button
                type="submit"
                className="w-full bg-[#6A38C2] hover:bg-[#5b30a6]"
              >
                Update Company
              </Button>
            )}

          </div>

        </form>

      </div>
    </div>
  );
};

export default CompanySetup;