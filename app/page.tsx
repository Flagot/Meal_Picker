"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const page = () => {
  const foodImagesRef = useRef<(HTMLImageElement | null)[]>([]);

  const handleMealClick = (mealType: string) => {
    alert(`You selected ${mealType}!`);
  };

  useEffect(() => {
    const images = foodImagesRef.current.filter(Boolean) as HTMLImageElement[];

    // Set initial states for all images (hidden and positioned from different angles)
    gsap.set(images, { opacity: 0, scale: 0.5 });

    // Animate each image from different angles
    images.forEach((img, index) => {
      const angle = (index * 60) % 360; // Different angles for each image
      const distance = 300;
      const radians = (angle * Math.PI) / 180;
      const x = Math.cos(radians) * distance;
      const y = Math.sin(radians) * distance;
      const rotation = angle + 180;

      // Set initial position
      gsap.set(img, {
        x: x,
        y: y,
        rotation: rotation,
        opacity: 0,
        scale: 0.3,
      });

      // Animate to final position
      gsap.to(img, {
        x: 0,
        y: 0,
        rotation: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        delay: index * 0.1,
        ease: "back.out(1.7)",
      });
    });
  }, []);

  const foodImages = [
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200&h=200&fit=crop",
    "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200&h=200&fit=crop",
    "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=200&h=200&fit=crop",
    "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=200&h=200&fit=crop",
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=200&h=200&fit=crop",
  ];

  return (
    <div className="relative flex flex-col items-center justify-start h-screen gap-4 pt-20 bg-white overflow-hidden">
      <h1 className="text-4xl font-bold text-black z-10">
        Pick Your Next Meal
      </h1>
      <p className="text-lg text-black z-10">
        Do you struggle to decide what to eat? Let us help you!
      </p>
      <div className="flex flex-wrap gap-4 justify-center z-10">
        <button
          className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition"
          onClick={() => handleMealClick("Breakfast")}
        >
          Breakfast
        </button>
        <button
          className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 transition"
          onClick={() => handleMealClick("Lunch")}
        >
          Lunch
        </button>
        <button
          className="bg-orange-500 text-white px-6 py-3 rounded-md hover:bg-orange-600 transition"
          onClick={() => handleMealClick("Dinner")}
        >
          Dinner
        </button>
        <button
          className="bg-purple-500 text-white px-6 py-3 rounded-md hover:bg-purple-600 transition"
          onClick={() => handleMealClick("Snack")}
        >
          Snack
        </button>
        <button
          className="bg-red-500 text-white px-6 py-3 rounded-md hover:bg-red-600 transition"
          onClick={() => handleMealClick("Drinks")}
        >
          Drinks
        </button>
      </div>

      {/* Food images positioned around the page */}
      <div className="absolute inset-0 pointer-events-none">
        {foodImages.map((src, index) => (
          <img
            key={index}
            ref={(el) => {
              foodImagesRef.current[index] = el;
            }}
            src={src}
            alt={`Food ${index + 1}`}
            className="absolute w-32 h-32 object-cover rounded-lg shadow-lg"
            style={{
              top: `${20 + (index % 3) * 30}%`,
              left: `${15 + Math.floor(index / 2) * 35}%`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default page;
