import { motion } from "framer-motion";
import Particles from "./Particles.jsx";

function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden  ">
      {/* Cyan Glow */}
      <motion.div
        animate={{
          x: [0, 120, -100, 0],
          y: [0, -100, 80, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="
        absolute
        top-[-180px]
        left-[-180px]
        w-[500px]
        h-[500px]
        rounded-full
        bg-cyan-800
        blur-[150px]
        "
      />

      {/* Purple Glow */}

      <motion.div
        animate={{
          x: [0, -100, 100, 0],
          y: [0, 120, -80, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
        className="
        absolute
        bottom-[-200px]
        right-[-150px]
        w-[500px]
        h-[500px]
        rounded-full
        bg-purple-950
        blur-[150px]
        "
      />

      {/* Grid */}

      <div
        className="
        absolute
        inset-0
        bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),
        linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)]
        bg-[size:40px_40px]
        "
      />

      <Particles />
    </div>
  );
}

export default AnimatedBackground;
