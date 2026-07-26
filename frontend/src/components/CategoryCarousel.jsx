import React from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from "./ui/carousel";

import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "@/redux/jobSlice";


const category = [
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "Data Analyst",
    "Data Scientist",
    "UI/UX Designer",
    "Graphic Designer",
    "DevOps Engineer"
];


const CategoryCarousel = () => {


    const dispatch = useDispatch();

    const navigate = useNavigate();



    const searchJobHandler = (query) => {

        dispatch(setSearchedQuery(query));

        navigate("/browse");

    };



    return (

        <div className="my-16">


            <Carousel className="w-full max-w-4xl mx-auto">


                <CarouselContent>


                    {
                        category.map((cat,index)=>(


                            <CarouselItem 
                                key={index}
                                className="
                                    md:basis-1/2
                                    lg:basis-1/3
                                "
                            >


                                <div className="flex justify-center">


                                    <Button

                                        onClick={()=>searchJobHandler(cat)}

                                        variant="outline"

                                        className="
                                            rounded-full
                                            px-6
                                            py-3
                                            hover:bg-purple-600
                                            hover:text-white
                                            transition
                                            duration-300
                                        "

                                    >

                                        {cat}


                                    </Button>


                                </div>


                            </CarouselItem>


                        ))
                    }


                </CarouselContent>



                <CarouselPrevious />

                <CarouselNext />


            </Carousel>


        </div>

    )

}


export default CategoryCarousel;