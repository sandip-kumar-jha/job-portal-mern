import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import axios from "axios";

import {
    APPLICATION_API_END_POINT,
    JOB_API_END_POINT
} from "@/utils/constant";

import { setSingleJob } from "@/redux/jobSlice";

import {
    useDispatch,
    useSelector
} from "react-redux";

import { toast } from "sonner";


const JobDescription = () => {


    const { singleJob } = useSelector(store => store.job);

    const { user } = useSelector(store => store.auth);


    const dispatch = useDispatch();


    const { id } = useParams();



    const [isApplied,setIsApplied] = useState(false);



    const applyJobHandler = async()=>{


        if(!user){

            toast.error("Please login first");

            return;

        }


        try {


            const res = await axios.get(
                `${APPLICATION_API_END_POINT}/apply/${id}`,
                {
                    withCredentials:true
                }
            );


            if(res.data.success){


                setIsApplied(true);


                const updatedJob = {

                    ...singleJob,

                    applications:[
                        ...singleJob.applications,
                        {
                            applicant:user._id
                        }
                    ]

                };


                dispatch(setSingleJob(updatedJob));


                toast.success(res.data.message);


            }


        } catch(error){


            console.log(error);

            toast.error(
                error?.response?.data?.message 
                ||
                "Something went wrong"
            );


        }

    };





    useEffect(()=>{


        const fetchSingleJob = async()=>{


            try{


                const res = await axios.get(

                    `${JOB_API_END_POINT}/get/${id}`,

                    {
                        withCredentials:true
                    }

                );



                if(res.data.success){


                    dispatch(
                        setSingleJob(res.data.job)
                    );


                    const applied = 
                    res.data.job?.applications?.some(
                        application =>
                        application.applicant === user?._id
                    );


                    setIsApplied(applied);


                }


            }
            catch(error){

                console.log(error);

            }


        };


        fetchSingleJob();


    },[id,dispatch,user?._id]);




    return (

        <div className="
            max-w-7xl
            mx-auto
            my-10
            px-4
        ">


            <div className="
                bg-white
                rounded-xl
                shadow-md
                border
                p-8
            ">



                {/* Header */}


                <div className="
                    flex
                    justify-between
                    items-center
                    gap-5
                ">


                    <div>


                        <h1 className="
                            text-3xl
                            font-bold
                        ">

                            {singleJob?.title}

                        </h1>



                        <div className="
                            flex
                            flex-wrap
                            gap-3
                            mt-5
                        ">


                            <Badge variant="outline">

                                {singleJob?.position || 0} Positions

                            </Badge>



                            <Badge variant="outline">

                                {singleJob?.jobType}

                            </Badge>



                            <Badge variant="outline">

                                {singleJob?.salary} LPA

                            </Badge>


                        </div>


                    </div>





                    <Button

                        disabled={isApplied}

                        onClick={applyJobHandler}

                        className={`
                            px-8
                            ${
                                isApplied
                                ?
                                "bg-gray-500"
                                :
                                "bg-purple-600 hover:bg-purple-700"
                            }
                        `}

                    >

                        {
                            isApplied
                            ?
                            "Already Applied"
                            :
                            "Apply Now"
                        }


                    </Button>



                </div>






                {/* Details */}



                <div className="
                    mt-10
                    border-t
                    pt-6
                ">


                    <h2 className="
                        text-xl
                        font-bold
                        mb-5
                    ">

                        Job Description

                    </h2>



                    <div className="space-y-3">


                        <p>

                            <b>Role:</b>

                            <span className="ml-4 text-gray-700">
                                {singleJob?.title}
                            </span>

                        </p>



                        <p>

                            <b>Location:</b>

                            <span className="ml-4 text-gray-700">
                                {singleJob?.location}
                            </span>

                        </p>




                        <p>

                            <b>Description:</b>

                            <span className="ml-4 text-gray-700">
                                {singleJob?.description}
                            </span>

                        </p>




                        <p>

                            <b>Experience:</b>

                            <span className="ml-4 text-gray-700">
                                {singleJob?.experience} years
                            </span>

                        </p>




                        <p>

                            <b>Salary:</b>

                            <span className="ml-4 text-gray-700">
                                {singleJob?.salary} LPA
                            </span>

                        </p>




                        <p>

                            <b>Total Applicants:</b>

                            <span className="ml-4 text-gray-700">
                                {singleJob?.applications?.length || 0}
                            </span>

                        </p>




                        <p>

                            <b>Posted Date:</b>

                            <span className="ml-4 text-gray-700">

                                {
                                    singleJob?.createdAt
                                    ?
                                    singleJob.createdAt.split("T")[0]
                                    :
                                    "N/A"
                                }

                            </span>

                        </p>


                    </div>


                </div>



            </div>


        </div>

    )

}


export default JobDescription;