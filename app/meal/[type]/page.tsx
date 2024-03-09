"use client";
import { useEffect, useState, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";

interface Meal {
  name: string;
  type: string;
  ingredients: string[];
  instructions: string;
  image: string;
}

const MealPage = () => {
  const router = useRouter();
  const params = useParams();
  const mealType = params.type as string;
  const [meal, setMeal] = useState<Meal | null>(null);
  const [loading, setLoading] = useState(true);
  const [tryAgainLoading, setTryAgainLoading] = useState(false);

  const fetchRandomMeal = useCallback(async (isTryAgain: boolean = false) => {
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
      const mealData: Meal = await response.json();
      setMeal(mealData);
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
  }, [mealType]);

  useEffect(() => {
    if (mealType) {
      fetchRandomMeal(false);
    }
  }, [mealType, fetchRandomMeal]);

  const handleTryAgain = async () => {
    await fetchRandomMeal(true);
  };

  const handleGoBack = () => {
    router.push("/");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="text-2xl text-black">Loading...</div>
      </div>
    );
  }

  if (!meal) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white gap-4">
        <div className="text-2xl text-black">No meal found</div>
        <button
          onClick={handleGoBack}
          className="bg-gray-600 text-white px-6 py-3 rounded-md hover:bg-gray-700 transition"
        >
          Go Back to Meal Options
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={handleGoBack}
          className="mb-6 bg-gray-600 text-white px-6 py-3 rounded-md hover:bg-gray-700 transition flex items-center gap-2"
        >
          <span>←</span> Go Back to Meal Options
        </button>

        <div className="bg-white border-2 border-gray-200 rounded-lg shadow-lg p-6">
          <h2 className="text-3xl font-bold text-black mb-2">{meal.name}</h2>
          <p className="text-sm text-gray-600 mb-6 capitalize">
            Type: {meal.type}
          </p>
          <div className="mb-6 flex gap-6">
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-black mb-3">
                Ingredients:
              </h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                {meal.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>
            {meal.image && (
              <div className="flex-1">
                <img
                  src={meal.image}
                  alt={meal.name}
                  className="w-full h-full max-h-64 object-cover rounded-lg"
                />
              </div>
            )}
          </div>
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-black mb-3">
              Instructions:
            </h3>
            <p className="text-gray-700 whitespace-pre-line leading-relaxed">
              {meal.instructions}
            </p>
          </div>
          <button
            onClick={handleTryAgain}
            disabled={tryAgainLoading}
            className="w-full bg-gray-600 text-white px-6 py-3 rounded-md hover:bg-gray-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {tryAgainLoading ? "Loading..." : "Try Again"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MealPage;

