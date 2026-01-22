"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Meal {
  name: string;
  type: string;
  ingredients: string[];
  instructions: string;
  image: string;
}

const FAVORITES_STORAGE_KEY = "meal-picker-favorites";

const FavoritesPage = () => {
  const router = useRouter();
  const [favorites, setFavorites] = useState<Meal[]>([]);
  const [selectedType, setSelectedType] = useState("all");

  useEffect(() => {
    try {
      const rawFavorites = window.localStorage.getItem(FAVORITES_STORAGE_KEY);
      if (!rawFavorites) {
        setFavorites([]);
        return;
      }
      const parsedFavorites = JSON.parse(rawFavorites) as Meal[];
      setFavorites(Array.isArray(parsedFavorites) ? parsedFavorites : []);
    } catch (error) {
      console.error("Failed to read favorites:", error);
      setFavorites([]);
    }
  }, []);

  const handleChooseFavorite = (favorite: Meal) => {
    router.push(
      `/meal/${favorite.type.toLowerCase()}?favorite=${encodeURIComponent(
        favorite.name
      )}`
    );
  };

  const handleRemoveFavorite = (favorite: Meal) => {
    const updatedFavorites = favorites.filter(
      (item) =>
        !(
          item.name.toLowerCase() === favorite.name.toLowerCase() &&
          item.type.toLowerCase() === favorite.type.toLowerCase()
        )
    );
    setFavorites(updatedFavorites);
    window.localStorage.setItem(
      FAVORITES_STORAGE_KEY,
      JSON.stringify(updatedFavorites)
    );
  };

  const mealTypeOptions = [
    "all",
    ...Array.from(
      new Set(favorites.map((favorite) => favorite.type.toLowerCase()))
    ),
  ];

  const filteredFavorites =
    selectedType === "all"
      ? favorites
      : favorites.filter(
          (favorite) => favorite.type.toLowerCase() === selectedType
        );

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <button
          onClick={() => router.push("/")}
          className="group mb-8 bg-white/80 backdrop-blur-sm text-gray-700 px-6 py-3 rounded-xl hover:bg-white transition-all duration-300 flex items-center gap-2 font-poppins font-medium shadow-lg hover:shadow-xl hover:scale-105 border border-gray-200"
        >
          <span className="text-xl group-hover:-translate-x-1 transition-transform duration-300">
            ←
          </span>
          <span>Back to Meal Options</span>
        </button>

        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-6xl font-caveat font-bold text-gray-800 mb-2">
            Your Favorite Meals
          </h1>
          <p className="font-poppins text-gray-600">
            Pick one of your saved meals anytime.
          </p>
        </div>

        {favorites.length > 0 && (
          <div className="mb-6 flex flex-wrap items-center justify-center gap-2">
            {mealTypeOptions.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-4 py-2 rounded-full border font-poppins font-semibold transition-all duration-200 ${
                  selectedType === type
                    ? "bg-orange-500 text-white border-orange-500"
                    : "bg-white text-gray-700 border-gray-200 hover:bg-orange-50"
                }`}
              >
                {type === "all"
                  ? "All"
                  : type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        )}

        {favorites.length === 0 ? (
          <div className="bg-white/90 rounded-3xl p-10 text-center border border-white/70 shadow-xl">
            <p className="text-4xl mb-3">🤍</p>
            <p className="text-2xl font-caveat font-bold text-gray-800 mb-2">
              No favorites yet
            </p>
            <p className="font-poppins text-gray-600 mb-6">
              Add meals to favorites from the meal details page.
            </p>
            <button
              onClick={() => router.push("/")}
              className="bg-gradient-to-br from-orange-500 to-amber-500 text-white px-8 py-4 rounded-xl hover:from-orange-600 hover:to-amber-600 transition-all duration-300 font-poppins font-semibold"
            >
              Find Meals
            </button>
          </div>
        ) : filteredFavorites.length === 0 ? (
          <div className="bg-white/90 rounded-3xl p-10 text-center border border-white/70 shadow-xl">
            <p className="text-3xl mb-3">🔎</p>
            <p className="text-2xl font-caveat font-bold text-gray-800 mb-2">
              No favorites in this category
            </p>
            <p className="font-poppins text-gray-600">
              Try choosing a different filter or switch back to All.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredFavorites.map((favorite) => (
              <div
                key={`${favorite.type}-${favorite.name}`}
                className="bg-white/90 backdrop-blur-sm rounded-2xl p-5 border border-white/70 shadow-lg"
              >
                <p className="text-xs font-poppins font-semibold uppercase tracking-wider text-orange-600 mb-1">
                  {favorite.type}
                </p>
                <h3 className="text-2xl font-caveat font-bold text-gray-900 mb-4">
                  {favorite.name}
                </h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleChooseFavorite(favorite)}
                    className="flex-1 bg-gradient-to-br from-orange-500 to-amber-500 text-white px-4 py-3 rounded-xl hover:from-orange-600 hover:to-amber-600 transition-all duration-300 font-poppins font-semibold"
                  >
                    Choose This Meal
                  </button>
                  <button
                    onClick={() => handleRemoveFavorite(favorite)}
                    className="px-4 py-3 rounded-xl bg-white text-rose-600 border border-rose-200 hover:bg-rose-50 transition-all duration-300 font-poppins font-semibold"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
