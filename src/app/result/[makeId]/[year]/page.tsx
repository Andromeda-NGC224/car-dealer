import { Suspense } from 'react';
import Link from 'next/link';
import { ModelList } from '../../../components/modelList/modelList';
import Loader from '../../../components/loader/loader';

interface Model {
  Model_ID: number;
  Model_Name: string;
}

async function fetchModels(makeId: string, year: string): Promise<Model[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`,
  );
  const data = await response.json();
  return data.Results;
}

export default async function ResultPage({
  params,
}: {
  params: { makeId: string; year: string };
}) {
  const models = await fetchModels(params.makeId, params.year);

  return (
    <main
      className="h-screen w-full"
      style={{
        backgroundImage: "url('/images/modelpage.avif')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <section className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Search results</h1>
        <Suspense fallback={<Loader />}>
          <ModelList models={models} />
        </Suspense>
        <Link href="/">
          <button
            className={
              'w-40 px-4 py-2 mt-4 rounded-3xl bg-blue-500 text-white transition-all	 duration-300 hover:bg-blue-600'
            }
          >
            Back to search
          </button>
        </Link>
      </section>
    </main>
  );
}
