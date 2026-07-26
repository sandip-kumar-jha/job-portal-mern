import React, { useState } from "react";
import Navbar from "./shared/Navbar";

import {
    Avatar,
    AvatarImage,
    AvatarFallback
} from "./ui/avatar";

import { Button } from "./ui/button";

import {
    Contact,
    Mail,
    Pen,
    FileText
} from "lucide-react";

import { Badge } from "./ui/badge";
import { Label } from "./ui/label";

import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";

import { useSelector } from "react-redux";

import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";



const Profile = () => {


    useGetAppliedJobs();


    const [open,setOpen] = useState(false);


    const {user} = useSelector(store=>store.auth);



    const skills = user?.profile?.skills || [];



    return (

        <div className="bg-gray-50 min-h-screen">


            <Navbar />



            {/* Profile Card */}


            <div className="
                max-w-4xl
                mx-auto
                bg-white
                border
                rounded-2xl
                mt-8
                p-6
                md:p-8
                shadow-sm
            ">



                <div className="
                    flex
                    justify-between
                    items-start
                ">



                    <div className="
                        flex
                        items-center
                        gap-5
                    ">



                        <Avatar className="h-24 w-24">


                            <AvatarImage

                                src={
                                    user?.profile?.profilePhoto
                                    ||
                                    ""
                                }

                            />


                            <AvatarFallback>

                                {
                                    user?.fullname
                                    ?.charAt(0)
                                    ||
                                    "U"
                                }

                            </AvatarFallback>


                        </Avatar>




                        <div>


                            <h1 className="
                                text-2xl
                                font-bold
                            ">

                                {
                                    user?.fullname
                                }

                            </h1>



                            <p className="
                                text-gray-500
                                mt-1
                            ">

                                {
                                    user?.profile?.bio
                                    ||
                                    "Add your bio"
                                }

                            </p>


                        </div>



                    </div>




                    <Button

                        onClick={()=>setOpen(true)}

                        variant="outline"

                        size="icon"

                    >

                        <Pen/>

                    </Button>



                </div>






                {/* Contact Details */}


                <div className="mt-8 space-y-3">


                    <div className="
                        flex
                        items-center
                        gap-3
                    ">

                        <Mail className="text-purple-600"/>

                        <span>
                            {user?.email}
                        </span>

                    </div>




                    <div className="
                        flex
                        items-center
                        gap-3
                    ">


                        <Contact className="text-purple-600"/>

                        <span>
                            {user?.phoneNumber || "NA"}
                        </span>


                    </div>



                </div>






                {/* Skills */}


                <div className="mt-8">


                    <h2 className="
                        font-bold
                        text-lg
                        mb-3
                    ">

                        Skills

                    </h2>



                    <div className="
                        flex
                        flex-wrap
                        gap-2
                    ">


                        {

                            skills.length > 0 ?

                            skills.map((skill,index)=>(

                                <Badge key={index}>

                                    {skill}

                                </Badge>

                            ))

                            :

                            <span className="text-gray-500">
                                No skills added
                            </span>

                        }


                    </div>



                </div>






                {/* Resume */}


                <div className="mt-8">


                    <Label className="
                        font-bold
                        text-lg
                    ">

                        Resume

                    </Label>




                    {

                        user?.profile?.resume ?

                        <div className="flex items-center gap-2 mt-3">


                            <FileText className="text-purple-600"/>


                            <a

                                target="_blank"

                                rel="noopener noreferrer"

                                href={user.profile.resume}

                                className="
                                    text-blue-600
                                    hover:underline
                                "

                            >

                                {
                                    user?.profile?.resumeOriginalName
                                    ||
                                    "View Resume"
                                }


                            </a>


                        </div>


                        :

                        <p className="text-gray-500 mt-2">
                            No resume uploaded
                        </p>

                    }



                </div>



            </div>








            {/* Applied Jobs */}


            <div className="
                max-w-4xl
                mx-auto
                mt-8
                bg-white
                rounded-2xl
                p-6
                shadow-sm
            ">


                <h1 className="
                    font-bold
                    text-xl
                    mb-5
                ">

                    Applied Jobs

                </h1>



                <AppliedJobTable />



            </div>






            <UpdateProfileDialog

                open={open}

                setOpen={setOpen}

            />



        </div>

    )

}


export default Profile;