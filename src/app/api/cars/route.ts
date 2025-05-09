import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const cars = [
    {
      name: "Panamera Turbo S",
      brand: "Porsche",
      hp: 630,
      seats: 4,
      category: "Sport",
      daily_price: 500,
      weekend_price: 900,
      week_price: 3000,
      caution: 2000,
      description: "La Porsche Panamera Turbo S incarne la quintessence du luxe sportif.",
      images: ["https://images.pexels.com/photos/3752169/pexels-photo-3752169.jpeg"]
    },
    {
      name: "Golf 8 GTI Clubsport",
      brand: "Volkswagen",
      hp: 300,
      seats: 5,
      category: "Sport",
      daily_price: 200,
      weekend_price: 350,
      week_price: 1200,
      caution: 1000,
      description: "La Golf GTI Clubsport représente le summum de la sportivité accessible.",
      images: ["https://images.pexels.com/photos/3874337/pexels-photo-3874337.jpeg"]
    },
    {
      name: "GLC 63 S AMG",
      brand: "Mercedes",
      hp: 510,
      seats: 5,
      category: "SUV",
      daily_price: 400,
      weekend_price: 700,
      week_price: 2400,
      caution: 1500,
      description: "Le SUV le plus puissant de sa catégorie, alliant performance et luxe.",
      images: ["https://images.pexels.com/photos/892522/pexels-photo-892522.jpeg"]
    }
  ];
    return NextResponse.json(cars);
  } catch (error) {
    console.error('Error fetching cars:', error);
    return NextResponse.json(
      { error: 'Failed to fetch cars' },
      { status: 500 }
    );
  }
}