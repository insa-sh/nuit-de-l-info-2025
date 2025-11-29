"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { Physics2DPlugin } from "gsap/Physics2DPlugin";

export default function Page() {
  gsap.registerPlugin(ScrollTrigger);
  gsap.registerPlugin(Draggable);
  gsap.registerPlugin(InertiaPlugin);
  gsap.registerPlugin(Physics2DPlugin);

  useGSAP(() => {
    Draggable.create("#ball", {
      //   type: "y",
      bounds: document.getElementById("part-1")!,
      inertia: false,
      onClick: function () {
        console.log("clicked");
      },
      onDragEnd: function () {
        console.log("drag ended");
        if (this.hitTest("#win-area", "50%")) {
          console.log("Hit part 2");
        } else {
          gsap.to(this.target, {
            x: 0,
            y: 0,
            duration: 2,
            ease: "elastic.out(1, 0.3)",
          });
        }
      },
    });

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

    tl.to("#carre-1", {
      x: -1000,
      ease: "power1.inOut",
      duration: 1,
    });

    tl.to(
      "#carre-2",
      {
        x: +1000,
        ease: "power1.inOut",
        duration: 1,
      },
      "<"
    );

    gsap.to("#particle", {
      scrollTrigger: {
        trigger: "#part-3",
        start: "top center",
      },
      stagger: 0.2,
      duration: 5,
      physics2D: {
        velocity: 600,
        angle: -60,
        gravity: 800,
        friction: 0.1,
      },
    });
  }, []);

  return (
    <div>
      <div id="part-1" className="h-screen bg-blue-300">
        <div
          id="ball"
          className="rounded-4xl h-20 w-20 bg-blue-700 z-10 absolute "
        ></div>
        <div
          id="win-area"
          className="absolute top-0 right-0 w-50 h-full bg-green-400 z-1"
        ></div>
      </div>
      <div
        id="part-2"
        className="h-screen bg-amber-50 flex flex-row items-center justify-center gap-30"
      >
        <div id="carre-1" className="h-30 w-30 bg-purple-700"></div>
        <div id="carre-2" className="h-30 w-30 bg-red-700"></div>
      </div>
      <div id="part-3" className="h-screen overflow-hidden bg-green-200">
        <div id="particle" className="bg-black w-10 h-10 rounded-4xl"></div>
        <div id="particle" className="bg-black w-10 h-10 rounded-4xl"></div>
        <div id="particle" className="bg-black w-10 h-10 rounded-4xl"></div>
        <div id="particle" className="bg-black w-10 h-10 rounded-4xl"></div>
        <div id="particle" className="bg-black w-10 h-10 rounded-4xl"></div>
        <div id="particle" className="bg-black w-10 h-10 rounded-4xl"></div>
        <div id="particle" className="bg-black w-10 h-10 rounded-4xl"></div>
      </div>
    </div>
  );
}
