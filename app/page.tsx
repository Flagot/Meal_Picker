"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";

interface Meal {
  name: string;
  type: string;
  ingredients: string[];
  instructions: string;
  image: string;
}

const FAVORITES_STORAGE_KEY = "meal-picker-favorites";

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
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const router = useRouter();
  const [favoritesCount, setFavoritesCount] = useState(0);

  const handleMealClick = (mealType: string) => {
    router.push(`/meal/${mealType.toLowerCase()}`);
  };

  const handleFavoritesClick = () => {
    router.push("/favorites");
  };

  const mealTypes = [
    {
      name: "Breakfast",
      color: "from-amber-400 to-orange-500",
      hoverColor: "hover:from-amber-500 hover:to-orange-600",
      ref: breakfastButtonRef,
      icon: "🌅",
    },
    {
      name: "Lunch",
      color: "from-emerald-400 to-green-500",
      hoverColor: "hover:from-emerald-500 hover:to-green-600",
      ref: lunchButtonRef,
      icon: "🍽️",
    },
    {
      name: "Dinner",
      color: "from-rose-400 to-pink-500",
      hoverColor: "hover:from-rose-500 hover:to-pink-600",
      ref: dinnerButtonRef,
      icon: "🌙",
    },
    {
      name: "Snack",
      color: "from-violet-400 to-purple-500",
      hoverColor: "hover:from-violet-500 hover:to-purple-600",
      ref: snackButtonRef,
      icon: "🍿",
    },
    {
      name: "Drinks",
      color: "from-cyan-400 to-blue-500",
      hoverColor: "hover:from-cyan-500 hover:to-blue-600",
      ref: drinksButtonRef,
      icon: "🥤",
    },
  ];

  useEffect(() => {
    try {
      const rawFavorites = window.localStorage.getItem(FAVORITES_STORAGE_KEY);
      if (rawFavorites) {
        const parsedFavorites = JSON.parse(rawFavorites) as Meal[];
        if (Array.isArray(parsedFavorites)) {
          setFavoritesCount(parsedFavorites.length);
        }
      }
    } catch (error) {
      console.error("Failed to load favorites:", error);
    }

    // Animate title
    if (titleRef.current) {
      gsap.from(titleRef.current, {
        y: -50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });
    }

    // Animate subtitle
    if (subtitleRef.current) {
      gsap.from(subtitleRef.current, {
        y: -30,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        ease: "power3.out",
      });
    }

    // Animate top images (1 and 2) with circular pattern
    const topImages = [
      { ref: image1Ref, angle: 0, delay: 0.4 },
      { ref: image2Ref, angle: 72, delay: 0.5 },
    ];

    topImages.forEach(({ ref, angle, delay }) => {
      const img = ref.current;
      if (img) {
        gsap.set(img, {
          x: Math.cos((angle * Math.PI) / 180) * 400,
          y: Math.sin((angle * Math.PI) / 180) * 400,
          rotation: angle + 180,
          opacity: 0,
          scale: 0.2,
        });
        gsap.to(img, {
          x: 0,
          y: 0,
          rotation: 0,
          opacity: 0.6,
          scale: 1,
          duration: 1.2,
          delay: delay,
          ease: "back.out(1.7)",
        });

        // Continuous floating animation
        gsap.to(img, {
          y: "+=20",
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: delay + 1.2,
        });
      }
    });

    // Animate bottom images (3, 4, 5) - Come out from bottom
    const bottomImages = [
      { ref: image3Ref, delay: 0.6, rotation: 10 },
      { ref: image4Ref, delay: 0.7, rotation: -10 },
      { ref: image5Ref, delay: 0.8, rotation: 0 },
    ];

    bottomImages.forEach(({ ref, delay, rotation }) => {
      const img = ref.current;
      if (img) {
        gsap.set(img, {
          y: 400,
          opacity: 0,
          scale: 0.5,
          rotation: rotation,
        });
        gsap.to(img, {
          y: 0,
          opacity: 0.6,
          scale: 1,
          rotation: rotation,
          duration: 1.5,
          delay: delay,
          ease: "power3.out",
        });

        // Continuous floating animation
        gsap.to(img, {
          y: "+=20",
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: delay + 1.5,
        });
      }
    });

    // Animate buttons with stagger
    mealTypes.forEach((meal, index) => {
      const button = meal.ref.current;
      if (button) {
        gsap.set(button, {
          y: 50,
          opacity: 0,
          scale: 0.8,
        });
        gsap.to(button, {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          delay: 0.8 + index * 0.1,
          ease: "back.out(1.4)",
        });
      }
    });
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-12 overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-amber-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto text-center">
        {/* Hero section */}
        <div className="mb-12">
          <h1
            ref={titleRef}
            className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 bg-clip-text text-transparent font-caveat drop-shadow-sm"
          >
            Pick Your Next Meal!
          </h1>
          <p
            ref={subtitleRef}
            className="text-xl md:text-2xl text-gray-700 font-poppins font-medium max-w-2xl mx-auto leading-relaxed"
          >
            Can't decide what to eat? Let us help you discover your perfect
            meal.
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <button
            onClick={handleFavoritesClick}
            className="group relative bg-white/90 backdrop-blur-sm text-gray-800 px-8 py-4 rounded-2xl font-poppins font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/70 hover:scale-105"
          >
            <span className="flex items-center gap-3">
              <span className="text-2xl">❤️</span>
              <span>Favorites</span>
              <span className="px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-700 text-sm font-semibold">
                {favoritesCount}
              </span>
            </span>
          </button>
        </div>

        {/* Meal type buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mt-16 max-w-5xl mx-auto">
          {mealTypes.map((meal) => (
            <button
              key={meal.name}
              ref={meal.ref}
              className={`group relative bg-gradient-to-br ${meal.color} ${meal.hoverColor} text-white px-6 py-8 rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden min-h-[160px] flex flex-col items-center justify-center gap-3 backdrop-blur-sm`}
              onClick={() => handleMealClick(meal.name)}
            >
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

              {/* Icon */}
              <span className="text-5xl relative z-10 transform group-hover:scale-110 transition-transform duration-300">
                {meal.icon}
              </span>

              {/* Text */}
              <span className="relative z-10 font-poppins font-bold text-xl">
                {meal.name}
              </span>

              {/* Decorative circle */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-colors duration-300"></div>
              <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-white/10 rounded-full blur-xl group-hover:bg-white/20 transition-colors duration-300"></div>
            </button>
          ))}
        </div>
      </div>

      {/* Food images positioned around the page */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Image 1 - Top right */}
        <img
          ref={image1Ref}
          src="/food3.png"
          alt="Food decoration"
          className="absolute w-40 h-40 md:w-48 md:h-48 object-cover rounded-2xl shadow-2xl opacity-0"
          style={{
            top: "8%",
            right: "8%",
            transform: "rotate(-15deg)",
          }}
        />

        {/* Image 2 - Top left */}
        <img
          ref={image2Ref}
          src="/food2.png"
          alt="Food decoration"
          className="absolute w-40 h-40 md:w-48 md:h-48 object-cover rounded-2xl shadow-2xl opacity-0"
          style={{
            top: "12%",
            left: "8%",
            transform: "rotate(15deg)",
          }}
        />

        {/* Image 3 - Bottom right */}
        <img
          ref={image3Ref}
          src="/food1.png"
          alt="Food decoration"
          className="absolute w-40 h-40 md:w-48 md:h-48 object-cover rounded-2xl shadow-2xl opacity-0"
          style={{
            bottom: "10%",
            right: "12%",
            transform: "rotate(10deg)",
          }}
        />

        {/* Image 4 - Bottom left */}
        <img
          ref={image4Ref}
          src="/food7.jpg"
          alt="Food decoration"
          className="absolute w-40 h-40 md:w-48 md:h-48 object-cover rounded-2xl shadow-2xl opacity-0"
          style={{
            bottom: "10%",
            left: "10%",
            transform: "rotate(-10deg)",
          }}
        />

        {/* Image 5 - Center bottom - Drink */}
        <img
          ref={image5Ref}
          src="/drink.png"
          alt="Drink decoration"
          className="absolute w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 object-cover rounded-2xl shadow-2xl opacity-0"
          style={{
            bottom: "-10%",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        />
      </div>
    </div>
  );
};

export default page;
