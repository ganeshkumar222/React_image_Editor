import React, { useState } from "react";
export const Imagecontext = React.createContext();
export const ContextApi = ({ children }) => {
  let [image, setImage] = useState();
  let [croppedImages, setCroppedImages] = useState([]);
  let [paintedImages, setPaintedImages] = useState([]);
  let [currentImage, setCurrentImage] = useState();
  return (
    <>
      <Imagecontext.Provider
        value={{
          image,
          setImage,
          croppedImages,
          setCroppedImages,
          paintedImages,
          setPaintedImages,
          currentImage,
          setCurrentImage,
        }}
      >
        {children}
      </Imagecontext.Provider>
    </>
  );
};
