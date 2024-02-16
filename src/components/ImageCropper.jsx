import { useRef, useContext, useEffect } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { Imagecontext } from "../utils/ContextApi";
import { useNavigate } from "react-router-dom";
import { TopBar } from "./TopBar";
import { toast } from "react-toastify";

const ImageCropper = () => {
  let { image, croppedImages, setCroppedImages } = useContext(Imagecontext);
  const cropperRef = useRef(null);
  let navigate = useNavigate();

  const getCroppedImage = () => {
    const cropper = cropperRef.current?.cropper;
    let temp = [...croppedImages];
    temp.push(cropper.getCroppedCanvas().toDataURL());
    setCroppedImages(temp);
    toast.success("Image cropped successfully");
    navigate("/");
  };

  return (
    <>
      <TopBar></TopBar>

      <div className="container mt-2 ">
        <h3 className="text-xl font-semibold text-gray-800 mt-4 ">
          Crop Your Image
        </h3>
        <div className=" mt-2 ">
          <Cropper
            ref={cropperRef}
            src={image}
            style={{ height: "25%", width: "25%" }}
            guides={false}
          />
          <button
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={getCroppedImage}
          >
            Crop Image
          </button>
        </div>
      </div>
    </>
  );
};

export default ImageCropper;
