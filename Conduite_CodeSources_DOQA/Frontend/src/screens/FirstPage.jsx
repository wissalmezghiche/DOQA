import React, { useState, useEffect } from "react";
import { Navbar } from "../components/Navbar";
import DownloadIcons from "../static/img/Group.svg";
import { useNavigate } from "react-router-dom";
import Eclipse from '../static/img/Ellipse.svg'
const FirstPage = () => {
  const navigate = useNavigate();
  const [BadFile,setBadFile]=useState(false)
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [NoFile, setNoFile] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setIsFileUploaded(true);
  };

  const uploadFile = async () => {
    if (!selectedFile) {
      setNoFile(true);
      return;
    } else {
      setNoFile(false);
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch("http://localhost:8000/upload/", {
        method: "POST",
        body: formData,
      });
      
      // Handle the response as needed
      if (response.ok) {
        const fileName = selectedFile.name;
        navigate(`/ask/${fileName}`);
        
      } else {
        setBadFile(true)
      }
    } catch (error) {
      console.error("Error during file upload:", error);
    }
  };

  return (
    <div className="bg-white flex flex-row justify-center w-full ">
      <div className="relative max-w-screen-2xl mx-auto">
        
        <div className="absolute w-full h-screen  [background:linear-gradient(180deg,rgb(110,231,183)_0%,rgb(96,165,250)_100%)]" />
        <div className="absolute w-full h-screen top-0 left-0 bg-white rounded-[1200px] blur-[480px]" />
        <img
            className="absolute w-full h-screen top-0 left-0"
            alt="Ellipse"
            src={Eclipse}
        />
        <Navbar className="relative"/>
        <div className={`flex flex-col items-center gap-10 mt-12 relative ${BadFile || NoFile ? 'gap-0.5' : 'gap-10'} `}>
          <div className="text-center">
            <p className="text-5xl font-semibold text-black">
              Welcome to <span className="text-sky-600">DoQA</span>
            </p>
            <p className="text-lg text-slate-600 mt-4">
              Please upload the file you would like to base your Q/A on
            </p>
          </div>
          {BadFile && (
            <div className="text-2xl text-red-500">
              Only PDF, PNG, JPG, and JPEG files are allowed for uploading
            </div>
          )}
          {NoFile && (
            <div className="text-2xl text-red-500">
              You should select a file first
            </div>
          )}

          <div className=" inline-flex flex-col gap-[28px]">
            <div className="flex flex-col w-[450px] h-[300px] items-center justify-center gap-[20px] relative mt-[-1.00px] ml-[-1.00px] mr-[-1.00px] rounded-[20px] border border-dashed border-slate-600">
              <div className="relative w-fit [font-family:'Inter-Medium',Helvetica] font-medium text-slate-600 text-[20px] text-center tracking-[0] leading-[normal] whitespace-nowrap">
                <label
                  htmlFor="fileInput"
                  className="cursor-pointer   py-2 px-4 rounded-full flex items-center">
                  <img alt="Group" src={DownloadIcons} />
                  <input
                    type="file"
                    className="hidden"
                    id="fileInput"
                    onChange={handleFileChange}
                  />
                </label>
              </div>

              {selectedFile ? (
                <React.Fragment>
                  <div className="flex">
                    <p className="text-[#0284C7] mr-2">{selectedFile.name}</p>
                    <p className="text-[#14B8A6]">
                      {" "}
                      {(selectedFile.size / Math.pow(2, 20)).toFixed(2)} MB
                    </p>
                  </div>
                </React.Fragment>
              ) : (
                <p>Your file here</p>
              )}
            </div>
            <div lassName="flex items-center justify-center gap-[10px] px-0 py-[18px] relative self-stretch w-full flex-[0_0_auto] bg-[#b9c1cc] rounded-[8px]">
              <button
                className={`w-full max-w-md bg-[#b9c1cc] rounded-lg py-4 text-white font-medium text-2xl text-center ${
                  isFileUploaded
                    ? "bg-gradient-to-r from-green-500 to-blue-500"
                    : ""
                }`}
                onClick={uploadFile}>
                Next
              </button>   
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirstPage;
