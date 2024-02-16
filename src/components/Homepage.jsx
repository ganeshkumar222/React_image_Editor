import { useContext } from "react";
import "react-image-crop/dist/ReactCrop.css";
import { Imagecontext } from "../utils/ContextApi";
import { useNavigate } from "react-router-dom";
import { TopBar } from "./TopBar";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

export const Homepage = () => {
  let { image, setImage,  setCurrentImage } =
    useContext(Imagecontext);
  let navigate = useNavigate();
  let handleChange = () => {
    let file = URL.createObjectURL(event.target.files[0]);

    setImage(file);
    toast.success("file uploaded successfully");
  };
  let handlepaint = () => {
    setCurrentImage(image);

    navigate(`/paintimage`);
  };
  return (
    <>
      <TopBar></TopBar>

      <div className="w-full max-w-xs mx-auto mt-5">
        <label
          htmlFor="file-upload"
          className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-12"
        >
          Upload File
        </label>
        <input
          id="file-upload"
          type="file"
          className="hidden"
          onChange={() => {
            handleChange();
          }}
        />

        <br />
        {image ? (
          <>
            <div className="flex justify-center ">
              <div>
                <h5 className="text-lg font-light text-purple-600 mt-4 md:mt-8 ml-12">
                  Uploaded Image
                </h5>
                <img
                  src={image}
                  alt="uploadedimage"
                  width={200}
                  height={200}
                  className="rounded-lg shadow-lg mt-3 ml-10"
                />
                <br />
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-1"
                  onClick={() => {
                    navigate("/imagecropper");
                  }}
                >
                  crop image
                </button>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-1"
                  onClick={() => {
                    handlepaint();
                  }}
                >
                  paint image
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center justify-center mt-5">
              <ClipLoader color={"#123abc"} loading={true} size={50} />
              <span className="ml-2 text-gray-600">Upload an image</span>
            </div>
          </>
        )}
      </div>
    </>
  );
};
