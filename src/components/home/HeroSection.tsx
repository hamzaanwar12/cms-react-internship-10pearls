import React from "react";
import { motion } from "framer-motion";
import { UserPlus, Network } from "lucide-react";
import { useNavigate } from "react-router-dom";
const HeroSection: React.FC = () => {

  const navigate = useNavigate();
  const handleStart = () => {
    console.log("Get Started");
    navigate("/sign-up");
  }
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center overflow-hidden">
      {/* Floating Shapes */}
      <motion.div
        className="absolute -top-20 -right-20 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{
          opacity: [0.3, 0.5, 0.3],
          scale: [0.5, 0.7, 0.5],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute -bottom-20 -left-20 w-96 h-96 bg-green-200/30 rounded-full blur-3xl"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{
          opacity: [0.3, 0.5, 0.3],
          scale: [0.5, 0.7, 0.5],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center max-w-3xl px-4">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-bold text-gray-800 mb-6"
        >
          TouchBase
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-xl text-gray-600 mb-8"
        >
          Stay Connected. Manage Contacts Effortlessly.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex justify-center space-x-4"
        >
          <button onClick={handleStart} className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition flex items-center gap-2">
            <UserPlus size={20} />
            Get Started
          </button>
          <button className="border border-blue-500 text-blue-500 px-6 py-3 rounded-full hover:bg-blue-50 transition flex items-center gap-2">
            <Network size={20} />
            Learn More
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
