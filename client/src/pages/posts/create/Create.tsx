import React, { useEffect, useState } from "react";
import Navbar from "../../../components/navbar/Navbar";
import CreatePostForm from "../../../components/post/create/CreatePost";
import useAuth from "../../../contexts/use_auth/UseAuth";
import { useNavigate } from "react-router-dom";

const Create: React.FC = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [pageLoaded, setPageLoaded] = useState<boolean>(false);

  useEffect(() => {
    // Set pageLoaded to true once the page is loaded
    setPageLoaded(true);
  }, []);

  useEffect(() => {
    // Check isLoggedIn only after the page is loaded
    if (pageLoaded) {
      if (!isLoggedIn && pageLoaded) {
        navigate("/");
      }
    }
  }, [pageLoaded, isLoggedIn, navigate]);
  
  return (
    <>
      <Navbar />
      <div className="bg-slate-200 py-8 h-screen" style={{overflow: 'hidden'}}>
        <CreatePostForm />
      </div>
    </>
  );
};

export default Create;
