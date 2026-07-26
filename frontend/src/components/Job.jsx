import React from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";


const Job = ({job}) => {


    const navigate = useNavigate();



    const daysAgoFunction = (mongodbTime) => {

        if(!mongodbTime) return "";

        const createdAt = new Date(mongodbTime);

        const currentTime = new Date();

        const timeDifference = currentTime - createdAt;

        return Math.floor(
            timeDifference / (1000 * 24 * 60 * 60)
        );

    };



    return (

        <div className="
            p-6
            rounded-xl
            shadow-md
            bg-white
            border
            hover:shadow-xl
            transition
            duration-300
        ">


            {/* Top Section */}

            <div className="
                flex
                items-center
                justify-between
            ">


                <p className="text-sm text-gray-500">

                    {
                        daysAgoFunction(job?.createdAt) === 0
                        ?
                        "Today"
                        :
                        `${daysAgoFunction(job?.createdAt)} days ago`
                    }

                </p>



                <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full hover:bg-purple-100"
                >

                    <Bookmark className="h-5 w-5"/>

                </Button>


            </div>




            {/* Company Details */}


            <div className="
                flex
                items-center
                gap-4
                mt-5
            ">


                <Avatar className="h-14 w-14 border">

                    <AvatarImage 
                        src={job?.company?.logo}
                    />


                    <AvatarFallback>
                        {
                            job?.company?.name
                            ?.charAt(0)
                            ||
                            "C"
                        }
                    </AvatarFallback>


                </Avatar>



                <div>


                    <h1 className="font-semibold text-lg">

                        {
                            job?.company?.name 
                            ||
                            "Company"
                        }

                    </h1>


                    <p className="text-sm text-gray-500">

                        {
                            job?.location
                            ||
                            "India"
                        }

                    </p>


                </div>


            </div>




            {/* Job Information */}


            <div className="mt-5">


                <h1 className="
                    font-bold
                    text-xl
                    text-gray-800
                ">

                    {job?.title}


                </h1>



                <p className="
                    text-sm
                    text-gray-600
                    mt-2
                    line-clamp-3
                ">

                    {job?.description}


                </p>


            </div>




            {/* Tags */}


            <div className="
                flex
                flex-wrap
                gap-2
                mt-5
            ">


                <Badge 
                    variant="outline"
                    className="text-blue-600 font-semibold"
                >

                    {job?.position || 0} Positions

                </Badge>



                <Badge 
                    variant="outline"
                    className="text-orange-600 font-semibold"
                >

                    {job?.jobType || "Full Time"}

                </Badge>



                <Badge 
                    variant="outline"
                    className="text-purple-600 font-semibold"
                >

                    {job?.salary || "0"} LPA

                </Badge>


            </div>




            {/* Buttons */}


            <div className="
                flex
                gap-3
                mt-6
            ">


                <Button

                    onClick={()=>
                        navigate(`/description/${job?._id}`)
                    }

                    variant="outline"

                    className="
                        flex-1
                    "

                >

                    View Details

                </Button>



                <Button

                    className="
                        flex-1
                        bg-[#7209b7]
                        hover:bg-purple-800
                    "

                >

                    Save Job

                </Button>


            </div>


        </div>

    )

}


export default Job;