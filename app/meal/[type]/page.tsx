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

  const fetchRandomMeal = useCallback(
    async (isTryAgain: boolean = false) => {
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
    },
    [mealType]
  );

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
          className="bg-gradient-to-r from-gray-600 to-gray-700 text-white px-6 py-3 rounded-lg hover:from-gray-700 hover:to-gray-800 transition-all duration-300 font-medium shadow-md hover:shadow-lg"
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
          className="group mb-6 bg-gradient-to-r from-gray-600 to-gray-700 text-white px-6 py-3 rounded-lg hover:from-gray-700 hover:to-gray-800 transition-all duration-300 flex items-center gap-2 font-medium shadow-md hover:shadow-lg hover:scale-105"
        >
          <span className="text-xl group-hover:-translate-x-1 transition-transform duration-300">
            ←
          </span>
          <span>Go Back to Meal Options</span>
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
            className="group w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-4 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-[1.02] disabled:hover:scale-100"
          >
            {tryAgainLoading ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Loading...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <span>🔄</span>
                Try Again
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MealPage;
