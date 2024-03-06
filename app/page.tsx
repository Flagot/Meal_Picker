"use client";
const page = () => {
  const handleMealClick = (mealType: string) => {
    alert(`You selected ${mealType}!`);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-4xl font-bold">Pick Your Next Meal</h1>
      <p className="text-lg">
        Do you struggle to decide what to eat? Let us help you!
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
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
    </div>
  );
};

export default page;
