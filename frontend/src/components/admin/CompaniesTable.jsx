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

import { MoreHorizontal, Edit2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const CompanyTable = () => {
  const navigate = useNavigate();

  const { companies, searchCompanyByText } = useSelector(
    (store) => store.company
  );

  const [filterCompany, setFilterCompany] = useState([]);

  useEffect(() => {
    if (!companies) return;

    const filtered = companies.filter((company) => {
      if (!searchCompanyByText) return true;

      return company?.name
        ?.toLowerCase()
        .includes(searchCompanyByText.toLowerCase());
    });

    setFilterCompany(filtered);
  }, [companies, searchCompanyByText]);

  return (
    <div className="bg-white rounded-lg shadow">

      <Table>

        <TableCaption>
          List of Registered Companies
        </TableCaption>

        <TableHeader>

          <TableRow>

            <TableHead>Logo</TableHead>

            <TableHead>Company Name</TableHead>

            <TableHead>Website</TableHead>

            <TableHead>Location</TableHead>

            <TableHead>Created</TableHead>

            <TableHead className="text-right">
              Action
            </TableHead>

          </TableRow>

        </TableHeader>

        <TableBody>

          {filterCompany.length > 0 ? (
            filterCompany.map((company) => (
              <TableRow key={company._id}>

                <TableCell>

                  <img
                    src={
                      company?.logo ||
                      "https://via.placeholder.com/45"
                    }
                    alt={company?.name}
                    className="w-10 h-10 rounded-full object-cover border"
                  />

                </TableCell>

                <TableCell className="font-medium">
                  {company?.name}
                </TableCell>

                <TableCell>

                  {company?.website ? (
                    <a
                      href={company.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Visit
                    </a>
                  ) : (
                    <span className="text-gray-500">
                      N/A
                    </span>
                  )}

                </TableCell>

                <TableCell>
                  {company?.location || "N/A"}
                </TableCell>

                <TableCell>
                  {company?.createdAt?.split("T")[0]}
                </TableCell>

                <TableCell className="text-right">

                  <Popover>

                    <PopoverTrigger>

                      <MoreHorizontal className="cursor-pointer" />

                    </PopoverTrigger>

                    <PopoverContent className="w-32">

                      <div
                        onClick={() =>
                          navigate(
                            `/admin/companies/${company._id}`
                          )
                        }
                        className="flex items-center gap-2 cursor-pointer hover:text-[#6A38C2]"
                      >
                        <Edit2 size={16} />

                        <span>Edit</span>

                      </div>

                    </PopoverContent>

                  </Popover>

                </TableCell>

              </TableRow>
            ))
          ) : (
            <TableRow>

              <TableCell
                colSpan={6}
                className="text-center py-8 text-gray-500"
              >
                No Company Found
              </TableCell>

            </TableRow>
          )}

        </TableBody>

      </Table>

    </div>
  );
};

export default CompanyTable;