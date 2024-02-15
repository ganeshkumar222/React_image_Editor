import { useContext } from "react";
import "react-image-crop/dist/ReactCrop.css";
import { Imagecontext } from "../utils/ContextApi";
import { useNavigate } from "react-router-dom";
import { TopBar } from "./TopBar";
import { toast } from "react-toastify";

export const Homepage = () => {
  let { image, setImage, croppedImages, paintedImages } =
    useContext(Imagecontext);
  let navigate = useNavigate();
  let handleChange = () => {
    let file = URL.createObjectURL(event.target.files[0]);

    setImage(file);
    toast.success("file uploaded successfully");
  };
  let handlepaint = () => {
    navigate(`/paintimage/${image}`);
  };
  let handleCroppedpaint = (source) => {
    navigate(`/paintimage/${source}`);
  };
  return (
    <>
      <TopBar></TopBar>
      <div className="container mt-5 ">
        <div className="container col-lg-4 col-sm-12">
          <input
            type="file"
            onChange={() => {
              handleChange();
            }}
            className="mt-1 form-control"
          />
        </div>

        <br />
        {image ? (
          <>
            {" "}
            <h5 className="h5 mt-5">Uploaded Image</h5>
            <img
              src={image}
              alt="uploadedimage"
              width={300}
              height={300}
              accept="image/*"
              className="image-fluid  mb-2"
            />
            <br />
            <button
              className="btn btn-primary m-1"
              onClick={() => {
                navigate("/imagecropper");
              }}
            >
              crop image
            </button>
            <button
              className="btn btn-primary m-1"
              onClick={() => {
                handlepaint();
              }}
            >
              paint image
            </button>
          </>
        ) : (
          <></>
        )}
        <br />
        {croppedImages.length > 0 ? (
          <>
            <div className="card p-4 shadow mt-3 mb-3">
              <div className="card-title">
                <h5 className="h5 text-center ">cropped Images</h5>
              </div>
              <div className="row">
                {croppedImages.map((e, i) => {
                  return (
                    <div key={i} className="col m-3">
                      <div className="text-center">
                        <img
                          src={e}
                          alt="cropped image"
                          width={200}
                          height={200}
                        />
                        <br />
                        <button
                          className="btn btn-primary mt-2"
                          onClick={() => {
                            handleCroppedpaint(e);
                          }}
                        >
                          paint image
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
        <br />
        {paintedImages.length > 0 ? (
          <>
            <div className="card p-3 shadow mt-3 mb-5">
              <div className="card-title">
                <h5 className="h5 text-center ">painted Images</h5>
              </div>
              <div className="row">
                {paintedImages.map((e, i) => {
                  return (
                    <div key={i} className="col m-3">
                      <img
                        src={e}
                        alt="painted image"
                        width={300}
                        height={300}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};
