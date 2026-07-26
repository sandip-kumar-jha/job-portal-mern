import React from "react";
import { Briefcase, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t bg-white mt-10">
      <div className="max-w-7xl mx-auto px-6 py-10">

        <div className="grid md:grid-cols-3 gap-8">

          {/* Logo Section */}
          <div>
            <div className="flex items-center gap-2">
              <Briefcase
                className="text-[#6A38C2]"
                size={28}
              />

              <h2 className="text-2xl font-bold">
                Job<span className="text-[#6A38C2]">Portal</span>
              </h2>
            </div>

            <p className="text-gray-600 mt-3">
              Find your dream job with India's modern recruitment platform.
            </p>

            <p className="mt-4 text-sm text-gray-500">
              Developed by
            </p>

            <h3 className="font-semibold text-[#6A38C2]">
              Sandip Kumar Jha
            </h3>
          </div>


          {/* Quick Links */}
          <div>
            <h2 className="font-bold text-lg mb-4">
              Quick Links
            </h2>

            <div className="flex flex-col gap-3 text-gray-600">

              <Link
                to="/"
                className="hover:text-[#6A38C2] transition"
              >
                Home
              </Link>

              <Link
                to="/jobs"
                className="hover:text-[#6A38C2] transition"
              >
                Jobs
              </Link>

              <Link
                to="/browse"
                className="hover:text-[#6A38C2] transition"
              >
                Browse Jobs
              </Link>

              <Link
                to="/profile"
                className="hover:text-[#6A38C2] transition"
              >
                Profile
              </Link>

            </div>
          </div>


          {/* Contact Section */}
          <div>

            <h2 className="font-bold text-lg mb-4">
              Contact
            </h2>


            <div className="space-y-3">


              <a
                href="mailto:sandipjha654@gmail.com"
                className="flex items-center gap-2 hover:text-[#6A38C2]"
              >
                <Mail size={18} />
                sandipjha654@gmail.com
              </a>
<p>
              <a
                href="https://github.com/sandip-kumar-jha"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#6A38C2]"
              >
                GitHub
              </a>
</p>
<p>

              <a
                href="https://www.linkedin.com/in/sandip-kumar-jha-a88820326"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#6A38C2]"
              >
                LinkedIn
              </a>
</p>
<p>
              <a
                href="https://www.instagram.com/sandip_kumar_2525"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#6A38C2]"
              >
                Instagram
              </a>
</p>

            </div>

          </div>


        </div>


        <hr className="my-8" />


        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">

          <p>
            © {new Date().getFullYear()} JobPortal. All Rights Reserved.
          </p>


          <p className="mt-3 md:mt-0">
            Made with ❤️ by{" "}
            <span className="font-semibold text-[#6A38C2]">
              Sandip Kumar Jha
            </span>
          </p>


        </div>


      </div>
    </footer>
  );
};

export default Footer;