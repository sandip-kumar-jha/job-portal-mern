import React, { useEffect, useState } from "react";
import {
    RadioGroup,
    RadioGroupItem
} from "./ui/radio-group";

import { Label } from "./ui/label";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";


const filterData = [
    {
        filterType: "Location",
        array: [
            "Delhi NCR",
            "Bangalore",
            "Hyderabad",
            "Pune",
            "Mumbai"
        ]
    },

    {
        filterType: "Industry",
        array: [
            "Frontend Developer",
            "Backend Developer",
            "Full Stack Developer",
            "Data Analyst"
        ]
    },

    {
        filterType: "Salary",
        array: [
            "0-40k",
            "40k-1 lakh",
            "1 lakh-5 lakh"
        ]
    },
];


const FilterCard = () => {


    const [selectedValue,setSelectedValue] = useState("");

    const dispatch = useDispatch();



    const changeHandler = (value)=>{

        setSelectedValue(value);

    };



    useEffect(()=>{

        dispatch(setSearchedQuery(selectedValue));


    },[selectedValue,dispatch]);



    return (

        <div className="
            w-full
            bg-white
            rounded-xl
            shadow-sm
            border
            p-5
        ">


            <h1 className="
                font-bold
                text-xl
            ">
                Filter Jobs
            </h1>


            <hr className="my-4"/>



            <RadioGroup
                value={selectedValue}
                onValueChange={changeHandler}
            >


                {
                    filterData.map((data,index)=>(


                        <div key={index} className="mb-5">


                            <h2 className="
                                font-semibold
                                text-lg
                                mb-3
                            ">
                                {data.filterType}
                            </h2>



                            {
                                data.array.map((item,idx)=>{


                                    const itemId=`${index}-${idx}`;


                                    return (

                                        <div
                                            key={itemId}
                                            className="
                                                flex
                                                items-center
                                                space-x-3
                                                my-3
                                            "
                                        >


                                            <RadioGroupItem
                                                value={item}
                                                id={itemId}
                                            />


                                            <Label
                                                htmlFor={itemId}
                                                className="
                                                    cursor-pointer
                                                    text-gray-700
                                                "
                                            >

                                                {item}

                                            </Label>


                                        </div>

                                    )

                                })
                            }



                        </div>


                    ))
                }


            </RadioGroup>


        </div>

    )
}


export default FilterCard;