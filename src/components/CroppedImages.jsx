import React, { useContext } from "react";
import { TopBar } from "./TopBar";
import { Imagecontext } from "../utils/ContextApi";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
export const CroppedImages = () => {
  let { croppedImages, setCurrentImage } = useContext(Imagecontext);
  let navigate = useNavigate();
  let handlePaint = (e) => {
    setCurrentImage(e);
    navigate("/paintimage");
  };
  return (
    <>
      <TopBar></TopBar>
      <h3 className="mt-5 mb-3 text-center text-2xl font-bold text-gray-800">
        Cropped Images Gallery
      </h3>
      {croppedImages.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4  ml-5 mt-10">
            {croppedImages.map((e, i) => {
              return (
                <div key={i}>
                  <img
                    src={e}
                    alt="Image 1"
                    width={200}
                    height={500}
                    className="rounded-lg shadow-lg  h-64 object-cover "
                  />
                  <button
                    onClick={() => {
                      handlePaint(e);
                    }}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-1"
                  >
                    paint image
                  </button>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center justify-center">
            <ClipLoader color={"#123abc"} loading={true} size={50} />
            <span className="ml-2 text-gray-600">
              currently Gallery is empty
            </span>
          </div>
        </>
      )}
    </>
  );
};
