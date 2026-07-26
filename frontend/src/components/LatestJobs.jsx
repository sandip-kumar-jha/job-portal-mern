import React from "react";
import LatestJobCards from "./LatestJobCards";
import { useSelector } from "react-redux";


const LatestJobs = () => {


    const { allJobs } = useSelector(store => store.job);



    const latestJobs = allJobs
        ?.slice()
        ?.sort(
            (a,b) =>
            new Date(b.createdAt) - new Date(a.createdAt)
        )
        ?.slice(0,6);



    return (

        <div className="
            max-w-7xl
            mx-auto
            my-20
            px-4
        ">



            <h1 className="
                text-3xl
                md:text-4xl
                font-bold
            ">

                <span className="text-[#6A38C2]">
                    Latest & Top
                </span>

                {" "}Job Openings


            </h1>



            <p className="
                text-gray-500
                mt-3
            ">

                Explore the newest job opportunities from top companies.

            </p>





            <div className="
                grid
                grid-cols-1
                sm:grid-cols-2
                lg:grid-cols-3
                gap-6
                mt-8
            ">


                {

                    !latestJobs || latestJobs.length === 0 ? (


                        <div className="
                            text-gray-500
                            text-lg
                            py-10
                        ">

                            No Job Available


                        </div>


                    ) : (


                        latestJobs.map((job)=>(


                            <LatestJobCards

                                key={job._id}

                                job={job}

                            />


                        ))


                    )

                }


            </div>


        </div>

    )

}


export default LatestJobs;