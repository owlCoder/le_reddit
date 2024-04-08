import React, { useEffect } from "react";
import Navbar from "../../../components/navbar/Navbar";
import CreatePostForm from "../../../components/post/create/CreatePost";
import useAuth from "../../../contexts/use_auth/UseAuth";
import { useNavigate } from "react-router-dom";

const Create: React.FC = () => {
  const { email } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(email)
    if (email == null || email === "") {
      navigate("/");
    }
  }, [email, navigate]);
  
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
