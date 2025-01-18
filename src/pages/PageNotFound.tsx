import React from "react";
import notFound from "@/assets/notFound.svg"; // Adjust the path to your actual SVG file

const PageNotFound: React.FC = () => {
  return (
    <div className="flex items-center justify-center w-full h-screen bg-gray-100">
      <div className="text-center">
        {/* Render the SVG */}
        <img
          src={notFound}
          alt="Page Not Found"
          className="w-1/2 max-w-md mx-auto mb-8"
        />
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Page Not Found</h1>
        <p className="text-lg text-gray-600">
          Sorry, the page you're looking for doesn't exist.
        </p>
      </div>
    </div>
  );
};

export default PageNotFound;
