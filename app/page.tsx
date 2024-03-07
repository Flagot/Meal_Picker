"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface Meal {
  name: string;
  type: string;
  ingredients: string[];
  instructions: string;
  image: string;
}

const page = () => {
  const foodImagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
  const [loading, setLoading] = useState(false);
  const [tryAgainLoading, setTryAgainLoading] = useState(false);
  const [currentMealType, setCurrentMealType] = useState<string | null>(null);

  const fetchRandomMeal = async (
    mealType: string,
    isTryAgain: boolean = false
  ) => {
    if (isTryAgain) {
      setTryAgainLoading(true);
    } else {
      setLoading(true);
    }
    try {
      const response = await fetch(
        `/api/randomMeal?type=${mealType.toLowerCase()}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch meal");
      }
      const meal: Meal = await response.json();
      setSelectedMeal(meal);
      setCurrentMealType(mealType);
    } catch (error) {
      console.error("Error fetching meal:", error);
      alert("Failed to fetch a random meal. Please try again.");
    } finally {
      if (isTryAgain) {
        setTryAgainLoading(false);
      } else {
        setLoading(false);
      }
    }
  };

  const handleMealClick = async (mealType: string) => {
    await fetchRandomMeal(mealType, false);
  };

  const handleTryAgain = async () => {
    if (currentMealType) {
      await fetchRandomMeal(currentMealType, true);
    }
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
    <div className="relative flex flex-col items-center justify-start min-h-screen gap-4 pt-20 pb-8 bg-white overflow-y-auto">
      <h1 className="text-4xl font-bold text-black z-10">
        Pick Your Next Meal
      </h1>
      <p className="text-lg text-black z-10">
        Do you struggle to decide what to eat? Let us help you!
      </p>
      <div className="flex flex-wrap gap-4 justify-center z-10">
        <button
          className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed min-w-[120px]"
          onClick={() => handleMealClick("Breakfast")}
          disabled={loading}
        >
          {loading ? "Loading..." : "Breakfast"}
        </button>
        <button
          className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 transition disabled:opacity-50 disabled:cursor-not-allowed min-w-[120px]"
          onClick={() => handleMealClick("Lunch")}
          disabled={loading}
        >
          {loading ? "Loading..." : "Lunch"}
        </button>
        <button
          className="bg-orange-500 text-white px-6 py-3 rounded-md hover:bg-orange-600 transition disabled:opacity-50 disabled:cursor-not-allowed min-w-[120px]"
          onClick={() => handleMealClick("Dinner")}
          disabled={loading}
        >
          {loading ? "Loading..." : "Dinner"}
        </button>
        <button
          className="bg-purple-500 text-white px-6 py-3 rounded-md hover:bg-purple-600 transition disabled:opacity-50 disabled:cursor-not-allowed min-w-[120px]"
          onClick={() => handleMealClick("Snack")}
          disabled={loading}
        >
          {loading ? "Loading..." : "Snack"}
        </button>
        <button
          className="bg-red-500 text-white px-6 py-3 rounded-md hover:bg-red-600 transition disabled:opacity-50 disabled:cursor-not-allowed min-w-[120px]"
          onClick={() => handleMealClick("Drinks")}
          disabled={loading}
        >
          {loading ? "Loading..." : "Drinks"}
        </button>
      </div>

      {selectedMeal && (
        <div className="mt-8 p-6 bg-white border-2 border-gray-200 rounded-lg shadow-lg z-10 max-w-md max-h-[80vh] overflow-y-auto">
          {selectedMeal.image && (
            <img
              src={selectedMeal.image}
              alt={selectedMeal.name}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
          )}
          <h2 className="text-2xl font-bold text-black mb-2">
            {selectedMeal.name}
          </h2>
          <p className="text-sm text-gray-600 mb-4 capitalize">
            Type: {selectedMeal.type}
          </p>
          <div className="mb-4">
            <h3 className="font-semibold text-black mb-2">Ingredients:</h3>
            <ul className="list-disc list-inside text-gray-700">
              {selectedMeal.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>
          <div className="mb-4">
            <h3 className="font-semibold text-black mb-2">Instructions:</h3>
            <p className="text-gray-700 whitespace-pre-line">
              {selectedMeal.instructions}
            </p>
          </div>
          <button
            onClick={handleTryAgain}
            disabled={tryAgainLoading}
            className="w-full mt-4 bg-gray-600 text-white px-6 py-3 rounded-md hover:bg-gray-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {tryAgainLoading ? "Loading..." : "Try Again"}
          </button>
        </div>
      )}

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
