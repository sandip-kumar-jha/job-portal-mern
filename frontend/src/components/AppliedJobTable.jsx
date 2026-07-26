import React from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "./ui/table";

import { Badge } from "./ui/badge";
import { useSelector } from "react-redux";


const AppliedJobTable = () => {

    const { allAppliedJobs } = useSelector(store => store.job);


    const getStatusStyle = (status) => {

        if(status === "rejected"){
            return "bg-red-100 text-red-700 hover:bg-red-100";
        }

        if(status === "pending"){
            return "bg-yellow-100 text-yellow-700 hover:bg-yellow-100";
        }

        return "bg-green-100 text-green-700 hover:bg-green-100";

    };


    return (

        <div className="bg-white rounded-xl shadow-md border p-6">

            <div className="mb-5">

                <h2 className="text-2xl font-bold text-gray-800">
                    Applied Jobs
                </h2>

                <p className="text-gray-500 text-sm mt-1">
                    Track all the jobs you have applied for.
                </p>

            </div>


            <Table>

                <TableCaption>
                    A list of your applied jobs
                </TableCaption>


                <TableHeader>

                    <TableRow>

                        <TableHead>
                            Applied Date
                        </TableHead>


                        <TableHead>
                            Job Role
                        </TableHead>


                        <TableHead>
                            Company
                        </TableHead>


                        <TableHead className="text-right">
                            Application Status
                        </TableHead>


                    </TableRow>

                </TableHeader>



                <TableBody>


                    {
                        !allAppliedJobs || allAppliedJobs.length === 0 ? (

                            <TableRow>

                                <TableCell 
                                    colSpan="4"
                                    className="text-center py-10 text-gray-500"
                                >

                                    You haven't applied for any jobs yet.

                                </TableCell>

                            </TableRow>


                        ) : (


                            allAppliedJobs.map((appliedJob)=>(


                                <TableRow 
                                    key={appliedJob._id}
                                    className="hover:bg-gray-50 transition"
                                >


                                    <TableCell>

                                        {
                                            appliedJob?.createdAt
                                            ?
                                            new Date(appliedJob.createdAt)
                                            .toLocaleDateString("en-GB")
                                            :
                                            "N/A"
                                        }

                                    </TableCell>



                                    <TableCell className="font-medium">

                                        {
                                            appliedJob?.job?.title 
                                            || 
                                            "Job Removed"
                                        }

                                    </TableCell>



                                    <TableCell>

                                        {
                                            appliedJob?.job?.company?.name
                                            ||
                                            "Company Removed"
                                        }

                                    </TableCell>



                                    <TableCell className="text-right">


                                        <Badge
                                            className={`
                                                ${getStatusStyle(
                                                    appliedJob.status
                                                )}
                                                capitalize
                                                px-3
                                                py-1
                                            `}
                                        >

                                            {
                                                appliedJob?.status
                                                ?
                                                appliedJob.status
                                                :
                                                "unknown"
                                            }


                                        </Badge>


                                    </TableCell>



                                </TableRow>


                            ))

                        )
                    }


                </TableBody>


            </Table>


        </div>

    )

}


export default AppliedJobTable;