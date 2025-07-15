import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const loadingMessages = [
  "📥 Reading Reddit threads...",
  "🔍 Analyzing comments and patterns...",
  "🧠 Profiling personality...",
  "🎭 Shaping the persona...",
  "✨ Almost done… generating insights...",
];

export default function Loader() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % loadingMessages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[40vh] text-center animate-in fade-in-0 slide-in-from-bottom-6 duration-700">
      <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
      <AnimatePresence mode="wait">
        <motion.p
          key={step}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.4 }}
          className="text-md text-muted-foreground font-medium"
        >
          {loadingMessages[step]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
