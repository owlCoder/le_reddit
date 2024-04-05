import React from "react";
import Navbar from "../../components/navbar/Navbar";

const Profile: React.FC = () => {

  return (
    <>
      <Navbar />
      <section className="relative flex flex-wrap lg:h-screen lg:items-center">
        <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-lg text-center">
             <h1 className="text-2xl font-bold sm:text-3xl text-primary-600">
              Sign Up
            </h1>

            <p className="mt-4 text-gray-500">
              Join us and discover endless possibilities!
            </p>
            </div>
            </div>
            </section>
    </>
  );
};

export default Profile;
