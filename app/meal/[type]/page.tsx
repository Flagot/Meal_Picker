"use client";
import { useEffect, useState, useCallback, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import gsap from "gsap";

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
  const [imageError, setImageError] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const ingredientsRef = useRef<HTMLDivElement>(null);
  const instructionsRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const isInitialLoad = useRef(true);

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
        setImageError(false); // Reset image error when new meal loads
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

  useEffect(() => {
    if (meal && !loading) {
      const shouldAnimate = isInitialLoad.current;
      
      if (shouldAnimate) {
        // Animate card entrance
        if (cardRef.current) {
          gsap.from(cardRef.current, {
            y: 50,
            opacity: 0,
            duration: 0.6,
            ease: "power3.out",
          });
        }

        // Animate image (only if image element exists)
        if (imageRef.current && meal.image) {
          gsap.from(imageRef.current, {
            scale: 0.8,
            opacity: 0,
            duration: 0.8,
            delay: 0.2,
            ease: "back.out(1.7)",
          });
        }

        // Animate title
        if (titleRef.current) {
          gsap.from(titleRef.current, {
            y: -20,
            opacity: 0,
            duration: 0.6,
            delay: 0.3,
            ease: "power3.out",
          });
        }

        // Animate ingredients
        if (ingredientsRef.current) {
          gsap.from(ingredientsRef.current, {
            x: -30,
            opacity: 0,
            duration: 0.6,
            delay: 0.4,
            ease: "power3.out",
          });
        }

        // Animate instructions
        if (instructionsRef.current) {
          gsap.from(instructionsRef.current, {
            x: -30,
            opacity: 0,
            duration: 0.6,
            delay: 0.5,
            ease: "power3.out",
          });
        }

        // Animate button
        if (buttonRef.current) {
          gsap.from(buttonRef.current, {
            y: 20,
            opacity: 0,
            duration: 0.6,
            delay: 0.6,
            ease: "power3.out",
          });
        }
        
        isInitialLoad.current = false;
      } else {
        // On subsequent loads (Try Again), animate content update smoothly
        if (cardRef.current) {
          gsap.fromTo(cardRef.current, 
            { opacity: 0.7, scale: 0.98 },
            { opacity: 1, scale: 1, duration: 0.4, ease: "power2.out" }
          );
        }
        
        // Ensure button stays visible and doesn't disappear
        if (buttonRef.current) {
          gsap.set(buttonRef.current, {
            opacity: 1,
            y: 0,
            clearProps: "all"
          });
        }
      }
    }
  }, [meal, loading]);

  const handleTryAgain = async () => {
    // Scroll to top of the page
    window.scrollTo({ top: 0, behavior: 'smooth' });
    await fetchRandomMeal(true);
  };

  const handleGoBack = () => {
    router.push("/");
  };

  const getMealTypeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      breakfast: "from-amber-400 to-orange-500",
      lunch: "from-emerald-400 to-green-500",
      dinner: "from-rose-400 to-pink-500",
      snack: "from-violet-400 to-purple-500",
      drinks: "from-cyan-400 to-blue-500",
    };
    return colors[type.toLowerCase()] || "from-gray-400 to-gray-500";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-orange-500 border-t-transparent mb-4"></div>
          <div className="text-2xl font-poppins font-semibold text-gray-700">
            Finding your perfect meal...
          </div>
        </div>
      </div>
    );
  }

  if (!meal) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 gap-6 px-4">
        <div className="text-6xl mb-4">🍽️</div>
        <div className="text-3xl font-caveat font-bold text-gray-800 mb-2">
          No meal found
        </div>
        <p className="text-lg text-gray-600 font-poppins text-center max-w-md">
          We couldn't find a meal for this category. Please try again or go back to choose another option.
        </p>
        <button
          onClick={handleGoBack}
          className="bg-gradient-to-br from-orange-500 to-amber-500 text-white px-8 py-4 rounded-xl hover:from-orange-600 hover:to-amber-600 transition-all duration-300 font-poppins font-semibold text-lg shadow-xl hover:shadow-2xl hover:scale-105"
        >
          Go Back to Meal Options
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 py-8 px-4 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-amber-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Back button */}
        <button
          onClick={handleGoBack}
          className="group mb-8 bg-white/80 backdrop-blur-sm text-gray-700 px-6 py-3 rounded-xl hover:bg-white transition-all duration-300 flex items-center gap-2 font-poppins font-medium shadow-lg hover:shadow-xl hover:scale-105 border border-gray-200"
        >
          <span className="text-xl group-hover:-translate-x-1 transition-transform duration-300">
            ←
          </span>
          <span>Back to Meal Options</span>
        </button>

        {/* Main card */}
        <div
          ref={cardRef}
          className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-white/50"
        >
          {/* Header with image */}
          <div className="relative">
            {meal.image && !imageError ? (
              <div className="relative h-64 md:h-80 overflow-hidden">
                <img
                  ref={imageRef}
                  src={meal.image.startsWith('/') ? meal.image : `/${meal.image}`}
                  alt={meal.name}
                  className="w-full h-full object-cover"
                  onError={() => {
                    // Try alternative path if image fails
                    const img = imageRef.current;
                    if (img && meal.image.includes('firfir')) {
                      img.src = '/foods/firfir.jpg';
                      return;
                    }
                    setImageError(true);
                  }}
                  onLoad={() => setImageError(false)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <div className="inline-block px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full mb-4">
                    <span className={`text-sm font-poppins font-semibold capitalize bg-gradient-to-r ${getMealTypeColor(meal.type)} bg-clip-text text-transparent`}>
                      {meal.type}
                    </span>
                  </div>
                  <h2
                    ref={titleRef}
                    className="text-4xl md:text-5xl font-caveat font-bold text-white drop-shadow-lg"
                  >
                    {meal.name}
                  </h2>
                </div>
              </div>
            ) : (
              <div className={`bg-gradient-to-br ${getMealTypeColor(meal.type)} h-64 md:h-80 p-8 md:p-12 relative overflow-hidden flex items-center`}>
                {/* Decorative pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -mr-32 -mt-32"></div>
                  <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full -ml-24 -mb-24"></div>
                </div>
                <div className="relative z-10 w-full">
                  <div className="inline-block px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full mb-4">
                    <span className={`text-sm font-poppins font-semibold capitalize bg-gradient-to-r ${getMealTypeColor(meal.type)} bg-clip-text text-transparent`}>
                      {meal.type}
                    </span>
                  </div>
                  <h2
                    ref={titleRef}
                    className="text-4xl md:text-5xl font-caveat font-bold text-white drop-shadow-lg"
                  >
                    {meal.name}
                  </h2>
                  <div className="mt-4 text-white/80 text-6xl">
                    🍽️
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-6 md:p-8">
            {/* Try Again button */}
            <button
              ref={buttonRef}
              onClick={handleTryAgain}
              disabled={tryAgainLoading}
              className={`group w-full bg-gradient-to-br ${getMealTypeColor(mealType)} text-white px-8 py-6 rounded-2xl hover:shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-poppins font-bold text-lg shadow-xl hover:scale-[1.02] disabled:hover:scale-100 relative overflow-hidden mb-8 border-2 border-white/20`}
            >
              {/* Animated background shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              
              {/* Decorative circles */}
              <div className="absolute top-2 right-2 w-3 h-3 bg-white/30 rounded-full blur-sm"></div>
              <div className="absolute bottom-2 left-2 w-2 h-2 bg-white/20 rounded-full blur-sm"></div>
              
              {tryAgainLoading ? (
                <span className="flex items-center justify-center gap-3 relative z-10">
                  <svg
                    className="animate-spin h-6 w-6"
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
                  <span>Finding another meal...</span>
                </span>
              ) : (
                <span className="flex items-center justify-center gap-3 relative z-10">
                  <span className="text-3xl transform group-hover:rotate-180 transition-transform duration-500 group-hover:scale-110">
                    🔄
                  </span>
                  <span className="text-xl">Try Another Meal</span>
                  <svg 
                    className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              )}
            </button>

            {/* Ingredients */}
            <div ref={ingredientsRef} className="mb-8">
              <h3 className="text-2xl font-caveat font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-3xl">🥘</span>
                Ingredients
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {meal.ingredients.map((ingredient, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-4 border border-orange-100 hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="w-2 h-2 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full flex-shrink-0"></div>
                    <span className="text-gray-700 font-poppins font-medium">
                      {ingredient}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Instructions */}
            <div ref={instructionsRef} className="mb-8">
              <h3 className="text-2xl font-caveat font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-3xl">📝</span>
                Instructions
              </h3>
              <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-6 border border-amber-100">
                <p className="text-gray-700 whitespace-pre-line leading-relaxed font-poppins text-base md:text-lg">
                  {meal.instructions}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealPage;
