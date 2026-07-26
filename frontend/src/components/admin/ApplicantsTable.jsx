import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover";

import { MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";

import { APPLICATION_API_END_POINT } from "@/utils/constant";

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.application);

  const statusHandler = async (status, id) => {
    try {
      axios.defaults.withCredentials = true;

      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/status/${id}/update`,
        { status }
      );

      if (res.data.success) {
        toast.success(res.data.message);

        // Refresh page after updating status
        window.location.reload();
      }
    } catch (error) {
      console.log(error);

      toast.error(
        error?.response?.data?.message ||
          "Failed to update application status"
      );
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <Table>
        <TableCaption>List of Applicants</TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>Full Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Applied Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {applicants?.applications?.length > 0 ? (
            applicants.applications.map((item) => (
              <TableRow key={item._id}>
                <TableCell>
                  {item?.applicant?.fullname}
                </TableCell>

                <TableCell>
                  {item?.applicant?.email}
                </TableCell>

                <TableCell>
                  {item?.applicant?.phoneNumber}
                </TableCell>

                <TableCell>
                  {item?.applicant?.profile?.resume ? (
                    <a
                      href={item.applicant.profile.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {item.applicant.profile.resumeOriginalName}
                    </a>
                  ) : (
                    <span className="text-gray-500">
                      No Resume
                    </span>
                  )}
                </TableCell>

                <TableCell>
                  {item?.createdAt?.split("T")[0]}
                </TableCell>

                <TableCell>
                  <span
                    className={`font-semibold ${
                      item.status === "accepted"
                        ? "text-green-600"
                        : item.status === "rejected"
                        ? "text-red-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {item.status.toUpperCase()}
                  </span>
                </TableCell>

                <TableCell className="text-right">
                  {item.status === "pending" ? (
                    <Popover>
                      <PopoverTrigger asChild>
                        <MoreHorizontal className="cursor-pointer" />
                      </PopoverTrigger>

                      <PopoverContent className="w-36">
                        {shortlistingStatus.map((status) => (
                          <div
                            key={status}
                            onClick={() =>
                              statusHandler(status, item._id)
                            }
                            className="cursor-pointer rounded-md px-2 py-2 hover:bg-gray-100"
                          >
                            {status}
                          </div>
                        ))}
                      </PopoverContent>
                    </Popover>
                  ) : (
                    <span className="text-gray-500">
                      Updated
                    </span>
                  )}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={7}
                className="text-center py-6 text-gray-500"
              >
                No Applicants Found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;