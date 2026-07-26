import React, { useEffect, useState } from "react";
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

import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminJobsTable = () => {
  const { allAdminJobs, searchJobByText } = useSelector(
    (store) => store.job
  );

  const [filterJobs, setFilterJobs] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const filtered = allAdminJobs.filter((job) => {
      if (!searchJobByText) return true;

      return (
        job?.title
          ?.toLowerCase()
          .includes(searchJobByText.toLowerCase()) ||
        job?.company?.name
          ?.toLowerCase()
          .includes(searchJobByText.toLowerCase())
      );
    });

    setFilterJobs(filtered);
  }, [allAdminJobs, searchJobByText]);

  return (
    <div className="bg-white rounded-lg shadow">

      <Table>

        <TableCaption>
          Your Recently Posted Jobs
        </TableCaption>

        <TableHeader>

          <TableRow>

            <TableHead>Company</TableHead>

            <TableHead>Job Title</TableHead>

            <TableHead>Posted Date</TableHead>

            <TableHead className="text-right">
              Action
            </TableHead>

          </TableRow>

        </TableHeader>

        <TableBody>

          {filterJobs.length === 0 ? (
            <TableRow>

              <TableCell
                colSpan={4}
                className="text-center py-6 text-gray-500"
              >
                No Jobs Found
              </TableCell>

            </TableRow>
          ) : (
            filterJobs.map((job) => (
              <TableRow key={job._id}>

                <TableCell>
                  {job?.company?.name}
                </TableCell>

                <TableCell>
                  {job?.title}
                </TableCell>

                <TableCell>
                  {job?.createdAt?.split("T")[0]}
                </TableCell>

                <TableCell className="text-right">

                  <Popover>

                    <PopoverTrigger>
                      <MoreHorizontal className="cursor-pointer" />
                    </PopoverTrigger>

                    <PopoverContent className="w-36">

                      <div
                        onClick={() =>
                          navigate(`/admin/jobs/${job._id}/applicants`)
                        }
                        className="flex items-center gap-2 cursor-pointer hover:text-[#6A38C2]"
                      >
                        <Eye size={16} />
                        <span>Applicants</span>
                      </div>

                    </PopoverContent>

                  </Popover>

                </TableCell>

              </TableRow>
            ))
          )}

        </TableBody>

      </Table>

    </div>
  );
};

export default AdminJobsTable;