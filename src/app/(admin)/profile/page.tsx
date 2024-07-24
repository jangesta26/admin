import { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import ProfileBackgroundImage from "./component/ProfileBackgroundImage";
import ProfileAvatar from "@/components/Avatar/ProfileAvatar";
import About from "./component/About";
import SocialMedia from "./component/SocialMedia";
import Review from "./component/Review";
import EditButton from "./component/EditButton";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Admin | Profile",
  description:
    "This is the profile for admin",
};

const Profile = () => {
  return (
      <div className="mx-auto max-w-full">
        <Breadcrumb pageName="Profile" />

        <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <ProfileBackgroundImage />
          <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
            <div className="relative z-30 mx-auto -mt-22 h-30 w-full max-w-30 rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3">
              <ProfileAvatar />
             
            </div>
          
            <div className="mt-4">
              <h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white">
                Danish Heilium
              </h3>
                <Link
                 href={`settings/account_details/${1}?id=${1}`}
                 className="flex items-center justify-center">
                  <EditButton />
                </Link>
                <Review />
                <About/>
                <SocialMedia />
            </div>
          </div>
        </div>
      </div>
  );
};

export default Profile;
