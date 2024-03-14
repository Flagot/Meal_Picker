"use client";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";

const page = () => {
  const image1Ref = useRef<HTMLImageElement>(null);
  const image2Ref = useRef<HTMLImageElement>(null);
  const image3Ref = useRef<HTMLImageElement>(null);
  const image4Ref = useRef<HTMLImageElement>(null);
  const image5Ref = useRef<HTMLImageElement>(null);
  const breakfastButtonRef = useRef<HTMLButtonElement>(null);
  const lunchButtonRef = useRef<HTMLButtonElement>(null);
  const dinnerButtonRef = useRef<HTMLButtonElement>(null);
  const snackButtonRef = useRef<HTMLButtonElement>(null);
  const drinksButtonRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();

  const handleMealClick = (mealType: string) => {
    router.push(`/meal/${mealType.toLowerCase()}`);
  };

  useEffect(() => {
    // Animate image 1 - Circle shape
    const img1 = image1Ref.current;
    if (img1) {
      gsap.set(img1, {
        x: Math.cos((0 * Math.PI) / 180) * 300,
        y: Math.sin((0 * Math.PI) / 180) * 300,
        rotation: 180,
        opacity: 0,
        scale: 0.3,
      });
      gsap.to(img1, {
        x: 0,
        y: 0,
        rotation: 0,
        opacity: 1,
        scale: 1.5,
        duration: 1,
        delay: 0 * 0.1,
        ease: "back.out(1.7)",
      });
    }

    // Animate image 2 - Rounded square
    const img2 = image2Ref.current;
    if (img2) {
      gsap.set(img2, {
        x: Math.cos((60 * Math.PI) / 180) * 300,
        y: Math.sin((60 * Math.PI) / 180) * 300,
        rotation: 240,
        opacity: 0,
        scale: 0.3,
      });
      gsap.to(img2, {
        x: 0,
        y: 0,
        rotation: 0,
        opacity: 1,
        scale: 1.5,
        duration: 1,
        delay: 1 * 0.1,
        ease: "back.out(1.7)",
      });
    }

    // Animate image 3 - More rounded
    const img3 = image3Ref.current;
    if (img3) {
      gsap.set(img3, {
        x: Math.cos((120 * Math.PI) / 180) * 300,
        y: Math.sin((120 * Math.PI) / 180) * 300,
        rotation: 300,
        opacity: 0,
        scale: 0.3,
      });
      gsap.to(img3, {
        x: 0,
        y: 0,
        rotation: 0,
        opacity: 1,
        scale: 1.5,
        duration: 1,
        delay: 2 * 0.1,
        ease: "back.out(1.7)",
      });
    }

    // Animate image 4 - Organic blob shape
    const img4 = image4Ref.current;
    if (img4) {
      gsap.set(img4, {
        x: Math.cos((180 * Math.PI) / 180) * 300,
        y: Math.sin((180 * Math.PI) / 180) * 300,
        rotation: 360,
        opacity: 0,
        scale: 0.3,
      });
      gsap.to(img4, {
        x: 0,
        y: 0,
        rotation: 0,
        opacity: 1,
        scale: 1.5,
        duration: 1,
        delay: 3 * 0.1,
        ease: "back.out(1.7)",
      });
    }

    // Animate image 5 - Drink image - Grow from bottom
    const img5 = image5Ref.current;
    if (img5) {
      gsap.set(img5, {
        y: 200,
        opacity: 0,
        scale: 0.2,
      });
      gsap.to(img5, {
        y: 0,
        opacity: 1,
        scale: 1.8,
        duration: 1,
        delay: 4 * 0.1,
        ease: "back.out(1.7)",
      });
    }

    // Animate buttons dropping one after another
    const buttons = [
      breakfastButtonRef.current,
      lunchButtonRef.current,
      dinnerButtonRef.current,
      snackButtonRef.current,
      drinksButtonRef.current,
    ];

    buttons.forEach((button, index) => {
      if (button) {
        gsap.set(button, {
          y: -100,
          opacity: 0,
        });
        gsap.to(button, {
          y: 0,
          opacity: 1,
          duration: 0.3,
          delay: index * 0.2,
          ease: "bounce.out",
        });
      }
    });
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-start h-screen gap-4 pt-30 pb-8 bg-white overflow-hidden">
      <h1 className="text-5xl font-bold text-gray-900 z-10 font-caveat">
        Pick Your Next Meal!
      </h1>
      <p className="text-lg text-gray-600 z-10  ">
        Do you struggle to decide what to eat? Let us help you.
      </p>
      <div className="flex flex-wrap gap-5 justify-center z-10 mt-4">
        <button
          ref={breakfastButtonRef}
          className="group relative bg-gradient-to-br from-blue-500 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 min-w-[140px] overflow-hidden"
          onClick={() => handleMealClick("Breakfast")}
        >
          <span className="relative z-10">Breakfast</span>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>
        <button
          ref={lunchButtonRef}
          className="group relative bg-gradient-to-br from-green-500 to-green-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 min-w-[140px] overflow-hidden"
          onClick={() => handleMealClick("Lunch")}
        >
          <span className="relative z-10">Lunch</span>
          <div className="absolute inset-0 bg-gradient-to-br from-green-600 to-green-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>
        <button
          ref={dinnerButtonRef}
          className="group relative bg-gradient-to-br from-orange-500 to-orange-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 min-w-[140px] overflow-hidden"
          onClick={() => handleMealClick("Dinner")}
        >
          <span className="relative z-10">Dinner</span>
          <div className="absolute inset-0 bg-gradient-to-br from-orange-600 to-orange-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>
        <button
          ref={snackButtonRef}
          className="group relative bg-gradient-to-br from-purple-500 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 min-w-[140px] overflow-hidden"
          onClick={() => handleMealClick("Snack")}
        >
          <span className="relative z-10">Snack</span>
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>
        <button
          ref={drinksButtonRef}
          className="group relative bg-gradient-to-br from-red-500 to-red-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 min-w-[140px] overflow-hidden"
          onClick={() => handleMealClick("Drinks")}
        >
          <span className="relative z-10">Drinks</span>
          <div className="absolute inset-0 bg-gradient-to-br from-red-600 to-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>
      </div>

      {/* Food images positioned around the page */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Image 1 - Right top corner */}
        <img
          ref={image1Ref}
          src="/food3.png"
          alt="Food 1"
          className="absolute w-32 h-32 object-cover"
          style={{
            top: "10%",
            right: "15%",
            opacity: 0,
          }}
        />

        {/* Image 2 - Left top corner */}
        <img
          ref={image2Ref}
          src="/food2.png"
          alt="Food 2"
          className="absolute w-32 h-32 object-cover"
          style={{
            top: "10%",
            left: "15%",
            opacity: 0,
          }}
        />

        {/* Image 3 - Bottom right */}
        <img
          ref={image3Ref}
          src="/food1.png"
          alt="Food 3"
          className="absolute w-32 h-32 object-cover"
          style={{
            bottom: "10%",
            right: "20%",
            opacity: 0,
          }}
        />

        {/* Image 4 - Bottom left */}
        <img
          ref={image4Ref}
          src="/food4.png"
          alt="Food 4"
          className="absolute w-32 h-32 object-cover"
          style={{
            bottom: "15%",
            left: "20%",
            opacity: 0,
          }}
        />

        {/* Image 5 - Bottom middle - Drink (larger) */}
        <img
          ref={image5Ref}
          src="/drink.png"
          alt="Food 5"
          className="absolute w-48 h-48 object-cover"
          style={{
            bottom: "5%",
            left: "50%",
            transform: "translateX(-50%)",
            opacity: 0,
          }}
        />
      </div>
    </div>
  );
};

export default page;
