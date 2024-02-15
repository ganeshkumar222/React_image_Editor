import { useContext, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Imagecontext } from "../utils/ContextApi";
import { TopBar } from "./TopBar";
import { toast } from "react-toastify";
function ImagePainter() {
  let { paintedImages, setPaintedImages } = useContext(Imagecontext);

  let location = useLocation();
  let imageUrl = location.pathname.split("paintimage/")[1];
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
    img.width = 400;
    img.height = 400;

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0, img.width, img.height);
    };
    img.src = imageUrl;
    img.className = "img-fluid";
  }, []);

  return (
    <>
      <TopBar></TopBar>

      <div className="container mt-2">
        <h3 className="h3 text-center mt-2">Image Painter</h3>
        <div>
          <input
            type="color"
            value={brushColor}
            onChange={(e) => setBrushColor(e.target.value)}
          />
          <input
            type="range"
            min="1"
            max="20"
            value={brushSize}
            onChange={(e) => setBrushSize(parseInt(e.target.value))}
          />

          <button className="btn btn-primary m-1" onClick={saveImage}>
            Save
          </button>
        </div>
        <canvas
          ref={canvasRef}
          onMouseDown={startPaint}
          onMouseUp={endPaint}
          onMouseMove={paint}
          style={{ border: "1px solid #000" }}
        />
      </div>
    </>
  );
}

export default ImagePainter;
