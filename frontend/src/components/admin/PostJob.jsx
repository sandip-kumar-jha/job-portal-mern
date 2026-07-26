import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import axios from "axios";
import { toast } from "sonner";

import { JOB_API_END_POINT } from "../../utils/constant";

const PostJob = () => {
  const navigate = useNavigate();

  const { companies } = useSelector((store) => store.company);

  const [loading, setLoading] = useState(false);

  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: "",
    companyId: "",
  });

  const changeEventHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find(
      (company) => company._id === value
    );

    if (selectedCompany) {
      setInput({
        ...input,
        companyId: selectedCompany._id,
      });
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!input.companyId) {
      return toast.error("Please select a company.");
    }

    try {
      setLoading(true);

      const payload = {
        ...input,
        position: Number(input.position),
        salary: Number(input.salary),
        experience: Number(input.experience),
      };

      const res = await axios.post(
        `${JOB_API_END_POINT}/post`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Unable to post job."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="flex justify-center py-10 px-4">

        <form
          onSubmit={submitHandler}
          className="w-full max-w-5xl bg-white rounded-xl shadow-lg p-8"
        >
          <h1 className="text-3xl font-bold mb-8">
            Post New Job
          </h1>

          <div className="grid md:grid-cols-2 gap-5">

            <div>
              <Label>Job Title</Label>
              <Input
                name="title"
                value={input.title}
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
              <Label>Requirements</Label>
              <Input
                name="requirements"
                value={input.requirements}
                onChange={changeEventHandler}
              />
            </div>

            <div>
              <Label>Salary</Label>
              <Input
                type="number"
                name="salary"
                value={input.salary}
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

            <div>
              <Label>Job Type</Label>
              <Input
                name="jobType"
                value={input.jobType}
                onChange={changeEventHandler}
                placeholder="Full Time / Part Time"
              />
            </div>

            <div>
              <Label>Experience (Years)</Label>
              <Input
                type="number"
                name="experience"
                value={input.experience}
                onChange={changeEventHandler}
              />
            </div>

            <div>
              <Label>No. of Positions</Label>
              <Input
                type="number"
                name="position"
                value={input.position}
                onChange={changeEventHandler}
              />
            </div>

            <div className="md:col-span-2">
              <Label>Select Company</Label>

              <Select onValueChange={selectChangeHandler}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose Company" />
                </SelectTrigger>

                <SelectContent>

                  <SelectGroup>

                    {companies.map((company) => (
                      <SelectItem
                        key={company._id}
                        value={company._id}
                      >
                        {company.name}
                      </SelectItem>
                    ))}

                  </SelectGroup>

                </SelectContent>

              </Select>

            </div>

          </div>

          <div className="mt-8">

            {loading ? (
              <Button
                disabled
                className="w-full bg-[#6A38C2]"
              >
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Posting Job...
              </Button>
            ) : (
              <Button
                type="submit"
                className="w-full bg-[#6A38C2] hover:bg-[#5b30a6]"
              >
                Post Job
              </Button>
            )}

          </div>

          {companies.length === 0 && (
            <p className="text-center text-red-600 mt-5 font-medium">
              Please create a company first before posting a job.
            </p>
          )}

        </form>

      </div>
    </div>
  );
};

export default PostJob;