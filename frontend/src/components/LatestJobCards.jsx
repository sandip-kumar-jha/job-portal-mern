import React from "react";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";


const LatestJobCards = ({job}) => {


    const navigate = useNavigate();



    return (

        <div

            onClick={() => 
                navigate(`/description/${job?._id}`)
            }

            className="
                p-6
                rounded-xl
                bg-white
                border
                shadow-md
                cursor-pointer
                hover:shadow-xl
                hover:-translate-y-1
                transition
                duration-300
            "

        >



            {/* Company Info */}


            <div className="
                flex
                items-center
                gap-3
            ">


                <Avatar>

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


                    <h1 className="
                        font-semibold
                        text-lg
                    ">

                        {
                            job?.company?.name
                            ||
                            "Company"
                        }

                    </h1>


                    <p className="
                        text-sm
                        text-gray-500
                    ">

                        {
                            job?.location
                            ||
                            "India"
                        }

                    </p>


                </div>


            </div>





            {/* Job Details */}


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

                    {job?.salary || 0} LPA

                </Badge>



            </div>



        </div>

    )

}


export default LatestJobCards;