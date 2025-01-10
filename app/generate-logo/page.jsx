"use client";
import React, { useContext, useEffect, useState } from "react";
import { UserDetailContext } from "../_context/UserDetailContext";
import prompt from "../_data/prompt";
import axios from "axios";
import Image from "next/image";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function GenerateLogo() {
  const { userDetail } = useContext(UserDetailContext);
  const [formData, setFormData] = useState(null);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const ToastEnoughCredits = () => {
    toast.error("No Enough Credits!!", {
      position: "top-right",
      autoClose: 3000,
    });
  };
  const ToastSuccess = () => {
    toast.success("Icon created!!", {
      position: "top-right",
      autoClose: 3000,
    });
  };
  useEffect(() => {
    if (image != null) {
      ToastSuccess();
    }
  }, [image]);
  useEffect(() => {
    if (userDetail?.credits <= 0) {
      ToastEnoughCredits();
    }
  }, [userDetail?.credits]);
  useEffect(() => {
    if (typeof window !== "undefined" && userDetail?.email) {
      const storage = localStorage.getItem("formData");
      if (storage) {
        setFormData(JSON.parse(storage));
      }
    }
  }, [userDetail]);
  useEffect(() => {
    if (formData?.title) {
      GenerateAiLogo();
    }
  }, [formData]);
  const GenerateAiLogo = async () => {
    try {
      setLoading(true);
      setError(null);
      const PROMPT = prompt.LOGO_PROMPT
        .replace("{logoTitle}", formData?.title || "")
        .replace("{logoDesc}", formData?.desc || "")
        .replace("{logoColor}", formData?.pallette || "")
        .replace("{logoDesign}", formData?.design?.title || "")
        .replace("{logoPrompt}", formData?.design?.prompt || "");
      if (userDetail?.credits > 0) {
        const result = await axios.post("/api/ai-logo-model", {
          prompt: PROMPT,
          email: userDetail?.email,
          title: formData?.title,
          desc: formData?.desc,
          credit: userDetail?.credits,
        });
        console.log(result.data);
        localStorage.removeItem("formData");
        setImage(result.data.image);
      }
    } catch (error) {
      setError("Error generating AI logo: " + error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <ToastContainer />
      {loading && (
        <div className="flex justify-center items-center">
          <div className="mx-2 w-12 h-12 border-4 border-t-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
          loading....
        </div>
      )}
      {error && (
        <div className="flex items-center justify-center">
          <p style={{ color: "red" }}>{error}</p>
        </div>
      )}
      {image ? (
        <div className="flex items-center justify-center">
          <Image
            src={image}
            alt="Generated AI Logo"
            width={300}
            height={200}
            layout="intrinsic"
          />
        </div>
      ) : (
        <p className="text-start text-2xl text-primary">No image generated yet</p>
      )}
    </div>
  );
}
export default GenerateLogo;