import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronDown, Share2, ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import InputForm from "@/components/InputForm";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden exo">
      {/* Main Content */}
      <div className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        {/* Floating Elements */}
        {/* Left Floating: Reddit Decoder */}
        <motion.div
          className="absolute left-45 top-60 transform -translate-y-1/2"
          initial={{ x: 20, opacity: 1 }}
          animate={{
            x: 0,
            opacity: 1,
            y: [0, -10, 0, 10, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          drag
        >
          <div className="border-3 border-gray-200 rounded-full p-7 text-xl font-medium hover:bg-gray-700 transition-colors cursor-pointer">
            Reddit Decoder
          </div>
        </motion.div>

        {/* Bottom Left Floating: Documents & Diagrams */}
        <motion.div
          className="absolute left-15 bottom-40 text-xl -translate-y-1/2 bg-transparent dark:bg-zinc-900 text-gray-50 border-3 border-gray-100 p-7 rounded-[1rem] shadow-md font-medium w-fit rotate-[-4deg]"
          initial={{ y: 0, opacity: 1 }}
          animate={{
            opacity: 1,
            y: [0, 8, 0, -8, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          Documents
          <br />& Diagrams
        </motion.div>

        {/* Right Floating: AI Profiles */}
        <motion.div
          className="absolute right-50 top-110 transform -translate-y-1/2"
          initial={{ x: 20, opacity: 1 }}
          animate={{
            x: 0,
            opacity: 1,
            y: [0, -12, 0, 12, 0],
          }}
          transition={{
            duration: 5.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="border-3 border-gray-200 rounded-xl p-8 text-xl font-medium transform rotate-45 w-35 h-35 flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
            <span className="transform -rotate-45 text-center leading-tight">
              AI
              <br />
              Profiles
            </span>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="text-center max-w-8xl mx-auto flex flex-col justify-center items-center">
          <motion.h1
            className="text-6xl sm:text-7xl md:text-8xl barlow font-bold mb-8 leading-tight"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            style={{ textWrap: "balance" }}
          >
            <span className="text-[#77BDFE]">AI </span>
            Generated Personas <br />
            from Reddit
          </motion.h1>

          <motion.p
            className="text-4xl text-gray-400 mb-12 max-w-2xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            🔍 Just a username. We do the rest.
          </motion.p>

          {/* Input Form */}
          <div className="w-full max-w-md mb-8 mt-12 animate-in fade-in slide-in-from-bottom duration-700 delay-200">
            <InputForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
