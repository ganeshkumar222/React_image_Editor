import { Homepage } from "../components/Homepage"

import ImageCropper from "../components/ImageCropper"
import ImagePainter from "../components/ImagePainter"

import { ContextApi } from "./ContextApi"

const AppRoutes = [
    {
        path:"/",
        element:<ContextApi>
            <Homepage></Homepage>
        </ContextApi>
        
    },
    {
        path:"/imagecropper",
        element:<ContextApi>
            <ImageCropper></ImageCropper>
        </ContextApi>
       
    },
    {
        path:"/paintimage/*",
        element:<ContextApi>
           <ImagePainter></ImagePainter>
        </ContextApi>
        
    }
]


export default AppRoutes