import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, User2, Briefcase } from "lucide-react";

import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover";
import { Avatar, AvatarImage } from "../ui/avatar";

import { USER_API_END_POINT } from "../../utils/constant";
import { logoutUser } from "../../redux/authSlice";
import { toast } from "sonner";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(
        `${USER_API_END_POINT}/logout`,
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(logoutUser());
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Logout Failed"
      );
    }
  };

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto h-16 px-5 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <Briefcase className="text-[#6A38C2]" size={28} />
          <h1 className="text-2xl font-bold">
            Job<span className="text-[#6A38C2]">Portal</span>
          </h1>
        </Link>

        <div className="flex items-center gap-8">

          <ul className="flex items-center gap-6 font-medium">

            {user?.role === "recruiter" ? (
              <>
                <li>
                  <NavLink to="/admin/companies">
                    Companies
                  </NavLink>
                </li>

                <li>
                  <NavLink to="/admin/jobs">
                    Jobs
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink to="/">Home</NavLink>
                </li>

                <li>
                  <NavLink to="/jobs">Jobs</NavLink>
                </li>

                <li>
                  <NavLink to="/browse">Browse</NavLink>
                </li>
              </>
            )}

          </ul>

          {!user ? (
            <div className="flex gap-3">

              <Link to="/login">
                <Button variant="outline">
                  Login
                </Button>
              </Link>

              <Link to="/signup">
                <Button className="bg-[#6A38C2] hover:bg-[#5b30ad]">
                  Signup
                </Button>
              </Link>

            </div>
          ) : (

            <div className="flex items-center gap-3">

              <Popover>

                <PopoverTrigger asChild>

                  <Avatar className="cursor-pointer">

                    <AvatarImage
                      src={
                        user?.profile?.profilePhoto ||
                        `https://ui-avatars.com/api/?name=${user?.fullname}&background=6A38C2&color=fff`
                      }
                    />

                  </Avatar>

                </PopoverTrigger>

                <PopoverContent className="w-80">

                  <div className="flex gap-3">

                    <Avatar>

                      <AvatarImage
                        src={
                          user?.profile?.profilePhoto ||
                          `https://ui-avatars.com/api/?name=${user?.fullname}&background=6A38C2&color=fff`
                        }
                      />

                    </Avatar>

                    <div>

                      <h2 className="font-semibold">
                        {user?.fullname}
                      </h2>

                      <p className="text-sm text-gray-500">
                        {user?.profile?.bio || "Welcome to Job Portal"}
                      </p>

                    </div>

                  </div>

                  {user?.role === "student" && (

                    <Link
                      to="/profile"
                      className="flex items-center gap-2 mt-4"
                    >
                      <User2 size={18} />
                      <span>View Profile</span>
                    </Link>

                  )}

                  <div
                    onClick={logoutHandler}
                    className="flex items-center gap-2 mt-4 cursor-pointer text-red-500"
                  >
                    <LogOut size={18} />
                    <span>Logout</span>
                  </div>

                </PopoverContent>

              </Popover>

              {/* Direct Logout Button */}

              <Button
                onClick={logoutHandler}
                variant="destructive"
              >
                Logout
              </Button>

            </div>

          )}

        </div>

      </div>
    </header>
  );
};

export default Navbar;