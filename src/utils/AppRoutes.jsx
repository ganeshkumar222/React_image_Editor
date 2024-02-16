import { CroppedImages } from "../components/CroppedImages";
import { Homepage } from "../components/Homepage";

import ImageCropper from "../components/ImageCropper";
import ImagePainter from "../components/ImagePainter";
import { PaintedImages } from "../components/PaintedImages";

import { ContextApi } from "./ContextApi";

const AppRoutes = [
  {
    path: "/",
    element: (
      <ContextApi>
        <Homepage></Homepage>
      </ContextApi>
    ),
  },
  {
    path: "/imagecropper",
    element: (
      <ContextApi>
        <ImageCropper></ImageCropper>
      </ContextApi>
    ),
  },
  {
    path: "/paintimage",
    element: (
      <ContextApi>
        <ImagePainter></ImagePainter>
      </ContextApi>
    ),
  },
  {
    path: "/cropped",
    element: (
      <ContextApi>
        <CroppedImages></CroppedImages>
      </ContextApi>
    ),
  },
  {
    path: "/painted",
    element: (
      <ContextApi>
        <PaintedImages></PaintedImages>
      </ContextApi>
    ),
  },
];

export default AppRoutes;
