import { FC } from "react"; // Importing FC (Function Component) from React
import loadingCircle from "@/assets/icons/loading-circle.svg"; // Importing the loading circle SVG
const Loader: FC = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <img
        src={loadingCircle} // Loading circle SVG
        alt="Loading"
        width={45}
        height={45}
        className="animate-spin" // Optional: Adding animation class if you want a spinning effect
      />
    </div>
  );
};

export default Loader;
