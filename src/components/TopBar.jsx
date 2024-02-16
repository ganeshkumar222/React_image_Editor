import { useNavigate } from "react-router-dom";

export const TopBar = () => {
  let navigate = useNavigate();
  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <a
              className="flex items-center"
              onClick={() => {
                navigate("/");
              }}
            >
              <span className="text-white text-lg font-semibold ml-2">
                React Image Editor
              </span>
            </a>
          </div>
          <a
            onClick={() => {
              navigate("/cropped");
            }}
          >
            <span className="text-white text-lg font-semibold ml-2">
              Cropped Images
            </span>
          </a>
          <a
            onClick={() => {
              navigate("/painted");
            }}
          >
            <span className="text-white text-lg font-semibold ml-2">
              Painted Images
            </span>
          </a>
        </div>
      </div>
    </nav>
  );
};
