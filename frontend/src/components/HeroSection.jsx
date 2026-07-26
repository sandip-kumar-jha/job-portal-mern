import React, { useState } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";


const HeroSection = () => {

    const [query,setQuery] = useState("");

    const dispatch = useDispatch();

    const navigate = useNavigate();



    const searchJobHandler = () => {

        if(!query.trim()) return;

        dispatch(setSearchedQuery(query));

        navigate("/browse");

    };



    const handleKeyDown = (e)=>{

        if(e.key === "Enter"){

            searchJobHandler();

        }

    };



    return (

        <div className="text-center">


            <div className="
                flex
                flex-col
                gap-6
                my-14
                px-4
            ">


                <span className="
                    mx-auto
                    px-5
                    py-2
                    rounded-full
                    bg-purple-100
                    text-[#6A38C2]
                    font-semibold
                    text-sm
                ">

                    🚀 India's No.1 Job Search Platform

                </span>



                <h1 className="
                    text-4xl
                    md:text-6xl
                    font-bold
                    leading-tight
                ">

                    Search, Apply & 
                    <br/>

                    Get Your 

                    <span className="text-[#6A38C2]">
                        Dream Jobs
                    </span>

                </h1>



                <p className="
                    text-gray-500
                    max-w-2xl
                    mx-auto
                    text-lg
                ">

                    Find the best job opportunities from top companies.
                    Apply easily and build your career with confidence.

                </p>




                <div className="
                    flex
                    w-full
                    md:w-[50%]
                    shadow-lg
                    border
                    border-gray-200
                    rounded-full
                    items-center
                    gap-3
                    mx-auto
                    p-2
                    bg-white
                ">



                    <input

                        type="text"

                        value={query}

                        onChange={(e)=>setQuery(e.target.value)}

                        onKeyDown={handleKeyDown}

                        placeholder="Search jobs, skills or companies"

                        className="
                            outline-none
                            border-none
                            w-full
                            px-4
                            text-gray-700
                        "

                    />



                    <Button

                        onClick={searchJobHandler}

                        className="
                            rounded-full
                            bg-[#6A38C2]
                            hover:bg-purple-700
                            px-6
                        "

                    >

                        <Search className="h-5 w-5"/>

                    </Button>



                </div>


            </div>


        </div>

    )

}


export default HeroSection;