import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";

import { useSelector } from "react-redux";
import { motion } from "framer-motion";


const Jobs = () => {


    const { allJobs, searchedQuery } = useSelector(store => store.job);


    const [filterJobs,setFilterJobs] = useState([]);




    useEffect(()=>{


        if(!allJobs) return;



        if(searchedQuery){


            const filtered = allJobs.filter((job)=>{


                return (

                    job?.title
                    ?.toLowerCase()
                    .includes(
                        searchedQuery.toLowerCase()
                    )


                    ||

                    job?.description
                    ?.toLowerCase()
                    .includes(
                        searchedQuery.toLowerCase()
                    )


                    ||

                    job?.location
                    ?.toLowerCase()
                    .includes(
                        searchedQuery.toLowerCase()
                    )

                )


            });



            setFilterJobs(filtered);



        }
        else{


            setFilterJobs(allJobs);


        }



    },[allJobs,searchedQuery]);




    return (

        <div>


            <Navbar />



            <div className="
                max-w-7xl
                mx-auto
                mt-8
                px-4
            ">



                <div className="
                    flex
                    flex-col
                    md:flex-row
                    gap-6
                ">




                    {/* Filter */}


                    <div className="
                        w-full
                        md:w-[25%]
                    ">

                        <FilterCard />

                    </div>







                    {/* Jobs */}



                    <div className="
                        flex-1
                    ">


                        {
                            filterJobs.length === 0 ? (


                                <div className="
                                    flex
                                    justify-center
                                    items-center
                                    h-[50vh]
                                    text-gray-500
                                    text-lg
                                ">

                                    No jobs found


                                </div>


                            ) : (



                                <div className="
                                    grid
                                    grid-cols-1
                                    sm:grid-cols-2
                                    lg:grid-cols-3
                                    gap-5
                                    max-h-[85vh]
                                    overflow-y-auto
                                    pb-5
                                ">


                                    {

                                        filterJobs.map((job,index)=>(


                                            <motion.div

                                                key={job?._id}

                                                initial={{
                                                    opacity:0,
                                                    y:50
                                                }}

                                                animate={{
                                                    opacity:1,
                                                    y:0
                                                }}

                                                transition={{
                                                    duration:0.3,
                                                    delay:index*0.05
                                                }}

                                            >

                                                <Job job={job}/>


                                            </motion.div>



                                        ))

                                    }


                                </div>


                            )
                        }



                    </div>



                </div>


            </div>



        </div>

    )

}


export default Jobs;