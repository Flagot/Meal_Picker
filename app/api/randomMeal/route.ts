import { NextResponse } from "next/server";
import { readFileSync } from "fs";
import { join } from "path";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const mealType = searchParams.get("type");

    // Read meals data from JSON file
    const filePath = join(process.cwd(), "data", "meals.json");
    const fileContents = readFileSync(filePath, "utf8");
    const mealsData = JSON.parse(fileContents);

    let filteredMeals = mealsData;

    // Filter by meal type if provided
    if (mealType) {
      filteredMeals = mealsData.filter(
        (meal: { type: string }) =>
          meal.type.toLowerCase() === mealType.toLowerCase()
      );
    }

    // If no meals match the filter, return all meals
    if (filteredMeals.length === 0) {
      filteredMeals = mealsData;
    }

    // Get a random meal
    const randomIndex = Math.floor(Math.random() * filteredMeals.length);
    const randomMeal = filteredMeals[randomIndex];

    return NextResponse.json(randomMeal);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch random meal" },
      { status: 500 }
    );
  }
}
