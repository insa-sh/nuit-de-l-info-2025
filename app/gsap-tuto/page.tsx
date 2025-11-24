"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Page() {
  gsap.registerPlugin(ScrollTrigger);

  useGSAP(() => {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#part-2",
        start: "top top",
        // end: "bottom center",
        toggleActions: "play none reverse none",
        onEnter: () => console.log("Entered part 2"),
        onLeave: () => console.log("Left part 2"),
        onEnterBack: () => console.log("Entered back part 2"),
        onLeaveBack: () => console.log("Left back part 2"),
      },
    });

    tl.to("#carre-1", {
      scale: 2,
      rotation: 360,
      ease: "power1.inOut",
      duration: 2,
    });

    tl.to(
      "#carre-2",
      {
        scale: 2,
        rotation: 360,
        ease: "power1.inOut",
        duration: 1,
      },
      "<+1"
    );
  }, []);

  return (
    <div>
      <div id="part-1" className="h-screen bg-blue-300"></div>
      <div
        id="part-2"
        className="h-screen bg-amber-50 flex flex-row items-center justify-center gap-30"
      >
        <div id="carre-1" className="h-30 w-30 bg-purple-700"></div>
        <div id="carre-2" className="h-30 w-30 bg-red-700"></div>
      </div>
      <div id="part-3" className="h-screen bg-green-200"></div>
    </div>
  );
}
