"use client";
const page = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">Pick Your Next Meal</h1>
      <p className="text-lg">
        Do you struggle to decide what to eat? Let us help you!
      </p>
      <button
        className="bg-blue-500 text-white p-2 rounded-md"
        onClick={() => {
          const meals = ["Pizza", "Burger", "Salad", "Sushi", "Tacos"];
          const randomMeal = meals[Math.floor(Math.random() * meals.length)];
          alert(randomMeal);
        }}
      >
        Pick a Meal
      </button>
    </div>
  );
};

export default page;
