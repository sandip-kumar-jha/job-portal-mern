import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "./ui/dialog";

import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

import { Loader2 } from "lucide-react";

import {
    useDispatch,
    useSelector
} from "react-redux";

import axios from "axios";

import { USER_API_END_POINT } from "@/utils/constant";

import { setUser } from "@/redux/authSlice";

import { toast } from "sonner";



const UpdateProfileDialog = ({open,setOpen}) => {


    const dispatch = useDispatch();


    const {user} = useSelector(store=>store.auth);



    const [loading,setLoading] = useState(false);



    const [input,setInput] = useState({

        fullname:user?.fullname || "",

        email:user?.email || "",

        phoneNumber:user?.phoneNumber || "",

        bio:user?.profile?.bio || "",

        skills:user?.profile?.skills?.join(", ") || "",

        file:null

    });





    const changeEventHandler = (e)=>{

        setInput({

            ...input,

            [e.target.name]:e.target.value

        });

    };






    const fileChangeHandler = (e)=>{

        const file = e.target.files?.[0];


        setInput({

            ...input,

            file:file

        });

    };







    const submitHandler = async(e)=>{


        e.preventDefault();


        const formData = new FormData();



        formData.append(
            "fullname",
            input.fullname
        );


        formData.append(
            "email",
            input.email
        );


        formData.append(
            "phoneNumber",
            input.phoneNumber
        );


        formData.append(
            "bio",
            input.bio
        );



        formData.append(

            "skills",

            JSON.stringify(
                input.skills
                .split(",")
                .map(skill=>skill.trim())
                .filter(skill=>skill)
            )

        );



        if(input.file){

            formData.append(
                "file",
                input.file
            );

        }





        try{


            setLoading(true);



            const res = await axios.post(

                `${USER_API_END_POINT}/profile/update`,

                formData,

                {

                    headers:{

                        "Content-Type":
                        "multipart/form-data"

                    },

                    withCredentials:true

                }

            );



            if(res.data.success){


                dispatch(
                    setUser(res.data.user)
                );


                toast.success(
                    res.data.message
                );


                setOpen(false);


            }



        }
        catch(error){


            console.log(error);


            toast.error(

                error?.response?.data?.message

                ||

                "Profile update failed"

            );


        }
        finally{


            setLoading(false);


        }


    };






    return (

        <Dialog

            open={open}

            onOpenChange={setOpen}

        >


            <DialogContent className="sm:max-w-[500px]">


                <DialogHeader>


                    <DialogTitle>

                        Update Profile

                    </DialogTitle>


                </DialogHeader>





                <form onSubmit={submitHandler}>


                    <div className="
                        grid
                        gap-5
                        py-5
                    ">



                        {/* Full Name */}

                        <div className="
                            grid
                            grid-cols-4
                            items-center
                            gap-4
                        ">


                            <Label>

                                Name

                            </Label>


                            <Input

                                name="fullname"

                                value={input.fullname}

                                onChange={changeEventHandler}

                                className="col-span-3"

                            />


                        </div>







                        {/* Email */}


                        <div className="
                            grid
                            grid-cols-4
                            items-center
                            gap-4
                        ">


                            <Label>

                                Email

                            </Label>


                            <Input

                                name="email"

                                type="email"

                                value={input.email}

                                onChange={changeEventHandler}

                                className="col-span-3"

                            />


                        </div>








                        {/* Phone */}



                        <div className="
                            grid
                            grid-cols-4
                            items-center
                            gap-4
                        ">


                            <Label>

                                Phone

                            </Label>


                            <Input

                                name="phoneNumber"

                                value={input.phoneNumber}

                                onChange={changeEventHandler}

                                className="col-span-3"

                            />


                        </div>







                        {/* Bio */}



                        <div className="
                            grid
                            grid-cols-4
                            items-center
                            gap-4
                        ">


                            <Label>

                                Bio

                            </Label>


                            <Input

                                name="bio"

                                value={input.bio}

                                onChange={changeEventHandler}

                                className="col-span-3"

                                placeholder="Write something about yourself"

                            />


                        </div>







                        {/* Skills */}



                        <div className="
                            grid
                            grid-cols-4
                            items-center
                            gap-4
                        ">


                            <Label>

                                Skills

                            </Label>


                            <Input

                                name="skills"

                                value={input.skills}

                                onChange={changeEventHandler}

                                className="col-span-3"

                                placeholder="React, JavaScript, Node.js"

                            />


                        </div>







                        {/* Resume */}



                        <div className="
                            grid
                            grid-cols-4
                            items-center
                            gap-4
                        ">


                            <Label>

                                Resume

                            </Label>


                            <Input

                                name="file"

                                type="file"

                                accept="application/pdf"

                                onChange={fileChangeHandler}

                                className="col-span-3"

                            />


                        </div>




                    </div>







                    <DialogFooter>


                        {

                            loading ?


                            <Button

                                disabled

                                className="w-full"

                            >

                                <Loader2 
                                    className="
                                    mr-2
                                    h-4
                                    w-4
                                    animate-spin
                                    "
                                />

                                Please wait...


                            </Button>


                            :


                            <Button

                                type="submit"

                                className="
                                w-full
                                bg-purple-600
                                hover:bg-purple-700
                                "

                            >

                                Update Profile


                            </Button>


                        }


                    </DialogFooter>




                </form>



            </DialogContent>



        </Dialog>

    )

}


export default UpdateProfileDialog;