import { useContext, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Imagecontext } from "../utils/ContextApi";
import { TopBar } from "./TopBar";
import { toast } from "react-toastify";
function ImagePainter() {
  let { paintedImages, setPaintedImages, currentImage } =
    useContext(Imagecontext);

  let navigate = useNavigate();
  const canvasRef = useRef(null);
  const [isPainting, setIsPainting] = useState(false);
  const [prevPosition, setPrevPosition] = useState({ x: 0, y: 0 });
  const [brushSize, setBrushSize] = useState(5);
  const [brushColor, setBrushColor] = useState("#000000");

  const startPaint = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    setIsPainting(true);
    setPrevPosition({ x: offsetX, y: offsetY });
  };

  const endPaint = () => {
    setIsPainting(false);
  };

  const paint = ({ nativeEvent }) => {
    if (!isPainting) return;

    const { offsetX, offsetY } = nativeEvent;
    const { x: prevX, y: prevY } = prevPosition;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.strokeStyle = brushColor;
    ctx.lineWidth = brushSize;
    ctx.lineCap = "round";

    ctx.beginPath();
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(offsetX, offsetY);
    ctx.stroke();

    setPrevPosition({ x: offsetX, y: offsetY });
  };

  const saveImage = () => {
    const canvas = canvasRef.current;
    const dataUrl = canvas.toDataURL("image/png");
    let temp = [...paintedImages];
    temp.push(dataUrl);
    setPaintedImages(temp);
    toast.success("Image painted successfully");
    navigate("/");
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.width = 300;
    img.height = 300;

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0, img.width, img.height);
    };
    img.src = currentImage;
    img.className = "img-fluid";
  }, []);

  return (
    <>
      <TopBar></TopBar>

      <div className="container mt-2">
        <h3 className="h3 text-center mt-2">Image Painter</h3>
        <div className="flex p-2">
          <div className="flex items-center mr-4 ">
            <label
              htmlFor="colorPicker"
              className="text-gray-700 font-semibold mr-4"
            >
              Choose a color:
            </label>
            <input
              type="color"
              id="colorPicker"
              value={brushColor}
              onChange={(e) => setBrushColor(e.target.value)}
              className="appearance-none block w-10 h-10 border border-gray-300 rounded-md shadow-sm focus:outline-none"
            />
          </div>

          <div className="flex items-center ml-10">
            <label htmlFor="brush" className="text-gray-700 font-semibold mr-4">
              Brush Size:
            </label>
            <input
              type="range"
              id="brush"
              value={brushSize}
              onChange={(e) => setBrushSize(parseInt(e.target.value))}
              className="appearance-none block w-64 h-3 bg-gray-200 rounded-full focus:outline-none"
            />
          </div>
        </div>
        <canvas
          ref={canvasRef}
          onMouseDown={startPaint}
          onMouseUp={endPaint}
          onMouseMove={paint}
          style={{ border: "1px solid #000" }}
          className="mt-3"
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
          onClick={saveImage}
        >
          Save
        </button>
      </div>
    </>
  );
}

export default ImagePainter;
