'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Cars {
  MakeId: number;
  MakeName: string;
}

export default function Home() {
  const [cars, setCars] = useState<Cars[]>([]);
  const [selectedCar, setSelectedCar] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 2014 },
    (_, index) => currentYear - index,
  );

  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/vehicles/GetMakesForVehicleType/car?format=json`,
    )
      .then((response) => response.json())
      .then((data) => setCars(data.Results));
  }, []);

  const buttonDisabled = !selectedCar || !selectedYear;

  return (
    <main
      className="h-screen w-full"
      style={{
        backgroundImage: "url('/images/Homepage.avif')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <section className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Car selection</h1>

        <div className="p-4 border rounded-md backdrop-blur-sm">
          <div className="mb-4 ">
            <label htmlFor="make" className="block mb-2">
              Brand:
            </label>
            <select
              id="make"
              className="w-full p-2 border rounded-3xl bg-stone-950  outline-none	"
              value={selectedCar}
              onChange={(e) => setSelectedCar(e.target.value)}
            >
              <option value="">Select a brand</option>
              {cars.map((car) => (
                <option key={car.MakeId} value={car.MakeId}>
                  {car.MakeName}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="year" className="block mb-2">
              Year:
            </label>
            <select
              id="year"
              className="w-full p-2 border rounded-3xl bg-stone-950  outline-none"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              <option value="">Select a year</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          <Link href={`/result/${selectedCar}/${selectedYear}`}>
            <button
              className={` w-36	px-4 py-2 rounded-3xl transition-all duration-300 ${buttonDisabled ? 'bg-gray-800 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
              disabled={buttonDisabled}
            >
              Next
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
}
