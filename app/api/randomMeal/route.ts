import { NextResponse } from "next/server";
import { readFileSync } from "fs";
import { join } from "path";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const mealType = searchParams.get("type");

    // Map meal types to their corresponding JSON files
    const mealTypeMap: { [key: string]: string } = {
      breakfast: "breakfast.json",
      lunch: "lunch.json",
      dinner: "dinner.json",
      snack: "snack.json",
      drinks: "drinks.json",
    };

    // Determine which file to read based on meal type
    let fileName = "meals.json"; // fallback
    if (mealType) {
      const normalizedType = mealType.toLowerCase();
      fileName = mealTypeMap[normalizedType] || "meals.json";
    }

    // Read meals data from the appropriate JSON file
    const filePath = join(process.cwd(), "data", fileName);
    const fileContents = readFileSync(filePath, "utf8");
    const mealsData = JSON.parse(fileContents);

    // Get a random meal from the file
    const randomIndex = Math.floor(Math.random() * mealsData.length);
    const randomMeal = mealsData[randomIndex];

    return NextResponse.json(randomMeal);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch random meal" },
      { status: 500 }
    );
  }
}
