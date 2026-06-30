import { useEffect } from "react";
import { gsap } from "gsap";

function Particles() {
  useEffect(() => {
    gsap.to(".cyber-particle", {
      x: "random(-300,300)",
      y: "random(-300,300)",

      duration: "random(1,2)",

      repeat: -1,

      yoyo: true,

      ease: "sine.inOut",

      stagger: 0.2,
    });
  }, []);

  return (
    <>
      {[...Array(10)].map((_, i) => (
        <div
          key={i}
          className="
cyber-particle
absolute
z-20
w-3
h-3
rounded-full
bg-cyan-100
blur-sm

            "
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            right: `${Math.random() * 100}%`,
            bottom: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </>
  );
}

export default Particles;
