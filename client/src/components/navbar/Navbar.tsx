import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="grid sticky top-0 z-50 min-h-[140px] w-full place-items-center overflow-x-scroll rounded-lg lg:overflow-visible -mb-20">
        <div className="m-12 max-h-[768px] w-[calc(100%+48px)] overflow-scroll p-6 -mt-8">
          <nav className="sticky top-0 z-10 block w-full max-w-full px-4 py-2 text-white bg-white border rounded-none shadow-md h-max border-white/80 bg-opacity-80 backdrop-blur-2xl backdrop-saturate-200 lg:px-8 lg:py-4">
            <div className="flex items-center justify-between text-primary-900">
              <a
                href="/"
                className="flex items-center space-x-4 rtl:space-x-reverse"
              >
                <img src="/reddit.svg" className="h-10" alt="logo" />
                <span className="self-center text-xl font-semibold whitespace-nowrap">
                  Le Reddit
                </span>
              </a>
              <div className="flex items-left gap-4">
                <div className="flex items-center gap-x-1">
                  <button
                    className="px-4 py-2 font-sans text-sm font-bold text-center text-primary-600 uppercase align-middle transition-all rounded-lg select-none hover:bg-primary-900/10 active:bg-primary-600/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none inline-block"
                    type="button"
                    onClick={() => navigate("/login")}
                  >
                    <span>Log In</span>
                  </button>
                  <button
                    className="select-none rounded-lg bg-gradient-to-tr from-primary-600 to-primary-600 py-2 px-4 text-center align-middle font-sans text-sm font-semibold uppercase text-white shadow-md shadow-primary-900/10 transition-all hover:shadow-lg hover:shadow-primary-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none inline-block"
                    type="button"
                    onClick={() => navigate("/signup")}
                  >
                    <span>Sign up</span>
                  </button>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Navbar;
