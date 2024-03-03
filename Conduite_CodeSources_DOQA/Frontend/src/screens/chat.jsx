import React, { useState } from "react";
import { Navbar } from "../components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

export const AccueilChat = () => {
  const navigate = useNavigate();
  const [userMessage, setUserMessage] = useState(null);
  const [modelAnswer, setModelAnser] = useState(null);
  const handleReturnClick = () => {
    navigate("/");
  };
  const { fileName } = useParams();
  const handleSendClick = async (e) => {
    const inputElement = document.getElementById("inputtext");
    // Clear the input field after sending
    setUserMessage(inputElement.value);
    setModelAnser(null)
    const url = `http://localhost:8000/ask/?file_path=uploads/${fileName}&question=${encodeURIComponent(
      inputElement.value
    )}`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    inputElement.value=''
    if (!response.ok) {
      throw new Error("Failed to send the question to the server");
    }

    const data = await response.json();
    console.log(data.answers[0].answer)
    setModelAnser(data.answers[0]);
  };
  return (
    <div className="flex flex-col">
      <Navbar className="w-screen" />
      <div className="bg-slate-100 flex flex-row flex-auto justify-center w-screen ">
        <div className="flex flex-auto h-full">
          <button
            onClick={handleReturnClick}
            className="Return  bg-white rounded-3xl flex-col justify-center items-center gap-2.5 inline-flex absolute w-[100px] h-[100px] top-[138px] left-[38px]">
            <FontAwesomeIcon
              icon={faArrowLeft}
              className="text-[#0284C7] text-2xl pr-10"
              alt="Return"
            />
          </button>
        </div>
        <div className="flex  flex-col w-full px-36 pt-12 items-start justify-between  bg-white rounded-[20px] overflow-hidden shadow-shadow h-[80vh] overflow-y-auto">
          <div className="flex-col w items-end justify-center  flex relative self-stretch w-full flex-[0_0_auto] p-5">
            <div className=" gap-[40px] flex items-center  relative self-stretch w-full flex-[0_0_auto] ">
              <div className="flex flex-col  items-center justify-center gap-[10px] relative bg-white rounded-[10px]">
                <div className=" ">
                  <div className="relative w-[38px] h-[36px]">
                    <div className="top-[8px] left-0 bg-teal-300 rotate-180 absolute w-[28px] h-[28px] rounded-[28px_28px_0px_28px]" />
                    <div className="top-0 left-[10px] bg-[#0284c766] absolute w-[28px] h-[28px] rounded-[28px_28px_0px_28px]" />
                  </div>
                </div>
              </div>
              <p className="relative w-fit font-text-2xl-leading-8-font-medium font-[number:var(--text-2xl-leading-8-font-medium-font-weight)] text-slate-700 text-[length:var(--text-2xl-leading-8-font-medium-font-size)] tracking-[var(--text-2xl-leading-8-font-medium-letter-spacing)] leading-[var(--text-2xl-leading-8-font-medium-line-height)] whitespace-nowrap [font-style:var(--text-2xl-leading-8-font-medium-font-style)]">
                Great news! Your file has been successfully processed. How can I
                assist you today?
              </p>
            </div>
            {userMessage ? (
              <div className=" gap-[0px] px-[40px] py-[16px] items-center justify-center flex relative self-stretch w-full flex-[0_0_auto] left-0">
                <div className="flex flex-col w-[40px] h-[40px] items-center justify-center gap-[10px] relative bg-rose-400 rounded-[10px] left-[-43px] ">
                  <div className="relative w-fit font-text-2xl-leading-8-font-semibold font-[number:var(--text-2xl-leading-8-font-semibold-font-weight)] text-white text-[length:var(--text-2xl-leading-8-font-semibold-font-size)] tracking-[var(--text-2xl-leading-8-font-semibold-letter-spacing)] leading-[var(--text-2xl-leading-8-font-semibold-line-height)] whitespace-nowrap [font-style:var(--text-2xl-leading-8-font-semibold-font-style)]">
                    H
                  </div>
                </div>
                <p className="relative flex-1 s text-left font-text-2xl-leading-8-font-medium font-[number:var(--text-2xl-leading-8-font-medium-font-weight)] text-slate-700 text-[length:var(--text-2xl-leading-8-font-medium-font-size)] tracking-[var(--text-2xl-leading-8-font-medium-letter-spacing)] leading-[var(--text-2xl-leading-8-font-medium-line-height)] [font-style:var(--text-2xl-leading-8-font-medium-font-style)]">
                  {userMessage}
                </p>
              </div>
            ) : (
              ""
            )}
            {modelAnswer ? (
              <div className="items-start gap-[26px]  py-[16px] flex relative self-stretch w-full flex-[0_0_auto]">
                <div className="flex flex-col w-[48px] h-[48px] items-center justify-center gap-[10px] relative bg-white rounded-[10px]">
                  <div className="relative w-[37.6px] h-[35.6px]">
                    <div className="relative w-[38px] h-[36px]">
                      <div className="top-[8px] left-0 bg-teal-300 rotate-180 absolute w-[28px] h-[28px] rounded-[28px_28px_0px_28px]" />
                      <div className="top-0 left-[10px] bg-[#0284c766] absolute w-[28px] h-[28px] rounded-[28px_28px_0px_28px]" />
                    </div>
                  </div>
                </div>
                <p className="relative flex-1 s font-text-2xl-leading-8-font-medium font-[number:var(--text-2xl-leading-8-font-medium-font-weight)] text-slate-700 text-[length:var(--text-2xl-leading-8-font-medium-font-size)] tracking-[var(--text-2xl-leading-8-font-medium-letter-spacing)] leading-[var(--text-2xl-leading-8-font-medium-line-height)] [font-style:var(--text-2xl-leading-8-font-medium-font-style)]">
                  {modelAnswer.answer}
                  <br/>
                  <br/>
                  Feel free to ask if you have any other questions!
                </p>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="flex w-full items-center gap-[20px] px-[20px] py-0 relative self-stretch  flex-[0_0_auto]">
            <input
              type="text"
              id="inputtext"
              placeholder="Your question here"
              className="m-2  font-text-2xl-leading-8-font-medium font-[number:var(--text-2xl-leading-8-font-medium-font-weight)] text-slate-400 text-[length:var(--text-2xl-leading-8-font-medium-font-size)] tracking-[var(--text-2xl-leading-8-font-medium-letter-spacing)] leading-[var(--text-2xl-leading-8-font-medium-line-height)] whitespace-nowrap [font-style:var(--text-2xl-leading-8-font-medium-font-style)] flex items-center justify-between pl-[20px] pr-[32px] py-[16px] relative flex-1 grow bg-white rounded-[10px] border border-solid border-slate-300"
            />
            <button
              onClick={handleSendClick}
              className="flex items-center justify-center p-2 rounded-full bg-white shadow-md hover:shadow-lg focus:outline-none">
              <FontAwesomeIcon
                icon={faPaperPlane}
                className="text-slate-400 text-2xl"
                alt="Send"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
