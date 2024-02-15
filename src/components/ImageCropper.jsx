import { useRef, useContext } from "react";
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
        <h3 className="h3 text-center">Crop Your Image</h3>
        <div className="cropclass">
          <Cropper
            src={image}
            style={{ height: 400, width: 400 }}
            aspectRatio={16 / 9}
            guides={true}
            cropBoxResizable={true}
            ref={cropperRef}
          />
          <button className="btn btn-primary mt-3" onClick={getCroppedImage}>
            Crop Image
          </button>
        </div>
      </div>
    </>
  );
};

export default ImageCropper;
